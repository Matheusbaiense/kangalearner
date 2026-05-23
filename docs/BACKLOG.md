# Backlog — KangaLearner

Itens pendentes ou melhorias. Prioridade: **P0** crítico, **P1** alto, **P2** médio.

## P0 — Integridade / CI

- [x] **Monorepo `pnpm run lint` com `@kanga/mobile`**: script `lint` do mobile alterado para `tsc --noEmit` (evita `expo lint` a instalar ESLint e falhar com `ERR_PNPM_UNEXPECTED_STORE`). _Follow-up:_ introduzir ESLint Expo explícito quando a equipa quiser lint de estilo no app nativo.
- [x] **Security hotfix (web)**: open redirect em `/login`/`/auth/login`; bloquear alteração de `profiles.role`; headers de segurança; erros de DB não devem vazar schema.

## P1 — Web (`apps/web`)

- [x] **PracticeClient** — `syncAttempt` em `useCallback` + dependências de `pick` corrigidas (warning `exhaustive-deps`).
- [x] **`themeColor`** — migrado para `export const viewport` em `app/layout.tsx` (Next 15+).
- [ ] **Rotas duplicadas de auth**: `/login` (AuthCard) ainda existe para compat; fluxos server (`dashboard`, `account`) redirecionam para **`/auth/login`**. _Opcional:_ redirect 308 de `/login` → `/auth/login` ou unificar UI.
- [x] **`/terms` e `/privacy`**: conteúdo real (Sprint 10 T60) — Terms of Use + Privacy Policy (APPs, terceiros, WA law). _Follow-up:_ revisão por advogado antes de campanha paga.
- [x] **Sprint 10 (M2/M3)**: landing How It Works + label testimonials beta; newsletter no footer (`NewsletterForm`); 5 tópicos learn; `/resources` comunidade/guias/jornada/checklist.
- [x] **Sprint 11 (M4)**: Resend SDK — welcome no primeiro login (`auth/callback`) + confirmação newsletter (`/api/newsletter`); `profiles.welcome_sent_at` (migration 017). _Follow-up Sprint 12:_ D+3/D+7, unsubscribe, primeiro envio newsletter.

## P2 — Dados e tipos

- [x] **Testes automatizados (base)**: Vitest em `@kanga/core` + `@kanga/web`; Playwright smoke em CI (`pnpm test`, `pnpm test:e2e`). _Follow-up:_ E2E auth (signup/login), mock-test completo, admin com sessão.
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
- [x] **Supabase Auth (fundação)**: cliente lazy + serviço + provider no estático; env `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` em `.env.example`; sem service role no browser. _Follow-up:_ QA manual com projeto Supabase real (OAuth redirect URLs, email confirm).
- [x] **GitHub Pages + Vite**: workflow publica `dist-vite` com injeção opcional via **Actions → Variables** (`VITE_SUPABASE_*`). _Follow-up:_ definir variáveis no repo antes de esperar auth real em produção Pages.
- [ ] Documentar deploy Next (ex. Vercel) vs GitHub Pages estático.
- [ ] **A11y/contraste**: validar contraste real do CTA amber (`.btn-primary`/`.btn-gold`) e foco global (`:focus-visible`) em browsers alvo.
- [x] **Tokens radius**: corrigido `--radius-lg`/`--radius-xl` para manter escala (evita `lg == md`).

## Documentação / IA

- [x] Política padrão: `docs/MAINTENANCE-POLICY-IA.md`, `AGENTS.md`, regra local opcional `.cursor/rules/docs-maintenance.mdc` (não versionada se `.cursor/` ignorada).
