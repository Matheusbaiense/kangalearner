# Contribuir

## Fluxo

1. Branch a partir de `main`.
2. Alterações focadas; evitar refactors não pedidos no mesmo PR.
3. Antes de abrir PR:
   - `pnpm run format:check`
   - `pnpm --filter @kanga/web run lint`
   - `pnpm test`
   - `pnpm test:e2e` (após `pnpm --filter @kanga/web run build`; 1ª vez: `pnpm --filter @kanga/web run test:e2e:install`)
   - `pnpm --filter @kanga/web run build`

## Questões

- Fonte: `packages/core/src/data/questions.ts`
- Sincronizar JSON: `pnpm run gen:questions-json`

## Estilo

- Dados imutáveis (sem mutar objetos partilhados in-place).
- TypeScript/React: seguir padrões em `apps/web`.

## Commits

Formato: `feat: …`, `fix: …`, `chore: …`, `docs: …`

## Documentação (obrigatório após mudanças de infra/auth/API)

Ver [AGENTS.md](AGENTS.md) e [docs/SPRINT-12-INSPECTION-FIXES.md](docs/SPRINT-12-INSPECTION-FIXES.md).
