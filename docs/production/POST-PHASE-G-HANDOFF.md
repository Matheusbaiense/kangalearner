# Handoff: Pós–Phase G — verificação, limpeza, push

> Gerado em 2026-05-06. Convenções: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), testes antes de merge, Prettier na raiz estática.

## Estado do repositório

- Branch `main` com Phase F + Phase G (commits G17→G18) sincronizado com `origin` após push.
- CI: `build.yml` (lint + E2E + turbo build) e `pages.yml` (E2E + artefacto estático).

## O que foi verificado (automatizado)

| Verificação             | Quando                                |
| ----------------------- | ------------------------------------- |
| `pnpm run test:e2e`     | Duas execuções seguidas — 4/4 OK cada |
| `pnpm run format:check` | OK                                    |

## Browser QA (skill browser-qa)

**Smoke automatizado:** Playwright local (`e2e/smoke.spec.js`). **Pós-deploy** (preview/produção), correr manualmente ou com MCP de browser:

1. Fase 1: URL alvo, consola sem erros críticos, rede sem 4xx/5xx, screenshots 375 + desktop, CWV se Lighthouse disponível.
2. Fase 2: navegação `#home` → `#practice` → `#resources`, formulários subscribe/contact (estados esperados).
3. Fase 3: regressão visual nos breakpoints já cobertos por Playwright.
4. Fase 4: axe ou Lighthouse Accessibility em páginas-chave.

## Limpeza (.gitignore)

- `.wolf/` ignorado (estado local OpenWolf).
- `test-results/`, `playwright-report/` já ignorados.

## Próximos passos operacionais (manual)

- G17: domínio + HTTPS (`docs/production/G17-domain-manual-steps.md`).
- G9/G8: GA4 + Sentry (`TODO` em `analytics.js`, `error-monitoring.js`).
- G18: itens ⚠️ em `docs/production/G18-LAUNCH-REPORT.md`.

## Nota multi-plan / modelos externos

Chamadas paralelas Codex/Gemini (`codeagent-wrapper`) e MCP `ace-tool` **não foram executadas** neste ambiente Cursor. Para um `/multi-plan` completo com dual-model, usa o harness Claude Code descrito no teu comando slash.
