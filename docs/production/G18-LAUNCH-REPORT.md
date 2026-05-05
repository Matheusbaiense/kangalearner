# G18 — Relatório final de lançamento

Data do relatório: **2026-05-06** (código no branch `main` após Phase G).

| Item (roadmap G18)                                                  | Estado                                                                                                                            |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Fases G1–G17 implementadas no repositório (código, workflows, docs) | ✅ concluído                                                                                                                      |
| Lighthouse: Performance ≥ 85 mobile, ≥ 95 desktop                   | ⚠️ requer ação manual — correr em produção após domínio (ver `docs/production/G1-core-web-vitals.md`)                             |
| Lighthouse: Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95       | ⚠️ requer ação manual                                                                                                             |
| securityheaders.com grau A                                          | ⚠️ requer ação manual — `_headers` não é aplicado pelo GitHub Pages puro; usar Cloudflare Pages/Netlify ou proxy (ver `_headers`) |
| Todos os testes Playwright a passar                                 | ✅ concluído (local + CI em `build.yml` e `pages.yml`)                                                                            |
| Google Analytics a registar eventos                                 | ⚠️ requer ação manual — colar snippet GA4 e Measurement ID (ver `assets/js/analytics.js`)                                         |
| Sentry (ou equivalente) ativo                                       | ⚠️ requer ação manual — ver `assets/js/error-monitoring.js`                                                                       |
| Sitemap submetido ao Google Search Console                          | ⚠️ requer ação manual — após G17                                                                                                  |
| Domínio personalizado + HTTPS                                       | ⚠️ requer ação manual — ver `docs/production/G17-domain-manual-steps.md`                                                          |
| PWA instalável (manifest + SW)                                      | ✅ concluído (validar em dispositivo real)                                                                                        |
| OG image correta (partilhas)                                        | ✅ concluído — `og-image.webp` + URLs absolutas em `index.html`                                                                   |
| Nenhum link partido (ferramenta externa)                            | ⚠️ requer ação manual — ex.: broken-link-checker nas URLs oficiais                                                                |
| README com instruções de uso                                        | ✅ concluído                                                                                                                      |
| Tag git `v1.0.0`                                                    | ⚠️ requer ação manual — `git tag v1.0.0 && git push origin v1.0.0` quando aprovado                                                |

## Resumo

O código e a pipeline estão preparados para produção no **site estático**; itens de **métricas**, **monitorização**, **domínio/DNS**, **Search Console** e **tag de release** dependem de passos operacionais fora do repositório.
