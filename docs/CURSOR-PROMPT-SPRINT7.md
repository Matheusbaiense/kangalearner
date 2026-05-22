# Cursor Prompt — Sprint 7: P0 Critical Bugs + Questions Lazy Load

> Gerado por Claude em 2026-05-22 (actualizado após relatório multi-agente Cursor).
> Execute as tasks em sequência por prioridade.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task e corrija qualquer erro.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`, `supabase/migrations/`
- TypeScript strict. Sem `any` novo. Sem `console.log` novo.
- Supabase project ref: `olgogtaeifyxwzencilo`
- Rate limiter centralizado em `apps/web/src/lib/rateLimit.ts`
- `@kanga/core` = `packages/core/src/index.ts`
- **Passmark correcto:** `WA_PASS_MIN_CORRECT = 24` (24/30 = 80%)
- **Total de questões reais em core:** 69

---

## TASK 35 — Fix: "Continue without saving" → middleware bloqueia mock guest (P0 CRÍTICO)

**Problema:** O componente guest-prompt em `/mock-test` tem um botão "Continue without saving"
que navega para `/mock-test/session`. Mas `middleware.ts` inclui `/mock-test/session` em
`PROTECTED_ROUTES` → redirect imediato para login. A promessa "continue sem conta" é falsa.

**Fix correcto:** Remover `/mock-test/session` e `/mock-test/results` de `PROTECTED_ROUTES`.
Garantir que `session/page.tsx` funciona sem sessão (guarda apenas em `useState`; sem Supabase saves).
Mostrar banner no final da sessão guest a convidar registo.

### Passo 1 — `apps/web/src/middleware.ts`

Localizar:
```typescript
const PROTECTED_ROUTES = [
  "/progress",
  "/dashboard",
  "/account",
  "/admin",
  "/mock-test/session",
  "/mock-test/results"
];
```

Remover as duas linhas do mock-test:
```typescript
const PROTECTED_ROUTES = [
  "/progress",
  "/dashboard",
  "/account",
  "/admin",
];
```

### Passo 2 — `apps/web/app/mock-test/session/page.tsx`

O componente já importa `useSession` ou faz fetch de `supabase.auth.getUser()`.
Localizar onde a sessão é obtida e onde os resultados são gravados no Supabase.

#### 2a — Tornar a gravação condicional (não obrigatória)

Localizar o bloco que guarda o resultado da sessão (POST para `/api/mock-sessions`).
Envolvê-lo numa condição `if (user)`:

```typescript
// Gravar resultado — apenas se autenticado
if (user) {
  await fetch("/api/mock-sessions", {
    method: "POST",
    // ... resto do payload
  });
}
```

#### 2b — Banner pós-sessão para convidados

No ecrã de resultados inline (se existir dentro de `session/page.tsx`) ou ao fim do quiz,
adicionar banner condicional quando não há sessão:

```tsx
{!user && (
  <div className="guest-save-banner">
    <p>
      <strong>Want to track your progress?</strong>{" "}
      Create a free account to save results and see your improvement over time.
    </p>
    <a href="/auth/signup" className="btn btn-primary btn-sm">
      Sign up free
    </a>
  </div>
)}
```

CSS para adicionar no final de `globals.css`:
```css
.guest-save-banner {
  background: var(--color-surface-alt, #f0f4ff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
```

### Passo 3 — `apps/web/app/mock-test/results/page.tsx`

Verificar se `/mock-test/results` também precisa de sessão para exibir dados.
Se os resultados vêm de `searchParams` ou `localStorage` (e não de Supabase), nenhuma mudança extra.
Se faz fetch de `/api/mock-sessions/:id`, garantir fallback gracioso para convidados:

```typescript
// Se não há user, não tentar fetch do Supabase — mostrar resultados do estado local
if (!user) {
  // usar dados passados por searchParams ou localStorage
}
```

### Verificação

```bash
# Confirmar que /mock-test/session não está em PROTECTED_ROUTES
grep "mock-test" apps/web/src/middleware.ts

# TypeScript
pnpm --filter @kanga/web exec tsc --noEmit
```

### Commit

```
fix(middleware): allow guest access to mock-test/session + results (P0)

- Remove /mock-test/session and /mock-test/results from PROTECTED_ROUTES
- Mock session save is now conditional on user being authenticated
- Add guest save-banner after quiz completion prompting sign-up
- "Continue without saving" now works as advertised
```

---

## TASK 36 — Fix: CI scripts quebrados (P0)

**Problema:** `.github/workflows/build.yml` tem dois steps que falham silenciosamente ou quebram o CI:
1. Linha 37: `pnpm run format:check` — script não existe no `package.json` raiz (só existe `format`)
2. Linha 69: `pnpm run validate:questions` — referencia `assets/js/data/questions.js` que foi removido

### Passo 1 — `package.json` (raiz)

Localizar o bloco `"scripts"`. Adicionar o script `format:check` em falta:

```json
"format:check": "prettier --check .",
```

**Atenção:** verificar se `prettier` está nas `devDependencies` da raiz. Se não estiver, está em
`apps/web/package.json` e o comando deve ser:
```json
"format:check": "prettier --check \"apps/web/**/*.{ts,tsx,css}\" --no-error-on-unmatched-pattern",
```

### Passo 2 — `.github/workflows/build.yml`

Localizar o step `validate:questions` (linha ~69). Substituir ou remover:

```yaml
# ANTES (morto — path não existe):
- name: Validate questions
  run: pnpm run validate:questions

# DEPOIS (conta questões em packages/core como smoke test):
- name: Validate questions (core)
  run: |
    COUNT=$(grep -c '"id":' packages/core/src/data/questions.ts)
    echo "Questions in core: $COUNT"
    if [ "$COUNT" -lt 50 ]; then
      echo "ERROR: Expected at least 50 questions, got $COUNT"
      exit 1
    fi
```

### Passo 3 — Root `.env.example` (cleanup)

Abrir `.env.example` na raiz (não o de `apps/web`). Remover qualquer linha com `VITE_` que seja legado do site estático.
Substituir por um comentário:
```
# Root .env.example — not used. See apps/web/.env.example for all required env vars.
```

### Commit

```
ci: fix broken format:check + validate:questions scripts (P0)

- Add format:check script to root package.json
- Replace dead validate:questions step (assets/js path) with core question count check
- Clean root .env.example of legacy VITE_* entries
```

---

## TASK 37 — Fix: Middleware matcher Stripe webhook (P1)

**Problema:** `middleware.ts` linha 128:
```typescript
matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/webhooks).*)"]
```
Exclui `api/webhooks` (plural), mas a rota Stripe está em `api/webhook/stripe` (singular).
Resultado: o webhook Stripe passa pelo middleware, que tenta verificar sessão Supabase em cada request.
Embora provavelmente não bloqueie (retorna 200 sem redirect), adiciona latência e é incorrecto.

### Fix — `apps/web/src/middleware.ts`

Localizar a linha do `matcher`. Adicionar `api/webhook` (singular) à lista de exclusões:

```typescript
// ANTES
matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/webhooks).*)"]

// DEPOIS
matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/webhook|api/webhooks).*)"]
```

### Commit

```
fix(middleware): exclude api/webhook from matcher — Stripe at /api/webhook/stripe (P1)

- Matcher was excluding api/webhooks (plural) but Stripe route is api/webhook/stripe
- Both variants now excluded to handle current and future webhook paths
```

---

## TASK 38 — Fix: Passmark copy inconsistente (P1)

**Problema:** Core define `WA_PASS_MIN_CORRECT = 24` (24/30 = 80%).
O relatório multi-agente Cursor encontrou referências a "26/30" em algum lugar da UI
(provavelmente no setup/intro do mock test).

### Passo 1 — Localizar ocorrência de 26/30

```bash
grep -rn "26/30\|26 out of 30\|26 correct\|need 26" apps/web/ --include="*.tsx" --include="*.ts"
```

### Passo 2 — Substituir pela constante correcta

Onde for encontrado "26/30" ou "you need 26 correct answers":
- Substituir pelo valor de `WA_PASS_MIN_CORRECT` importado de `@kanga/core`
- Ou usar copy: "You need **24/30** (80%) to pass — same as the real test."

### Passo 3 — Verificar i18n

Procurar nos blocos `en`, `pt`, `es` de `i18n.ts` por qualquer número específico de questões
que não seja 30 (total) ou 24 (mínimo). Corrigir onde necessário.

### Commit

```
fix(mock-test): unify passmark copy to 24/30 — matches WA_PASS_MIN_CORRECT constant (P1)
```

---

## TASK 39 — Fix: README e documentação morta (cleanup)

**Problema:** README.md ainda tem badge de GitHub Pages (removido); referências a `assets/js`.

### Passo 1 — README.md (raiz)

Localizar e remover/substituir:
1. Badge `[![GitHub Pages](...)` → substituir por badge Vercel se disponível, ou remover
2. Qualquer menção a `assets/js/`, `index.html`, `serve`, `static site`
3. Secção de instrução que mencione `pnpm validate:questions` (desactualizado)

Manter apenas informação do monorepo Turborepo, apps/web, e como correr localmente.

### Commit

```
docs: remove GitHub Pages badge + dead static-site references from README
```

---

## TASK 40 — Perf: Extract questions.json + criar hook useQuestions (F4.1)

**Contexto:** `packages/core/src/data/questions.ts` tem 69 questões (~110 KB) e é importado
em 4 Client Components — está inline no bundle do cliente inflando o JS inicial.

### Passo 1 — Gerar questions.json

Adicionar script ao `package.json` raiz:
```json
"gen:questions-json": "tsx -e \"import { QUESTIONS } from './packages/core/src/index.ts'; import { writeFileSync, mkdirSync } from 'fs'; mkdirSync('apps/web/public/data', { recursive: true }); writeFileSync('apps/web/public/data/questions.json', JSON.stringify(QUESTIONS));\""
```

Executar:
```bash
pnpm gen:questions-json
```

Verificar criação de `apps/web/public/data/questions.json`.

### Passo 2 — Criar `apps/web/src/hooks/useQuestions.ts`

```typescript
"use client";

import { useState, useEffect } from "react";
import type { Question } from "@kanga/core";

const QUESTIONS_VERSION = "v1";
const CACHE_KEY = `kl-questions-${QUESTIONS_VERSION}`;

let _inFlight: Promise<Question[]> | null = null;
let _resolved: Question[] | null = null;

async function fetchQuestions(): Promise<Question[]> {
  if (_resolved !== null) return _resolved;
  if (_inFlight !== null) return _inFlight;

  _inFlight = (async () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Question[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          _resolved = parsed;
          return parsed;
        }
      }
    } catch { /* ignore */ }

    const res = await fetch("/data/questions.json");
    if (!res.ok) throw new Error(`Failed to load questions: ${res.status}`);
    const data = (await res.json()) as Question[];

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch { /* localStorage full */ }

    _resolved = data;
    return data;
  })();

  return _inFlight;
}

export function useQuestions(): { questions: Question[]; loading: boolean } {
  const [questions, setQuestions] = useState<Question[]>(_resolved ?? []);
  const [loading, setLoading] = useState(_resolved === null);

  useEffect(() => {
    if (_resolved !== null) return;
    let cancelled = false;
    fetchQuestions()
      .then((data) => { if (!cancelled) { setQuestions(data); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { questions, loading };
}

export { fetchQuestions as loadQuestions };
```

### Commit para T40

```
perf(core): extract questions to /public/data/questions.json + add useQuestions hook (F4.1)

- Add gen:questions-json script (tsx)
- Generate apps/web/public/data/questions.json (69 questions, ~110 KB)
- Create apps/web/src/hooks/useQuestions.ts with localStorage cache + module-level dedup
```

---

## TASK 41 — Perf: Actualizar os 4 consumers + migrateLocalAttempts (F4.1)

### 41.1 — `apps/web/app/mock-test/session/page.tsx`

```typescript
// Remover QUESTIONS do import de @kanga/core
import { useQuestions } from "@/hooks/useQuestions";

// No topo do componente:
const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();

// Antes do return principal:
if (questionsLoading) return <div className="page-loading"><div className="spinner" /></div>;
```

CSS (se não existir em globals.css):
```css
.page-loading { display:flex; align-items:center; justify-content:center; min-height:60vh; }
.spinner { width:2.5rem; height:2.5rem; border:3px solid var(--color-border,#e5e7eb);
           border-top-color:var(--color-primary,#2563eb); border-radius:50%;
           animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
```

### 41.2 — `apps/web/app/practice/PracticeClient.tsx`

```typescript
import { useQuestions } from "@/hooks/useQuestions";
const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
if (questionsLoading) return <div className="page-loading"><div className="spinner" /></div>;
// A linha `const QS = QUESTIONS as unknown as Question[]` pode simplificar para:
// const QS = QUESTIONS; // já é Question[]
```

### 41.3 — `apps/web/app/mock-test/results/page.tsx`

```typescript
import { useQuestions } from "@/hooks/useQuestions";
const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
// Graceful degradation — não bloquear render enquanto carrega
const q = questionsLoading ? null : (QUESTIONS.find((x) => x.id === qid) ?? null);
```

### 41.4 — `apps/web/app/progress/page.tsx`

```typescript
import { useQuestions } from "@/hooks/useQuestions";
const { questions: QUESTIONS, loading: questionsLoading } = useQuestions();
const totalQs = questionsLoading ? 0 : QUESTIONS.length;
const q = questionsLoading ? null : QUESTIONS.find((x) => x.id === qid);
```

### 41.5 — `apps/web/src/lib/migrateLocalAttempts.ts`

```typescript
// Remover import { QUESTIONS } from "@kanga/core"
import { loadQuestions } from "@/hooks/useQuestions";

// Tornar a função async:
export async function migrateLocalAttempts(...): Promise<...> {
  const QUESTIONS = await loadQuestions();
  // ... resto igual
}

// Actualizar chamador (provavelmente useEffect):
void migrateLocalAttempts(...); // fire-and-forget
```

### Verificação Final

```bash
pnpm --filter @kanga/web exec tsc --noEmit
pnpm --filter @kanga/web run build

# Confirmar zero imports directos de QUESTIONS em client components
grep -rn 'QUESTIONS' apps/web/app/ | grep -v "useQuestions\|loadQuestions\|// "
# Deve retornar vazio (ou só comentários)

git push origin main
```

### Commit para T41

```
perf(web): replace QUESTIONS static import with useQuestions hook in all client components (F4.1)

- mock-test/session, practice/PracticeClient: spinner while loading
- mock-test/results, progress: graceful degradation (null while loading)
- migrateLocalAttempts: async, uses loadQuestions()
- Bundle reduction: ~110 KB per route chunk using quiz/practice
```

---

## CHECKLIST SPRINT 7

```bash
# T35: middleware sem mock-test em protected
grep "mock-test" apps/web/src/middleware.ts

# T36: scripts existem
node -e "const p=require('./package.json'); console.log(p.scripts['format:check'], p.scripts['gen:questions-json'])"

# T37: matcher inclui api/webhook
grep "matcher" apps/web/src/middleware.ts

# T38: passmark 24/30 consistente
grep -rn "26/30\|need 26" apps/web/app/

# T40/T41: questões não importadas directamente em client components
grep -rn 'import.*QUESTIONS.*@kanga/core' apps/web/app/

# TypeScript limpo
pnpm --filter @kanga/web exec tsc --noEmit

# Build
pnpm --filter @kanga/web run build

# Push
git push origin main
```
