import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { authCookieOptions } from "./authCookieOptions";
import { requireSupabaseEnv } from "./env";

// Use cookie storage so the browser client stays in sync with the middleware.
//
// By default, @supabase/ssr's createBrowserClient uses localStorage. But the
// Next.js middleware refreshes tokens server-side and writes them to cookies —
// not to localStorage. When the middleware rotates the refresh token, the
// localStorage copy becomes invalid (rotated away), causing onAuthStateChange
// to fire SIGNED_OUT even though valid cookies exist.
//
// By providing the cookie adapter here, every call to getSession() and every
// auth state change reads from the same cookie jar the middleware writes to,
// eliminating the localStorage/cookie divergence.
function cookieAdapter() {
  return {
    getAll() {
      if (typeof document === "undefined" || !document.cookie) return [];
      return document.cookie.split(";").reduce(
        (acc, c) => {
          const eqIdx = c.indexOf("=");
          if (eqIdx !== -1) {
            acc.push({
              name: c.slice(0, eqIdx).trim(),
              value: c.slice(eqIdx + 1).trim()
            });
          }
          return acc;
        },
        [] as { name: string; value: string }[]
      );
    },
    setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
      if (typeof document === "undefined") return;
      for (const { name, value, options = {} } of cookiesToSet) {
        const parts = [`${name}=${value}`];
        if (options.maxAge != null) parts.push(`max-age=${options.maxAge}`);
        else if (options.expires instanceof Date)
          parts.push(`expires=${options.expires.toUTCString()}`);
        if (options.path) parts.push(`path=${options.path}`);
        if (options.domain) parts.push(`domain=${options.domain}`);
        if (options.sameSite) parts.push(`samesite=${options.sameSite}`);
        if (options.secure) parts.push("secure");
        document.cookie = parts.join("; ");
      }
    }
  };
}

/** Browser / Client Components — uses anon key and respects RLS. */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey, {
    cookieOptions: authCookieOptions(),
    cookies: cookieAdapter()
  });
}
