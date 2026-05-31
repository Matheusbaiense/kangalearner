# Backlog — KangaLearner

Este backlog é um “mapa de execução” do projeto.  
Ele é atualizado continuamente durante a migração (web → auth → sync → dashboard → mobile → produção).

**Inspeção / priorização mais recente:** ver [`.claude/plan/inspecao-geral-2026-05-31.md`](.claude/plan/inspecao-geral-2026-05-31.md).

---

## Histórico — site estático (`index.html` + `assets/`)

Registro para contexto humano e para outras sessões de IA (complementa o git).

| Data                   | Entrega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2026-05 (anterior)** | Mock test empilhado com feedback e explicações; painel final; revisão de erros e chips de tópicos fracos; practice com “load more”; painéis laterais sticky no desktop; barra de progresso compacta no mobile; empty state com CTA para WA; modos de idioma display vs tradução (PT+EN / ES+EN); `localStorage` por estado.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **2026-05-04**         | **Pipeline aprovado (T8, T10, T7 parcial, T2, T3, T4):** `validate-questions.cjs` com timeout VM + aviso de keys em `window`; `build.mjs` com pré-validação do `index.html` antes de `dist/`; `prebuild` → validação de questões; fontes Google com preload/noscript; `--font-sans` / `--font-display` em `tokens.css`; OG **PNG** (`og-image.png` + `scripts/gen-og-png.ps1`), meta `robots`, sem canonical/hreflang; scripts com **`defer`** + `storage.js` primeiro; `questions.js` com `__KANGA_DATA__` + aliases; **`KangaStorage`** (`kl-answered-by-state-v2`, `kl-state-v2`, migração `kl-*` legado); `learn-engine` init orquestrado após `DW.init` em `app.js`; Prettier (`htmlWhitespaceSensitivity`, override HTML), `format:check`, workflow **`format-check.yml`**. |
| **2026-05-04**         | **`TASKS.md`:** quadro Kanban + priorização das 10 tarefas de refactor (i18n JSON, defer, storage, Prettier, build hash, Turbo, etc.); indica o que é necessário agora vs depois; riscos (pten/esen, `kl-*` vs `kanga_*`, Pages sem build).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **2026-05-04**         | **Revisão UX/UI Practice (vanilla):** container da área Practice `max-width: 1440px`; grid `.app-shell` `260px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | centro até 860px | 260px`, gap 24px; painel esquerdo sem scroll forçado no desktop (`#filter-bar`overflow visível); scrollbars finos nos asides quando necessário; filtros`.fmode`/`.fcat` mais compactos; banner contextual acima das questões (“You are practising…”); botão **Load 10 more questions** com estilo próprio (`.btn-load-more-quiz`); cards `.qcard`com hierarquia (badge categoria, tipografia, sombra leve), estados`.qcard--answered-correct/incorrect`; bloco de resposta no Practice com título **Explanation / Explicação / Explicación**; footer: removidos links placeholder (Careers, Blog, Cookies); disclaimer visível + bloco **Official sources** (link WADOT); Learn: removido CTA genérico “Go to practice” no topo; CTA por tópico no card expandido (“Practice …” / “Praticar …”); state cards *coming soon* mais secundários + clique volta a mudar estado (empty pool + CTA); badges EN “Coming soon”, ES “Próximamente”; microcopy empty state enxuto; `--header-height` em tokens para sticky. |

---

## Agora (curto prazo)

- [x] **S0 — Decisão GitHub Pages**: Aposentado. Arquivos do site estático (`index.html`, `assets/`) não estão no git. `pages.yml` deletado. `build.yml` limpo. Plataforma canônica: Vercel (Next.js). _Resolvido 2026-05-21._
- [x] **Portar Simulado (React/Next)**: fila de 30 perguntas, progresso, resultado e persistência local + UI de resultado.
- [x] **Salvar simulados no Supabase**: `POST /api/mock-sessions` a partir do simulado React (quando autenticado).
- [ ] **Deep link do simulado**: respeitar `?mode=sim` (ou equivalente) em `/practice` para coincidir com o link “Mock Test” na `SiteNav`.
- [ ] **Sincronização de progresso**:
  - [ ] importar histórico do `localStorage` ao logar (migração guest → logged-in)
  - [ ] deduplicação básica de tentativas (evitar spam)
- [ ] **Dashboard do cliente** (base já em `/dashboard`):
  - [x] progresso por categoria (a partir de `question_attempts`)
  - [ ] progresso por **estado** (selector de estado + dados por estado)
  - [ ] histórico de simulados completo ou paginado (hoje: últimos 5)
  - [ ] streak/meta diária
- [ ] **Perfil**:
  - [ ] idioma preferido / estado preferido (persistir em `profiles`; hoje idioma só em `localStorage` na practice)

## Em seguida (médio prazo)

- [ ] **Portar UI principal do site** (hero, cards, footer) para Next mantendo design. _A shell da app (nav, auth, practice, dashboard) já usa o design system em `globals.css`._
- [ ] **i18n completo no Next** (todas as labels fixas).
- [ ] **Expansão real por estado**:
  - [ ] separar dataset por estado
  - [ ] carregamento lazy por estado
- [ ] **Observabilidade**: Sentry (web) + métricas de performance.

## Mobile (`apps/mobile`)

- [x] **Senior mobile decision**: v1 em Expo + React Native + TypeScript, reaproveitando `@kanga/core`; Flutter fica fora deste repo salvo um futuro time Dart ou necessidade de produto forte.
- [x] **Mobile roadmap/codemap**: `docs/MOBILE-APP-ROADMAP.md` e `docs/CODEMAPS/mobile-expo-app.md`.
- [x] **Expo SDK baseline**: SDK 56 alinhado com `expo-doctor` 21/21 e `pnpm --filter @kanga/mobile run lint` green.
- [x] **Mobile unit tests (base)**: vitest em `@kanga/mobile` (`pnpm --filter @kanga/mobile run test`, também coberto por `pnpm test`). Cobre pass threshold 24/30, dedupe key de tentativa, fila de sync offline (upsert/remove) e seleção mock-of-30. Lógica pura extraída para `src/lib/sync-logic.ts`.
- [x] **Mobile sync RLS (estático)**: confirmado que `question_attempts`/`mock_sessions` bloqueiam escrita cross-user via `WITH CHECK (auth.uid() = user_id)` (migrations 004/005/013/020); sync fixa o `user_id` do usuário logado.
- [ ] **Offline v1**: Learn, Practice, Mock Test, preferências, saved/wrong/unanswered e persistência local.
- [ ] **Auth + sync**: Supabase Auth nativo e fila local implementados; ainda precisa de verificação real de redirect/OAuth do Supabase no device antes do release.
- [ ] **Mobile QA hardening**: simulador iOS, emulador Android, performance, memória e acessibilidade.
- [ ] **EAS project (BLOQUEADO — externo)**: criar/linkar projeto Expo/EAS real e substituir o placeholder `extra.eas.projectId` (`configure-in-expo-dashboard`) em `apps/mobile/app.json`. Precisa de `eas login` com a conta Expo do time.
- [ ] **EAS builds (BLOQUEADO — externo)**: builds Android internal + iOS TestFlight. Precisa de Apple Developer Program + Google Play Console enrollment e EAS build credits/credentials.
- [ ] **Supabase mobile auth (BLOQUEADO — externo)**: confirmar redirect `kangalearner://auth/callback` e Google OAuth (iOS+Android) no dashboard Supabase; definir `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` para mobile; re-confirmação RLS ao vivo via Supabase MCP.
- [ ] **Store legal**: confirmar que Privacy/Terms cobrem dados coletados no mobile (email, nome opcional, progresso, mock sessions, metadados mínimos de device/app); v1 não solicita câmera/localização/contatos/notificações (nada declarado em `app.json`).

## Produção

- [ ] **Deploy web** (Vercel) + domínios/redirects.
- [ ] **CI/CD**: manter build e checks.
- [ ] **Hardening**: rate limits, segurança e políticas.

---

## 🔴 CRÍTICO — Drift de schema (prod ≠ migrations) — descoberto 2026-05-31

Ao validar tipos contra produção descobriu-se que o banco **de produção não aplicou as
migrations 004/006**. Impacto real em produção:

- `question_attempts` **não tem a coluna `attempt_id`** nem a constraint `unique (user_id, attempt_id)`.
  - `POST /api/attempts` e `POST /api/attempts/bulk` inserem/`upsert` com `attempt_id`/`onConflict` →
    **toda gravação de tentativa falha** (`question_attempts` tem **0 linhas** em prod, histórico nunca foi salvo).
- A tabela `user_category_stats` (migration 006) **não existe em prod** →
  o dashboard (`dashboard/page.tsx` linhas ~185/191) consulta uma tabela inexistente →
  **stats por categoria quebrados**.

**Origem:** prod foi criado a partir de um baseline diferente (`question_attempts.id` é `bigint`,
tem `answered_at` e não `created_at`, sem `country`). As migrations 004/006/007 são o schema
**projetado** e o código está construído sobre elas — por isso `database.types.ts` foi mantido no
schema projetado (reverter o código para o schema atual de prod apagaria features funcionais).

**Correção recomendada (infra, decisão do dono):** aplicar em prod, de forma alinhada às migrations:

1. `ALTER TABLE question_attempts ADD COLUMN attempt_id text;` + backfill + `NOT NULL` +
   `ADD CONSTRAINT ... UNIQUE (user_id, attempt_id)`.
2. Criar `user_category_stats` (migration 006) + RPC `upsert_category_stat` (já referenciado pelo código).
3. Regenerar `database.types.ts` a partir do prod já corrigido.
   _Não aplicado neste passo:_ é DDL em produção e contraria a decisão anterior de "sem tabelas de
   gamificação em prod"; precisa de aprovação explícita antes de rodar.

---

## Conhecido mas adiado — inspeção multiagente 2026-05-31

Itens identificados na inspeção (relatório em `.claude/plan/inspecao-geral-2026-05-31.md`) que **sabemos** existir mas **decidimos não corrigir agora**. As correções de segurança/correção foram aplicadas no commit `e823122`; o que segue é o que ficou de fora de propósito.

- [ ] **FE-1..4 — i18n + acessibilidade / UX**
  - State selector oferece 8 estados mas só **WA** tem conteúdo → dead-end em 3 superfícies (precisa empty-state/CTA ou esconder estados sem dataset).
  - Labels fixas ainda não totalmente internacionalizadas; melhorias de a11y (foco, aria, contraste) pendentes.
  - _Motivo do adiamento:_ requer decisão de design/produto, não é correção mecânica.
- [ ] **Conteúdo legal/road-rules WA — revisão por SME**
  - Possíveis imprecisões nos `learnTopics` (ex.: regras de towing, uso de celular, horas de condução, limite de velocidade P1).
  - _Motivo do adiamento:_ não verificável offline; exige revisão de um especialista em regras de trânsito de WA.
- [ ] **Testemunhos e fato "só WA"**
  - Testemunhos atuais e o posicionamento de que o produto cobre apenas WA permanecem como estão.
  - _Motivo:_ **aceito explicitamente** pelo dono do produto — manter por ora, não é bug.

> Demais pendentes técnicos (EXT-3 vercel.json ignoreCommand, EXT-5 recursão de policy admin, P0-2 regenerar `database.types.ts`, REPO-1 dependabot majors) estão rastreados na memória do projeto e no relatório de inspeção.
