import { describe, expect, it } from "vitest";
import { isAuthorizedCron } from "./cronAuth";

describe("isAuthorizedCron", () => {
  it("rejects a missing secret", () => {
    expect(isAuthorizedCron("Bearer secret", undefined)).toBe(false);
    expect(isAuthorizedCron("Bearer secret", "")).toBe(false);
  });

  it("rejects a missing or wrong header", () => {
    expect(isAuthorizedCron(null, "secret")).toBe(false);
    expect(isAuthorizedCron("Bearer other", "secret")).toBe(false);
    expect(isAuthorizedCron("secret", "secret")).toBe(false);
  });

  it("accepts Bearer matching the secret", () => {
    expect(isAuthorizedCron("Bearer secret", "secret")).toBe(true);
  });
});
