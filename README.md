# KangaLearner

[![Build](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml/badge.svg)](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml)

**Uso interno da equipe.** Este repositório pode estar público por um período; a intenção é restringir acesso e migrar a experiência para **aplicativo** (equipe / produto fechado). Este README descreve o **código e o conteúdo**, não um manual de uso para usuário final.

---

## O que há neste repo

Monorepo **Turborepo** para prática de learner test na Austrália: app Next.js em `apps/web` (Supabase, auth, mock test, progresso), pacote partilhado `@kanga/core` (questões e constantes), e legado estático na raiz (`index.html` + `assets/`) em transição.

---

## Apps/web (Next.js — produto principal)

```bash
pnpm install
pnpm --filter @kanga/web run dev
```

Variáveis: ver `apps/web/.env.example`. Build: `pnpm --filter @kanga/web run build`.

## Stack (raiz — site estático legado)

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

### Correr via Vite (dev/build para Vercel)

O repositório mantém o fluxo do Pages (copy de `index.html` + `assets/`) **e** adiciona um build Vite separado para uso com Vercel.

```bash
pnpm run site:dev
pnpm run site:build
pnpm run site:preview
```

O artefacto do Vite sai em `dist-vite/`.

#### Variáveis de ambiente (Vite)

Cria `.env.local` (não versionado) com base em `.env.example`. As variáveis do Vite expostas no browser começam por `VITE_`.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (anon key do Supabase; é pública por design)
- `VITE_CONTENT_VERSION` (ex.: `WA-v1.0`)
- `VITE_PASS_PERCENTAGE` (ex.: `80`)
- `VITE_GA_MEASUREMENT_ID` (opcional; GA4 `G-...`)
- `VITE_SENTRY_LOADER_SRC` (opcional; Loader Script do Sentry)

#### Analytics/monitorização (runtime-config, site estático)

Para o site estático da raiz (`index.html` + `assets/**`), GA4 e Sentry são configuráveis em runtime (sem hardcode no repo).

Opção A: metas no `<head>`:

```html
<meta name="kanga-ga-measurement-id" content="G-XXXXXXXXXX" />
<meta name="kanga-sentry-loader-src" content="https://js.sentry-cdn.com/<PUBLIC_KEY>.min.js" />
```

Opção B: globals (antes de `assets/js/analytics.js` e `assets/js/error-monitoring.js`):

```html
<script>
  window.KANGA_GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  window.KANGA_SENTRY_LOADER_SRC = "https://js.sentry-cdn.com/<PUBLIC_KEY>.min.js";
</script>
```

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
