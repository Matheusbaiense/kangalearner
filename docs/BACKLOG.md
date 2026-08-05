# Backlog - KangaLearner

> Canonical tracker for pending work and blockers, per `AGENTS.md`.
> The root `BACKLOG.md` is a legacy execution map until it is consolidated here.

Last updated: 2026-06-01

## Production Safety Blockers

These items are not code changes in the web/mobile app, but they block a safe wider production launch.

- [ ] **Supabase Auth password hardening**: in Supabase dashboard, enable leaked password protection (HaveIBeenPwned) and set minimum password length to at least 8. Reason: signup runs in the browser; without dashboard policy, weak or leaked passwords can pass.
- [x] **Vercel Production rate-limit env vars**: confirmed via `vercel env pull --environment=production` on 2026-06-01 that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` exist on project `kangalearner-web`.
- [x] **Vercel Production email/cron env audit**: confirmed via `vercel env pull --environment=production` on 2026-06-01 that `RESEND_API_KEY` and `CRON_SECRET` exist.
- [ ] **Vercel Production Stripe env audit**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` did not appear in the pulled Production env on 2026-06-01. Add them before enabling billing/webhook-dependent flows.
- [x] **Backup / Disaster Recovery workflow**: `.github/workflows/backup.yml` now exists. It runs manually and nightly, dumps Supabase Postgres with `pg_dump`, encrypts with GPG, uploads to S3-compatible storage, and verifies the object is listed.
- [ ] **Backup / Disaster Recovery secrets and bucket**: GitHub Actions secrets list was empty on 2026-06-01. Add `SUPABASE_DB_URL`, `BACKUP_ENCRYPTION_KEY`, `BACKUP_BUCKET`, `BACKUP_S3_ENDPOINT`, `BACKUP_AWS_KEY`, and `BACKUP_AWS_SECRET`; create the R2/S3/Backblaze bucket; run the workflow manually once; test restore in staging.

## Important Follow-Ups

- [~] **Sentry observability**: code integration is now present for Next.js App Router (`instrumentation-client.ts`, `instrumentation.ts`, server/edge configs, `app/global-error.tsx`, `@sentry/nextjs`). Still pending: create Sentry project and set `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, and optional source-map upload vars in Vercel Production.
- [x] **Branch protection**: `main` now requires the GitHub Actions status check `build` before merging (configured via `gh api` on 2026-06-01).
- [ ] **Staging environment**: create a separate free Supabase project for staging, apply migrations there before production, and take a pre-DDL backup before schema changes.

## Optional Technical Debt

- [ ] **Dashboard query reduction**: consider deriving totals from `user_category_stats` to reduce the dashboard from 9 queries to roughly 5. Validate with real production data before shipping because it changes total calculation semantics.
- [ ] **Frontend performance**: evaluate `next/image` for the SiteNav avatar and split landing carousels into isolated client components so the rest can stay server-rendered.
- [ ] **Asset cleanup**: remove unused PNGs only after verifying references. `logo.png` is reported unused and large (869 KB); nav currently uses SVG.
- [ ] **Large-file split**: break up `apps/web/src/lib/i18n.ts`, `apps/web/src/lib/learnTopics.ts`, and `apps/web/app/(main)/account/page.tsx`.
- [ ] **Test coverage**: add tests for Stripe webhook behavior, real login E2E, and account deletion.
- [ ] **Admin security**: require MFA for admin accounts.
- [ ] **Repo hygiene**: remove old `docs/CURSOR-PROMPT-SPRINT*.md` session prompts once their useful content is consolidated into canonical docs.

## Operational Notes

- "Pro upgrade" work is explicitly excluded per owner request.
- Previous handoff reported a corrupted worktree named `eloquent-hawking-87ae0c`; treat it as local session damage, not repo state.
- Always validate formatting with `pnpm run format:check` using repo globs. Do not pass absolute paths containing parentheses such as `(main)` to Prettier checks because parentheses can be interpreted as glob groups and silently skip files.
