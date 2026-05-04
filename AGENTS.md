# Instruções para agentes de IA (Cursor, etc.)

## Documentação que deve permanecer alinhada ao código

Após mudanças de **infra**, **auth**, **API**, **schema** ou **fluxos críticos**, atualizar na mesma entrega:

- `docs/HISTORY-INFRA-WEB.md`
- `docs/CODEMAPS/` (ficheiros afetados)
- `docs/BACKLOG.md`
- `docs/PLANNER-WEB-INFRA.md` (se mudar fases)
- `docs/QA-EXECUTION-LOG.md` (comandos e resultados de verificação)
- `README.md` (se mudarem comandos ou índice de docs)

**Política detalhada:** [docs/MAINTENANCE-POLICY-IA.md](docs/MAINTENANCE-POLICY-IA.md)

## Mapa rápido web

- [docs/CODEMAPS/web-next-auth-supabase.md](docs/CODEMAPS/web-next-auth-supabase.md)

## Regra local Cursor (opcional)

Se usares regras em `.cursor/rules/`, podes espelhar a política acima; o repositório ignora `.cursor/` no git — usa este `AGENTS.md` como fonte versionada.
