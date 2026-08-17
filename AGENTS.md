# Instrucoes para agentes de IA (Claude, Cursor, Codex, etc.)

## Padrao de documentacao (fonte unica de verdade)

Todos os agentes (Cursor, Claude, Codex) e o dono do projeto leem o mesmo "cerebro".
Apos QUALQUER mudanca, atualizar o documento certo para cada tipo de informacao:

| Tipo de informacao | Documento canonico |
|---|---|
| Decisao / plano | [docs/MOBILE-APP-ROADMAP.md](docs/MOBILE-APP-ROADMAP.md) (mobile) · [docs/PRODUCTION-REMEDIATION-PLAN.md](docs/PRODUCTION-REMEDIATION-PLAN.md) (prontidão produção / mega auditoria 2026-08-17) |
| Arquitetura / codigo | [docs/CODEMAPS/mobile-expo-app.md](docs/CODEMAPS/mobile-expo-app.md) (mobile) · [docs/CODEMAPS/web-next-auth-supabase.md](docs/CODEMAPS/web-next-auth-supabase.md) (web) |
| Estado atual | [apps/mobile/STATUS.md](apps/mobile/STATUS.md) |
| Pendencias / bloqueios | [docs/BACKLOG.md](docs/BACKLOG.md) |
| Comandos / testes / QA | [docs/QA-EXECUTION-LOG.md](docs/QA-EXECUTION-LOG.md) |
| Instrucao para agentes | [AGENTS.md](AGENTS.md) (este arquivo) |
| Memoria do projeto | [.wolf/cerebrum.md](.wolf/cerebrum.md) (aprendizados) · [.wolf/memory.md](.wolf/memory.md) (log de acoes) |

Regras:
- Nao duplicar conteudo entre documentos; cada tipo de informacao tem UM dono.
- Documentar limitacoes/pendencias reais; nunca marcar como pronto algo que depende de conta/credencial externa ainda nao feita.
- Bugs corrigidos vao para [.wolf/buglog.json](.wolf/buglog.json) (ver OpenWolf).

## Leitura inicial (sessao nova)

1. [.wolf/OPENWOLF.md](.wolf/OPENWOLF.md) + [.wolf/cerebrum.md](.wolf/cerebrum.md) + [.wolf/anatomy.md](.wolf/anatomy.md)
2. **[docs/SPRINT-12-INSPECTION-FIXES.md](docs/SPRINT-12-INSPECTION-FIXES.md)** - ultima inspecao geral, migrations 018-020, deferidos
3. **[docs/MOBILE-APP-ROADMAP.md](docs/MOBILE-APP-ROADMAP.md)** - plano 0-100 Android/iPhone, splits, store readiness, QA mobile
4. **[docs/PRODUCTION-REMEDIATION-PLAN.md](docs/PRODUCTION-REMEDIATION-PLAN.md)** - plano de correção da mega auditoria (fases 0–10)
5. **[docs/QA-FASE0-VERIFY.md](docs/QA-FASE0-VERIFY.md)** - ledger para conferir o trampo Fase 0 (Chrome/dashboards); não marcar aceite sem evidência

## Documentacao alinhada ao codigo

Apos mudancas de **infra**, **auth**, **API**, **schema**, **mobile** ou fluxos criticos:

- [docs/HISTORY-INFRA-WEB.md](docs/HISTORY-INFRA-WEB.md)
- [docs/CODEMAPS/](docs/CODEMAPS/) (ficheiros afetados)
- [docs/BACKLOG.md](docs/BACKLOG.md)
- [docs/QA-EXECUTION-LOG.md](docs/QA-EXECUTION-LOG.md)
- [README.md](README.md) (se mudarem comandos)

## Mapa rapido web

- [docs/CODEMAPS/web-next-auth-supabase.md](docs/CODEMAPS/web-next-auth-supabase.md)

## Mapa rapido mobile

- [docs/CODEMAPS/mobile-expo-app.md](docs/CODEMAPS/mobile-expo-app.md)
- [apps/mobile/STATUS.md](apps/mobile/STATUS.md)

## Verificacao

```bash
pnpm test                                # vitest core + web + mobile (via turbo)
pnpm test:e2e                            # smoke Playwright (build antes em CI)
pnpm --filter @kanga/web run build
pnpm --filter @kanga/mobile run lint
pnpm --filter @kanga/mobile run doctor
pnpm --filter @kanga/mobile run test     # vitest mobile (sync-logic + questions)
```

