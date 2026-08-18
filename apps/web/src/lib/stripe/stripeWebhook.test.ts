import { describe, expect, it, vi } from "vitest";
import {
  applyStripeSubscriptionEvent,
  mapSubscriptionRole,
  type StripeWebhookStore
} from "./stripeWebhook";

function memoryStore(opts?: {
  insertError?: { code?: string } | null;
  role?: string | null;
  updateError?: { code?: string } | null;
}): StripeWebhookStore & { updates: string[]; ledgerDeleted: string[] } {
  const updates: string[] = [];
  const ledgerDeleted: string[] = [];
  return {
    updates,
    ledgerDeleted,
    insertLedger: async () => ({ error: opts?.insertError ?? null }),
    findRoleByCustomer: async () => opts?.role,
    updateRole: async (_customerId, role) => {
      updates.push(role);
      return { error: opts?.updateError ?? null };
    },
    deleteLedger: async (eventId) => {
      ledgerDeleted.push(eventId);
      return { error: null };
    }
  };
}

describe("mapSubscriptionRole", () => {
  it("maps active and trialing to premium", () => {
    expect(mapSubscriptionRole("customer.subscription.updated", "active")).toBe("premium");
    expect(mapSubscriptionRole("customer.subscription.created", "trialing")).toBe("premium");
  });

  it("maps deleted and inactive statuses to free", () => {
    expect(mapSubscriptionRole("customer.subscription.deleted", "active")).toBe("free");
    expect(mapSubscriptionRole("customer.subscription.updated", "canceled")).toBe("free");
  });
});

describe("applyStripeSubscriptionEvent", () => {
  it("treats unique-violation 23505 as already processed", async () => {
    const store = memoryStore({ insertError: { code: "23505" } });
    const result = await applyStripeSubscriptionEvent({
      eventId: "evt_1",
      eventType: "customer.subscription.updated",
      customerId: "cus_1",
      subscriptionStatus: "active",
      store
    });
    expect(result).toEqual({ kind: "received" });
    expect(store.updates).toEqual([]);
  });

  it("skips admin and super_admin", async () => {
    for (const role of ["admin", "super_admin"] as const) {
      const store = memoryStore({ role });
      const result = await applyStripeSubscriptionEvent({
        eventId: "evt_2",
        eventType: "customer.subscription.updated",
        customerId: "cus_1",
        subscriptionStatus: "active",
        store
      });
      expect(result).toEqual({ kind: "received" });
      expect(store.updates).toEqual([]);
    }
  });

  it("deletes the ledger when the profile update fails", async () => {
    const store = memoryStore({ updateError: { code: "40001" } });
    const result = await applyStripeSubscriptionEvent({
      eventId: "evt_3",
      eventType: "customer.subscription.updated",
      customerId: "cus_1",
      subscriptionStatus: "active",
      store
    });
    expect(result).toEqual({ kind: "error", status: 500, code: "db_error" });
    expect(store.ledgerDeleted).toEqual(["evt_3"]);
  });

  it("rejects a missing customer", async () => {
    const store = memoryStore();
    const result = await applyStripeSubscriptionEvent({
      eventId: "evt_4",
      eventType: "customer.subscription.updated",
      customerId: null,
      subscriptionStatus: "active",
      store
    });
    expect(result).toEqual({ kind: "error", status: 400, code: "missing_customer" });
  });

  it("updates a learner to premium", async () => {
    const store = memoryStore({ role: "free" });
    const spy = vi.fn(store.updateRole);
    store.updateRole = spy;
    const result = await applyStripeSubscriptionEvent({
      eventId: "evt_5",
      eventType: "customer.subscription.updated",
      customerId: "cus_1",
      subscriptionStatus: "active",
      store
    });
    expect(result).toEqual({ kind: "received" });
    expect(spy).toHaveBeenCalledWith("cus_1", "premium");
  });
});
