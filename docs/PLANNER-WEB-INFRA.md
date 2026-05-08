# Planner — Web infra (Next + Supabase + Stripe)

Plano faseado para agentes de IA e developers continuarem a partir do estado atual do repositório.

## Estado atual (resumo)

- **`apps/web`**: Next 15 App Router; Supabase SSR (`@supabase/ssr`); clientes em `src/lib/supabase/`; Stripe server em `src/lib/stripe.ts`; middleware em `src/middleware.ts` reexportado por `middleware.ts` na raiz do pacote web.
- **Site estático (raiz / Pages)**: Supabase Auth **opcional** — `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (Vite → `window.__KANGA_ENV__`); módulos `assets/js/auth/supabase-client.js`, `auth-service.js`, `auth-provider.js`; sem env continua guest + mock roles (`KL_AUTH_MOCK`). Ver `docs/CODEMAPS/static-site.md`.
- **Auth**: rotas `/auth/login`, `/auth/signup`, `auth.css` (scope `.auth-route`), callback `/auth/callback` com Stripe customer opcional; rotas legadas `/login`, `/signup`.
- **Proteção**: middleware redireciona anónimos para `/auth/login?redirect=<path>` para paths em `PROTECTED_ROUTES`; placeholder `/progress`.

## Fase 1 — Estabilizar CI e lint (curto prazo)

1. [x] `apps/mobile`: `lint` = `tsc --noEmit` (sem `expo lint` que quebrava com store pnpm).
2. Opcional: job GitHub Actions filtrado a `apps/web` em PRs só web.

## Fase 2 — Auth e produto (médio prazo)

1. Parcial: `dashboard` / `account` redirecionam anónimos para `/auth/login`; `/login` legado mantido.
2. [x] Placeholder `/terms` e `/privacy` (substituir texto antes de lançamento).
3. Testes E2E (Playwright): login, signup, redirect `/progress` → login.

## Fase 3 — Dados e observabilidade

1. Regenerar `database.types.ts` a partir do projeto Supabase real.
2. Logging estruturado no callback e APIs (sem PII em logs públicos).
3. Healthcheck já existe em `/api/health` — expandir checks (Supabase ping) se necessário.

## Fase 4 — Deploy

1. Documentar variáveis de ambiente obrigatórias por ambiente (`NEXT_PUBLIC_*`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`).
2. Escolher alojamento Next (ex.: Vercel) vs Pages estático na raiz — dois produtos possíveis; evitar confusão no README.
3. **GitHub Pages (SPA raiz):** `.github/workflows/pages.yml` publica **`dist-vite`** (`pnpm run site:build`); variáveis opcionais `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` em **Actions → Variables** para auth Supabase no browser (nunca service role).

## Referências de ficheiros (para IA)

| Tópico            | Caminho                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Middleware        | `apps/web/src/middleware.ts`, `apps/web/middleware.ts`                                           |
| Callback OAuth    | `apps/web/app/auth/callback/route.ts`                                                            |
| Clientes Supabase | `apps/web/src/lib/supabase/client.ts`, `server.ts`, `admin.ts`                                   |
| Tipos DB          | `apps/web/src/lib/supabase/database.types.ts`                                                    |
| Stripe            | `apps/web/src/lib/stripe.ts`                                                                     |
| Auth UI           | `apps/web/app/auth/*/page.tsx`, `apps/web/src/app/auth/auth.css`, `apps/web/app/auth/layout.tsx` |
| Auth estático     | `assets/js/auth/supabase-client.js`, `auth-service.js`, `auth-provider.js`, `mock-auth-state.js`, `route-guards.js` |
| Migrações         | `supabase/migrations/*.sql`                                                                      |
