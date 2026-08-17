import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { log, mask } from "@/lib/log";
import { REQUEST_ID_HEADER, requestIdFrom } from "@/lib/requestId";

// Stripe SDK, lazy init para evitar erro em build sem env vars
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
  const requestId = requestIdFrom(request);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    log("error", "stripe.webhook.misconfigured", { requestId, action: "construct_event" });
    const res = NextResponse.json({ error: "misconfigured" }, { status: 500 });
    res.headers.set(REQUEST_ID_HEADER, requestId);
    return res;
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
    log("error", "stripe.webhook.signature_error", { requestId, action: "construct_event" });
    Sentry.captureException(err, { tags: { area: "stripe_webhook", step: "signature" } });
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
    log("error", "stripe.webhook.idempotency_insert_failed", {
      requestId,
      action: "idempotency_insert",
      code: idempotencyError.code
    });
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

  if (!customerId) {
    log("error", "stripe.webhook.missing_customer", {
      requestId,
      action: "resolve_customer",
      eventId: event.id
    });
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
    log("warn", "stripe.webhook.skip_privileged_user", {
      requestId,
      action: "skip",
      customerId: mask(customerId)
    });
    return NextResponse.json({ received: true });
  }

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ role: newRole })
    .eq("stripe_customer_id", customerId);

  if (updateError) {
    log("error", "stripe.webhook.profile_update_failed", {
      requestId,
      action: "profile_update",
      code: updateError.code
    });
    Sentry.captureException(
      new Error(`stripe webhook profile update failed: ${updateError.code}`),
      {
        tags: { area: "stripe_webhook", step: "profile_update" },
        extra: { eventId: event.id }
      }
    );
    // Release the idempotency ledger so Stripe's retry can reprocess this event.
    // Without this, the orphaned ledger row makes the retry short-circuit on the
    // 23505 path and the subscription change is silently lost.
    const { error: ledgerCleanupError } = await supabaseAdmin
      .from("stripe_webhook_events")
      .delete()
      .eq("event_id", event.id);
    if (ledgerCleanupError) {
      log("error", "stripe.webhook.ledger_cleanup_failed", {
        requestId,
        action: "ledger_cleanup",
        code: ledgerCleanupError.code
      });
    }
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
