import { describe, expect, it, vi } from "vitest";
import { assertNotProductionTarget } from "./stagingAuth";
import {
  interpretOwnAttempts,
  interpretPatchStats,
  interpretPeerAttempts,
  isCiPlaceholderSupabase,
  parseAccessToken,
  parseUserId,
  readStagingPeerLogin,
  restUrl,
  runStagingRlsSmoke,
  statsChanged
} from "./stagingRls";

describe("statsChanged", () => {
  it("is false when fingerprints match", () => {
    expect(
      statsChanged(
        [{ category: "road_rules", total_attempts: 1 }],
        [{ category: "road_rules", total_attempts: 1 }]
      )
    ).toBe(false);
  });

  it("is true when total_attempts changes", () => {
    expect(
      statsChanged(
        [{ category: "road_rules", total_attempts: 1 }],
        [{ category: "road_rules", total_attempts: 0 }]
      )
    ).toBe(true);
  });
});

describe("interpretPatchStats", () => {
  it("treats 200 empty array as write blocked (PostgREST no policy)", () => {
    const result = interpretPatchStats(200, []);
    expect(result.pass).toBe(true);
    expect(result.name).toBe("patch_stats_blocked");
  });

  it("fails when a row comes back (write leaked)", () => {
    expect(interpretPatchStats(200, [{ category: "road_rules", total_attempts: 99 }]).pass).toBe(
      false
    );
  });

  it("treats 401/403 as blocked", () => {
    expect(interpretPatchStats(401, { message: "JWT" }).pass).toBe(true);
    expect(interpretPatchStats(403, { message: "denied" }).pass).toBe(true);
  });

  it("fails on 204 (write may have succeeded with return=minimal)", () => {
    expect(interpretPatchStats(204, null).pass).toBe(false);
  });
});

describe("interpretOwnAttempts", () => {
  it("passes when every row belongs to the caller", () => {
    expect(
      interpretOwnAttempts("aaa", 200, [
        { id: "1", user_id: "aaa" },
        { id: "2", user_id: "aaa" }
      ]).pass
    ).toBe(true);
  });

  it("passes on empty list", () => {
    expect(interpretOwnAttempts("aaa", 200, []).pass).toBe(true);
  });

  it("fails when another user_id is present", () => {
    expect(interpretOwnAttempts("aaa", 200, [{ id: "1", user_id: "bbb" }]).pass).toBe(false);
  });
});

describe("interpretPeerAttempts", () => {
  it("passes on empty list (cannot read B)", () => {
    expect(interpretPeerAttempts("bbb", 200, []).pass).toBe(true);
  });

  it("fails if any row for B is visible", () => {
    expect(interpretPeerAttempts("bbb", 200, [{ id: "1", user_id: "bbb" }]).pass).toBe(false);
  });

  it("treats 401/403 as cannot-read (pass)", () => {
    expect(interpretPeerAttempts("bbb", 403, { message: "denied" }).pass).toBe(true);
  });
});

describe("parse session", () => {
  it("reads access_token and user id", () => {
    expect(parseAccessToken({ access_token: "jwt-a" })).toBe("jwt-a");
    expect(parseUserId({ user: { id: "aaa", email: "a@x.test" } })).toBe("aaa");
    expect(parseAccessToken({})).toBeNull();
    expect(parseUserId({ user: {} })).toBeNull();
  });
});

describe("readStagingPeerLogin", () => {
  it("returns null when peer credentials are missing", () => {
    expect(readStagingPeerLogin({} as NodeJS.ProcessEnv)).toBeNull();
  });

  it("returns trimmed peer credentials", () => {
    expect(
      readStagingPeerLogin({
        E2E_STAGING_PEER_EMAIL: "  smoke-b@example.test  ",
        E2E_STAGING_PEER_PASSWORD: " secret "
      } as NodeJS.ProcessEnv)
    ).toEqual({ email: "smoke-b@example.test", password: "secret" });
  });
});

describe("restUrl / placeholder", () => {
  it("builds PostgREST paths", () => {
    expect(restUrl("https://zlsaerfsrfyxpbpxorwo.supabase.co", "question_attempts")).toBe(
      "https://zlsaerfsrfyxpbpxorwo.supabase.co/rest/v1/question_attempts"
    );
    expect(
      restUrl("https://zlsaerfsrfyxpbpxorwo.supabase.co/", "question_attempts", "user_id=eq.bbb")
    ).toBe("https://zlsaerfsrfyxpbpxorwo.supabase.co/rest/v1/question_attempts?user_id=eq.bbb");
  });

  it("detects CI placeholder URL", () => {
    expect(isCiPlaceholderSupabase("https://ci-build-placeholder.supabase.co")).toBe(true);
    expect(isCiPlaceholderSupabase("https://zlsaerfsrfyxpbpxorwo.supabase.co")).toBe(false);
  });
});

describe("runStagingRlsSmoke (mocked fetch)", () => {
  const staging = "https://zlsaerfsrfyxpbpxorwo.supabase.co";
  const user = { email: "smoke-a@x.test", password: "secret-a" };
  const peer = { email: "smoke-b@x.test", password: "secret-b" };

  it("passes patch-blocked + own attempts + cannot-read-peer", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const body = typeof init?.body === "string" ? init.body : "";
      if (url.includes("/auth/v1/token") && body.includes("smoke-a@")) {
        return jsonRes(200, { access_token: "jwt-a", user: { id: "aaa" } });
      }
      if (url.includes("/auth/v1/token") && body.includes("smoke-b@")) {
        return jsonRes(200, { access_token: "jwt-b", user: { id: "bbb" } });
      }
      if (url.includes("/rest/v1/user_category_stats") && init?.method === "PATCH") {
        return jsonRes(200, []);
      }
      if (url.includes("/rest/v1/user_category_stats")) {
        return jsonRes(200, [{ category: "road_rules", total_attempts: 1 }]);
      }
      if (url.includes("user_id=eq.bbb")) {
        return jsonRes(200, []);
      }
      if (url.includes("/rest/v1/question_attempts")) {
        return jsonRes(200, [{ id: "1", user_id: "aaa" }]);
      }
      return jsonRes(500, { error: "unexpected" });
    });

    const out = await runStagingRlsSmoke({
      supabaseUrl: staging,
      anonKey: "anon",
      user,
      peer,
      fetchImpl: fetchMock as unknown as typeof fetch
    });

    expect(out.ok).toBe(true);
    expect(out.results.map((r) => r.name)).toEqual([
      "patch_stats_blocked",
      "attempts_only_own",
      "cannot_read_peer_attempts"
    ]);
    expect(out.results.every((r) => r.pass)).toBe(true);

    const patchCall = fetchMock.mock.calls.find(
      (c) => String(c[0]).includes("user_category_stats") && c[1]?.method === "PATCH"
    );
    const patchHeaders = patchCall?.[1]?.headers as Record<string, string>;
    expect(patchHeaders.Prefer).toMatch(/return=representation/i);
  });

  it("fails when PATCH returns [] but GET stats changed", async () => {
    let statsReads = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/auth/v1/token")) {
        return jsonRes(200, { access_token: "jwt-a", user: { id: "aaa" } });
      }
      if (url.includes("/rest/v1/user_category_stats") && init?.method === "PATCH") {
        return jsonRes(200, []);
      }
      if (url.includes("/rest/v1/user_category_stats")) {
        statsReads += 1;
        const total = statsReads === 1 ? 1 : 0;
        return jsonRes(200, [{ category: "road_rules", total_attempts: total }]);
      }
      if (url.includes("/rest/v1/question_attempts")) {
        return jsonRes(200, []);
      }
      return jsonRes(500, {});
    });

    const out = await runStagingRlsSmoke({
      supabaseUrl: staging,
      anonKey: "anon",
      user,
      peer: null,
      fetchImpl: fetchMock as unknown as typeof fetch
    });

    expect(out.ok).toBe(false);
    expect(out.results.find((r) => r.name === "patch_stats_blocked")?.detail).toMatch(
      /GET after PATCH/i
    );
  });

  it("fails the suite when PATCH returns a written row", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/auth/v1/token")) {
        return jsonRes(200, { access_token: "jwt-a", user: { id: "aaa" } });
      }
      if (url.includes("/rest/v1/user_category_stats")) {
        return jsonRes(200, [{ category: "road_rules", total_attempts: 1 }]);
      }
      if (url.includes("/rest/v1/question_attempts")) {
        return jsonRes(200, []);
      }
      return jsonRes(500, {});
    });

    const out = await runStagingRlsSmoke({
      supabaseUrl: staging,
      anonKey: "anon",
      user,
      peer: null,
      fetchImpl: fetchMock as unknown as typeof fetch
    });

    expect(out.ok).toBe(false);
    expect(out.results.find((r) => r.name === "patch_stats_blocked")?.pass).toBe(false);
    expect(out.results.some((r) => r.name === "cannot_read_peer_attempts")).toBe(false);
  });

  it("refuses production supabase before any fetch", async () => {
    const fetchMock = vi.fn();
    await expect(
      runStagingRlsSmoke({
        supabaseUrl: "https://olgogtaeifyxwzencilo.supabase.co",
        anonKey: "anon",
        user,
        peer: null,
        fetchImpl: fetchMock as unknown as typeof fetch
      })
    ).rejects.toThrow(/production/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("prod guard still applies", () => {
  it("rejects production host via shared helper", () => {
    expect(() =>
      assertNotProductionTarget({
        baseUrl: "http://localhost:3000",
        supabaseUrl: "https://olgogtaeifyxwzencilo.supabase.co"
      })
    ).toThrow(/production/i);
  });
});

function jsonRes(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
