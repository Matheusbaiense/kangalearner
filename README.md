# KangaLearner

[![Build](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml/badge.svg)](https://github.com/Matheusbaiense/kangalearner/actions/workflows/build.yml)

**Uso interno da equipe.** Monorepo Turborepo: app Next.js (`apps/web`), pacote `@kanga/core` (questões e constantes WA).

---

## Desenvolvimento

```bash
pnpm install
pnpm dev                    # turbo — apps/web em http://localhost:3000
pnpm --filter @kanga/web run build
pnpm test                   # vitest (core + web)
pnpm test:e2e               # Playwright smoke (build antes se CI=true)
pnpm --filter @kanga/web run test:e2e:install   # 1ª vez: browser Chromium
```

Variáveis: `apps/web/.env.example` → copiar para `apps/web/.env.local`.

Questões JSON: `pnpm run gen:questions-json` (gera `apps/web/public/data/questions.json`).

---

## Documentação para agentes de IA

| Documento | Uso |
|-----------|-----|
| [AGENTS.md](AGENTS.md) | Política de docs alinhadas ao código |
| [docs/SPRINT-12-INSPECTION-FIXES.md](docs/SPRINT-12-INSPECTION-FIXES.md) | **Última inspeção geral — estado e deferidos** |
| [docs/CODEMAPS/web-next-auth-supabase.md](docs/CODEMAPS/web-next-auth-supabase.md) | Auth, Supabase, rotas API |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Backlog produto/infra |
| [.wolf/OPENWOLF.md](.wolf/OPENWOLF.md) | Protocolo OpenWolf (anatomy, cerebrum, memory) |

---

## Estrutura

| Path | Descrição |
|------|-----------|
| `apps/web/` | Next.js 15 App Router — produto principal |
| `packages/core/` | Questões, `WA_PASS_THRESHOLD`, `fisherYatesSlice`, estados AU |
| `supabase/migrations/` | Schema Postgres versionado |
| `scripts/gen-questions-json.ts` | Export JSON para a web app |

> O site estático raiz (`index.html`, Vite, GitHub Pages) foi **removido** (2026-05-22). Não usar `pnpm site:dev`.
