# CODEMAP - `apps/mobile` Expo App

## Purpose

`apps/mobile` is the native Android and iPhone client for KangaLearner. It is built with Expo, React Native, Expo Router, and TypeScript. The v1 product is offline-first and guest-first, with optional Supabase auth and sync.

## Runtime Shape

- `app/_layout.tsx` defines the tab shell: Home, Learn, Practice, Mock Test, Profile.
- `app/*.tsx` route files stay thin and delegate to `src/features/*`.
- `src/theme.ts` contains native colors, spacing, typography, and layout constants.
- `src/ui/kit.tsx` contains shared native UI primitives.
- `src/ui/category-icon.tsx` maps core question categories to native vector icons.

## Domain And Storage

- `src/lib/questions.ts` adapts `@kanga/core` questions, categories, AU states, pass threshold, scoring, and random mock selection.
- `src/lib/i18n.ts` contains the mobile string subset for English and Portuguese.
- `src/lib/local-store.ts` stores preferences, attempts, saved questions, mock sessions, and a sync queue using AsyncStorage for the current implementation baseline.
- `src/lib/sync-logic.ts` holds the pure, dependency-free sync helpers (attempt dedupe key, attempt/mock row builders, pass-threshold check, and offline queue upsert/remove). It imports no RN/AsyncStorage/Supabase code so it is unit-testable under vitest (node).
- `src/lib/sync.ts` orchestrates the upload: it loads local state and the queue, calls the `sync-logic` builders, and upserts queued attempts and mock sessions through the native Supabase client with deterministic attempt IDs and queued retry semantics.
- `src/lib/tutor-plugin.ts` defines the future AI tutor boundary without enabling model calls in v1.

## Auth And Sync

- `src/lib/supabase.ts` creates a React Native Supabase client only when mobile env vars are present.
- Mobile redirect URL is `kangalearner://auth/callback`.
- Guest mode is the default. Sign-in can upload local attempts and mock sessions through a deduplicated sync queue when Supabase mobile env vars and redirect URLs are configured.
- Practice must remain usable when auth or sync fails.

## Tests

- `src/lib/sync-logic.test.ts` covers the attempt dedupe key, attempt/mock row builders, pass threshold (24/30), and queue upsert/remove.
- `src/lib/questions.test.ts` covers scoring, the pass threshold, mock-of-30 selection, and percentage rounding.
- Config: `vitest.config.ts` runs in a node environment and aliases `@kanga/core` (and `@kanga/core/data/questions`) to the package source so tests run without a build step. `tsconfig.json` `include` is scoped to `app`/`src` so the config file does not require `@types/node`.

## QA Notes

- Mobile lint baseline: `pnpm --filter @kanga/mobile run lint`.
- Expo health check: `pnpm --filter @kanga/mobile run doctor`.
- Mobile unit tests: `pnpm --filter @kanga/mobile run test` (also runs under root `pnpm test`).
- iOS QA should cover small and large iPhone simulators, cold start, Practice, Mock Test, Profile, and accessibility labels.
- Android QA should cover small and medium emulators, startup, list jank, offline persistence, and TalkBack navigation.
