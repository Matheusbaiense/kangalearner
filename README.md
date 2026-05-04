# KangaLearner

**Uso interno da equipe.** Este repositório pode estar público por um período; a intenção é restringir acesso e migrar a experiência para **aplicativo** (equipe / produto fechado). Este README descreve o **código e o conteúdo**, não um manual de uso para usuário final.

---

## O que há neste repo

Protótipo e base de **prática para learner test** (Austrália): regras por estado, banco de questões (foco WA), módulo Learn, prática com filtros, simulado com feedback acumulado, UI multilíngue e progresso em `localStorage`. A experiência principal na raiz é **HTML/CSS/JS estático**; podem coexistir pacotes em `apps/*` e `packages/*` para evolução web/mobile.

---

## Stack (raiz — site estático)

| Área | Arquivos principais |
|------|---------------------|
| Página | `index.html` |
| Estilo | `assets/css/tokens.css`, `base.css`, `components.css`, `quiz.css` |
| Lógica | `assets/js/app.js`, `quiz-engine.js`, `learn-engine.js` |
| Dados | `assets/js/data/questions.js`, `learn-topics.js` |
| Validação | `scripts/validate-questions.cjs` (`pnpm run validate:questions`) |
| Publicação | `.github/workflows/pages.yml` (artefato: `index.html` + `assets/`) |

Fonte de verdade das questões para o estático: **`assets/js/data/questions.js`**. Sincronização opcional com core: `pnpm run gen:core-questions`.

---

## Módulos (referência rápida)

- **Learn** — tópicos em `learn-topics.js`; render em `learn-engine.js`
- **Practice** — filtros, “carregar mais”, painel de progresso
- **Mock test** — fila de questões, respostas persistidas na sessão da UI, painel final e revisão
- **Estados / idioma** — seletores no shell; conteúdo bilíngue auxiliar só no bloco pedagógico onde aplicável

---

## Conteúdo e qualidade

Edição de questões: contrato em `questions.js` (`id`, `cat`, `q` / `exp` multilíngue, `opts` com uma opção correta, `states`). Rodar validação antes de merge relevante.

Conteúdo educacional **não substitui** material oficial dos órgãos de trânsito; uso interno para construção do produto.

---

## Evolução prevista

- Repositório **privado** e distribuição via **app** (fora do escopo deste README).
- Detalhes de build, ambientes e release ficam com o processo interno da equipe quando o produto fechar.

---

## Documentação para QA e agentes de IA

| Ficheiro | Propósito |
|----------|-----------|
| [docs/QA-EXECUTION-LOG.md](docs/QA-EXECUTION-LOG.md) | Log do que foi executado e resultados (build, lint, smoke). |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Itens pendentes priorizados. |
| [docs/PLANNER-WEB-INFRA.md](docs/PLANNER-WEB-INFRA.md) | Plano faseado web (CI, auth, dados, deploy). |
| [docs/HISTORY-INFRA-WEB.md](docs/HISTORY-INFRA-WEB.md) | Histórico compacto INFRA-4…10. |
| [docs/CODEMAPS/](docs/CODEMAPS/) | Mapas de código (ex.: Next + Supabase + Stripe). |
