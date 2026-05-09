# Cleanup Batch 2 — moderate execution results

**Date:** 2026-05-09  
**Branch:** `chore/cleanup-batch-2-moderate`  
**Scope:** documentation + read-only investigation aligned with `docs/architecture/cleanup-batch-2-plan.md`. **No** product code, questions, quiz/auth/router/CSS/SW, `apps/web` / `apps/mobile` / `packages/core`, `package.json`, or `pnpm-lock.yaml` changes.

## Summary

| Category | Outcome |
| -------- | ------- |
| **Tracked files removed** | **0** (Batch 2 moderate); **0** (Batch 2B — no orphan files deleted). |
| **Root dependencies removed** | **1** (Batch 2B): `@supabase/supabase-js` from root `package.json` — static SPA uses CDN UMD; `apps/web` keeps npm dependency. |
| **Runtime / sync hooks** | **Unchanged** — `KANGA_ENABLE_BACKEND_SYNC` and `/api/health` behaviour left as-is (defer). |
| **Docs updated** | Yes — see §Evidence table + Batch 2B section. |

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
| Root `@supabase/supabase-js` removal | **Done (Batch 2B)** | Same evidence as §Batch 2B; `apps/web` retains its own dependency | Low | Full QA gate run on branch |
| `KL_SUPABASE` extra exports | **Deferred** | Audit §7.3 | Medium | `test:e2e` before any trim |
| `quiz-engine.js` TODO / comments | **Deferred** | Near scoring/session logic; absolute rule: no quiz logic change | Medium | `validate:questions`, `test:e2e` |
| Stale “Batch 2 = plan only” wording | **Updated** | Plan merged; moderate docs pass executed | Low | `check:static-links` |

## Commands run (post-change verification)

Recorded in `docs/QA-EXECUTION-LOG.md` for this batch.

---

## Batch 2B — real cleanup (2026-05-09)

**Branch:** `chore/cleanup-batch-2b-real-cleanup`  
**Goal:** apply **evidence-backed** removals only; defer anything touching quiz/auth/router/sync runtime or `apps/*` workspaces.

### Executed

| Item | Action | Evidence | Risk | Tests |
| ---- | ------ | -------- | ---- | ----- |
| Root `@supabase/supabase-js` | **Removed** via `pnpm remove @supabase/supabase-js` | `pnpm why` showed **only** the root package as dependent; `rg` found **no** `import`/`require` of `@supabase/supabase-js` outside `apps/web` (static app uses **CDN UMD** string in `supabase-client.js`); `vite.config.js` does not import the package; root `scripts/*` do not use it | Low (workspace package `apps/web` keeps its own dependency) | `pnpm install --frozen-lockfile`; `format:check`; `check:static-links`; `smoke:static`; `site:build`; `validate:questions`; `test:e2e` **29/29** |

**Files touched:** `package.json` (removed root `dependencies` block containing only this entry), `pnpm-lock.yaml` (pnpm re-resolve).

### Deferred (no code / no removal this batch)

| Item | Reason |
| ---- | ------ |
| `src/main.js`, `src/js/config.js` | Still documented as Vite env sidecar; referenced by `.env.example`, `docs/HISTORY-STATIC-SITE.md`, `format:check` glob; **human** call on delete vs keep for future Vite wiring |
| `KANGA_ENABLE_BACKEND_SYNC` / `/api/health` | Touches `app.js` / `quiz-engine.js` runtime — **out of scope** |
| `gen-og-png.ps1` | Referenced in `BACKLOG.md` / `QA-EXECUTION-LOG` as operational history — not proven orphan |
| Trim `window.KL_SUPABASE` exports (`getPublicEnv`, etc.) | Router/auth-provider use `KL_SUPABASE` methods; export surface change is **auth-adjacent** — defer per audit §7.3 |

### Product / surface confirmation

- **Questions, quiz logic, scoring, auth logic, router, CSS, SW:** unchanged (diff guard: only `package.json`, `pnpm-lock.yaml`, docs).
- **`apps/web`, `apps/mobile`, `packages/core`:** unchanged.

---

## Commands run (Batch 2B verification)

See `docs/QA-EXECUTION-LOG.md` — entry **2026-05-09 — Cleanup Batch 2B (root dependency removal)**.
