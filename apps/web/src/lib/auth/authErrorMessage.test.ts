import { describe, expect, it } from "vitest";
import { authErrorToUserMessage } from "./authErrorMessage";

describe("authErrorToUserMessage", () => {
  it("never returns the provider message", () => {
    const msg = authErrorToUserMessage("login", {
      code: "invalid_credentials",
      message: "Invalid login credentials"
    });
    expect(msg).not.toContain("Invalid login credentials");
    expect(msg).toMatch(/could not sign in/i);
  });

  it("maps email_not_confirmed", () => {
    expect(authErrorToUserMessage("login", { code: "email_not_confirmed" })).toMatch(
      /confirm your email/i
    );
  });

  it("uses kind-specific fallbacks", () => {
    expect(authErrorToUserMessage("signup")).toMatch(/create an account/i);
    expect(authErrorToUserMessage("oauth")).toMatch(/google/i);
    expect(authErrorToUserMessage("reset")).toMatch(/reset email/i);
  });
});
