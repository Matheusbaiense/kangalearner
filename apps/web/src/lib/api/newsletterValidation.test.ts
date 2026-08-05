import { describe, expect, it } from "vitest";
import { newsletterSchema, WAITLIST_STATES } from "./newsletterValidation";

describe("newsletterSchema", () => {
  it("defaults source to footer when omitted", () => {
    const result = newsletterSchema.parse({ email: "a@b.com" });
    expect(result.source).toBe("footer");
  });

  it("accepts a waitlist source for every coming-soon state", () => {
    for (const state of WAITLIST_STATES) {
      const result = newsletterSchema.safeParse({
        email: "a@b.com",
        source: `waitlist:${state}`
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects sources outside the whitelist", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.com", source: "waitlist:WA" }).success).toBe(
      false
    );
    expect(newsletterSchema.safeParse({ email: "a@b.com", source: "evil" }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "a@b.com", source: "" }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});
