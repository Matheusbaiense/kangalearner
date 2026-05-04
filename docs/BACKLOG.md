# Backlog — KangaLearner

Itens pendentes ou melhorias identificadas durante QA / INFRA. Prioridade sugerida: **P0** crítico, **P1** alto, **P2** médio.

## P0 — Integridade / CI

- [ ] **Monorepo `pnpm run lint`**: `@kanga/mobile` falha com `expo lint` + instalação automática de ESLint (`ERR_PNPM_UNEXPECTED_STORE`). Opções: fixar `store-dir`, adicionar `eslint`/`eslint-config-expo` explicitamente em `apps/mobile`, ou trocar script `lint` do mobile para no-op até haver config estável.

## P1 — Web (`apps/web`)

- [ ] **PracticeClient** `useCallback` / `syncAttempt` — resolver warning `react-hooks/exhaustive-deps` ou justificar com comentário eslint-disable e teste manual da prática.
- [ ] **Metadata `themeColor`**: migrar para `viewport` export (Next 15+) nas rotas que avisam no build.
- [ ] **Rotas duplicadas de auth**: coexistem `/login` (AuthCard) e `/auth/login` (INFRA-8). Decidir canon (redirect 301 de um para outro ou unificar UI).
- [ ] **`/terms` e `/privacy`**: links no signup apontam para páginas que podem não existir — criar páginas legais mínimas ou ajustar hrefs.

## P2 — Dados e tipos

- [ ] **`database.types.ts`**: regenerar com `npx supabase gen types typescript --project-id <REF> --schema public` quando o schema remoto for fonte de verdade (comentário no topo do ficheiro).
- [ ] **Páginas `/dashboard`**: não estão em `PROTECTED_ROUTES` do middleware; proteção é server-side na página. Avaliar alinhar com `/progress` para UX consistente.

## QA manual (Supabase / Stripe / Auth)

- [ ] Signup email → email de confirmação recebido.
- [ ] Login Google → retorno a home com sessão.
- [ ] Supabase **Authentication → Users** — utilizador criado.
- [ ] Supabase **Table Editor → `profiles`** — linha criada (trigger `handle_new_user`).
- [ ] Stripe **Customers** — customer com `metadata.supabase_user_id` após callback (requer `STRIPE_SECRET_KEY` e fluxo OAuth/password que dispare `/auth/callback`).
- [ ] Supabase **12 tabelas** `public` após migrações aplicadas ao projeto.

## Legado estático (raiz)

- [ ] Manter `pnpm run validate:questions` em PRs que toquem `assets/js/data/questions.js`.
- [ ] `pages.yml` / GitHub Pages — alinhado ao site estático; evolução Next (Vercel) documentar quando existir deploy web separado.
