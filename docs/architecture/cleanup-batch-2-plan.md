# Cleanup Batch 2 plan

## Status (2026-05-09)

1. **Planning PR (merged to `main`):** introduced this document + QA log entry — **docs only**, no execution.
2. **Moderate execution (`chore/cleanup-batch-2-moderate`):** **documentation + read-only investigation only** — consolidated deploy reality, backend-sync **documentation** (no runtime edits), `scripts/` evidence matrix, `pnpm why @supabase/supabase-js` capture. **Zero tracked file removals.** See `docs/architecture/cleanup-batch-2-results.md`.

Future PRs still own: code deletion (`src/`), dependency trims, `KANGA_ENABLE_BACKEND_SYNC` behaviour, `KL_SUPABASE` export surface, CSS/SW work — see §Recommended Batch 2C and the results ledger.

## Executive summary

Cleanup Batch 2 started as a **planning** batch: it converts existing audits into a safe, staged execution plan for later PRs. **Moderate follow-up** (same theme, still low blast radius) extends that with **docs alignment + evidence tables**, without touching product code or dependencies.

- **Planning merge:** no code, dependencies, lockfile, questions, quiz/auth/router logic, CSS, or service worker changes.
- **Moderate merge (this wave):** still **no** code / deps / lockfile / questions / quiz / auth / router / CSS / SW; **no** `apps/web` | `apps/mobile` | `packages/core`; **no** Supabase/Stripe wiring or rate limiting.
- **Not done yet:** file removals, runtime sync-hook changes, root dependency removal — explicit later PRs + approval.

The plan focuses on low-risk **documentation + investigation** around known technical-debt clusters:

- `KANGA_ENABLE_BACKEND_SYNC` and `/api/health` “backend sync” stub paths (currently inert on GitHub Pages).
- `src/main.js` (and related `src/js/config.js`) not being part of the shipped static `index.html` flow.
- Dependency mapping (`pnpm why`) and human decisions (e.g., root `@supabase/supabase-js` vs CDN UMD usage).
- Documentation alignment for future deploys (`apps/web` and `apps/mobile` are not deployed today).

## Scope

Planning and evidence gathering only:

- Document candidates from `docs/architecture/dead-code-and-refactor-audit.md`
- Cross-reference security posture and triage:
  - `docs/security/security-audit-initial.md`
  - `docs/security/dependabot-alerts-triage.md`
- Identify safe “docs/config only” follow-ups (no code changes)
- Define execution batches (2A/2B/2C) with risks + approvals + tests

## Out of scope

Do not touch yet (explicitly excluded):

- **CSS**
- **Service worker (`sw.js`)**
- **Auth provider / Supabase client implementation**
- **Router tables / navigation**
- **Quiz logic / scoring / state engine**
- **Questions content**
- **Storage schema**
- **Any dependency updates** (`package.json`, `pnpm-lock.yaml`)
- **Any file/function removal**
- **`apps/web`, `apps/mobile`, `packages/core`**
- **Backend/API rate limiting**
- **Supabase/Stripe connections**

## Candidate items

| Item | Area | Evidence | Risk | Proposed action | Requires approval | Test plan |
|---|---|---|---|---|---|---|
| Backend sync stub: `KANGA_ENABLE_BACKEND_SYNC` and `/api/health` probe | Static app runtime | `dead-code-and-refactor-audit.md` flags “inert on Pages” paths and cookie heuristic | Medium (may be relied on in future) | **Docs:** intent + Pages inert behaviour + future gate → see dead-code audit §“What ships today…”. **Code:** still unchanged — follow-up PR if behaviour changes. | Partial (moderate docs) / Yes for code | `pnpm run smoke:static`; `pnpm run test:e2e` (future PRs) |
| `src/main.js` + `src/js/config.js` not in shipped flow | Static build/deploy hygiene | Audit notes: not referenced by `index.html`; E2E asserts no `/src/main.js` usage | Low (planning), Medium (if deleting later) | **Docs added** in dead-code audit (role of `src/`, removal prerequisites). **Deletion** still deferred. | Partial (moderate) / Yes before removal | N/A for docs; future PR: `format:check`, `smoke:static`, `test:e2e` |
| Dual Supabase story: root dependency vs CDN UMD | Dependency hygiene (decision-only) | Audit §4 “Needs human decision”; security triage confirms current production uses static SPA + CDN | Medium (monorepo/hoisting implications) | Plan a **dependency investigation only**: `pnpm why @supabase/supabase-js` at repo root + map direct consumers. Decide whether root dependency is kept for workspace tooling or removable later. | Yes (human decision) | N/A for investigation; future PR would require full QA |
| Public `window.KL_SUPABASE.*` surface (exports not referenced) | API surface | Audit flags `KL_SUPABASE.getPublicEnv/getSupabaseClient/getSupabaseSession` not referenced elsewhere | Medium (public API / debugging) | Keep as-is for now. Add to “defer” list until product confirms whether these are intended public/debug APIs. | Yes (product) | `test:e2e` before any change (future) |
| Documentation alignment for future deploy constraints | Docs | Security audit: rate limit needed before `apps/web` deploy; Dependabot triage: `postcss` advisory before web deploy | Low | Ensure plan captures these as **gates** (not changes now). | No (docs-only) | `check:static-links` (plan PRs) |
| Scripts/paths that “look unused” but need verification | Scripts/docs | Dead-code audit mentions `assets/js/dev/validate-questions.js` etc. | Medium (false positives) | Only inventory + add verification checklist. No deletion. | Yes (future) | Future PR: `validate:questions`, `smoke:static`, `test:e2e` |
| Files clearly not loaded by `index.html`, Vite build, workflows, or tests | Static/deploy hygiene | Your Batch 2 planning criteria + `dead-code-and-refactor-audit.md` (e2e asserts no `/src/main.js`) | Medium (false positives if loaded dynamically) | Evidence checklist captured in `cleanup-batch-2-results.md`. **No tracked orphans found** in `scripts/` for removal. `src/` still deferred (human). | Partial (moderate) | Future PR: `smoke:static`, `test:e2e` |
| Legacy/local scripts not referenced by `package.json`, CI, e2e, or relevant docs | Scripts/tooling | Batch 2 criteria | Medium | **Inventory done** — all tracked `scripts/*` wired or documented; `gen-og-png.ps1` kept (doc history). | Partial (moderate) | N/A for inventory; future PR: repo-wide checks + e2e |
| Old doc references pointing to architecture that no longer exists | Docs | Batch 2 criteria + audits evolution (static SPA + hash router) | Low | Stale “planning-only only” wording updated; deploy reality consolidated in dead-code audit. | **Done (moderate)** | `check:static-links` |
| Inert flags/backend hooks that do not affect static mode today | Static/runtime **docs** | Batch 2 criteria + `KANGA_ENABLE_BACKEND_SYNC` cluster | Medium | **Document-only** expansion in dead-code audit (behaviour unchanged in code). Runtime change still **deferred**. | Partial (moderate) | Future PR: `smoke:static`, `test:e2e` |
| TODO/legacy comments that became inaccurate (“lies”) | Docs/comments | Batch 2 criteria + audit callouts (TODOs, legacy notes) | Low (docs/comments), Medium (if near logic) | **No** `quiz-engine.js` / `app.js` edits in moderate batch (defer near-logic). Plan/audit text refreshed only. | Partial | `format:check` + `smoke:static` |
| Duplicate/conflicting docs | Docs | Batch 2 criteria | Low | Single “deployed today” source-of-truth paragraph + links in dead-code audit; results file cross-links triage + initial audit. | **Done (moderate)** | `check:static-links` |
| Orphan QA scripts (provably not versioned/needed) | Ops/docs | Batch 2 criteria | Medium | None identified for deletion; matrix in results doc. | Partial (moderate) | Future PR: e2e + CI |

## Recommended Batch 2A — safest docs/config cleanup

Docs-only, very low risk:

- Consolidate “what is deployed today” in one place (static Pages vs `apps/web`/`apps/mobile` future) and link:
  - `docs/security/security-audit-initial.md`
  - `docs/security/dependabot-alerts-triage.md`
  - `docs/architecture/dead-code-and-refactor-audit.md`
- Add a short “backend sync stub status” note (why `/api/health` is inert on Pages, and what would enable it later).
- Add an explicit “`src/` is not shipped” note (and why E2E asserts that).

**Moderate execution:** the three bullets above are implemented in `dead-code-and-refactor-audit.md` (new §“What ships today & deferred deploy surfaces”) plus cross-links in `cleanup-batch-2-results.md`. No HTML/Vite/SW edits.

## Recommended Batch 2B — dependency investigation only

No modifications to `package.json` or lockfile; investigation commands + decision points:

- `pnpm why @supabase/supabase-js` (repo root)
- `pnpm why postcss` (root vs `apps/web` — already known via Next)
- Map Dependabot PR branches vs triage (do not merge them; document what they target and why they’re deferred)
- Decision record: what will be allowed as “safe patch updates” vs “requires framework upgrade”

## Recommended Batch 2C — deferred code cleanup

Items that may be dead code but require deeper validation and are **not** executed now:

- Any change to `KANGA_ENABLE_BACKEND_SYNC` logic or `/api/health` probing behaviour
- Any removal of `src/main.js` / `src/js/config.js`
- Any trimming of `window.KL_*` exports
- Any changes to auth/router/quiz/storage/CSS/SW

## Do not touch yet

- CSS
- Service worker (`sw.js`)
- Auth provider / Supabase client
- Router
- Quiz logic
- Questions
- Storage schema
- Dependency updates (`package.json`, `pnpm-lock.yaml`)
- `apps/web`, `apps/mobile`, `packages/core`

## Test plan

For **planning-only** or **docs-only moderate** PRs:

- `pnpm run format:check`
- `pnpm run check:static-links`
- `pnpm run smoke:static` (optional; run if link checker indicates a broader docs change)

For any future execution PR (code/config changes), require:

- `pnpm run smoke:static`
- `pnpm run site:build`
- `pnpm run validate:questions`
- `pnpm run test:e2e`

## Approval checklist

- [x] Planning PR: **plan only** (no code execution) — merged.
- [x] Moderate PR: **docs + investigation only** — no code, deps, lockfile, questions, auth, routes, CSS, SW.
- [ ] Any **file deletion** or **runtime** sync-hook change — still requires separate approval + QA.
- [ ] Confirms investigation commands are acceptable and outputs are documented (`pnpm why` snapshot in results doc).

## Final recommendation

1. **Done:** ship plan doc + moderate results + QA log updates (`cleanup-batch-2-results.md`).
2. **Next:** open small follow-up PRs for each risky cluster (`src/`, deps, sync hooks, `KL_SUPABASE` exports), each with:
   - single theme,
   - explicit risk and rollback,
   - full QA gates (`smoke:static`, `site:build`, `validate:questions`, `test:e2e`),
   - human approval for any deletion or dependency change.

