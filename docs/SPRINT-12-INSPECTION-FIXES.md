# Sprint 12 — Inspeção geral (2026-05-22)

> **Leitura obrigatória para Claude/Cursor** antes de continuar trabalho de infra, segurança ou DB neste repo.

## Resumo

Correções aplicadas a partir do relatório de inspeção (5 agentes). Estado após Sprint 12:

| Área | Feito no repo | Ação manual / follow-up |
|------|---------------|-------------------------|
| P0 DB | Migrations `018`–`021` | Aplicadas em prod (`olgogtaeifyxwzencilo`) via Supabase MCP 2026-05-23 |
| P0 API | Admin users sem N+1; Stripe guard; timestamps attempts/mock | Feito no repo (commits 32e9743, 0751dfe) |
| P1 Segurança | Admin layout + middleware; newsletter via service_role; RPCs REVOKE PUBLIC | **Verificar Upstash no Vercel Production** |
| P2 Frontend | Fisher-Yates, erros useQuestions, limits dashboard | — |
| P3 Docs/tests | README, CONTRIBUTING, AGENTS, Vitest unitários | Playwright E2E = próximo sprint |
| Deferido | CSP nonce-based | Ver secção «Deferido» |

## Migrations novas

| Ficheiro | Conteúdo |
|----------|----------|
| `supabase/migrations/018_profiles_schema_drift.sql` | `profiles` (email, name, preferred_*, last_sign_in_at), `user_settings`, `mock_sessions.completed_at`, índice attempts, waitlist admin SELECT, bookings CASCADE |
| `supabase/migrations/019_security_definer_search_path.sql` | `search_path` em `prevent_profile_role_escalation` + `handle_new_user` atualizado |
| `supabase/migrations/020_mock_sessions_rls_cleanup.sql` | Remove policy legacy `FOR ALL` em mock_sessions |

## Código — ficheiros principais alterados

- `apps/web/app/auth/callback/route.ts` — `welcome_sent_at` guard; sync `email` + `last_sign_in_at`; OAuth `?error=`
- `apps/web/app/api/admin/users/route.ts` — email/last_sign_in de `profiles` (sem 50× getUserById)
- `apps/web/app/api/attempts/*` — whitelist + `createRouteHandlerClient`
- `apps/web/app/(main)/admin/layout.tsx` — `requireAdminPage()` (service role)
- `apps/web/src/lib/auth/requireAdminPage.ts` — novo
- `apps/web/src/lib/supabase/routeClient.ts` — novo
- `apps/web/src/lib/api/attemptValidation.ts` — novo
- `packages/core/src/shuffle.ts` — `fisherYatesSlice` exportado
- `turbo.json` — `UPSTASH_*`, `CRON_SECRET`
- `apps/web/next.config.ts` — `remotePatterns` avatares
- `apps/web/src/middleware.ts` — 401 em `/api/admin/*` sem sessão
- Docs: `README.md`, `CONTRIBUTING.md`, `AGENTS.md`

## Testes

```bash
pnpm install
pnpm test          # vitest: safeNextPath + attemptValidation
pnpm --filter @kanga/web run build
```

## Deferido (não bloqueia merge; registar em backlog)

1. **CSP nonce** — `unsafe-inline` ainda em `next.config.ts` (Next App Router exige plano de nonce por request).
2. **Playwright E2E** — fluxos signup, mock-test, admin gate.
3. **Zod** em todas as API routes + envelope JSON unificado.
4. **Agente SEO** — reexecutar inspeção conteúdo/ACCC (falhou worktree na inspeção original).
5. **Refator completo** `mock-sessions`, `profile/avatar`, `account/delete` → `routeClient` / `createClient`.
6. **`.wolf/anatomy.md`** — correr `openwolf rescan` após merge.
7. **`sanitizeHtml` → DOMPurify** se admin puder editar HTML dinâmico.

## Verificação manual obrigatória

- [ ] Vercel → Production → `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- [x] Supabase → aplicar migrations 018–021 (prod 2026-05-23)
- [ ] Smoke: login OAuth → dashboard; admin users page; practice sim 30 Q

## Histórico

Ver `docs/HISTORY-INFRA-WEB.md` e `docs/QA-EXECUTION-LOG.md`.
