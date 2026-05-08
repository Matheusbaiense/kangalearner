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
- `pnpm run site:build` → Vite (`vite.config.js`) copia assets e injeta `window.__KANGA_ENV__` a partir de `VITE_*` (incl. Supabase URL/anon key **apenas** para build local/CI com env definido; em Pages público típico sem secrets, auth real fica desativada).
- Workflow: `.github/workflows/pages.yml`

## Auth (Supabase opcional + mock)

- **Cliente lazy**: `assets/js/auth/supabase-client.js` — `window.KL_SUPABASE`, `isSupabaseConfigured()`, carrega UMD `@supabase/supabase-js` quando configurado.
- **Operações**: `assets/js/auth/auth-service.js` — `window.KL_AUTH_SERVICE` (email, Google OAuth, sign-out, reset/update password, `exchangeUrlForSession` com `code` na query).
- **Sessão unificada**: `assets/js/auth/auth-provider.js` — `window.KL_AUTH_PROVIDER`; `whenReady()` antes do router; evento `kl:supabaseSessionUpdated`.
- **Mock / guest**: `assets/js/auth/mock-auth-state.js` — `KL_AUTH_MOCK`; `route-guards.js` usa `KL_AUTH_PROVIDER || KL_AUTH_MOCK`.
- **Rotas / UI**: `assets/js/router.js`, `assets/js/pages/auth-page.js`, `assets/js/pages/account-page.js`, `assets/js/app.js`; metas em `index.html` (`kl-supabase-url`, `kl-supabase-anon-key`).

---

Última atualização: **2026-05-09**
