import { describe, expect, it } from "vitest";
import {
  assertNotProductionTarget,
  isProtectedStagingFixture,
  readStagingLogin
} from "./stagingAuth";

describe("assertNotProductionTarget", () => {
  it("allows localhost and staging supabase", () => {
    expect(() =>
      assertNotProductionTarget({
        baseUrl: "http://localhost:3000",
        supabaseUrl: "https://zlsaerfsrfyxpbpxorwo.supabase.co"
      })
    ).not.toThrow();
  });

  it("rejects www production hostname", () => {
    expect(() =>
      assertNotProductionTarget({
        baseUrl: "https://www.kangalearner.com.au/auth/login",
        supabaseUrl: "https://zlsaerfsrfyxpbpxorwo.supabase.co"
      })
    ).toThrow(/production/i);
  });

  it("rejects the production hostname", () => {
    expect(() =>
      assertNotProductionTarget({
        baseUrl: "https://kangalearner.com.au",
        supabaseUrl: "https://zlsaerfsrfyxpbpxorwo.supabase.co"
      })
    ).toThrow(/production/i);
  });

  it("rejects the production Supabase ref", () => {
    expect(() =>
      assertNotProductionTarget({
        baseUrl: "http://localhost:3000",
        supabaseUrl: "https://olgogtaeifyxwzencilo.supabase.co"
      })
    ).toThrow(/production/i);
  });
});

describe("readStagingLogin", () => {
  it("returns null when credentials are missing", () => {
    expect(readStagingLogin({} as NodeJS.ProcessEnv)).toBeNull();
    expect(
      readStagingLogin({ E2E_STAGING_EMAIL: "smoke-a@example.test" } as NodeJS.ProcessEnv)
    ).toBeNull();
  });

  it("returns trimmed credentials", () => {
    expect(
      readStagingLogin({
        E2E_STAGING_EMAIL: "  smoke-a@example.test  ",
        E2E_STAGING_PASSWORD: " secret "
      } as NodeJS.ProcessEnv)
    ).toEqual({ email: "smoke-a@example.test", password: "secret" });
  });
});

describe("isProtectedStagingFixture", () => {
  it("protects smoke-a and smoke-b local parts", () => {
    expect(isProtectedStagingFixture("smoke-a@x.test")).toBe(true);
    expect(isProtectedStagingFixture("smoke-b@x.test")).toBe(true);
    expect(isProtectedStagingFixture("other@x.test")).toBe(false);
  });
});
