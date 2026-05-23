# Histórico infra / web

| Data | ID | Tema | Paths principais |
|------|-----|------|------------------|
| 2026-05-23 | S13 | Security audit remediation — migration 022 + app hardening | `supabase/migrations/022_security_hardening.sql` (prod aplicada), `apps/web/src/lib/rateLimit.ts`, `apps/web/app/api/**`, `apps/web/src/lib/stripe.ts`, `apps/web/next.config.ts` |
| 2026-05-23 | S12c | Testes automatizados — Vitest + Playwright CI | `packages/core/**/*.test.ts`, `apps/web/vitest.config.ts`, `apps/web/e2e/smoke.spec.ts`, `apps/web/playwright.config.ts`, `.github/workflows/build.yml` |
| 2026-05-23 | S12b | Pós-inspeção — P0/P1 code + prod DB | `apps/web/app/api/**`, `supabase/migrations/018–021`, `.github/workflows/build.yml`, `PracticeClient.tsx`, `questions.ts` |
| 2026-05-22 | S12 | Inspeção geral — fixes P0–P3 | `supabase/migrations/018–020`, `apps/web/app/auth/callback`, `apps/web/app/api/admin/users`, `docs/SPRINT-12-INSPECTION-FIXES.md` |
