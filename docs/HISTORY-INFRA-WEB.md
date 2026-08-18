# Histórico infra / web

| 2026-08-18 | REM-12 | 027: drop typo `set_updated_at()`; 029: revoke `rls_auto_enable` só se existir | `027_revoke_analytics_rpc_grants.sql`, `029_revoke_trigger_function_grants.sql` |

| 2026-08-18 | REM-11 | 013 cria `user_settings` antes das policies (greenfield staging); 018 fica IF NOT EXISTS | `013_security_hardening_rls_newsletter.sql`, `018_profiles_schema_drift.sql` |

| 2026-08-18 | REM-10 | Turnstile widget + túnel Sentry `/monitoring`; CAPTCHA **ON** no dashboard (Turnstile, secret persistida) | `TurnstileWidget.tsx`, `app/monitoring/route.ts`, `src/middleware.ts` CSP + matcher |

| 2026-08-18 | REM-9 | 6.1 testes de rotas + 3.2 JSON-by-state + 3.8 sync único + 8.x higiene | `apps/web/src/lib/stripe/stripeWebhook.ts`, `attemptValidation.ts`, `hooks/useQuestions.ts`, `scripts/gen-questions-json.ts` |

| 2026-08-18 | REM-8 | Cookies auth: Secure em prod + SameSite=Lax; docs do adapter e getClientIp (Fase 5.4/5.6) | `apps/web/src/lib/supabase/authCookieOptions.ts`, `client.ts`/`server.ts`/`middleware.ts`, `docs/security/supabase-auth-hardening-checklist.md` |

| 2026-08-18 | REM-7 | MFA TOTP aal2 no gate admin (Fase 5.3 código) | `apps/web/src/lib/auth/{adminMfa,assertAdminRole,requireAdminPage}.ts`, `apps/web/app/auth/mfa/page.tsx` |
| 2026-08-17 | REM-6 | Step-up: password actual no delete e change-password (Fase 5.2) | `apps/web/src/lib/auth/{passwordReauth,deleteAccount}.ts`, `apps/web/app/api/account/{delete,password}/route.ts`, `apps/web/app/(main)/account/page.tsx` |
| 2026-08-17 | REM-5 | Logger JSON + `x-request-id` nas rotas (Fase 4.6) | `apps/web/src/lib/{log,requestId}.ts`, `apps/web/src/middleware.ts`, `apps/web/app/api/**/route.ts`, `apps/web/app/auth/callback/route.ts` |
| 2026-08-17 | REM-4 | Blog RSC (lista leve) + envelope no resto das rotas de app | `apps/web/src/lib/blogIndex.ts`, `apps/web/app/(main)/blog/page.tsx`, `apps/web/app/api/{attempts/bulk,saved-questions/bulk,mock-sessions,blog-reactions,newsletter,profile/avatar,admin/stats}/route.ts` |
| 2026-08-17 | REM-2 | Fase 1.4/1.5 SQL 034 + 4.2/4.5/3.9: hygiene RLS, admin stats degraded, search debounce, sync visível, keepalive via secret | `supabase/migrations/034_rls_policy_hygiene.sql`, `apps/web/app/api/admin/stats/route.ts`, `apps/web/app/(main)/admin/page.tsx`, `apps/web/app/(main)/practice/PracticeClient.tsx`, `.github/workflows/keepalive.yml`, `docs/QA-FASE0-VERIFY.md` |
| 2026-08-17 | REM-1 | Fases 1–4 código: RLS 031–033, mock seek, practice ?cat=, tema kl-theme, CATEGORIES split, error.tsx, auth messages, admin premium demote | `supabase/migrations/031–033_*.sql`, `packages/core/src/data/categories.ts`, `apps/web/app/(main)/practice/*`, `apps/web/app/error.tsx`, `apps/web/src/lib/{practiceCat,themeStorage,auth/*}.ts` |
| 2026-06-01 | OPS-1 | Dívida operacional pré-divulgação — Vercel env audit, backup workflow, Sentry integration, branch protection; Supabase Auth/staging/secrets seguem externos | `.github/workflows/backup.yml`, `apps/web/instrumentation*.ts`, `apps/web/sentry.*.config.ts`, `apps/web/app/global-error.tsx`, `docs/BACKLOG.md`, `docs/CODEMAPS/web-next-auth-supabase.md`, `docs/QA-EXECUTION-LOG.md` |
| 2026-05-23 | S13 | Security audit remediation — migration 022 + app hardening | `supabase/migrations/022_security_hardening.sql` (prod aplicada), `apps/web/src/lib/rateLimit.ts`, `apps/web/app/api/**`, `apps/web/src/lib/stripe.ts`, `apps/web/next.config.ts` |
| 2026-05-23 | S12c | Testes automatizados — Vitest + Playwright CI | `packages/core/**/*.test.ts`, `apps/web/vitest.config.ts`, `apps/web/e2e/smoke.spec.ts`, `apps/web/playwright.config.ts`, `.github/workflows/build.yml` |
| 2026-05-23 | S12b | Pós-inspeção — P0/P1 code + prod DB | `apps/web/app/api/**`, `supabase/migrations/018–021`, `.github/workflows/build.yml`, `PracticeClient.tsx`, `questions.ts` |
| 2026-05-22 | S12 | Inspeção geral — fixes P0–P3 | `supabase/migrations/018–020`, `apps/web/app/auth/callback`, `apps/web/app/api/admin/users`, `docs/SPRINT-12-INSPECTION-FIXES.md` |
