import { describe, expect, it } from "vitest";
import { evaluateAdminRolePatch } from "./adminRolePatch";

describe("evaluateAdminRolePatch", () => {
  it("blocks an admin assigning premium", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "admin",
      targetRole: "free",
      nextRole: "premium"
    });
    expect(result.ok).toBe(false);
  });

  it("blocks an admin demoting premium to free", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "admin",
      targetRole: "premium",
      nextRole: "free"
    });
    expect(result.ok).toBe(false);
  });

  it("blocks super_admin demoting premium too — Stripe is the only free<->premium path", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "super_admin",
      targetRole: "premium",
      nextRole: "free"
    });
    expect(result.ok).toBe(false);
  });

  it("blocks super_admin assigning premium too", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "super_admin",
      targetRole: "free",
      nextRole: "premium"
    });
    expect(result.ok).toBe(false);
  });

  it("blocks an admin promoting another admin", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "admin",
      targetRole: "free",
      nextRole: "admin"
    });
    expect(result.ok).toBe(false);
  });

  it("lets super_admin assign admin role", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "super_admin",
      targetRole: "free",
      nextRole: "admin"
    });
    expect(result).toEqual({ ok: true });
  });

  it("lets admin set free on a free user (no-op path)", () => {
    const result = evaluateAdminRolePatch({
      callerRole: "admin",
      targetRole: "free",
      nextRole: "free"
    });
    expect(result).toEqual({ ok: true });
  });
});
