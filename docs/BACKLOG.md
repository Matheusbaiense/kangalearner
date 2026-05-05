# Backlog — KangaLearner

Itens pendentes ou melhorias. Prioridade: **P0** crítico, **P1** alto, **P2** médio.

## P0 — Integridade / CI

- [x] **Monorepo `pnpm run lint` com `@kanga/mobile`**: script `lint` do mobile alterado para `tsc --noEmit` (evita `expo lint` a instalar ESLint e falhar com `ERR_PNPM_UNEXPECTED_STORE`). *Follow-up:* introduzir ESLint Expo explícito quando a equipa quiser lint de estilo no app nativo.
- [x] **Security hotfix (web)**: open redirect em `/login`/`/auth/login`; bloquear alteração de `profiles.role`; headers de segurança; erros de DB não devem vazar schema.

## P1 — Web (`apps/web`)

- [x] **PracticeClient** — `syncAttempt` em `useCallback` + dependências de `pick` corrigidas (warning `exhaustive-deps`).
- [x] **`themeColor`** — migrado para `export const viewport` em `app/layout.tsx` (Next 15+).
- [ ] **Rotas duplicadas de auth**: `/login` (AuthCard) ainda existe para compat; fluxos server (`dashboard`, `account`) redirecionam para **`/auth/login`**. *Opcional:* redirect 308 de `/login` → `/auth/login` ou unificar UI.
- [x] **`/terms` e `/privacy`**: páginas placeholder em `app/terms/page.tsx` e `app/privacy/page.tsx` (substituir por texto jurídico antes de lançamento público).
- [ ] **Novas rotas placeholder**: implementar conteúdo real e/ou “coming soon” consistente para `/mock-test/*`, `/learn/*`, `/resources` (hoje são scaffolds).

## P2 — Dados e tipos

- [ ] **`database.types.ts`**: regenerar com `npx supabase gen types typescript --project-id <REF> --schema public` quando o schema remoto for fonte de verdade.
- [ ] **`/dashboard` no middleware**: proteção só na página; avaliar incluir em `PROTECTED_ROUTES` como `/progress`.

## QA manual (Supabase / Stripe / Auth)

- [ ] Signup email → confirmação recebida.
- [ ] Login Google → sessão + home.
- [ ] Supabase **Users** + **`profiles`** (trigger).
- [ ] Stripe **Customers** + `metadata.supabase_user_id`.
- [ ] **12 tabelas** `public` no projeto após migrações.

## Legado estático (raiz)

- [x] `pnpm run validate:questions` em PRs que toquem `assets/js/data/questions.js`.
- [ ] Documentar deploy Next (ex. Vercel) vs GitHub Pages estático.
- [ ] **A11y/contraste**: validar contraste real do CTA amber (`.btn-primary`/`.btn-gold`) e foco global (`:focus-visible`) em browsers alvo.
- [x] **Tokens radius**: corrigido `--radius-lg`/`--radius-xl` para manter escala (evita `lg == md`).

## Documentação / IA

- [x] Política padrão: `docs/MAINTENANCE-POLICY-IA.md`, `AGENTS.md`, regra local opcional `.cursor/rules/docs-maintenance.mdc` (não versionada se `.cursor/` ignorada).
