# QA — log de execução

| Data | Comando | Resultado |
|------|---------|-----------|
| 2026-05-23 | `vercel deploy --prod` (kangalearner-web) | OK — https://kangalearner.com.au (dpl_5q8NqFjfeqrMZjwqVpH9yNdSAn6X) |
| 2026-05-23 | Supabase MCP `apply_migration` 022 em `olgogtaeifyxwzencilo` | OK — security hardening prod |
| 2026-05-23 | `pnpm test` | OK — 27 tests (`@kanga/core` 15 + `@kanga/web` 12): + rateLimit fail-closed |
| 2026-05-23 | `pnpm --filter @kanga/web run build` | OK — pós security hardening migration 022 (code) |
| 2026-05-23 | `pnpm test:e2e` (CI=true, após build) | OK — 7 smoke Playwright (landing, practice, mock-test, auth gate, admin API) |
| 2026-05-23 | `pnpm --filter @kanga/web run build` | OK — após fixes sign/cap + migration 018 patch |
| 2026-05-23 | Supabase MCP `apply_migration` 018–021 em `olgogtaeifyxwzencilo` | OK — prod alinhado (018 patch: sem `p.state`/`created_at`; 021 DROP+recreate RPCs) |
| 2026-05-22 | `pnpm test` | OK — 7 tests (safeNextPath, attemptValidation) |
| 2026-05-22 | `pnpm --filter @kanga/web run build` | OK — Next.js 15.5.18 |
