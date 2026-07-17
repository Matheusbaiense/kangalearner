import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("rateLimit", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("allows requests in development without Upstash", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

    const { rateLimit } = await import("./rateLimit");
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(true);
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(true);
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(false);
  });

  it("denies requests in production without Upstash (fail closed)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

    const { rateLimit } = await import("./rateLimit");
    expect(await rateLimit("test:prod:1", 100, 60_000)).toBe(false);
  });
});
