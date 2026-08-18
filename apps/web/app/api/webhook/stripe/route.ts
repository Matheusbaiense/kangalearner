import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { log } from "@/lib/log";
import { REQUEST_ID_HEADER, requestIdFrom } from "@/lib/requestId";
import {
  applyStripeSubscriptionEvent,
  type StripeWebhookStore,
  type SubscriptionRole
} from "@/lib/stripe/stripeWebhook";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  return _stripe;
}

function supabaseStripeStore(): StripeWebhookStore {
  return {
    async insertLedger(eventId, eventType) {
      const { error } = await supabaseAdmin
        .from("stripe_webhook_events")
        .insert({ event_id: eventId, event_type: eventType });
      return { error };
    },
    async findRoleByCustomer(customerId) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();
      return profile?.role;
    },
    async updateRole(customerId, role: SubscriptionRole) {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ role })
        .eq("stripe_customer_id", customerId);
      return { error };
    },
    async deleteLedger(eventId) {
      const { error } = await supabaseAdmin
        .from("stripe_webhook_events")
        .delete()
        .eq("event_id", eventId);
      return { error };
    }
  };
}

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

  const subscription = event.data.object as Stripe.Subscription;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

  const result = await applyStripeSubscriptionEvent({
    eventId: event.id,
    eventType: event.type,
    customerId,
    subscriptionStatus: subscription.status ?? "",
    store: supabaseStripeStore()
  });

  if (result.kind === "error") {
    if (result.code === "missing_customer") {
      log("error", "stripe.webhook.missing_customer", {
        requestId,
        action: "resolve_customer",
        eventId: event.id
      });
    } else {
      log("error", "stripe.webhook.db_error", {
        requestId,
        action: "apply_event",
        eventId: event.id
      });
      Sentry.captureException(new Error("stripe webhook apply failed"), {
        tags: { area: "stripe_webhook", step: "apply" },
        extra: { eventId: event.id }
      });
    }
    return NextResponse.json({ error: result.code }, { status: result.status });
  }

  return NextResponse.json({ received: true });
}
