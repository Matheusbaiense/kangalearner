import Stripe from "stripe";

// Alinhado ao tipo `LatestApiVersion` do pacote `stripe` instalado (ex.: ^22 → 2026-04-22.dahlia).
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (_stripe) return _stripe;
  _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  return _stripe;
}

/**
 * Cria um customer no Stripe no momento do cadastro.
 * Não cobra nada — apenas registra o cliente para uso futuro.
 * Quando pagamentos forem ativados, o customer já existe.
 */
export async function createStripeCustomer(params: {
  email: string;
  name?: string;
  userId: string;
  country?: string;
}): Promise<string> {
  const customer = await getStripe().customers.create({
    email: params.email,
    name: params.name,
    metadata: {
      supabase_user_id: params.userId,
      country: params.country || "AU",
      source: "kangalearner"
    }
  });
  return customer.id;
}
