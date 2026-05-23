import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (_stripe) return _stripe;
  _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  return _stripe;
}

/** Lookup existing Stripe customer by Supabase user id (idempotent signup). */
export async function findStripeCustomerByUserId(userId: string): Promise<string | null> {
  const stripe = getStripe();
  const result = await stripe.customers.search({
    query: `metadata['supabase_user_id']:'${userId}'`,
    limit: 1
  });
  return result.data[0]?.id ?? null;
}

/**
 * Creates a Stripe customer at signup. Idempotent: reuses existing customer
 * or uses Stripe idempotency key to prevent duplicates under concurrent OAuth callbacks.
 */
export async function createStripeCustomer(params: {
  email: string;
  name?: string;
  userId: string;
  country?: string;
}): Promise<string> {
  const existing = await findStripeCustomerByUserId(params.userId);
  if (existing) return existing;

  const customer = await getStripe().customers.create(
    {
      email: params.email,
      name: params.name,
      metadata: {
        supabase_user_id: params.userId,
        country: params.country || "AU",
        source: "kangalearner"
      }
    },
    { idempotencyKey: `kanga-customer-${params.userId}` }
  );
  return customer.id;
}
