import { afterEach, describe, expect, it, vi } from "vitest";
import { log, logContext, mask } from "./log";
import { REQUEST_ID_HEADER } from "./requestId";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("mask", () => {
  it("hides short identifiers entirely", () => {
    expect(mask("abc")).toBe("***");
    expect(mask(null)).toBeUndefined();
  });

  it("keeps edges of longer identifiers", () => {
    expect(mask("cus_1234567890abcd")).toBe("cus_…abcd");
  });
});

describe("log", () => {
  it("emits one JSON line with level, event, requestId, masked userId, action", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    log("error", "attempts.insert_failed", {
      requestId: "11111111-1111-4111-8111-111111111111",
      userId: mask("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"),
      action: "insert",
      code: "23505"
    });
    expect(spy).toHaveBeenCalledTimes(1);
    const parsed = JSON.parse(String(spy.mock.calls[0]?.[0])) as Record<string, unknown>;
    expect(parsed.level).toBe("error");
    expect(parsed.event).toBe("attempts.insert_failed");
    expect(parsed.requestId).toBe("11111111-1111-4111-8111-111111111111");
    expect(parsed.userId).toBe("aaaa…eeee");
    expect(parsed.action).toBe("insert");
    expect(parsed.code).toBe("23505");
    expect(parsed.ts).toMatch(/^\d{4}-/);
  });

  it("uses warn and info consoles for those levels", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const info = vi.spyOn(console, "log").mockImplementation(() => {});
    log("warn", "stripe.webhook.skip_privileged_user", { action: "skip" });
    log("info", "ping.ok", { action: "probe" });
    expect(JSON.parse(String(warn.mock.calls[0]?.[0])).level).toBe("warn");
    expect(JSON.parse(String(info.mock.calls[0]?.[0])).level).toBe("info");
  });

  it("redacts password, token, authorization, and rawBody", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    log("error", "never.secrets", {
      password: "hunter2",
      token: "sk_live_xxx",
      authorization: "Bearer abc",
      rawBody: "{secret}",
      code: "ok"
    });
    const line = String(spy.mock.calls[0]?.[0]);
    expect(line).not.toContain("hunter2");
    expect(line).not.toContain("sk_live");
    expect(line).not.toContain("Bearer");
    expect(line).not.toContain("{secret}");
    const parsed = JSON.parse(line) as Record<string, unknown>;
    expect(parsed.code).toBe("ok");
    expect(parsed.password).toBe("[redacted]");
    expect(parsed.token).toBe("[redacted]");
    expect(parsed.authorization).toBe("[redacted]");
    expect(parsed.rawBody).toBe("[redacted]");
  });
});

describe("logContext", () => {
  it("pulls request id and masks user id", () => {
    const headers = new Headers({ [REQUEST_ID_HEADER]: "22222222-2222-4222-8222-222222222222" });
    expect(
      logContext({ headers }, { userId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", action: "delete" })
    ).toEqual({
      requestId: "22222222-2222-4222-8222-222222222222",
      userId: "aaaa…eeee",
      action: "delete"
    });
  });
});
