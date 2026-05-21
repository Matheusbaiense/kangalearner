# Cursor Prompt — Sprint 2: Qualidade de Código + UX Pendente

**Data:** 2026-05-21  
**Responsável por execução:** Cursor  
**Responsável por prompts/infra:** Claude  
**Branch alvo:** `main`  
**Commit de referência:** `d3e96da` (atual HEAD)

---

## Contexto do projeto

Monorepo Turborepo:
- `apps/web` — Next.js 15 App Router, Supabase SSR, Stripe
- `packages/core` — shared types/constants (`@kanga/core`), importado em `apps/web/package.json` como `"@kanga/core": "workspace:*"`
- `apps/web/src/lib/i18n.ts` — i18n com `Lang = "en" | "pt" | "es" | "pt-en" | "es-en"`, `UiLang = "en" | "pt" | "es"`, objeto `t` com 3 traduções
- `apps/web/src/contexts/LangContext.tsx` — provê `useLang()` → `{ uiLang, s, lang, setLang, isBilingual }`

Sprint 1 (Tasks 1–11) já executado. Não re-fazer nada do Sprint 1.

---

## Task 12 — B6: Usar `WA_PASS_THRESHOLD` de `@kanga/core` no mock-sessions route

**Arquivo:** `apps/web/app/api/mock-sessions/route.ts`

**Problema:** A linha 67 usa o literal hardcoded `0.8` para calcular `passed`. O valor correto deve vir do pacote `@kanga/core` via `WA_PASS_THRESHOLD` (atualmente `0.80`). Centralizar garante que qualquer mudança futura no threshold só precise ocorrer em um lugar.

**Mudanças exatas:**

1. Adicionar import no topo do arquivo (após os imports existentes de `next/server`, `@supabase/ssr`, `@/lib/rateLimit`):
```typescript
import { WA_PASS_THRESHOLD } from "@kanga/core";
```

2. Substituir na linha 67:
```typescript
// ANTES:
const passed = total > 0 && score / total >= 0.8;

// DEPOIS:
const passed = total > 0 && score / total >= WA_PASS_THRESHOLD;
```

**Nenhuma outra alteração.** O arquivo inteiro deve permanecer exatamente igual exceto por essas 2 mudanças.

**Verificação:** `packages/core/src/index.ts` linha 1: `export const WA_PASS_THRESHOLD = 0.80;` — confirmar que o import resolve corretamente.

---

## Task 13 — U6: Adicionar modos bilíngues à tela de Onboarding

**Arquivo:** `apps/web/src/components/Onboarding.tsx`

**Problema:** O array `LANGS` só tem 3 opções (`en`, `pt`, `es`), mas o sistema de i18n suporta 5 modos: `en`, `pt`, `es`, `pt-en` (Português + subtítulo em inglês nas questões), `es-en` (Español + subtítulo em inglês nas questões). O SiteNav já exibe todos os 5 modos. O Onboarding precisa oferecer os mesmos.

**Estado atual do arquivo (linhas 19–25):**
```typescript
const LANGS = [
  { key: "en", label: "English" },
  { key: "pt", label: "Português" },
  { key: "es", label: "Español" },
];

const GO_LABEL: Record<string, string> = { en: "Let's go!", pt: "Vamos!", es: "¡Vamos!" };
```

**Mudanças exatas:**

1. Substituir o array `LANGS`:
```typescript
const LANGS = [
  { key: "en",    label: "English" },
  { key: "pt",    label: "Português" },
  { key: "es",    label: "Español" },
  { key: "pt-en", label: "Português + EN" },
  { key: "es-en", label: "Español + EN" },
];
```

2. Substituir `GO_LABEL`:
```typescript
const GO_LABEL: Record<string, string> = {
  en: "Let's go!",
  pt: "Vamos!",
  es: "¡Vamos!",
  "pt-en": "Vamos!",
  "es-en": "¡Vamos!",
};
```

**Nenhuma outra alteração.** O type `Lang` já inclui `"pt-en"` e `"es-en"` (em `@/lib/i18n.ts`), o `lang` state já é tipado como `Lang`, e o `setLang(l.key as Lang)` no JSX continuará funcionando.

---

## Task 14 — U10: Criar páginas placeholder `/about` e `/contact`

**Problema:** O rodapé (`apps/web/src/components/layout/Footer.tsx`) tem links para `/about` e `/contact` em `COMPANY_LINKS`, mas essas rotas não existem → 404. As rotas `/terms` e `/privacy` já existem como placeholders mínimos. Criar o mesmo padrão para `/about` e `/contact`.

**Referência de padrão** (`apps/web/app/privacy/page.tsx`):
```tsx
import Link from "next/link";

export const metadata = { title: "Privacy — KangaLearner" };

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        Privacy
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        {/* placeholder text */}
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
```

**Arquivo 1: `apps/web/app/about/page.tsx`** (criar novo):
```tsx
import Link from "next/link";

export const metadata = { title: "About — KangaLearner" };

/** Página placeholder; substituir por conteúdo real antes do lançamento público. */
export default function AboutPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        About KangaLearner
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        KangaLearner helps learner drivers in Australia prepare for their official learner test —
        with practice questions, mock exams and multilingual support. Currently available for
        Western Australia (WA). More states coming soon.
      </p>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Content is structured from public WA government sources. Always confirm rules with the
        Department of Transport before your test.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
```

**Arquivo 2: `apps/web/app/contact/page.tsx`** (criar novo):
```tsx
import Link from "next/link";

export const metadata = { title: "Contact — KangaLearner" };

/** Página placeholder; substituir por formulário ou email de contato real. */
export default function ContactPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        Contact
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Have a question, found an error in a question, or want to suggest a feature? We'd love to
        hear from you.
      </p>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Contact options and a support form are coming soon. In the meantime, reach out via the
        newsletter form in the footer and we'll get back to you.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
```

**Verificação:** Após criar, confirmar que `apps/web/app/about/` e `apps/web/app/contact/` existem com `page.tsx` dentro de cada uma.

---

## Task 15 — H13: Remover `as any` no mock-test — usar tipos do `database.types.ts`

**Arquivos:** 
- `apps/web/app/mock-test/session/page.tsx`
- `apps/web/app/mock-test/results/page.tsx`

**Problema:** Esses arquivos usam `as any` para contornar tipos desatualizados do `mock_sessions`. O `database.types.ts` foi regenerado em 2026-05-21 (post migration 016) e agora inclui todos os campos corretos.

**Ação:**

1. Ler `apps/web/app/mock-test/session/page.tsx` inteiro
2. Ler `apps/web/app/mock-test/results/page.tsx` inteiro
3. Identificar cada ocorrência de `as any` relacionada a tipos do Supabase ou mock sessions
4. Substituir por tipos corretos usando `Tables<"mock_sessions">` de `@/lib/supabase/database.types.ts`:
   ```typescript
   import type { Tables } from "@/lib/supabase/database.types";
   type MockSession = Tables<"mock_sessions">;
   // id: number, mode: string, passed: boolean, answers: Json, etc.
   ```
5. Se algum campo não existe no Row (ex: campos que o código insere mas não lê), usar `Insert<"mock_sessions">` ou `Update<"mock_sessions">` conforme o contexto

**Regra:** Nunca usar `as any` quando existe um tipo disponível. Se um tipo genuinamente não pode ser inferido, usar `unknown` + narrowing.

**Importante:** NÃO alterar lógica de negócio, apenas tipos. Se um `as any` estiver cobrindo um bug real de tipo (campo faltando), corrigir o tipo — não o ignorar.

---

## Task 16 — H15: Bloquear leak de mensagens internas de erro do Supabase

**Arquivo:** `apps/web/app/api/admin/users/route.ts`

**Problema:** Respostas de erro podem expor detalhes internos do Supabase (ex: `error.message` ou `error.code`) diretamente ao cliente, o que facilita fingerprinting da infraestrutura.

**Ação:**

1. Ler o arquivo completo
2. Identificar todos os lugares onde `error.message`, `error.code` ou `error.details` são retornados na resposta JSON para o cliente
3. Para cada um:
   - Manter o log interno (`console.error("[admin/users]", error.code, error.message)`)
   - Substituir o valor retornado ao cliente por uma string genérica:
     ```typescript
     // ANTES:
     return NextResponse.json({ error: error.message }, { status: 500 });
     
     // DEPOIS:
     console.error("[admin/users] operation failed:", error.code, error.message);
     return NextResponse.json({ error: "internal_error" }, { status: 500 });
     ```
4. **Não mudar** os códigos de erro que já são genéricos como `"unauthorized"`, `"invalid_payload"`, `"too_many_requests"` — esses estão corretos

**Arquivo de newsletter:** `apps/web/app/api/newsletter/route.ts` — já está correto (retorna `"subscribe_failed"` genérico). Não alterar.

---

## Instruções gerais para o Cursor

1. **Fazer os tasks em ordem** (12 → 13 → 14 → 15 → 16)
2. **Commit separado por task** com mensagem convencional:
   - Task 12: `fix(backend): usar WA_PASS_THRESHOLD de @kanga/core no mock-sessions`
   - Task 13: `feat(ux): adicionar modos pt-en e es-en ao Onboarding`
   - Task 14: `feat(pages): criar placeholders /about e /contact`
   - Task 15: `fix(types): remover as any em mock-test usando database.types.ts`
   - Task 16: `fix(security): bloquear leak de erro interno em admin/users`
3. **Não modificar** nenhum arquivo que não esteja listado explicitamente em cada task
4. **Não instalar** pacotes novos — todos os imports são de dependências já existentes
5. **Após cada task**, verificar que `pnpm run build` não quebra (ou pelo menos que não há erros de TypeScript novos)
