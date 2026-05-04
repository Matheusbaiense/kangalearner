# CODEMAP — site estático (raiz)

Mapa rápido do site **HTML/CSS/JS estático** na raiz do repo (GitHub Pages).

## Entrypoints

- `index.html`
- CSS: `assets/css/tokens.css`, `assets/css/base.css`, `assets/css/components.css`, `assets/css/quiz.css`
- JS: `assets/js/app.js`, `assets/js/quiz-engine.js`, `assets/js/learn-engine.js`
- Dados: `assets/js/data/questions.js`, `assets/js/data/learn-topics.js`

## Layout / UI shell

- **Header + navegação**: `index.html` (`.site-header`, `.main-nav`)
- **Seletores**: estado e idioma (`#state-select`, language dropdown)
- **Progresso de leitura**: `#reading-progress` (barra fixa no topo)

## Estilo (tokens e convenções)

- Tokens globais ficam em `assets/css/tokens.css`
  - Cores semânticas: `--green*` (sucesso/feedback), `--gold` (accent/UI)
  - Tipografia: `--font-sans`, `--font-display`, `--font-heading`
  - Raios: `--radius-*`

## Conteúdo / dados

- Fonte de verdade do estático: `assets/js/data/questions.js`
- Guardrail: `pnpm run validate:questions`
- Sync opcional para `@kanga/core`: `pnpm run gen:core-questions` → `packages/core/src/data/questions.ts`

## Build / publicação (Pages)

- `pnpm run legacy:build` → gera `dist/`
- Workflow: `.github/workflows/pages.yml`

---

Última atualização: **2026-05-04**

