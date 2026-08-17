import { afterEach, describe, expect, it, vi } from "vitest";
import { authCookieOptions } from "./authCookieOptions";

describe("authCookieOptions", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("keeps SameSite=Lax and httpOnly false so the browser adapter can read cookies", () => {
    const options = authCookieOptions();
    expect(options.sameSite).toBe("lax");
    expect(options.httpOnly).toBe(false);
    expect(options.path).toBe("/");
  });

  it("sets Secure in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(authCookieOptions().secure).toBe(true);
  });

  it("omits Secure in development so localhost HTTP still stores the session", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(authCookieOptions().secure).toBe(false);
  });
});
