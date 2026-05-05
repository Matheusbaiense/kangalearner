/**
 * Returns a safe, on-origin relative path from an untrusted redirect parameter.
 *
 * Uses a URL round-trip instead of string-prefix checks: the WHATWG URL parser
 * normalises backslashes to forward-slashes, so "/\evil.com" resolves to
 * https://evil.com/ when concatenated with an origin. The round-trip detects
 * all such authority-hijacking patterns regardless of encoding.
 */
export function safeNextPath(raw: string | null, fallback = "/account"): string {
  if (!raw) return fallback;
  try {
    const url = new URL(raw, "https://dummy.invalid");
    if (url.hostname !== "dummy.invalid") return fallback;
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}
