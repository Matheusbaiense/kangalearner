# Log de execução QA — KangaLearner (web + monorepo)

Registo orientado a humanos e a agentes de IA para reproduzir verificações e entender o que passou / falhou.

## 2026-05-06 — Phase I0 (Vite + artefacto Vercel, site estático raiz)

| Comando                 | Resultado                                   |
| ----------------------- | ------------------------------------------- |
| `pnpm run site:build`   | **OK** — saída em `dist-vite/`              |
| `pnpm run format:check` | **OK**                                      |
| `pnpm run test:e2e`     | **OK** (4 testes Chromium, `serve` na raiz) |

Dev local do site estático: `pnpm run site:dev` (Vite, porta 5173). Preview do bundle: `pnpm run site:preview`. GitHub Pages **não** mudou: `pages.yml` continua a copiar `index.html` + `assets/`.

## 2026-05-06 — Phase G (production readiness, site estático)

| Comando                       | Resultado                                                                |
| ----------------------------- | ------------------------------------------------------------------------ |
| `pnpm run format:check`       | **OK**                                                                   |
| `pnpm run test:e2e`           | **OK** (4 testes Chromium)                                               |
| `pnpm run lint` (turbo)       | **OK** (warning conhecido Next `no-img-element` em `PracticeClient.tsx`) |
| `pnpm run validate:questions` | **OK** (após campo opcional `lastVerified` exemplo)                      |

Relatório de lançamento: `docs/production/G18-LAUNCH-REPORT.md`.

Verificação dupla na mesma sessão: `pnpm run test:e2e` executado **duas vezes** consecutivas — **OK** (4 testes × 2). `pnpm run format:check` — **OK**. Browser QA pós-deploy: pendente (ver `docs/production/POST-PHASE-G-HANDOFF.md`).

## 2026-05-04 — QA pós-INFRA (sessão Cursor)

### Comandos executados

| Comando                                                 | Resultado                                                                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run build` (raiz: `prebuild` + `turbo run build`) | **OK** — `validate-questions`, `gen:core-questions`, `@kanga/core` tsc, `@kanga/web` next build, `@kanga/mobile` echo build |
| `pnpm run lint` (raiz: `turbo run lint`)                | **Falhou** na primeira sessão — `@kanga/mobile` com `expo lint`. _Corrigido depois:_ ver secção “Entrega higiene” abaixo.   |
| `pnpm run lint` em `apps/web` apenas                    | **OK** — antes: 1 warning em `PracticeClient`; _corrigido_ na entrega higiene.                                              |

### Avisos (histórico — primeira sessão)

- ~~`themeColor` / `exhaustive-deps`~~ — resolvidos na entrega 2026-05-04 (pós-QA); ver secção seguinte.

### Smoke HTTP (dev server `pnpm dev` em `apps/web`)

| URL                                  | Esperado                           | Observado                                    |
| ------------------------------------ | ---------------------------------- | -------------------------------------------- |
| `GET /auth/login`                    | 200                                | 200                                          |
| `GET /auth/signup`                   | 200                                | 200                                          |
| `GET /progress` sem cookie de sessão | Redirect para login com `redirect` | **307** → `/auth/login?redirect=%2Fprogress` |

### Itens não automatizados nesta sessão

- Confirmação de email Supabase, OAuth Google end-to-end, Stripe Customer no dashboard, contagem exata de tabelas no projeto remoto — exigem credenciais e projeto Supabase/Stripe configurados (ver `docs/PLANNER-WEB-INFRA.md` e `docs/BACKLOG.md`).

### Próxima execução sugerida

1. `pnpm run build`
2. `pnpm run lint` (raiz — mobile usa `tsc --noEmit`).
3. Manual: fluxos em `docs/BACKLOG.md` secção “QA manual”.

---

## 2026-05-04 — Entrega higiene (viewport, hooks, mobile lint, legal, política docs)

| Comando                 | Resultado                                                  |
| ----------------------- | ---------------------------------------------------------- |
| `pnpm run lint` (raiz)  | **OK** — mobile `tsc --noEmit`; web **sem** avisos ESLint. |
| `pnpm run build` (raiz) | **OK** — sem avisos `themeColor` no Next build.            |

**Alterações:** ver `docs/HISTORY-INFRA-WEB.md` linha “Entrega 2026-05-04 (pós-QA)”.

---

## 2026-05-04 — Refresh UI (site estático)

| Comando                       | Resultado                                                         |
| ----------------------------- | ----------------------------------------------------------------- |
| `pnpm run format:check`       | **OK** — `index.html`, `assets/css/**/*.css`, `assets/js/**/*.js` |
| `pnpm run validate:questions` | **OK** — 69 questões / 10 categorias                              |
| `pnpm run gen:core-questions` | **OK** — gerou `packages/core/src/data/questions.ts`              |
| `pnpm run legacy:build`       | **OK** — gerou `dist/`                                            |
| `pnpm run build`              | **OK** — monorepo (`@kanga/web` Next build)                       |
| `pnpm run lint`               | **OK** — web sem warnings; mobile `tsc --noEmit`                  |

**Alterações:** ver `docs/HISTORY-STATIC-SITE.md` + `docs/CODEMAPS/static-site.md`.

---

## 2026-05-05 — Lazy-load dataset + guardrails (site estático + core)

### Comandos executados

| Comando                          | Resultado                                                |
| -------------------------------- | -------------------------------------------------------- |
| `pnpm run format:check`          | **OK**                                                   |
| `pnpm run validate:questions`    | **OK** — com guardrail extra para HTML suspeito em `exp` |
| `pnpm run gen:core-questions`    | **OK** — regenerou `packages/core/src/data/questions.ts` |
| `pnpm --filter @kanga/web lint`  | **OK**                                                   |
| `pnpm --filter @kanga/web build` | **OK**                                                   |
| `pnpm run legacy:build`          | **OK** — build do estático com `questions-loader.js`     |
| `pnpm run build`                 | **OK** — turbo build (core + web + mobile)               |

### Notas

- `index.html` agora carrega `assets/js/data/questions-loader.js` em vez de carregar `questions.js` sempre no boot.
- `assets/js/quiz-engine.js` faz `DW.init()` async e sanitiza HTML de `exp` (allowlist) antes de render.
- GitHub Pages deploy (`.github/workflows/pages.yml`) roda só quando `index.html`/`assets/**` mudam e cancela runs antigas.

---

## 2026-05-04 — Security hotfix (apps/web)

### Comandos executados

| Comando                          | Resultado                    |
| -------------------------------- | ---------------------------- |
| `pnpm --filter @kanga/web lint`  | **OK** — sem warnings        |
| `pnpm --filter @kanga/web build` | **OK** — Next build completo |

### Notas

- Fix open redirect aplicado em `/login` e `/auth/login` via helper `safeNextPath`.
- Rotas `/api/*` agora devolvem erros genéricos (`db_error`) e logam detalhes server-side.
- `next.config.ts` agora injeta headers de segurança e desliga `X-Powered-By`.

---

## 2026-05-04 — Dashboard + Mock test flow + Glass UI (apps/web)

### Comandos executados

| Comando                          | Resultado                    |
| -------------------------------- | ---------------------------- |
| `pnpm --filter @kanga/web lint`  | **OK** — sem warnings        |
| `pnpm --filter @kanga/web build` | **OK** — Next build completo |

### Notas

- Mock test (`/mock-test/session`, `/mock-test/results`) implementado com persistência em `sessionStorage` e POST best-effort para `/api/mock-sessions` quando autenticado.
- Dashboard agora inclui “Last 7 days”, “What to practise next” e CTAs por tópico para `/practice?cat=...`.
- UI “glass” aplicada em header e cards via `backdrop-filter` com fallback.
