# Supabase SQL migrations

Run each file **in numeric order** in **Supabase Dashboard → SQL Editor**. Run one migration at a time and confirm success before the next.

| #   | File                           | Purpose                                    |
| --- | ------------------------------ | ------------------------------------------ |
| 001 | `001_update_updated_at.sql`    | `update_updated_at()` trigger helper       |
| 002 | `002_profiles.sql`             | `profiles` + RLS                           |
| 003 | `003_on_auth_user_created.sql` | Auto-create profile on `auth.users` insert |
| 004 | `004_question_attempts.sql`    | `question_attempts` + indexes + RLS        |
| 005 | `005_mock_sessions.sql`        | `mock_sessions` + RLS                      |
| 006 | `006_user_category_stats.sql`  | Category stats + `upsert_category_stat()`  |
| 007 | `007_gamification.sql`         | XP, badges, levels                         |
| 008 | `008_saved_questions.sql`      | Saved / bookmarked questions               |
| 009 | `009_marketplace_scaffold.sql` | Marketplace tables (schema only)           |
| …   | `010`–`021`                    | Roles, RLS hardening, admin RPCs (see repo) |
| 022 | `022_security_hardening.sql`   | Audit fixes: RLS, RPC lockdown, mock integrity, Stripe idempotency |

## After running all migrations

In **Table Editor**, you should see at least:

`profiles`, `question_attempts`, `mock_sessions`, `user_category_stats`, `user_xp`, `xp_events`, `user_badges`, `saved_questions`, `instructors`, `bookings`, `instructor_reviews`, `marketplace_waitlist`.

## Fresh project vs existing data

These migrations target a **new** project or one where legacy `profiles` / `question_attempts` / `mock_sessions` definitions are not conflicting. If you already applied an older KangaLearner schema, **drop or rename** those tables (and policies) first, or adjust the SQL manually.

## Notes

- `003_on_auth_user_created.sql` installs a trigger on **`auth.users`** (Supabase allows this).
- `apps/web` expects `question_attempts.attempt_id` and `(user_id, attempt_id)` uniqueness (see `/api/attempts`).
- `mock_sessions` requires `country`, `mode`, `passed`, `answers` — the Next.js route was updated to send them.
