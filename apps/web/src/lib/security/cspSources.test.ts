import { describe, expect, it } from "vitest";
import { TURNSTILE_ORIGIN, withTurnstileCsp } from "./cspSources";

describe("withTurnstileCsp", () => {
  it("adds challenges.cloudflare.com to script, frame, and connect", () => {
    const next = withTurnstileCsp({
      scriptSrc: "script-src 'self'",
      connectSrc: "connect-src 'self'",
      frameSrc: "frame-src https://js.stripe.com"
    });
    expect(next.scriptSrc).toContain(TURNSTILE_ORIGIN);
    expect(next.connectSrc).toContain(TURNSTILE_ORIGIN);
    expect(next.frameSrc).toContain(TURNSTILE_ORIGIN);
  });
});
