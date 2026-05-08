## Auth / Account UI skeleton — roles model (mock)

This branch implements a **UI skeleton** for future authentication and accounts.

### Scope (I1)

- Auth UI pages (login, signup, reset flows) with **local-only validation**
- Account pages (dashboard, profile, settings, privacy, data controls, notifications)
- Premium/pricing/billing placeholders (**no Stripe**)
- Admin dashboard + admin routes (**no backend**)
- Legal/trust pages (privacy, terms, security policy, deletion, not official, support)
- Architecture docs + future Supabase migration draft

### Optional Supabase (static site)

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set at build time (or matching `<meta name="kl-supabase-*">` / injected env), the static SPA loads `@supabase/supabase-js` and uses **`window.KL_AUTH_PROVIDER`** for real sessions (email, Google OAuth, password reset). **Service role is never used in the browser.**

When Supabase is **not** configured, behavior matches the original mock-only model: no network auth, guest + `kl-mock-role` drive guards.

### What this is NOT (yet / out of scope)

- No shared backend beyond Supabase Auth for the static product line
- No Stripe / billing logic on static (premium remains mock for routing demos)
- No Liquid Glass work

### Role model

Roles are mocked locally for UI routing + guard behavior:

- `guest` (default)
- `user`
- `premium`
- `admin`

Stored in `localStorage` under key `kl-mock-role`.

### How role affects UX

- **Guest**: can access public routes; account/admin are redirected to `#login`.
- **User**: can access account routes; premium/admin routes are redirected.
- **Premium**: can access premium routes + account routes; admin routes are redirected.
- **Admin**: can access everything.

### Key modules

- `assets/js/auth/mock-auth-state.js`: `window.KL_AUTH_MOCK`
- `assets/js/auth/supabase-client.js`: `window.KL_SUPABASE`
- `assets/js/auth/auth-service.js`: `window.KL_AUTH_SERVICE`
- `assets/js/auth/auth-provider.js`: `window.KL_AUTH_PROVIDER`
- `assets/js/auth/route-guards.js`: `window.KL_ROUTE_GUARDS` (prefers provider when present)

### Guard notice handoff

When a route is blocked, the guard sets a notice key (e.g. `guards.requireSignIn`) and redirects.
The login page consumes this notice and renders a translated message.
