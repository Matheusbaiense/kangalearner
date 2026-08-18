# Backlog - KangaLearner

> Canonical tracker for pending work and blockers, per `AGENTS.md`.
> The root `BACKLOG.md` is a legacy execution map until it is consolidated here.
>
> **Plano de correção da mega auditoria 2026-08-17:** [PRODUCTION-REMEDIATION-PLAN.md](PRODUCTION-REMEDIATION-PLAN.md) (fases 0–10, subtarefas, aceite). Este backlog não duplica o plano; só rastrea bloqueios e follow-ups.

Last updated: 2026-08-19

**Verificação Fase 0 (trampo do Claude/Chrome):** [QA-FASE0-VERIFY.md](QA-FASE0-VERIFY.md) — ledger vazio até haver evidência. Não marcar aceite no plano sem preencher essa tabela.

## Production Safety Blockers

These items are not code changes in the web/mobile app, but they block a safe wider production launch.

- [ ] **Supabase Auth password hardening**: in Supabase dashboard, enable leaked password protection (HaveIBeenPwned) and set minimum password length to at least 8. Reason: signup runs in the browser; without dashboard policy, weak or leaked passwords can pass.
- [x] **Vercel Production rate-limit env vars**: confirmed via `vercel env pull --environment=production` on 2026-06-01 that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` exist on project `kangalearner-web`.
- [x] **Vercel Production email/cron env audit**: confirmed via `vercel env pull --environment=production` on 2026-06-01 that `RESEND_API_KEY` and `CRON_SECRET` exist.
- [ ] **Vercel Production Stripe env audit**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` did not appear in the pulled Production env on 2026-06-01. Add them before enabling billing/webhook-dependent flows.
- [x] **Backup / Disaster Recovery workflow**: `.github/workflows/backup.yml` now exists. It runs manually and nightly, dumps Supabase Postgres with `pg_dump`, encrypts with GPG, uploads to S3-compatible storage, and verifies the object is listed.
- [~] **Backup / Disaster Recovery secrets and bucket**: 6 secrets presentes (`gh secret list` 2026-08-19). Dump `.gpg` no R2. `backup.yml` em `main` verde após PR #198 ([run 32182233334](https://github.com/Matheusbaiense/kangalearner/actions/runs/32182233334)). **Restore drill ainda não** (throwaway DB; nunca em prod nem em `zlsaerfsrfyxpbpxorwo`). Lifecycle R2 = 90 dias, não 7/4/3.
- [ ] **RLS regression 025**: SQL **aplicado + smoke 7/7 em staging** (`kangalearner-staging`, 2026-08-18). **Ainda não em prod.** 0.1c backup verde; bloqueado até restore drill 0.1e. Fixtures `smoke-a@` (user) / `smoke-b@` (admin) no staging.
- [x] **Código: CATEGORIES split** (2026-08-17): `packages/core/src/data/categories.ts`; barrel exporta categorias do ficheiro pequeno.
- [x] **Código: practice `?cat=`**, mock seek-once, tema `kl-theme`, `error.tsx`, mensagens de auth genéricas, admin recusa demote premium, `/progress` → `/dashboard`.
- [x] **Código: 034 hygiene RLS** (2026-08-17): policies duplicadas de profiles, saved_questions granular, `(SELECT auth.uid())`, search_path nas RPCs — **aplicada em staging** 2026-08-18; **não em prod**.
- [x] **Código: sync visível** (2026-08-17): practice banner + retry; admin stats `degraded`; reactions/migrate já não engolem o erro.
- [x] **Código: envelope API** (2026-08-17): `apiOk`/`apiError` nas rotas de app. Health (plaintext), ping e webhook Stripe ficam de fora.
- [x] **Código: blog RSC** (2026-08-17): `/blog` Server Component passa cards leves; `BlogPageClient` já não importa `blogPosts.ts`.
- [x] **Código: logger estruturado** (2026-08-17): `x-request-id` no middleware; `log()` JSON nas rotas de API + auth callback. Sem password/token/Authorization/rawBody.
- [x] **Código: step-up delete/password** (2026-08-17): DELETE `/api/account/delete` e PATCH `/api/account/password` exigem senha atual via `signInWithPassword`. Contas só-OAuth: criar senha em Forgot password primeiro.
- [x] **Código: MFA admin** (2026-08-18): `/admin` e APIs admin exigem `aal2`; página `/auth/mfa`. Dashboard Auth MFA TOTP **Enabled** em prod (Claude, 2026-08-19) — já vinha ligado. Admins ainda precisam enrolar TOTP na conta.
- [x] **Código: cookies auth** (2026-08-18): `authCookieOptions` — SameSite=Lax, Secure em produção, httpOnly false (adapter). CSP `style-src` nonce continua deferido.
- [x] **Código: JSON-by-state** (2026-08-18): `questions-{STATE}.json`; `useQuestions` fetch da fatia; IndexedDB v15+estado.
- [x] **Código: testes de rotas 6.1** (2026-08-18): webhook Stripe (23505, skip admin, ledger cleanup), attempts IDOR, bulk cap/clamp, ping cron, delete rollback. Playwright auth real (6.2): spec skip sem `E2E_STAGING_*`; guarda contra prod. RLS 6.3: vitest + `pnpm rls:staging` (skip sem credenciais; A não PATCH stats / não lê attempts de B).
- [x] **Código: Turnstile widget** (2026-08-18): `TurnstileWidget` em login/signup/forgot-password + CSP `challenges.cloudflare.com`. Toggle CAPTCHA no Supabase **ON** (provider Cloudflare Turnstile, secret colada, 2026-08-18) após PR #207 em prod.
- [ ] **Supabase free-tier pause risk**: project already paused ~2026-07; keepalive YAML já usa `secrets.SUPABASE_ANON_KEY`. Upgrade Pro + PITR (plan phase 0.2). HIBP (leaked passwords) is **Pro-only**.

## Important Follow-Ups

- [~] **Sentry observability**: DSN em Vercel Production está **truncado** (~29 chars; Claude 2026-08-19). Client não envia `/monitoring`. Apagar `SENTRY_DSN` + `NEXT_PUBLIC_SENTRY_DSN` (Production) e recriar com DSN completo; depois 1 evento browser + 1 server. Sem colar DSN. Source maps ainda opcionais.
- [x] **Branch protection**: `main` now requires the GitHub Actions status check `build` before merging (configured via `gh api` on 2026-06-01).
- [~] **Staging environment**: projeto `kangalearner-staging` (ref `zlsaerfsrfyxpbpxorwo`); **001–034 + smoke RLS 7/7** (2026-08-18). Fixtures `smoke-a@` / `smoke-b@` (B admin). Preview: `NEXT_PUBLIC_SUPABASE_*` → staging (Claude 2026-08-19). Falta `SUPABASE_SERVICE_ROLE_KEY` em Preview (dono cola).
- [ ] **Per-state Learn content**: the Learn topics are now jurisdiction-aware through `{token}` placeholders resolved by `packages/core/src/data/stateProfiles.ts`, but two gaps remain. (1) `towing-rules` is scoped to `states: ["WA"]` because learner towing rules differ (the NT allows it, WA does not), so 7 jurisdictions see 19 topics instead of 20 — write per-state versions to restore it. (2) `demerit-points`, `mobile-phones` and `school-zones` were generalised to what is true nationally plus a "check {authority}" pointer; per-state thresholds, fines and school-zone hours would make them concrete again.
- [ ] **State-specific mock test format**: `/mock-test` always runs 30 questions with a 24/30 pass mark and now states the real jurisdiction format ("The real DKT in NSW has 45 questions and needs 41 correct") as a separate line. Making the mock itself match each jurisdiction touches `WA_PASS_THRESHOLD` usage in the mock-sessions API, dashboard, progress and results pages.
- [x] **`/resources` per state**: rebuilt around `apps/web/src/lib/stateResources.ts` — per-jurisdiction supervised hours (incl. TAS no-exemption and ACT 25+ track), official links (steps, practice test, logbook, hazard test, booking) and a journey whose steps match the state (QLD/NT have no learner-stage hazard test). Perth community links and WA guides only show while WA is selected.
- [x] **`/journey`, `/supervisor`, `/overseas-licence` per state**: rebuilt on `apps/web/src/lib/stateJourney.ts` — GLS stages (ages, tenures, P1/P2 or single-P), supervisor requirements and overseas rules (temp-visa rule, PR deadline, recognised/transfer URLs) for all 8 jurisdictions, researched from official pages and adversarially verified (16-agent workflow, 2026-08-17). WA-only /hpt and /pda prep hubs remain WA (linked only when WA is selected; other states link their authority's hazard page).
- [ ] **Per-state HPT/PDA prep hubs**: /hpt and /pda content is WA-specific; other states could get equivalents fed by `stateResources.ts` hazard links.

## Optional Technical Debt

- [ ] **Dashboard query reduction**: consider deriving totals from `user_category_stats` to reduce the dashboard from 9 queries to roughly 5. Validate with real production data before shipping because it changes total calculation semantics.
- [ ] **Frontend performance**: evaluate `next/image` for the SiteNav avatar and split landing carousels into isolated client components so the rest can stay server-rendered.
- [ ] **Asset cleanup**: remove unused PNGs only after verifying references. `logo.png` is reported unused and large (869 KB); nav currently uses SVG.
- [ ] **Large-file split**: break up `apps/web/src/lib/i18n.ts`, `apps/web/src/lib/learnTopics.ts`, and `apps/web/app/(main)/account/page.tsx`.
- [~] **Test coverage**: Playwright auth-real 6.2 spec em `e2e/auth-staging.spec.ts` (skip sem credenciais; não apaga fixtures). RLS 6.3: `pnpm rls:staging` com `E2E_STAGING_*` + peer opcional. Vitest de rotas críticas (6.1) feito 2026-08-18.
- [~] **Admin security**: código exige TOTP aal2 em `/admin` e APIs admin. Dashboard Auth MFA **Enabled** (Claude 2026-08-19). Admins ainda têm de enrolar TOTP.
- [x] **Repo hygiene**: `docs/CURSOR-PROMPT-SPRINT*` already gone; AUDIT banner + supabase README 023–034 + i18n “static site” removido.

## Operational Notes

- "Pro upgrade" work is explicitly excluded per owner request.
- Previous handoff reported a corrupted worktree named `eloquent-hawking-87ae0c`; treat it as local session damage, not repo state.
- Always validate formatting with `pnpm run format:check` using repo globs. Do not pass absolute paths containing parentheses such as `(main)` to Prettier checks because parentheses can be interpreted as glob groups and silently skip files.
