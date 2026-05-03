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

### UI, navegação e experiência de estudo
- **`app/globals.css`**: sistema de design (tokens de cor, tipografia, reset, `prefers-reduced-motion`), layout de autenticação (`.auth-*`), barra de site (`.site-nav`), shells de app/practice, cartões de pergunta, simulado (mock test), confetti, e estilos do dashboard (`.stat-*`, `.cat-row`, `.session-row`).
- **`app/layout.tsx`**: fontes **Inter** + **Sora** (`next/font/google`), import global de estilos, metadata/ Open Graph e `themeColor` alinhados à marca.
- **Componentes** (`apps/web/src/components`):
  - `auth/AuthCard.tsx` — cartão de auth reutilizável com logótipo SVG inline e ligação para `/`.
  - `layout/SiteNav.tsx` — navegação principal (Practice, Mock Test, Dashboard), estado de sessão Supabase no cliente, sign-out.
- **Auth (páginas)**: login, signup, forgot/reset password passam a usar `AuthCard` e classes globais (visual unificado).
- **`/account`**: página reduzida a redirecionamento — utilizador autenticado → `/dashboard`; caso contrário → `/login`.

### Practice (cliente) e simulado
- **`app/practice/page.tsx`**: composição com `SiteNav` + `PracticeClient`.
- **`app/practice/PracticeClient.tsx`** (client component):
  - Modos de estudo: todas as perguntas, só erradas, só por responder; filtro por tópico (`CATEGORIES`).
  - **Simulado**: fila aleatória de **30** perguntas, barra de progresso, ecrã de resultado (limiar 80%), `POST /api/mock-sessions` ao concluir (silencioso para convidado/401).
  - Persistência local: `localStorage` (`kl-answered`, `kl-lang`); sincronização de tentativas com `POST /api/attempts` quando aplicável.
  - i18n de conteúdo: `en` / `pt` / `es` a partir dos dados em `@kanga/core`.
  - Filtro de estado: **WA** fixo no código (extensão futura para mais estados).
  - UX: explicação após resposta, confetti em acerto, ligações para o dashboard.

### Dashboard (servidor + Supabase)
- **`app/dashboard/page.tsx`**: rota protegida (redirect para `/login?next=/dashboard` se não houver sessão).
  - Agrega `question_attempts` (totais, percentagem correta, breakdown por categoria).
  - Lista até **5** `mock_sessions` recentes (data formatada `en-AU`, badge pass/fail a 80%).
  - CTAs para continuar prática / simulado.

### Notas / QA sugerido
- Navegação **Mock Test** aponta para `/practice?mode=sim`; garantir que o query param é lido na página de practice (ou alinhar URL) para abrir diretamente o modo simulado.
- Validar dashboard e simulado com utilizador autenticado (dados reais no Supabase).

## Convenções
- **Backlog**: `BACKLOG.md`
- **Log**: este arquivo (`PROJECT_LOG.md`)
- **Segurança**:
  - `.env*` ignorado no git
  - nunca commitar `service_role` nem secrets de OAuth

