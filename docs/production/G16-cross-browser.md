# G16 — Responsividade e cross-browser

## Matriz de testes manual (roadmap)

| Ambiente       | Versão / notas              |
| -------------- | --------------------------- |
| Chrome desktop | Última estável              |
| Firefox        | Última estável              |
| Safari desktop | Última estável (macOS)      |
| Edge           | Última estável              |
| iOS Safari     | iPhone — larguras 390 / 414 |
| Android Chrome | Larguras típicas 360–412    |

## Larguras úteis (px)

375, 390, 414, 768, 1024, 1280, 1440, 1920

## Verificações

- Sem scroll horizontal involuntário (`overflow-x` na `.page-root`).
- Com `prefers-reduced-motion: reduce`, scroll suave desligado no `html` (ver `base.css`).
- **TODO manual:** regressão visual em Safari (flex/grid antigos) e em modo escuro do SO se aplicável.

## Automatizado

- Playwright gera capturas em 375 / 768 / 1024 / 1440 na home (`e2e/smoke.spec.js`).
