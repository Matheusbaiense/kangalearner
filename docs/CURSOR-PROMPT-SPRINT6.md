# Cursor Prompt — Sprint 6: Types Regeneration · Avatar Rate Limit · Country Constant

> Gerado por Claude em 2026-05-22. Execute as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task e corrija qualquer erro antes de continuar.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`, `supabase/migrations/`
- TypeScript strict. Sem `any` novo. Sem `console.log` novo.
- Supabase project ref: `olgogtaeifyxwzencilo`
- Rate limiter centralizado em `apps/web/src/lib/rateLimit.ts` — sliding window, Upstash Redis + in-memory fallback. Assinatura: `rateLimit(key: string, limit: number, windowMs: number): Promise<boolean>`
- `@kanga/core` = `packages/core/src/index.ts`

---

## TASK 32 — Regenerar `database.types.ts` completo

**Problema:** `apps/web/src/lib/supabase/database.types.ts` foi gerado manualmente e inclui apenas 6 tabelas
(`mock_sessions`, `newsletter_subscribers`, `profiles`, `question_attempts`, `user_category_stats`, `user_settings`).
O schema real em produção tem **14 tabelas** (migrations 001–016):
`user_xp`, `xp_events`, `user_badges`, `saved_questions`, `instructors`, `bookings`,
`instructor_reviews`, `marketplace_waitlist` — todas ausentes.
Sem tipos gerados, qualquer query a essas tabelas usa fallback `unknown`, quebrando type-safety.

**Solução:** Usar o Supabase MCP para gerar tipos frescos do projeto de produção.

### Passo 1 — Regenerar via Supabase MCP

Usar a ferramenta MCP `generate_typescript_types` com `project_id: olgogtaeifyxwzencilo`:

```
mcp__supabase__generate_typescript_types({ project_id: "olgogtaeifyxwzencilo" })
```

Salvar o resultado em `apps/web/src/lib/supabase/database.types.ts`, **substituindo o arquivo inteiro**.

### Passo 2 — Verificar as 8 tabelas adicionais

Após salvar, confirmar que o arquivo gerado inclui todas estas tabelas na seção `Tables`:

```bash
grep -E "user_xp|xp_events|user_badges|saved_questions|instructors|bookings|instructor_reviews|marketplace_waitlist" \
  apps/web/src/lib/supabase/database.types.ts
```

Cada tabela deve aparecer com `Row`, `Insert`, `Update` e `Relationships`.

### Passo 3 — Se a MCP falhar, fallback manual

Se o MCP não retornar os tipos (timeout / projeto pausado), adicionar manualmente
**apenas as tabelas em falta** ao final do bloco `Tables{}` existente, baseando-se nos arquivos
de migration correspondentes:

| Tabela | Migration de origem |
|--------|---------------------|
| `user_xp` | `007_gamification.sql` |
| `xp_events` | `007_gamification.sql` |
| `user_badges` | `007_gamification.sql` |
| `saved_questions` | `008_saved_questions.sql` |
| `instructors` | `009_marketplace_scaffold.sql` |
| `bookings` | `009_marketplace_scaffold.sql` |
| `instructor_reviews` | `009_marketplace_scaffold.sql` |
| `marketplace_waitlist` | `009_marketplace_scaffold.sql` |

Ler cada migration e inferir os tipos das colunas. Usar `string` para UUID/text/varchar, `number` para int/numeric, `boolean` para bool, `string | null` para nullable.

### Passo 4 — Verificar TypeScript após regeneração

```bash
pnpm --filter @kanga/web exec tsc --noEmit
```

Se houver erros de tipo em código que consultava tabelas recém-adicionadas (improvável — nenhum código as usa ainda), corrigir.

### Commit

```
chore(types): regenerate database.types.ts — add 8 missing tables (migrations 007-009)

- user_xp, xp_events, user_badges (gamification)
- saved_questions
- instructors, bookings, instructor_reviews, marketplace_waitlist (marketplace scaffold)
- All 14 production tables now typed; downstream queries type-safe
```

---

## TASK 33 — Adicionar rate limiting ao endpoint de avatar

**Problema:** `apps/web/app/api/profile/avatar/route.ts` tem handlers `POST` (upload) e `DELETE`
(remoção) que **não têm rate limiting**. Todos os outros endpoints de escrita da API têm.
Um utilizador autenticado pode chamar estes endpoints em loop — por exemplo, carregar milhares
de imagens consecutivamente, abusando de Supabase Storage.

**Solução:** Adicionar `rateLimit` por `user.id` antes de processar cada request. Limite conservador:
5 operações por minuto por utilizador (upload é raro; este limite não afeta uso normal).

### Arquivo: `apps/web/app/api/profile/avatar/route.ts`

#### Mudança 1 — Adicionar import de `rateLimit`

No topo do arquivo, logo após os imports existentes, adicionar:

```typescript
import { rateLimit } from "@/lib/rateLimit";
```

#### Mudança 2 — Adicionar rate limit no `POST` (upload)

Localizar no handler `POST`, após a verificação de autenticação:

```typescript
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
```

Logo **após** esse bloco, inserir:

```typescript
  if (!await rateLimit(`avatar:post:${user.id}`, 5, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

#### Mudança 3 — Adicionar rate limit no `DELETE` (remoção)

Localizar no handler `DELETE` o mesmo padrão de auth check:

```typescript
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
```

Logo **após**, inserir:

```typescript
  if (!await rateLimit(`avatar:delete:${user.id}`, 5, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
```

#### Verificação

```bash
pnpm --filter @kanga/web exec tsc --noEmit
```

Confirmar que `rateLimit` é usado em ambos os handlers com chaves diferentes (`avatar:post:` e `avatar:delete:`).

### Commit

```
fix(avatar): add per-user rate limiting to POST and DELETE avatar endpoints

- 5 uploads/min and 5 deletions/min per authenticated user
- Consistent with rate limiting already applied to attempts, mock-sessions,
  newsletter, and account-delete endpoints
```

---

## TASK 34 — Extrair constante `COUNTRY` para `@kanga/core`

**Problema:** A string `"AU"` (país suportado) está hardcoded em pelo menos 3 lugares:

| Arquivo | Linha | Contexto |
|---------|-------|---------|
| `apps/web/app/api/mock-sessions/route.ts` | ~82 | `country: "AU"` no INSERT |
| `apps/web/app/dashboard/page.tsx` | ~176 | `.eq("country", "AU")` query catStats |
| `apps/web/app/dashboard/page.tsx` | ~182 | `.eq("country", "AU")` query stateCatStats |

Quando o KangaLearner expandir para outros países, cada um destes será um bug silencioso
(usuários de outros países nunca verão stats). Centralizar a constante elimina todos de uma vez.

**Solução:** Adicionar `SUPPORTED_COUNTRY = "AU"` ao `packages/core/src/index.ts` e substituir
as 3 ocorrências.

### Passo 1 — Adicionar constante em `packages/core/src/index.ts`

Abrir o arquivo. Localizar a secção de constantes existentes (onde estão `WA_PASS_THRESHOLD`,
`WA_PASS_MIN_CORRECT`, `WA_TOTAL_QUESTIONS`). Adicionar a nova constante **no final desse grupo**:

```typescript
/** ISO 3166-1 alpha-2 country code for the single supported market. */
export const SUPPORTED_COUNTRY = "AU" as const;
```

### Passo 2 — Substituir em `apps/web/app/api/mock-sessions/route.ts`

#### 2a. Adicionar import

Verificar se `@kanga/core` já está importado. Se sim, adicionar `SUPPORTED_COUNTRY` ao import existente:

```typescript
import { WA_PASS_THRESHOLD, SUPPORTED_COUNTRY } from "@kanga/core";
```

Se não estiver importado, adicionar o import completo.

#### 2b. Substituir string

Localizar:
```typescript
    country: "AU",
```

Substituir por:
```typescript
    country: SUPPORTED_COUNTRY,
```

### Passo 3 — Substituir em `apps/web/app/dashboard/page.tsx`

#### 3a. Adicionar import

Localizar a linha de import de `@kanga/core` no arquivo (já existe para `WA_PASS_THRESHOLD`
ou similar). Adicionar `SUPPORTED_COUNTRY`:

```typescript
import { SUPPORTED_COUNTRY } from "@kanga/core";
```

(Se o import de `@kanga/core` não existir, criar.)

#### 3b. Substituir as duas ocorrências

Fazer `replace_all: true` para:
```
.eq("country", "AU")
```
→
```
.eq("country", SUPPORTED_COUNTRY)
```

**Atenção:** Verificar que não há outras strings `"AU"` no arquivo que devam permanecer
hardcoded (por ex., nomes de estados australianos em listas de opções — esses são valores de
enum, não constante de país, e **não devem** ser substituídos).

### Passo 4 — Verificar

```bash
pnpm --filter @kanga/web exec tsc --noEmit
pnpm --filter @kanga/core exec tsc --noEmit
```

Confirmar que não há ocorrências residuais de `"AU"` como valor de `country`:

```bash
grep -rn '\.eq("country", "AU")\|country: "AU"' apps/web/app/
# Deve retornar vazio
```

### Commit

```
refactor(core): add SUPPORTED_COUNTRY constant — replace hardcoded "AU" in API and dashboard

- packages/core: export SUPPORTED_COUNTRY = "AU" as const
- api/mock-sessions: use SUPPORTED_COUNTRY in INSERT
- dashboard/page.tsx: use SUPPORTED_COUNTRY in user_category_stats queries (×2)
- Single change point when expanding to other countries
```

---

## CHECKLIST FINAL

```bash
# TypeScript — zero erros obrigatório
pnpm --filter @kanga/web exec tsc --noEmit
pnpm --filter @kanga/core exec tsc --noEmit

# Build
pnpm --filter @kanga/web run build

# Confirmar tabelas adicionais nos tipos
grep "user_xp\|saved_questions\|marketplace_waitlist" \
  apps/web/src/lib/supabase/database.types.ts

# Confirmar sem "AU" hardcoded como país nas queries
grep -rn '\.eq("country", "AU")\|country: "AU"' apps/web/app/

# Push
git push origin main
```

Se `tsc` ou `build` falhar: corrigir antes do push. Não deixar CI vermelho.

---

## NOTA: Estado do projeto após Sprint 6

Com Sprint 6 concluído, todos os itens da auditoria de engenharia 2026-05-20 estarão
resolvidos ou conscientemente adiados. O repo estará em estado de produção-ready para:

- ✅ Segurança (CSP, RLS, rate limiting em todos os endpoints de escrita)
- ✅ Performance (user_category_stats, sem hard caps, 90-day window)
- ✅ Type safety (database.types.ts completo)
- ✅ UX base (onboarding, guest flow, state persistence, CSS tokens)
- ⏳ QA manual (auth, Supabase, Stripe — validação humana necessária)
- ⏳ Conteúdo /learn e /resources (decisão de produto pendente)
- ⏳ Expansão multi-estado (NSW, VIC, QLD — decisão de roadmap)
