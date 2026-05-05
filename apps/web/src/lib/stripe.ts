import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

// Alinhado ao tipo `LatestApiVersion` do pacote `stripe` instalado (ex.: ^17 → 2025-02-24.acacia).
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true
});

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
  const customer = await stripe.customers.create({
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

/**
 * Constantes de XP — centralizadas aqui para consistência
 * entre web e futuro mobile
 */
export const XP_VALUES = {
  PRACTICE_ANSWER: 5,
  MOCK_COMPLETE: 15,
  LEARN_UNIT_COMPLETE: 25,
  MOCK_PASS: 50,
  LEARN_ALL_COMPLETE: 100,
  PERFECT_MOCK: 75
} as const;
