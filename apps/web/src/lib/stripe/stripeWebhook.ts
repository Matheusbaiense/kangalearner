export const STRIPE_HANDLED_EVENTS = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted"
]);

const ACTIVE_STATUSES = new Set(["active", "trialing"]);
const INACTIVE_STATUSES = new Set(["canceled", "past_due", "unpaid", "incomplete_expired"]);

export type SubscriptionRole = "premium" | "free";

export type StripeWebhookStore = {
  insertLedger(eventId: string, eventType: string): Promise<{ error: { code?: string } | null }>;
  findRoleByCustomer(customerId: string): Promise<string | null | undefined>;
  updateRole(
    customerId: string,
    role: SubscriptionRole
  ): Promise<{ error: { code?: string } | null }>;
  deleteLedger(eventId: string): Promise<{ error: { code?: string } | null }>;
};

export type StripeWebhookResult =
  | { kind: "received" }
  | { kind: "error"; status: 400 | 500; code: "missing_customer" | "db_error" };

export function mapSubscriptionRole(eventType: string, status: string): SubscriptionRole | null {
  if (eventType === "customer.subscription.deleted" || INACTIVE_STATUSES.has(status)) {
    return "free";
  }
  if (ACTIVE_STATUSES.has(status)) return "premium";
  return null;
}

export async function applyStripeSubscriptionEvent(input: {
  eventId: string;
  eventType: string;
  customerId: string | null | undefined;
  subscriptionStatus: string;
  store: StripeWebhookStore;
}): Promise<StripeWebhookResult> {
  if (!STRIPE_HANDLED_EVENTS.has(input.eventType)) {
    return { kind: "received" };
  }

  const { error: ledgerError } = await input.store.insertLedger(input.eventId, input.eventType);
  if (ledgerError) {
    if (ledgerError.code === "23505") return { kind: "received" };
    return { kind: "error", status: 500, code: "db_error" };
  }

  if (!input.customerId) {
    return { kind: "error", status: 400, code: "missing_customer" };
  }

  const newRole = mapSubscriptionRole(input.eventType, input.subscriptionStatus);
  if (!newRole) return { kind: "received" };

  const role = await input.store.findRoleByCustomer(input.customerId);
  if (role === "admin" || role === "super_admin") {
    return { kind: "received" };
  }

  const { error: updateError } = await input.store.updateRole(input.customerId, newRole);
  if (updateError) {
    await input.store.deleteLedger(input.eventId);
    return { kind: "error", status: 500, code: "db_error" };
  }

  return { kind: "received" };
}
