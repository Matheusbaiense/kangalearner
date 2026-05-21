# Cursor Prompt — Sprint 4: CI Cleanup · Admin Pagination · Timestamp Drift · Per-User Rate Limit

> Gerado por Claude em 2026-05-21. Execute todas as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task e corrija qualquer erro antes de continuar.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`, `supabase/migrations/`
- TypeScript strict. Sem `any` novo. Sem `console.log` novo.
- Supabase admin client: `apps/web/src/lib/supabase/admin.ts` (service role, contorna RLS)
- Rate limiter: `apps/web/src/lib/rateLimit.ts` — `rateLimit(key: string, limit: number, windowMs: number): Promise<boolean>`
- Live DB schema está em `apps/web/src/lib/supabase/database.types.ts` (regenerado pós migration 016)
- `question_attempts` no DB real tem coluna `answered_at` (NÃO `created_at`) — confirmado via database.types.ts Row

---

## TASK 21 — S0: Retirar GitHub Pages; canonizar Vercel como plataforma

**Problema:** O workflow `pages.yml` está suspenso há semanas (arquivos do site estático não estão no git). O `build.yml` tem 3 blocos comentados com `# NOTE(S0):` que são dead code. A decisão arquitetural é: **Vercel/Next.js é a plataforma canônica; GitHub Pages está aposentado**.

### Arquivos a modificar

#### 1. Deletar `.github/workflows/pages.yml`

Arquivo inteiro pode ser removido. Ele está 100% suspenso e nunca será reativado neste repositório.

#### 2. Editar `.github/workflows/build.yml`

Remover os dois blocos de passos comentados com `# NOTE(S0):`. O arquivo atual tem este trecho entre o step "Validate questions" e o step "Build":

```yaml
      # NOTE(S0): gen:core-questions reads assets/js/data/questions.js (static site source).
      # That file is not tracked in git — step disabled until S0 (static vs Next) is resolved.
      # - name: Check questions.ts sync
      #   run: |
      #     pnpm gen:core-questions
      #     git diff --exit-code packages/core/src/data/questions.ts || exit 1

      # NOTE(S0): E2E smoke tests target the static site root (index.html + assets/).
      # Those files are not tracked in git — step disabled until S0 is resolved.
      # Next.js E2E (apps/web) should replace this once Playwright is wired to Vercel preview.
      # - name: Install Playwright Chromium
      #   run: pnpm exec playwright install --with-deps chromium
      # - name: E2E smoke (static site)
      #   run: pnpm run test:e2e
```

Substituir esse trecho inteiro por um único comentário documental:

```yaml
      # NOTE: Static site E2E and core-questions sync steps removed (2026-05-21).
      # GitHub Pages retired — Vercel is the canonical platform. Next.js E2E to be
      # added separately via Playwright + Vercel preview URLs when ready.
```

#### 3. Editar `BACKLOG.md` (raiz do repositório)

Adicionar ao topo da seção `## Agora (curto prazo)`, **antes** do primeiro item `- [x]`, o seguinte bloco:

```markdown
- [x] **S0 — Decisão GitHub Pages**: Aposentado. Arquivos do site estático (`index.html`, `assets/`) não estão no git. `pages.yml` deletado. `build.yml` limpo. Plataforma canônica: Vercel (Next.js). _Resolvido 2026-05-21._
```

#### 4. Editar `docs/HISTORY-INFRA-WEB.md`

Adicionar ao final do arquivo:

```markdown
## 2026-05-21 — S0: GitHub Pages aposentado

- `pages.yml` deletado (workflow estava suspenso desde que o site estático foi removido do git)
- `build.yml` limpo: removidos blocos comentados de E2E estático e `gen:core-questions`
- Decisão arquitetural: Vercel/Next.js é a plataforma canônica
- GitHub Pages não será reativado; E2E Next.js via Playwright + Vercel preview é o próximo passo quando a cobertura for adicionada
```

### Commit

```
chore(ci): retire GitHub Pages — delete pages.yml, clean build.yml NOTE(S0) blocks

- Delete .github/workflows/pages.yml (workflow was suspended, static files not in git)
- Remove commented-out NOTE(S0) steps from build.yml (gen:core-questions + E2E static)
- Mark S0 as resolved in BACKLOG.md and HISTORY-INFRA-WEB.md
- Decision: Vercel/Next.js is the canonical platform; GitHub Pages retired
```

---

## TASK 22 — S4: Admin users — eliminar cap de 1000 usuários no `listUsers`

**Problema:** `GET /api/admin/users` faz `supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })` para enriquecer perfis com email + `last_sign_in`. Isso retorna no máximo 1000 usuários de auth. Quando o total de usuários exceder 1000, todos os perfis nas páginas além da 1000ª posição aparecem com `email: "(no email)"` e `last_sign_in: null`.

**Solução:** Abandonar o `listUsers` em batch. Como o endpoint já pagina profiles (50-100 por página), buscar os dados de auth individualmente via `getUserById` para cada profile da página atual em paralelo. Máximo de 50-100 chamadas paralelas por request — aceitável.

### Arquivo: `apps/web/app/api/admin/users/route.ts`

**Substituição cirúrgica do bloco de enriquecimento de auth (linhas ~32-53).**

Trecho ATUAL a ser substituído (do `// Batch: fetch...` até o `res.headers.set` incluído):

```typescript
  // Batch: fetch all auth users once and index by id (avoids N+1)
  const { data: authData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  const users = authData?.users ?? [];
  const authMap = new Map(users.map((u) => [u.id, u]));

  const enriched = (data ?? []).map((profile) => {
    const authUser = authMap.get(profile.id);
    return {
      ...profile,
      email: authUser?.email ?? "(no email)",
      last_sign_in: authUser?.last_sign_in_at ?? null,
    };
  });

  const res = NextResponse.json({ users: enriched, total: count ?? 0, page, limit });

  if (users.length >= 1000) {
    res.headers.set("X-Admin-Warning", "user-list-capped-at-1000");
    console.warn("[admin/users] user count hit 1000 cap — pagination not implemented");
  }

  return res;
```

Trecho NOVO (substituição completa):

```typescript
  // Fetch auth user data only for the current page's profile IDs (no 1000 cap)
  const profileIds = (data ?? []).map((p) => p.id);
  const authResults = await Promise.all(
    profileIds.map((id) => supabaseAdmin.auth.admin.getUserById(id))
  );
  const authMap = new Map(
    authResults
      .filter((r) => r.data.user != null)
      .map((r) => [r.data.user!.id, r.data.user!])
  );

  const enriched = (data ?? []).map((profile) => {
    const authUser = authMap.get(profile.id);
    return {
      ...profile,
      email: authUser?.email ?? "(no email)",
      last_sign_in: authUser?.last_sign_in_at ?? null,
    };
  });

  return NextResponse.json({ users: enriched, total: count ?? 0, page, limit });
```

**Verificação:** Após a mudança, `tsc --noEmit` deve passar sem erros. O type de `r.data.user` em `getUserById` é `User | null` — o `.filter` e o `!` de non-null assertion são corretos.

### Commit

```
fix(admin): replace listUsers batch with getUserById per-page — remove 1000-user cap (S4)

- GET /api/admin/users: replace listUsers({ perPage: 1000 }) with Promise.all of
  getUserById for each profile in the current page (~50 calls max)
- Eliminates 1000-user cap: email and last_sign_in are now correctly populated
  for any page number regardless of total user count
- Remove X-Admin-Warning header (no longer needed)
```

---

## TASK 23 — S5: Corrigir drift de coluna timestamp no dashboard

**Problema:** A tabela `question_attempts` no banco real tem a coluna `answered_at` (confirmado em `database.types.ts` Row). A migration 004 define `created_at`, mas o live DB usa `answered_at` — drift histórico. O código em `dashboard/page.tsx` faz `.order("created_at", ...)` em queries de `question_attempts`, mas essa coluna não existe no live DB. Isso causa ordenação silenciosamente incorreta (PostgREST ignora a cláusula ou retorna erro não capturado).

**Prova:** Em `apps/web/src/lib/supabase/database.types.ts`, tipo `question_attempts.Row`:
```typescript
Row: {
  answered_at: string   // ← existe
  // created_at: NÃO existe no Row
  ...
}
```

### Arquivo: `apps/web/app/dashboard/page.tsx`

**Duas correções pontuais.** Ambas as queries de `question_attempts` no `Promise.all` ordenam por `created_at`. Trocar ambas por `answered_at`.

**Correção 1** — query `attemptsResult` (em torno da linha 164-170):

Localizar exatamente:
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500),
```

Substituir por:
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .order("answered_at", { ascending: false })
      .limit(500),
```

**Correção 2** — query `stateAttemptsResult` (em torno da linha 171-177):

Localizar exatamente:
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .eq("state", selectedState)
      .order("created_at", { ascending: false })
      .limit(500),
```

Substituir por:
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .eq("state", selectedState)
      .order("answered_at", { ascending: false })
      .limit(500),
```

**Sem outras mudanças nesse arquivo.**

### Commit

```
fix(dashboard): order question_attempts by answered_at not created_at (S5)

- Live DB question_attempts uses answered_at column (confirmed via database.types.ts)
  created_at does not exist in the live table — order clause was silently incorrect
- Fix both attemptsResult and stateAttemptsResult queries in dashboard/page.tsx
```

---

## TASK 24 — B10: Rate limit por usuário autenticado (além do IP)

**Problema:** Os endpoints de escrita (`/api/attempts`, `/api/attempts/bulk`, `/api/mock-sessions`) limitam por IP (`x-forwarded-for`). Usuários em redes corporativas ou escolares compartilham o mesmo IP — um único usuário pode esgotar o bucket de toda a turma. Usuários autenticados devem ter limite próprio, isolado do IP.

**Solução:** Dois estágios de rate limit:
1. **IP guard** (antes da auth): defesa DoS — limite mais frouxo (dobrar o atual)
2. **User limit** (após auth): limite por `user.id` — mesmos valores atuais ou menores

**Newsletter** (`/api/newsletter`) permanece IP-only (rota anônima, 3/min está correto). **Webhook Stripe** não tem usuário. **Admin** já está protegido por role guard.

---

### Arquivo: `apps/web/app/api/attempts/route.ts`

**Mudança 1** — Trocar o IP rate limit atual por versão mais frouxa (antes da auth):

Localizar:
```typescript
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

Substituir por:
```typescript
  // IP guard — defence against unauthenticated flood (loose: accounts for shared NAT)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts:ip:${ip}`, 120, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

**Mudança 2** — Adicionar per-user rate limit logo após `if (!user) return ...`:

Localizar (em torno da linha 46):
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
```

Substituir por:
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Per-user rate limit — each authenticated user gets their own bucket
  if (!await rateLimit(`attempts:user:${user.id}`, 60, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

---

### Arquivo: `apps/web/app/api/attempts/bulk/route.ts`

**Mudança 1** — Trocar IP rate limit:

Localizar:
```typescript
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts-bulk:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

Substituir por:
```typescript
  // IP guard — defence against unauthenticated flood
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts-bulk:ip:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

**Mudança 2** — Adicionar per-user limit após `if (!user) return ...`:

Localizar (em torno da linha 45):
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
```

Substituir por:
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Per-user rate limit — bulk migration is a one-time event; 5 per minute is ample
  if (!await rateLimit(`attempts-bulk:user:${user.id}`, 5, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

---

### Arquivo: `apps/web/app/api/mock-sessions/route.ts`

**Mudança 1** — Trocar IP rate limit:

Localizar:
```typescript
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`mock-sessions:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

Substituir por:
```typescript
  // IP guard — defence against unauthenticated flood
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`mock-sessions:ip:${ip}`, 40, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

**Mudança 2** — Adicionar per-user limit após `if (!user) return ...`:

Localizar (em torno da linha 46):
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
```

Substituir por:
```typescript
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Per-user rate limit — 20 mock sessions per minute per user is generous
  if (!await rateLimit(`mock-sessions:user:${user.id}`, 20, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

### Commit Task 24

```
fix(rate-limit): per-user rate limiting on write endpoints — prevent shared-NAT bucket pollution (B10)

- attempts: IP guard 120/min + user limit 60/min (was: IP-only 60/min)
- attempts/bulk: IP guard 20/min + user limit 5/min (was: IP-only 10/min)
- mock-sessions: IP guard 40/min + user limit 20/min (was: IP-only 20/min)
- Authenticated users now get isolated rate limit buckets keyed on user.id
- Newsletter stays IP-only (anonymous endpoint)
```

---

## CHECKLIST FINAL

Após todas as 4 tasks:

```bash
# TypeScript — zero erros obrigatório
pnpm --filter @kanga/web exec tsc --noEmit

# Build completo
pnpm run build

# Verificar que pages.yml não existe mais
ls .github/workflows/

# Push para origin/main
git push origin main
```

Se `tsc` ou `build` falhar: corrigir antes do push. Não deixar CI vermelho.
