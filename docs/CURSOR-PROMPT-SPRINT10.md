# Cursor Prompt — Sprint 10: Landing M2 + Conteúdo M3 + Legal

> Gerado por Claude em 2026-05-22 (fase M2/M3 do plano de marketing + bloqueadores legais).
> Execute as tasks em sequência.
> Commit cada task individualmente com a mensagem indicada.
> Execute `pnpm --filter @kanga/web exec tsc --noEmit` após cada task.
> Faça push para `origin/main` ao final.
> Commit `docs/CURSOR-PROMPT-SPRINT9.md` (untracked) juntos com T55 ou separado: `docs: add Sprint 9 prompt to version control`.

---

## CONTEXT GLOBAL

- Sprint 9 concluído: SEO técnico, sitemap, robots, JSON-LD, learn/[slug] SSG, hero WA-first.
- Estrutura: `apps/web/app/(main)/` para páginas públicas, `apps/web/app/auth/` para auth.
- `LearnTopic` interface em `apps/web/src/lib/learnTopics.ts` — obrigatório respeitar todos os campos.
- `/api/newsletter` aceita `POST { email: string }` → salva em `newsletter_subscribers`.
- Regra "300+": não afirmar como número actual — contexto futuro multi-estado.

---

## TASK 55 — M2.2: Secção "How It Works" na landing (M2.2)

**Objectivo:** Reduzir fricção entre hero e testimonials — mostrar em 3 passos simples
como a plataforma funciona antes de pedir signup.

### Passo 1 — i18n keys em `apps/web/src/lib/i18n.ts`

Adicionar nos 3 blocos (en/pt/es):

```typescript
// === en ===
howItWorksTitle: "How it works",
howStep1Title: "Study by topic",
howStep1Desc: "14 road rule topics — signs, speed limits, give way, alcohol laws and more.",
howStep2Title: "Take a mock test",
howStep2Desc: "30 questions, 45 minutes. Same format as the real DoT WA learner test.",
howStep3Title: "Track your progress",
howStep3Desc: "See which topics need more practice. Sign up free to save your results.",

// === pt ===
howItWorksTitle: "Como funciona",
howStep1Title: "Estude por tópico",
howStep1Desc: "14 tópicos das regras de trânsito — placas, velocidade, preferência, álcool e mais.",
howStep2Title: "Faça um simulado",
howStep2Desc: "30 questões, 45 minutos. Mesmo formato da prova real de learner do DoT WA.",
howStep3Title: "Acompanhe seu progresso",
howStep3Desc: "Veja quais tópicos precisam mais prática. Crie conta grátis para salvar resultados.",

// === es ===
howItWorksTitle: "Cómo funciona",
howStep1Title: "Estudia por tema",
howStep1Desc: "14 temas de normas de tránsito — señales, velocidades, ceder el paso, alcohol y más.",
howStep2Title: "Haz un simulacro",
howStep2Desc: "30 preguntas, 45 minutos. Mismo formato que el examen real del DoT WA.",
howStep3Title: "Sigue tu progreso",
howStep3Desc: "Ve qué temas necesitan más práctica. Regístrate gratis para guardar tus resultados.",
```

### Passo 2 — Componente `HowItWorks` em `apps/web/app/(main)/LandingClient.tsx`

Adicionar componente function antes do `TestimonialCarousel`:

```tsx
function HowItWorks({ lang }: { lang: UiLang }) {
  const { s } = useLang();
  const steps = [
    { num: "①", title: s.howStep1Title, desc: s.howStep1Desc, href: "/learn"      },
    { num: "②", title: s.howStep2Title, desc: s.howStep2Desc, href: "/mock-test"  },
    { num: "③", title: s.howStep3Title, desc: s.howStep3Desc, href: "/dashboard"  },
  ];
  return (
    <section className="how-it-works section-pad">
      <div className="container">
        <h2 className="section-title">{s.howItWorksTitle}</h2>
        <div className="how-steps">
          {steps.map((step) => (
            <a key={step.num} href={step.href} className="how-step-card">
              <span className="how-step-num">{step.num}</span>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Inserir `<HowItWorks lang={uiLang} />` **entre o hero e os testimonials** no JSX principal.

### Passo 3 — CSS em `apps/web/app/globals.css`

Adicionar no final:

```css
/* ── How It Works ─────────────────────────────────────────────────── */
.how-it-works { background: var(--kl-color-surface-alt, #f8fafc); }
.how-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.how-step-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--kl-color-surface, #fff);
  border: 1px solid var(--kl-color-border, #e2e8f0);
  border-radius: var(--kl-radius-lg, 1rem);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.how-step-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.how-step-num  { font-size: 1.75rem; line-height: 1; }
.how-step-title { font-family: var(--kl-font-heading); font-size: 1.05rem; font-weight: 700; margin: 0; }
.how-step-desc  { font-size: 0.875rem; color: var(--kl-color-text-muted, #64748b); margin: 0; }
```

### Commit

```
feat(landing): add "How It Works" section between hero and testimonials (M2.2)
```

---

## TASK 56 — M2.3: Testimonials — disclaimer beta community (M2.3)

**Objectivo:** Manter os 3 testimonials ficcionais mas ser honesto — adicionar label
"From our beta community" para não criar expectativa falsa de reviews verificadas.

### Fix — `apps/web/app/(main)/LandingClient.tsx`

Localizar `<div className="testimonial-carousel">` (ou o wrapper da secção).

Adicionar **antes** do carrossel um label de contexto:

```tsx
<section className="testimonials-section section-pad">
  <div className="container">
    {/* Label de contexto — honesto sobre ser beta */}
    <p className="testimonial-context-label">
      {lang === "pt"
        ? "Histórias da nossa comunidade beta"
        : lang === "es"
        ? "Historias de nuestra comunidad beta"
        : "Stories from our early community"}
    </p>
    <TestimonialCarousel lang={lang} />
  </div>
</section>
```

Adicionar CSS:

```css
.testimonial-context-label {
  text-align: center;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--kl-color-text-muted, #94a3b8);
  font-weight: 600;
  margin-bottom: 1.5rem;
}
```

**Atenção:** Não alterar os dados dos testimonials (`TESTIMONIALS` array) — já estão com WA correcto (commit ca3bb02).

### Commit

```
feat(landing): add beta community label to testimonials section (M2.3)
```

---

## TASK 57 — M2.4: Newsletter form no Footer (M2.4)

**Objectivo:** Capturar emails na landing sem forçar signup.
Usar o endpoint `/api/newsletter` existente.

### Passo 1 — i18n em `apps/web/src/lib/i18n.ts`

```typescript
// === en ===
footerNewsletterTitle: "Get weekly WA driving tips",
footerNewsletterDesc: "In English, Portuguese or Spanish. Unsubscribe anytime.",
footerNewsletterPlaceholder: "your@email.com",
footerNewsletterCta: "Subscribe",
footerNewsletterSuccess: "You're in! Check your inbox.",
footerNewsletterError: "Something went wrong. Please try again.",

// === pt ===
footerNewsletterTitle: "Dicas semanais de direção em WA",
footerNewsletterDesc: "Em inglês, português ou espanhol. Cancele quando quiser.",
footerNewsletterPlaceholder: "seu@email.com",
footerNewsletterCta: "Inscrever-se",
footerNewsletterSuccess: "Inscrito! Verifique sua caixa de entrada.",
footerNewsletterError: "Algo deu errado. Tente novamente.",

// === es ===
footerNewsletterTitle: "Consejos semanales sobre el manejo en WA",
footerNewsletterDesc: "En inglés, portugués o español. Cancela cuando quieras.",
footerNewsletterPlaceholder: "tu@email.com",
footerNewsletterCta: "Suscribirme",
footerNewsletterSuccess: "¡Ya estás! Revisa tu bandeja de entrada.",
footerNewsletterError: "Algo salió mal. Inténtalo de nuevo.",
```

### Passo 2 — Criar `apps/web/src/components/layout/NewsletterForm.tsx`

```tsx
"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

export function NewsletterForm() {
  const { s } = useLang();
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="newsletter-success">{s.footerNewsletterSuccess}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={s.footerNewsletterPlaceholder}
        required
        disabled={status === "loading"}
        className="newsletter-input"
        aria-label={s.footerNewsletterPlaceholder}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="newsletter-btn"
      >
        {status === "loading" ? "…" : s.footerNewsletterCta}
      </button>
      {status === "error" && (
        <p className="newsletter-error" role="alert">{s.footerNewsletterError}</p>
      )}
    </form>
  );
}
```

### Passo 3 — Adicionar ao `apps/web/src/components/layout/Footer.tsx`

Localizar o Footer e adicionar **antes do copyright / final**:

```tsx
import { NewsletterForm } from "./NewsletterForm";

// Dentro do <footer>, adicionar nova secção:
<div className="footer-newsletter-block">
  <h3 className="footer-newsletter-heading">{s.footerNewsletterTitle}</h3>
  <p className="footer-newsletter-desc">{s.footerNewsletterDesc}</p>
  <NewsletterForm />
</div>
```

**Atenção:** O Footer precisa de aceder ao `s` do `useLang`. Verificar se já é `"use client"`.
Se for Server Component, converter para `"use client"` ou extrair o bloco newsletter
para um componente client separado.

### CSS em `globals.css`

```css
/* ── Newsletter footer ─────────────────────────────────────────────── */
.footer-newsletter-block {
  padding: 2rem 0;
  border-top: 1px solid var(--kl-color-border, #e2e8f0);
}
.footer-newsletter-heading {
  font-family: var(--kl-font-heading);
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}
.footer-newsletter-desc {
  font-size: 0.85rem;
  color: var(--kl-color-text-muted, #64748b);
  margin: 0 0 0.75rem;
}
.newsletter-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-width: 420px;
}
.newsletter-input {
  flex: 1 1 220px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--kl-color-border, #e2e8f0);
  border-radius: var(--kl-radius-md, 0.5rem);
  font-size: 0.9rem;
  background: var(--kl-color-surface, #fff);
  color: var(--kl-color-text, #0f172a);
}
.newsletter-btn {
  padding: 0.5rem 1rem;
  background: var(--kl-color-primary, #1d4ed8);
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  border-radius: var(--kl-radius-md, 0.5rem);
  cursor: pointer;
  transition: opacity 0.15s;
}
.newsletter-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.newsletter-success { color: var(--kl-color-success, #16a34a); font-weight: 600; font-size: 0.9rem; }
.newsletter-error   { color: var(--kl-color-error, #dc2626); font-size: 0.8rem; margin-top: 0.25rem; }
```

### Commit

```
feat(footer): add newsletter subscription form — connected to /api/newsletter (M2.4)
```

---

## TASK 58 — M3.1: 5 novos tópicos de aprendizagem (M3.1)

Adicionar ao final do array `LEARN_TOPICS` em `apps/web/src/lib/learnTopics.ts`.
Seguir **exactamente** a interface `LearnTopic` existente.

**Atenção:** Verificar quais valores de `icon` são válidos em `@/components/icons`
antes de escolher o ícone. Se não tiver certeza, usar o mesmo ícone de um tópico similar
(por ex. usar o mesmo ícone de `speed-limits` para `school-zones`).

---

### Tópico 1: `mobile-phones`

```typescript
{
  slug: "mobile-phones",
  icon: "phone",          // ajustar ao nome exacto no Icons se necessário
  practiceCategory: "Safe Driving",
  title: {
    en: "Mobile Phones While Driving WA",
    pt: "Celular ao Volante em WA",
    es: "Teléfono Móvil al Volante en WA",
  },
  summary: {
    en: "WA has some of Australia's strictest rules on mobile phone use while driving. Learner and P1/P2 drivers must not use a mobile phone at all — not even hands-free. Full licence holders may use a phone only via Bluetooth/speaker if it is mounted.",
    pt: "WA tem algumas das regras mais rígidas da Austrália sobre o uso de celular ao volante. Motoristas com learner ou carteira P1/P2 não podem usar celular de forma alguma — nem com viva-voz. Portadores de carteira plena só podem usar via Bluetooth/alto-falante com suporte fixo.",
    es: "WA tiene algunas de las reglas más estrictas de Australia sobre el uso de teléfonos móviles al conducir. Los conductores con learner o licencia P1/P2 no pueden usar el móvil de ninguna forma — ni siquiera manos libres. Los titulares de licencia completa solo pueden usarlo vía Bluetooth/altavoz con soporte fijo.",
  },
  keyRules: [
    {
      en: "Learner and P1/P2 drivers: complete mobile phone ban — no calls, no texts, no hands-free, no GPS on phone.",
      pt: "Motoristas com learner e P1/P2: proibição total — sem chamadas, mensagens, viva-voz ou GPS no celular.",
      es: "Conductores con learner y P1/P2: prohibición total — sin llamadas, mensajes, manos libres ni GPS en el móvil.",
    },
    {
      en: "Full licence holders: hands-free only. Phone must be in a mount — not held in the hand, even at a red light.",
      pt: "Carteira plena: apenas viva-voz. O celular deve estar em suporte — não pode ser segurado na mão, nem no vermelho.",
      es: "Licencia completa: solo manos libres. El móvil debe estar en un soporte — no puede sostenerse en la mano, ni en semáforo.",
    },
    {
      en: "Penalty: from $1,000 fine + 3 demerit points. Doubled in a school zone or roadwork area.",
      pt: "Multa: a partir de $1.000 + 3 pontos de infração. Dobrada em zonas escolares ou de obras.",
      es: "Multa: desde $1.000 + 3 puntos de demérito. Se duplica en zonas escolares o de obras.",
    },
  ],
  mistakes: [
    {
      en: "Thinking hands-free is OK as a learner driver — it is NOT. Any mobile use is banned.",
      pt: "Pensar que viva-voz é permitido para motoristas learner — NÃO É. Qualquer uso é proibido.",
      es: "Creer que el manos libres está permitido para conductores learner — NO LO ESTÁ. Cualquier uso está prohibido.",
    },
    {
      en: "Using the phone at a red light while stopped — the rule applies even when stationary.",
      pt: "Usar o celular parado no semáforo — a regra vale mesmo parado.",
      es: "Usar el móvil parado en semáforo — la regla aplica incluso cuando está detenido.",
    },
  ],
  example: {
    en: "Maria (learner driver) plugs her phone into the car mount to use GPS. Even though it's mounted and hands-free, this is still illegal for a learner. She must use a dedicated GPS device or ask a passenger to navigate.",
    pt: "Maria (learner) coloca o celular no suporte do carro para usar GPS. Mesmo no suporte e sem tocar, é ilegal para learner. Ela deve usar um GPS dedicado ou pedir ao passageiro que navegue.",
    es: "María (conductora learner) coloca el móvil en el soporte para usar el GPS. Aunque esté montado y sin manos, sigue siendo ilegal para un conductor learner. Debe usar un GPS dedicado o pedir a un pasajero que navegue.",
  },
  quickCheck: [
    {
      en: "Can a learner driver use a Bluetooth headset for calls? → No. Any mobile phone use is banned for learner drivers.",
      pt: "Um motorista learner pode usar fone de ouvido Bluetooth? → Não. Qualquer uso de celular é proibido.",
      es: "¿Puede un conductor learner usar un auricular Bluetooth para llamadas? → No. Cualquier uso de móvil está prohibido.",
    },
    {
      en: "A fully-licensed driver has her phone in her hand at a red light. Is this legal? → No. The phone must always be in a mount.",
      pt: "Uma motorista habilitada segura o celular na mão no semáforo. É legal? → Não. O celular deve estar sempre em suporte.",
      es: "Una conductora habilitada tiene el móvil en la mano en semáforo. ¿Es legal? → No. El móvil siempre debe estar en soporte.",
    },
  ],
  source: {
    en: "Road Traffic (Administration) Act 2008 + WA Learner Driver Guide (mobile phones section)",
    pt: "Road Traffic (Administration) Act 2008 + Guia do Motorista Aprendiz de WA (secção celular)",
    es: "Road Traffic (Administration) Act 2008 + Guía del Conductor Novato de WA (sección teléfono móvil)",
  },
},
```

---

### Tópico 2: `fatigue-driving`

```typescript
{
  slug: "fatigue-driving",
  icon: "clock",          // ajustar ao nome exacto no Icons
  practiceCategory: "Safe Driving",
  title: {
    en: "Fatigue and Drowsy Driving WA",
    pt: "Fadiga ao Volante em WA",
    es: "Fatiga al Volante en WA",
  },
  summary: {
    en: "Fatigue is a leading cause of fatal crashes in WA. It slows your reaction time as much as alcohol. WA law requires drivers to stop and rest — there is no legal limit for hours driven, but failing to manage fatigue is an offence.",
    pt: "A fadiga é uma das principais causas de acidentes fatais em WA. Ela reduz o tempo de reacção tanto quanto o álcool. A lei de WA exige que os motoristas parem para descansar — não há um limite legal de horas, mas não gerir a fadiga é infracção.",
    es: "La fatiga es una de las principales causas de accidentes mortales en WA. Reduce el tiempo de reacción tanto como el alcohol. La ley de WA exige a los conductores parar a descansar — no hay límite legal de horas, pero no gestionar la fatiga es una infracción.",
  },
  keyRules: [
    {
      en: "On long trips, take a 15-minute break every 2 hours — pull over safely, rest, and do not continue if drowsy.",
      pt: "Em viagens longas, faça uma pausa de 15 minutos a cada 2 horas — estacione com segurança e não continue se sentir sonolência.",
      es: "En viajes largos, haz una pausa de 15 minutos cada 2 horas — detente en lugar seguro y no continúes si tienes sueño.",
    },
    {
      en: "Warning signs of fatigue: heavy eyes, yawning, drifting lanes, can't remember the last few kilometres.",
      pt: "Sinais de fadiga: olhos pesados, bocejos, desviar de faixa, não lembrar dos últimos quilómetros.",
      es: "Señales de fatiga: ojos pesados, bostezos, salir del carril, no recordar los últimos kilómetros.",
    },
    {
      en: "Driving while fatigued is an offence — police can issue infringement notices if your driving shows fatigue signs.",
      pt: "Dirigir com fadiga é infracção — a polícia pode multar se a condução apresentar sinais de fadiga.",
      es: "Conducir con fatiga es una infracción — la policía puede multar si la conducción muestra signos de fatiga.",
    },
  ],
  mistakes: [
    {
      en: "Thinking coffee or loud music can replace sleep — they mask fatigue temporarily but do not reduce driving impairment.",
      pt: "Pensar que café ou música alta substituem o sono — apenas mascaram a fadiga temporariamente.",
      es: "Creer que el café o la música alta reemplazan el sueño — solo enmascaran la fatiga temporalmente.",
    },
    {
      en: "Driving more than 5 hours without a break — fatigue builds up progressively and micro-sleeps can occur.",
      pt: "Dirigir mais de 5 horas sem pausa — a fadiga se acumula progressivamente e microssonos podem ocorrer.",
      es: "Conducir más de 5 horas sin pausa — la fatiga se acumula progresivamente y pueden producirse microsueños.",
    },
  ],
  example: {
    en: "Ahmed drives 4 hours to visit family and starts yawning repeatedly. The safest action is to pull off the highway, find a rest area, and sleep for at least 20 minutes before continuing.",
    pt: "Ahmed dirige 4 horas para visitar a família e começa a bocejar repetidamente. A ação mais segura é sair da autoestrada, encontrar uma área de descanso e dormir pelo menos 20 minutos antes de continuar.",
    es: "Ahmed conduce 4 horas para visitar a su familia y empieza a bostezar repetidamente. La acción más segura es salir de la autopista, encontrar un área de descanso y dormir al menos 20 minutos antes de continuar.",
  },
  quickCheck: [
    {
      en: "How often should you take a break on a long trip? → At least every 2 hours, for at least 15 minutes.",
      pt: "Com que frequência deve fazer pausa em viagem longa? → Pelo menos a cada 2 horas, por pelo menos 15 minutos.",
      es: "¿Con qué frecuencia hay que hacer una pausa en un viaje largo? → Al menos cada 2 horas, durante al menos 15 minutos.",
    },
    {
      en: "Can drinking coffee before driving prevent fatigue? → No — only proper sleep can effectively combat fatigue.",
      pt: "Beber café antes de dirigir previne a fadiga? → Não — apenas o sono adequado combate eficazmente a fadiga.",
      es: "¿Tomar café antes de conducir previene la fatiga? → No — solo un sueño adecuado combate eficazmente la fatiga.",
    },
  ],
  source: {
    en: "WA Learner Driver Guide (fatigue chapter) + Main Roads WA fatigue resources",
    pt: "Guia do Motorista Aprendiz de WA (capítulo fadiga) + Main Roads WA",
    es: "Guía del Conductor Novato de WA (capítulo fatiga) + Main Roads WA",
  },
},
```

---

### Tópico 3: `school-zones`

```typescript
{
  slug: "school-zones",
  icon: "alert",          // ajustar ao nome exacto no Icons
  practiceCategory: "Speed Limits",
  title: {
    en: "School Zones Speed Limits WA",
    pt: "Zonas Escolares em WA",
    es: "Zonas Escolares en WA",
  },
  summary: {
    en: "School zones have a 40 km/h speed limit during school arrival and departure times. The limit applies even if no children are visible. Penalties are significantly higher in school zones.",
    pt: "Zonas escolares têm limite de 40 km/h nos horários de entrada e saída escolar. O limite vale mesmo que não haja crianças visíveis. As multas são significativamente mais altas nessas zonas.",
    es: "Las zonas escolares tienen un límite de 40 km/h durante los horarios de entrada y salida escolar. El límite aplica incluso si no hay niños visibles. Las multas son significativamente más altas en estas zonas.",
  },
  keyRules: [
    {
      en: "Speed limit: 40 km/h in school zones on school days (approx. 7:30–9:00 am and 2:30–4:00 pm). Check local signage — times can vary.",
      pt: "Limite: 40 km/h em zonas escolares nos dias de aula (aprox. 7:30–9:00 e 14:30–16:00). Verifique as placas locais — os horários podem variar.",
      es: "Límite: 40 km/h en zonas escolares en días lectivos (aprox. 7:30–9:00 y 14:30–16:00). Consultar señales locales — los horarios pueden variar.",
    },
    {
      en: "Flashing yellow lights or electronic signs indicate when the 40 km/h zone is active.",
      pt: "Luzes amarelas piscantes ou placas electrónicas indicam quando a zona de 40 km/h está activa.",
      es: "Las luces amarillas intermitentes o señales electrónicas indican cuándo la zona de 40 km/h está activa.",
    },
    {
      en: "Doubled demerit points and higher fines apply in school zones. Mobile phone use is an additional offence.",
      pt: "Pontos de infracção dobrados e multas mais altas em zonas escolares. Uso de celular é infracção adicional.",
      es: "Puntos de demérito doblados y multas más altas en zonas escolares. El uso del móvil es una infracción adicional.",
    },
  ],
  mistakes: [
    {
      en: "Driving at 50 km/h thinking school is out — the zone applies whenever signs/lights indicate, regardless of visible students.",
      pt: "Dirigir a 50 km/h achando que a escola terminou — a zona vale sempre que as placas/luzes indicarem, independentemente de alunos visíveis.",
      es: "Conducir a 50 km/h creyendo que la escuela terminó — la zona aplica siempre que las señales/luces lo indiquen, independientemente de estudiantes visibles.",
    },
  ],
  example: {
    en: "You drive past a school at 3:00 pm on a Tuesday. Flashing lights are on. You must drive at 40 km/h through the zone even though no children are crossing.",
    pt: "Você passa por uma escola às 15:00 de terça-feira. As luzes estão piscando. Você deve dirigir a 40 km/h na zona mesmo que nenhuma criança esteja atravessando.",
    es: "Conduces por una escuela a las 15:00 de un martes. Las luces están intermitentes. Debes circular a 40 km/h en la zona aunque no haya niños cruzando.",
  },
  quickCheck: [
    {
      en: "What is the speed limit in a school zone when lights are flashing? → 40 km/h.",
      pt: "Qual é o limite de velocidade em zona escolar com luzes piscando? → 40 km/h.",
      es: "¿Cuál es el límite de velocidad en una zona escolar cuando las luces parpadean? → 40 km/h.",
    },
  ],
  source: {
    en: "WA Learner Driver Guide + Road Traffic Code 2000 (school zones)",
    pt: "Guia do Motorista Aprendiz de WA + Road Traffic Code 2000 (zonas escolares)",
    es: "Guía del Conductor Novato de WA + Road Traffic Code 2000 (zonas escolares)",
  },
},
```

---

### Tópico 4: `shared-zones`

```typescript
{
  slug: "shared-zones",
  icon: "map-pin",        // ajustar ao nome exacto no Icons
  practiceCategory: "Road Signs",
  title: {
    en: "Shared Zones and Pedestrian Areas WA",
    pt: "Zonas Compartilhadas e Áreas para Pedestres em WA",
    es: "Zonas Compartidas y Áreas Peatonales en WA",
  },
  summary: {
    en: "In shared zones, pedestrians and vehicles share the same space. Vehicles must give way to pedestrians at all times. The maximum speed in a shared zone is 10 km/h.",
    pt: "Em zonas compartilhadas, pedestres e veículos dividem o mesmo espaço. Os veículos devem sempre dar preferência aos pedestres. A velocidade máxima é de 10 km/h.",
    es: "En zonas compartidas, peatones y vehículos comparten el mismo espacio. Los vehículos deben ceder el paso a los peatones en todo momento. La velocidad máxima es de 10 km/h.",
  },
  keyRules: [
    {
      en: "Maximum speed: 10 km/h in shared zones — typically in pedestrian malls and laneways.",
      pt: "Velocidade máxima: 10 km/h em zonas compartilhadas — geralmente em calçadões e vielas.",
      es: "Velocidad máxima: 10 km/h en zonas compartidas — típicamente en malls peatonales y callejones.",
    },
    {
      en: "Vehicles must give way to all pedestrians — pedestrians have absolute right of way in shared zones.",
      pt: "Veículos devem dar preferência a todos os pedestres — eles têm prioridade absoluta nas zonas compartilhadas.",
      es: "Los vehículos deben ceder el paso a todos los peatones — los peatones tienen prioridad absoluta en zonas compartidas.",
    },
    {
      en: "Shared zone signs mark entry and exit points. If no speed sign is visible inside the zone, assume 10 km/h.",
      pt: "Placas de zona compartilhada marcam os pontos de entrada e saída. Sem placa de velocidade visível, assumir 10 km/h.",
      es: "Las señales de zona compartida marcan los puntos de entrada y salida. Sin señal de velocidad visible, asumir 10 km/h.",
    },
  ],
  mistakes: [
    {
      en: "Driving at 20 km/h thinking it is close enough — 10 km/h is the strict limit.",
      pt: "Dirigir a 20 km/h achando que é aceitável — 10 km/h é o limite rigoroso.",
      es: "Circular a 20 km/h creyendo que es suficiente — 10 km/h es el límite estricto.",
    },
  ],
  example: {
    en: "You enter a shared zone laneway. A pedestrian is walking in the middle of the road ahead. You must give way — do not honk or expect them to move out of the way.",
    pt: "Você entra em uma viela de zona compartilhada. Um pedestre caminha no meio da rua à frente. Você deve dar preferência — não buzine nem espere que ele saia do caminho.",
    es: "Entras en un callejón de zona compartida. Un peatón camina en el centro de la calle frente a ti. Debes ceder el paso — no toques el claxon ni esperes que se quite.",
  },
  quickCheck: [
    {
      en: "What is the speed limit in a shared zone? → 10 km/h.",
      pt: "Qual é o limite de velocidade em uma zona compartilhada? → 10 km/h.",
      es: "¿Cuál es el límite de velocidad en una zona compartida? → 10 km/h.",
    },
  ],
  source: {
    en: "Road Traffic Code 2000 (Part 3 — shared zones) + WA Learner Driver Guide",
    pt: "Road Traffic Code 2000 (Parte 3 — zonas compartilhadas) + Guia do Motorista Aprendiz de WA",
    es: "Road Traffic Code 2000 (Parte 3 — zonas compartidas) + Guía del Conductor Novato de WA",
  },
},
```

---

### Tópico 5: `towing-rules`

```typescript
{
  slug: "towing-rules",
  icon: "car",            // ajustar ao nome exacto no Icons
  practiceCategory: "Safe Driving",
  title: {
    en: "Towing Rules WA",
    pt: "Regras de Reboque em WA",
    es: "Normas de Remolque en WA",
  },
  summary: {
    en: "Towing a trailer or caravan in WA comes with specific speed limits, weight restrictions, and licence conditions. Learner drivers may not tow. P1 drivers have restrictions.",
    pt: "Rebocar um trailer ou caravana em WA tem limites de velocidade, restrições de peso e condições de carteira específicas. Motoristas learner não podem rebocar. Motoristas P1 têm restrições.",
    es: "Remolcar un remolque o caravana en WA tiene límites de velocidad, restricciones de peso y condiciones de licencia específicas. Los conductores learner no pueden remolcar. Los conductores P1 tienen restricciones.",
  },
  keyRules: [
    {
      en: "Learner drivers: cannot tow any trailer or caravan.",
      pt: "Motoristas learner: não podem rebocar nenhum trailer ou caravana.",
      es: "Conductores learner: no pueden remolcar ningún remolque ni caravana.",
    },
    {
      en: "Maximum towing speed: 100 km/h (or the signed limit if lower). On some roads, towing vehicles are limited to 90 km/h — check local signs.",
      pt: "Velocidade máxima ao rebocar: 100 km/h (ou o limite sinalizado se menor). Em algumas estradas, veículos a rebocar estão limitados a 90 km/h — verificar placas locais.",
      es: "Velocidad máxima al remolcar: 100 km/h (o el límite señalizado si es inferior). En algunas carreteras, los vehículos que remolcan están limitados a 90 km/h — consultar señales locales.",
    },
    {
      en: "All trailer lights (brake, indicator, tail) must work. Safety chains are mandatory.",
      pt: "Todas as luzes do trailer (freio, sinalização, traseira) devem funcionar. Correntes de segurança são obrigatórias.",
      es: "Todas las luces del remolque (freno, intermitente, trasera) deben funcionar. Las cadenas de seguridad son obligatorias.",
    },
  ],
  mistakes: [
    {
      en: "Learner drivers attempting to tow — this is not permitted under any circumstances.",
      pt: "Motoristas learner tentando rebocar — isso não é permitido em nenhuma circunstância.",
      es: "Conductores learner intentando remolcar — no está permitido bajo ninguna circunstancia.",
    },
  ],
  example: {
    en: "David has a learner licence and wants to tow a small boat trailer to the beach. He cannot — learner drivers are not permitted to tow regardless of trailer size or weight.",
    pt: "David tem carteira learner e quer rebocar um pequeno trailer de barco até a praia. Ele não pode — motoristas learner não têm permissão para rebocar independentemente do tamanho ou peso do trailer.",
    es: "David tiene licencia learner y quiere remolcar un pequeño remolque de bote hasta la playa. No puede — los conductores learner no tienen permiso para remolcar independientemente del tamaño o peso del remolque.",
  },
  quickCheck: [
    {
      en: "Can a learner driver tow a small trailer? → No. Towing is not permitted for learner drivers.",
      pt: "Um motorista learner pode rebocar um trailer pequeno? → Não. Rebocar não é permitido para motoristas learner.",
      es: "¿Puede un conductor learner remolcar un remolque pequeño? → No. El remolque no está permitido para conductores learner.",
    },
  ],
  source: {
    en: "Road Traffic (Vehicles) Act 2012 + WA Learner Driver Guide (towing section)",
    pt: "Road Traffic (Vehicles) Act 2012 + Guia do Motorista Aprendiz de WA (secção reboque)",
    es: "Road Traffic (Vehicles) Act 2012 + Guía del Conductor Novato de WA (sección remolque)",
  },
},
```

### Commit

```
feat(learn): add 5 new topic pages — mobile-phones, fatigue-driving, school-zones, shared-zones, towing-rules (M3.1)

- sitemap.ts picks up new slugs automatically via LEARN_TOPICS
- generateStaticParams in learn/[slug]/page.tsx pre-renders all new topics
```

---

## TASK 59 — M3.2: Conteúdo da página /resources (M3.2)

**Objectivo:** Enriquecer `/resources` com secções de comunidade, guias de estudo,
percurso licença e checklist do dia do teste — conteúdo de alta conversão para imigrantes.

### Estrutura actual

Verificar o conteúdo actual em `apps/web/app/(main)/resources/page.tsx` — já tem
links oficiais DoT, booking e escola. Adicionar **4 novas secções** abaixo dos recursos actuais.

### Passo 1 — Adicionar i18n keys em `apps/web/src/lib/i18n.ts`

```typescript
// === en ===
resCommunityTitle: "Perth Immigrant Communities",
resCommunityDesc: "Connect with other immigrants in Perth who are also getting their WA licence.",
resStudyTitle: "Free Study Guides",
resStudyDesc: "Official DoT resources — free to download.",
resJourneyTitle: "Your Road to a Full Licence",
resChecklistTitle: "Test Day Checklist",

// === pt ===
resCommunityTitle: "Comunidades de Imigrantes em Perth",
resCommunityDesc: "Conecte-se com outros imigrantes em Perth que também estão tirando carteira em WA.",
resStudyTitle: "Guias de Estudo Gratuitos",
resStudyDesc: "Recursos oficiais do DoT — gratuitos para download.",
resJourneyTitle: "Seu Caminho para a Carteira Completa",
resChecklistTitle: "Checklist do Dia da Prova",

// === es ===
resCommunityTitle: "Comunidades de Inmigrantes en Perth",
resCommunityDesc: "Conéctate con otros inmigrantes en Perth que también están sacando su licencia en WA.",
resStudyTitle: "Guías de Estudio Gratuitas",
resStudyDesc: "Recursos oficiales del DoT — gratuitos para descargar.",
resJourneyTitle: "Tu Camino hacia la Licencia Completa",
resChecklistTitle: "Lista de Verificación para el Día del Examen",
```

### Passo 2 — Actualizar `apps/web/app/(main)/resources/page.tsx`

Adicionar após os recursos existentes:

```tsx
{/* ── Community section ── */}
<section className="resource-section">
  <h2>{s.resCommunityTitle}</h2>
  <p>{s.resCommunityDesc}</p>
  <ul className="resource-link-list">
    <li><a href="https://www.facebook.com/groups/brasileirosemperth" target="_blank" rel="noopener noreferrer">Brasileiros em Perth (Facebook)</a></li>
    <li><a href="https://www.facebook.com/groups/latinosperth" target="_blank" rel="noopener noreferrer">Latinos en Perth Australia (Facebook)</a></li>
    <li><a href="https://www.facebook.com/groups/filipinosinWA" target="_blank" rel="noopener noreferrer">Filipinos in Western Australia (Facebook)</a></li>
    <li><a href="https://www.facebook.com/groups/indiansperth" target="_blank" rel="noopener noreferrer">Indians in Perth (Facebook)</a></li>
  </ul>
</section>

{/* ── Study guides ── */}
<section className="resource-section">
  <h2>{s.resStudyTitle}</h2>
  <p>{s.resStudyDesc}</p>
  <ul className="resource-link-list">
    <li><a href="https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp" target="_blank" rel="noopener noreferrer">WA Learner Driver Guide (DoT)</a></li>
    <li><a href="https://www.transport.wa.gov.au/licensing/drive-safe-wa-handbook.asp" target="_blank" rel="noopener noreferrer">Drive Safe WA Handbook (DoT)</a></li>
    <li><a href="https://www.rac.com.au/cars-transport/info/learner-licence-in-wa" target="_blank" rel="noopener noreferrer">RAC Learner Licence Guide</a></li>
  </ul>
</section>

{/* ── Licence journey ── */}
<section className="resource-section">
  <h2>{s.resJourneyTitle}</h2>
  <ol className="licence-journey">
    <li><strong>Learner Licence</strong> — Pass the theory test + 25 hours supervised driving (50h if no mentor)</li>
    <li><strong>Provisional P1</strong> — Red plates, 0.00 BAC, limited passengers, max 90 km/h. Hold for 6 months.</li>
    <li><strong>Provisional P2</strong> — Green plates, 0.00 BAC. Hold for 24 months.</li>
    <li><strong>Full Licence</strong> — 0.05 BAC (general limit). Restrictions lifted.</li>
  </ol>
</section>

{/* ── Test day checklist ── */}
<section className="resource-section">
  <h2>{s.resChecklistTitle}</h2>
  <ul className="checklist-list">
    <li>✓ Valid photo ID (passport or ImmiCard accepted)</li>
    <li>✓ Test fee (~$60 AUD — check current DoT fee schedule)</li>
    <li>✓ Arrive 10–15 minutes early</li>
    <li>✓ No mobile phone in the test room</li>
    <li>✓ Review all 14 topics on KangaLearner beforehand</li>
    <li>✓ Good night's sleep — fatigue affects test performance</li>
  </ul>
</section>
```

**Atenção:** Verificar se `resources/page.tsx` usa `useLang()` (client). Se for Server Component,
extrair estas novas secções para um componente client `ResourcesExtras.tsx` e importar.
Alternativamente, tornar toda a página `"use client"` se actualmente não o é.

**Verificar links Facebook:** Os grupos listados são exemplos — verificar se existem e são públicos
antes do commit. Substituir por grupos reais verificados ou remover se não existirem.

### CSS em `globals.css`

```css
/* ── Resources page additions ─────────────────────────────────────── */
.resource-section       { margin-bottom: 2.5rem; }
.resource-section h2    { font-family: var(--kl-font-heading); font-size: 1.15rem; margin: 0 0 0.5rem; }
.resource-link-list,
.checklist-list         { list-style: none; padding: 0; margin: 0.5rem 0 0; display: flex; flex-direction: column; gap: 0.4rem; }
.resource-link-list a   { color: var(--kl-color-primary, #1d4ed8); text-decoration: underline; font-size: 0.9rem; }
.licence-journey        { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.licence-journey li     { font-size: 0.9rem; line-height: 1.5; }
.checklist-list li      { font-size: 0.9rem; }
```

### Commit

```
feat(resources): add community links, study guides, licence journey, test day checklist (M3.2)
```

---

## TASK 60 — Legal: Conteúdo real para /terms e /privacy (bloqueador de lançamento)

**CRÍTICO:** Estas páginas são placeholders — bloqueiam qualquer campanha pública.
O conteúdo abaixo é funcional e honesto mas **NÃO é aconselhamento jurídico**.
Recomenda-se revisão por advogado australiano antes de campanha paga.

### 60.1 — `apps/web/app/(main)/terms/page.tsx`

Substituir o placeholder actual por:

```tsx
import Link from "next/link";

export const metadata = {
  title: "Terms of Use — KangaLearner",
  description: "KangaLearner terms of use for the WA learner test practice platform."
};

export default function TermsPage() {
  return (
    <main className="legal-page container section-pad">
      <h1>Terms of Use</h1>
      <p className="legal-updated">Last updated: May 2026</p>

      <h2>1. About KangaLearner</h2>
      <p>KangaLearner ("we", "us", "our") is an educational platform to help learner drivers in Western Australia prepare for the Department of Transport (DoT) learner licence theory test. We are not affiliated with or endorsed by the Western Australian government or the Department of Transport.</p>

      <h2>2. Acceptance of Terms</h2>
      <p>By accessing or using KangaLearner you agree to these Terms of Use. If you do not agree, please do not use the service.</p>

      <h2>3. Educational Purpose Only</h2>
      <p>KangaLearner is a study and practice tool only. We do not guarantee that using our service will result in passing the official learner test. Always refer to the official <a href="https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp" target="_blank" rel="noopener noreferrer">WA Learner Driver Guide</a> and official DoT materials as your primary study resource.</p>

      <h2>4. Accuracy of Content</h2>
      <p>We make reasonable efforts to keep content aligned with current WA road rules. However, road rules change and we cannot guarantee all content is current. Do not rely solely on KangaLearner for legal advice about road rules.</p>

      <h2>5. Free Service</h2>
      <p>The core practice and mock test features are provided free of charge. We may introduce optional premium features in the future. Any paid features will be clearly communicated before purchase.</p>

      <h2>6. User Accounts</h2>
      <p>You may create an account using your email or Google account. You are responsible for keeping your credentials secure. We may suspend accounts that violate these terms or engage in abusive behaviour.</p>

      <h2>7. Acceptable Use</h2>
      <p>You agree not to: attempt to access other users' data; reverse-engineer or scrape the platform; use automated tools to bulk-request content; or use the platform for any unlawful purpose.</p>

      <h2>8. Intellectual Property</h2>
      <p>The KangaLearner brand, design, and original content are our intellectual property. Question content is derived from the publicly available WA Learner Driver Guide (DoT). We do not claim ownership of official DoT materials.</p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>KangaLearner is provided "as is" without warranties of any kind. We do not warrant that the service will be uninterrupted or error-free.</p>

      <h2>10. Limitation of Liability</h2>
      <p>To the extent permitted by Australian law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

      <h2>11. Termination</h2>
      <p>You may delete your account at any time via Account Settings. We may also suspend or terminate accounts that violate these terms.</p>

      <h2>12. Governing Law</h2>
      <p>These terms are governed by the laws of Western Australia, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Western Australia.</p>

      <h2>13. Changes to Terms</h2>
      <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

      <h2>14. Contact</h2>
      <p>For questions about these terms, contact us at: <a href="mailto:hello@kangalearner.com.au">hello@kangalearner.com.au</a></p>

      <p><Link href="/">← Back to home</Link></p>
    </main>
  );
}
```

### 60.2 — `apps/web/app/(main)/privacy/page.tsx`

```tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — KangaLearner",
  description: "KangaLearner privacy policy — what data we collect and how we use it."
};

export default function PrivacyPage() {
  return (
    <main className="legal-page container section-pad">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: May 2026</p>

      <p>KangaLearner is committed to protecting your privacy in accordance with the <em>Privacy Act 1988</em> (Australia) and the Australian Privacy Principles (APPs).</p>

      <h2>1. What Information We Collect</h2>
      <ul>
        <li><strong>Account data:</strong> email address, name (optional), avatar image (optional).</li>
        <li><strong>Usage data:</strong> quiz answers, practice session results, mock test scores, study progress, preferred language and state.</li>
        <li><strong>Technical data:</strong> browser type, device type, IP address (via our hosting provider, Vercel), access timestamps.</li>
        <li><strong>Newsletter:</strong> email address only, if you subscribe.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and improve the learning platform.</li>
        <li>To save your study progress across devices (when signed in).</li>
        <li>To send you study tips and updates (newsletter subscribers only, with consent).</li>
        <li>To process payments for premium features (via Stripe — see below).</li>
        <li>We do not sell your personal information to third parties.</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>We use the following third-party services to operate KangaLearner:</p>
      <ul>
        <li><strong>Supabase</strong> (database and authentication) — servers located in AWS Sydney (ap-southeast-2).</li>
        <li><strong>Vercel</strong> (hosting and edge functions) — global CDN with Australian edge nodes.</li>
        <li><strong>Stripe</strong> (payments, if applicable) — Stripe's privacy policy: <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer">stripe.com/au/privacy</a>.</li>
        <li><strong>Upstash</strong> (rate limiting via Redis) — temporary request counters only, no personal data stored.</li>
      </ul>

      <h2>4. Cookies and Local Storage</h2>
      <p>We use cookies and browser localStorage for: session authentication, language preference, state preference, and anonymous practice progress (before sign-in). We do not use advertising cookies.</p>

      <h2>5. Data Retention</h2>
      <p>Account data is kept until you delete your account. Practice data is deleted with your account. Newsletter subscriptions are kept until you unsubscribe. Anonymised, aggregated usage data may be retained indefinitely for product improvement.</p>

      <h2>6. Your Rights</h2>
      <ul>
        <li><strong>Access:</strong> You can view your account data in Account Settings.</li>
        <li><strong>Deletion:</strong> You can permanently delete your account and all associated data in Account Settings → Delete Account.</li>
        <li><strong>Correction:</strong> You can update your name, language, and state in Account Settings.</li>
        <li><strong>Newsletter opt-out:</strong> Use the unsubscribe link in any email we send.</li>
      </ul>

      <h2>7. Data Security</h2>
      <p>We use industry-standard security practices including encrypted connections (HTTPS/TLS), row-level security on all database tables, and rate limiting to prevent abuse. However, no system is 100% secure — we recommend using a strong, unique password.</p>

      <h2>8. Children's Privacy</h2>
      <p>KangaLearner is not directed at children under 13. We do not knowingly collect data from children under 13. If you believe a child has provided us data, contact us to have it removed.</p>

      <h2>9. Changes to This Policy</h2>
      <p>We may update this policy from time to time. We will notify registered users of significant changes via email. Continued use of the service after changes constitutes acceptance.</p>

      <h2>10. Contact</h2>
      <p>For privacy questions or to exercise your rights, contact: <a href="mailto:privacy@kangalearner.com.au">privacy@kangalearner.com.au</a></p>
      <p>We will respond to requests within 30 days as required by the Australian Privacy Act.</p>

      <p><Link href="/">← Back to home</Link></p>
    </main>
  );
}
```

### CSS para páginas legais em `globals.css`

```css
/* ── Legal pages ───────────────────────────────────────────────────── */
.legal-page           { max-width: 720px; }
.legal-page h1        { font-family: var(--kl-font-heading); font-size: 2rem; margin-bottom: 0.25rem; }
.legal-page h2        { font-family: var(--kl-font-heading); font-size: 1.15rem; margin: 2rem 0 0.5rem; }
.legal-page p,
.legal-page li        { font-size: 0.95rem; line-height: 1.7; color: var(--kl-color-text, #0f172a); }
.legal-page ul,
.legal-page ol        { padding-left: 1.5rem; margin: 0.5rem 0; }
.legal-page a         { color: var(--kl-color-primary, #1d4ed8); }
.legal-updated        { font-size: 0.8rem; color: var(--kl-color-text-muted, #64748b); margin-bottom: 2rem; }
```

### Commit

```
feat(legal): replace /terms and /privacy placeholders with real content (launch blocker)

- Terms of Use: educational purpose disclaimer, Australian governing law, account/data terms
- Privacy Policy: APPs compliant — data collected, third parties (Supabase/Vercel/Stripe/Upstash), user rights
- Not legal advice — professional review recommended before paid marketing campaigns
```

---

## CHECKLIST SPRINT 10

```bash
# T55: HowItWorks no landing
grep -n "HowItWorks\|howItWorksTitle" apps/web/app/(main)/LandingClient.tsx | head -5
grep -n "howItWorksTitle" apps/web/src/lib/i18n.ts | head -3

# T56: testimonial label
grep -n "beta community\|comunidade beta\|comunidad beta" "apps/web/app/(main)/LandingClient.tsx"

# T57: newsletter form
ls apps/web/src/components/layout/NewsletterForm.tsx
grep -n "NewsletterForm\|footerNewsletterTitle" apps/web/src/components/layout/Footer.tsx

# T58: novos tópicos
grep -c '"slug"' apps/web/src/lib/learnTopics.ts
# deve ser 19 (14 actuais + 5 novos)

# T59: recursos page
grep -n "resCommunityTitle\|resChecklistTitle" "apps/web/app/(main)/resources/page.tsx"

# T60: legal content
grep -c "Privacy Act\|APPs" "apps/web/app/(main)/privacy/page.tsx"
grep -n "governing law\|Western Australia" "apps/web/app/(main)/terms/page.tsx" -i

# Build e TypeScript
pnpm --filter @kanga/web exec tsc --noEmit
pnpm --filter @kanga/web run build

# Push
git push origin main
```

---

## Sprint 11 (preview) — M4: Email marketing com Resend

Após Sprint 10, a plataforma está pronta para aquisição pública. Sprint 11 cobre:

- Integrar Resend ESP com `/api/newsletter` — envio de email de confirmação de subscrição
- Sequência onboarding: email D+0 (boas-vindas), D+3 (dica), D+7 (mock test encorajamento)
- Templates React Email em `apps/web/emails/` (`welcome.tsx`, `tip.tsx`, `progress.tsx`)
- Env var `RESEND_API_KEY` no Vercel

**Distribução M5 (sem código):**
- Posts em: "Brasileiros em Perth", "Latinos en Perth", "Indian Community Perth" (FB groups)
- Google Business Profile: criar listagem para "KangaLearner Perth"
- Conteúdo para TikTok/Instagram: clips de 30s em PT/ES/EN sobre dicas WA
