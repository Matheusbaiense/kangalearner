# Codemap — `apps/web` (Next.js + Supabase + Stripe)

## Visão geral

```
apps/web/
├── middleware.ts              → reexporta ./src/middleware.ts (exigência Next: ficheiro ao lado de app/)
├── instrumentation*.ts        → Sentry client/server/edge instrumentation (inert until DSN env vars exist)
├── sentry.*.config.ts         → Sentry server/edge SDK init
├── app/
│   ├── auth/
│   │   ├── layout.tsx         → import ../../src/app/auth/auth.css; wrapper .auth-route
│   │   ├── login/page.tsx     → /auth/login (client)
│   │   ├── signup/page.tsx    → /auth/signup (client)
│   │   ├── forgot-password/   → redirect server para /forgot-password
│   │   └── callback/route.ts  → OAuth/magic link; cookies na redirect response
│   ├── login/, signup/        → fluxos legados (AuthCard)
│   ├── error.tsx              → boundary de rota (Sentry + Try again)
│   ├── progress/page.tsx      → redirect 307 para /dashboard (stats na cloud)
│   ├── dashboard/page.tsx     → painel do utilizador (server)
│   ├── practice/page.tsx      → prática; honra ?mode= e ?cat= / ?category=
│   ├── mock-test/             → setup + session/results (placeholders)
│   ├── learn/                 → hub + [slug] (placeholders)
│   ├── resources/page.tsx     → hub de jornada WA: teoria, horas, HPT, PDA, recursos oficiais, comunidade e visão de ecossistema
│   ├── terms/page.tsx         → placeholder legal (signup link)
│   ├── privacy/page.tsx       → idem
│   └── api/                   → REST handlers (attempts, mock-sessions, health, …)
└── src/
    ├── middleware.ts          → createServerClient; PROTECTED_ROUTES; AUTH_ROUTES; `x-request-id`
    ├── app/auth/auth.css      → estilos INFRA-9 (prefixo .auth-route)
    ├── components/
    │   ├── layout/SiteNav.tsx  → navegação global; drawer mobile inclui links, auth, idioma e estado
    │   └── Onboarding.tsx      → onboarding client (localStorage)
    └── lib/
        ├── supabase/
        │   ├── client.ts      → createBrowserClient<Database> + cookie adapter
        │   ├── server.ts      → createServerClient<Database> + cookies()
        │   ├── authCookieOptions.ts → SameSite=Lax, Secure em prod, httpOnly false
        │   ├── admin.ts       → service role (só server)
        │   └── database.types.ts
        ├── stripe.ts
        ├── log.ts             → JSON logger (`info`/`warn`/`error`); `mask()`; redacts password/token/Authorization/rawBody
        ├── requestId.ts       → UUID `x-request-id` (reusa header válido ou mint)
        ├── auth/passwordReauth.ts → step-up: `signInWithPassword` com a senha atual
        ├── auth/deleteAccount.ts  → delete só depois do reauth
        ├── auth/adminMfa.ts       → admin/super_admin precisam de aal2; free/premium não
        └── migrateLocalAttempts.ts
```

## Fluxos

### Sessão no browser

1. `createClient()` em `src/lib/supabase/client.ts` para componentes `"use client"`.
2. Storage é **cookie**, não localStorage: o middleware roda o refresh no servidor e grava tokens no cookie jar. Se o browser lesse localStorage, o refresh token rodado no cookie invalidaria a cópia e `onAuthStateChange` disparava `SIGNED_OUT`.
3. Por isso `httpOnly` fica **false** — `document.cookie` tem de ler os mesmos tokens. XSS pode ler a sessão; a mitigação é CSP `script-src` nonce, não HttpOnly.
4. Flags: `SameSite=Lax`, `path=/`, `Secure` quando `NODE_ENV=production` (`authCookieOptions`). `style-src` nonce continua deferido (Sprint 12).

### Rate-limit IP

`getClientIp` (`src/lib/requestClientIp.ts`) usa `x-real-ip` e o primeiro hop de `x-forwarded-for`. Na Vercel esses headers vêm do edge, não do browser. Sem mudança enquanto o app ficar só na Vercel.

### Sessão no servidor (RSC / Server Actions)

1. `await createClient()` em `src/lib/supabase/server.ts` (usa `cookies()` do Next).

### OAuth / email link

1. Browser → Supabase hosted → retorno `GET /auth/callback?code=…&next|redirect=…`
2. `route.ts` cria `NextResponse.redirect(destino)` **primeiro**, depois `createServerClient` com `setAll` a escrever cookies **nessa mesma resposta**.
3. Opcional: `supabaseAdmin` lê `profiles`; se sem `stripe_customer_id` e com `STRIPE_SECRET_KEY` + email, `createStripeCustomer` + `update` profile.
4. Novos utilizadores (`!profile.stripe_customer_id` em memória): fire-and-forget `sendWelcomeEmail` via Resend (`src/lib/resend.ts`, `src/lib/emails/welcome.ts`); grava `profiles.welcome_sent_at`.

### Middleware

1. Sem `NEXT_PUBLIC_SUPABASE_*` → `NextResponse.next` (não bloqueia build local sem env).
2. Com env: `getUser()`; se path protegido e sem user → `/auth/login?redirect=<path>`.
3. Se `/login`, `/signup`, `/auth/login`, `/auth/signup` e com user → `/`.
4. Toda resposta (páginas + `/api/*` no matcher) leva `x-request-id` (UUID). Header incoming só é reutilizado se for UUID canónico.
5. Matcher **exclui** `api/webhook` e `api/webhooks` — o handler Stripe mint o próprio id e **não** loga o raw body.

`/api/health` = liveness (plaintext). `/api/ping` = readiness (DB probe + `CRON_SECRET`).

### Conta (step-up)

- `DELETE /api/account/delete` body `{ password }`; `PATCH /api/account/password` body `{ currentPassword, newPassword }`.
- Reauth: `signInWithPassword` com o email da sessão. Falha ou senha ausente → 403 `reauth_required`. Rate limit 5/min em ambos.
- Contas só-OAuth (sem senha): criar senha em `/auth/forgot-password` primeiro. Não logar password.

### Admin MFA

- `requireAdminPage` / `assertAdminRole`: se role admin/super_admin e `aal !== aal2` → redirect `/auth/mfa` (página) ou 403 (API). `free`/`premium` não são gated.
- `/auth/mfa` **não** está em `AUTH_ROUTES` (senão o middleware mandava o admin autenticado para a home).
- Ligar TOTP em Authentication → MFA no dashboard Supabase; sem isso o enroll falha.

## Layout raiz

- `app/layout.tsx`: renderiza `SiteNav` global + `Onboarding` (client). `export const viewport` com `themeColor` (Next 15+); `metadata` sem `themeColor`.
- `src/components/layout/SiteNav.tsx`: header desktop mantem seletor de estado/idioma; em mobile (`<=640px`) esses controles saem do header e entram no drawer para evitar overflow horizontal. O drawer tem botao interno de fechar porque o backdrop fica acima do header.
- `SiteNav` defere o trabalho async de `onAuthStateChange` com `setTimeout(0)` para evitar deadlock do GoTrue auth lock. Depois de confirmar sessao, chama `src/lib/syncGuestProgress.ts`, que migra `SK.answered` via `/api/attempts/bulk` e `SK.saved` via `/api/saved-questions/bulk`, limpando cada cache local somente apos sucesso da respectiva API.

## Variáveis de ambiente (web)

| Variável                        | Uso                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Client + server + admin                                                                                          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server                                                                                                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | `admin.ts`, callback                                                                                             |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser-side Stripe publishable key, when billing UI is enabled                                             |
| `STRIPE_SECRET_KEY`             | `stripe.ts` (import dinâmico no callback se ausente evita crash em dev)                                          |
| `STRIPE_WEBHOOK_SECRET`         | `/api/webhook/stripe` signature verification                                                                     |
| `NEXT_PUBLIC_APP_URL`           | OAuth `redirectTo` / `emailRedirectTo` nas páginas `/auth/*`; links em templates email                           |
| `RESEND_API_KEY`                | `src/lib/resend.ts` — transacional (welcome, newsletter confirm); `FROM_ADDRESS` = `noreply@kangalearner.com.au` |
| `UPSTASH_REDIS_REST_URL`        | Production rate-limit Redis REST endpoint; missing prod config makes limited endpoints fail closed               |
| `UPSTASH_REDIS_REST_TOKEN`      | Production rate-limit Redis REST token                                                                           |
| `CRON_SECRET`                   | `/api/ping` authorization guard for scheduled/cron checks                                                        |
| `SENTRY_DSN`                    | Server/edge Sentry DSN; runtime capture starts when set                                                          |
| `NEXT_PUBLIC_SENTRY_DSN`        | Browser Sentry DSN                                                                                               |
| `SENTRY_TRACES_SAMPLE_RATE`     | Optional server/edge tracing sample rate (default in code: `0.1`)                                                |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Optional browser tracing sample rate (default in code: `0.1`)                                            |
| `SENTRY_AUTH_TOKEN`             | Optional source-map upload auth token; keep secret                                                               |
| `SENTRY_ORG`                    | Optional source-map upload org slug                                                                              |
| `SENTRY_PROJECT`                | Optional source-map upload project slug                                                                          |

Sentry runtime capture is intentionally inert until DSN env vars are configured. Source-map upload is enabled only when `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` are all present.

## Schema SQL (referência)

Migrações em `supabase/migrations/` (001–034). 031 relock `user_category_stats` SELECT-only + guard no RPC; 032 protege colunas sensíveis de `profiles`; 033 revoga grants client no marketplace scaffold; 034 hygiene (profiles SELECT unificado, saved_questions granular, initplan `auth.uid()`, search_path). Aplicar staging antes de prod. **031–034 ainda não aplicadas.**

`CATEGORIES` vive em `packages/core/src/data/categories.ts` (barrel `@kanga/core`). O client web carrega questões via `public/data/questions.json`, não pelo array `QUESTIONS` do core.

Envelope de API (`src/lib/api/envelope.ts`): `{ ok: true, data? }` / `{ ok: false, error: { code } }` nas rotas de app. Fora: `/api/health` (plaintext), `/api/ping` (cron), `/api/webhook/stripe` (contrato Stripe).

`/blog` é Server Component: passa `BlogPostCard[]` (`src/lib/blogIndex.ts`). O client da listagem não importa `blogPosts.ts` (corpos ficam no server / na página `[slug]`).

---

_Última revisão: 2026-08-17 (blog RSC 3.3 + envelope 4.3 completo nas rotas de app)._
