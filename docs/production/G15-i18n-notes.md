# G15 — Internacionalização avançada

## Implementado

- `<html lang>` alinhado ao idioma guardado em `localStorage` / `KangaStorage` no primeiro paint (`assets/js/app.js`), espelhando a lógica de `pt-BR` / `es` / `en` usada no quiz.
- `sitemap.xml` com entradas `xhtml:link` `hreflang` para EN, PT-BR, ES e `x-default` (mesmo URL — SPA com seletor de idioma).

## TODO contínuo

- Auditar strings hardcoded em `index.html` que devam migrar para `locales.js` / `data-i18n`.
- Garantir que mensagens de erro de formulários e estados de carregamento estão nas três línguas.
