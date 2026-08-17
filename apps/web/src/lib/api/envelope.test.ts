import { describe, expect, it } from "vitest";
import { apiError, apiOk, parseApiError, readApiOkData } from "./envelope";

describe("apiOk / apiError", () => {
  it("returns { ok: true } without a data field when there is no payload", async () => {
    const res = apiOk();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("wraps success payloads in data", async () => {
    const res = apiOk({ users: [1], total: 1 });
    await expect(res.json()).resolves.toEqual({ ok: true, data: { users: [1], total: 1 } });
  });

  it("never puts an internal message on error bodies", async () => {
    const res = apiError("db_error", 500);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ ok: false, error: { code: "db_error" } });
    expect(JSON.stringify(body)).not.toMatch(/message/i);
  });

  it("forwards headers on success", async () => {
    const res = apiOk(undefined, { headers: { "x-test": "1" } });
    expect(res.headers.get("x-test")).toBe("1");
    await expect(res.json()).resolves.toEqual({ ok: true });
  });
});

describe("parseApiError", () => {
  it("reads the envelope code", () => {
    expect(parseApiError({ ok: false, error: { code: "too_many_requests" } }, 429)).toEqual({
      code: "too_many_requests",
      action: "retry"
    });
  });

  it("still reads legacy { error: string } bodies", () => {
    expect(parseApiError({ error: "unauthorized" }, 401)).toEqual({
      code: "unauthorized",
      action: "reauth"
    });
  });

  it("maps 5xx and unknown bodies to stable codes without leaking text", () => {
    expect(parseApiError({ error: "disk full on pg-14" }, 500)).toEqual({
      code: "internal_error",
      action: "retry"
    });
    expect(parseApiError({ error: "Unauthorized" }, 401)).toEqual({
      code: "unauthorized",
      action: "reauth"
    });
    expect(parseApiError(null, 403)).toEqual({
      code: "forbidden",
      action: "toast"
    });
    expect(parseApiError({ ok: false, error: { code: "reauth_required" } }, 403)).toEqual({
      code: "reauth_required",
      action: "reauth"
    });
  });
});

describe("readApiOkData", () => {
  it("unwraps envelope data and rejects failures", () => {
    expect(readApiOkData<{ total: number }>({ ok: true, data: { total: 3 } })).toEqual({
      total: 3
    });
    expect(readApiOkData({ ok: false, error: { code: "forbidden" } })).toBeNull();
    expect(readApiOkData({ users: [] })).toBeNull();
  });
});
