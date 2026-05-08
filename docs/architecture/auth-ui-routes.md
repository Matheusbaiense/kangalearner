## Auth / Account / Premium / Admin routes (static site)

This document describes the **hash-based** routes implemented in the static site (repo root) for the I1 UI skeleton.

### Principles
- **No real authentication**: no Supabase session, no backend calls, no `.env`.
- **Role model is mocked locally** using `localStorage`.
- **Guards are client-side only** and exist to keep UI flows realistic.
- **Language never auto-switches** (EN/PT/ES are user-controlled; bilingual modes remain manual).
- **Quiz root safety**: guarded/static routes render into `#page-root`; quiz routes still use `#quiz-root` and are not destroyed.

### Route groups

#### Auth (public)
- `#login`
- `#signup`
- `#forgot-password`
- `#reset-password`
- `#verify-email`
- `#auth-callback`
- `#logout`
- `#session-expired`

#### Account (guarded: signed-in)
- `#account`
- `#profile`
- `#settings`
- `#security`
- `#privacy-settings`
- `#data-controls`
- `#notifications`

#### Premium / pricing / billing
- Public:
  - `#pricing`
- Guarded (premium or admin):
  - `#premium`
  - `#billing`
  - `#upgrade-success`
  - `#upgrade-cancelled`

#### Admin (guarded: admin)
- `#admin`
- `#admin-users`
- `#admin-reports`
- `#admin-content`
- `#admin-support`
- `#admin-data-requests`
- `#admin-audit-log`

#### Legal / trust (public)
- `#privacy-policy`
- `#terms`
- `#security-policy`
- `#data-deletion`
- `#not-official`
- `#contact-support`

### Key files
- `assets/js/router.js`: route table + `#page-root` renderer + guard hook
- `assets/js/auth/mock-auth-state.js`: mock role state
- `assets/js/auth/route-guards.js`: guard decisions + notice handoff
- `assets/js/pages/*-page.js`: page renderers
- `assets/js/locales.js`: EN/PT/ES strings (static i18n)

