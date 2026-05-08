# Dead code & refactor audit — static KangaLearner (SPA root)

**Created:** 2026-05-09  
**Refreshed:** 2026-05-09 (audit v2)  
**Baseline:** branch `main` @ **`94a7ef1`** — PR #7 **merged** (Supabase Auth foundation + Pages/Vite `dist-vite` deploy).  
**Sources:** local snapshot `.tmp-audit-backup/dead-code-and-refactor-audit.local.md`; `origin/chore/dead-code-and-refactor-audit` @ **`353977d`**; post-merge tree review.  
**Scope:** documentation-only audit; **no code changes** in this pass. **Batch 1 cleanup still pending approval.**  
**Exclusions (do not touch without approval):** quiz/scoring/questions content, Liquid Glass, migrations, Stripe, Supabase project wiring, auth guard semantics, route tables, `apps/web`, `apps/mobile`, `packages/core` implementations.

---

## 1. Executive summary

The static site is a **hash router SPA** with explicit `ROUTES` ↔ `window.KL_PAGES` registration. Page modules in `assets/js/pages/*` align with the router table; there is **no obvious orphan `KL_PAGES` page** left unregistered. After **PR #7**, the **Supabase Auth stack** is loaded from `index.html` (CDN client + `auth-service` + `auth-provider` + `route-guards`) and is exercised by `router.js`, auth/account pages, and `e2e/smoke.spec.js`.

Main technical-debt clusters:

1. **Dual Supabase story:** root `package.json` may still list `@supabase/supabase-js` while the static app loads **UMD from jsDelivr**; `apps/web` uses the npm package. Root dependency may be **redundant** or kept for hoisting — **needs human confirmation** (unchanged from v1).
2. **Legacy / future hooks:** `KANGA_ENABLE_BACKEND_SYNC` + `/api/health` fetch; quiz-engine **TODO** for Supabase v2 key cleanup; `src/main.js` + `src/js/config.js` are **Vite-sidecar** entries not loaded by production `index.html`.
3. **Service worker:** runtime cache is **network-first for assets** with bump `kanga-assets-v9`; **dist-vite** `/_vite/` paths should be monitored on real Pages URLs.
4. **Windows/git noise:** local “modified” files with **identical blob to HEAD** — operational, not code debt.
5. **CSS / exhaustive dead-class scan:** not fully enumerated; recommend **incremental** grep + visual QA (Batch 3).
6. **New — `window.KL_SUPABASE` surface:** three methods are exposed (`getPublicEnv`, `getSupabaseClient`, `getSupabaseSession`) but **no other file references them** (`rg` 2026-05-09). Likely intentional public/debug API — **defer removal** until product confirms.
7. **New — `vite.config.js` header comment** still says Pages uses “copy-based workflow”; **`pages.yml` now runs `pnpm run site:build`** — comment is **obsolete** (safe doc/comment fix in Batch 1).

---

## 2. Scope

| In scope | Out of scope (this document) |
|----------|------------------------------|
| `index.html`, `assets/js/**`, `assets/css/**`, `sw.js`, `vite.config.js`, `e2e/**`, `scripts/**`, root `package.json`, `.github/workflows/**` | `apps/web`, `apps/mobile`, `packages/core` implementation changes |
| Router routes vs `KL_PAGES` registration | Changing auth behaviour, guards, or Supabase session rules |
| Global `window.KL_*` patterns | Question text, scoring, quiz logic |
| Auth files listed in §7.9 | Database migrations, Stripe, real Supabase project connection |

---

## 3. Safe to remove (after verification batch)

| Item | Evidence | Risk | Note |
|------|----------|------|------|
| None **automatically** removed in this pass | N/A | — | All candidates need a **small PR** + tests. |

**Candidates for “safe” follow-up (confirm in Batch 1):**

- **Outdated comment** in `assets/js/app.js` (`initMockAuthHeaderControls` still described as “mock roles only” while `KL_AUTH_PROVIDER` is used) — comment-only fix, no behaviour change.
- **Outdated comment** in `vite.config.js` (lines 6–8: workflow description vs current `pages.yml`) — comment-only fix.
- **Root `@supabase/supabase-js` dependency:** static app uses **CDN UMD** in `supabase-client.js`; verify with `pnpm why @supabase/supabase-js` at repo root; if unused at root, consider removing from **root** `package.json` only (not from `apps/web`).

---

## 4. Needs human decision

| Item | File(s) | Evidence | Decision |
|------|---------|----------|----------|
| Root `@supabase/supabase-js` | `package.json`, `supabase-client.js` (CDN), `apps/web/...` | Static site does not `import` npm package in `assets/js` | Keep for monorepo hoisting vs remove from root |
| `src/main.js` + `src/js/config.js` | `src/` | Not referenced in `index.html`; e2e asserts **no** `/src/main.js` | Keep as Vite dev/bootstrap only vs delete/archive |
| `fetch("/api/health")` + `KANGA_ENABLE_BACKEND_SYNC` | `app.js`, `quiz-engine.js` | Inert on static hosting | Remove dead path vs keep for future Next/backend |
| Quiz-engine `TODO(supabase-v2-cutover)` | `quiz-engine.js` ~1553 | Legacy key cleanup | Product decision when Supabase v2 is real |
| `KL_SUPABASE.getPublicEnv` / `getSupabaseClient` / `getSupabaseSession` | `supabase-client.js` | **No** `assets/js` or `e2e` references outside defining file | Keep as public API vs trim exports |

---

## 5. Defer / risky

| Item | Reason |
|------|--------|
| Bulk **CSS class removal** | High false-positive rate (dynamic class strings, i18n, ARIA) |
| **sw.js** strategy change | Cache version bumps affect all users; coordinate with deploy |
| Removing **any** `window.KL_*` without repo-wide grep + e2e | Globals used from HTML, router, or dynamic `location.hash` |
| `exam-run` vs `mock-run` | Both in `QUIZ_ROUTES`; verify product QA before collapsing |
| Trimming **auth-service** or **supabase-client** exports | Router and OAuth callback flows depend on surface area |

---

## 6. Refactor tasks (overview)

1. **Batch 1 — Docs & dependency clarity:** comments (`app.js`, `vite.config.js`), `pnpm why`, optional root dep trim. **Pending approval.**
2. **Batch 2 — Backend sync stub:** document or gate `KANGA_ENABLE_BACKEND_SYNC` for static-only deploy.
3. **Batch 3 — CSS inventory:** class usage script + manual sign-off.
4. **Batch 4 — `src/` Vite entry:** document in README or remove if unused.
5. **Batch 5 — SW / dist-vite:** confirm asset URLs under GitHub Pages after Vite publish.

---

## 7. Subtasks & evidence tables

### 7.1 Architecture map (static)

**Scripts loaded (`index.html` order):**  
`storage.js` → `state-availability.js` → `i18n.js` → `locales.js` → auth (`mock-auth-state`, `supabase-client`, `auth-service`, `auth-provider`, `route-guards`) → `category-labels.js` → data loaders → pages (`home` … `legal`) → `error-monitoring.js` → `analytics.js` → `router.js` → `quiz-engine.js` → `learn-engine.js` → `app.js`.

**JS file on disk not in `index.html`:**

| File | Role |
|------|------|
| `assets/js/data/questions.js` | Loaded **dynamically** by `questions-loader.js` |
| `assets/js/dev/validate-questions.js` | Dev/validation path (not in production HTML) |

**`ROUTES` vs `KL_PAGES`:** all router keys for HTML pages have registrars (auth, account, premium, admin, legal suites included).

**Quiz hash routes:** `practice-run`, `mock-run`, `exam-run` — `router.js` / `QUIZ_ROUTES` (not `KL_PAGES`).

---

### 7.2 Components never rendered (suspects)

| Item | File | Evidence | Used? | Risk | Recommendation |
|------|------|----------|-------|------|----------------|
| — | — | Full `KL_PAGES` scan matches `ROUTES` | Yes | Low | No orphan page module found |

---

### 7.3 Functions never called (sampled)

| Symbol | Pattern | Classification | Recommendation |
|--------|---------|----------------|----------------|
| `KL_ROUTER.go` | Public API | — | **Keep** |
| `KL_SUPABASE.getPublicEnv` | `window` export | **Defer** | No external callers; may be intentional |
| `KL_SUPABASE.getSupabaseClient` | `window` export | **Defer** | No external callers; internal `ensureClientReady` used by router |
| `KL_SUPABASE.getSupabaseSession` | `window` export | **Defer** | No external callers |
| `KL_AUTH_SERVICE.*` | Router + `auth-provider` | — | **Keep** (all listed methods referenced from `router.js` and/or `auth-provider.js`) |
| Deep quiz internals | Many | **Defer** | knip/ts-prune only after TS migration |

**Mandatory test before any delete:** `pnpm run test:e2e`, `pnpm run smoke:static`.

---

### 7.4 Imports / scripts / dependencies

| Finding | Evidence |
|---------|----------|
| `index.html` does not load `src/main.js` | e2e + grep |
| Root `@supabase/supabase-js` | Not imported by `assets/js` (CDN used) | See §4 |
| `puppeteer` | `scripts/smoke-static-site.puppeteer.mjs` | **Used** (optional smoke path) |

---

### 7.5 State variables (sample)

| Topic | Notes |
|-------|-------|
| `KANGA_ENABLE_BACKEND_SYNC` | Set only if `/api/health` OK + cookie heuristic — mostly inert on Pages |
| `kl-mock-role` | Mock auth — **keep** |
| Storage v2 vs legacy | `storage.js` — **keep** compatibility paths |

---

### 7.6 Comments / TODOs (sample)

| Location | Text | Class |
|----------|------|-------|
| `quiz-engine.js` | `TODO(supabase-v2-cutover)` | **Needs decision** |
| `questions-loader.js` | “legacy questions dataset” | **Keep** (accurate) |
| `app.js` | “mock roles only” in header init | **Update** (stale) |
| `vite.config.js` | “copy-based workflow” for Pages | **Obsolete** vs `pages.yml` |

---

### 7.7 CSS dead / duplicate

**Approach:** grep `index.html`, `assets/js`, `e2e` per candidate class. **Not executed exhaustively.** → **Batch 3**.

---

### 7.8 Service worker (`sw.js`)

| Topic | Finding |
|-------|---------|
| Cache name | `kanga-assets-v9` |
| Strategy | Network-first for `/assets/`, `manifest.json`, `sw.js` |
| Precache list | **None** |
| dist-vite | `/_vite/` chunks — **verify** on live Pages base path |

---

### 7.9 Supabase Auth & deploy stack (post–PR #7)

| File | In `index.html`? | Role | Finding | Classification | Mandatory test |
|------|------------------|------|---------|----------------|----------------|
| `assets/js/auth/supabase-client.js` | Yes | `window.KL_SUPABASE`, CDN loader | Unused **exports** on public object (§7.3) | **Defer** | `test:e2e` |
| `assets/js/auth/auth-service.js` | Yes | `window.KL_AUTH_SERVICE` | Methods used from `router.js` / `auth-provider.js` | — | `test:e2e` |
| `assets/js/auth/auth-provider.js` | Yes | `window.KL_AUTH_PROVIDER`, session bridge | `router.js` `whenReady`; `onAuthStateChange` | — | `test:e2e` |
| `assets/js/auth/route-guards.js` | Yes | `window.KL_ROUTE_GUARDS` | `router.js`, `auth-page.js` (`consumeNoticeKey`) | — | `test:e2e` |
| `assets/js/pages/auth-page.js` | Yes | `KL_PAGES` auth suite | Registered; uses guards | — | `test:e2e` |
| `assets/js/pages/account-page.js` | Yes | `KL_PAGES` account suite | Uses `KL_AUTH_PROVIDER` / `KL_AUTH_MOCK` | — | `test:e2e` |
| `vite.config.js` | N/A (build) | `__KANGA_ENV__`, static copy to `dist-vite` | Stale top comment vs CI | **Safe to fix** (comment) | `site:build` |
| `.github/workflows/pages.yml` | N/A | E2E gate + `pnpm run site:build` + Pages upload | Paths trigger on `vite.config.js`, `assets/**`, etc. | **Defer** structural change | CI |
| `e2e/smoke.spec.js` | N/A | Auth/not-configured, guards, i18n | **Used** | — | `test:e2e` |

---

## 8. Test plan (for future cleanup PRs)

| Gate | Command |
|------|---------|
| Format | `pnpm run format:check` |
| Links | `pnpm run check:static-links` |
| Router/quiz smoke | `pnpm run smoke:static` |
| E2E | `pnpm run test:e2e` |
| Questions | `pnpm run validate:questions` |
| Site build | `pnpm run site:build` (after any Vite/index change) |

---

## 9. Final recommendation

- **Do not** bulk-delete CSS, globals, or auth exports without per-symbol evidence and e2e.
- **Batch 1** remains **low-risk**: comment fixes (`app.js`, `vite.config.js`), dependency audit (`pnpm why`), documentation for `src/` and `/api/health` stub.
- **Branch `chore/dead-code-and-refactor-audit` (353977d)** is **pre–PR #7**; this document (**v2**) supersedes it for **main @ 94a7ef1**. Do not delete the old remote branch without team process.

---

## 10. Task breakdown (template)

### Task 1 — Remove safe dead code

| Field | Content |
|-------|---------|
| **Goal** | Clarify/remove only verified-unused symbols (start with comments + root dep). |
| **Files** | `package.json`, `app.js`, `vite.config.js`, optional `src/` |
| **Subtasks** | (1) `pnpm why @supabase/supabase-js` at root. (2) Fix stale comments. (3) Document `src/main.js` or remove. |
| **Risk** | Low for comments; Medium for deps. |
| **Tests** | `format:check`, `smoke:static`, `test:e2e` |
| **Human approval** | Yes before `package.json` dependency removal |

### Task 2 — Clean obsolete comments

| Field | Content |
|-------|---------|
| **Goal** | Align comments with `KL_AUTH_PROVIDER` + quiz TODO ownership + Vite/Pages reality. |
| **Files** | `app.js`, `quiz-engine.js`, `vite.config.js` |
| **Subtasks** | (1) Update auth header comment. (2) Assign owner to Supabase TODO. (3) Fix Vite header. |
| **Risk** | Low |
| **Tests** | `format:check` |

### Task 3 — Consolidate duplicated helpers

| Field | Content |
|-------|---------|
| **Goal** | Defer until a concrete duplicate is found. |
| **Files** | TBD |
| **Subtasks** | Inventory `format*` / `safe*` helpers in a later pass. |
| **Risk** | Medium |
| **Tests** | `smoke:static`, `test:e2e` |

### Task 4 — CSS cleanup

| Field | Content |
|-------|---------|
| **Goal** | Remove classes with proven zero references. |
| **Files** | `assets/css/*.css` |
| **Subtasks** | Export class list → cross-reference → small PRs. |
| **Risk** | High false positives |
| **Tests** | Visual + `test:e2e` |

### Task 5 — Package / workflow cleanup

| Field | Content |
|-------|---------|
| **Goal** | Trim unused root deps; keep `pages.yml` aligned with docs. |
| **Files** | `package.json`, `docs/*`, `.github/workflows/pages.yml` |
| **Subtasks** | (1) Root supabase dep. (2) CI script inventory. |
| **Risk** | Medium |
| **Tests** | CI + `pnpm install` |

### Task 6 — Deferred / risky items

| Field | Content |
|-------|---------|
| **Goal** | Track items needing product/backend context. |
| **Subtasks** | (1) `KANGA_ENABLE_BACKEND_SYNC`. (2) SW vs `dist-vite`. (3) `KL_SUPABASE` export trim. |
| **Reason for defer** | Hidden dynamic paths + OAuth/session edge cases |

---

## Appendix — Git baseline (audit v2)

| Check | Value |
|-------|-------|
| PR #7 merged to `main`? | **Yes** @ `94a7ef1` |
| Prior audit branch | `origin/chore/dead-code-and-refactor-audit` @ `353977d` (**before** merge) |
| This branch | `chore/dead-code-and-refactor-audit-v2` (docs refresh only) |
| Local backup of pre-v2 untracked doc | `.tmp-audit-backup/dead-code-and-refactor-audit.local.md` (**do not commit**) |
| Monorepo phantom dirty files | `apps/mobile/*`, `apps/web/next-env.d.ts`, `packages/core/*`, workspace tsconfigs may still show noise on Windows — **operational** |

---

## Summary counts (for dashboards)

| Category | Count / note |
|----------|----------------|
| **Safe removals identified (awaiting Batch 1)** | 0 code deletions; **2 comment-only candidates** (`app.js`, `vite.config.js`) |
| **Needs human decision** | 5 rows (§4) |
| **Defer / risky** | Auth export surface, SW, CSS bulk, quiz routes |
| **Components never rendered** | **0** confirmed orphans |
| **Functions never called (confirmed unused externally)** | **3** (`KL_SUPABASE` methods on `window` — §7.3) |
| **Unused scripts in `index.html`** | None beyond documented dynamic/dev paths (§7.1) |
| **Dead state variables (flagged)** | `KANGA_ENABLE_BACKEND_SYNC` path mostly inert on Pages |
| **Obsolete comments** | `app.js` header text; `vite.config.js` workflow blurb |
| **CSS candidates** | Not enumerated — Batch 3 |
| **Package/workflow candidates** | Root `@supabase/supabase-js`; `pages.yml` vs docs drift |
