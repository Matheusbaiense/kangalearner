# Dependabot alerts triage

**Date:** 2026-05-09  
**Branch:** `chore/security-p0-dependabot-triage`  
**Scope:** read-only classification — no dependency bumps, no `audit fix`, no code changes.

## Executive summary

- **GitHub Dependabot (REST):** **17** open alerts, all `ecosystem: npm`, manifest **`pnpm-lock.yaml`** (workspace root lockfile).
- **Severity (Dependabot):** **0 critical**, **14 high**, **2 moderate**, **1 low**.
- **`pnpm audit` (local, same date):** metadata reports **0 critical**, **14 high**, **3 moderate**, **1 low** (18 advisory “slots”); counts differ slightly from Dependabot deduplication / aggregation — same underlying packages (`tar`, `@xmldom/xmldom`, `fast-uri`, `postcss`, `fast-xml-parser`, `send`, `@babel/plugin-transform-modules-systemjs`).
- **Current production (GitHub Pages static SPA):** vulnerabilities are **not production-reachable** on the live site: they sit in **Expo / React Native CLI / Metro** and related **dev/build** graphs under `apps/mobile`, plus **Next.js → postcss** under `apps/web` (not deployed). Aligns with `docs/security/security-audit-initial.md` §4.
- **Immediate P0 production fixes:** **none** for today’s static surface. Treat remediation as **P1/P2** gated on mobile/web roadmap and dedicated upgrade PRs with QA.

## Current production surface

- **Shipped today:** root static app (`index.html`, Vite → `dist-vite/`, assets) on **GitHub Pages**. Runtime deps are minimal (e.g. Supabase client from CDN per project setup); **no** `tar`, `@xmldom/xmldom`, `expo`, or `next` in the **published** static bundle path analyzed in the initial audit.
- **Not deployed:** `apps/web` (Next.js 15), `apps/mobile` (Expo 51 / RN 0.74). All listed advisories trace through those workspaces or their toolchains (`pnpm audit` paths show `apps\mobile` > `expo` / `expo-router` / `@expo/cli` / RN community CLI, etc.; `apps/web` pulls `postcss` via `next`).
- **GitHub Actions:** no separate Dependabot alerts in this inventory for `github-actions` ecosystem (Dependabot config exists for future action updates).

## Comparison: Dependabot vs `pnpm audit` vs initial audit

| Source | Role |
| ------ | ---- |
| **Dependabot alerts API** | Authoritative list of **GitHub-tracked** OSV alerts for the repo (17 rows below). |
| **`pnpm audit`** | Workspace-wide view; useful **paths** (`apps\mobile` …) for exposure; counts may be **18** due to advisory aggregation. |
| **`security-audit-initial.md`** | Confirms same clusters (`tar`, `@xmldom/xmldom`, `fast-uri`, `postcss`, `fast-xml-parser`, `send`) and **reachability today** = not production static. |

## Alert inventory

Open alerts from `GET /repos/Matheusbaiense/kangalearner/dependabot/alerts` (paginated, `state: open`). `manifest_path` is always `pnpm-lock.yaml` at repo root.

| Alert # | Package | Severity | GHSA | Manifest | Scope (API) | App / graph | Current exposure | Recommended action | Priority |
| ------- | ------- | -------- | ---- | -------- | ----------- | ------------ | ------------------ | ------------------- | -------- |
| 17 | `@babel/plugin-transform-modules-systemjs` | high | GHSA-fv7c-fp4j-7gwp | `pnpm-lock.yaml` | runtime | **apps/mobile** (RN / Metro / Babel preset chain) | dev/build compile path; not static Pages | Patch when upgrading RN/Expo or overrides with care + CI tests | **P2** |
| 16 | `fast-uri` | high | GHSA-v39h-62p7-jpjc | `pnpm-lock.yaml` | runtime | **apps/mobile** (`expo-router` → `schema-utils` → `ajv`) | not production static | Patch via dependency upgrade / Expo bump | **P2** |
| 15 | `fast-uri` | high | GHSA-q3j6-qgpj-74h6 | `pnpm-lock.yaml` | runtime | **apps/mobile** (same) | not production static | Same as #16 | **P2** |
| 14 | `postcss` | medium | GHSA-qx2v-qp2m-jg93 | `pnpm-lock.yaml` | runtime | **apps/mobile** (Metro) **and** **apps/web** (`next` → `postcss` 8.4.x) | build-time / future web; XSS vector in **stringify** misuse contexts | Patch to ≥8.5.10 in dedicated PR(s); test web build + mobile bundle | **P1** (before `apps/web` prod) |
| 13 | `@xmldom/xmldom` | high | GHSA-2v35-w6hq-6mfw | `pnpm-lock.yaml` | runtime | **apps/mobile** (Expo config / plist) | dev tooling / plist parsing | Upgrade Expo/plist stack or overrides with mobile QA | **P2** |
| 12 | `@xmldom/xmldom` | high | GHSA-f6ww-3ggp-fr8h | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 11 | `@xmldom/xmldom` | high | GHSA-x6wf-f3px-wcqx | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 10 | `@xmldom/xmldom` | high | GHSA-j759-j44w-7fr8 | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 9 | `fast-xml-parser` | medium | GHSA-gh4j-gqv2-49f6 | `pnpm-lock.yaml` | runtime | **apps/mobile** (RN community CLI / doctor) | dev tooling | Bump with Expo/RN CLI upgrades | **P2** |
| 8 | `@xmldom/xmldom` | high | GHSA-wh4c-j3r5-mjhp | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same as other xmldom | **P2** |
| 7 | `tar` | high | GHSA-9ppj-qmqm-q256 | `pnpm-lock.yaml` | runtime | **apps/mobile** (`@expo/cli` / `cacache`) | dev install / cache extraction | Bump `@expo/cli` / `tar` via Expo upgrade PR | **P2** |
| 6 | `tar` | high | GHSA-qffp-2rhf-9h96 | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 5 | `tar` | high | GHSA-83g3-92jg-28cx | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 4 | `tar` | high | GHSA-34x7-hfp2-rc4v | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 3 | `tar` | high | GHSA-r6q2-hw4h-h46w | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 2 | `tar` | high | GHSA-8qq5-rm4j-mr97 | `pnpm-lock.yaml` | runtime | **apps/mobile** | not production static | Same | **P2** |
| 1 | `send` | low | GHSA-m6fv-jmcg-4jfg | `pnpm-lock.yaml` | runtime | **apps/mobile** (`@expo/cli`) | dev server / tooling | Low priority; address with Expo CLI bump | **defer** |

### Severity totals (Dependabot)

| Level | Count |
| ----- | ----- |
| Critical | 0 |
| High | 14 |
| Moderate | 2 |
| Low | 1 |
| **Total open** | **17** |

### Reachability summary

| Category | Count (alerts) | Notes |
| -------- | -------------- | ----- |
| **Production reachable (static Pages today)** | **0** | No alert tied to shipped static runtime in this inventory. |
| **apps/mobile (not deployed)** | **16** (+ postcss also in mobile paths) | Expo / RN / CLI / Metro / plist / tar / send / babel / fast-uri / fast-xml-parser. |
| **apps/web (not deployed)** | **postcss** (shared GHSA with lockfile; Next 15 → postcss 8.4.x) | Triage before any `apps/web` production deploy. |
| **dev/build only** | **all** for current product | Until web/mobile ship. |

## Immediate actions

- **None mandatory for P0** for the live static site.
- **Optional hygiene:** keep Dependabot PRs disabled until planned; use this triage to open **scoped** upgrade PRs (see PR plan).
- **Before `apps/web` production:** prioritize **postcss** ≥ 8.5.10 and full **Next** patch path + security headers story (see initial audit §9).

## Deferred actions

- **Expo / RN major or minor bumps** to pull patched `tar`, `@xmldom/xmldom`, `send`, `fast-xml-parser`, `@babel/*`, `fast-uri` — **large QA**; defer to mobile roadmap.
- **`apps/web` dependency PR** — Next/postcss and any future advisories; defer until deploy decision + E2E for web.
- **Rate limit / bulk API caps** — not in Dependabot scope; tracked as **Security backlog** (initial audit §10 P1), not started here.

## Do not do yet

- Do not run `pnpm audit fix` or `npm audit fix` without a dedicated PR and test plan.
- Do not bump **major** framework versions (Expo 51→55, Next 15→16, etc.) just to silence alerts.
- Do not change `apps/web` or `apps/mobile` **application code** solely for alerts — dependency upgrades only with review + CI + targeted QA.
- Do not merge lockfile-only mega-PRs without reproducing mobile `expo` / `pnpm` CI and web `turbo` build.

## Recommended PR plan

| PR | Theme | When | Notes |
| -- | ----- | ---- | ----- |
| **A** | Low-risk patches inside current majors | After mobile/web owner assigned | e.g. `postcss` patch if resolvable without Expo jump; prefer smallest diff. |
| **B** | `apps/web` security deps (Next/postcss chain) | Before first web deploy | Include lint/build/E2E for web package. |
| **C** | `apps/mobile` Expo / RN / CLI upgrade | Mobile milestone | Expect multiple transitive fixes (`tar`, `xmldom`, `send`, babel). |
| **D** | Backend rate limit + payload caps | Before API in prod | Out of scope for Dependabot; see `security-audit-initial.md` §10. |

## References

- `docs/security/security-audit-initial.md` — §4 dependencies, §10 backlog, GitHub posture.
- GitHub: `https://github.com/Matheusbaiense/kangalearner/security/dependabot`
- API: `repos/Matheusbaiense/kangalearner/dependabot/alerts`
