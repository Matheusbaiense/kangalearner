# Log de execução QA — KangaLearner (web + monorepo)

Registo orientado a humanos e a agentes de IA para reproduzir verificações e entender o que passou / falhou.

## 2026-05-04 — QA pós-INFRA (sessão Cursor)

### Comandos executados

| Comando | Resultado |
|---------|-----------|
| `pnpm run build` (raiz: `prebuild` + `turbo run build`) | **OK** — `validate-questions`, `gen:core-questions`, `@kanga/core` tsc, `@kanga/web` next build, `@kanga/mobile` echo build |
| `pnpm run lint` (raiz: `turbo run lint`) | **Falhou** — `@kanga/mobile`: `expo lint` tentou instalar ESLint e terminou com `ERR_PNPM_UNEXPECTED_STORE` (loja pnpm diferente da usada no `node_modules`). **Não bloqueia** alterações em `apps/web`. |
| `pnpm run lint` em `apps/web` apenas | **OK (exit 0)** — 1 *warning* ESLint pré-existente |

### Avisos conhecidos (Next / ESLint)

- `PracticeClient.tsx`: `react-hooks/exhaustive-deps` em `useCallback` (linha ~316) — backlog para corrigir ou documentar exceção.
- Vários avisos Next: `themeColor` em `metadata` deve migrar para `export const viewport` — backlog UX/SEO.

### Smoke HTTP (dev server `pnpm dev` em `apps/web`)

| URL | Esperado | Observado |
|-----|------------|-----------|
| `GET /auth/login` | 200 | 200 |
| `GET /auth/signup` | 200 | 200 |
| `GET /progress` sem cookie de sessão | Redirect para login com `redirect` | **307** → `/auth/login?redirect=%2Fprogress` |

### Itens não automatizados nesta sessão

- Confirmação de email Supabase, OAuth Google end-to-end, Stripe Customer no dashboard, contagem exata de tabelas no projeto remoto — exigem credenciais e projeto Supabase/Stripe configurados (ver `docs/PLANNER-WEB-INFRA.md` e `docs/BACKLOG.md`).

### Próxima execução sugerida

1. `pnpm install` (se `pnpm lint` na raiz falhar por store, alinhar `pnpm config get store-dir` com o usado no clone).
2. `pnpm run build`
3. `pnpm --filter @kanga/web run lint` (ou corrigir `apps/mobile` para não auto-instalar no lint).
4. Manual: fluxos em `docs/BACKLOG.md` secção “QA manual”.
