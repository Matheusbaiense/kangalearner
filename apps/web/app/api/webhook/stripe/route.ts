import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

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
    "customer.subscription.deleted",
  ]);

  if (!HANDLED.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) {
    console.error("webhook/stripe: missing customer id in event", event.id);
    return NextResponse.json({ error: "missing_customer" }, { status: 400 });
  }

  let newRole: SubscriptionRole;

  if (event.type === "customer.subscription.deleted" || INACTIVE_STATUSES.has(subscription.status)) {
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
    .single();

  if (profile?.role === "admin" || profile?.role === "super_admin") {
    console.warn("webhook/stripe: skipping role change for privileged user", customerId);
    return NextResponse.json({ received: true });
  }

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ role: newRole })
    .eq("stripe_customer_id", customerId);

  if (updateError) {
    console.error("webhook/stripe: profile update failed:", updateError.code, updateError.message);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
