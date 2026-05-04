# Histórico — INFRA web (KangaLearner)

Linha do tempo das entregas **INFRA-4 … INFRA-10** e QA associado, para contexto compacto em sessões de IA.

| ID | Tema | Entregas principais |
|----|------|---------------------|
| **INFRA-4** | Supabase no Next | `src/lib/supabase/client.ts` (`createClient` + alias browser), `server.ts`, `admin.ts` (`supabaseAdmin`), `database.types.ts` manual com `Relationships: []` para inferência correta do cliente. |
| **INFRA-5** | Middleware auth | `src/middleware.ts`: `PROTECTED_ROUTES`, `AUTH_ROUTES`, refresh de sessão Supabase; reexport em `middleware.ts`. |
| **INFRA-6** | Stripe | `src/lib/stripe.ts`: cliente com `apiVersion` alinhada ao SDK instalado, `createStripeCustomer`, `XP_VALUES`. |
| **INFRA-7** | Callback | `app/auth/callback/route.ts`: `exchangeCodeForSession` com cookies na resposta de redirect; Stripe opcional via `import()` + `supabaseAdmin`; `safeNextPath`; suporte `next`/`redirect`. |
| **INFRA-8** | Páginas auth | `app/auth/login`, `signup`, `forgot-password` (redirect); `createClient` + `Suspense`. |
| **INFRA-9** | CSS auth | `src/app/auth/auth.css` + `app/auth/layout.tsx` (wrapper `.auth-route`); remoção de duplicados conflituosos em `globals.css` para o shell legado. |
| **INFRA-10** | Verificação | Middleware: redirect protegido → `/auth/login?redirect=…`; página `/progress`; smoke HTTP em dev; tipos: comentário `supabase gen types`. |
| **QA 2026-05-04** | Execução | `pnpm run build` OK; `pnpm run lint` na raiz falhou no mobile (pnpm store); `apps/web` lint OK com 1 warning conhecido. Documentação em `docs/QA-EXECUTION-LOG.md`, `BACKLOG.md`, `PLANNER-WEB-INFRA.md`, codemap. |
| **Entrega 2026-05-04 (pós-QA)** | Higiene + padrão docs | `viewport` em `app/layout.tsx`; `PracticeClient` hooks; `apps/mobile` lint = `tsc --noEmit`; `/terms`, `/privacy` placeholder; redirects `account`/`dashboard` → `/auth/login`; `AGENTS.md`, `MAINTENANCE-POLICY-IA.md`, regra Cursor `docs-maintenance.mdc`; BACKLOG/QA atualizados. |

## Convenções úteis para próxima IA

- Imports `@/*` → `apps/web/src/*` (`tsconfig.json` do web).
- Rotas App Router ficam em `apps/web/app/` (não `src/app/` para páginas, exceto CSS partilhado em `src/app/auth/`).
- Service role: nunca importar `admin.ts` ou `stripe.ts` em Client Components.
