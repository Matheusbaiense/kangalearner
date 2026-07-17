# Mobile App - Status

**Status:** MVP native implementation in progress.

The package now targets Expo + React Native + TypeScript for Android and iPhone. The v1 direction is guest-first, offline-first learning and mock tests with optional Supabase auth/sync.

Hybrid ads are now scaffolded for direct local sponsorships plus Google Ad Manager / AdMob fallback. Production ads remain blocked until real AdMob/GAM accounts, production app IDs, ad units, app-ads.txt, consent messaging, and store declarations are completed.

Current scope:

- Expo Router tab shell: Home, Learn, Practice, Mock Test, Profile.
- Native theme and shared UI primitives.
- `@kanga/core` question/domain reuse.
- Local persistence baseline for preferences, answers, saved questions, mock sessions, and sync queue.
- Supabase auth client boundary prepared for mobile deep links.
- Native Supabase sync queue upload for attempts and mock sessions.
- Hybrid ad slots on Home, Learn, Practice, and Mock Test result, with no ads during an active mock exam.

Completed gates:

- `pnpm install`
- `pnpm --filter @kanga/mobile run lint`
- `pnpm --filter @kanga/mobile run doctor` (21/21)
- `pnpm --filter @kanga/mobile run test` (vitest, 28 tests) - also runs under root `pnpm test`.

Tested logic:

- Pure, RN-free helpers live in `src/lib/sync-logic.ts` (attempt dedupe key, remote row builders, pass threshold, offline queue ops) so they can be unit-tested in node.
- Coverage: pass threshold 24/30, attempt dedupe by `device_id + question_id + answered_at`, sync queue upsert/remove (dedupe by id), saved-question sync row/queue behavior, and mock-of-30 selection.
- Ads coverage: direct sponsor development gating, GAM priority over AdMob fallback, and AdMob fallback when GAM is absent.

Next gates (blocked on external accounts/credentials):

- Supabase mobile redirect/OAuth setup + live RLS re-confirmation before enabling production sync.
- iOS/Android simulator smoke once native toolchains are available.
- Google Play Store publish (to remove ad serving limits).
- iOS ads setup: replace sample iOS AdMob app/unit IDs and verify ATT prompt behavior in a development/TestFlight build before release.

Completed external configuration:

- EAS Project initialized and `eas.json` created (Preview APK config).
- Android Internal Preview Build via EAS reported successful by handoff (not re-run in this review).
- Real AdMob App IDs and Ad Units inserted into `app.json` and `.env`.
- Published `app-ads.txt` to web domain.
- UMP gather-consent hook wired in code; store privacy declarations drafted. UMP messages and iOS ATT runtime behavior still need live console/device verification.
