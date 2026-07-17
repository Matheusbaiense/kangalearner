# Mobile App Roadmap - Android + iPhone

Last updated: 2026-06-01

## Decision

KangaLearner mobile uses Expo + React Native + TypeScript for v1. Flutter also targets Android and iOS, but it would introduce Dart and a second app domain layer. Expo lets the mobile app reuse `@kanga/core`, TypeScript types, Supabase auth concepts, and existing product rules.

The app is guest-first: learners can practice without an account, then sign in later to sync progress. AI tutor/chat is outside v1, with a plugin boundary prepared for a later release.

Mobile monetization uses a hybrid ads direction: direct local sponsor slots first, Google Ad Manager inventory second, and AdMob banner fallback only when configured. KangaLearner is not positioned for children; it targets learners old enough to drive. Ads must avoid interrupting study/test flows, must be clearly labeled, and must stay behind env kill switches.

## Product Ecosystem Direction

KangaLearner should grow as a licence companion ecosystem, not only a learner-test question bank:

- **Kanga Learn:** WA learner theory, topic explanations, practice, saved questions, mock tests and readiness signals.
- **Kanga Mobile:** offline-first daily study app with guest progress, saved/wrong/unanswered review and optional sync.
- **Kanga Drive:** future HPT/PDA preparation, licence journey checklist and driving-hours companion that points users back to official Transport WA services.
- **Kanga Connect:** future trusted instructor/community layer using the existing marketplace direction only after core progress/sync is reliable.
- **Kanga Tutor:** future multilingual AI explanation layer behind the existing tutor plugin boundary.

Do not present future layers as live features until they are implemented and verified.

## Release Shape

- Native app shell with Expo Router tabs: Home, Learn, Practice, Mock Test, Profile.
- Offline-first learning, practice, saved questions, wrong/unanswered review, and mock sessions.
- Optional Supabase auth and sync after guest usage.
- Hybrid ads layer for low-friction placements: Home, Learn, Practice inline after several questions, and Mock Test result only.
- No camera, contacts, location, or push permissions in v1.
- WebView is not used for core product flows.

## Splits

| Split | Scope                                                             | Status                                                              |
| ----- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| 0     | Architecture docs, Expo SDK upgrade, lint baseline                | Done (SDK 56, doctor 21/21, lint green)                             |
| 1     | Native app shell, tabs, theme, safe areas                         | In progress                                                         |
| 2     | Offline Learn and Practice using `@kanga/core`                    | In progress                                                         |
| 3     | Mock Test session, timer, result, review, local persistence       | In progress                                                         |
| 4     | Supabase auth, deep links, local sync queue                       | In progress (logic + unit tests done; live OAuth/redirect pending)  |
| 5     | iOS/Android QA hardening, performance, memory, accessibility      | Pending                                                             |
| 6     | EAS builds, TestFlight, Play Internal Testing, legal/store assets | In progress (EAS init + Android Preview reported successful)        |
| 7     | Hybrid ads: direct sponsors + GAM + AdMob fallback                | In progress (Android IDs/docs done; iOS IDs + store review pending) |

## Store And Auth Checklist

Legend: `[x]` done · `[~]` verified in code/docs but pending live confirmation · `[ ]` blocked / not started.

- [ ] Apple Developer Program enrollment (external — needed for iOS TestFlight).
- [ ] Google Play Console enrollment (external — needed for Android internal testing).
- [x] Expo/EAS project created and real project ID stored in `apps/mobile/app.json`.
- [x] iOS bundle ID: `com.kangalearner.app` (set in `app.json`).
- [x] Android package: `com.kangalearner.app` (set in `app.json`).
- [~] Supabase redirect URL: `kangalearner://auth/callback` (wired in `src/lib/supabase.ts`/`app.json` scheme; needs dashboard allow-list confirmation).
- [ ] Google OAuth configured for iOS and Android (Supabase dashboard — external).
- [~] RLS for `profiles`, `question_attempts`, `mock_sessions`: static review of migrations 004/005/013/020 confirms `WITH CHECK (auth.uid() = user_id)`; live re-confirmation via Supabase MCP pending.
- [x] Privacy Policy and Terms updated for mobile store declarations (`STORE-PRIVACY-DECLARATIONS.md` generated).
- [x] AdMob/GAM production app IDs and ad unit IDs created and configured in `app.json` and `.env`.
- [x] `app-ads.txt` published on the KangaLearner domain.
- [~] Google UMP gather-consent hook wired in code; console message publication and real-device behavior still need confirmation.
- [~] ATT usage description configured for iOS; runtime ATT prompt behavior must be verified in a development/TestFlight build.
- [ ] Google Play "contains ads", Data Safety, and App Store Privacy labels updated before store submission.
- [~] Saved questions sync: web guest `kl-saved` migrates via `/api/saved-questions/bulk`, and mobile saved/unsaved toggles sync through the native queue. Live Supabase/device verification remains pending.

## Implemented This Session

- Added mobile hybrid ads foundation: direct sponsor campaign selection, GAM-first Google banner resolution, AdMob fallback, UMP/SDK initialization, and safe render-null behavior when native ads are unavailable.
- Added mobile ad slots in Home, Learn, Practice (after several question cards), and Mock Test results; Mock Test sessions remain ad-free while the learner is answering.
- Added `apps/mobile/.env.example` with ad kill switches and per-slot GAM/AdMob environment variables.
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
