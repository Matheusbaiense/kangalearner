# Supabase Auth hardening checklist

## Session cookies (web, 2026-08)

KangaLearner is a Next.js App Router app on Vercel (`kangalearner.com.au`), not GitHub Pages. Session lives in cookies shared by middleware and the browser client.

- **Cookie adapter, not localStorage.** Middleware rotates the refresh token into cookies. A localStorage copy would go stale and fire `SIGNED_OUT`. See `apps/web/src/lib/supabase/client.ts`.
- **Flags:** `SameSite=Lax`, `path=/`, `Secure` when `NODE_ENV=production`, `httpOnly: false`. Set via `authCookieOptions()` on every `createServerClient` / `createBrowserClient`.
- **Why not HttpOnly:** the browser adapter reads tokens with `document.cookie`. HttpOnly would hide them and break middleware sync. XSS can steal the session; mitigation is CSP `script-src` nonce (already on). `style-src` nonce remains deferred (Sprint 12 / SEC-08).
- **Rate-limit IP:** `getClientIp` trusts `x-real-ip` / first `x-forwarded-for` hop because Vercel sets those at the edge. No change while the app stays only on Vercel.

## Current status (stale sections below)

The bullets under “Before enabling real auth” mix GitHub Pages-era notes with live production. Treat **Session cookies** above as current; a full rewrite of this file is Fase 8.1.

- Supabase Auth is live on project `olgogtaeifyxwzencilo`.
- Service role key is server-only (`src/lib/supabase/admin.ts`).
- Password hashing is handled by Supabase Auth, not by KangaLearner.


## Before enabling real auth in production

### Required

- Configure Site URL.
- Configure Redirect URLs for:
  - GitHub Pages URL
  - `#auth-callback`
  - `#reset-password`
  - any future custom domain
- Configure password policy.
- Enable leaked password protection, if available on the plan/project.
- Configure CAPTCHA for signup/login/reset if supported by the chosen Supabase setup.
  **2026-08-18:** widget Turnstile no app (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`). Toggle no dashboard **ainda OFF**. Depois do deploy: Attack Protection → provider Cloudflare Turnstile → colar secret → Save (o Save liga o toggle). Não fazer isso antes do widget estar em Production.
- Confirm email templates do not expose internal URLs.
- Confirm anon key is only used as public frontend key.
- Confirm service role key is never used in frontend.
- Confirm RLS policies before any progress sync.
- Confirm database tables have least-privilege policies.
- Confirm OAuth provider redirect URLs match Supabase and GitHub Pages.
- Confirm session expiry/recovery flows.
- Confirm account deletion/export future requirements.

### Deferred

- MFA/TOTP.
- Rate limit on custom backend/API.
- Edge Function throttling.
- Audit logs.
- WAF/CDN rules.
- Paid plan security features.

## Manual QA required

- Signup.
- Login.
- Password reset.
- OAuth callback.
- Session refresh.
- Logout.
- Expired session.
- Wrong redirect URL.
- Browser console.
- Network requests.

## Do not do

- Do not store raw passwords.
- Do not hash passwords in frontend.
- Do not use MD5/SHA1/SHA256 for password storage.
- Do not expose service role key.
- Do not rely on frontend-only rate limiting.
