# Log de execução QA — KangaLearner (web + monorepo)

Registo orientado a humanos e a agentes de IA para reproduzir verificações e entender o que passou / falhou.

## 2026-05-07 — CI hardening (env guards) + verificação final (static + e2e)

**Objetivo:** evitar crash de build no GitHub Actions (monorepo `apps/web`) quando env vars sensíveis não estão presentes e registar uma verificação final completa do site estático.

**Correções CI (Next.js `apps/web`):**

- `apps/web/src/lib/stripe.ts` — Stripe inicializado de forma lazy via `getStripe()`; erro apenas quando a função é chamada (não no import).
- `apps/web/src/lib/supabase/admin.ts` — `supabaseAdmin` criado via `Proxy` lazy; erro apenas quando uma propriedade/método é usado.

**Comandos (todos OK nesta sessão):**

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static`       | **OK** |
| `pnpm run site:build`         | **OK** (`dist-vite/`) |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## 2026-05-07 — Public visual QA fixes (assets 404 + i18n hydrate + SW bump)

**Objetivo:** corrigir problemas reais detectados por Playwright na URL pública:

- 404 + `console.error` por referência a `/src/main.js`
- troca para PT/ES não refletia no `#practice` e labels do `#progress` (depende de re-hidratação após `DW.setLang`)

**Correções (site estático root):**

- `index.html` — removido `<script type="module" src="/src/main.js"></script>` (não existe no GitHub Pages).
- `assets/js/app.js` — `DW.setLang` passa a re-hidratar i18n estático com retry curto (evita falha quando `DW` ainda não está pronto).
- `sw.js` — bump de cache `kanga-assets-v2` → `kanga-assets-v3` para forçar refresh pós-deploy.
- `.gitignore` — ignora `qa-output/` (artefactos de QA visual).

**Comandos (todos OK nesta sessão):**

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static`       | **OK** |
| `pnpm run site:build`         | **OK** (`dist-vite/`) |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## QA Manual Fix Round — Navigation, i18n, Resources, Reset, Progress, Mock (2026-05-07)

**Objetivo:** fechar lacunas do QA manual no site estático (GitHub Pages): WA-first, estados “coming soon” não clicáveis, mock exam strict (30 WA, sem feedback intermédio), categorias traduzidas em Progress/mock results, `tSafe` para reset, `uniqueQuestionCountForState` para habilitar Exam Mode, router + E2E alinhados.

**Ficheiros alterados (principais):** `assets/js/quiz-engine.js` (slice por estado, exam scoreline, reset `tSafe`, stats diferidas em exam strict, `aria_answer_options`), `assets/js/router.js` (`kl-sim-strict-exam`, `refreshMockExamUi`, bind só cards `data-available="true"`), `assets/js/locales.js` (`window.tSafe`), `assets/js/app.js` (AU→WA, cards coming soon sem listener), `assets/js/pages/learn-page.js` / `home-page.js` (cards WA vs `div` coming soon), `assets/js/pages/mock-page.js` (hint exam), `assets/js/pages/progress-page.js` (labels de categoria via `KANGA_CATEGORIES`), `assets/js/i18n.js` (copy reset + ES “Próximamente”), `assets/css/components.css` + `quiz.css` + `pages.css`, `e2e/smoke.spec.js`.

**Testes:** registar na tabela abaixo após correr `pnpm run format:check`, `pnpm run check:static-links`, `pnpm run smoke:static`, `pnpm run site:build`, `pnpm run test:e2e` na raiz do repo.

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | **OK** (após `prettier -w` em `category-labels.js`, `state-availability.js`, `locales.js`, `e2e/smoke.spec.js`) |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static`       | **OK** |
| `pnpm run site:build`         | **OK** (`dist-vite/`) |
| `pnpm run test:e2e`           | **OK** — 12 testes Chromium |

**Pendências conhecidas:** revisão manual PT+EN/ES+EN em todos os blocos longos; timer de exame 45 min não coberto por E2E completo.

## 2026-05-07 — Copy WA-first (fallback + Twitter meta)

**Objetivo:** eliminar texto “Australia-wide / pass your test” visível no HTML estático (fallback e crawlers), alinhando com WA-first.

**Alterações principais:**

- `index.html`: hero fallback (EN) e `twitter:*` meta atualizados para WA-first.

**Comandos verificados nesta rodada:**

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static`       | **OK** |
| `pnpm run site:build`         | **OK** |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## 2026-05-07 — Pós-deploy hardening (SW cache bump + Practice landing + idioma)

**Objetivo:** resolver regressões visuais/UX em browsers que ainda serviam assets antigos (GitHub Pages + SW cache), impedir auto-flip para PT+EN/ES+EN sem escolha explícita, separar `#practice` (landing) de `#practice-run` (quiz) e diferenciar Practice Mock vs Exam Mode.

**Alterações principais:**

- `sw.js`: bump de cache `kanga-assets-v1` → `kanga-assets-v2` (limpa caches antigos no `activate`).
- `assets/js/router.js`: `#practice` vira landing (`#page-root`), novo `#practice-run` para quiz; nav active cobre `#practice-run`; suporte a `#road-rules`; UI lang (dropdown ativo) como fonte de verdade.
- `assets/js/app.js` + `assets/js/quiz-engine.js`: inicialização de idioma respeita opção ativa no dropdown antes de ler `kl-lang` (evita auto-flip).
- `assets/js/pages/practice-page.js`: landing com 2 cards (Practice Questions / Practice Mock).
- `assets/js/pages/mock-page.js`: Exam Mode vira CTA principal; Practice Mock redireciona para Practice.
- `scripts/smoke-static-site.puppeteer.mjs`: smoke atualizado (`#practice` landing; quiz em `#practice-run`).
- `e2e/smoke.spec.js`: novos testes para landing de Practice + fluxo `practice-run` + “não flip” em navegação EN.

**Comandos verificados nesta rodada:**

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static`       | **OK** |
| `pnpm run site:build`         | **OK** |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## 2026-05-07 — Fecho da rodada UX (site estático: Resources, Learn/practice, a11y E2E)

**Objetivo:** corrigir falhas da auditoria (formato Prettier, Resources por estado WA vs coming soon, i18n, empty state NSW→practice, teclado nas opções, modo bilíngue, conflito `id` vs hash `#resources`), sem novas features nem alterações a `questions.js`.

**Correções principais:**

- `assets/js/data/official-resources.js` — cada estado com `status: "available" | "coming-soon"`; apenas WA com links verificados; restantes com `links: []`.
- `assets/js/pages/resources-page.js` — disponibilidade por `status === "available"` (não por `links.length`); badges e textos via i18n; sem `href="#"` para estados futuros.
- `assets/js/locales.js` — chaves `resources.*` (EN/PT/ES): available, coming soon, texto de recursos oficiais, Practise WA, Back to Learn.
- `index.html` — id do bloco de links do footer renomeado para `site-footer-resources` (evitar colisão com rota/hash `#resources`).
- `assets/js/pages/learn-page.js` — `data-available` nos state cards (WA vs outros).
- `assets/js/quiz-engine.js` — empty learn: navegação para `#learn` em vez de scroll a elemento oculto.
- `assets/css/pages.css` — estilos para cards Resources “coming soon”.
- `e2e/smoke.spec.js` — WA + estados disabled; Learn NSW → empty state + CTA WA; teclado Enter na primeira opção; PT+EN / ES+EN (classes no body, sem `.translation-line` em header/footer).

**Prettier:** `npx prettier -w` nos ficheiros que falhavam em `format:check` (`glossary.js`, `official-resources.js`, `ui-copy.js`, `validate-questions.js`, `i18n.js`, mais ficheiros tocados acima).

### Comandos (todos OK nesta sessão)

| Comando                       | Resultado                          |
| ----------------------------- | ---------------------------------- |
| `pnpm run format:check`       | **OK**                             |
| `pnpm run test:e2e`           | **OK** — 9 testes Chromium         |
| `pnpm run check:static-links` | **OK**                             |
| `pnpm run smoke:static`       | **OK**                             |
| `pnpm run site:build`         | **OK** — `dist-vite/`             |

**Manual QA pendente (não bloqueante para esta entrega):** regressão visual fina em dispositivos reais; leitores de ecrã além do que os E2E cobrem.

## 2026-05-07 — Lucide Iconography Standardisation (`apps/web`)

**Alvo:** aplicação Next.js de produção (`pnpm --filter @kanga/web`). O site estático na raiz não foi migrado para o pacote `lucide` (mantém SVGs existentes).

**Pacote:** `lucide-react` em `apps/web/package.json`.

**Decisão:** iconografia oficial na frente Vercel/Next via `lucide-react`; registo central `src/components/icons.tsx`; wrapper `src/components/ui/IconBadge.tsx`; mapeamento de categorias de perguntas em `src/lib/categoryLucideIcon.ts` (UI apenas — sem alterar `QUESTIONS` / `CATEGORIES` no core).

**Ficheiros principais:** `apps/web/app/page.tsx`, `learn/page.tsx`, `mock-test/page.tsx`, `mock-test/results/page.tsx`, `dashboard/page.tsx`, `practice/PracticeClient.tsx`, `app/globals.css`, `src/components/icons.tsx`, `IconBadge.tsx`, `categoryLucideIcon.ts`, `pnpm-lock.yaml`.

**Nota:** `.claude/plan/kangalearner-roadmap.md` está ignorado pelo git; a decisão F0 está espelhada em `docs/DESIGN-LUCIDE-ICONOGRAPHY.md` (versionado).

### Comandos

| Comando                                      | Resultado                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| `pnpm run format:check` (script raiz)       | **Falhou** — 5 ficheiros em `assets/js/` (fora do âmbito desta entrega)   |
| `npx prettier --check "apps/web/**/*.{tsx,ts,css}"` | **OK** após `prettier -w` nos ficheiros tocados em `apps/web`        |
| `pnpm --filter @kanga/web lint`              | **OK** — apenas warning existente `@next/next/no-img-element` em `PracticeClient.tsx` |
| `pnpm --filter @kanga/web build`             | **OK** — `next build` concluído (exit 0)                                  |
| `pnpm run test:e2e` / `smoke:static`         | N/A — alterações concentradas em `apps/web`; estático raiz não tocado    |

## 2026-05-06 — Phase I0 (Vite + artefacto Vercel, site estático raiz)

| Comando                 | Resultado                                   |
| ----------------------- | ------------------------------------------- |
| `pnpm run site:build`   | **OK** — saída em `dist-vite/`              |
| `pnpm run format:check` | **OK**                                      |
| `pnpm run test:e2e`     | **OK** (4 testes Chromium, `serve` na raiz) |

Dev local do site estático: `pnpm run site:dev` (Vite, porta 5173). Preview do bundle: `pnpm run site:preview`. GitHub Pages **não** mudou: `pages.yml` continua a copiar `index.html` + `assets/`.

## 2026-05-06 — SPA: `#states` nav + learn hub na home

| Comando                 | Resultado                                        |
| ----------------------- | ------------------------------------------------ |
| `pnpm run format:check` | **OK**                                           |
| `pnpm run test:e2e`     | **OK** — 5 testes Chromium (incl. `#states` nav) |

**Alterações:** `assets/js/router.js` (`updateNavActive` com `scrollTarget` para Road Rules), `assets/js/pages/home-page.js` (anexa `KL_PAGES.learn()` após topics), `e2e/smoke.spec.js`.

## 2026-05-06 — F0: ícones SVG (Learn hub)

| Comando                 | Resultado                          |
| ----------------------- | ---------------------------------- |
| `pnpm run format:check` | **OK**                             |
| `pnpm run test:e2e`     | **OK** — 6 testes (incl. `#learn`) |

**Alterações:** `assets/js/learn-engine.js` (mapa de ícones + aliases + tópicos novos), `assets/js/pages/learn-page.js` (cards usam `KL_LEARN.icon`), `assets/css/pages.css` (`.learn-hub-icon`), `e2e/smoke.spec.js`.

## 2026-05-06 — G18: GA4 + Sentry (runtime hooks)

| Comando                 | Resultado |
| ----------------------- | --------- |
| `pnpm run format:check` | **OK**    |
| `pnpm run test:e2e`     | **OK**    |

**Alterações:** `assets/js/analytics.js` (lazy-load GA4 via meta/global), `assets/js/error-monitoring.js` (lazy-load Sentry Loader Script via meta/global), `.env.example`, `README.md`.

## 2026-05-06 — G18: verificação de links estáticos

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run check:static-links` | **OK**    |

**Alterações:** `scripts/check-static-links.mjs`, `package.json`.

## 2026-05-06 — Smoke server (static, sem Vite)

| Comando                 | Resultado |
| ----------------------- | --------- |
| `pnpm run smoke:static` | **OK**    |

**Notas:** `src/main.js` agora é seguro fora do Vite (não assume `import.meta.env`).

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
