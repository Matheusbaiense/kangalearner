# Cleanup Batch 2 plan

## Executive summary

Cleanup Batch 2 is a **planning-only** batch: it converts existing audits into a safe, staged execution plan for later PRs.

- **No cleanup is executed in this batch.**
- **No code, dependencies, lockfile, questions, quiz/auth/router logic, CSS, or service worker changes.**
- **No Supabase/Stripe connection and no rate limiting work.**

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
| Backend sync stub: `KANGA_ENABLE_BACKEND_SYNC` and `/api/health` probe | Static app runtime | `dead-code-and-refactor-audit.md` flags “inert on Pages” paths and cookie heuristic | Medium (may be relied on in future) | Document current intent + define future “backend deploy gate” rules. Optionally add a follow-up PR that only improves docs/comments (no logic). | Yes (product/infra) | `pnpm run smoke:static`; `pnpm run test:e2e` (future PRs) |
| `src/main.js` + `src/js/config.js` not in shipped flow | Static build/deploy hygiene | Audit notes: not referenced by `index.html`; E2E asserts no `/src/main.js` usage | Low (planning), Medium (if deleting later) | Add explicit documentation: what `src/` is for (Vite dev / legacy) and what would be required before removal. | Yes (before any removal) | N/A for plan; future PR: `format:check`, `smoke:static`, `test:e2e` |
| Dual Supabase story: root dependency vs CDN UMD | Dependency hygiene (decision-only) | Audit §4 “Needs human decision”; security triage confirms current production uses static SPA + CDN | Medium (monorepo/hoisting implications) | Plan a **dependency investigation only**: `pnpm why @supabase/supabase-js` at repo root + map direct consumers. Decide whether root dependency is kept for workspace tooling or removable later. | Yes (human decision) | N/A for investigation; future PR would require full QA |
| Public `window.KL_SUPABASE.*` surface (exports not referenced) | API surface | Audit flags `KL_SUPABASE.getPublicEnv/getSupabaseClient/getSupabaseSession` not referenced elsewhere | Medium (public API / debugging) | Keep as-is for now. Add to “defer” list until product confirms whether these are intended public/debug APIs. | Yes (product) | `test:e2e` before any change (future) |
| Documentation alignment for future deploy constraints | Docs | Security audit: rate limit needed before `apps/web` deploy; Dependabot triage: `postcss` advisory before web deploy | Low | Ensure plan captures these as **gates** (not changes now). | No (docs-only) | `check:static-links` (plan PRs) |
| Scripts/paths that “look unused” but need verification | Scripts/docs | Dead-code audit mentions `assets/js/dev/validate-questions.js` etc. | Medium (false positives) | Only inventory + add verification checklist. No deletion. | Yes (future) | Future PR: `validate:questions`, `smoke:static`, `test:e2e` |

## Recommended Batch 2A — safest docs/config cleanup

Docs-only, very low risk:

- Consolidate “what is deployed today” in one place (static Pages vs `apps/web`/`apps/mobile` future) and link:
  - `docs/security/security-audit-initial.md`
  - `docs/security/dependabot-alerts-triage.md`
  - `docs/architecture/dead-code-and-refactor-audit.md`
- Add a short “backend sync stub status” note (why `/api/health` is inert on Pages, and what would enable it later).
- Add an explicit “`src/` is not shipped” note (and why E2E asserts that).

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

For this **planning-only** PR (docs-only):

- `pnpm run format:check`
- `pnpm run check:static-links`
- `pnpm run smoke:static` (optional; run if link checker indicates a broader docs change)

For any future execution PR (code/config changes), require:

- `pnpm run smoke:static`
- `pnpm run site:build`
- `pnpm run validate:questions`
- `pnpm run test:e2e`

## Approval checklist

- [ ] Confirms Batch 2 is **plan only** (no cleanup executed)
- [ ] Confirms no changes to code, deps, lockfile, questions, auth, routes, CSS, SW
- [ ] Confirms investigation commands are acceptable and outputs are documented
- [ ] Confirms future removals require separate PRs with explicit approval + QA

## Final recommendation

Proceed with Batch 2 as **planning + investigation** only:

1. Ship this plan doc + QA log entry.
2. Use the plan to open small follow-up PRs later, each with:
   - single theme,
   - explicit risk and rollback,
   - full QA gates,
   - and human approval for any deletion or dependency change.

