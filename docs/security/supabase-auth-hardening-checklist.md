# Supabase Auth hardening checklist

## Current status

- Supabase Auth foundation exists in the static app.
- Supabase real project is not connected yet.
- No env/secrets are committed.
- No service role key is used in frontend.
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
