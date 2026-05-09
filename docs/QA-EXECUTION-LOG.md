# Log de execução QA — KangaLearner (web + monorepo)

Registo orientado a humanos e a agentes de IA para reproduzir verificações e entender o que passou / falhou.

## 2026-05-09 — Cleanup Batch 2 moderate (docs + investigation only)

**Objetivo:** executar a fase **moderada** do plano já em `main`: consolidar documentação (“o que está deployado hoje”, sync backend inerte em Pages, papel do `src/`), inventário com evidência de `scripts/*`, captura **read-only** de `pnpm why @supabase/supabase-js`, e registos de itens adiados. **Sem** remoção de ficheiros rastreados, **sem** alterações a código de produto.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **Novo** | `docs/architecture/cleanup-batch-2-results.md` — tabela de itens, evidência, risco, testes; matriz `scripts/`; saída `pnpm why`. |
| **Atualizado** | `docs/architecture/cleanup-batch-2-plan.md` — secção de estado pós-merge + candidatos marcados (feito / parcial / adiado). |
| **Atualizado** | `docs/architecture/dead-code-and-refactor-audit.md` — §1.1 “What ships today…”, contagens, refactor overview (Batch 2 docs). |
| **Atualizado** | `docs/QA-EXECUTION-LOG.md` (esta entrada). |

### O que **não** foi feito (intencional)

- Nenhuma pergunta, scoring, lógica de quiz, auth, router principal, CSS ou service worker alterados.
- Nenhum ficheiro removido do repositório (critérios de órfão completos não reunidos para nenhum candidato).
- `package.json` / `pnpm-lock.yaml` inalterados; nenhum `audit fix`; nenhuma ligação Supabase/Stripe; nenhum rate limit.
- `apps/web`, `apps/mobile`, `packages/core` não mexidos.
- Runtime de `KANGA_ENABLE_BACKEND_SYNC` / `/api/health` **não** alterado (só documentação).

### Comandos de verificação

| Comando | Resultado |
| ------- | --------- |
| `pnpm why @supabase/supabase-js` | OK — dependência direta na raiz (só leitura; registo no results doc). |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |
| `pnpm run site:build` | **OK** |
| `pnpm run validate:questions` | **OK** — 69 perguntas |
| `pnpm run test:e2e` | **OK** — **29/29** |

---

## 2026-05-09 — Cleanup Batch 2 planning (docs only)

**Objetivo:** criar o plano do Cleanup Batch 2 com base nas auditorias existentes, sem executar remoções nem alterações de código.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **Novo** | `docs/architecture/cleanup-batch-2-plan.md` — plano Batch 2 (2A docs/config, 2B investigação deps, 2C cleanup deferido). |
| **Atualizado** | `docs/QA-EXECUTION-LOG.md` (esta entrada). |

### O que **não** foi feito (intencional)

- Nenhuma remoção de ficheiros/funções.
- Nenhuma alteração a código de produto, perguntas, quiz, auth, rotas, CSS, service worker.
- Nenhuma alteração a `package.json` ou `pnpm-lock.yaml`. Nenhum upgrade de dependências.
- Nenhum `pnpm audit fix` / `npm audit fix`.
- Nenhuma ligação Supabase/Stripe, nenhum rate limit implementado.
- Não mexer em `apps/web`, `apps/mobile`, `packages/core`.

### Comandos de verificação

| Comando | Resultado |
| ------- | --------- |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |

---

## 2026-05-09 — Security P0.1: triagem Dependabot/alerts (docs only)

**Objetivo:** inventariar e classificar alertas Dependabot + `pnpm audit` sem atualizar dependências, sem `audit fix`, sem alterar código, env, Supabase, Stripe, rate limit ou Cleanup Batch 2.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **Novo** | `docs/security/dependabot-alerts-triage.md` — 17 alertas GitHub (0 critical / 14 high / 2 moderate / 1 low), inventário por `#`, comparação com `pnpm audit` e `security-audit-initial.md`, plano de PRs sugerido. |
| **Atualizado** | `docs/QA-EXECUTION-LOG.md` (esta entrada). |

### Resultados-chave

- **Dependabot API:** 17 alertas `open`, todos `pnpm-lock.yaml` / npm.
- **`pnpm audit`:** metadados 14 high, 3 moderate, 1 low (18 “slots” vs 17 alertas — agregação ligeiramente diferente).
- **Superfície GitHub Pages atual:** nenhum alerta classificado como *production reachable* no site estático; clusters em `apps/mobile` (não deployado) e `postcss` também via `apps/web`/Next (não deployado).
- **P0 imediato para produção atual:** nenhuma correção obrigatória nesta triagem.

### O que **não** foi feito (intencional)

- Nenhum `pnpm audit fix` / `npm audit fix`. Nenhuma alteração a `package.json` ou `pnpm-lock.yaml`.
- Nenhum código de produto, perguntas, quiz, auth, rotas, CSS, SW.
- Nenhum Supabase/Stripe; rate limit não implementado; Cleanup Batch 2 não iniciado.

### Comandos de verificação

| Comando | Resultado |
| ------- | --------- |
| `git checkout main` / `git pull` / branch `chore/security-p0-dependabot-triage` | OK — base `ab89c95`. |
| `gh api repos/.../dependabot/alerts --paginate --jq '...'` | OK — 17 alertas listados. |
| `pnpm audit` / `pnpm audit --json` | OK — leitura apenas (exit 1 esperado com vulnerabilidades presentes). |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |

---

## 2026-05-09 — Security P0: Dependabot + hardening checklist (docs + GitHub config only)

**Objetivo:** iniciar Security P0 de forma conservadora: Dependabot versionado, checklist operacional de hardening do Supabase Auth, verificação/ativação de recursos GitHub quando possível. **Sem** alterar código de produto, `package.json`, lockfile, env, Supabase real, Stripe, rate limit, perguntas, quiz, auth, rotas, CSS ou service worker.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **GitHub** | `gh api --method PUT .../vulnerability-alerts` e `.../automated-security-fixes` executados com sucesso (token com permissão). Estado pós-exec: `secret_scanning` enabled, `secret_scanning_push_protection` enabled, `dependabot_security_updates` **enabled** (passou de disabled após os PUTs), `vulnerability-alerts` GET passa (antes 404 “disabled”). |
| **Novo** | `.github/dependabot.yml` — npm em `/`, `/apps/web`, `/apps/mobile`, `/packages/core` + `github-actions` em `/`; weekly Australia/Perth; labels `dependencies`/`security` (e `github-actions` onde aplicável). |
| **Novo** | `docs/security/supabase-auth-hardening-checklist.md` — checklist antes de auth real em produção + QA manual + “do not do”. |
| **Atualizado** | `docs/security/security-audit-initial.md` — secção “Security P0 follow-up”. |
| **Atualizado** | `docs/QA-EXECUTION-LOG.md` (esta entrada). |

### O que **não** foi feito (intencional)

- Nenhum `pnpm audit fix` / `npm audit fix`. Nenhuma bump de dependência. Nenhuma alteração a `package.json` ou `pnpm-lock.yaml`.
- Nenhum código em `assets/`, `apps/web`, `apps/mobile`, `packages/core`, rotas, CSS, SW, perguntas.
- Nenhum env/secret commitado. Nenhuma ligação Supabase ou Stripe. Rate limit e cap em `/api/attempts/bulk` continuam adiados até backend/API em produção.
- Cleanup Batch 2 não iniciado. PR não aberto (push só da branch).

### Comandos de verificação (branch `chore/security-p0-dependabot-hardening`, HEAD após commit)

| Comando | Resultado |
| ------- | --------- |
| `git checkout main` / `git pull origin main` | OK — `eb2650b` ou posterior; `.gitattributes` e `docs/security/security-audit-initial.md` presentes. |
| `gh api repos/... --jq '.security_and_analysis'` | Ver entrada “GitHub” acima (antes e depois dos PUTs registados no relatório final da sessão). |
| `gh api repos/.../vulnerability-alerts` | Antes: 404 (alerts desativados). Depois dos PUTs: sucesso (exit 0). |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |
| `pnpm run site:build` | **OK** |
| `pnpm run validate:questions` | **OK** — 69 perguntas |
| `pnpm run test:e2e` | **OK** — **29/29** |

---

## 2026-05-09 — Auditoria de segurança inicial (read-only, docs only)

**Objetivo:** auditoria inicial de postura de segurança do KangaLearner sem alterar código, dependências, env, Supabase, Stripe ou rotas. Avalia: dependency audit, password hashing, secrets, rate limit, Supabase Auth hardening.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **Docs novo** | `docs/security/security-audit-initial.md` — sumário executivo, advisories, posture e backlog P0/P1/P2. |
| **Docs atualizado** | `docs/QA-EXECUTION-LOG.md` (esta entrada). |

### Resultados-chave

- `pnpm audit`: **0 critical**, **13 high**, **3 moderate**, **1 low** — todas em `apps/mobile` (Expo CLI/RN) e `apps/web` (postcss build). Nenhuma atinge a superfície de produção atual (SPA estático no GitHub Pages).
- **Nenhum secret** real exposto. Service-role apenas em `apps/web/src/lib/supabase/admin.ts` (server-only). Push protection GitHub ativo.
- **Nenhum hash próprio de senha**: Supabase Auth é o único guardião.
- **Rate limit** próprio não é necessário hoje (sem backend em produção). Necessário antes de deploy de `apps/web`.
- **Dependabot alerts e security updates desativados** (gap a habilitar P0).
- **Supabase Dashboard hardening** (password policy, leaked password protection, CAPTCHA, redirect URLs allowlist) precisa de validação fora do código.

### O que **não** foi feito (intencional)

- Nenhum upgrade de dependência. Nenhum `pnpm audit fix`. Nenhum `npm audit fix`.
- Nenhum env/secret adicionado. Nenhum Supabase ou Stripe conectado.
- Nenhum código alterado (assets, src, apps, scripts, sw.js, CSS, perguntas, rotas, auth, quiz).
- Nenhum AgentShield rodado (escopo de não-execução).

### Comandos de verificação

| Comando | Resultado |
| ------- | --------- |
| `git status --short` / `git log --oneline -10` | OK — main em paridade com `origin/main`, base `ba7adcf`. |
| `pnpm audit --json` / `pnpm audit` | OK — 17 hits, ver doc. |
| `pnpm outdated --recursive` | OK — informativo, sem ação. |
| `gh api repos/.../vulnerability-alerts` | 404 (disabled) — confirmado gap. |
| `gh api repos/.../security_and_analysis` | secret_scanning enabled, push_protection enabled, dependabot disabled. |
| `pnpm run format:check` | **FAIL pré-existente em `main`** — `assets/js/app.js` e `vite.config.js` (não tocados nesta auditoria; ficheiros vêm do PR #9). Reproduzido em `main` antes de criar a branch. Mantido sem fix por respeito à regra "não alterar código". Anotado como item de hygiene fora do escopo desta auditoria. |
| `pnpm run check:static-links` | **OK** |

---

## 2026-05-09 — Cleanup Batch 1: comentários obsoletos (hygiene apenas)

**Objetivo:** executar a primeira fatia **conservadora** da auditoria dead-code: só comentários em `assets/js/app.js` e `vite.config.js`, mais registo nos docs. **Sem** alteração de lógica, rotas, auth, quiz, perguntas, CSS, service worker, dependências, `apps/*`, `packages/core`.

### Alterações

| Área | Detalhe |
| ---- | ------- |
| **`app.js`** | Comentário do bloco auth header alinhado com `KL_AUTH_PROVIDER` + fallback `KL_AUTH_MOCK`. |
| **`vite.config.js`** | JSDoc do topo alinhado com `pages.yml` + `pnpm run site:build` → `dist-vite`. |
| **Docs** | `docs/QA-EXECUTION-LOG.md` (esta entrada); `docs/architecture/dead-code-and-refactor-audit.md` (Batch 1 comentários marcados como feitos; `pnpm why`/deps ainda pendentes). |

### O que **não** foi feito (adiado)

- `quiz-engine.js` TODO, root `@supabase/supabase-js`, exports `KL_SUPABASE`, CSS, `sw.js`, router, auth-provider, `package.json`.

### Comandos de verificação

| Comando | Resultado |
| ------- | --------- |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |
| `pnpm run site:build` | **OK** |
| `pnpm run validate:questions` | **OK** — 69 perguntas |
| `pnpm run test:e2e` | **OK** — **29/29** |

---

## 2026-05-09 — GitHub Pages: `VITE_BASE_PATH` + URLs absolutas no HTML (fix layout quebrado)

**Problema:** em `https://matheusbaiense.github.io/kangalearner/`, HTML carregava mas CSS/JS podiam falhar (página sem estilo, i18n a mostrar todos os idiomas) por dependência de `<base>` + scripts relativos `assets/js/...`.

**Alterações (só build/CI/SW, sem quiz/auth/perguntas):**

- `vite.config.js`: `base` a partir de `VITE_BASE_PATH`; plugin pós-build que prefixa `assets/` nos `src`/`href` do `index.html` quando `base !== "/"`.
- `.github/workflows/pages.yml`: `VITE_BASE_PATH: /${{ github.event.repository.name }}/` no passo `pnpm run site:build`.
- `sw.js`: `kanga-assets-v10` para invalidar caches antigos.

### Verificação local

| Comando | Resultado |
| ------- | --------- |
| `VITE_BASE_PATH=/kangalearner/ pnpm run site:build` | **OK** — `dist-vite/index.html` com `/kangalearner/...` em CSS Vite e scripts `assets/js`. |
| `pnpm run format:check` | **OK** |

**Deploy:** push para `main` (ou `workflow_dispatch` em Deploy Pages) após merge.

---

## 2026-05-09 — Dead-code audit refreshed after Supabase Auth merge (docs only)

**Objetivo:** recriar a auditoria de dead-code em cima de `main` pós–PR #7 (`94a7ef1`), incluindo a stack Supabase Auth + Pages/Vite, **sem alterações funcionais** e **sem executar cleanup Batch 1**.

### Git

| Item | Detalhe |
| ---- | ------- |
| **Branch** | `chore/dead-code-and-refactor-audit-v2` (a partir de `main` atual) |
| **Documento** | `docs/architecture/dead-code-and-refactor-audit.md` (v2; substitui contexto da branch antiga `353977d` para o estado pós-merge) |
| **Backup local** | `.tmp-audit-backup/dead-code-and-refactor-audit.local.md` — cópia do untracked anterior; **não versionado** |

### Alterações de produto

| Item | Resultado |
| ---- | --------- |
| **Perguntas / quiz / auth / rotas** | **Nenhuma** alteração de código |
| **Cleanup Batch 1** | **Ainda pendente** de aprovação |

### Comandos de verificação (esta entrega)

| Comando | Resultado |
| ------- | --------- |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |

---

## 2026-05-09 — GitHub Pages: deploy via Vite (`dist-vite`) + env público Supabase (CI)

**Objetivo:** fechar o gap operacional em que o workflow copiava `index.html`/`assets` crus e **não** injetava `window.__KANGA_ENV__`. O job `build` em `.github/workflows/pages.yml` passa a correr `pnpm run site:build` e publica **`dist-vite`**.

### GitHub Actions

| Item | Detalhe |
| ---- | ------- |
| **Artefacto** | `dist-vite/` (output do Vite + `vite-plugin-static-copy`) |
| **Variáveis** | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` via **Repository Variables** (`vars.*`). Se ausentes → strings vazias → modo **not configured**. |
| **Service role** | Nunca no frontend; não configurar `SUPABASE_SERVICE_ROLE_KEY` neste workflow. |
| **Redirect URLs** | Continuam a ser definidas no dashboard Supabase (e IdP OAuth) — não automáticas só com este deploy. |
| **Planner** | `docs/PLANNER-WEB-INFRA.md` — item em Fase 4 sobre Pages + `dist-vite` + Variables. |

### Comandos locais (corrida de verificação)

| Comando | Resultado |
| ------- | --------- |
| `pnpm run format:check` | **OK** |
| `pnpm run check:static-links` | **OK** |
| `pnpm run smoke:static` | **OK** |
| `pnpm run site:build` | **OK** |
| `pnpm run test:e2e` | **OK** — **29/29** |
| `pnpm run validate:questions` | **OK** — 69 perguntas |
| `pnpm run site:build` sem `VITE_*` | `__KANGA_ENV__` com `""` / `""` |
| `pnpm run site:build` com URL/key dummy | `__KANGA_ENV__` preenchido (só teste local) |

---

## 2026-05-09 — Site estático: fundação Supabase Auth (branch `feature/supabase-auth-implementation`)

**Objetivo:** integrar **Supabase Auth opcional** no SPA estático (raiz): `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` via Vite → `window.__KANGA_ENV__` e metas de fallback; lazy-load `@supabase/supabase-js`; manter **guest** e **mock roles** quando Supabase não está configurado; sem service role no cliente; sem alterar quiz/questions/scoring, `apps/web`, Stripe ou migrações.

### Git

| Item    | Resultado                                      |
| ------- | ---------------------------------------------- |
| Branch  | `feature/supabase-auth-implementation`         |
| Escopo  | `assets/js/auth/*`, `router.js`, `app.js`, páginas auth/account, `index.html`, `vite.config.js`, `e2e/smoke.spec.js`, `locales.js` |

### Comandos locais (todos OK nesta corrida)

| Comando                         | Resultado                          |
| ------------------------------- | ---------------------------------- |
| `pnpm run format:check`       | **OK**                             |
| `pnpm run check:static-links` | **OK**                             |
| `pnpm run smoke:static`       | **OK**                             |
| `pnpm run site:build`         | **OK**                             |
| `pnpm run validate:questions` | **OK** — 69 perguntas              |
| `pnpm run test:e2e`           | **OK** — **29/29**                 |

### Notas

- E2E em ambiente sem env Supabase: login mostra aviso “não configurado”; `KL_SUPABASE_CONFIGURED` / metas verificadas conforme `e2e/smoke.spec.js`.
- Callback OAuth: `exchangeCodeForSession` com `code` da query (API JS Supabase), não URL completa.

---

## 2026-05-08 — Auditoria final pós-7110cb9 (pre-auth, público + local)

**Objetivo:** confirmar fecho de fase **depois** do commit de produto `7110cb9`, com `origin/main` já em **`5c02ffa`** (só docs), validar **GitHub Pages** e QA público obrigatório antes de Login/Supabase.

### Git

| Item                     | Resultado                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Latest `origin/main`** | **`5c02ffa`** (`docs(static): record pre-auth freeze audit`); **contém `7110cb9`** na história (pai direto) |
| **Working tree**         | **Não limpo** — `qa-practice-polish-check.mjs` continua **untracked** (não commitar)                        |
| **`qa-output/`**         | Ignorado por `.gitignore`                                                                                   |

### Deploy público

| Verificação                   | Resultado                                                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API GitHub** `commits/main` | SHA **`5c02ffa`** (HEAD publicado no default branch)                                                                                                                       |
| **`sw.js` público**           | `kanga-assets-v6` confirmado por fetch a `https://matheusbaiense.github.io/kangalearner/sw.js`                                                                             |
| **`7110cb9` “deployed”**      | **Sim** no sentido de **estar contido no branch que alimenta Pages**; o HTML/JS de produto do hub Practice é o de **`7110cb9`** (filho apenas de `5c02ffa` é bump de docs) |

### Comandos locais (todos existem, todos OK nesta corrida)

| Comando                       | Resultado             |
| ----------------------------- | --------------------- |
| `pnpm run format:check`       | **OK**                |
| `pnpm run check:static-links` | **OK**                |
| `pnpm run smoke:static`       | **OK**                |
| `pnpm run site:build`         | **OK**                |
| `pnpm run test:e2e`           | **OK** — **15/15**    |
| `pnpm run validate:questions` | **OK** — 69 perguntas |

### QA público obrigatório (Puppeteer, sessão limpa)

Script **temporário** (não versionado): unregister SW + limpar storages/caches + verificações EN/PT/ES, PT+EN / ES+EN, `#practice` (3 cards, sem Mock/Progress no header), `#progress` + back, Resources (WA + coming soon), Glossary (carrega; **sem campo de busca** — esperado), Topic Practice (feedback após resposta), Practice Mock (1/30, sem “Review mistakes” no início), Exam Simulation (sem feedback imediato tipo `answer-review` no cartão após 1 clique), **0** `console.error` rastreados, **0** respostas **404** rastreadas, **sem** `/src/main.js`.

| Resultado | **PASS** |
| --------- | -------- |

**Nota:** “Revisar erros” / fila Duolingo / debrief completo ao fim de 30Q **não** foram exaustivamente automatizados linha-a-linha; comportamento parcial está coberto por **e2e locais** e revisão manual continua recomendada para G18.

### Bugs

| Severidade | Estado                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| Críticos   | **Nenhum** na corrida local + público                                                                                    |
| Médios     | Checklist **G18** (GA4, Sentry, domínio, Search Console, Lighthouse prod, tag `v1.0.0`) ainda **manual / sem evidência** |
| Baixo      | `qa-practice-polish-check.mjs` local; roadmap UTF-8 em blocos antigos                                                    |

### Auth / Supabase

**Pronto para iniciar planeamento/implementação de Login/Supabase no static pre-auth sense: Sim**, com reservas: **G/H** no ficheiro de roadmap mantêm itens formais por fechar; decisão de produto deve assumir **ops manuais** e possível **gap** entre texto do roadmap (“após H18”) e trabalho já feito no hub — ver bloco “Cursor execution log” em `.claude/plan/kangalearner-roadmap.md`.

### Liquid Glass

Mantém-se **fora desta fase** — track de design separado (ver roadmap local).

---

## 2026-05-08 — Pre-auth freeze audit (site estático root, antes de Login/Supabase)

**Objetivo:** fechar a fase atual do produto público (GitHub Pages / SPA estático), confirmar estabilidade e documentação antes de iniciar Auth (Phase I / Supabase).

### Git

| Item         | Resultado                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch       | `main` @ `7110cb9` alinhado com `origin/main` (0 ahead / 0 behind)                                                                                 |
| Working tree | **Não totalmente limpo** — ficheiro **untracked** `qa-practice-polish-check.mjs` (artefacto de QA; **não commitar**; manter fora do git ou apagar) |
| `qa-output/` | Existe localmente (Playwright; **ignorado pelo `.gitignore`**)                                                                                     |

### Comandos executados (local)

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK** (`dist-vite/`)       |
| `pnpm run test:e2e`           | **OK** — 15 testes Chromium |
| `pnpm run validate:questions` | **OK** — 69 perguntas       |

### QA público — https://matheusbaiense.github.io/kangalearner/

Verificação automatizada com Puppeteer (sessão limpa: unregister SW + limpar `localStorage`/`sessionStorage`/Cache Storage + reload):

| Verificação                                                                   | Resultado  |
| ----------------------------------------------------------------------------- | ---------- |
| HTTP 404 nas respostas rastreadas                                             | **Nenhum** |
| `console.error`                                                               | **Nenhum** |
| Referência a `/src/main.js` no DOM                                            | **Não**    |
| Menu principal (header): 4 itens `#home`, `#learn`, `#practice`, `#resources` | **OK**     |
| Sem `#mock` nem `#progress` no header                                         | **OK**     |
| Um único seletor de idioma (`#ld.ld-wrap`)                                    | **OK**     |
| `body.mode-en` após reload limpo                                              | **OK**     |
| Rota `#/progress`: link “voltar” para Practice presente no HTML               | **OK**     |

**Nota:** Rotas `#resources` / `#glossary` renderizam conteúdo dentro de `#page-root` (sem `<section id="resources">` dedicado no HTML inicial); validação funcional segue o mesmo critério dos testes e2e (`#page-root` + texto/links esperados).

### Bugs / pendências

| Severidade     | Estado                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Críticos       | **Nenhum** identificado nesta auditoria (local + público básico)                                                                                               |
| Médios         | Itens manuais externos não verificados aqui (GA4 real, Sentry real, domínio, Search Console, Lighthouse produção, tag `v1.0.0`) — ver checklist G18 no roadmap |
| Baixo / polish | Encoding legível em secções antigas do roadmap (UTF-8); opcional **descartar** ou ignorar `qa-practice-polish-check.mjs` local                                 |

### Pronto para iniciar Login / Supabase?

**Sim, com reservas:** o site estático em `main` passa a suíte local e o smoke público automático; a próxima fase pode ser **Auth/Supabase** no fluxo planeado, desde que itens **manuais G18** e métricas de produção continuem listados como trabalho humano/ops.

**Liquid Glass:** análise/design mantém-se como **track separado** — **não** implementado nesta fase (ver entrada correspondente no roadmap).

---

## 2026-05-08 — Practice hub redesign + Review mistakes (Topic) + Readiness/Debrief (static root)

**Objetivo:** transformar `#practice` no hub principal com 3 cards totalmente padronizados, integrar “Your Progress” + “Readiness & Next step”, manter `#progress` como rota detalhada (sem menu), adicionar “Review mistakes” estilo Duolingo **somente** para Topic Practice, e adicionar Debrief/Next step no final de Practice Mock + Exam Simulation.

### Comandos executados

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK** (`dist-vite/`)       |
| `pnpm run test:e2e`           | **OK** — 15 testes Chromium |
| `pnpm run validate:questions` | **OK**                      |

### QA visual (Playwright)

- Script local: `qa-practice-polish-check.mjs` (**não commitar**)
- Screenshots gerados em `qa-output/` (**não commitar**):
  - `en-practice-final-polished.png`
  - `pt-practice-final-polished.png`
  - `es-practice-final-polished.png`
  - `en-progress-panel.png`
  - `pt-progress-panel.png`
  - `es-progress-panel.png`
  - `en-progress-detail.png`
  - `topic-practice-review-mistakes.png`
  - `practice-mock-debrief.png`
  - `exam-simulation-debrief.png`
  - `mobile-practice-final.png`

### Notas

- `sw.js` cache bump: `kanga-assets-v6`.

## 2026-05-07 — CI hardening (env guards) + verificação final (static + e2e)

**Objetivo:** evitar crash de build no GitHub Actions (monorepo `apps/web`) quando env vars sensíveis não estão presentes e registar uma verificação final completa do site estático.

**Correções CI (Next.js `apps/web`):**

- `apps/web/src/lib/stripe.ts` — Stripe inicializado de forma lazy via `getStripe()`; erro apenas quando a função é chamada (não no import).
- `apps/web/src/lib/supabase/admin.ts` — `supabaseAdmin` criado via `Proxy` lazy; erro apenas quando uma propriedade/método é usado.

**Comandos (todos OK nesta sessão):**

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK** (`dist-vite/`)       |
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

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK** (`dist-vite/`)       |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## 2026-05-07 — Practice + Mock unificados (IA) + correções QA público (static root)

**Objetivo:** aplicar a decisão de produto (Practice e Mock Test viram **uma única tela**) e corrigir problemas visuais/UX encontrados no QA público (botões “fantasma”, label de idioma “AU AU English”, duplicação de telas).

**Mudanças principais (site estático root):**

- `index.html` — removido “Mock Test” do menu principal; selector de idioma no header agora mostra `English` (sem `AU AU`).
- `assets/js/pages/practice-page.js` — `#practice` virou landing única com **3 modos**: Practice Questions, Practice Mock e Exam Simulation.
- `assets/js/router.js` — `#mock` virou **rota legada** que redireciona para `#practice` e foca/destaca o card “Exam Simulation”; novo `#exam-run` para simulação; Practice ativo no menu para `#practice`, `#practice-run`, `#mock`, `#mock-run`, `#exam-run`.
- `assets/js/quiz-engine.js` — label do seletor de idioma sem prefixos por país (ex. `AU English`); `exam-run` tratado como simulação strict (sem feedback até o final).
- `assets/js/locales.js` — copy da tela Practice atualizado (EN/PT/ES) + chaves para Exam Simulation + mensagens claras quando faltam 30 questões WA.
- `assets/css/pages.css` — grid da landing unificada + correções de contraste para `btn-secondary` em cards claros + estilo legível para `:disabled`.
- `scripts/smoke-static-site.puppeteer.mjs` + `e2e/smoke.spec.js` — testes alinhados com a IA unificada (menu sem Mock Test, `#mock` legado, landing 3 cards).
- `sw.js` — bump de cache `kanga-assets-v3` → `kanga-assets-v4` para forçar refresh pós-deploy.

**Comandos (todos OK nesta sessão):**

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK** (`dist-vite/`)       |
| `pnpm run test:e2e`           | **OK** — 14 testes Chromium |

## 2026-05-07 — Practice hub polish + Progress integration (static root)

**Objetivo:** tornar `#practice` o hub central (modos + caminho recomendado + tip + resumo de progresso), manter `#progress` como rota detalhada/deep link e remover Progress do menu principal (Practice continua ativo em `#progress`).

**Mudanças principais (site estático root):**

- `index.html` — menu principal agora: Home | Learn | Practice | Resources (sem Progress / Mock Test).
- `assets/js/router.js` — `#progress` passa a marcar Practice como ativo (IA centralizada).
- `assets/js/pages/practice-page.js` — adicionados “Recommended path”, tip melhorada e painel “Your Progress” integrado com CTA “View full progress”.
- `assets/js/pages/progress-page.js` — adiciona breadcrumb “Back to Practice”.
- `assets/js/locales.js` — novas chaves i18n para Practice hub + progress panel (`practice.page.*`, `practice.path.*`, `practice.*.label/title/description/cta`, `practice.tip`, `practice.progress.*`).
- `assets/css/pages.css` — novo layout/estilos para `.practice-path`, `.practice-mode-card`, `.practice-tip`, `.practice-progress-panel`.
- `sw.js` — bump de cache `kanga-assets-v4` → `kanga-assets-v5`.
- `e2e/smoke.spec.js` — testes atualizados para menu (4 itens) + presença de path/tip/progress e Practice ativo em `#progress`.

**Comandos (executar antes de commit):**

| Comando                       | Resultado |
| ----------------------------- | --------- |
| `pnpm run format:check`       | TODO      |
| `pnpm run check:static-links` | TODO      |
| `pnpm run smoke:static`       | TODO      |
| `pnpm run site:build`         | TODO      |
| `pnpm run test:e2e`           | TODO      |

## QA Manual Fix Round — Navigation, i18n, Resources, Reset, Progress, Mock (2026-05-07)

**Objetivo:** fechar lacunas do QA manual no site estático (GitHub Pages): WA-first, estados “coming soon” não clicáveis, mock exam strict (30 WA, sem feedback intermédio), categorias traduzidas em Progress/mock results, `tSafe` para reset, `uniqueQuestionCountForState` para habilitar Exam Mode, router + E2E alinhados.

**Ficheiros alterados (principais):** `assets/js/quiz-engine.js` (slice por estado, exam scoreline, reset `tSafe`, stats diferidas em exam strict, `aria_answer_options`), `assets/js/router.js` (`kl-sim-strict-exam`, `refreshMockExamUi`, bind só cards `data-available="true"`), `assets/js/locales.js` (`window.tSafe`), `assets/js/app.js` (AU→WA, cards coming soon sem listener), `assets/js/pages/learn-page.js` / `home-page.js` (cards WA vs `div` coming soon), `assets/js/pages/mock-page.js` (hint exam), `assets/js/pages/progress-page.js` (labels de categoria via `KANGA_CATEGORIES`), `assets/js/i18n.js` (copy reset + ES “Próximamente”), `assets/css/components.css` + `quiz.css` + `pages.css`, `e2e/smoke.spec.js`.

**Testes:** registar na tabela abaixo após correr `pnpm run format:check`, `pnpm run check:static-links`, `pnpm run smoke:static`, `pnpm run site:build`, `pnpm run test:e2e` na raiz do repo.

| Comando                       | Resultado                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `pnpm run format:check`       | **OK** (após `prettier -w` em `category-labels.js`, `state-availability.js`, `locales.js`, `e2e/smoke.spec.js`) |
| `pnpm run check:static-links` | **OK**                                                                                                          |
| `pnpm run smoke:static`       | **OK**                                                                                                          |
| `pnpm run site:build`         | **OK** (`dist-vite/`)                                                                                           |
| `pnpm run test:e2e`           | **OK** — 12 testes Chromium                                                                                     |

**Pendências conhecidas:** revisão manual PT+EN/ES+EN em todos os blocos longos; timer de exame 45 min não coberto por E2E completo.

## 2026-05-07 — Copy WA-first (fallback + Twitter meta)

**Objetivo:** eliminar texto “Australia-wide / pass your test” visível no HTML estático (fallback e crawlers), alinhando com WA-first.

**Alterações principais:**

- `index.html`: hero fallback (EN) e `twitter:*` meta atualizados para WA-first.

**Comandos verificados nesta rodada:**

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK**                      |
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

| Comando                       | Resultado                   |
| ----------------------------- | --------------------------- |
| `pnpm run format:check`       | **OK**                      |
| `pnpm run check:static-links` | **OK**                      |
| `pnpm run smoke:static`       | **OK**                      |
| `pnpm run site:build`         | **OK**                      |
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

| Comando                       | Resultado                  |
| ----------------------------- | -------------------------- |
| `pnpm run format:check`       | **OK**                     |
| `pnpm run test:e2e`           | **OK** — 9 testes Chromium |
| `pnpm run check:static-links` | **OK**                     |
| `pnpm run smoke:static`       | **OK**                     |
| `pnpm run site:build`         | **OK** — `dist-vite/`      |

**Manual QA pendente (não bloqueante para esta entrega):** regressão visual fina em dispositivos reais; leitores de ecrã além do que os E2E cobrem.

## 2026-05-07 — Lucide Iconography Standardisation (`apps/web`)

**Alvo:** aplicação Next.js de produção (`pnpm --filter @kanga/web`). O site estático na raiz não foi migrado para o pacote `lucide` (mantém SVGs existentes).

**Pacote:** `lucide-react` em `apps/web/package.json`.

**Decisão:** iconografia oficial na frente Vercel/Next via `lucide-react`; registo central `src/components/icons.tsx`; wrapper `src/components/ui/IconBadge.tsx`; mapeamento de categorias de perguntas em `src/lib/categoryLucideIcon.ts` (UI apenas — sem alterar `QUESTIONS` / `CATEGORIES` no core).

**Ficheiros principais:** `apps/web/app/page.tsx`, `learn/page.tsx`, `mock-test/page.tsx`, `mock-test/results/page.tsx`, `dashboard/page.tsx`, `practice/PracticeClient.tsx`, `app/globals.css`, `src/components/icons.tsx`, `IconBadge.tsx`, `categoryLucideIcon.ts`, `pnpm-lock.yaml`.

**Nota:** `.claude/plan/kangalearner-roadmap.md` está ignorado pelo git; a decisão F0 está espelhada em `docs/DESIGN-LUCIDE-ICONOGRAPHY.md` (versionado).

### Comandos

| Comando                                             | Resultado                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `pnpm run format:check` (script raiz)               | **Falhou** — 5 ficheiros em `assets/js/` (fora do âmbito desta entrega)               |
| `npx prettier --check "apps/web/**/*.{tsx,ts,css}"` | **OK** após `prettier -w` nos ficheiros tocados em `apps/web`                         |
| `pnpm --filter @kanga/web lint`                     | **OK** — apenas warning existente `@next/next/no-img-element` em `PracticeClient.tsx` |
| `pnpm --filter @kanga/web build`                    | **OK** — `next build` concluído (exit 0)                                              |
| `pnpm run test:e2e` / `smoke:static`                | N/A — alterações concentradas em `apps/web`; estático raiz não tocado                 |

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

---

## 2026-05-08 — I1 Auth UI + Roles + Premium + Admin + Future schema (static root)

### Comandos executados

| Comando                                                    | Resultado                                                          |
| ---------------------------------------------------------- | ------------------------------------------------------------------ |
| `pnpm run format:check`                                    | **OK**                                                             |
| `pnpm run check:static-links`                              | **OK**                                                             |
| `pnpm run smoke:static`                                    | **OK**                                                             |
| `pnpm run site:build`                                      | **OK**                                                             |
| `pnpm run test:e2e`                                        | **OK** — 26/26 passed                                              |
| `pnpm run validate:questions`                              | **OK**                                                             |
| `pnpm exec playwright test e2e/qa-auth-ui-screens.spec.js` | **OK** — screenshots gerados em `test-results/qa/` (não versionar) |

### Notas

- **Supabase**: **não conectado** (sem sessão real, sem `.env`, sem backend).
- **Stripe**: **não conectado** (billing/pricing placeholders).
- **Liquid Glass**: **deferido** (nenhuma mudança de design global/glass).
- **sw.js**: cache bump para `kanga-assets-v7`.
- **Rotas novas**: Auth, Account, Premium, Admin, Legal (hash router).
- **Guards**: baseados em role mockado (localStorage) — UI-only.
- **Docs**: adicionados documentos de arquitetura em `docs/architecture/*`.
- **Migration draft**: adicionada migration futura em `supabase/migrations/0001_auth_account_product_schema.sql` com RLS/policies draft (não aplicada).

---

## 2026-05-08 — Liquid Glass / Crystal Liquid design system (static root)

### Comandos executados

| Comando                       | Resultado             |
| ----------------------------- | --------------------- |
| `pnpm run format:check`       | **OK**                |
| `pnpm run check:static-links` | **OK**                |
| `pnpm run smoke:static`       | **OK**                |
| `pnpm run site:build`         | **OK**                |
| `pnpm run test:e2e`           | **OK** — 27/27 passed |
| `pnpm run validate:questions` | **OK**                |

### Notas

- **Escopo**: **visual-only** (tokens + classes + restyle de superfícies) — sem alteração de lógica, rotas, dados ou perguntas.
- **Supabase**: **não conectado**.
- **Stripe**: **não conectado**.
- **Auth real**: **não implementado** (mock permanece).
- **sw.js**: cache bump para `kanga-assets-v8`.
- **CSS**: tokens e utilitários em `assets/css/theme.css` com fallback de `backdrop-filter`.

---

## 2026-05-08 — Art Direction + Typography Pass (Liquid Glass v2)

### Comandos executados

| Comando                       | Resultado             |
| ----------------------------- | --------------------- |
| `pnpm run format:check`       | **OK**                |
| `pnpm run check:static-links` | **OK**                |
| `pnpm run smoke:static`       | **OK**                |
| `pnpm run site:build`         | **OK**                |
| `pnpm run test:e2e`           | **OK** — 27/27 passed |
| `pnpm run validate:questions` | **OK**                |

### Notas

- **Escopo**: **visual-only** (tipografia + refinamento de glass + art direction) — sem alteração de lógica, rotas, dados ou perguntas.
- **Fonts**: Google Fonts via `index.html` (**Space Grotesk** headings + **Manrope** body/UI).
- **Road motif**: linhas “lane/route” discretas via pseudo-elementos no hero (sem imagens).
- **Legibilidade**: páginas longas/tabelas (Legal/Admin) mais sólidas, com menos blur.
- **sw.js**: cache bump para `kanga-assets-v9`.
- **QA screenshots**: gerados em `test-results/qa-art-direction-v1/` (não versionados).

---

## 2026-05-08 — Pre-Supabase code hygiene pass (static root)

### Branch

- `chore/pre-supabase-code-cleanup`

### Escopo

- Hygiene conservador + documentação (sem mudanças funcionais).
- **Sem** Supabase/Stripe real.
- **Sem** mudanças em perguntas/quiz/scoring/rotas públicas.
- **Sem** mudanças em `apps/web`, `apps/mobile`, `supabase/migrations`, `packages/core/src/data/questions.ts`.
- **Sem** mudanças em `.gitignore` e `sw.js`.

### Limpeza executada

- Batch 1 (local-only): removidos localmente `dist-vite/`, `qa-output/`, `test-results/`, `dist/` (não versionados).
- Code hygiene: nenhuma remoção segura aplicada além de docs (comentários/logs mantidos quando intencionais).
- `ChatGPT Image ... .png`: **mantidas** (não mover/deletar).
- `qa-runner/`: **mantido** (deferido).

### Comandos executados

| Comando                       | Resultado |
| ---------------------------- | --------- |
| `pnpm run format:check`       | **OK**    |
| `pnpm run check:static-links` | **OK**    |
| `pnpm run smoke:static`       | **OK**    |

### Notas

- **/api sync hooks** em `assets/js/app.js` e `assets/js/quiz-engine.js`: **não alterados** (deferido por risco).

---

## 2026-05-08 — SAFE hygiene follow-up (static root)

### Branch

- `chore/pre-supabase-code-cleanup`

### Safe items applied

- `assets/js/router.js`: removido comentário redundante (JSDoc já descreve o módulo).
- `assets/js/quiz-engine.js`:
  - `_lang` param name (antes `lang`) em `filterLabelLang` (sem mudança funcional).
  - comentário de compatibilidade em `questionLang()`.
  - fallback emoji consistente (`🌐`) no `ld-flag` quando lang é inesperado.
- `assets/js/storage.js`: comentário explicando alias `answeredUnique` (compat).

### Careful items (historical — aplicados depois em `56fc684` / `aef9cd1`)

- ~~Deduplicar `FLAGS` vs `LD_TRIGGER_SHORT`.~~
- ~~Ajustar detecção de sessão Supabase v1→v2 no `quiz-engine.js`.~~

### Comandos executados

| Comando                       | Resultado |
| ---------------------------- | --------- |
| `pnpm run format:check`       | **OK**    |
| `pnpm run check:static-links` | **OK**    |
| `pnpm run smoke:static`       | **OK**    |
| `pnpm run site:build`         | **OK**    |
| `pnpm run test:e2e`           | **OK** — 27/27 passed |
| `pnpm run validate:questions` | **OK**    |

---

## 2026-05-08 — CAREFUL auth prep (static root)

### Branch

- `chore/pre-supabase-code-cleanup`

### CAREFUL item 1 applied — FLAGS / LD_TRIGGER_SHORT

- `assets/js/quiz-engine.js`: `LD_TRIGGER_SHORT` agora aponta para `FLAGS` (fonte única; valores inalterados).

### CAREFUL item 2 applied — Supabase Auth session detection (v2-compatible)

- `assets/js/quiz-engine.js`: detecção de sessão (usada apenas quando `KANGA_ENABLE_BACKEND_SYNC` está ativo) agora reconhece:
  - cookie no padrão `sb-<project-ref>-auth-token=…` (regex; commit `aef9cd1` — antes era check amplo `sb-`)
  - chaves `localStorage` no padrão `sb-<project-ref>-auth-token`
  - mantém fallback legacy para `supabase.auth.token` / `sb-access-token` (compat), com `TODO(supabase-v2-cutover)` em `aef9cd1`

### Garantias

- **Supabase conectado:** Não
- **Network calls adicionadas:** Não (continua apenas `fetch("/api/attempts")` gated por flag, já existente)
- **Env/secrets adicionados:** Não
- **Perguntas/quiz/rotas/auth guards/storage schema:** sem mudanças

### Comandos executados (smoke + full)

| Comando                       | Resultado |
| ---------------------------- | --------- |
| `pnpm run format:check`       | **OK**    |
| `pnpm run check:static-links` | **OK**    |
| `pnpm run smoke:static`       | **OK**    |
| `pnpm run site:build`         | **OK**    |
| `pnpm run test:e2e`           | **OK** — 27/27 passed |
| `pnpm run validate:questions` | **OK**    |

---

## 2026-05-09 — Audit timeline clarification (docs only)

- `docs/architecture/pre-supabase-code-cleanup-audit.md`: secção CAREFUL com **timeline** explícita (`56fc684` → `aef9cd1`), sem parecer pendente.
- Código de produção já estava em `aef9cd1` (`chore(static): tighten supabase auth session prep`); esta entrada só alinha documentação.
