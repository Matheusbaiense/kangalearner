# Backlog — KangaLearner

Este backlog é um “mapa de execução” do projeto.  
Ele é atualizado continuamente durante a migração (web → auth → sync → dashboard → mobile → produção).

**Quadro de tarefas (refactor Claude / priorização):** ver [`TASKS.md`](TASKS.md).

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

## Mobile (quando web estiver estável)

- [ ] **Expo app funcional** usando `packages/core`.
- [ ] **Auth Google no mobile** (Supabase + Expo Auth Session).
- [ ] **Offline first**: AsyncStorage + sync posterior.

## Produção

- [ ] **Deploy web** (Vercel) + domínios/redirects.
- [ ] **CI/CD**: manter build e checks.
- [ ] **Hardening**: rate limits, segurança e políticas.
