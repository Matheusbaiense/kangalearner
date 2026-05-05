# Product Specification: KangaLearner — Roadmap Faseado

> Generated from brief: "Desenhar um roadmap por fases (estático root vs Next apps/web vs mobile apps/mobile) com entregas pequenas (PR-sized) e critérios de aceitação."

## Vision

KangaLearner é uma plataforma de prática para learner driving test australiano. O produto vive em três superfícies — um site estático legado (root), uma app web Next.js com auth/dados em Supabase e Stripe, e uma app mobile Expo/React Native — todas partilhando um pacote `@kanga/core` de dados e tipos. O roadmap abaixo organiza a evolução destas três superfícies em fases incrementais com PRs pequenos, verificáveis e independentes sempre que possível.

---

## Estado Atual (baseline)

| Superfície | Estado | Stack |
|---|---|---|
| **Root estático** | Produção via GitHub Pages (`pages.yml`). Quiz, Learn, Mock Test, progresso em `localStorage`. 69 questões, 10 categorias. | HTML/CSS/JS vanilla |
| **`apps/web`** | Scaffold funcional. Auth (Supabase SSR + Stripe customer), middleware, pages scaffold (`/practice`, `/mock-test/*`, `/learn/*`, `/resources`, `/progress`, `/account`, `/dashboard`). Build CI verde. | Next 15, React 18, Supabase, Stripe |
| **`apps/mobile`** | Scaffold mínimo — single screen placeholder, `tsc --noEmit` lint. | Expo 51, React Native 0.74 |
| **`packages/core`** | Tipos + dados. `QUESTIONS` + `CATEGORIES` gerados de `questions.js`. `filterByState`, tipos `QuizQuestion`, `SupportedState`, `SupportedLanguage`. | TypeScript puro |
| **CI** | `build.yml` (pnpm install → validate → gen:core-questions → turbo build). `pages.yml` (deploy estático). `format-check.yml`. | GitHub Actions |

---

## Fase 0 — Fundações e Higiene (pré-requisito para todas as fases)

> **Objetivo**: Estabilizar CI, padronizar qualidade e garantir que qualquer PR futuro tem gates mínimos.

### Entrega 0.1 — CI: lint gate em PRs

- **Objetivo**: Garantir que PRs não passam com erros de lint.
- **Áreas tocadas**: `.github/workflows/build.yml`
- **Comandos de verificação**: `pnpm run lint` (raiz — turbo delega a cada workspace)
- **Critérios de aceitação**:
  - [ ] `build.yml` inclui step `pnpm run lint` após install
  - [ ] PR com erro de lint propositado falha CI
  - [ ] PR limpo passa CI

### Entrega 0.2 — ESLint real para `@kanga/core`

- **Objetivo**: Substituir o `echo` placeholder no lint do core por um linter funcional.
- **Áreas tocadas**: `packages/core/package.json`, `packages/core/.eslintrc.*` ou `eslint.config.*`
- **Comandos de verificação**: `pnpm --filter @kanga/core lint`
- **Critérios de aceitação**:
  - [ ] `pnpm --filter @kanga/core lint` executa e retorna exit 0
  - [ ] Pelo menos regras `@typescript-eslint/recommended` activas
  - [ ] Nenhum erro pré-existente no output

### Entrega 0.3 — CI: `validate:questions` gate em PRs que toquem dados

- **Objetivo**: Executar validação de questões automaticamente em PRs que alterem `assets/js/data/`.
- **Áreas tocadas**: `.github/workflows/build.yml` (path filter ou step condicional)
- **Comandos de verificação**: `pnpm run validate:questions`
- **Critérios de aceitação**:
  - [ ] PR que altera `assets/js/data/questions.js` executa `validate:questions`
  - [ ] Questão com schema inválido (falta campo `id`) falha CI
  - [ ] `questions.ts` sync check continua a existir (já presente)

### Entrega 0.4 — `format:check` no CI

- **Objetivo**: Evitar drift de formatação.
- **Áreas tocadas**: `.github/workflows/build.yml`
- **Comandos de verificação**: `pnpm run format:check`
- **Critérios de aceitação**:
  - [ ] Step `format:check` no CI
  - [ ] Ficheiro mal formatado falha CI
  - [ ] `pnpm run format` corrige e CI verde

### Entrega 0.5 — Documentação de deploy dual (Pages estático + Next)

- **Objetivo**: Clarificar no README que existem dois produtos: estático (Pages) e Next (Vercel ou equivalente).
- **Áreas tocadas**: `README.md`, `docs/PLANNER-WEB-INFRA.md`
- **Comandos de verificação**: Revisão manual do README
- **Critérios de aceitação**:
  - [ ] README contém secção "Deploy" com instruções separadas para estático e web
  - [ ] Variáveis de ambiente obrigatórias para Next listadas
  - [ ] Nenhuma confusão entre os dois pipelines

---

## Fase 1 — Core Enriquecido (packages/core)

> **Objetivo**: Tornar `@kanga/core` a fonte de verdade de lógica partilhada, para que web e mobile não dupliquem código.
>
> **Depende de**: Fase 0 (lint e CI estáveis)

### Entrega 1.1 — Tipos e interfaces completos no core

- **Objetivo**: Mover todos os tipos partilhados (Question completa com `q`, `opts`, `exp`, `tip`, `sign`, `cap`) para o core.
- **Áreas tocadas**: `packages/core/src/index.ts`, `packages/core/src/types.ts` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/core build`
- **Critérios de aceitação**:
  - [ ] `Question` type no core inclui todos os campos do schema de `questions.js`
  - [ ] `PracticeClient.tsx` importa types do core em vez de redefinir localmente
  - [ ] `pnpm run build` (turbo) verde

### Entrega 1.2 — Lógica de quiz engine no core

- **Objetivo**: Extrair para o core a lógica de selecção de questões, shuffle, filtragem por estado/categoria/modo.
- **Áreas tocadas**: `packages/core/src/quiz.ts` (novo), `packages/core/src/index.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/core build`, testes unitários
- **Critérios de aceitação**:
  - [ ] Funções: `selectQuestions(opts)`, `shuffleOptions(q)`, `isCorrect(q, chosen)`
  - [ ] Testes unitários com ≥ 80% cobertura das funções exportadas
  - [ ] Nenhum import de React ou browser APIs — lógica pura

### Entrega 1.3 — Lógica de mock test no core

- **Objetivo**: Extrair regras de mock test (questões por sessão, threshold de aprovação, timer) para o core.
- **Áreas tocadas**: `packages/core/src/mock-test.ts` (novo), `packages/core/src/index.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/core build`, testes unitários
- **Critérios de aceitação**:
  - [ ] Config: `MOCK_TEST_QUESTION_COUNT`, `PASS_THRESHOLD`, `TIME_LIMIT_SECONDS`
  - [ ] Funções: `createMockSession(state)`, `scoreMockSession(answers)`, `isPass(score)`
  - [ ] Testes unitários com ≥ 80% cobertura

### Entrega 1.4 — i18n utilitário no core

- **Objetivo**: Centralizar helpers de tradução para que web e mobile usem a mesma interface.
- **Áreas tocadas**: `packages/core/src/i18n.ts` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/core build`
- **Critérios de aceitação**:
  - [ ] Helper `t(field, lang)` que retorna string traduzida dado um objecto `Record<Lang, string>`
  - [ ] Tipo `SupportedLanguage` inclui todas as linguagens suportadas
  - [ ] Testes unitários com ≥ 80% cobertura

---

## Fase 2 — Web App Funcional (apps/web)

> **Objetivo**: Transformar os scaffolds em páginas funcionais com backend Supabase real.
>
> **Depende de**: Fase 1 (core enriquecido) para reutilizar lógica; Fase 0.1-0.4 para CI.

### Entrega 2.1 — Practice page funcional com `@kanga/core`

- **Objetivo**: Migrar `PracticeClient.tsx` para usar funções do core em vez de lógica inline.
- **Áreas tocadas**: `apps/web/app/practice/PracticeClient.tsx`, imports de `@kanga/core`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`, `pnpm --filter @kanga/web lint`
- **Critérios de aceitação**:
  - [ ] PracticeClient importa `selectQuestions`, `shuffleOptions` de `@kanga/core`
  - [ ] Tipos locais removidos (usa `Question` do core)
  - [ ] Funcionalidade mantida: filtro por estado, categoria, modo ("all"/"wrong"/"unanswered")
  - [ ] Build verde

### Entrega 2.2 — Mock test flow completo

- **Objetivo**: Implementar o fluxo `/mock-test` → `/mock-test/session` → `/mock-test/results` com dados reais.
- **Áreas tocadas**: `apps/web/app/mock-test/*.tsx`, `apps/web/app/api/mock-sessions/route.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`, smoke test manual `/mock-test`
- **Critérios de aceitação**:
  - [ ] Utilizador pode iniciar sessão de mock test (selecciona estado)
  - [ ] Sessão apresenta N questões com timer
  - [ ] Resultados mostram score, pass/fail, revisão de respostas
  - [ ] Sessão persiste em Supabase para utilizadores autenticados (API `mock-sessions`)
  - [ ] Utilizador anónimo pode fazer mock test com dados em memória

### Entrega 2.3 — Progress page com dados Supabase

- **Objetivo**: Substituir placeholder `/progress` por dashboard real de progresso.
- **Áreas tocadas**: `apps/web/app/progress/page.tsx`, `apps/web/app/api/attempts/*`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Mostra: total questões respondidas, % acerto, por categoria
  - [ ] Dados vêm de `question_attempts` (Supabase)
  - [ ] Empty state claro para utilizador sem dados
  - [ ] Loading state com skeleton/spinner
  - [ ] Redireciona anónimos para login (middleware já existe)

### Entrega 2.4 — Rotas de auth consolidadas

- **Objetivo**: Eliminar duplicação `/login` vs `/auth/login` (item do backlog).
- **Áreas tocadas**: `apps/web/app/login/page.tsx`, `apps/web/app/signup/page.tsx`, `apps/web/src/middleware.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`, `pnpm --filter @kanga/web lint`
- **Critérios de aceitação**:
  - [ ] `/login` redireciona 308 → `/auth/login`
  - [ ] `/signup` redireciona 308 → `/auth/signup`
  - [ ] Middleware `AUTH_ROUTES` atualizado
  - [ ] Nenhum link interno aponta para `/login` ou `/signup` (grep)

### Entrega 2.5 — Learn pages com conteúdo

- **Objetivo**: Implementar `/learn` e `/learn/[slug]` com conteúdo real dos tópicos.
- **Áreas tocadas**: `apps/web/app/learn/page.tsx`, `apps/web/app/learn/[slug]/page.tsx`, possivelmente `packages/core/src/data/learn-topics.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] `/learn` lista todos os tópicos (título, descrição curta)
  - [ ] `/learn/[slug]` renderiza conteúdo do tópico
  - [ ] Tópicos servidos a partir de dados no core (não hardcoded no componente)
  - [ ] 404 para slug inválido

### Entrega 2.6 — Regenerar `database.types.ts`

- **Objetivo**: Sincronizar tipos TypeScript com o schema real do Supabase.
- **Áreas tocadas**: `apps/web/src/lib/supabase/database.types.ts`
- **Comandos de verificação**: `npx supabase gen types typescript --project-id <REF>`, `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Ficheiro gerado automaticamente a partir do schema remoto
  - [ ] Build web verde sem erros de tipo
  - [ ] Script documentado no README ou `package.json` do web

### Entrega 2.7 — `/dashboard` protegido com `/account`

- **Objetivo**: Implementar conteúdo real no dashboard e conta do utilizador.
- **Áreas tocadas**: `apps/web/app/dashboard/page.tsx`, `apps/web/app/account/page.tsx`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Dashboard mostra resumo: sessões mock, progresso por categoria, streak (se gamification activa)
  - [ ] Account mostra perfil, email, opção de logout
  - [ ] Ambas protegidas por middleware (já configurado)
  - [ ] Empty states para utilizador sem dados

---

## Fase 3 — Mobile App (apps/mobile)

> **Objetivo**: Transformar o scaffold Expo num app funcional que reutiliza `@kanga/core`.
>
> **Depende de**: Fase 1 (core enriquecido). Pode ser paralela a Fase 2.

### Entrega 3.1 — Navegação e layout base

- **Objetivo**: Configurar Expo Router com tab navigation e ecrãs base.
- **Áreas tocadas**: `apps/mobile/app/_layout.tsx` (novo), `apps/mobile/app/(tabs)/` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`, `cd apps/mobile && npx expo start`
- **Critérios de aceitação**:
  - [ ] Tab bar com 3+ tabs: Practice, Mock Test, Progress
  - [ ] Cada tab renderiza placeholder (título)
  - [ ] `tsc --noEmit` verde
  - [ ] App inicia no Expo Go sem crash

### Entrega 3.2 — Practice screen com `@kanga/core`

- **Objetivo**: Implementar ecrã de prática usando lógica do core.
- **Áreas tocadas**: `apps/mobile/app/(tabs)/practice.tsx`, `apps/mobile/components/` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`
- **Critérios de aceitação**:
  - [ ] Seleção de estado (picker)
  - [ ] Apresenta questão com opções (botões ou lista)
  - [ ] Feedback imediato (correto/incorrecto + explicação)
  - [ ] Usa `selectQuestions`, `shuffleOptions` de `@kanga/core`

### Entrega 3.3 — Mock test screen

- **Objetivo**: Implementar fluxo de mock test mobile.
- **Áreas tocadas**: `apps/mobile/app/(tabs)/mock-test.tsx`, `apps/mobile/app/mock-session.tsx`
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`
- **Critérios de aceitação**:
  - [ ] Usa `createMockSession`, `scoreMockSession` de `@kanga/core`
  - [ ] Timer visual durante a sessão
  - [ ] Ecrã de resultados com score e pass/fail
  - [ ] Dados em memória (sem backend nesta entrega)

### Entrega 3.4 — Progress screen com storage local

- **Objetivo**: Progresso local com `AsyncStorage` ou `expo-secure-store`.
- **Áreas tocadas**: `apps/mobile/app/(tabs)/progress.tsx`, `apps/mobile/lib/storage.ts` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`
- **Critérios de aceitação**:
  - [ ] Mostra questões respondidas, % acerto, por categoria
  - [ ] Dados persistidos entre sessões do app
  - [ ] Empty state para primeira utilização

### Entrega 3.5 — Auth mobile (Supabase)

- **Objetivo**: Autenticação no mobile com Supabase.
- **Áreas tocadas**: `apps/mobile/lib/supabase.ts` (novo), `apps/mobile/app/auth/` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`
- **Critérios de aceitação**:
  - [ ] Login com email/password
  - [ ] Login com Google (OAuth deep link)
  - [ ] Sessão persistida
  - [ ] Rotas protegidas só acessíveis com sessão

---

## Fase 4 — Qualidade e Observabilidade

> **Objetivo**: Testes automatizados, monitoring e polish de produção.
>
> **Depende de**: Fase 2 (web funcional), Fase 3 (mobile funcional).

### Entrega 4.1 — Testes E2E web (Playwright)

- **Objetivo**: Cobertura E2E dos fluxos críticos do web.
- **Áreas tocadas**: `apps/web/tests/` (novo), `apps/web/playwright.config.ts` (novo), `apps/web/package.json`
- **Comandos de verificação**: `pnpm --filter @kanga/web test:e2e`
- **Critérios de aceitação**:
  - [ ] Cenários: login, signup, redirect protegido, practice flow, mock test flow
  - [ ] CI job que executa os testes (headless)
  - [ ] Artefactos (screenshots on failure) guardados como artifacts do CI

### Entrega 4.2 — Testes unitários core ≥ 80%

- **Objetivo**: Garantir cobertura mínima no core.
- **Áreas tocadas**: `packages/core/src/__tests__/` (novo), `packages/core/package.json`
- **Comandos de verificação**: `pnpm --filter @kanga/core test`, `pnpm --filter @kanga/core test:coverage`
- **Critérios de aceitação**:
  - [ ] Framework de teste configurado (vitest ou jest)
  - [ ] ≥ 80% branch coverage em `quiz.ts`, `mock-test.ts`, `i18n.ts`
  - [ ] CI step que verifica cobertura

### Entrega 4.3 — A11y audit do estático

- **Objetivo**: Resolver item do backlog — contraste de CTAs e foco global.
- **Áreas tocadas**: `assets/css/tokens.css`, `assets/css/components.css`, `index.html`
- **Comandos de verificação**: `pnpm run format:check`, axe-core ou lighthouse (manual)
- **Critérios de aceitação**:
  - [ ] Ratio de contraste ≥ 4.5:1 para texto em `.btn-primary` / `.btn-gold`
  - [ ] `:focus-visible` outline visível em todos os interactivos
  - [ ] Tab order lógico na SPA
  - [ ] Lighthouse accessibility ≥ 90

### Entrega 4.4 — Healthcheck expandido + logging

- **Objetivo**: Melhorar observabilidade do web app.
- **Áreas tocadas**: `apps/web/app/api/health/route.ts`, `apps/web/src/lib/logger.ts` (novo)
- **Comandos de verificação**: `curl /api/health`, `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] `/api/health` verifica conectividade Supabase (ping query)
  - [ ] Resposta JSON com `{ status, supabase, timestamp }`
  - [ ] Logging estruturado (JSON) sem PII em server components e API routes
  - [ ] Error boundaries em client components com fallback user-friendly

### Entrega 4.5 — Textos legais reais (terms/privacy)

- **Objetivo**: Substituir placeholders `/terms` e `/privacy` por conteúdo real.
- **Áreas tocadas**: `apps/web/app/terms/page.tsx`, `apps/web/app/privacy/page.tsx`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Conteúdo jurídico revisto (ou template standard AU)
  - [ ] Data de última atualização visível
  - [ ] Link de volta à home

---

## Fase 5 — Sync e Features Avançadas

> **Objetivo**: Convergir web e mobile com sync de dados e features de gamification.
>
> **Depende de**: Fase 2 + Fase 3 (ambas as superfícies funcionais com auth).

### Entrega 5.1 — Sync de progresso mobile ↔ Supabase

- **Objetivo**: Quando o utilizador mobile se autentica, sincronizar progresso local com Supabase.
- **Áreas tocadas**: `apps/mobile/lib/sync.ts` (novo), APIs existentes em `apps/web/app/api/attempts/`
- **Comandos de verificação**: `pnpm --filter @kanga/mobile lint`
- **Critérios de aceitação**:
  - [ ] Progresso local é enviado para Supabase após login
  - [ ] Progresso remoto é puxado para local
  - [ ] Conflitos resolvidos por timestamp (last-write-wins)
  - [ ] Feedback visual de sync (spinner + confirmação)

### Entrega 5.2 — Gamification: badges e streaks

- **Objetivo**: Activar a migração `007_gamification.sql` no frontend.
- **Áreas tocadas**: `apps/web/app/dashboard/page.tsx`, `packages/core/src/gamification.ts` (novo)
- **Comandos de verificação**: `pnpm --filter @kanga/core build`, `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Badges definidos no core (lista + critérios de desbloqueio)
  - [ ] Dashboard web mostra badges desbloqueados
  - [ ] Streak calculado (dias consecutivos com ≥ 1 questão)
  - [ ] Animação de desbloqueio

### Entrega 5.3 — Saved questions (bookmark)

- **Objetivo**: Activar a migração `008_saved_questions.sql` no frontend.
- **Áreas tocadas**: `apps/web/app/practice/PracticeClient.tsx`, API route para saved questions
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Botão "save" em cada questão durante practice
  - [ ] Filtro "saved" no practice mode
  - [ ] Sync com Supabase para utilizadores autenticados
  - [ ] Fallback localStorage para anónimos

### Entrega 5.4 — Resources page com conteúdo

- **Objetivo**: Implementar `/resources` com links oficiais por estado.
- **Áreas tocadas**: `apps/web/app/resources/page.tsx`, possivelmente `packages/core/src/data/resources.ts`
- **Comandos de verificação**: `pnpm --filter @kanga/web build`
- **Critérios de aceitação**:
  - [ ] Links para sites oficiais de cada estado (handbook, booking)
  - [ ] Agrupados por estado
  - [ ] Dados no core para reutilização mobile

### Entrega 5.5 — Deprecação progressiva do estático

- **Objetivo**: Redirecionar tráfego do estático para a web app (quando deploy Next estiver pronto).
- **Áreas tocadas**: `index.html` (banner), `.github/workflows/pages.yml`
- **Comandos de verificação**: `pnpm run format:check`
- **Critérios de aceitação**:
  - [ ] Banner no topo do site estático a indicar que existe versão nova
  - [ ] Meta redirect opcional (configurável)
  - [ ] Pages workflow mantido enquanto web app não estiver em produção

---

## Riscos e Dependências

### Mapa de Dependências entre Fases

```
Fase 0 (CI/Higiene)
  │
  ├──→ Fase 1 (Core) ──→ Fase 2 (Web) ──→ Fase 4 (Qualidade) ──→ Fase 5 (Sync)
  │                   ╲                                         ╱
  │                    ╲──→ Fase 3 (Mobile) ───────────────────╱
  │
  └──→ Fase 0.5 (Docs) — independente, pode ser feita a qualquer momento
```

### Dependências Críticas

| De | Para | Motivo |
|---|---|---|
| 0.1-0.4 | Todas | CI gates são pré-requisito para merge seguro |
| 1.1 (tipos core) | 2.1, 3.2 | Web e mobile importam tipos do core |
| 1.2 (quiz engine) | 2.1, 3.2 | Lógica partilhada de selecção/shuffle |
| 1.3 (mock test) | 2.2, 3.3 | Lógica partilhada de mock session |
| 2.6 (database.types) | 2.2, 2.3, 2.7 | Tipos correctos necessários para queries Supabase |
| 3.5 (auth mobile) | 5.1 | Sync requer autenticação |

### Riscos

| # | Risco | Impacto | Mitigação |
|---|---|---|---|
| R1 | **Schema Supabase desalinhado** — `database.types.ts` manual pode divergir do remoto | Erros de tipo silenciosos em runtime | Entrega 2.6 cedo; adicionar `supabase gen types` ao CI |
| R2 | **Expo SDK upgrade** — Expo 51 pode requerer upgrade para SDK 52+ antes de features avançadas | Bloqueio de Fase 3 | Verificar compatibilidade na Entrega 3.1; orçamentar 1 PR de upgrade |
| R3 | **Stripe keys em CI** — build.yml usa placeholders; testes E2E que toquem Stripe podem falhar | Falsos positivos em CI | Separar CI em build (sem secrets) e e2e (com secrets); mock Stripe em testes |
| R4 | **Duplicação temporária** — durante migração, lógica existirá em `assets/js/` e `@kanga/core` | Drift entre versões | `questions.ts` sync check no CI já existe; estender para lógica de quiz se necessário |
| R5 | **Migração `localStorage` → Supabase** — dados legados do estático não são triviais de importar | Perda de progresso para early adopters | Componente `MigrateLocalProgress` já existe; testar com dados reais |
| R6 | **Mobile deep links OAuth** — configuração de scheme/redirect varia por plataforma | Auth Google bloqueado no mobile | Testar em device real (não apenas Expo Go); documentar `app.json` scheme |

---

## Sumário de Scripts pnpm Disponíveis e a Criar

### Existentes (raiz)

| Script | Descrição |
|---|---|
| `pnpm run build` | Turbo build (prebuild: validate + gen → turbo build core → web → mobile) |
| `pnpm run dev` | Turbo dev paralelo |
| `pnpm run lint` | Turbo lint |
| `pnpm run format` | Prettier write |
| `pnpm run format:check` | Prettier check |
| `pnpm run validate:questions` | Valida schema de `questions.js` |
| `pnpm run gen:core-questions` | Gera `packages/core/src/data/questions.ts` |
| `pnpm run legacy:build` | Build minificado do estático |

### A Criar (propostos)

| Script | Workspace | Entrega |
|---|---|---|
| `test` | `@kanga/core` | 4.2 |
| `test:coverage` | `@kanga/core` | 4.2 |
| `test:e2e` | `@kanga/web` | 4.1 |
| `gen:db-types` | `@kanga/web` | 2.6 |
| `test` (raiz) | root | 4.2 (turbo delegação) |
