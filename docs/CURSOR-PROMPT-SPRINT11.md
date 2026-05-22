# Cursor Prompt — Sprint 11: Email Transacional com Resend

> Gerado por Claude em 2026-05-22 (M4 — integração Resend ESP).
> Execute as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Sprint 10 concluído: How It Works, testimonials label, newsletter form, 5 tópicos, /resources, /terms, /privacy.
- **Resend já configurado fora do código:**
  - Domínio `kangalearner.com.au` verificado no Resend dashboard (região Tokyo).
  - `RESEND_API_KEY` já está em `apps/web/.env.local` E no Vercel (env var Sensitive, produção + preview).
  - Supabase SMTP custom já configurado para usar `smtp.resend.com:465` (para emails de auth — confirm, reset password).
  - Templates de email no Supabase dashboard já customizados (confirm signup, reset password) com brand `#071A2C`/`#F5A623`.
- **O que falta (este sprint):** integrar Resend SDK para emails transacionais (boas-vindas + confirmação newsletter) enviados pelo próprio Next.js.
- Estrutura: `apps/web/app/(main)/` para páginas públicas, `apps/web/app/auth/` para auth.
- Pacote `resend` NÃO está em `apps/web/package.json` — instalar antes de tudo.
- `supabaseAdmin` disponível em `apps/web/src/lib/supabase/admin.ts`.
- `createClient` (server) em `apps/web/src/lib/supabase/server.ts`.

---

## TASK 61 — Instalar Resend + criar singleton + templates HTML

### Passo 1 — Instalar pacote

```bash
pnpm add resend --filter @kanga/web
```

Verificar que `"resend"` aparece em `apps/web/package.json` dependencies após instalar.

### Passo 2 — Criar `apps/web/src/lib/resend.ts`

```typescript
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not configured");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = "KangaLearner <noreply@kangalearner.com.au>";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://kangalearner.com.au";
```

### Passo 3 — Criar `apps/web/src/lib/emails/welcome.ts`

```typescript
import { APP_URL } from "@/lib/resend";

interface WelcomeEmailProps {
  name?: string;
}

export function welcomeEmailHtml({ name }: WelcomeEmailProps = {}): string {
  const greeting = name ? `Hi ${name}` : "Welcome";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to KangaLearner</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#071A2C;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#F5A623;font-size:24px;font-weight:700;letter-spacing:-0.5px;">KangaLearner</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Western Australia Learner Test Practice</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#071A2C;font-size:20px;font-weight:700;">${greeting}! 🦘</h2>
              <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
                Your KangaLearner account is ready. Start practising for your WA learner licence test — free, in English, Portuguese, or Spanish.
              </p>
              <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">
                Here's what you can do right now:
              </p>
              <ul style="margin:0 0 24px;padding-left:20px;color:#334155;font-size:15px;line-height:1.8;">
                <li>📚 Study all <strong>14 WA road rule topics</strong></li>
                <li>✅ Take a <strong>mock test</strong> with the same format as the real DoT exam</li>
                <li>📊 Track your <strong>progress by topic</strong> from your dashboard</li>
              </ul>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#F5A623;">
                    <a href="${APP_URL}/dashboard" style="display:inline-block;padding:14px 28px;color:#071A2C;font-weight:700;font-size:15px;text-decoration:none;border-radius:8px;">Go to my Dashboard →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                Good luck on your test! 🇦🇺<br />
                The KangaLearner Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                <a href="${APP_URL}" style="color:#94a3b8;text-decoration:none;">kangalearner.com.au</a>
                &nbsp;·&nbsp;
                <a href="${APP_URL}/privacy" style="color:#94a3b8;text-decoration:none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeEmailSubject(): string {
  return "Welcome to KangaLearner — your WA learner test practice starts here";
}
```

### Passo 4 — Criar `apps/web/src/lib/emails/newsletter-confirm.ts`

```typescript
import { APP_URL } from "@/lib/resend";

export function newsletterConfirmHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're subscribed to KangaLearner tips</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#071A2C;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#F5A623;font-size:24px;font-weight:700;letter-spacing:-0.5px;">KangaLearner</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Western Australia Learner Test Practice</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 16px;color:#071A2C;font-size:20px;font-weight:700;">You're in! 🎉</h2>
              <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
                Thanks for subscribing to KangaLearner tips. You'll receive weekly WA driving tips and study reminders in English, Portuguese, or Spanish.
              </p>
              <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">
                While you wait, why not start studying?
              </p>
              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#F5A623;">
                    <a href="${APP_URL}/learn" style="display:inline-block;padding:14px 28px;color:#071A2C;font-weight:700;font-size:15px;text-decoration:none;border-radius:8px;">Start Studying Free →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                The KangaLearner Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                <a href="${APP_URL}" style="color:#94a3b8;text-decoration:none;">kangalearner.com.au</a>
                &nbsp;·&nbsp;
                <a href="${APP_URL}/privacy" style="color:#94a3b8;text-decoration:none;">Privacy Policy</a>
                &nbsp;·&nbsp;
                You received this because you subscribed at kangalearner.com.au
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newsletterConfirmSubject(): string {
  return "You're subscribed to KangaLearner tips 🦘";
}
```

### Commit

```
feat(email): add Resend singleton + welcome + newsletter-confirm HTML templates
```

---

## TASK 62 — Supabase migration: adicionar `welcome_sent_at` à tabela `profiles`

### Criar `supabase/migrations/017_profiles_welcome_sent_at.sql`

```sql
-- Migration 017: add welcome_sent_at to profiles
-- Tracks when the welcome email was sent to new users.
-- NULL = welcome email not yet sent (or user predates this column).

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS welcome_sent_at TIMESTAMPTZ DEFAULT NULL;

COMMENT ON COLUMN profiles.welcome_sent_at IS 'Timestamp when the welcome email was dispatched via Resend. NULL for users who signed up before Sprint 11 or whose email send failed.';
```

### Aplicar a migration

**Opção A — Supabase MCP (preferida):**

```
mcp__supabase__apply_migration({
  project_id: "olgogtaeifyxwzencilo",
  name: "017_profiles_welcome_sent_at",
  query: "<conteúdo do arquivo .sql acima>"
})
```

**Opção B — Supabase dashboard:**
Aceder a `https://supabase.com/dashboard/project/olgogtaeifyxwzencilo/sql/new` e executar o SQL acima.

### Regenerar `apps/web/src/lib/supabase/database.types.ts`

Após aplicar a migration, regenerar os tipos:

```
mcp__supabase__generate_typescript_types({ project_id: "olgogtaeifyxwzencilo" })
```

Substituir o conteúdo de `apps/web/src/lib/supabase/database.types.ts` com o output.

**Atenção:** O MCP historicamente retorna apenas 6 tabelas (ver Do-Not-Repeat do cerebrum). Se `welcome_sent_at` não aparecer no tipo gerado, adicionar manualmente em `Database["public"]["Tables"]["profiles"]["Row"]` e `Update`:

```typescript
welcome_sent_at: string | null
```

### Commit

```
feat(db): migration 017 — add welcome_sent_at to profiles for email tracking
```

---

## TASK 63 — Enviar email de boas-vindas no auth/callback

### Modificar `apps/web/app/auth/callback/route.ts`

**Contexto do arquivo:**
- Importa: `createServerClient`, `supabaseAdmin`, `safeNextPath`, `SUPPORTED_COUNTRY`
- Lê `profile` da tabela `profiles` após `exchangeCodeForSession`
- Detecta novos utilizadores com `!profile.stripe_customer_id`
- Cria cliente Stripe para novos utilizadores

**Adicionar ao topo do arquivo** (junto aos outros imports):

```typescript
import { resend, FROM_ADDRESS } from "@/lib/resend";
import { welcomeEmailHtml, welcomeEmailSubject } from "@/lib/emails/welcome";
```

**Adicionar função helper** (antes da função `GET`):

```typescript
async function sendWelcomeEmail(
  userId: string,
  email: string,
  name?: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: welcomeEmailSubject(),
      html: welcomeEmailHtml({ name }),
    });
    await supabaseAdmin
      .from("profiles")
      .update({ welcome_sent_at: new Date().toISOString() })
      .eq("id", userId);
  } catch (err) {
    console.error("[auth/callback] welcome email failed:", err);
    // fire-and-forget — não bloquear o fluxo de auth
  }
}
```

**Localizar o bloco de criação de Stripe** (condição `if (!profile.stripe_customer_id)`).

**Imediatamente após** o bloco de Stripe (depois do `await supabaseAdmin.from("profiles").update(...)` do Stripe), adicionar:

```typescript
// Enviar email de boas-vindas para novos utilizadores (fire-and-forget)
if (!profile.stripe_customer_id) {
  void sendWelcomeEmail(
    user.id,
    user.email!,
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? undefined
  );
}
```

**Atenção importante:**
- A condição `!profile.stripe_customer_id` reutiliza a lógica de detecção de novo utilizador já existente — NÃO adicionar uma segunda leitura do perfil.
- `void` garante fire-and-forget (não bloqueia o redirect).
- O email de boas-vindas é enviado apenas uma vez: na primeira vez que o utilizador faz login (quando `stripe_customer_id` ainda não existe).
- Utilizadores que se registaram antes deste sprint podem receber o email uma vez — comportamento aceitável.

### Commit

```
feat(auth): send welcome email via Resend on first login (fire-and-forget)

- Detects new users via !profile.stripe_customer_id (existing pattern)
- Sends branded welcome email with dashboard CTA
- Updates profiles.welcome_sent_at for tracking
- Non-blocking: failures logged but don't interrupt auth flow
```

---

## TASK 64 — Enviar confirmação de subscrição newsletter

### Modificar `apps/web/app/api/newsletter/route.ts`

**Adicionar imports** no topo do arquivo:

```typescript
import { resend, FROM_ADDRESS } from "@/lib/resend";
import { newsletterConfirmHtml, newsletterConfirmSubject } from "@/lib/emails/newsletter-confirm";
```

**Localizar o bloco de sucesso** (após o insert na tabela `newsletter_subscribers`):

O código atual retorna `{ ok: true }` após insert bem-sucedido. O duplicate (23505) também retorna `{ ok: true }` mas NÃO deve enviar email (o utilizador já está subscrito).

**Substituir** a lógica final de sucesso:

```typescript
// ANTES (exemplo simplificado):
// if (error) { ... handle errors ... }
// return NextResponse.json({ ok: true });

// DEPOIS — manter toda a lógica de error handling existente,
// apenas adicionar o envio de email ANTES do return final de sucesso:

if (error) {
  if (error.code === "23505") return NextResponse.json({ ok: true }); // duplicate — sem email
  if (error.code === "42P01") return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
  console.error("[newsletter]", error.code);
  return NextResponse.json({ ok: false, error: "subscribe_failed" }, { status: 500 });
}

// Novo subscriber — enviar confirmação (fire-and-forget)
void (async () => {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: newsletterConfirmSubject(),
      html: newsletterConfirmHtml(),
    });
  } catch (err) {
    console.error("[newsletter] confirmation email failed:", err);
  }
})();

return NextResponse.json({ ok: true });
```

**Atenção:**
- `duplicate (23505)` → retornar `{ ok: true }` SEM enviar email (comportamento actual preservado).
- Email apenas para novos subscribers (insert bem-sucedido sem erro).
- fire-and-forget com `void (async () => { ... })()`.

### Commit

```
feat(newsletter): send confirmation email via Resend on new subscription

- New subscribers receive branded confirmation email
- Duplicate subscribers (23505) silently succeed without email
- Non-blocking: failures logged only, response not delayed
```

---

## CHECKLIST SPRINT 11

```bash
# T61: pacote instalado
grep '"resend"' apps/web/package.json

# T61: arquivos criados
ls apps/web/src/lib/resend.ts
ls apps/web/src/lib/emails/welcome.ts
ls apps/web/src/lib/emails/newsletter-confirm.ts

# T62: migration criada
ls supabase/migrations/017_profiles_welcome_sent_at.sql

# T62: coluna em database.types.ts
grep "welcome_sent_at" apps/web/src/lib/supabase/database.types.ts

# T63: welcome email no callback
grep -n "sendWelcomeEmail\|welcome_sent_at" apps/web/app/auth/callback/route.ts

# T64: newsletter confirmation
grep -n "newsletterConfirmHtml\|newsletterConfirmSubject" apps/web/app/api/newsletter/route.ts

# TypeScript
pnpm --filter @kanga/web exec tsc --noEmit

# Build
pnpm --filter @kanga/web run build

# Push
git push origin main
```

### Testes manuais após deploy

1. **Welcome email:** Criar uma nova conta com email real → verificar recebimento em até 2 minutos.
2. **Newsletter confirmation:** Submeter o formulário de newsletter no footer com email real → verificar recebimento.
3. **Newsletter duplicate:** Submeter o mesmo email novamente → resposta `{ ok: true }` mas SEM segundo email.
4. **Auth fallback:** Login com Google em conta existente (já tem `stripe_customer_id`) → NÃO recebe welcome email.
5. **Resend dashboard:** Verificar `https://resend.com/emails` — logs de envio devem aparecer para os 4 testes acima.

---

## Sprint 12 (preview) — M4 sequência onboarding

Após Sprint 11, os emails transacionais básicos estão activos. Sprint 12 cobrirá:

- **D+3 tip email:** Resend scheduled (ou cron Vercel) — enviar dica de estudo 3 dias após registo
- **D+7 mock test nudge:** Email encorajando o primeiro mock test
- **Newsletter: primeiro envio real** — escolher audiência e escrever conteúdo do 1.º email de dicas WA (en/pt/es)
- **Unsubscribe link:** Implementar `/api/newsletter/unsubscribe?token=...` com token seguro na tabela `newsletter_subscribers`
