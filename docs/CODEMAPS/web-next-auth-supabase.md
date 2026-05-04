# Codemap — `apps/web` (Next.js + Supabase + Stripe)

## Visão geral

```
apps/web/
├── middleware.ts              → reexporta ./src/middleware.ts (exigência Next: ficheiro ao lado de app/)
├── app/
│   ├── auth/
│   │   ├── layout.tsx         → import ../../src/app/auth/auth.css; wrapper .auth-route
│   │   ├── login/page.tsx     → /auth/login (client)
│   │   ├── signup/page.tsx    → /auth/signup (client)
│   │   ├── forgot-password/   → redirect server para /forgot-password
│   │   └── callback/route.ts  → OAuth/magic link; cookies na redirect response
│   ├── login/, signup/        → fluxos legados (AuthCard)
│   ├── progress/page.tsx      → placeholder; middleware protege
│   ├── dashboard/page.tsx     → painel do utilizador (server)
│   ├── practice/page.tsx      → prática por categorias (server)
│   ├── mock-test/             → setup + session/results (placeholders)
│   ├── learn/                 → hub + [slug] (placeholders)
│   ├── resources/page.tsx     → links oficiais (placeholder)
│   ├── terms/page.tsx         → placeholder legal (signup link)
│   ├── privacy/page.tsx       → idem
│   └── api/                   → REST handlers (attempts, mock-sessions, health, …)
└── src/
    ├── middleware.ts          → createServerClient; PROTECTED_ROUTES; AUTH_ROUTES
    ├── app/auth/auth.css      → estilos INFRA-9 (prefixo .auth-route)
    ├── components/
    │   ├── layout/SiteNav.tsx  → navegação global (presentational)
    │   └── Onboarding.tsx      → onboarding client (localStorage)
    └── lib/
        ├── supabase/
        │   ├── client.ts      → createBrowserClient<Database>
        │   ├── server.ts      → createServerClient<Database> + cookies()
        │   ├── admin.ts       → service role (só server)
        │   └── database.types.ts
        ├── stripe.ts
        └── migrateLocalAttempts.ts
```

## Fluxos

### Sessão no browser

1. `createClient()` em `src/lib/supabase/client.ts` para componentes `"use client"`.

### Sessão no servidor (RSC / Server Actions)

1. `await createClient()` em `src/lib/supabase/server.ts` (usa `cookies()` do Next).

### OAuth / email link

1. Browser → Supabase hosted → retorno `GET /auth/callback?code=…&next|redirect=…`
2. `route.ts` cria `NextResponse.redirect(destino)` **primeiro**, depois `createServerClient` com `setAll` a escrever cookies **nessa mesma resposta**.
3. Opcional: `supabaseAdmin` lê `profiles`; se sem `stripe_customer_id` e com `STRIPE_SECRET_KEY` + email, `createStripeCustomer` + `update` profile.

### Middleware

1. Sem `NEXT_PUBLIC_SUPABASE_*` → `NextResponse.next` (não bloqueia build local sem env).
2. Com env: `getUser()`; se path protegido e sem user → `/auth/login?redirect=<path>`.
3. Se `/login`, `/signup`, `/auth/login`, `/auth/signup` e com user → `/`.

## Layout raiz

- `app/layout.tsx`: renderiza `SiteNav` global + `Onboarding` (client). `export const viewport` com `themeColor` (Next 15+); `metadata` sem `themeColor`.

## Variáveis de ambiente (web)

| Variável | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server + admin |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server |
| `SUPABASE_SERVICE_ROLE_KEY` | `admin.ts`, callback |
| `STRIPE_SECRET_KEY` | `stripe.ts` (import dinâmico no callback se ausente evita crash em dev) |
| `NEXT_PUBLIC_APP_URL` | OAuth `redirectTo` / `emailRedirectTo` nas páginas `/auth/*` |

## Schema SQL (referência)

Migrações em `supabase/migrations/` — tabelas `public` esperadas alinhadas com `database.types.ts` (12 tabelas no desenho atual do repo).

---
*Última revisão: 2026-05-04 (higiene: viewport, legal, mobile lint, política docs).*
