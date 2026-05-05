# KangaLearner

[![Deploy Pages](https://github.com/Matheusbaiense/kangalearner/actions/workflows/pages.yml/badge.svg)](https://github.com/Matheusbaiense/kangalearner/actions/workflows/pages.yml)
[![Build](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml/badge.svg)](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml)

**Uso interno da equipe.** Este repositório pode estar público por um período; a intenção é restringir acesso e migrar a experiência para **aplicativo** (equipe / produto fechado). Este README descreve o **código e o conteúdo**, não um manual de uso para usuário final.

---

## O que há neste repo

Protótipo e base de **prática para learner test** (Austrália): regras por estado, banco de questões (foco WA), módulo Learn, prática com filtros, simulado com feedback acumulado, UI multilíngue e progresso em `localStorage`. A experiência principal na raiz é **HTML/CSS/JS estático**; podem coexistir pacotes em `apps/*` e `packages/*` para evolução web/mobile.

---

## Stack (raiz — site estático)

| Área       | Arquivos principais                                                |
| ---------- | ------------------------------------------------------------------ |
| Página     | `index.html`                                                       |
| Estilo     | `assets/css/tokens.css`, `base.css`, `components.css`, `quiz.css`  |
| Lógica     | `assets/js/app.js`, `quiz-engine.js`, `learn-engine.js`            |
| Dados      | `assets/js/data/questions.js`, `learn-topics.js`                   |
| Validação  | `scripts/validate-questions.cjs` (`pnpm run validate:questions`)   |
| Publicação | `.github/workflows/pages.yml` (artefato: `index.html` + `assets/`) |

Fonte de verdade das questões para o estático: **`assets/js/data/questions.js`**. Sincronização opcional com core: `pnpm run gen:core-questions`.

### Correr o site estático localmente

Na raiz do repositório (com Node 18+):

```bash
npx --yes serve -l 3000 .
```

Abre `http://localhost:3000`. Rotas são por hash (`#practice`, `#resources`, etc.).

### Estrutura (raiz)

| Pasta / ficheiro              | Conteúdo                          |
| ----------------------------- | --------------------------------- |
| `index.html`                  | Shell + scripts                   |
| `assets/js/`                  | App, router, quiz, páginas, dados |
| `assets/css/`                 | Tokens, layout, quiz              |
| `assets/js/data/questions.js` | Banco de questões                 |
| `assets/js/locales.js`        | Cadeias i18n                      |
| `e2e/`                        | Testes Playwright                 |
| `manifest.json` / `sw.js`     | PWA                               |

### Novas perguntas

1. Editar `assets/js/data/questions.js` (categorias em `CATEGORIES` no mesmo ficheiro).
2. `pnpm run validate:questions`
3. `pnpm run gen:core-questions` (mantém `packages/core` alinhado).

### Novas traduções

Editar `assets/js/locales.js` e, no HTML, atributos `data-i18n` / `data-i18n-aria` onde aplicável.

### Deploy (GitHub Pages)

Push para `main` que altere ficheiros listados em `.github/workflows/pages.yml` dispara **E2E** e, em seguida, o artefacto estático (`_site`). Domínio: ver `docs/production/G17-domain-manual-steps.md`.

### Nota importante (dois produtos)

- **GitHub Pages (hoje)** publica apenas o **site estático da raiz** (`index.html` + `assets/`). O workflow é `.github/workflows/pages.yml` e roda **somente** quando `index.html`/`assets/**` mudam.
- **`apps/web` (Next.js)** é um produto separado (Supabase/Stripe/Auth) e **não** é publicado pelo Pages. Se/quando for publicado, deve ir para um host adequado (ex.: Vercel) e com variáveis de ambiente.

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

| Ficheiro                                                       | Propósito                                                             |
| -------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                         | Instruções curtas para IAs: que docs manter alinhados.                |
| [docs/MAINTENANCE-POLICY-IA.md](docs/MAINTENANCE-POLICY-IA.md) | **Padrão** checklist history / codemaps / backlog / planner / QA log. |
| [docs/QA-EXECUTION-LOG.md](docs/QA-EXECUTION-LOG.md)           | Log do que foi executado e resultados (build, lint, smoke).           |
| [docs/BACKLOG.md](docs/BACKLOG.md)                             | Itens pendentes priorizados.                                          |
| [docs/PLANNER-WEB-INFRA.md](docs/PLANNER-WEB-INFRA.md)         | Plano faseado web (CI, auth, dados, deploy).                          |
| [docs/HISTORY-INFRA-WEB.md](docs/HISTORY-INFRA-WEB.md)         | Histórico compacto INFRA-4…10.                                        |
| [docs/CODEMAPS/](docs/CODEMAPS/)                               | Mapas de código (ex.: Next + Supabase + Stripe).                      |
