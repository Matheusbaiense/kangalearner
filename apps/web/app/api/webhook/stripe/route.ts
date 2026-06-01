import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { log, mask } from "@/lib/log";

// Stripe SDK — lazy init para evitar erro em build sem env vars
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  return _stripe;
}

const ACTIVE_STATUSES = new Set(["active", "trialing"]);
const INACTIVE_STATUSES = new Set(["canceled", "past_due", "unpaid", "incomplete_expired"]);

/** Roles alinhados a migration 011: free | premium | admin | super_admin */
type SubscriptionRole = "premium" | "free";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("webhook/stripe: STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "misconfigured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "signature_verification_failed";
    console.error("webhook/stripe: signature error:", msg);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const HANDLED = new Set([
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted"
  ]);

  if (!HANDLED.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const { error: idempotencyError } = await supabaseAdmin
    .from("stripe_webhook_events")
    .insert({ event_id: event.id, event_type: event.type });

  if (idempotencyError) {
    if (idempotencyError.code === "23505") {
      return NextResponse.json({ received: true });
    }
    console.error("webhook/stripe: idempotency insert failed:", idempotencyError.code);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

  if (!customerId) {
    console.error("webhook/stripe: missing customer id in event", event.id);
    return NextResponse.json({ error: "missing_customer" }, { status: 400 });
  }

  let newRole: SubscriptionRole;

  if (
    event.type === "customer.subscription.deleted" ||
    INACTIVE_STATUSES.has(subscription.status)
  ) {
    newRole = "free";
  } else if (ACTIVE_STATUSES.has(subscription.status)) {
    newRole = "premium";
  } else {
    return NextResponse.json({ received: true });
  }

  // Guard: never demote admin or super_admin via Stripe billing events
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (profile?.role === "admin" || profile?.role === "super_admin") {
    log("warn", "stripe.webhook.skip_privileged_user", { customerId: mask(customerId) });
    return NextResponse.json({ received: true });
  }

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ role: newRole })
    .eq("stripe_customer_id", customerId);

  if (updateError) {
    console.error("webhook/stripe: profile update failed:", updateError.code, updateError.message);
    // Release the idempotency ledger so Stripe's retry can reprocess this event.
    // Without this, the orphaned ledger row makes the retry short-circuit on the
    // 23505 path and the subscription change is silently lost.
    const { error: ledgerCleanupError } = await supabaseAdmin
      .from("stripe_webhook_events")
      .delete()
      .eq("event_id", event.id);
    if (ledgerCleanupError) {
      console.error("webhook/stripe: ledger cleanup failed:", ledgerCleanupError.code);
    }
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
