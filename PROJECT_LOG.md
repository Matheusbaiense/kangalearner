# Project Log — KangaLearner

Registro contínuo do que foi feito no repositório, com foco em rastreabilidade e QA.

## 2026-05-04

### Monorepo / Tooling
- **Criado monorepo** com `apps/web`, `apps/mobile`, `packages/core`.
- **Turbo + pnpm workspace** configurados (`turbo.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`).
- **Prettier / EditorConfig / ESLint (web)** adicionados.
- **QA**: `apps/web` rodando em `http://127.0.0.1:3001`.

### Auth (Supabase)
- **Login Google** funcionando via Supabase (`/login` → `/auth/callback` → `/account`).
- Corrigido problema de sessão (“Auth session missing!”) escrevendo cookies no callback.
- Criado **login email/senha**, **signup**, **forgot password**, **reset password**.
- Adicionado `middleware.ts` para refresh de sessão (SSR cookies).
- **QA**:
  - Login Google validado (sessão persistindo).
  - Páginas `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/account` acessíveis.

### Database (Supabase)
- Rodado script SQL criando tabelas:
  - `profiles`, `question_attempts`, `mock_sessions`, `user_settings`
- RLS + policies “somente do próprio usuário”.
- Trigger para provisionar `profiles`/`user_settings` em novos usuários.
- **QA**: SQL executou com sucesso (“Success. No rows returned”).

### API interna (Next)
- Criados endpoints:
  - `POST /api/attempts` → grava `question_attempts`
  - `POST /api/mock-sessions` → grava `mock_sessions`
- **QA**: endpoints protegidos por sessão (401 quando não autenticado) e compatíveis com RLS.

### Split / Migração de dados (core)
- Gerado `packages/core/src/data/questions.ts` a partir do legado `assets/js/data/questions.js` (63 questões, 10 categorias).
- Exportado via `@kanga/core`.
- Criada tela React inicial: `GET /practice` (Next) consumindo `@kanga/core` e salvando tentativas via `/api/attempts`.
- **QA**:
  - `/practice` compila e responde 200.
  - Responder questão logado deve inserir em `question_attempts`.

## Convenções
- **Backlog**: `BACKLOG.md`
- **Log**: este arquivo (`PROJECT_LOG.md`)
- **Segurança**:
  - `.env*` ignorado no git
  - nunca commitar `service_role` nem secrets de OAuth

