# Cursor Prompt — Sprint 3: i18n Auth · Sim State Filter · Progress Cross-Device · Stripe Webhook

> **Executor:** Cursor Agent  
> **Permissões:** Leitura, escrita, commit, push — tudo autorizado.  
> **Após todas as tasks:** `git push origin main`

---

## Contexto obrigatório antes de executar

1. Este monorepo usa **Turborepo**. O app Next.js está em `apps/web/`. Imports `@/` → `apps/web/src/`.
2. O sistema de i18n usa o mapa `t` em `apps/web/src/lib/i18n.ts`. Cada chave deve existir em `en`, `pt` e `es`. O hook `useLang()` de `@/contexts/LangContext` expõe `s` (o mapa de strings para o lang atual) e `uiLang`.
3. O `supabaseAdmin` em `@/lib/supabase/admin` usa service_role key — **nunca usar em Client Components**, somente em Route Handlers.
4. ESLint do projeto barra `react/no-unescaped-entities`: qualquer apóstrofo literal em JSX text deve ser `&apos;`.
5. **Commit e push**: depois de cada task fazer `git add <arquivos exatos>` + `git commit -m "tipo(escopo): mensagem"`. Após todas as 4 tasks, `git push origin main`.

---

## Task 17 (S8) — i18n: traduzir páginas de auth para PT e ES

### Problema
Os 4 arquivos de auth (`login/page.tsx`, `signup/page.tsx`, `auth/forgot-password/page.tsx`, `auth/reset-password/page.tsx`) têm todo o texto hardcoded em inglês. Usuários que selecionam PT ou ES veem inglês nas páginas mais críticas do fluxo.

### Arquivos alvo
```
apps/web/src/lib/i18n.ts                         ← adicionar novas chaves (en + pt + es)
apps/web/app/auth/login/page.tsx                 ← wiring useLang() + s.xxx
apps/web/app/auth/signup/page.tsx                ← wiring useLang() + s.xxx
apps/web/app/auth/forgot-password/page.tsx       ← wiring useLang() + s.xxx
apps/web/app/auth/reset-password/page.tsx        ← wiring useLang() + s.xxx
```

### Passo 1 — Adicionar strings a `apps/web/src/lib/i18n.ts`

Inserir as seguintes chaves **nos três objetos** (`en`, `pt`, `es`) dentro do mapa `t`, na seção `// ── Auth ──`. As chaves já existentes (`emailLabel`, `passwordLabel`, `forgotPassword`, `continueWithGoogle`) **não mexer**.

#### Chaves novas — valores por idioma:

| Chave | EN | PT | ES |
|---|---|---|---|
| `authWelcomeBack` | `"Welcome back"` | `"Boas-vindas"` | `"Bienvenido de nuevo"` |
| `authSignInSub` | `"Sign in to access your progress, insights and mock test history."` | `"Entre para acessar seu progresso, insights e histórico de simulados."` | `"Inicia sesión para acceder a tu progreso, estadísticas e historial de simulacros."` |
| `authSigningIn` | `"Signing in…"` | `"Entrando…"` | `"Iniciando sesión…"` |
| `authNoAccount` | `"Don't have an account?"` | `"Não tem uma conta?"` | `"¿No tienes cuenta?"` |
| `authCreateOne` | `"Create one"` | `"Crie uma"` | `"Créala"` |
| `authTagline` | `"Official road rules · Up to date · Trusted by learner drivers Australia-wide"` | `"Regras oficiais de trânsito · Sempre atualizado · Confiado por motoristas na Austrália"` | `"Reglas viales oficiales · Actualizado · Confiado por conductores en Australia"` |
| `authServiceUnavailable` | `"Authentication service unavailable. Please refresh the page or try again later."` | `"Serviço de autenticação indisponível. Atualize a página ou tente mais tarde."` | `"Servicio de autenticación no disponible. Actualiza la página o inténtalo más tarde."` |
| `authCreateAccount` | `"Create your account"` | `"Crie sua conta"` | `"Crea tu cuenta"` |
| `authCreateAccountSub` | `"Save your progress, track insights and access your full mock test history."` | `"Salve seu progresso, acompanhe insights e acesse seu histórico completo de simulados."` | `"Guarda tu progreso, sigue tus estadísticas y accede a tu historial completo de simulacros."` |
| `authYourName` | `"Your name"` | `"Seu nome"` | `"Tu nombre"` |
| `authAtLeast8` | `"At least 8 characters"` | `"Mínimo 8 caracteres"` | `"Al menos 8 caracteres"` |
| `authCreatingAccount` | `"Creating account…"` | `"Criando conta…"` | `"Creando cuenta…"` |
| `authCreateAccountBtn` | `"Create account"` | `"Criar conta"` | `"Crear cuenta"` |
| `authCheckYourEmail` | `"Check your email"` | `"Verifique seu e-mail"` | `"Revisa tu correo"` |
| `authEmailConfirmSentPrefix` | `"We sent a confirmation link to"` | `"Enviamos um link de confirmação para"` | `"Enviamos un enlace de confirmación a"` |
| `authEmailConfirmAction` | `"Click the link to activate your account."` | `"Clique no link para ativar sua conta."` | `"Haz clic en el enlace para activar tu cuenta."` |
| `authAgreeTermsPrefix` | `"By creating an account, you agree to our"` | `"Ao criar uma conta, você concorda com nossos"` | `"Al crear una cuenta, aceptas nuestros"` |
| `authAlreadyHaveAccount` | `"Already have an account?"` | `"Já tem uma conta?"` | `"¿Ya tienes cuenta?"` |
| `authResetPassword` | `"Reset your password"` | `"Redefinir sua senha"` | `"Restablecer tu contraseña"` |
| `authResetSub` | `"Enter your email and we'll send you a reset link."` | `"Digite seu e-mail e enviaremos um link de redefinição."` | `"Ingresa tu correo y te enviaremos un enlace de restablecimiento."` |
| `authSending` | `"Sending…"` | `"Enviando…"` | `"Enviando…"` |
| `authSendResetLink` | `"Send reset link"` | `"Enviar link de redefinição"` | `"Enviar enlace de restablecimiento"` |
| `authRememberedIt` | `"Remembered it?"` | `"Lembrou?"` | `"¿Lo recordaste?"` |
| `authResetEmailSentPrefix` | `"We sent a password reset link to"` | `"Enviamos um link de redefinição de senha para"` | `"Enviamos un enlace de restablecimiento a"` |
| `authResetEmailSentSuffix` | `"Follow the link to choose a new password."` | `"Siga o link para escolher uma nova senha."` | `"Sigue el enlace para elegir una nueva contraseña."` |
| `authChooseNewPassword` | `"Choose a new password"` | `"Escolha uma nova senha"` | `"Elige una nueva contraseña"` |
| `authChooseNewPasswordSub` | `"Enter a new password for your account."` | `"Digite uma nova senha para sua conta."` | `"Ingresa una nueva contraseña para tu cuenta."` |
| `authWaitingResetSession` | `"Waiting for reset session… If this persists, open the email link again."` | `"Aguardando sessão de redefinição… Se persistir, abra o link do e-mail novamente."` | `"Esperando sesión de restablecimiento… Si persiste, abre el enlace del correo nuevamente."` |
| `authNewPasswordLabel` | `"New password"` | `"Nova senha"` | `"Nueva contraseña"` |
| `authConfirmPasswordLabel` | `"Confirm password"` | `"Confirmar senha"` | `"Confirmar contraseña"` |
| `authRepeatYourPassword` | `"Repeat your password"` | `"Repita sua senha"` | `"Repite tu contraseña"` |
| `authUpdating` | `"Updating…"` | `"Atualizando…"` | `"Actualizando…"` |
| `authUpdatePassword` | `"Update password"` | `"Atualizar senha"` | `"Actualizar contraseña"` |
| `authPasswordsDoNotMatch` | `"Passwords do not match."` | `"As senhas não coincidem."` | `"Las contraseñas no coinciden."` |
| `authPasswordUpdated` | `"Password updated"` | `"Senha atualizada"` | `"Contraseña actualizada"` |
| `authPasswordUpdatedSub` | `"Your password has been updated successfully."` | `"Sua senha foi atualizada com sucesso."` | `"Tu contraseña se ha actualizado correctamente."` |
| `authBackToSignIn` | `"← Back to sign in"` | `"← Voltar para entrar"` | `"← Volver al inicio de sesión"` |
| `authSignInArrow` | `"Sign in →"` | `"Entrar →"` | `"Ingresar →"` |

**Atenção TypeScript:** o objeto `t` usa `as const satisfies Record<UiLang, Record<string, string>>`. Ao adicionar as chaves, manter a mesma estrutura e garantir que `en`, `pt` e `es` tenham **exatamente as mesmas chaves** (ou o TypeScript vai reclamar por tipo incompleto). Verificar com `pnpm --filter @kanga/web tsc --noEmit` após editar.

### Passo 2 — Wiring em `apps/web/app/auth/login/page.tsx`

**Adicionar imports** (já existem `useRouter`, `useSearchParams`; adicionar `useLang`):
```tsx
import { useLang } from "@/contexts/LangContext";
```

**Dentro de `LoginForm()`**, após as declarações de estado existentes:
```tsx
const { s } = useLang();
```

**Substituir textos hardcoded** (lista completa):

| Texto atual (hardcoded) | Substituir por |
|---|---|
| `"Welcome back"` (h1) | `{s.authWelcomeBack}` |
| `"Sign in to access your progress..."` (p) | `{s.authSignInSub}` |
| `"Authentication service unavailable..."` (div auth-error) | `{s.authServiceUnavailable}` |
| `"Continue with Google"` (button) | `{s.continueWithGoogle}` |
| `"Email"` (label) | `{s.emailLabel}` |
| `"Password"` (label span) | `{s.passwordLabel}` |
| `"Forgot password?"` (Link) | `{s.forgotPassword}` |
| `{loading ? "Signing in…" : "Sign in"}` (submit btn) | `{loading ? s.authSigningIn : s.signIn}` |
| `"Don't have an account?"` — **ATENÇÃO**: atualmente é `Don&apos;t have an account?` | `{s.authNoAccount}` |
| `"Create one"` (Link) | `{s.authCreateOne}` |
| `"Official road rules · Up to date · Trusted by learner drivers Australia-wide"` (p.auth-tagline) | `{s.authTagline}` |

### Passo 3 — Wiring em `apps/web/app/auth/signup/page.tsx`

**Adicionar import:**
```tsx
import { useLang } from "@/contexts/LangContext";
```

**Dentro de `SignupForm()`**, após declarações de estado:
```tsx
const { s } = useLang();
```

**Substituir textos no success screen:**

| Texto atual | Substituir por |
|---|---|
| `"Check your email"` (h2) | `{s.authCheckYourEmail}` |
| `"We sent a confirmation link to"` (antes do email em negrito) | `{s.authEmailConfirmSentPrefix}` |
| `"Click the link to activate your account."` (p) | `{s.authEmailConfirmAction}` |
| tagline no success screen | `{s.authTagline}` |
| `"← Back to sign in"` (Link no success) | `{s.authBackToSignIn}` |

**Substituir textos no form principal:**

| Texto atual | Substituir por |
|---|---|
| `"Create your account"` (h1) | `{s.authCreateAccount}` |
| `"Save your progress, track insights..."` (p.auth-sub) | `{s.authCreateAccountSub}` |
| `"Continue with Google"` (button) | `{s.continueWithGoogle}` |
| `"Full name"` (label) | `{s.accountFullName}` |
| `"Your name"` (placeholder) | `{s.authYourName}` |
| `"Email"` (label) | `{s.emailLabel}` |
| `"Password"` (label) — a de signup | `{s.passwordLabel}` |
| `"At least 8 characters"` (placeholder) | `{s.authAtLeast8}` |
| `{loading ? "Creating account…" : "Create account"}` | `{loading ? s.authCreatingAccount : s.authCreateAccountBtn}` |
| `"By creating an account, you agree to our"` (p.auth-legal-note) | `{s.authAgreeTermsPrefix}{" "}` |
| `"Already have an account?"` (p.auth-footer-note) | `{s.authAlreadyHaveAccount}{" "}` |
| `"Sign in"` (Link no footer) | `{s.signIn}` |
| tagline | `{s.authTagline}` |

**Atenção:** `"Terms"` e `"Privacy Policy"` são nomes próprios de documentos — podem ficar em inglês (links internos). Apenas o texto ao redor precisa de i18n.

### Passo 4 — Wiring em `apps/web/app/auth/forgot-password/page.tsx`

**Adicionar import:**
```tsx
import { useLang } from "@/contexts/LangContext";
```

**Dentro de `ForgotPasswordPage()`**, após declarações de estado:
```tsx
const { s } = useLang();
```

**Substituir:**

| Texto atual | Substituir por |
|---|---|
| `"Check your email"` (h2 no sent screen) | `{s.authCheckYourEmail}` |
| `"We sent a password reset link to"` | `{s.authResetEmailSentPrefix}` |
| `"Follow the link to choose a new password."` | `{s.authResetEmailSentSuffix}` |
| `"← Back to sign in"` (Link no sent screen) | `{s.authBackToSignIn}` |
| tagline no sent screen | `{s.authTagline}` |
| `"Reset your password"` (h1) | `{s.authResetPassword}` |
| `"Enter your email and we'll send you a reset link."` — **ATENÇÃO**: está como `we&apos;ll` | `{s.authResetSub}` |
| `"Email"` (label) | `{s.emailLabel}` |
| `{loading ? "Sending…" : "Send reset link"}` | `{loading ? s.authSending : s.authSendResetLink}` |
| `"Remembered it?"` | `{s.authRememberedIt}` |
| `"Sign in"` (Link) | `{s.signIn}` |
| tagline | `{s.authTagline}` |

### Passo 5 — Wiring em `apps/web/app/auth/reset-password/page.tsx`

**Adicionar import:**
```tsx
import { useLang } from "@/contexts/LangContext";
```

**Dentro de `ResetPasswordPage()`**, após declarações de estado:
```tsx
const { s } = useLang();
```

**Lógica de erro "Passwords do not match":** atualmente hardcoded no handler:
```tsx
setError("Passwords do not match.");
```
Alterar para:
```tsx
setError(s.authPasswordsDoNotMatch);
```
**Atenção:** `s` deve ser acessível no escopo de `handleUpdate`. Como `s` vem de `useLang()` chamado no nível do componente, isso funciona normalmente.

**Substituir textos no success screen (done === true):**

| Texto atual | Substituir por |
|---|---|
| `"Password updated"` (h2) | `{s.authPasswordUpdated}` |
| `"Your password has been updated successfully."` (p) | `{s.authPasswordUpdatedSub}` |
| `"Sign in →"` (Link no footer do success) | `{s.authSignInArrow}` |
| tagline | `{s.authTagline}` |

**Substituir no form principal:**

| Texto atual | Substituir por |
|---|---|
| `"Choose a new password"` (h1) | `{s.authChooseNewPassword}` |
| `"Enter a new password for your account."` (p.auth-sub) | `{s.authChooseNewPasswordSub}` |
| `"Waiting for reset session…..."` (p laranja) | `{s.authWaitingResetSession}` |
| `"New password"` (label) | `{s.authNewPasswordLabel}` |
| `"At least 8 characters"` (placeholder) | `{s.authAtLeast8}` |
| `"Confirm password"` (label) | `{s.authConfirmPasswordLabel}` |
| `"Repeat your password"` (placeholder) | `{s.authRepeatYourPassword}` |
| `{loading ? "Updating…" : "Update password"}` | `{loading ? s.authUpdating : s.authUpdatePassword}` |
| `"← Back to sign in"` (Link) | `{s.authBackToSignIn}` |
| tagline | `{s.authTagline}` |

### Verificação
```bash
pnpm --filter @kanga/web tsc --noEmit
```
Deve passar sem erros de tipo. Se `s.authXxx` não for reconhecido, provavelmente faltou a chave em algum dos 3 idiomas de i18n.ts.

### Commit Task 17
```bash
git add apps/web/src/lib/i18n.ts \
        apps/web/app/auth/login/page.tsx \
        apps/web/app/auth/signup/page.tsx \
        apps/web/app/auth/forgot-password/page.tsx \
        apps/web/app/auth/reset-password/page.tsx
git commit -m "feat(i18n): traduzir páginas de auth para PT e ES (S8)

- i18n.ts: +37 novas chaves de auth em en/pt/es
- auth/login: wiring useLang() — todos os textos via s.xxx
- auth/signup: wiring useLang() — form + success screen
- auth/forgot-password: wiring useLang() — form + sent screen
- auth/reset-password: wiring useLang() — form + success screen"
```

---

## Task 18 (S11) — PracticeClient: state filter em sim + mode field em mock-sessions

### Problema A — Sim mode ignora o estado selecionado

**Arquivo:** `apps/web/app/practice/PracticeClient.tsx`

**Linha atual (~366):**
```tsx
const shuffled = [...QS].sort(() => Math.random() - 0.5).slice(0, 30);
```

Este código está dentro do `useEffect` que dispara quando `mode === "sim"`. Ele seleciona aleatoriamente 30 questões de **todo o banco** sem filtrar pelo estado australiano selecionado pelo usuário (`selectedState`). Em modo de estudo, a linha 374 já faz este filtro:
```tsx
let qs = QS.filter((q) => !q.states || q.states.includes(selectedState));
```

**Fix:** aplicar o mesmo filtro antes do shuffle no sim:
```tsx
const stateQs = QS.filter((q) => !q.states || q.states.includes(selectedState));
const shuffled = [...stateQs].sort(() => Math.random() - 0.5).slice(0, 30);
```

O `useEffect` que contém isso tem as dependências `[mode]`. Adicionar `selectedState` à lista de deps:
```tsx
}, [mode, selectedState]);
```

### Problema B — PracticeClient sim salva sessions com mode errado

Quando o sim termina (~linha 445-455 de PracticeClient.tsx), o código faz:
```tsx
fetch("/api/mock-sessions", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    state: selectedState,
    score,
    total: simQueue.length,
    source: "web"
  }),
  ...
```

A rota `apps/web/app/api/mock-sessions/route.ts` hardcoda `mode: "exam"` na linha do insert independente do que veio no payload. Isso faz com que sessions de prática (sim mode) apareçam como `mode: "exam"` na tabela `mock_sessions`, tornando impossível distinguir simulados reais de praticados.

**Fix em `PracticeClient.tsx`:** adicionar `mode: "practice"` no body do fetch:
```tsx
body: JSON.stringify({
  state: selectedState,
  score,
  total: simQueue.length,
  mode: "practice",
  source: "web"
}),
```

**Fix em `apps/web/app/api/mock-sessions/route.ts`:**

1. Adicionar `mode` ao tipo `MockPayload`:
```ts
type MockPayload = {
  state: string;
  score: number;
  total: number;
  mode?: string;
  source?: string;
};
```

2. Após o bloco de validação de `payload` (linha ~54), adicionar validação do mode:
```ts
const VALID_MODES = new Set(["exam", "practice"]);
const sessionMode = payload.mode && VALID_MODES.has(payload.mode) ? payload.mode : "exam";
```

3. No insert (linha ~70), substituir `mode: "exam"` hardcoded por `mode: sessionMode`:
```ts
const { error } = await supabase.from("mock_sessions").insert({
  user_id: user.id,
  country: "AU",
  state: payload.state,
  mode: sessionMode,   // ← era "exam" hardcoded
  score,
  total,
  passed,
  time_seconds: null,
  answers: {},
  weak_categories: null,
  source: payload.source ?? "web"
});
```

### Verificação
```bash
pnpm --filter @kanga/web tsc --noEmit
```

### Commit Task 18
```bash
git add apps/web/app/practice/PracticeClient.tsx \
        apps/web/app/api/mock-sessions/route.ts
git commit -m "fix(practice): state filter em sim mode + mode field em mock-sessions (S11)

- PracticeClient: sim mode agora filtra questões por selectedState antes
  do shuffle (mesmo filtro que o study mode usa na linha 374)
- PracticeClient: sim mode envia mode='practice' para /api/mock-sessions
- mock-sessions/route.ts: aceita campo mode (exam|practice), valida,
  usa no insert — elimina hardcode mode:'exam' para todas as sessions"
```

---

## Task 19 (S9) — Progress page: nota cross-device para usuários autenticados

### Problema
`apps/web/app/progress/page.tsx` lê **exclusivamente** do `localStorage` (chave `SK.answered`). Para usuários autenticados, o progresso real fica no Supabase (`question_attempts`). Quando um usuário loga em dispositivo diferente ou limpa o browser, o localStorage está vazio mas os dados existem no Dashboard — situação confusa.

A página é marcada como `requiresAuth: true` no SiteNav, então só aparece na nav para logados. Contudo, o conteúdo que ela mostra é exclusivamente local. 

### Fix

**Arquivo:** `apps/web/app/progress/page.tsx`

**Comportamento alvo:** quando o usuário está autenticado E `localStorage` está vazio, exibir um banner explicativo antes de chegar no "empty state", com link para o Dashboard.

**Implementação:**

1. Adicionar import do supabase client:
```tsx
import { createClient } from "@/lib/supabase/client";
```

2. Adicionar estado de autenticação:
```tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
```

3. No `useEffect` de mount (onde já existe `localStorage.getItem(SK.answered)`), adicionar detecção de auth:
```tsx
useEffect(() => {
  try {
    const raw = localStorage.getItem(SK.answered);
    setAnswers(raw ? JSON.parse(raw) : {});
  } catch {
    setAnswers({});
  }
  setMounted(true);

  // Detectar auth para banner cross-device
  try {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
    }).catch(() => {});
  } catch {}
}, []);
```

4. Na condição `isEmpty`, antes do empty state existente, adicionar:
```tsx
{isEmpty && isAuthenticated && (
  <div style={{
    marginTop: 24,
    padding: "14px 18px",
    borderRadius: "var(--radius-md)",
    background: "var(--green3)",
    border: "1px solid var(--green2)",
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap"
  }}>
    <span style={{ fontSize: ".9rem", color: "var(--ink)", flex: 1 }}>
      {s.progressCloudNote ?? "Your practice history is stored in the cloud."}
    </span>
    <Link href="/dashboard" style={{ fontWeight: 800, fontSize: ".85rem", color: "var(--green)", textDecoration: "none", flexShrink: 0 }}>
      {s.dashboard} →
    </Link>
  </div>
)}
```

5. Adicionar a chave `progressCloudNote` ao `apps/web/src/lib/i18n.ts` na seção `// ── Progress ──`:

| Chave | EN | PT | ES |
|---|---|---|---|
| `progressCloudNote` | `"Your practice history is synced to the cloud. Check your Dashboard for full stats."` | `"Seu histórico de prática está sincronizado na nuvem. Veja seu Painel para estatísticas completas."` | `"Tu historial de práctica está sincronizado en la nube. Consulta tu Panel para estadísticas completas."` |

**Nota:** O operador `??` com fallback literal no JSX (`s.progressCloudNote ?? "..."`) é uma proteção temporária — remover o fallback após confirmar que a chave está em i18n.ts. Usar apenas `{s.progressCloudNote}` na versão final.

### Verificação
```bash
pnpm --filter @kanga/web tsc --noEmit
```

### Commit Task 19
```bash
git add apps/web/app/progress/page.tsx \
        apps/web/src/lib/i18n.ts
git commit -m "feat(progress): banner cross-device para usuários autenticados com localStorage vazio (S9)

- progress/page.tsx: detecta sessão Supabase no mount
- Quando autenticado + localStorage vazio: exibe banner explicativo
  com link direto para o Dashboard onde ficam os dados da nuvem
- i18n.ts: +1 chave progressCloudNote em en/pt/es"
```

---

## Task 20 (S12) — Stripe webhook handler

### Contexto
- `apps/web/src/lib/stripe.ts` — singleton Stripe SDK, `apiVersion: "2026-04-22.dahlia"`
- `apps/web/app/auth/callback/route.ts` — cria Stripe customer no OAuth callback e salva `stripe_customer_id` em `profiles`
- `profiles` table tem coluna `stripe_customer_id varchar(100)`
- `profiles` table tem coluna `role varchar(20) CHECK (role IN ('student', 'instructor', 'admin'))`
- Migration 010 impede alteração de `role` exceto via `service_role` — **usar `supabaseAdmin`** para atualizar role
- `apps/web/src/lib/supabase/admin.ts` exporta `supabaseAdmin` (service_role key)
- Env vars disponíveis: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (ambos em Vercel prod + preview)
- Não existe `/api/webhook/stripe/route.ts` ainda — criar do zero

### Comportamento alvo

O webhook deve:
1. Ler o body como raw bytes (obrigatório para verificação de assinatura Stripe)
2. Verificar a assinatura com `STRIPE_WEBHOOK_SECRET`
3. Processar apenas os eventos: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Para `created` / `updated` com `status = "active" | "trialing"` → atualizar `profiles.role = 'instructor'` via supabaseAdmin, onde `stripe_customer_id = event.data.object.customer`
5. Para `deleted` ou `status` em `("canceled", "past_due", "unpaid", "incomplete_expired")` → atualizar `profiles.role = 'student'`
6. Retornar `200 { received: true }` para todos os eventos processados, mesmo os ignorados
7. Retornar `400` se a assinatura falhar
8. Retornar `500` se o update no Supabase falhar

### Criar `apps/web/app/api/webhook/stripe/route.ts`

```ts
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Stripe SDK — lazy init para evitar erro em build sem env vars
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  return _stripe;
}

const ACTIVE_STATUSES = new Set(["active", "trialing"]);
const INACTIVE_STATUSES = new Set(["canceled", "past_due", "unpaid", "incomplete_expired"]);

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("webhook/stripe: STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "misconfigured" }, { status: 500 });
  }

  // Raw body — obrigatório para verificação de assinatura
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "signature_verification_failed";
    console.error("webhook/stripe: signature error:", msg);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // Processar apenas eventos de subscription
  const HANDLED = new Set([
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ]);

  if (!HANDLED.has(event.type)) {
    // Evento irrelevante — ACK sem processar
    return NextResponse.json({ received: true });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const customerId = typeof subscription.customer === "string"
    ? subscription.customer
    : subscription.customer?.id;

  if (!customerId) {
    console.error("webhook/stripe: missing customer id in event", event.id);
    return NextResponse.json({ error: "missing_customer" }, { status: 400 });
  }

  let newRole: "instructor" | "student";

  if (event.type === "customer.subscription.deleted" || INACTIVE_STATUSES.has(subscription.status)) {
    newRole = "student";
  } else if (ACTIVE_STATUSES.has(subscription.status)) {
    newRole = "instructor";
  } else {
    // Status desconhecido — ACK sem alterar role
    return NextResponse.json({ received: true });
  }

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ role: newRole })
    .eq("stripe_customer_id", customerId);

  if (updateError) {
    console.error("webhook/stripe: profile update failed:", updateError.code, updateError.message);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
```

### Verificação TypeScript
```bash
pnpm --filter @kanga/web tsc --noEmit
```

**Atenção ao tipo `Stripe.Subscription`:** as propriedades `customer` e `status` existem no tipo. Se o compilador reclamar de `subscription.customer?.id`, usar cast explícito `(subscription.customer as Stripe.Customer)?.id` como fallback.

### Registrar webhook no Stripe (manual — fora do código)
Após o deploy, registrar no Stripe Dashboard (https://dashboard.stripe.com/webhooks):
- URL: `https://kangalearner.com.au/api/webhook/stripe`
- Eventos: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
- O `STRIPE_WEBHOOK_SECRET` vem do Stripe ao criar o endpoint e já está configurado no Vercel

### Commit Task 20
```bash
git add apps/web/app/api/webhook/stripe/route.ts
git commit -m "feat(payments): Stripe webhook handler — subscription → profile role sync (S12)

- Cria /api/webhook/stripe route handler (POST)
- Verifica assinatura STRIPE_WEBHOOK_SECRET antes de processar
- customer.subscription.created/updated com status active|trialing
  → profiles.role = 'instructor' via supabaseAdmin (service_role)
- customer.subscription.deleted ou status canceled/past_due/unpaid
  → profiles.role = 'student'
- ACK 200 para eventos não tratados; 400 para assinatura inválida
- Usa supabaseAdmin (migration 010 bloqueia update de role via anon)"
```

---

## Push final

Após todas as 4 tasks commitadas com sucesso:
```bash
git push origin main
```

---

## Checklist de saída

Antes do push, confirmar:
- [ ] `pnpm --filter @kanga/web tsc --noEmit` passa sem erros
- [ ] Nenhum `console.log` novo (apenas `console.error` com contexto)
- [ ] Nenhum `any` novo introduzido
- [ ] Todos os apóstrofos em JSX text estão como `&apos;` (não `'`)
- [ ] i18n.ts tem as novas chaves em **en, pt E es** (se faltar uma, TypeScript vai reclamar)
- [ ] 4 commits criados, 1 push executado
