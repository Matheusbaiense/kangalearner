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
    process.env.NODE_ENV = "development";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const { rateLimit } = await import("./rateLimit");
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(true);
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(true);
    expect(await rateLimit("test:dev:1", 2, 60_000)).toBe(false);
  });

  it("denies requests in production without Upstash (fail closed)", async () => {
    process.env.NODE_ENV = "production";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const { rateLimit } = await import("./rateLimit");
    expect(await rateLimit("test:prod:1", 100, 60_000)).toBe(false);
  });
});
