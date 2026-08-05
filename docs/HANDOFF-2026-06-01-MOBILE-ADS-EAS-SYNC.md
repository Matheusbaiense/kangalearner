# Handoff - Mobile Ads, EAS, Guest Sync

Date: 2026-06-01

Read this first, then use the canonical docs it points to. Do not treat this file as the long-term source of truth; it is a session handoff index.

## Canonical Docs To Read

- Agent rules: `AGENTS.md`
- Mobile plan/state: `docs/MOBILE-APP-ROADMAP.md`
- Mobile architecture: `docs/CODEMAPS/mobile-expo-app.md`
- Web/auth/Supabase architecture: `docs/CODEMAPS/web-next-auth-supabase.md`
- Current mobile status: `apps/mobile/STATUS.md`
- Pending/blockers: `BACKLOG.md`
- QA commands/results: `docs/QA-EXECUTION-LOG.md`
- Project memory: `.wolf/cerebrum.md` and `.wolf/memory.md`

## What Changed

Mobile ads:

- Added `react-native-google-mobile-ads` and `expo-build-properties`.
- Added hybrid mobile ads layer in `apps/mobile/src/features/ads/`.
- Waterfall is direct sponsor first, Google Ad Manager second, AdMob fallback.
- Slots are wired in Home, Learn, Practice, and Mock Test result.
- Active mock-test sessions do not show ads.
- `apps/mobile/.env.example` documents ads kill switches and slot IDs.

EAS/mobile build setup:

- `apps/mobile/eas.json` exists with development, preview, and production profiles.
- `apps/mobile/app.json` has a real EAS project ID.
- Android AdMob app ID is real.
- iOS AdMob app ID is still a Google sample ID and must be replaced before iOS release.
- `babel-preset-expo` is explicitly present in `apps/mobile/package.json` to avoid the EAS/Metro monorepo transform issue reported in handoff.
- `apps/mobile/android/` and `apps/mobile/ios/` are ignored in `.gitignore` to avoid committing generated prebuild folders accidentally.

Web guest sync:

- `apps/web/src/lib/syncGuestProgress.ts` runs after a confirmed auth session in `SiteNav`.
- It migrates local answered questions through `/api/attempts/bulk`.
- It migrates local saved question IDs (`kl-saved`) through the new `/api/saved-questions/bulk`.
- Each local cache is removed only after its own API succeeds, so partial migration retries safely.

Mobile saved sync:

- Mobile saved/unsaved question toggles now enqueue `saved_question` work.
- `syncLocalProgress()` upserts saved questions and deletes unsaved questions in `saved_questions`.
- Queue behavior is "last toggle wins" by stable queue id `saved:<questionId>`.

Supabase migrations:

- `supabase/migrations/025_reconcile_prod_attempts_category_stats.sql` adds/repairs production `question_attempts.attempt_id`, the unique `(user_id, attempt_id)` constraint, `user_category_stats`, and `upsert_category_stat`.
- Migration 025 now explicitly revokes public/authenticated execution of `upsert_category_stat` and grants it only to `service_role`.
- `supabase/migrations/026_fix_admin_profiles_policy_recursion.sql` replaces a recursive admin profiles policy with `public.is_admin()`.

Compliance:

- `apps/web/public/app-ads.txt` exists for the Google publisher ID.
- `docs/STORE-PRIVACY-DECLARATIONS.md` is a store checklist, not legal advice.
- UMP is wired in code, but console message publication and real-device behavior still need verification.
- ATT usage description is configured, but the iOS runtime prompt must be verified in dev/TestFlight.

## Verification Already Run

Latest green checks:

- `pnpm --filter @kanga/mobile run lint`
- `pnpm --filter @kanga/mobile run test` - 28 tests
- `pnpm --filter @kanga/web run test` - 12 tests
- `pnpm --filter @kanga/web run build`
- `pnpm test` - 55 total tests
- `git diff --check` - clean except the known CRLF warning for `apps/web/next-env.d.ts`

Known build warnings:

- Existing Next.js `<img>` warnings.
- Existing `SiteNav` hook dependency warning.
- Edge runtime static-generation warning.

## Remaining Work / Blockers

External or account-bound:

- Replace the iOS sample AdMob app/unit IDs with real iOS IDs.
- Publish/verify UMP messages in Google AdMob/Ad Manager.
- Verify ATT behavior in iOS development/TestFlight build.
- Apply or confirm migrations 025/026 in production Supabase.
- Run real Android/iOS device or emulator QA with Supabase sync and ads enabled.
- Complete Google Play/App Store data safety and privacy forms.

Code follow-ups worth doing next:

- Add tests for `/api/saved-questions/bulk` if API route test harness is expanded.
- Decide whether to stay Expo managed without versioning native folders, or intentionally move to committed prebuild folders later.
- Review `apps/web/next-env.d.ts` CRLF noise before committing if it remains in `git status`.

## Important Cautions

- Do not claim iOS ads are production-ready until the sample IDs are replaced and ATT is verified.
- Do not claim production Supabase sync is fully live until migrations 025/026 are applied/confirmed in prod.
- Do not commit generated `apps/mobile/android/` or `apps/mobile/ios/` unless the project explicitly decides to leave Expo managed.
- Preserve unrelated web/resource/nav changes already present in the dirty worktree.
