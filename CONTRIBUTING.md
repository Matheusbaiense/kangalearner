# Contribuir

## Fluxo

1. Branch a partir de `main`.
2. Alterações focadas; evitar refactors não pedidos no mesmo PR.
3. Antes de abrir PR:
   - `pnpm run format:check`
   - `pnpm run lint`
   - `pnpm run validate:questions` (se tocares em `assets/js/data/questions.js`)
   - `pnpm run gen:core-questions` se alteraste o JS das questões
   - `pnpm run test:e2e` (ou confiar no CI)

## Estilo

- Preferir dados **imutáveis** (sem mutar objetos partilhados in-place).
- HTML/CSS/JS: seguir o estilo existente; Prettier na raiz para `index.html`, `assets/js`, `assets/css`.

## Commits

Formato sugerido: `feat: …`, `fix: …`, `chore: …`, `docs: …` (alinhado às regras do repositório).

## Documentação

Mudanças de infra/auth/API em `apps/web`: ver `AGENTS.md` e `docs/MAINTENANCE-POLICY-IA.md`.
