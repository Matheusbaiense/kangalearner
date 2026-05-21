# Cursor Prompt — Sprint 1: Segurança Crítica Pendente

**Contexto:** Auditoria completa documentada em `docs/AUDIT-2026-05-20.md`.
Os itens abaixo são os únicos pendentes do Sprint 1. Não altere arquivos fora desta lista.

---

## TAREFA 1 — Renomear migration conflitante [C2]

**Arquivo:** `supabase/migrations/0001_auth_account_product_schema.sql`

Renomear para: `supabase/migrations/DRAFT_0001_auth_account_product_schema.sql`

Não alterar o conteúdo do arquivo. Apenas renomear.

**Motivo:** O prefixo `0001_` ordena antes de `001_` alfabeticamente em alguns sistemas.
O arquivo tem comentário "Do NOT apply in this phase" mas está na pasta de migrations ativas.

---

## TAREFA 2 — Account deletion real [C1]

**Arquivo:** `apps/web/app/account/page.tsx`

**Estado atual:** `handleDeleteAccount` (linha ~112) chama apenas `supabase.auth.signOut()` e redireciona para `/`. O usuário NÃO é apagado.

**Implementação correta:**

Passo 2a — Criar route handler server-side:
**Arquivo novo:** `apps/web/app/api/account/delete/route.ts`

```typescript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function DELETE() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (error) {
    console.error("[account/delete] failed:", error.code);
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
```

Passo 2b — Atualizar `handleDeleteAccount` em `account/page.tsx`:

```typescript
async function handleDeleteAccount() {
  if (!confirm("Tem certeza? Esta ação é irreversível e apaga todos os seus dados.")) return;
  
  const res = await fetch("/api/account/delete", { method: "DELETE" });
  if (!res.ok) {
    // mostrar erro ao usuário
    return;
  }
  await supabase.auth.signOut();
  router.push("/");
  router.refresh();
}
```

**Verificação:** Após implementar, testar com conta de teste — o usuário deve ser removido do `auth.users` no Supabase.

---

## TAREFA 3 — Remover `as any` de newsletter route [C3]

**Arquivo:** `apps/web/app/api/newsletter/route.ts`

**Estado atual linha 15:**
```typescript
const { error } = await (supabase as any)
  .from("newsletter_subscribers")
```

A tabela `newsletter_subscribers` foi criada via migration 013. Os tipos precisam ser regenerados.

Passo 3a — Regenerar tipos:
```bash
npx supabase gen types typescript --project-id olgogtaeifyxwzencilo > apps/web/src/lib/supabase/database.types.ts
```

Passo 3b — Após regeneração, remover o `as any`:
```typescript
const { error } = await supabase
  .from("newsletter_subscribers")
  .insert({ email, source: "web" });
```

---

## TAREFA 4 — Limite máximo no bulk endpoint [H16]

**Arquivo:** `apps/web/app/api/attempts/bulk/route.ts`

Após a linha onde `attempts` é construído (atualmente linha 46-48), adicionar:

```typescript
const MAX_BULK = 500;
if (attempts.length > MAX_BULK) {
  return NextResponse.json({ error: "too_many_attempts", max: MAX_BULK }, { status: 400 });
}
```

---

## TAREFA 5 — Validar `score <= total` em mock-sessions [M13]

**Arquivo:** `apps/web/app/api/mock-sessions/route.ts`

Dentro da validação do payload (onde já existe `payload.total <= 0`), adicionar:

```typescript
payload.score < 0 ||
payload.score > payload.total ||
```

Resultado final da condição de erro:
```typescript
if (
  !payload?.state ||
  !Number.isFinite(payload.score) ||
  !Number.isFinite(payload.total) ||
  payload.total <= 0 ||
  payload.score < 0 ||
  payload.score > payload.total
) {
  return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
}
```

---

## TAREFA 6 — Não vazar `error.message` ao cliente [H15]

**Arquivos a corrigir:**

`apps/web/app/api/admin/users/route.ts` — linhas 46 e 93:
```typescript
// ANTES
return NextResponse.json({ error: error.message }, { status: 500 });
// DEPOIS
console.error("[admin/users]", error.code);
return NextResponse.json({ error: "internal_error" }, { status: 500 });
```

`apps/web/app/api/newsletter/route.ts` — linha com 500 genérico:
```typescript
// ANTES
return NextResponse.json({ error: error.message }, { status: 500 });
// DEPOIS
console.error("[newsletter]", error.code);
return NextResponse.json({ error: "subscribe_failed" }, { status: 500 });
```

---

## TAREFA 7 — Email hardcoded na migration [H1]

**Arquivo:** `supabase/migrations/011_roles_expansion.sql`

Localizar linha ~18:
```sql
update profiles set role = 'super_admin'
where id = (select id from auth.users where email = 'owner@example.com' limit 1); -- email redacted
```

Substituir por:
```sql
-- To promote a user to super_admin, run manually in Supabase SQL Editor:
-- UPDATE profiles SET role = 'super_admin' WHERE id = '<USER_UUID>';
-- Do not hardcode emails in migrations.
```

**Nota:** O email já está no git history permanentemente e não pode ser removido sem reescrita de história. O arquivo modificado garante que futuras execuções não dependem do email.

---

## QA obrigatório após todas as tarefas

```bash
pnpm --filter @kanga/web build    # deve passar sem erros TypeScript
pnpm --filter @kanga/web lint     # sem novos warnings
```

Verificar manualmente:
- `/api/ping` sem `Authorization` header → deve retornar 401
- `/api/ping` com `Authorization: Bearer <CRON_SECRET>` → deve retornar `{"ok":true}`
- `/admin` com usuário free → deve redirecionar para `/` (sem flash de conteúdo admin)
- `/api/attempts/bulk` com array > 500 itens → deve retornar 400
- `/api/mock-sessions` com `score=999, total=1` → deve retornar 400

---

## NÃO alterar nesta sessão

- `apps/web/src/components/` (extrações de componentes são Sprint 3)
- `apps/web/app/dashboard/` (performance queries são Sprint 2)
- `apps/web/app/practice/` (state selector é Sprint 2)
- `supabase/migrations/` além das mencionadas
- `packages/core/`
- `assets/js/`
