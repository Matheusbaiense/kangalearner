# G1 — Auditoria Core Web Vitals

## Metas (roadmap)

| Métrica | Alvo |
|--------|------|
| LCP | &lt; 2,5 s |
| INP | &lt; 200 ms |
| CLS | &lt; 0,1 |
| Lighthouse Performance (mobile) | ≥ 85 |
| Lighthouse Performance (desktop) | ≥ 95 |

## Já aplicado no código

- `fetchpriority="high"` no logo do header; `loading="lazy"` em ícones abaixo da dobra.
- Fontes: stack **system-ui** (sem bloqueio por CDN de fontes).
- OG/social: **WebP** para imagem de partilha.

## Como validar localmente

1. Servir a raiz do repo: `npx --yes serve -l 3000 .`
2. Chrome DevTools → Lighthouse → modo **Navigation** (mobile e desktop) na URL `http://localhost:3000`.
3. Opcional CLI: `npx --yes lighthouse http://localhost:3000 --only-categories=performance --view`

## Rotas a testar

- `/` (home)
- Hash `#practice` / `#mock` após carregar o quiz (fluxo real de utilizador).

## TODO (operacional)

- Correr Lighthouse em **produção** (`https://kangalearner.com.au`) após G17 ativo e registar scores no relatório G18.
