# Cleanup Batch 2 — moderate execution results

**Date:** 2026-05-09  
**Branch:** `chore/cleanup-batch-2-moderate`  
**Scope:** documentation + read-only investigation aligned with `docs/architecture/cleanup-batch-2-plan.md`. **No** product code, questions, quiz/auth/router/CSS/SW, `apps/web` / `apps/mobile` / `packages/core`, `package.json`, or `pnpm-lock.yaml` changes.

## Summary

| Category | Outcome |
| -------- | ------- |
| **Tracked files removed** | **0** — no path satisfied the full orphan checklist (HTML, `package.json` scripts, workflows, Vite, SW, e2e, `assets/js` imports, and zero doc references). |
| **Runtime / sync hooks** | **Unchanged** — `KANGA_ENABLE_BACKEND_SYNC` and `/api/health` behaviour left as-is (defer). |
| **Docs updated** | Yes — see §Evidence table. |

## Evidence: `scripts/` inventory (no deletions)

| File | Referenced by |
| ---- | ------------- |
| `check-static-links.mjs` | `package.json` → `check:static-links` |
| `smoke-static-site.mjs` | `package.json` → `smoke:static`; spawns `smoke-static-site.puppeteer.mjs` |
| `smoke-static-site.puppeteer.mjs` | Invoked from `smoke-static-site.mjs` |
| `validate-questions.cjs` | `package.json` → `validate:questions`, `prebuild` |
| `convert-questions.cjs` | `package.json` → `prebuild`, `gen:core-questions` |
| `build.mjs` | `package.json` → `legacy:build` |
| `optimize-social-images.mjs` | `package.json` → `optimize:images` |
| `gen-og-png.ps1` | Documented in `BACKLOG.md`, `docs/QA-EXECUTION-LOG.md` (operational history) — **not** a `package.json` script; **keep** |

`assets/js/dev/validate-questions.js` remains a **dev/dynamic** path per `dead-code-and-refactor-audit.md` §7.1 — **not** removed.

## Read-only dependency investigation (`pnpm why @supabase/supabase-js`)

Command (repo root): `pnpm why @supabase/supabase-js`

```
Legend: production dependency, optional only, dev only

kangalearner@1.0.0

dependencies:
@supabase/supabase-js 2.105.1
```

**Interpretation:** the root workspace lists `@supabase/supabase-js` as a **direct** production dependency; the static SPA still loads the client from **CDN UMD** in `assets/js` (per audit). Trimming the root dependency remains a **human-approved** change requiring `package.json` + lockfile work — **deferred** (Batch 2B execution, not this PR).

## Item log

| Item | Action | Evidence | Risk | Test coverage |
| ---- | ------ | -------- | ---- | ------------- |
| Batch 2A — “what is deployed today” + backend sync inert + `src/` not shipped | **Docs consolidated** in `dead-code-and-refactor-audit.md` + plan updates | Cross-links to `security-audit-initial.md`, `dependabot-alerts-triage.md`, existing §7.1 / e2e no `/src/main.js` | Low | `check:static-links` |
| Orphan `scripts/*` removal | **Deferred** — none qualified | Full script ↔ `package.json` / caller matrix above | N/A | N/A |
| Remove `src/main.js` | **Deferred** | Audit §4 human decision; Vite/bootstrap | Medium | Would need `site:build`, `smoke:static`, `test:e2e` |
| `KANGA_ENABLE_BACKEND_SYNC` / `/api/health` logic | **Deferred** | User rule: no runtime change that gates quiz/storage | Medium | `smoke:static`, `test:e2e` |
| Root `@supabase/supabase-js` removal | **Deferred** | `pnpm why` shows direct dep; static uses CDN — needs explicit product decision + lockfile PR | Medium | Full QA after dep change |
| `KL_SUPABASE` extra exports | **Deferred** | Audit §7.3 | Medium | `test:e2e` before any trim |
| `quiz-engine.js` TODO / comments | **Deferred** | Near scoring/session logic; absolute rule: no quiz logic change | Medium | `validate:questions`, `test:e2e` |
| Stale “Batch 2 = plan only” wording | **Updated** | Plan merged; moderate docs pass executed | Low | `check:static-links` |

## Commands run (post-change verification)

Recorded in `docs/QA-EXECUTION-LOG.md` for this batch.
