# Mobile App Roadmap - Android + iPhone

Last updated: 2026-05-31

## Decision

KangaLearner mobile uses Expo + React Native + TypeScript for v1. Flutter also targets Android and iOS, but it would introduce Dart and a second app domain layer. Expo lets the mobile app reuse `@kanga/core`, TypeScript types, Supabase auth concepts, and existing product rules.

The app is guest-first: learners can practice without an account, then sign in later to sync progress. AI tutor/chat is outside v1, with a plugin boundary prepared for a later release.

## Release Shape

- Native app shell with Expo Router tabs: Home, Learn, Practice, Mock Test, Profile.
- Offline-first learning, practice, saved questions, wrong/unanswered review, and mock sessions.
- Optional Supabase auth and sync after guest usage.
- No camera, contacts, location, or push permissions in v1.
- WebView is not used for core product flows.

## Splits

| Split | Scope | Status |
| --- | --- | --- |
| 0 | Architecture docs, Expo SDK upgrade, lint baseline | Done (SDK 56, doctor 21/21, lint green) |
| 1 | Native app shell, tabs, theme, safe areas | In progress |
| 2 | Offline Learn and Practice using `@kanga/core` | In progress |
| 3 | Mock Test session, timer, result, review, local persistence | In progress |
| 4 | Supabase auth, deep links, local sync queue | In progress (logic + unit tests done; live OAuth/redirect pending) |
| 5 | iOS/Android QA hardening, performance, memory, accessibility | Pending |
| 6 | EAS builds, TestFlight, Play Internal Testing, legal/store assets | Blocked (external accounts) |

## Store And Auth Checklist

Legend: `[x]` done · `[~]` verified in code/docs but pending live confirmation · `[ ]` blocked / not started.

- [ ] Apple Developer Program enrollment (external — needed for iOS TestFlight).
- [ ] Google Play Console enrollment (external — needed for Android internal testing).
- [ ] Expo/EAS project created and real project ID stored in `apps/mobile/app.json` (today: `extra.eas.projectId` placeholder `configure-in-expo-dashboard`; needs `eas login`).
- [x] iOS bundle ID: `com.kangalearner.app` (set in `app.json`).
- [x] Android package: `com.kangalearner.app` (set in `app.json`).
- [~] Supabase redirect URL: `kangalearner://auth/callback` (wired in `src/lib/supabase.ts`/`app.json` scheme; needs dashboard allow-list confirmation).
- [ ] Google OAuth configured for iOS and Android (Supabase dashboard — external).
- [~] RLS for `profiles`, `question_attempts`, `mock_sessions`: static review of migrations 004/005/013/020 confirms `WITH CHECK (auth.uid() = user_id)`; live re-confirmation via Supabase MCP pending.
- [ ] Privacy Policy and Terms updated for mobile store declarations (email, optional name, progress, mock sessions, minimal device/app metadata; no camera/location/contacts/notifications).

## Implemented This Session

- Extracted pure sync logic to `src/lib/sync-logic.ts` (no RN/Supabase imports) and pointed `local-store.ts`/`sync.ts` at it.
- Added vitest to `@kanga/mobile` with unit tests for pass threshold (24/30), attempt dedupe key, offline sync queue (upsert/remove), and mock-of-30 selection.
- Verified: mobile `lint`, `doctor` (21/21), root `pnpm test` (50 tests), and `@kanga/web` build.

## Acceptance Criteria

- App opens on a modern test device in under 2 seconds.
- Practice and Mock Test work offline and persist after app restart.
- Guest progress survives sign-in and sync does not create duplicates.
- Sync failure never blocks learning; Profile shows pending sync state.
- Main touch targets are at least 44 px.
- VoiceOver and TalkBack can navigate tabs, questions, options, and results.
- No crash during a 30-minute smoke session.
