# Política de manutenção de documentação (IA + equipa)

**Padrão obrigatório** após alterações que afetem infra, auth, dados, rotas, CI ou contratos de API: atualizar os artefactos abaixo na **mesma entrega** (mesmo PR / mesmo commit lógico), para sessões futuras de IA e developers não perderem contexto.

## Checklist por entrega

| Artefacto                                           | Quando atualizar                                               | Conteúdo típico                              |
| --------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `docs/HISTORY-INFRA-WEB.md` (ou secção equivalente) | Qualquer INFRA, migração DB, mudança de auth/deploy            | Linha na tabela: ID, tema, ficheiros tocados |
| `docs/CODEMAPS/*.md`                                | Novos módulos, rotas, ou fluxos (Supabase, Stripe, middleware) | Árvore de paths, fluxos, env vars            |
| `docs/BACKLOG.md`                                   | Fechar itens feitos; acrescentar novos gaps                    | P0/P1/P2 + QA manual se aplicável            |
| `docs/PLANNER-WEB-INFRA.md` (ou planner do domínio) | Mudança de fase ou prioridades                                 | Ajustar fases e “estado atual”               |
| `docs/QA-EXECUTION-LOG.md`                          | Após correr build/lint/testes relevantes                       | Comando, resultado, data, notas              |
| `README.md`                                         | Novos comandos, links críticos, ou secção de docs              | Tabela “Documentação para QA e IA”           |

## O que não fazer

- Deixar só o chat como única memória de uma mudança estrutural.
- Duplicar romances longos: preferir bullets e links para ficheiros.

## Cursor / regras

A regra do projeto `.cursor/rules/docs-maintenance.mdc` reforça este checklist para o agente no IDE.
