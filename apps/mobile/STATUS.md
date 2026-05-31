# Mobile App - Status

**Status:** MVP native implementation in progress.

The package now targets Expo + React Native + TypeScript for Android and iPhone. The v1 direction is guest-first, offline-first learning and mock tests with optional Supabase auth/sync.

Current scope:

- Expo Router tab shell: Home, Learn, Practice, Mock Test, Profile.
- Native theme and shared UI primitives.
- `@kanga/core` question/domain reuse.
- Local persistence baseline for preferences, answers, saved questions, mock sessions, and sync queue.
- Supabase auth client boundary prepared for mobile deep links.
- Native Supabase sync queue upload for attempts and mock sessions.

Completed gates:

- `pnpm install`
- `pnpm --filter @kanga/mobile run lint`
- `pnpm --filter @kanga/mobile run doctor` (21/21)
- `pnpm --filter @kanga/mobile run test` (vitest, 23 tests) — also runs under root `pnpm test`.

Tested logic:

- Pure, RN-free helpers live in `src/lib/sync-logic.ts` (attempt dedupe key, remote row builders, pass threshold, offline queue ops) so they can be unit-tested in node.
- Coverage: pass threshold 24/30, attempt dedupe by `device_id + question_id + answered_at`, sync queue upsert/remove (dedupe by id), and mock-of-30 selection.

Next gates (blocked on external accounts/credentials):

- Real Expo/EAS project + `extra.eas.projectId` (placeholder today).
- EAS Build: Android internal + iOS TestFlight (Apple Developer / Google Play accounts).
- Supabase mobile redirect/OAuth setup + live RLS re-confirmation before enabling production sync.
- iOS/Android simulator smoke once native toolchains are available.
