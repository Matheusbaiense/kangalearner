# Cursor Prompt — Sprint 8: P2/P3 UX + Arquitetura

> Gerado por Claude em 2026-05-22 (baseado em relatório multi-agente Cursor + inspeção Sprint 7).
> Execute as tasks em sequência por prioridade.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task e corrija qualquer erro.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`, `supabase/migrations/`
- TypeScript strict. Sem `any` novo. Sem `console.log` novo.
- `@kanga/core` = `packages/core/src/index.ts`
- Root layout: `apps/web/app/layout.tsx` — actualmente inclui SiteNav + Onboarding + Footer para TODAS as páginas
- Auth layout: `apps/web/app/auth/layout.tsx` — wrapper fino que não suprime o root layout

---

## TASK 42 — Refactor: Auth pages sem SiteNav/Onboarding/Footer (P2 ALTO)

**Problema:** O root layout (`apps/web/app/layout.tsx`) aplica `<SiteNav>`, `<Onboarding>` e `<Footer>`
a **todas** as rotas, incluindo as páginas `/auth/*`. Resultado: o formulário de login/signup compete
visualmente com a nav de marketing — dupla identidade de marca, confusão de UX.

**Solução:** Route group `(main)` com o layout marketing; root layout fica mínimo.

### Passo 1 — Simplificar root layout (`apps/web/app/layout.tsx`)

Remover `SiteNav`, `Onboarding`, `Footer` do root layout. Ficar apenas com:

```tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Nunito, Sora } from "next/font/google";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--kl-font-body",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--kl-font-heading",
  display: "swap"
});

export const viewport: Viewport = { themeColor: "#071A2C" };

export const metadata: Metadata = {
  title: "KangaLearner — Australia Learner Test Practice",
  description: "Study Australian road rules by state. Practice learner test questions, take mock tests and track your progress.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png",    type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png",type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png",type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "KangaLearner — Australia Learner Test Practice",
    description: "Study Australian road rules by state, practice unlimited questions and track your progress.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${sora.variable}`} suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
```

### Passo 2 — Criar `apps/web/app/(main)/layout.tsx` (layout de marketing)

```tsx
import { Suspense } from "react";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { Onboarding } from "@/components/Onboarding";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<header style={{ height: 60 }} aria-hidden="true" />}>
        <SiteNav />
      </Suspense>
      <Onboarding />
      {children}
      <Footer />
    </>
  );
}
```

### Passo 3 — Mover páginas para `(main)/`

Criar o directório `apps/web/app/(main)/` e mover os seguintes directorios para dentro:
- `app/page.tsx`               → `app/(main)/page.tsx`
- `app/dashboard/`             → `app/(main)/dashboard/`
- `app/practice/`              → `app/(main)/practice/`
- `app/mock-test/`             → `app/(main)/mock-test/`
- `app/progress/`              → `app/(main)/progress/`
- `app/account/`               → `app/(main)/account/`
- `app/admin/`                 → `app/(main)/admin/`
- `app/learn/`                 → `app/(main)/learn/`
- `app/resources/`             → `app/(main)/resources/`

**Manter no lugar (não mover):**
- `app/auth/` — fica em `app/auth/`; já tem `app/auth/layout.tsx` próprio
- `app/api/` — rotas de API, não têm layout
- `app/globals.css` — importado pelo root layout
- `app/layout.tsx` — root layout já modificado

**Atenção:** Route groups com parênteses não alteram a URL pública.
`app/(main)/dashboard/` continua a ser acessível em `/dashboard`.

### Passo 4 — Verificar imports em `globals.css`

O root layout importa `./globals.css`. Verificar que o caminho continua correcto
após os moves (não mudar o `globals.css`, apenas garantir que o import é
`"./globals.css"` relativo a `app/layout.tsx`). ✓ Não deve mudar.

### Verificação

```bash
# Build completo
pnpm --filter @kanga/web run build

# Verificar que /auth/login NÃO tem SiteNav no DOM
# (verificar em browser — nav marketing não deve aparecer no login)

# TypeScript
pnpm --filter @kanga/web exec tsc --noEmit
```

### Commit

```
refactor(layout): move SiteNav/Onboarding/Footer to (main) route group

- Root layout is now minimal: html + body + fonts + LangProvider
- New (main)/layout.tsx wraps all marketing/app pages with SiteNav + Footer + Onboarding
- Auth pages at /auth/* no longer inherit nav/footer chrome from root
- Route group (main) does not change any public URLs
```

---

## TASK 43 — Fix: Login não mostra erros OAuth do callback (P2 ALTO)

**Problema:** Quando o OAuth Google falha (utilizador cancela, conta sem permissão, etc.),
o callback redireciona para `/auth/login?error=oauthcancelled` ou `?error=access_denied`.
A `LoginForm` lê `searchParams` só para `redirect` — o parâmetro `error` é ignorado.
O utilizador vê a página de login sem qualquer mensagem de erro. Falha silenciosa.

### Fix — `apps/web/app/auth/login/page.tsx`

Localizar `LoginForm` (componente interno com `useSearchParams`).

Adicionar leitura do parâmetro `error` antes do `return`:

```typescript
// Após: const redirect = safeNextPath(...)
const oauthErrorParam = searchParams.get("error");
const oauthErrorMsg = oauthErrorParam
  ? oauthErrorParam === "oauthcancelled"
    ? "Google sign-in was cancelled. Please try again."
    : `Sign-in failed: ${oauthErrorParam.replace(/_/g, " ")}.`
  : null;
```

No JSX, mostrar o erro logo abaixo do botão Google (antes do divider):

```tsx
{/* OAuth error from callback */}
{oauthErrorMsg && (
  <div className="auth-error" role="alert">
    {oauthErrorMsg}
  </div>
)}
```

**Atenção:** `oauthErrorMsg` deve ser mostrado **mesmo** quando `error` do estado local
(`useState`) for `null`. Usar `oauthErrorMsg || error` se quiser uma única zona de erro,
ou mostrar os dois separadamente. Preferir mensagem única para não confundir o utilizador.

Simplificar para uma única `errorMessage`:

```typescript
const effectiveError = error ?? oauthErrorMsg;
// Substituir todas as referências a `error` no JSX por `effectiveError`
```

### Commit

```
fix(auth): display OAuth callback errors in login form (P2)

- Read ?error= searchParam from OAuth callback redirect
- Humanise known codes (oauthcancelled, access_denied)
- Merge with local error state; single error display zone
- Silent OAuth failures now surface a visible message
```

---

## TASK 44 — Fix: Seletor de estado oculto em mobile (<960px) (P2 MÉDIO)

**Problema:** `globals.css` linha ~2091:
```css
@media (max-width: 960px) {
  .state-control { display: none; }
}
```
Em tablets e telemóveis (maioria do público-alvo: imigrantes com smartphones),
o utilizador não consegue mudar o estado australiano na navbar.

**Fix:** Expor o seletor de estado numa localização acessível em mobile.
Abordagem mínima: mover o seletor de estado para o body/dropdown hamburger.
Abordagem simples: manter na nav mas torná-lo visível abaixo de 960px, dentro do menu hamburger existente (se existir) ou como drawer.

### Verificar se existe menu hamburger

```bash
grep -rn "hamburger\|mobile-menu\|nav-mobile\|nav-drawer" apps/web/src/components/layout/SiteNav.tsx
```

**Se existir menu mobile:** adicionar o `StateSelector` dentro do menu mobile.
Localizar onde o menu hamburger renderiza os links de navegação e adicionar:
```tsx
<div className="mobile-nav-state">
  <StateSelector />  {/* componente já existente em SiteNav */}
</div>
```

**Se NÃO existir menu mobile:** abordagem alternativa — tornar o seletor visível
na nav como ícone compacto (<960px). No CSS:

```css
/* REMOVER a linha que oculta o seletor */
/* @media (max-width: 960px) { .state-control { display: none; } } */

/* SUBSTITUIR por versão compacta */
@media (max-width: 960px) {
  .state-control .state-label {
    display: none; /* esconder label texto, mostrar só código */
  }
  .state-control {
    min-width: unset;
    padding: 0.25rem 0.5rem;
  }
}
```

Escolher a abordagem adequada com base no que existir em `SiteNav.tsx`.

### Commit

```
fix(nav): expose state selector on mobile — was hidden below 960px (P2)
```

---

## TASK 45 — Fix: Tema dark mode — implementar CSS vars ou remover controlo (P2 MÉDIO)

**Problema:** `apps/web/app/account/page.tsx` tem controlo light/dark/system que chama
`document.documentElement.setAttribute("data-theme", ...)`, mas `globals.css` não tem
nenhuma regra `[data-theme="dark"]`. O selector muda o atributo mas não altera nenhum estilo
— efeito visual zero. Controlo enganoso.

**Opção A (recomendada): implementar dark mode básico**

Adicionar no final de `apps/web/app/globals.css` um bloco de overrides:

```css
/* ── Dark mode (data-theme="dark") ───────────────────────────────── */
[data-theme="dark"] {
  --kl-color-bg:          #0f172a;
  --kl-color-surface:     #1e293b;
  --kl-color-surface-alt: #273348;
  --kl-color-text:        #f1f5f9;
  --kl-color-text-muted:  #94a3b8;
  --kl-color-border:      #334155;
  --kl-color-nav-bg:      rgba(15, 23, 42, 0.95);
  color-scheme: dark;
}

/* Prefers-color-scheme respeitado para system */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --kl-color-bg:          #0f172a;
    --kl-color-surface:     #1e293b;
    --kl-color-surface-alt: #273348;
    --kl-color-text:        #f1f5f9;
    --kl-color-text-muted:  #94a3b8;
    --kl-color-border:      #334155;
    --kl-color-nav-bg:      rgba(15, 23, 42, 0.95);
    color-scheme: dark;
  }
}
```

**Atenção:** verificar quais CSS custom properties existem em `:root` em `globals.css`
(as que usam `--kl-color-*`, `--color-*`, etc.) e mapear corretamente.
Ajustar os valores conforme o palette navy existente.

**Opção B (fallback se A for demasiado invasivo):** remover o controlo de tema da UI até
que o dark mode seja implementado a fundo. Na `account/page.tsx`, remover a secção
`settings-theme-row` e comentar o `applyTheme`.

**Escolher A se** os tokens CSS em `globals.css` estiverem bem definidos.
**Escolher B se** o CSS for monolítico com cores hardcoded em vez de variáveis.

### Commit

```
feat(account): implement dark mode CSS vars for theme toggle (P2)
```
ou
```
fix(account): remove non-functional theme toggle (no dark CSS) (P2)
```

---

## TASK 46 — Fix: Guest prompt do mock-test em inglês fixo (i18n) (P2 MÉDIO)

**Problema:** O componente guest-prompt em `/mock-test` (que mostra antes do teste para
utilizadores não autenticados) tem texto hardcoded em inglês — quebra a experiência i18n
para utilizadores em pt/es.

### Passo 1 — Localizar o componente

```bash
grep -rn "Continue without saving\|Sign in to save\|guest\|GuestPrompt\|mock.*guest" \
  apps/web/app/mock-test/ --include="*.tsx"
```

Identificar o ficheiro exacto (provavelmente `apps/web/app/mock-test/page.tsx` ou
`apps/web/src/components/GuestPrompt.tsx`).

### Passo 2 — Adicionar chaves a `apps/web/src/lib/i18n.ts`

Localizar o bloco `en` (e os blocos `pt`, `es`) e adicionar:

```typescript
// No bloco `en`:
mockGuestTitle: "Try a Mock Test",
mockGuestSub: "Practice 30 questions in exam conditions.",
mockGuestContinue: "Continue without saving",
mockGuestSignIn: "Sign in to save results",
mockGuestBannerTitle: "Want to track your progress?",
mockGuestBannerBody: "Create a free account to save results and see your improvement over time.",
mockGuestBannerCta: "Sign up free",

// No bloco `pt`:
mockGuestTitle: "Faça um Simulado",
mockGuestSub: "Pratique 30 perguntas em condições de exame.",
mockGuestContinue: "Continuar sem salvar",
mockGuestSignIn: "Entrar para salvar resultados",
mockGuestBannerTitle: "Quer acompanhar seu progresso?",
mockGuestBannerBody: "Crie uma conta gratuita para salvar resultados e ver sua evolução ao longo do tempo.",
mockGuestBannerCta: "Criar conta grátis",

// No bloco `es`:
mockGuestTitle: "Prueba un Simulacro",
mockGuestSub: "Practica 30 preguntas en condiciones de examen.",
mockGuestContinue: "Continuar sin guardar",
mockGuestSignIn: "Iniciar sesión para guardar",
mockGuestBannerTitle: "¿Quieres seguir tu progreso?",
mockGuestBannerBody: "Crea una cuenta gratuita para guardar resultados y ver tu evolución.",
mockGuestBannerCta: "Crear cuenta gratis",
```

### Passo 3 — Actualizar o componente

Substituir as strings hardcoded pelas chaves de i18n:
```tsx
import { useLang } from "@/contexts/LangContext";
const { s } = useLang();

// Substituir:
// "Continue without saving" → {s.mockGuestContinue}
// "Sign in to save results" → {s.mockGuestSignIn}
// etc.
```

### Commit

```
feat(i18n): add mock-test guest prompt translations (pt/es/en) (P2)

- Add mockGuestTitle, mockGuestSub, mockGuestContinue, mockGuestSignIn,
  mockGuestBannerTitle, mockGuestBannerBody, mockGuestBannerCta to i18n.ts
- Update GuestPrompt / mock-test page to use s.* keys
- Guest flow now works in Portuguese and Spanish
```

---

## TASK 47 — Refactor: Centralizar AU_STATES em @kanga/core (P3)

**Problema:** `AU_STATE_OPTIONS` e `AuStateCode` estão definidos em
`apps/web/app/dashboard/state-options.ts` e duplicados/inline em outros ficheiros
(`SiteNav.tsx`, `DashboardClient.tsx`, `LandingClient.tsx`, `account/page.tsx`,
`api/attempts/route.ts`, `api/mock-sessions/route.ts`, `api/attempts/bulk/route.ts`).
Múltiplas fontes de verdade — risco de divergência.

### Passo 1 — Adicionar a `packages/core/src/index.ts`

Localizar o fim do ficheiro e adicionar:

```typescript
// ── Australian States ──────────────────────────────────────────────
export const AU_STATE_OPTIONS = [
  { code: "WA",  name: "Western Australia" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "SA",  name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT",  name: "Northern Territory" },
] as const;

export type AuStateCode = typeof AU_STATE_OPTIONS[number]["code"];

const _VALID_STATE_CODES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));

export function normalizeAuState(value: string | null | undefined): AuStateCode | null {
  if (value && _VALID_STATE_CODES.has(value)) return value as AuStateCode;
  return null;
}
```

### Passo 2 — Actualizar `apps/web/app/dashboard/state-options.ts`

Tornar o ficheiro um re-export de `@kanga/core` para não quebrar imports existentes:

```typescript
// Backwards-compat re-export — prefer importing from @kanga/core directly
export { AU_STATE_OPTIONS, AuStateCode, normalizeAuState } from "@kanga/core";
```

### Passo 3 — Actualizar imports directos

Nos ficheiros que importam de `apps/web/app/dashboard/state-options.ts`:

```typescript
// ANTES
import { AU_STATE_OPTIONS, AuStateCode } from "../../dashboard/state-options";

// DEPOIS
import { AU_STATE_OPTIONS, AuStateCode } from "@kanga/core";
```

Ficheiros a atualizar (pesquisar com grep):
```bash
grep -rn "state-options" apps/web/ --include="*.ts" --include="*.tsx"
```

### Passo 4 — Remover inline definitions

Nos ficheiros que definem o array de estados inline (SiteNav, LandingClient, etc.),
substituir pela import de `@kanga/core`:

```bash
grep -rn "AU_STATES\|AuState\|SupportedState\|\{ code.*WA.*name.*Western" \
  apps/web/app/ apps/web/src/ --include="*.ts" --include="*.tsx"
```

Para cada ocorrência, substituir pelo import de `@kanga/core`.

### Commit

```
refactor(core): centralize AU_STATE_OPTIONS + AuStateCode in @kanga/core (P3)

- AU_STATE_OPTIONS, AuStateCode, normalizeAuState exported from packages/core
- state-options.ts becomes a backwards-compat re-export
- All direct imports updated to @kanga/core
- Single source of truth for Australian state data
```

---

## TASK 48 — Cleanup P1/P3: auth/callback + createSupabaseServerClient + CSP (P1/P3)

Três fixes pequenos agrupados.

### 48.1 — `auth/callback/route.ts`: country hardcoded → SUPPORTED_COUNTRY

```bash
grep -n "country.*AU\|country: \"AU\"" apps/web/app/auth/callback/route.ts
```

Localizar a linha (provavelmente no upsert do profile):
```typescript
// ANTES
country: "AU",

// DEPOIS
import { SUPPORTED_COUNTRY } from "@kanga/core";
// ...
country: SUPPORTED_COUNTRY,
```

### 48.2 — `dashboard/page.tsx`: createSupabaseServerClient deprecated

Verificar a linha actual:
```bash
grep -n "createSupabaseServerClient\|createClient\|createServerClient" \
  apps/web/app/dashboard/page.tsx
```

Se usar `createSupabaseServerClient` de `../../src/lib/supabase/server`:

```typescript
// ANTES
import { createSupabaseServerClient } from "../../src/lib/supabase/server";
const supabase = await createSupabaseServerClient();

// DEPOIS — verificar se createServerClient está disponível no mesmo módulo
// ou se a função foi renomeada. Manter a chamada que funciona, documentar deprecação.
// Se o módulo exporta ambos, usar createServerClient.
// Se só existe createSupabaseServerClient, deixar como está e marcar TODO.
```

**Atenção:** verificar `apps/web/src/lib/supabase/server.ts` — se `createSupabaseServerClient`
está lá e funciona, pode ser um alias e não uma deprecação real. Só mudar se houver um
substituto documentado.

### 48.3 — CSP: restringir `img-src`

`apps/web/next.config.ts` linha actual:
```typescript
"img-src 'self' data: https: blob:",
```

Substituir pelo conjunto mínimo de origens necessárias:
```typescript
"img-src 'self' data: blob: " +
  "https://olgogtaeifyxwzencilo.supabase.co " +  // avatars Supabase Storage
  "https://lh3.googleusercontent.com " +           // Google OAuth avatars
  "https://avatars.githubusercontent.com " +         // GitHub OAuth avatars (futuro)
  "https://www.google.com " +                         // Google reCAPTCHA (se usado)
  ";",
```

**Atenção:** Verificar que não existem mais origens de imagem em uso
(por ex., CDN de imagens, Unsplash, etc.) antes de restringir.
Usar a consola do browser em dev para confirmar que não há CSP violations.

### Commit

```
fix(security/cleanup): auth callback SUPPORTED_COUNTRY + CSP img-src restrict + dashboard client (P1/P3)

- auth/callback: replace country: "AU" with SUPPORTED_COUNTRY from @kanga/core
- dashboard: document/fix deprecated createSupabaseServerClient usage
- next.config.ts: tighten img-src from https: wildcard to specific allowed origins
```

---

## CHECKLIST SPRINT 8

```bash
# T42: Auth pages sem SiteNav (verificar em browser)
# Não há forma de verificar via grep — confirmar visualmente em /auth/login
# Build deve passar sem erros:
pnpm --filter @kanga/web run build

# T43: Login mostra erro OAuth
grep -n "oauthErrorParam\|oauthErrorMsg\|effectiveError" apps/web/app/auth/login/page.tsx

# T44: State selector visível em mobile
grep -n "state-control.*display.*none\|display.*none.*state-control" apps/web/app/globals.css

# T45: Dark mode CSS existe
grep -n "data-theme.*dark\|data-theme=\"dark\"" apps/web/app/globals.css

# T46: i18n keys existem
grep -n "mockGuestContinue\|mockGuestBannerCta" apps/web/src/lib/i18n.ts

# T47: AU_STATES em @kanga/core
grep -n "AU_STATE_OPTIONS" packages/core/src/index.ts
# Sem imports directos de state-options em api routes:
grep -rn "state-options" apps/web/app/api/

# T48: Sem "AU" hardcoded em callback
grep -n 'country.*"AU"' apps/web/app/auth/callback/route.ts
# img-src restringido
grep -n "img-src" apps/web/next.config.ts

# TypeScript limpo
pnpm --filter @kanga/web exec tsc --noEmit

# Build
pnpm --filter @kanga/web run build

# Push
git push origin main
```

---

## Notas para Sprint 9 (Marketing SEO)

Após Sprint 8, executar o plano de marketing de `.claude/plan/kangalearner-marketing-content.md`:

- **M1 (Semana 1):** SEO técnico — `sitemap.ts`, `robots.ts`, `layout.tsx` metadata expandida,
  JSON-LD structured data, `generateMetadata` nas páginas `/learn/[slug]`
- **M2 (Semana 1-2):** Landing page — hero copy melhorado, HowItWorks reformulado,
  trust badges, newsletter form integrado com Resend ESP
- **M3 (Semana 2-3):** Conteúdo `/learn` e `/resources` — guias por tópico, FAQ, glossário
- **M4 (Semana 3-4):** Email marketing — sequência onboarding via Resend
- **M5 (ongoing):** Distribuição — Facebook groups Perth, WhatsApp communities, Google Business

**Bloqueadores legais antes de lançamento público:**
- `/terms` e `/privacy` são placeholders — precisam de conteúdo real antes de promover o site
