import { NextResponse } from "next/server";

export type ApiErrorAction = "reauth" | "retry" | "toast";

export type ParsedApiError = {
  code: string;
  action: ApiErrorAction;
};

type EnvelopeInit = {
  status?: number;
  headers?: HeadersInit;
};

const STABLE_CODE = /^[a-z][a-z0-9_]{0,64}$/;

const LEGACY_CODE_ALIASES: Record<string, string> = {
  unauthorized: "unauthorized",
  Unauthorized: "unauthorized",
  forbidden: "forbidden",
  Forbidden: "forbidden"
};

export function apiOk(): NextResponse;
export function apiOk<T>(data?: T, init?: EnvelopeInit): NextResponse;
export function apiOk<T>(data?: T, init?: EnvelopeInit): NextResponse {
  const body = data === undefined ? { ok: true as const } : { ok: true as const, data };
  return NextResponse.json(body, { status: init?.status ?? 200, headers: init?.headers });
}

export function apiError(code: string, status: number, init?: EnvelopeInit): NextResponse {
  return NextResponse.json(
    { ok: false as const, error: { code } },
    { status, headers: init?.headers }
  );
}

function readRawErrorCode(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;
  if (rec.error && typeof rec.error === "object" && rec.error !== null && "code" in rec.error) {
    const code = (rec.error as { code: unknown }).code;
    if (typeof code === "string" && code.length > 0) return code;
  }
  if (typeof rec.error === "string" && rec.error.length > 0) return rec.error;
  return null;
}

function stabilizeCode(raw: string | null, status: number): string {
  if (raw && LEGACY_CODE_ALIASES[raw]) return LEGACY_CODE_ALIASES[raw];
  if (raw && STABLE_CODE.test(raw)) return raw;
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 429) return "too_many_requests";
  if (status >= 500) return "internal_error";
  return "internal_error";
}

export function apiErrorAction(code: string, status: number): ApiErrorAction {
  if (status === 401 || code === "unauthorized") return "reauth";
  if (status === 429 || code === "too_many_requests" || status >= 500) return "retry";
  return "toast";
}

export function parseApiError(body: unknown, status: number): ParsedApiError {
  const code = stabilizeCode(readRawErrorCode(body), status);
  return { code, action: apiErrorAction(code, status) };
}

export function readApiOkData<T>(body: unknown): T | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as { ok?: unknown; data?: T };
  if (rec.ok !== true) return null;
  if (!("data" in rec)) return null;
  return rec.data as T;
}
