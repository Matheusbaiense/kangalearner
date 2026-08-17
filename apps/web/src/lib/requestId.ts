export const REQUEST_ID_HEADER = "x-request-id";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Reuse a well-formed incoming id; otherwise mint one. Never trust free-form headers. */
export function resolveRequestId(incoming: string | null | undefined): string {
  const value = typeof incoming === "string" ? incoming.trim() : "";
  if (UUID_RE.test(value)) return value;
  return crypto.randomUUID();
}

export function requestIdFrom(request: { headers: Headers }): string {
  return resolveRequestId(request.headers.get(REQUEST_ID_HEADER));
}

export function stampRequestId(
  headers: Headers,
  incoming: string | null | undefined
): {
  requestId: string;
  headers: Headers;
} {
  const requestId = resolveRequestId(incoming);
  const next = new Headers(headers);
  next.set(REQUEST_ID_HEADER, requestId);
  return { requestId, headers: next };
}
