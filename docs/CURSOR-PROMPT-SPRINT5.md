# Cursor Prompt — Sprint 5: Dashboard Queries · State Flash · Onboarding UX · Mock Guest Flow · CSS Tokens · Stripe Cleanup

> Gerado por Claude em 2026-05-21. Execute todas as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task e corrija qualquer erro antes de continuar.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`, `supabase/migrations/`
- TypeScript strict. Sem `any` novo (exceto onde explicitamente indicado com `// eslint-disable`). Sem `console.log` novo.
- Supabase server client: `apps/web/src/lib/supabase/server.ts` — `createSupabaseServerClient()`
- Storage keys centralizados em `apps/web/src/lib/storageKeys.ts` — importar via `SK`
- `user_category_stats` — tabela de stats pré-agregadas. Schema: `user_id uuid, country varchar(2), state varchar(10), category varchar(50), total_attempts int, correct_attempts int`. Tem índice em `(user_id, country, state)` e constraint `unique(user_id, country, state, category)`.
- `question_attempts.answered_at` — coluna real no live DB (não `created_at`)
- `profiles.preferred_state` — coluna já existe no live DB (confirmado via database.types.ts Row)

---

## TASK 25 — H6: Eliminar hard cap de 500 linhas no dashboard

**Problema:** `DashboardPage` (`apps/web/app/dashboard/page.tsx`) faz duas queries de `question_attempts` com `.limit(500)`:
- `attemptsResult`: `select("category, is_correct, answered_at")` sem filtro de estado — usado para catStats, weakTopics, streak, weekBuckets, answeredToday
- `stateAttemptsResult`: mesma query com `.eq("state", selectedState)` — usado para stateCategoryStats

Um usuário ativo com > 500 tentativas tem dados incorretos (as 500 mais recentes não cobrem todo o histórico de categorias). Além disso, a tabela `user_category_stats` já mantém os stats de categoria pré-agregados por `(user_id, country, state, category)` — não há necessidade de processar tentativas brutas para isso.

**Solução:** Separar os dois usos dos dados:
1. **Stats de categoria** → ler de `user_category_stats` (sem limite, sem varredura de linhas brutas)
2. **Analytics temporais** (streak, weekly chart, answeredToday) → ler de `question_attempts` com filtro de janela de 90 dias, sem LIMIT

### Passo 1 — Regenerar `database.types.ts`

A tabela `user_category_stats` não consta no `database.types.ts` atual. Antes de qualquer outra mudança, regenerar o arquivo usando o Supabase MCP (project ref: `olgogtaeifyxwzencilo`):

```bash
# Via Supabase MCP tool: generate_typescript_types, project_id: olgogtaeifyxwzencilo
# OU via CLI (se disponível):
npx supabase gen types typescript --project-id olgogtaeifyxwzencilo \
  > apps/web/src/lib/supabase/database.types.ts
```

Após regenerar, confirmar que o arquivo inclui `user_category_stats` na seção `Tables`.

### Passo 2 — Editar `apps/web/app/dashboard/page.tsx`

#### 2a. Adicionar tipo auxiliar (logo após os imports, antes da primeira função):

```typescript
type CatStatRow = {
  category: string;
  total_attempts: number;
  correct_attempts: number;
};
```

#### 2b. Adicionar cálculo de `ninetyDaysAgo` antes do `Promise.all`:

Localizar a linha:
```typescript
  const [
    attemptsResult,
```

Logo ANTES dessa linha, inserir:
```typescript
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

```

#### 2c. Substituir os dois primeiros elementos do `Promise.all`

Localizar no bloco `Promise.all` os dois primeiros elementos (as duas queries de `question_attempts` com `.limit(500)`):

**Elemento 1 a remover:**
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .order("answered_at", { ascending: false })
      .limit(500),
```

**Elemento 2 a remover:**
```typescript
    supabase!
      .from("question_attempts")
      .select("category, is_correct, answered_at")
      .eq("user_id", user.id)
      .eq("state", selectedState)
      .order("answered_at", { ascending: false })
      .limit(500),
```

**Substituir pelos três novos elementos** (atenção: eram 2, agora são 3 — atualizar as variáveis de destructuring no próximo passo):

```typescript
    // Category stats — all states aggregated (replaces 500-row attempts query)
    supabase!
      .from("user_category_stats")
      .select("category, total_attempts, correct_attempts")
      .eq("user_id", user.id)
      .eq("country", "AU"),
    // Category stats — state-specific (replaces 500-row state-filtered query)
    supabase!
      .from("user_category_stats")
      .select("category, total_attempts, correct_attempts")
      .eq("user_id", user.id)
      .eq("country", "AU")
      .eq("state", selectedState),
    // Temporal data — last 90 days only, for streak/weekly chart/today count
    supabase!
      .from("question_attempts")
      .select("answered_at, is_correct")
      .eq("user_id", user.id)
      .gte("answered_at", ninetyDaysAgo)
      .order("answered_at", { ascending: false }),
```

#### 2d. Atualizar as variáveis de destructuring do `Promise.all`

O array de variáveis na declaração do `Promise.all` tem este início:
```typescript
  const [
    attemptsResult,
    stateAttemptsResult,
    attemptsCountResult,
```

Substituir `attemptsResult, stateAttemptsResult,` por:
```typescript
  const [
    catStatsResult,
    stateCatStatsResult,
    temporalAttemptsResult,
    attemptsCountResult,
```

(O restante do array fica idêntico.)

#### 2e. Atualizar o bloco de destructuring dos resultados

Localizar e substituir os dois destructurings das queries removidas:

**Remover:**
```typescript
  const { data: attempts, error: attemptsError } = attemptsResult as {
    data: AttemptRow[] | null;
    error: unknown;
  };
  const { data: stateAttempts, error: stateAttemptsError } = stateAttemptsResult as {
    data: AttemptRow[] | null;
    error: unknown;
  };
```

**Substituir por:**
```typescript
  const { data: userCatStats, error: catStatsError } = catStatsResult as {
    data: CatStatRow[] | null;
    error: unknown;
  };
  const { data: stateUserCatStats, error: stateCatStatsError } = stateCatStatsResult as {
    data: CatStatRow[] | null;
    error: unknown;
  };
  const { data: temporalAttempts, error: temporalAttemptsError } = temporalAttemptsResult as {
    data: Pick<AttemptRow, "answered_at" | "is_correct">[] | null;
    error: unknown;
  };
```

#### 2f. Atualizar os logs de erro

Localizar:
```typescript
  if (attemptsError) console.error("Dashboard attempts lookup failed", errCode(attemptsError));
  if (stateAttemptsError) console.error("Dashboard state attempts lookup failed", errCode(stateAttemptsError));
```

Substituir por:
```typescript
  if (catStatsError) console.error("Dashboard category stats lookup failed", errCode(catStatsError));
  if (stateCatStatsError) console.error("Dashboard state category stats lookup failed", errCode(stateCatStatsError));
  if (temporalAttemptsError) console.error("Dashboard temporal attempts lookup failed", errCode(temporalAttemptsError));
```

#### 2g. Substituir o bloco de cálculos que usava `allAttempts`

Localizar o bloco que começa com `const allAttempts = attempts ?? [];` e vai até `const stateCategoryStats = ...`. Esse bloco inteiro deve ser substituído.

**Remover desde:**
```typescript
  const allAttempts = attempts ?? [];
  const totalAnswered = attemptsCount ?? allAttempts.length;
  const totalCorrect = attemptsCorrectCount ?? allAttempts.filter((a) => a.is_correct).length;
```

**até (inclusive):**
```typescript
  const stateCategoryStats = categoryStatsFor(selectedStateAttempts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);
```

**Substituir pelo bloco completo a seguir:**
```typescript
  // Counts come from exact COUNT queries — no raw-row fallback needed
  const totalAnswered = attemptsCount ?? 0;
  const totalCorrect = attemptsCorrectCount ?? 0;
  const overallPct = pct(totalCorrect, totalAnswered);
  const dailyGoal = Math.max(1, settings?.daily_goal ?? 10);
  const todayKey = dayKeyUtcMinus8(new Date());

  // Temporal analytics — last 90 days of question_attempts
  const temporalData = temporalAttempts ?? [];
  const answeredToday = todayKey
    ? temporalData.filter((attempt) => dayKeyUtcMinus8(attempt.answered_at) === todayKey).length
    : 0;
  const dailyGoalPct = Math.min(100, pct(answeredToday, dailyGoal));
  const streakDays = streakForAttempts(temporalData);

  // Weekly bar chart — built from temporal data (last 90 days covers 8+ weeks)
  const WEEKS = 8;
  const weekBuckets: { label: string; total: number; correct: number }[] = [];
  const thisWeekStart = startOfWeekDayKey(todayKey ?? dayKeyUtcMinus8(new Date()) ?? "1970-01-01");

  for (let i = WEEKS - 1; i >= 0; i--) {
    const weekStart = shiftDayKey(thisWeekStart, -i * 7);
    const weekEnd = shiftDayKey(weekStart, 7);
    const label = weekLabel(weekStart);
    const bucket = temporalData.filter((a) => {
      const dayKey = dayKeyUtcMinus8(a.answered_at);
      return Boolean(dayKey && dayKey >= weekStart && dayKey < weekEnd);
    });
    weekBuckets.push({
      label,
      total: bucket.length,
      correct: bucket.filter((a) => a.is_correct).length
    });
  }

  const maxWeekTotal = Math.max(...weekBuckets.map((b) => b.total), 1);

  // Category stats — from pre-aggregated user_category_stats (no row-scan limit)
  const catMap = new Map<string, { total: number; correct: number }>();
  for (const row of userCatStats ?? []) {
    const e = catMap.get(row.category) ?? { total: 0, correct: 0 };
    catMap.set(row.category, {
      total: e.total + row.total_attempts,
      correct: e.correct + row.correct_attempts
    });
  }
  const catStats = [...catMap.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);
  const weakTopics = [...catMap.entries()]
    .filter(([, s]) => s.total >= 3)
    .sort((a, b) => {
      const ap = a[1].total > 0 ? a[1].correct / a[1].total : 0;
      const bp = b[1].total > 0 ? b[1].correct / b[1].total : 0;
      if (ap !== bp) return ap - bp;
      return b[1].total - a[1].total;
    })
    .slice(0, 3);

  // State-specific stats
  const stateTotalAnswered = stateAttemptsCount ?? 0;
  const stateTotalCorrect = stateAttemptsCorrectCount ?? 0;
  const stateAccuracy = pct(stateTotalCorrect, stateTotalAnswered);
  const stateCategoryStats = (stateUserCatStats ?? [])
    .map((row): [string, { total: number; correct: number }] => [
      row.category,
      { total: row.total_attempts, correct: row.correct_attempts }
    ])
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);
```

#### 2h. Remover o bloco `weekBuckets` duplicado

Após a substituição acima, o bloco de `weekBuckets` que existia mais abaixo (que usava `allAttempts`) foi substituído pelo novo. Verificar se há um segundo bloco de `weekBuckets` no arquivo e removê-lo para evitar duplicação.

#### 2i. Verificar e remover `AttemptRow` se não mais utilizado

Verificar se `AttemptRow` ainda é referenciado no arquivo. Se `temporalAttemptsResult` usa `Pick<AttemptRow, ...>`, o tipo ainda é necessário. Manter.

**Verificação:** `tsc --noEmit` deve passar. Se `user_category_stats` não foi incluído no `database.types.ts` regenerado e houver erro de tipo no `.from("user_category_stats")`, adicionar a declaração de tipo inline em `database.types.ts`:

```typescript
// Dentro de Tables{}, adicionar:
      user_category_stats: {
        Row: {
          id: string;
          user_id: string;
          country: string;
          state: string;
          category: string;
          total_attempts: number;
          correct_attempts: number;
          last_attempt_at: string | null;
          updated_at: string;
        };
        Insert: Partial<{
          id: string;
          user_id: string;
          country: string;
          state: string;
          category: string;
          total_attempts: number;
          correct_attempts: number;
          last_attempt_at: string | null;
          updated_at: string;
        }>;
        Update: Partial<{
          total_attempts: number;
          correct_attempts: number;
          last_attempt_at: string | null;
          updated_at: string;
        }>;
        Relationships: [];
      };
```

### Commit

```
perf(dashboard): replace 500-row question_attempts scans with user_category_stats (H6)

- Category stats (catStats, weakTopics, stateCategoryStats) now read from the
  pre-aggregated user_category_stats table — no raw-row limit applies
- Temporal analytics (streak, weekBuckets, answeredToday) use a 90-day windowed
  question_attempts query — bounded by date, no hard LIMIT
- Removes the 500-attempt hard cap: active users with >500 attempts now see
  accurate category performance and streak data
- Regenerate database.types.ts to include user_category_stats and other tables
  added since migration 006
```

---

## TASK 26 — H9: Eliminar flash de estado "WA" no MockTestSetupPage

**Problema:** `apps/web/app/mock-test/page.tsx` linha 42:

```typescript
const [selectedState, setSelectedState] = useState<StateCode>("WA");
```

Inicializa com "WA" hardcoded e depois um `useEffect` (linhas ~44-52) lê o `localStorage` e atualiza o estado. Isso causa um flash visível onde o seletor mostra "WA" por um frame antes de mostrar o estado real do usuário.

Adicionalmente, as strings `"kl-state-v2"` e `"kl-state"` são usadas inline no `useEffect` em vez de importar `SK` (que já existe no projeto). `PracticeClient.tsx` já usa `SK.stateV2` corretamente — `mock-test/page.tsx` deve seguir o mesmo padrão.

### Arquivo: `apps/web/app/mock-test/page.tsx`

#### Mudança 1 — Adicionar import de `SK`

Verificar se `SK` já está importado no arquivo. Se não estiver, adicionar após os outros imports:

```typescript
import { SK } from "@/lib/storageKeys";
```

#### Mudança 2 — Substituir `useState` + `useEffect` por lazy initializer

**Localizar e remover** o `useState` + o `useEffect` inteiro de leitura de estado (deve ser o único `useEffect` do componente ou o primeiro deles):

```typescript
  const [selectedState, setSelectedState] = useState<StateCode>("WA");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kl-state-v2") ?? localStorage.getItem("kl-state");
      if (raw && STATE_CODES.includes(raw as StateCode)) {
        setSelectedState(raw as StateCode);
      }
    } catch {
      // localStorage unavailable (SSR guard — this component is "use client" but be safe)
    }
  }, []);
```

**Substituir pelo lazy initializer** (sem `useEffect`):

```typescript
  const [selectedState, setSelectedState] = useState<StateCode>(() => {
    if (typeof window === "undefined") return "WA";
    try {
      const raw = localStorage.getItem(SK.stateV2) ?? localStorage.getItem(SK.stateLegacy);
      if (raw && STATE_CODES.includes(raw as StateCode)) return raw as StateCode;
    } catch {
      // localStorage unavailable
    }
    return "WA";
  });
```

#### Mudança 3 — Persistir estado ao mudar no seletor

Verificar se existe um `onChange` no seletor de estado dentro do `MockTestSetupPage` que já persiste ao `localStorage`. Se existir, certificar que usa `SK.stateV2` (não a string literal). Se não existir handler de persistência, não adicionar — o estado é persistido quando o usuário vai para a sessão de qualquer forma.

### Commit

```
fix(mock-test): lazy-init state from localStorage — eliminate WA flash on setup page (H9)

- Replace useState("WA") + useEffect with a lazy initializer that reads
  localStorage(SK.stateV2 / SK.stateLegacy) synchronously on mount
- Eliminates the single-frame flash where the state selector shows "WA"
  before the user's saved state loads
- Align mock-test/page.tsx with SK constants already used in PracticeClient.tsx
```

---

## TASK 27 — F3.1: Onboarding UX — value proposition e hierarquia visual

**Problema:** A tela de onboarding (`apps/web/src/components/Onboarding.tsx`) é funcionalmente correta (uma única card modal com seleção de estado + idioma) mas carece de hierarquia visual e contexto: o usuário não sabe o que é o KangaLearner antes de ser solicitado a configurar.

**Solução:** Adicionar uma linha de value proposition logo após o h2, melhorar a legibilidade da label do estado e ajustar o sub-heading.

### Arquivo: `apps/web/src/components/Onboarding.tsx`

#### Mudança 1 — Substituir subtítulo genérico por value proposition

Localizar:
```typescript
      <p className="ob-sub">Quick setup — takes 5 seconds.</p>
```

Substituir por:
```typescript
      <p className="ob-sub">Practice questions for your Australian driving learner test — personalised to your state and language.</p>
```

#### Mudança 2 — Melhorar label do grupo de estado

Localizar:
```typescript
        <p className="ob-group-label">I&apos;m studying for:</p>
```

Substituir por:
```typescript
        <p className="ob-group-label">Which state are you getting your licence in?</p>
```

#### Mudança 3 — Adicionar subtexto para estados "coming soon"

Localizar a lista `STATES`:
```typescript
const STATES = [
  { key: "WA", label: "Western Australia" },
  { key: "NSW", label: "New South Wales", soon: true },
  { key: "VIC", label: "Victoria", soon: true },
  { key: "QLD", label: "Queensland", soon: true },
];
```

Substituir por (adiciona NT, SA, TAS, ACT como soon também — alinha com a realidade):
```typescript
const STATES = [
  { key: "WA", label: "Western Australia" },
  { key: "NSW", label: "New South Wales", soon: true },
  { key: "VIC", label: "Victoria", soon: true },
  { key: "QLD", label: "Queensland", soon: true },
  { key: "SA", label: "South Australia", soon: true },
  { key: "TAS", label: "Tasmania", soon: true },
  { key: "ACT", label: "ACT", soon: true },
  { key: "NT", label: "Northern Territory", soon: true },
];
```

#### Mudança 4 — Melhorar label do grupo de idioma

Localizar:
```typescript
        <p className="ob-group-label">Study in:</p>
```

Substituir por:
```typescript
        <p className="ob-group-label">Preferred language:</p>
```

### Commit

```
ux(onboarding): add value proposition, improve labels, show all 8 states (F3.1)

- Replace generic subtitle with a concise value prop sentence
- Improve state-group label to clarify the question
- Add all 8 AU states/territories (7 marked "soon") for completeness
- Improve language-group label wording
```

---

## TASK 28 — F3.3: Mock test guest flow — prévia antes de redirecionar ao login

**Problema:** Em `apps/web/app/mock-test/page.tsx`, quando um usuário não autenticado clica "Start Mock Test", o handler `handleStart` imediatamente redireciona para `/auth/login?redirect=/mock-test/session` sem dar nenhuma explicação do motivo ou valor de criar conta. O usuário perde o contexto do que estava configurando.

**Solução:** Ao clicar Start sem estar autenticado, em vez de redirecionar imediatamente, exibir um banner/modal inline com value proposition e três opções:
1. **Create free account** → `/auth/signup?redirect=/mock-test/session`
2. **Sign in** → `/auth/login?redirect=/mock-test/session`
3. **Continue without saving** → prosseguir diretamente para `/mock-test/session` (resultados não salvos)

### Arquivo: `apps/web/app/mock-test/page.tsx`

#### Mudança 1 — Adicionar estado `showGuestPrompt`

Logo após a declaração de `selectedState`, adicionar:
```typescript
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
```

#### Mudança 2 — Modificar `handleStart` para interceptar guests

Localizar o bloco do `handleStart` que trata o caso de guest:
```typescript
    if (!user) {
      // Guest: persist config to localStorage so the session page can recover it
      // after login redirects back to /mock-test/session
      try {
        localStorage.setItem("mock-config-saved", JSON.stringify(config));
      } catch { /* noop */ }
      // Redirect to login with return URL
      router.push("/auth/login?redirect=/mock-test/session");
      return;
    }
```

Substituir por:
```typescript
    if (!user) {
      // Guest: show value-prop prompt instead of immediate redirect
      try {
        localStorage.setItem("mock-config-saved", JSON.stringify(config));
      } catch { /* noop */ }
      setShowGuestPrompt(true);
      return;
    }
```

#### Mudança 3 — Adicionar `handleContinueAsGuest`

Logo após o `handleStart` function, adicionar:
```typescript
  function handleContinueAsGuest() {
    router.push("/mock-test/session");
  }
```

#### Mudança 4 — Adicionar o banner de guest prompt no JSX

Localizar o elemento de container principal do return JSX (normalmente um `<div>` ou `<main>` envolvendo o formulário). Logo após a abertura desse container, adicionar o banner condicional:

```typescript
      {showGuestPrompt && (
        <div className="guest-prompt-overlay" role="dialog" aria-modal="true" aria-label="Save your results">
          <div className="guest-prompt-card">
            <h3>Save your mock test results</h3>
            <p>Create a free account to track your score, review wrong answers, and see your progress over time.</p>
            <div className="guest-prompt-actions">
              <a href={`/auth/signup?redirect=/mock-test/session`} className="btn btn-primary">
                Create free account
              </a>
              <a href={`/auth/login?redirect=/mock-test/session`} className="btn btn-secondary">
                Sign in
              </a>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleContinueAsGuest}
              >
                Continue without saving
              </button>
            </div>
            <button
              type="button"
              className="guest-prompt-dismiss"
              aria-label="Dismiss"
              onClick={() => setShowGuestPrompt(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
```

#### Mudança 5 — Adicionar estilos CSS em `apps/web/app/globals.css`

No final do arquivo `globals.css`, adicionar as regras para o guest prompt:

```css
/* ── Guest prompt overlay (mock test auth nudge) ── */
.guest-prompt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.guest-prompt-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.guest-prompt-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.guest-prompt-card p {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.guest-prompt-actions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.guest-prompt-dismiss {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  line-height: 1;
}

.guest-prompt-dismiss:hover {
  color: var(--ink);
}
```

### Commit

```
ux(mock-test): show value-prop prompt for guest users instead of immediate login redirect (F3.3)

- Guest clicks Start → inline overlay with value prop and three choices:
  Create account / Sign in / Continue without saving
- Eliminates the abrupt redirect that loses user context
- Config still persisted to localStorage for post-login recovery
- Guest can choose to continue directly to /mock-test/session
```

---

## TASK 29 — F3.8: Tokenizar border-radius hardcoded no globals.css

**Problema:** `apps/web/app/globals.css` mistura valores tokenizados (`var(--radius-sm)`) com valores hardcoded (`18px`, `12px`, `11px`, `4px`, `99px`, `999px`). Tokens existentes: `--radius-sm: 10px`, `--radius-md: 16px`, `--radius-lg: 22px`, `--radius-xl: 32px`.

### Arquivo: `apps/web/app/globals.css`

#### Mudança 1 — Adicionar novos tokens na seção `:root`

Localizar a seção dos tokens de border-radius (onde estão `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`) e adicionar dois novos tokens logo após `--radius-sm`:

```css
  --radius-xs: 4px;
  --radius-pill: 999px;
```

Após a adição, a sequência deve ficar:
```css
  --radius-xs: 4px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-pill: 999px;
```

#### Mudança 2 — Substituir todos os valores hardcoded

Executar as substituições abaixo. Usar `replace_all: true` para cada valor.

| Valor hardcoded | Substituir por | Observação |
|-----------------|----------------|-----------|
| `border-radius: 999px` | `border-radius: var(--radius-pill)` | Pill buttons |
| `border-radius: 99px` | `border-radius: var(--radius-pill)` | Pill buttons (variante) |
| `border-radius: 4px` | `border-radius: var(--radius-xs)` | Cantos sutis |
| `border-radius: 18px` | `border-radius: var(--radius-md)` | Próximo de --radius-md=16px |
| `border-radius: 12px` | `border-radius: var(--radius-sm)` | Entre sm e md, usar sm |
| `border-radius: 11px` | `border-radius: var(--radius-sm)` | Próximo de --radius-sm=10px |

**Não substituir `border-radius: 50%`** — é um valor semântico para círculos perfeitos.

**Não substituir valores já tokenizados** (`var(--radius-sm)`, `var(--radius-md)`, etc.).

#### Verificação

Após as substituições, fazer grep no arquivo para confirmar que não restam valores hardcoded de border-radius (exceto `50%`):

```bash
grep "border-radius:" apps/web/app/globals.css | grep -v "var(--" | grep -v "50%"
```

O resultado deve estar vazio.

### Commit

```
style(css): tokenize all hardcoded border-radius values in globals.css (F3.8)

- Add --radius-xs: 4px and --radius-pill: 999px to :root token set
- Replace 6 hardcoded border-radius values (4px, 11px, 12px, 18px, 99px, 999px)
  with semantic tokens throughout globals.css
- 50% (circles) retained as-is — semantic value, not a radius size
```

---

## TASK 30 — F3.9: Persistir estado selecionado no dashboard para `profiles.preferred_state`

**Problema:** `StateProgressSelector` em `apps/web/app/dashboard/StateProgressSelector.tsx` ao mudar de estado faz `router.push('/dashboard?state=...')`. O `DashboardPage` (server component) lê `preferred_state` do `profiles` e usa o URL param como override — mas **nunca salva de volta** quando o usuário seleciona um estado diferente via URL. Na próxima visita sem URL param, o estado reverte para o valor antigo no DB.

**Prova:** Em `apps/web/app/dashboard/page.tsx`:
- `loadPreferredState()` lê `profiles.preferred_state`
- `selectedState = normalizeAuState(firstSearchParam(params.state)) ?? preferredState` — URL param sobrescreve DB
- Mas se `params.state` ≠ `preferredState`, nada persiste o novo valor

**Solução:** No `DashboardPage` server component, imediatamente após calcular `selectedState`, se o URL param especifica um estado diferente do DB, salvar `profiles.preferred_state` em background (fire-and-forget com await mas sem bloquear o render se falhar).

**Nota:** A coluna `preferred_state` já existe no live DB — confirmado em `database.types.ts` Row para `profiles`.

### Arquivo: `apps/web/app/dashboard/page.tsx`

#### Mudança — Adicionar auto-save após calcular `selectedState`

Localizar estas linhas:
```typescript
  const preferredState = await loadPreferredState(supabase!, user.id);
  const selectedState: AuStateCode =
    normalizeAuState(firstSearchParam(params.state)) ?? preferredState;
  const selectedStateName =
    AU_STATE_OPTIONS.find((state) => state.code === selectedState)?.name ?? selectedState;
```

Substituir por:
```typescript
  const preferredState = await loadPreferredState(supabase!, user.id);
  const selectedState: AuStateCode =
    normalizeAuState(firstSearchParam(params.state)) ?? preferredState;
  const selectedStateName =
    AU_STATE_OPTIONS.find((state) => state.code === selectedState)?.name ?? selectedState;

  // Auto-persist preferred state when user explicitly navigates to a different state
  if (params.state && selectedState !== preferredState) {
    const { error: prefStateErr } = await supabase!
      .from("profiles")
      .update({ preferred_state: selectedState })
      .eq("id", user.id);
    if (prefStateErr) console.error("Dashboard preferred_state update failed", errCode(prefStateErr));
  }
```

**Sem outras mudanças** — nenhuma mudança em `StateProgressSelector.tsx`.

### Commit

```
feat(dashboard): auto-persist preferred_state when user navigates to different state (F3.9)

- DashboardPage server component: if URL ?state= param differs from DB preferred_state,
  update profiles.preferred_state immediately
- Pure server-side fix — no client state management changes needed
- Next visit without ?state= param will now show the last explicitly selected state
```

---

## TASK 31 — M12/F2.10: Remover dependência morta `@stripe/stripe-js`

**Problema:** `apps/web/package.json` declara `@stripe/stripe-js` como dependência, mas a biblioteca **nunca é importada** em nenhum arquivo da aplicação (`apps/web/`). O Stripe frontend SDK foi adicionado antecipadamente mas não será usado — o Stripe está pausado e a integração é server-side only via webhook handler.

**Confirm zero imports:**

```bash
grep -r "@stripe/stripe-js\|loadStripe" apps/web/src apps/web/app --include="*.ts" --include="*.tsx"
```

O resultado deve estar **vazio**. Se não estiver, NÃO prosseguir e reportar o que foi encontrado.

### Arquivo: `apps/web/package.json`

Localizar e remover a linha de `@stripe/stripe-js` nas `dependencies`. O formato exato pode variar, mas deve ser algo como:

```json
    "@stripe/stripe-js": "^3.x.x",
```

Após remover a linha, executar:

```bash
pnpm install --filter @kanga/web
```

Para atualizar o `pnpm-lock.yaml`.

### Commit

```
chore(deps): remove unused @stripe/stripe-js frontend SDK (M12)

- @stripe/stripe-js was added speculatively but is never imported
- Stripe integration is server-side only (webhook handler at /api/webhook/stripe)
- Frontend SDK is not needed — remove to keep bundle clean
```

---

## CHECKLIST FINAL

Após todas as 7 tasks:

```bash
# TypeScript — zero erros obrigatório
pnpm --filter @kanga/web exec tsc --noEmit

# Build completo
pnpm --filter @kanga/web run build

# Confirmar remoção da dependência stripe-js
grep "@stripe/stripe-js" apps/web/package.json
# Deve retornar vazio

# Confirmar sem border-radius hardcoded no globals.css (exceto 50%)
grep "border-radius:" apps/web/app/globals.css | grep -v "var(--" | grep -v "50%"
# Deve retornar vazio

# Push para origin/main
git push origin main
```

Se `tsc` ou `build` falhar: corrigir antes do push. Não deixar CI vermelho.

### Nota sobre F3.10 (currentPwd)

A issue F3.10 ("currentPwd coletado mas ignorado") foi verificada e **está resolvida** na versão atual de `apps/web/app/account/page.tsx` — o campo `currentPwd` não existe no formulário de segurança. Nenhuma action necessária.
