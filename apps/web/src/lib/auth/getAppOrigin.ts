/**
 * Origin used to build auth redirect/callback URLs.
 * Prefers NEXT_PUBLIC_APP_URL (trailing slash stripped); falls back to the
 * browser origin on the client. Returns "" during SSR when the env is unset.
 */
export function getAppOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}
