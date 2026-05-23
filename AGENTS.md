# Instruções para agentes de IA (Cursor, etc.)

## Leitura inicial (sessão nova)

1. [.wolf/OPENWOLF.md](.wolf/OPENWOLF.md) + [.wolf/cerebrum.md](.wolf/cerebrum.md) + [.wolf/anatomy.md](.wolf/anatomy.md)
2. **[docs/SPRINT-12-INSPECTION-FIXES.md](docs/SPRINT-12-INSPECTION-FIXES.md)** — última inspeção geral, migrations 018–020, deferidos

## Documentação alinhada ao código

Após mudanças de **infra**, **auth**, **API**, **schema** ou fluxos críticos:

- [docs/HISTORY-INFRA-WEB.md](docs/HISTORY-INFRA-WEB.md)
- [docs/CODEMAPS/](docs/CODEMAPS/) (ficheiros afetados)
- [docs/BACKLOG.md](docs/BACKLOG.md)
- [docs/QA-EXECUTION-LOG.md](docs/QA-EXECUTION-LOG.md)
- [README.md](README.md) (se mudarem comandos)

## Mapa rápido web

- [docs/CODEMAPS/web-next-auth-supabase.md](docs/CODEMAPS/web-next-auth-supabase.md)

## Verificação

```bash
pnpm test
pnpm test:e2e   # smoke Playwright (build antes em CI)
pnpm --filter @kanga/web run build
```
