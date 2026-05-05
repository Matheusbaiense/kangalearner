# Quadro de tarefas — Refactor sugerido (Claude → Cursor)

Uso: priorizar o que **vale a pena** no KangaLearner **estático na raiz** + deploy **GitHub Actions** copiando `index.html` e `assets/` (sem build hoje).

**Legenda**

| Status       | Significado                                   |
| ------------ | --------------------------------------------- |
| ⏸️ Backlog   | Não iniciado; avaliar antes                   |
| 🔍 Análise   | Precisa desenho/ajuste antes de codar         |
| ✅ Aprovado  | Faz sentido; entrar no sprint                 |
| 🚫 Não agora | Alto custo/risco ou conflito com o repo atual |
| ✔️ Feito     | Já entregue (atualizar ao concluir)           |

---

## Visão rápida: o que é _realmente_ necessário?

| #   | Tarefa                             | Necessidade                               | Nota                                                                                                                                                                                                                                                                                                                                                     |
| --- | ---------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | i18n JSON + `data-i18n`            | 🚫 **Não agora** (ou fase grande isolada) | Hoje: `mode-*` + spans + `DW.t()` já funcionam; JSON+`fetch` exige ordem de scripts, `file://`, duplicar chaves com `quiz-engine` I18N, e o snippet proposto quebra **pten/esen** (`body` deve ser `mode-pt` / `mode-es`, não `mode-pten`). Só vale se o objetivo for **SEO do HTML único** + equipe aceitar reescrever **todo** o copy do `index.html`. |
| 2   | `defer` + `__KANGA_DATA__`         | ✅ **Útil, baixo risco**                  | `defer` é boa prática. Namespace único reduz poluição global; manter fallback `window.QUESTIONS` se algo externo depender.                                                                                                                                                                                                                               |
| 3   | `storage.js` versionado            | 🔍 **Bom conceito**                       | O código exemplo **não bate** com as chaves reais (`kl-answered-by-state`, `kl-lang`, `kl-state`). Precisa **migrar de `kl-*` → chaves versionadas** sem perder progresso. Não copiar cegamente.                                                                                                                                                         |
| 4   | Prettier HTML + CI format          | ✅ **Razoável**                           | `index.html` **já é multilinha**. Ainda ajuda `htmlWhitespaceSensitivity`, `format-check` em PR.                                                                                                                                                                                                                                                         |
| 5   | Cache busting (hash) no build      | ⏸️ **Só com pipeline de build no Pages**  | Hoje o workflow **não roda** `build.mjs`; seria preciso gerar `dist/` ou `_site/` com hashes e copiar isso.                                                                                                                                                                                                                                              |
| 6   | Concatenar CSS/JS                  | ⏸️ **Opcional**                           | Mesma dependência da Tarefa 5; ganho real em HTTP/2 é menor; concat quebra cache granular.                                                                                                                                                                                                                                                               |
| 7   | OG PNG + SEO                       | ✅ **Parcial**                            | **PNG 1200×630** e `og:image` estável: **sim**. `canonical`/`hreflang` com domínio fixo **só** quando o domínio final for decidido (hoje Pages = `*.github.io`).                                                                                                                                                                                         |
| 8   | Validação pré-build + VM hardening | ✅ **Recomendado**                        | Timeout no `vm` e checagens antes do build são baratos. Ajustar `prebuild` sem quebrar `turbo` na raiz.                                                                                                                                                                                                                                                  |
| 9   | Mover site para `apps/web` + Turbo | 🚫 **Não agora**                          | Conflita com **fonte de verdade na raiz**, `pages.yml`, links na comunidade e README. Só se houver decisão explícita de **monorepo-first** + Pages apontando para subpasta/artifact.                                                                                                                                                                     |
| 10  | Fontes não bloqueantes             | ✅ **Baixo esforço**                      | Preload/`onload` trick + `preconnect` gstatic; alinhado ao que já existe parcialmente.                                                                                                                                                                                                                                                                   |

**Ordem sugerida _revisada_ para este repo** (não copiar a ordem original cegamente):

1. **T8** (hardening validate)
2. **T10** (fontes)
3. **T7** (OG/SEO parcial — PNG + meta; canonical depois)
4. **T2** (defer + dados namespaced)
5. **T3** (storage versionado **com migração `kl-*`**)
6. **T4** (Prettier + opcional `format-check.yml`)
7. **T5–T6** (só após definir **build no CI** do Pages)
8. **T1** (só com spike + spec de pten/esen + uma página piloto)
9. **T9** (só com decisão de produto/arquitetura)

---

## Kanban

| Status                | Itens                                                                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✔️ Feito              | UX Practice (layout, cards, footer, Learn CTA); **T8** VM + pré-build + `prebuild`; **T10** fontes; **T7** OG PNG + `robots`; **T2** `defer` + `__KANGA_DATA__`; **T3** `KangaStorage` v2; **T4** Prettier + `format-check.yml` — ver `BACKLOG.md` |
| ✅ Aprovado (próximo) | —                                                                                                                                                                                                                                                  |
| 🔍 Análise            | —                                                                                                                                                                                                                                                  |
| ⏸️ Backlog            | T5 hash; T6 bundle                                                                                                                                                                                                                                 |
| 🚫 Não agora          | T1 i18n JSON completo; T9 mover para `apps/web`                                                                                                                                                                                                    |

---

## Checklist por tarefa (adaptado ao repo)

- [ ] **T1** — Idiomas PT/EN/ES/**PT+EN**/**ES+EN** corretos; sem regressão no quiz; sem `fetch` quebrando uso offline de arquivo
- [x] **T2** — Network: scripts `defer`; uma única fonte para `QUESTIONS`/`CATEGORIES`
- [x] **T3** — Application: dados migrados; progresso antigo preservado
- [x] **T4** — `prettier --check` verde no CI (se ativado)
- [ ] **T5–T6** — `_site` ou `dist` referencia assets com hash; Pages deploy usa esse artefato
- [x] **T7** — Validador Twitter/LinkedIn mostra imagem (PNG) — testar com URL publicada
- [x] **T8** — `validate-questions` falha rápido em JS suspeito
- [ ] **T9** — `pnpm build` na raiz inclui site **só se** estrutura for movida de propósito
- [x] **T10** — Lighthouse: fontes não bloqueiam FCP de forma crítica — validar manualmente

---

## Riscos do prompt original (para não repetir)

1. **`i18n.js` + `mode-${lang}`** — incompatível com a regra atual **displayLang** (pten → pt, esen → es).
2. **`localStorage` `kanga_lang` vs `kl-lang`** — duplicaria fonte de verdade com `DW.lang`.
3. **`prebuild` na raiz** — o `build` atual é `turbo run build`; pré-validação deve ser script explícito (`validate:questions`) ou `turbo` pipeline, não assumir `npm` hooks iguais em todos os pacotes.
4. **T9** — quebra `.github/workflows/pages.yml` e caminhos `assets/...` sem migração completa.

---

_Última atualização: 2026-05-04 — criado para acompanhamento com IA e equipe._
