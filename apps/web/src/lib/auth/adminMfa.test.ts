import { describe, expect, it } from "vitest";
import { adminRequiresAal2 } from "./adminMfa";

describe("adminRequiresAal2", () => {
  it("does not require MFA for free or premium", () => {
    expect(adminRequiresAal2("free", "aal1")).toBe(false);
    expect(adminRequiresAal2("premium", "aal1")).toBe(false);
    expect(adminRequiresAal2("premium", "aal2")).toBe(false);
  });

  it("requires aal2 for admin and super_admin", () => {
    expect(adminRequiresAal2("admin", "aal1")).toBe(true);
    expect(adminRequiresAal2("super_admin", "aal1")).toBe(true);
    expect(adminRequiresAal2("admin", null)).toBe(true);
    expect(adminRequiresAal2("admin", "aal2")).toBe(false);
    expect(adminRequiresAal2("super_admin", "aal2")).toBe(false);
  });
});
