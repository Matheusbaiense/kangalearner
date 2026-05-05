# G14 — Revisão de conteúdo e dados

## Estado no repositório

- Campo opcional **`lastVerified`** (ISO date) introduzido como exemplo em `VEL-01` em `assets/js/data/questions.js`. Podes replicar às restantes questões à medida que forem auditadas.
- Links oficiais em `assets/js/pages/resources-page.js` (`OFFICIAL_SOURCES`): rever manualmente cada URL com o handbook vigente do estado.

## Checklist manual (roadmap)

- [ ] Cruzar gabaritos com manuais oficiais NSW / VIC / QLD / WA (e restantes estados cobertos).
- [ ] Confirmar que imagens de sinais (se existirem) têm `alt` útil.
- [ ] Definir calendário de revisão trimestral e responsável.

## Após alterações em `questions.js`

```bash
pnpm run validate:questions
pnpm run gen:core-questions
```
