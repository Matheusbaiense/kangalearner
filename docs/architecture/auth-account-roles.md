## Auth / Account UI skeleton — roles model (mock)

This branch implements a **UI skeleton** for future authentication and accounts.

### Scope (I1)

- Auth UI pages (login, signup, reset flows) with **local-only validation**
- Account pages (dashboard, profile, settings, privacy, data controls, notifications)
- Premium/pricing/billing placeholders (**no Stripe**)
- Admin dashboard + admin routes (**no backend**)
- Legal/trust pages (privacy, terms, security policy, deletion, not official, support)
- Architecture docs + future Supabase migration draft

### What this is NOT

- No Supabase connection
- No real auth/session
- No backend / API
- No Stripe / billing logic
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
- `assets/js/auth/route-guards.js`: `window.KL_ROUTE_GUARDS`

### Guard notice handoff

When a route is blocked, the guard sets a notice key (e.g. `guards.requireSignIn`) and redirects.
The login page consumes this notice and renders a translated message.
