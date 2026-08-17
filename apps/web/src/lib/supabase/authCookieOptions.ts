/**
 * Session cookie flags for @supabase/ssr.
 *
 * `httpOnly` stays false: the browser cookie adapter reads tokens via
 * `document.cookie`. HttpOnly would hide them from the client, desync from
 * middleware rotation, and fire SIGNED_OUT. XSS mitigation is CSP, not HttpOnly.
 *
 * `secure` is on in production (HTTPS / Vercel). Local `next dev` stays HTTP.
 */
export function authCookieOptions(): {
  path: "/";
  sameSite: "lax";
  secure: boolean;
  httpOnly: false;
} {
  return {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false
  };
}
