# KangaLearner Migration Start

Branch created: `feat/nextjs-migration`

## What was scaffolded

- `apps/web`: Next.js + TypeScript app shell
- `apps/mobile`: Expo + React Native app shell
- `packages/core`: shared TypeScript logic package
- `turbo.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`

## Prerequisite

This machine currently does not have Node.js tooling installed (`node`, `npm`, `pnpm` were not found).

Install in this order:

1. Node.js 20 LTS
2. pnpm (`npm i -g pnpm`)

## First commands after install

```bash
pnpm install
pnpm dev
```

Run a single app:

```bash
pnpm --filter @kanga/web dev
pnpm --filter @kanga/mobile dev
```

## Next implementation step

Port current quiz data/engine from `assets/js` to `packages/core` and then render in `apps/web`.
