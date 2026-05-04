# Log de execução QA — KangaLearner (web + monorepo)

Registo orientado a humanos e a agentes de IA para reproduzir verificações e entender o que passou / falhou.

## 2026-05-04 — QA pós-INFRA (sessão Cursor)

### Comandos executados

| Comando | Resultado |
|---------|-----------|
| `pnpm run build` (raiz: `prebuild` + `turbo run build`) | **OK** — `validate-questions`, `gen:core-questions`, `@kanga/core` tsc, `@kanga/web` next build, `@kanga/mobile` echo build |
| `pnpm run lint` (raiz: `turbo run lint`) | **Falhou** na primeira sessão — `@kanga/mobile` com `expo lint`. *Corrigido depois:* ver secção “Entrega higiene” abaixo. |
| `pnpm run lint` em `apps/web` apenas | **OK** — antes: 1 warning em `PracticeClient`; *corrigido* na entrega higiene. |

### Avisos (histórico — primeira sessão)

- ~~`themeColor` / `exhaustive-deps`~~ — resolvidos na entrega 2026-05-04 (pós-QA); ver secção seguinte.

### Smoke HTTP (dev server `pnpm dev` em `apps/web`)

| URL | Esperado | Observado |
|-----|------------|-----------|
| `GET /auth/login` | 200 | 200 |
| `GET /auth/signup` | 200 | 200 |
| `GET /progress` sem cookie de sessão | Redirect para login com `redirect` | **307** → `/auth/login?redirect=%2Fprogress` |

### Itens não automatizados nesta sessão

- Confirmação de email Supabase, OAuth Google end-to-end, Stripe Customer no dashboard, contagem exata de tabelas no projeto remoto — exigem credenciais e projeto Supabase/Stripe configurados (ver `docs/PLANNER-WEB-INFRA.md` e `docs/BACKLOG.md`).

### Próxima execução sugerida

1. `pnpm run build`
2. `pnpm run lint` (raiz — mobile usa `tsc --noEmit`).
3. Manual: fluxos em `docs/BACKLOG.md` secção “QA manual”.

---

## 2026-05-04 — Entrega higiene (viewport, hooks, mobile lint, legal, política docs)

| Comando | Resultado |
|---------|-----------|
| `pnpm run lint` (raiz) | **OK** — mobile `tsc --noEmit`; web **sem** avisos ESLint. |
| `pnpm run build` (raiz) | **OK** — sem avisos `themeColor` no Next build. |

**Alterações:** ver `docs/HISTORY-INFRA-WEB.md` linha “Entrega 2026-05-04 (pós-QA)”.

---

## 2026-05-04 — Refresh UI (site estático)

| Comando | Resultado |
|---------|-----------|
| `pnpm run format:check` | **OK** — `index.html`, `assets/css/**/*.css`, `assets/js/**/*.js` |
| `pnpm run validate:questions` | **OK** — 69 questões / 10 categorias |
| `pnpm run gen:core-questions` | **OK** — gerou `packages/core/src/data/questions.ts` |
| `pnpm run legacy:build` | **OK** — gerou `dist/` |
| `pnpm run build` | **OK** — monorepo (`@kanga/web` Next build) |
| `pnpm run lint` | **OK** — web sem warnings; mobile `tsc --noEmit` |

**Alterações:** ver `docs/HISTORY-STATIC-SITE.md` + `docs/CODEMAPS/static-site.md`.
