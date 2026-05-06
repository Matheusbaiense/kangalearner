# Lucide iconography (production web)

**Updated:** 2026-05-07

## Decision

- The **static site root** uses custom stroke SVGs (Lucide-like) without the `lucide` package; that remains fine for GitHub Pages / Vite baseline.
- The **Next.js app** under `apps/web` (Vercel production target) standardises UI icons with **`lucide-react`**.
- Central registry: `apps/web/src/components/icons.tsx`.
- Card/badge wrapper: `apps/web/src/components/ui/IconBadge.tsx`.
- Quiz **category** row icons in the web app use `apps/web/src/lib/categoryLucideIcon.ts` (display only; core `CATEGORIES[].icon` emojis are unchanged).

## Package

- `lucide-react` in `apps/web/package.json` (not `lucide` at repo root).
