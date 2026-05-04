# Planner — Web infra (Next + Supabase + Stripe)

Plano faseado para agentes de IA e developers continuarem a partir do estado atual do repositório.

## Estado atual (resumo)

- **`apps/web`**: Next 15 App Router; Supabase SSR (`@supabase/ssr`); clientes em `src/lib/supabase/`; Stripe server em `src/lib/stripe.ts`; middleware em `src/middleware.ts` reexportado por `middleware.ts` na raiz do pacote web.
- **Auth**: rotas `/auth/login`, `/auth/signup`, `auth.css` (scope `.auth-route`), callback `/auth/callback` com Stripe customer opcional; rotas legadas `/login`, `/signup`.
- **Proteção**: middleware redireciona anónimos para `/auth/login?redirect=<path>` para paths em `PROTECTED_ROUTES`; placeholder `/progress`.

## Fase 1 — Estabilizar CI e lint (curto prazo)

1. Corrigir `apps/mobile` lint ou excluir da pipeline até haver ESLint configurado sem auto-install.
2. Opcional: job GitHub Actions só `pnpm --filter @kanga/web run build` + `lint` para PRs que toquem `apps/web`.

## Fase 2 — Auth e produto (médio prazo)

1. Unificar ou documentar `/login` vs `/auth/login`.
2. Páginas legais (`/terms`, `/privacy`) ou remover links.
3. Testes E2E (Playwright): login, signup, redirect `/progress` → login.

## Fase 3 — Dados e observabilidade

1. Regenerar `database.types.ts` a partir do projeto Supabase real.
2. Logging estruturado no callback e APIs (sem PII em logs públicos).
3. Healthcheck já existe em `/api/health` — expandir checks (Supabase ping) se necessário.

## Fase 4 — Deploy

1. Documentar variáveis de ambiente obrigatórias por ambiente (`NEXT_PUBLIC_*`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`).
2. Escolher alojamento Next (ex.: Vercel) vs Pages estático na raiz — dois produtos possíveis; evitar confusão no README.

## Referências de ficheiros (para IA)

| Tópico | Caminho |
|--------|---------|
| Middleware | `apps/web/src/middleware.ts`, `apps/web/middleware.ts` |
| Callback OAuth | `apps/web/app/auth/callback/route.ts` |
| Clientes Supabase | `apps/web/src/lib/supabase/client.ts`, `server.ts`, `admin.ts` |
| Tipos DB | `apps/web/src/lib/supabase/database.types.ts` |
| Stripe | `apps/web/src/lib/stripe.ts` |
| Auth UI | `apps/web/app/auth/*/page.tsx`, `apps/web/src/app/auth/auth.css`, `apps/web/app/auth/layout.tsx` |
| Migrações | `supabase/migrations/*.sql` |
