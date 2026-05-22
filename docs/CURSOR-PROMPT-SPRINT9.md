# Cursor Prompt — Sprint 9: SEO Técnico + Hero Copy WA-First (M1 + M2 parcial)

> Gerado por Claude em 2026-05-22 (fase M1 do plano de marketing).
> Execute as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task.
> Faça push para `origin/main` ao final.

---

## CONTEXT GLOBAL

- Monorepo Turborepo: `apps/web` (Next.js 15 App Router), `packages/core`
- Sprint 8 concluído: route group `(main)` activo — páginas em `app/(main)/`, auth em `app/auth/`
- Root layout mínimo: `apps/web/app/layout.tsx` (só html + body + fonts + LangProvider)
- domínio canónico: `https://kangalearner.com.au`
- Mercado actual: **Western Australia** (WA) — outros estados em expansão futura
- **Questões actuais:** 69 (WA). Expansão para 300+ quando outros estados forem adicionados.
  → NUNCA usar "300+" como número actual. Usar copy preciso: "all WA road rule topics".
- `learnTopics.ts` em `apps/web/src/lib/learnTopics.ts` — 14 tópicos com `slug`, `title`, `summary` em en/pt/es

---

## TASK 49 — SEO: Metadata WA-first no root layout (M1.1)

**Problema:** `apps/web/app/layout.tsx` tem title genérico sem WA, sem keywords,
sem canonical, sem Open Graph completo.

### Fix — `apps/web/app/layout.tsx`

Substituir o bloco `export const metadata` actual por:

```typescript
export const metadata: Metadata = {
  title: {
    default: "KangaLearner — WA Learner Test Practice",
    template: "%s | KangaLearner"
  },
  description:
    "Free WA learner licence test practice in English, Portuguese and Spanish. " +
    "Covers all road rule topics: signs, speed limits, give way, alcohol laws and more. " +
    "Used by immigrants in Perth preparing for the DoT learner test.",
  keywords: [
    "WA learner test",
    "Western Australia driving test",
    "Perth learner licence",
    "learner test practice WA",
    "driving test WA",
    "learner licence WA",
    "prova de habilitação WA",
    "examen de manejo WA",
    "practice learner test Perth",
    "immigrant driving test Australia"
  ],
  authors: [{ name: "KangaLearner" }],
  creator: "KangaLearner",
  alternates: {
    canonical: "https://kangalearner.com.au"
  },
  openGraph: {
    title: "KangaLearner — Pass Your WA Learner Test",
    description:
      "Practice all WA learner test topics in English, Portuguese or Spanish. Free mock test — same format as the real DoT test.",
    type: "website",
    url: "https://kangalearner.com.au",
    siteName: "KangaLearner",
    locale: "en_AU"
  },
  twitter: {
    card: "summary_large_image",
    title: "KangaLearner — WA Learner Test Practice",
    description: "Free WA learner test in 3 languages. Pass first time."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
};
```

**Não alterar** `viewport`, `icons`, ou o corpo do componente `RootLayout`.

### Commit

```
seo(layout): WA-specific metadata — title template, keywords, canonical, OG (M1.1)
```

---

## TASK 50 — SEO: sitemap.ts dinâmico (M1.2)

Criar novo arquivo `apps/web/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { LEARN_TOPICS } from "@/lib/learnTopics";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kangalearner.com.au";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/learn`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/practice`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/mock-test`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/resources`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`,              lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/contact`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const learnRoutes: MetadataRoute.Sitemap = LEARN_TOPICS.map((t) => ({
    url: `${base}/learn/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...learnRoutes];
}
```

**Verificação:**

```bash
# Confirmar que a rota /sitemap.xml responde (em dev)
curl http://localhost:3000/sitemap.xml | head -20

# TypeScript
pnpm --filter @kanga/web exec tsc --noEmit
```

### Commit

```
seo: add dynamic sitemap.ts — static routes + all 14 learn topic slugs (M1.2)
```

---

## TASK 51 — SEO: robots.ts (M1.3)

Criar novo arquivo `apps/web/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/account/",
          "/progress/",
          "/auth/",
        ],
      },
    ],
    sitemap: "https://kangalearner.com.au/sitemap.xml",
  };
}
```

### Commit

```
seo: add robots.ts — disallow private routes, link sitemap (M1.3)
```

---

## TASK 52 — SEO: JSON-LD structured data (M1.4)

Adicionar script JSON-LD ao `apps/web/app/layout.tsx`.

Na função `RootLayout`, adicionar dentro do `<head>` virtual do Next.js.
No App Router, o JSON-LD vai directamente no `<body>` antes de `{children}`:

```tsx
// No RootLayout, adicionar ANTES de {children}:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "KangaLearner",
      url: "https://kangalearner.com.au",
      description:
        "WA learner driving test practice in English, Portuguese and Spanish. " +
        "Covers all road rule topics aligned with the DoT WA Learner Licence test.",
      applicationCategory: "EducationApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AUD",
        availability: "https://schema.org/InStock"
      },
      inLanguage: ["en", "pt", "es"],
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Western Australia",
        containedInPlace: { "@type": "Country", name: "Australia" }
      },
      audience: {
        "@type": "Audience",
        audienceType: "Immigrants and new residents in Western Australia"
      }
    })
  }}
/>
```

**Atenção:** O `<script>` vai dentro de `<body>` (antes de `{children}`), não no `<head>`.
No Next.js App Router, metadata/script em `<head>` é gerido pela própria framework —
JSON-LD via `dangerouslySetInnerHTML` deve estar no `<body>`.

**Validar:** https://validator.schema.org/ com o URL depois do deploy.

### Commit

```
seo: add WebApplication JSON-LD structured data to root layout (M1.4)
```

---

## TASK 53 — SEO: generateMetadata dinâmico em learn/[slug] (M1.5)

**Problema:** `apps/web/app/(main)/learn/[slug]/page.tsx` é `"use client"` puro.
`generateMetadata` só funciona em Server Components.
Solução: separar em Server Component (page.tsx) + Client Component (TopicPageClient.tsx).

### Passo 1 — Criar `apps/web/app/(main)/learn/[slug]/TopicPageClient.tsx`

Extrair TODO o JSX e lógica do `page.tsx` actual para este novo componente:

```tsx
"use client";

import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import type { LearnTopic } from "@/lib/learnTopics";
import type { UiLang } from "@/lib/i18n";
import { tx } from "@/lib/i18n";

interface TopicPageClientProps {
  topic: LearnTopic;
}

export function TopicPageClient({ topic }: TopicPageClientProps) {
  const { uiLang: lang, s } = useLang();

  const practiceHref = topic.practiceCategory
    ? `/practice?category=${encodeURIComponent(topic.practiceCategory)}`
    : "/practice";

  // ... colar aqui TODO o JSX actual de TopicPage() (sem o useParams/notFound)
  // substituir: const slug = ... e const topic = findTopic(slug) por prop topic
  return (
    <main className="container section-pad">
      {/* Manter o JSX exactamente como está actualmente em page.tsx */}
      {/* mas usar `topic` da prop em vez de findTopic() */}
      {/* e remover o if (!topic) { notFound() } — o server component trata isso */}
    </main>
  );
}
```

### Passo 2 — Reescrever `apps/web/app/(main)/learn/[slug]/page.tsx` como Server Component

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findTopic } from "@/lib/learnTopics";
import { TopicPageClient } from "./TopicPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  const title = topic.title.en;
  const summary = topic.summary.en;

  return {
    title: `${title} — WA Learner Test`,
    description: `${summary.slice(0, 155)}`,
    alternates: {
      canonical: `https://kangalearner.com.au/learn/${slug}`
    },
    openGraph: {
      title: `${title} — WA Learner Test Guide`,
      description: `${summary.slice(0, 155)}`,
      url: `https://kangalearner.com.au/learn/${slug}`
    }
  };
}

export async function generateStaticParams() {
  const { LEARN_TOPICS } = await import("@/lib/learnTopics");
  return LEARN_TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) notFound();

  return <TopicPageClient topic={topic!} />;
}
```

**Atenção:** `params` em Next.js 15 é uma `Promise<{slug:string}>` — usar `await params`.

### Verificação

```bash
pnpm --filter @kanga/web exec tsc --noEmit

# Verificar que /learn/about-the-test tem <title> correcto
curl -s http://localhost:3000/learn/about-the-test | grep -i "<title"
```

### Commit

```
seo(learn): Server Component + generateMetadata + generateStaticParams for /learn/[slug] (M1.5)

- Extract TopicPageClient.tsx (client rendering + useLang)
- page.tsx is now a Server Component with per-topic metadata
- generateStaticParams pre-renders all 14 topic slugs at build time
- Canonical URL per topic page for SEO
```

---

## TASK 54 — Copy: Hero WA-first + trust badges (M2.1 parcial)

**Problema:** O hero actual diz "Prepare for your Australian learner test with confidence."
Não menciona WA, não fala com imigrantes, não tem trust signals.

**Regra importante:** NÃO usar "300+" — são os 69 de WA agora; 300+ é o total futuro
multi-estado. Usar copy honesto e preciso.

### Passo 1 — `apps/web/src/lib/i18n.ts`

Localizar e substituir `heroEyebrow`, `heroTitle`, `heroSub` nos 3 blocos de idioma.
Adicionar também `heroCtaPrimary`, `heroCtaSecondary`, `heroBadge1`, `heroBadge2`, `heroBadge3`
se não existirem (ou atualizar se já existem):

```typescript
// === bloco en ===
heroEyebrow: "For immigrants in Western Australia",
heroTitle: "Pass your WA learner test — in your language.",
heroSub:
  "Practice every road rule topic tested by the DoT WA learner licence exam. " +
  "English, Portuguese or Spanish. Free mock test included.",
heroCtaPrimary:  "Start free practice",      // → /practice
heroCtaSecondary: "Try mock test",            // → /mock-test
heroBadge1: "Free forever",
heroBadge2: "WA road rules only",
heroBadge3: "English · Português · Español",

// === bloco pt ===
heroEyebrow: "Para imigrantes na Western Australia",
heroTitle: "Passe na prova de learner de WA — no seu idioma.",
heroSub:
  "Pratique todos os tópicos cobrados na prova de learner licence do DoT WA. " +
  "Inglês, Português ou Espanhol. Simulado gratuito incluído.",
heroCtaPrimary:  "Começar a praticar",
heroCtaSecondary: "Tentar o simulado",
heroBadge1: "Gratuito para sempre",
heroBadge2: "Regras de WA",
heroBadge3: "English · Português · Español",

// === bloco es ===
heroEyebrow: "Para inmigrantes en Western Australia",
heroTitle: "Aprueba el examen learner de WA — en tu idioma.",
heroSub:
  "Practica todos los temas evaluados en el examen learner licence del DoT WA. " +
  "Inglés, Portugués o Español. Simulacro gratis incluido.",
heroCtaPrimary:  "Empezar a practicar",
heroCtaSecondary: "Probar el simulacro",
heroBadge1: "Gratis para siempre",
heroBadge2: "Reglas de tránsito WA",
heroBadge3: "English · Português · Español",
```

### Passo 2 — `apps/web/app/(main)/LandingClient.tsx` — secção hero

Localizar o componente do hero (provavelmente `<section>` com `heroTitle` / `heroSub`).
Adicionar **trust badges** imediatamente após o `<p>` do subtítulo, antes dos CTAs:

```tsx
{/* Trust badges */}
<div className="hero-badges">
  <span className="hero-badge">✓ {s.heroBadge1}</span>
  <span className="hero-badge">✓ {s.heroBadge2}</span>
  <span className="hero-badge">✓ {s.heroBadge3}</span>
</div>
```

Adicionar CSS no final de `globals.css` (ou onde estiver o CSS do hero):

```css
/* Hero trust badges */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 1.5rem;
}
.hero-badge {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--kl-color-text-muted, #64748b);
  background: var(--kl-color-surface-alt, #f8fafc);
  border: 1px solid var(--kl-color-border, #e2e8f0);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
}
```

### Passo 3 — Verificar CTAs do hero

Confirmar que os botões do hero apontam para:
- CTA primário: `/practice` (não `/dashboard` nem `/auth/signup`)
- CTA secundário: `/mock-test`

Se `s.heroCtaPrimary` / `s.heroCtaSecondary` forem novas chaves, actualizar os `<a>` / `<Link>`
no hero para as usar em vez de strings hardcoded.

### Verificação

```bash
pnpm --filter @kanga/web run build
# Verificar sem erros de TypeScript nas novas chaves de i18n
pnpm --filter @kanga/web exec tsc --noEmit
```

### Commit

```
feat(landing): WA-first hero copy + trust badges (M2.1)

- heroTitle/Sub/Eyebrow updated to WA-specific, immigrant-focused copy (en/pt/es)
- No "300+" claim — uses "every road rule topic" instead (accurate for current 69 Qs)
- Trust badges: Free forever · WA road rules only · 3 languages
- Primary CTA → /practice | Secondary CTA → /mock-test
```

---

## CHECKLIST SPRINT 9

```bash
# T49: metadata WA-specific no layout
grep -n "WA Learner" apps/web/app/layout.tsx

# T50: sitemap.ts existe
ls apps/web/app/sitemap.ts
# Verificar build inclui sitemap
curl http://localhost:3000/sitemap.xml 2>/dev/null | head -10

# T51: robots.ts existe
ls apps/web/app/robots.ts

# T52: JSON-LD no layout
grep -n "application/ld+json" apps/web/app/layout.tsx

# T53: learn/[slug] é Server Component (sem "use client" no topo)
head -1 "apps/web/app/(main)/learn/[slug]/page.tsx"
# deve retornar: import ... (não "use client")

# T53: TopicPageClient existe
ls "apps/web/app/(main)/learn/[slug]/TopicPageClient.tsx"

# T54: hero copy WA-first
grep -n "heroEyebrow\|heroBadge1" apps/web/src/lib/i18n.ts | head -5

# T54: sem "300+" no hero
grep -rn "300+" apps/web/app/ apps/web/src/

# TypeScript
pnpm --filter @kanga/web exec tsc --noEmit

# Build completo
pnpm --filter @kanga/web run build

# Push
git push origin main
```

---

## Notas para Sprint 10 (M2 + M3 — Landing + Conteúdo)

Após Sprint 9:

- **M2 completo:** Secção "How It Works" (3 passos: Study → Practice → Track),
  reformulação dos testimonials com disclaimer "beta community", newsletter form no Footer
- **M3:** Adicionar 5 novos tópicos ao `learnTopics.ts` (mobile-phones, fatigue-driving,
  school-zones, shared-zones, towing-rules) + conteúdo das páginas `/resources` (Community, Study guides, journey timeline)
- **Legal blocker:** `/terms` e `/privacy` são placeholders — escrever conteúdo real antes
  de qualquer campanha de aquisição paga ou SEO agressivo

---

## Nota copy — "300+ questões"

O claim "300+ questions" refere-se ao total **futuro** quando NSW, VIC, QLD, SA, TAS, ACT e NT
forem adicionados. Cada estado terá ~30–50 questões específicas às suas regras de trânsito.
Copy de marketing **deve sempre** distinguir:

- **Agora (WA):** "questions covering all WA learner test topics" ✓
- **Futuro (multi-estado):** "growing to 300+ questions as we expand to all states" ✓  
- **Proibido:** "300+ questions" sem qualificação ✗
