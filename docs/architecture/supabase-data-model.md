## Future Supabase data model (draft)

This document describes the **planned** data model for future Supabase integration.
Nothing in this branch connects Supabase or applies migrations.

### Goals
- Support account profiles + settings
- Store study progress safely (per-user, per-state)
- Enable premium entitlements and subscriptions later
- Provide admin support surfaces (tickets, data requests, audit logs)
- Keep RLS-first access rules (own-data by default; admin override)

### Migration file
- `supabase/migrations/0001_auth_account_product_schema.sql`

### Tables (planned)
- `profiles`
- `user_settings`
- `user_progress`
- `practice_sessions`
- `session_answers`
- `mistake_reviews`
- `user_entitlements`
- `subscriptions`
- `issue_reports`
- `support_tickets`
- `data_requests`
- `audit_logs`
- `app_events`

### RLS design (draft)
- Enable RLS on all user data tables.
- Default policies allow **only the owning user** (`auth.uid()`) to read/write.
- Admin policies are implemented via helper:
  - `public.is_admin()` → checks `profiles.role = 'admin'` for `auth.uid()`

### Notes
- This model intentionally avoids collecting sensitive identity data beyond what Supabase Auth provides.
- Payments are intentionally left as placeholders: subscription rows exist, but **no Stripe wiring** is done here.

