## Pre-Supabase Code Cleanup — Audit (No changes yet)

Branch: `chore/pre-supabase-code-cleanup`

Constraints (must not change in this stage):
- **No Supabase implementation/connection**
- **No Stripe implementation/connection**
- **Do not alter questions content, quiz scoring, quiz logic**
- **Do not alter public routes or functional behavior**
- **No redesign / no Liquid Glass changes**
- **Do not change `apps/web`, `apps/mobile`, `supabase/` migrations, or `packages/core/src/data/questions.ts` (audit-only unless explicit approval)**

This document is the **pre-removal audit**. No files were removed/modified based on this document yet.

---

## Summary of initial evidence (root / repo hygiene)

### Notable local/output folders present in repo root
- `dist-vite/` (already in `.gitignore`)
- `qa-output/` (already in `.gitignore`)
- `test-results/` (already in `.gitignore`)
- `qa-runner/` (already in `.gitignore`)
- `node_modules/` (already in `.gitignore`)
- `qa-visual-check.mjs` (present locally; currently ignored by `.gitignore`)

**Evidence collected:**
- `git status --short` on `chore/pre-supabase-code-cleanup`: **clean** (no changes shown)
- `.gitignore` currently includes: `dist-vite/`, `qa-output/`, `test-results/`, `qa-*.mjs`, `qa-visual-check.mjs`, and `ChatGPT Image*.png`
- `sw.js` currently uses cache version **`kanga-assets-v9`**
- `index.html` loads CSS in this order: `tokens.css` → `theme.css` → `base.css` → `components.css` → `quiz.css` → `pages.css`

---

## Special case — ChatGPT reference images (DO NOT REMOVE / DO NOT MOVE)

These images are **explicitly excluded** from any removal list in this stage.

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk |
|---|---|---|---|---|---|
| `ChatGPT Image ... .png` (root) | **Not tracked** (currently ignored by `.gitignore`) | **No code references found yet** (string search) | **Keep — future planned / design reference asset** | **Keep, do not delete/move**. Revisit later only if you decide to track them in git (would require changing `.gitignore`) | Low |

Notes:
- `.gitignore` currently has `ChatGPT Image*.png`. Per instruction, **do not change this** in this stage without explicit approval.

---

## Decision table (to be completed before any removals)

> Requirement: Before any removal, produce a complete decision table and group items into:
> 1) Safe to remove now  2) Keep — currently used  3) Keep — future planned
> 4) Duplicate / can consolidate  5) Legacy but risky  6) Needs human decision

### 1) Safe to remove now
_(initial candidates identified; no removals yet — awaiting approval)_

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `dist-vite/` | No | No | Safe to remove now | Remove locally (do not commit). Keep `.gitignore` as-is. | Low | `Test-Path dist-vite` ✅ (`files=96`); ignored in `.gitignore`; `git ls-files dist-vite/**` empty |
| `qa-output/` | No | No | Safe to remove now | Remove locally (do not commit). Keep `.gitignore` as-is. | Low | `Test-Path qa-output` ✅ (`files=197`); ignored in `.gitignore`; `git ls-files qa-output/**` empty |
| `test-results/` | No | No | Safe to remove now | Remove locally (do not commit). Keep `.gitignore` as-is. | Low | `Test-Path test-results` ✅ (`files=20`); ignored in `.gitignore`; `git ls-files test-results/**` empty |
| `dist/` | No | No | Safe to remove now | Remove locally (do not commit). Keep `.gitignore` as-is. | Low | `Test-Path dist` ✅ (`files=62`); ignored in `.gitignore`; `git ls-files dist/**` empty |

### 2) Keep — currently used
_(initial)_

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `index.html` | Yes | N/A | Keep — currently used | Keep | Low | Loads CSS: `assets/css/{tokens,theme,base,components,quiz,pages}.css`; loads JS scripts list below |
| `assets/css/tokens.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/tokens.css" />` |
| `assets/css/theme.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/theme.css" />` |
| `assets/css/base.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/base.css" />` |
| `assets/css/components.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/components.css" />` |
| `assets/css/quiz.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/quiz.css" />` |
| `assets/css/pages.css` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `<link rel="stylesheet" href="assets/css/pages.css" />` |
| `assets/js/storage.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `index.html` loads; provides `KangaStorage` + migrates legacy keys |
| `assets/js/state-availability.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/i18n.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/locales.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts; provides static UI strings |
| `assets/js/auth/mock-auth-state.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts; mock-only auth state |
| `assets/js/auth/route-guards.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts; guards for account/admin |
| `assets/js/category-labels.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/data/questions-loader.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Loads `assets/js/data/questions.js` lazily and exposes `window.KangaQuestions.ensureLoaded()` |
| `assets/js/data/questions.js` | Yes | Yes (runtime via loader) | Keep — currently used | Keep | Low | Loaded by `questions-loader.js` via script injection when needed |
| `assets/js/data/ui-copy.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/data/official-resources.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/data/glossary.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/data/learn-topics.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/pages/*` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | `index.html` loads: `home/learn/practice/mock/progress/glossary/resources/auth/account/premium/admin/legal` page modules |
| `assets/js/error-monitoring.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/analytics.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/router.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts; hash-router; route table points to `window.KL_PAGES.*` |
| `assets/js/quiz-engine.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep (but see “Legacy but risky” notes re: sync) | Medium | Listed in `index.html` scripts; includes gated backend sync calls |
| `assets/js/learn-engine.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep | Low | Listed in `index.html` scripts |
| `assets/js/app.js` | Yes | Yes (loaded by `index.html`) | Keep — currently used | Keep (but see “Legacy but risky” notes re: sync probe) | Medium | Listed in `index.html` scripts; includes gated `/api/health` probe |
| `sw.js` | Yes | Yes (registered by site; runtime cache) | Keep — currently used | Keep (no cache list cleanup needed) | Low | `const CACHE = "kanga-assets-v9";`; cache is runtime (`cache.put` on successful fetch) |
| `e2e/smoke.spec.js` | Yes | N/A | Keep — currently used | Keep | Low | Exists under `e2e/` and referenced by `pnpm run test:e2e` |
| `e2e/qa-auth-ui-screens.spec.js` | Yes | N/A | Keep — currently used | Keep | Low | Exists under `e2e/` and referenced by `pnpm run test:e2e` |
| `scripts/*` | Yes | N/A | Keep — currently used | Keep | Low | `package.json` uses `scripts/check-static-links.mjs`, `scripts/smoke-static-site.mjs`, `scripts/validate-questions.cjs`, `scripts/convert-questions.cjs`, `scripts/optimize-social-images.mjs` |
| `package.json` scripts | Yes | N/A | Keep — currently used | Keep | Low | See `scripts` section in `package.json` |

### 3) Keep — future planned
- `ChatGPT Image ... .png` (root) — **Keep** (design reference asset; do not delete/move)
| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `supabase/migrations/*.sql` | Yes | N/A | Keep — future planned | Keep, do not alter | Low | `git ls-files supabase/migrations/*.sql` shows migrations including `0001_auth_account_product_schema.sql`…`010_profiles_role_guard.sql` |
| `supabase/` (overall) | Yes | N/A | Keep — future planned | Keep, do not alter in this stage | Low | Repo contains `supabase/` folder + migrations |
| `ChatGPT Image … .png` (root, 15 files) | **No (ignored)** | No code references found | Keep — future planned / design reference asset | Keep, do not delete/move. Future: requires decision to version/move. | Low | `Get-ChildItem "ChatGPT Image*.png"` count=15; `git check-ignore -v` points to `.gitignore:11` |

### 4) Duplicate / can consolidate
_(initial candidates only — do not change yet)_

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `assets/css/tokens.css` vs `assets/css/theme.css` | Yes | Yes | Duplicate / can consolidate | Defer: consider consolidating overlapping “token” naming later | Medium | Both define token-ish vars (e.g., radii/shadows vs glass tokens). Needs deliberate strategy to avoid visual regressions |
| `assets/css/components.css` + `assets/css/pages.css` | Yes | Yes | Duplicate / can consolidate | Defer: audit repeated component patterns (buttons/cards) later | Medium | Both contain overlapping UI component styling; needs selector usage evidence before consolidation |

### 5) Legacy but risky
_(initial)_

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `assets/js/app.js` | Yes | Yes | Legacy but risky | **Defer** any changes. Only document for now. | Medium | Contains `fetch("/api/health")` probe gated by presence of `sb-` cookies; sets `window.KANGA_ENABLE_BACKEND_SYNC = true` on ok |
| `assets/js/quiz-engine.js` | Yes | Yes | Legacy but risky | **Defer** any changes. Only document for now. | Medium | Contains `DW.syncAttempt` + `DW.syncMockSession` calling `/api/attempts` + `/api/mock-sessions`, gated by `window.KANGA_ENABLE_BACKEND_SYNC` and session token presence |
| `/api/*` usage in static site | N/A | N/A | Legacy but risky | Defer: decide later how static site should behave on GH Pages vs with Next backend | Medium | `assets/js/app.js` + `assets/js/quiz-engine.js` reference `/api/*` endpoints; functional behavior depends on hosting |
| `assets/css/quiz.css` surfaces vs Liquid Glass | Yes | Yes | Legacy but risky | Defer: any “dead CSS” removal must prove selectors unused | Medium | Quiz CSS is large and selector-heavy; risks regressions without coverage tooling |

### 6) Needs human decision
_(initial)_

| File/Folder | Versioned? | Referenced? | Classification | Recommended action | Risk | Evidence |
|---|---|---|---|---|---|---|
| `.gitignore` rule `ChatGPT Image*.png` | Yes | N/A | Needs human decision | Decide later whether to track/move these images (requires `.gitignore` change). **No change now.** | Medium | `.gitignore:11` matches; `git check-ignore -v` confirms ignore |
| `apps/web/**` | Yes | N/A | Needs human decision | Defer changes (audit-only in this stage) | Medium | Monorepo Next app exists; out of scope without explicit approval |
| `apps/mobile/**` | Yes | N/A | Needs human decision | Defer changes (audit-only in this stage) | Medium | Mobile app exists; out of scope without explicit approval |
| `qa-runner/` | No (ignored) | N/A | Needs human decision | Remove locally is safe, but confirm you don’t want to keep local harness outputs before deletion | Low | `Test-Path qa-runner` ✅ (`files=768`); ignored in `.gitignore` |
| `screenshots/` | N/A | N/A | Needs human decision | N/A (folder not present) | Low | `Test-Path screenshots` ❌ (missing) |

---

## `index.html` script inventory (loaded vs not loaded)

### Loaded by `index.html`
The following scripts are explicitly loaded (all `defer`):
- `assets/js/storage.js`
- `assets/js/state-availability.js`
- `assets/js/i18n.js`
- `assets/js/locales.js`
- `assets/js/auth/mock-auth-state.js`
- `assets/js/auth/route-guards.js`
- `assets/js/category-labels.js`
- `assets/js/data/questions-loader.js`
- `assets/js/data/ui-copy.js`
- `assets/js/data/official-resources.js`
- `assets/js/data/glossary.js`
- `assets/js/data/learn-topics.js`
- `assets/js/pages/home-page.js`
- `assets/js/pages/learn-page.js`
- `assets/js/pages/practice-page.js`
- `assets/js/pages/mock-page.js`
- `assets/js/pages/progress-page.js`
- `assets/js/pages/glossary-page.js`
- `assets/js/pages/resources-page.js`
- `assets/js/pages/auth-page.js`
- `assets/js/pages/account-page.js`
- `assets/js/pages/premium-page.js`
- `assets/js/pages/admin-page.js`
- `assets/js/pages/legal-page.js`
- `assets/js/error-monitoring.js`
- `assets/js/analytics.js`
- `assets/js/router.js`
- `assets/js/quiz-engine.js`
- `assets/js/learn-engine.js`
- `assets/js/app.js`

### Present but NOT directly loaded by `index.html`
- `assets/js/dev/validate-questions.js` — dev/utility (not a runtime script)

---

## Service Worker audit (`sw.js`)

- Cache version: **`kanga-assets-v9`**
- Cache strategy: runtime caching for same-origin `GET` requests where:
  - `pathname` includes `/assets/` OR ends with `manifest.json` OR ends with `/sw.js`
- **No static pre-cache list exists** (no explicit “cache entries list” to reconcile), so “broken cached paths” are not applicable as a static list problem.

---

## Cleanup execution log

### Batch 1 — local artifacts cleanup (executed)

Scope (approved):
- Remove **local-only, untracked, ignored** artifact directories:
  - `dist-vite/`
  - `qa-output/`
  - `test-results/`
  - `dist/`

Results:
- Batch 1 cleanup executed: **Yes**
- `dist-vite/` removed locally: **Yes**
- `qa-output/` removed locally: **Yes**
- `test-results/` removed locally: **Yes**
- `dist/` removed locally: **Yes**
- ChatGPT images kept (no move/delete): **Yes**
- `qa-runner/` deferred (kept): **Yes**
- CSS/JS cleanup deferred: **Yes**
- No functional code changed: **Yes**

Verification after Batch 1:
- `pnpm run format:check`: **PASS**
- `pnpm run check:static-links`: **PASS**
- `pnpm run smoke:static`: **PASS**

---

## Code Hygiene Pass — executed (conservative, no behavior changes)

Scope rules enforced:
- No Supabase/Stripe connect
- No question content/scoring/quiz logic/route changes
- No `.gitignore` / `sw.js` changes
- No CSS/JS refactors or consolidation
- No changes in `apps/web`, `apps/mobile`, `supabase/migrations`, `packages/core/src/data/questions.ts`
- Keep `ChatGPT Image ... .png` and `qa-runner/`

### Findings (comment/debug audit)

Classification summary:
- **remove now**: none identified (within allowed scope) without risking behavior/tooling expectations
- **update comment**: none identified as contradictory
- **keep**: TODO/notes that still match current state; intentional script logs; placeholders documenting non-connected backend
- **defer**: any changes related to `/api` sync hooks (documented under “Legacy but risky”)
- **needs approval**: none beyond previously listed items

Evidence highlights:
- `index.html`: contains a TODO about GitHub Pages domain/manual steps — kept (still a legitimate ops note).
- `assets/js/analytics.js`: uses `console.debug("[kanga-analytics]", …)` — treated as intentional debug (kept).
- `scripts/*` and `scripts/*check*`: several `console.log("✓ … OK")` outputs — treated as intentional CLI UX (kept).
- `/api/*` sync references exist in `assets/js/app.js` and `assets/js/quiz-engine.js` — **no changes** per rule.

### CSS Hygiene (conservative)

- No CSS comments removed in this pass (no clearly obsolete/contradictory comments found in the audited set).
- No selectors/tokens touched.

### JS Hygiene (conservative)

- No runtime JS logic/comments removed in this pass (no clearly obsolete blocks found that are guaranteed unused).
- No changes to router/auth guards/quiz/storage/i18n behavior.

Verification after Code Hygiene Pass:
- PASS (SAFE edits only): `format:check`, `check:static-links`, `smoke:static`, `site:build`, `test:e2e`, `validate:questions`

### SAFE hygiene follow-up (applied)

Applied (SAFE):
- `assets/js/router.js`: remove redundant one-line comment duplicating module JSDoc.
- `assets/js/quiz-engine.js`:
  - Rename unused param `filterLabelLang(lang)` → `filterLabelLang(_lang)` (no behavior change).
  - Update misleading comment on `questionLang()` (compat alias).
  - Align unknown-language fallback emoji to `🌐` (consistent with `setLang`).
- `assets/js/storage.js`: add clarifying comment to `answeredUnique` alias (compat field).

Deferred (CAREFUL — needs separate approval):
- `assets/js/quiz-engine.js`: dedupe `FLAGS` vs `LD_TRIGGER_SHORT`.
- `assets/js/quiz-engine.js`: replace stale Supabase v1 session keys (`supabase.auth.token`, `sb-access-token`) check.

### Build notes (Vite)

- `pnpm run site:build` completes successfully, but Vite prints warnings like:
  - `... can't be bundled without type="module" attribute`
- Classification: **keep** (known build-time warning; not a functional regression).
- Recommended action: **defer** (only address with explicit approval, since changing script/module strategy can be behavior-impacting).


---

## Detailed audit checklist (in progress)

### Root
- [ ] Unused/temporary scripts (e.g. `qa-*.mjs`) vs keep
- [ ] Output folders (`dist-vite/`, `qa-output/`, `test-results/`) — confirm if **tracked** anywhere and if referenced
- [ ] Any other loose files in root with unclear purpose

### HTML (`index.html`)
- [ ] Loaded scripts: existence + usage
- [ ] Loaded CSS: existence + usage
- [ ] Ordering issues / broken references

### CSS (`assets/css/*.css`)
- [ ] Duplicated tokens/vars across files
- [ ] Dead selectors (only with strong evidence, no dynamic class construction)
- [ ] Liquid Glass overrides / replaced legacy blocks

### JS (`assets/js/**`)
- [ ] Dead functions / duplicated helpers
- [ ] Old routes / dead handlers
- [ ] `/api/` legacy calls for static hosting
- [ ] `console.log` / debug leftovers (only remove if non-essential and not gated)

### Service Worker (`sw.js`)
- [ ] Cache list consistency with real assets
- [ ] Remove broken cache entries (if any)
- [ ] If `sw.js` changes: bump `kanga-assets-v9` → `kanga-assets-v10`

### Tests / QA scripts
- [ ] `e2e/*.spec.js` relevance
- [ ] Ensure artifacts are not versioned accidentally

### Packages
- [ ] `package.json` scripts exist and point to real files
- [ ] Dependencies: **do not remove** without evidence

