"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  TrafficCone,
  ParkingCircle,
  AlertTriangle,
  ArrowLeftRight,
  ShieldCheck,
  Globe,
  Database,
  Check,
  Flame,
  BookOpen,
  Target,
  ClipboardList,
  TrendingUp
} from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { tx } from "@/lib/i18n";
import { FlagImg } from "@/components/ui/FlagImg";
import { Kanga } from "@/components/brand/Kanga";
import { AustraliaMap } from "@/components/home/AustraliaMap";
import { LIVE_STATE_CODES } from "@kanga/core";
import { useStateCopy } from "@/lib/stateCopy";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";

/* ── Data ── */
const FEATURES: {
  href: string;
  iconKey: "feat1" | "feat2" | "feat3" | "feat4";
  Icon: LucideIcon;
}[] = [
  { href: "/learn", iconKey: "feat1", Icon: BookOpen },
  { href: "/practice", iconKey: "feat2", Icon: Target },
  { href: "/mock-test", iconKey: "feat3", Icon: ClipboardList },
  { href: "/progress", iconKey: "feat4", Icon: TrendingUp }
];

const TOPICS = [
  {
    key: "Speed",
    Icon: Gauge,
    titleKey: "topicSpeed" as const,
    descKey: "topicSpeedDesc" as const,
    cat: "speed_limits"
  },
  {
    key: "Signs",
    Icon: TrafficCone,
    titleKey: "topicSigns" as const,
    descKey: "topicSignsDesc" as const,
    cat: "road_signs"
  },
  {
    key: "Parking",
    Icon: ParkingCircle,
    titleKey: "topicParking" as const,
    descKey: "topicParkingDesc" as const,
    cat: "parking"
  },
  {
    key: "Alcohol",
    Icon: AlertTriangle,
    titleKey: "topicAlcohol" as const,
    descKey: "topicAlcoholDesc" as const,
    cat: "alcohol_drugs"
  },
  {
    key: "Lanes",
    Icon: ArrowLeftRight,
    titleKey: "topicLanes" as const,
    descKey: "topicLanesDesc" as const,
    cat: "lane_discipline"
  },
  {
    key: "Safety",
    Icon: ShieldCheck,
    titleKey: "topicSafety" as const,
    descKey: "topicSafetyDesc" as const,
    cat: "road_safety"
  }
] as const;

const TRUST_ITEMS = [
  {
    Icon: Globe,
    titleKey: "trustMultiTitle" as const,
    bodyKey: "trustMultiBody" as const,
    hasFlags: true
  },
  {
    Icon: Database,
    titleKey: "trustSaveTitle" as const,
    bodyKey: "trustSaveBody" as const,
    hasFlags: false
  },
  {
    Icon: Check,
    titleKey: "trustOfficialTitle" as const,
    bodyKey: "trustOfficialBody" as const,
    hasFlags: false
  }
] as const;

const STATE_PAGE_SLUGS = new Map<string, string>(STATE_TEST_INFO.map((st) => [st.code, st.slug]));
const STATE_TEST_ABBR = new Map<string, string>(
  STATE_TEST_INFO.map((st) => [st.code, st.testAbbr ?? st.testName])
);

const AU_STATES = (["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const).map((code) => ({
  code,
  available: (LIVE_STATE_CODES as readonly string[]).includes(code),
  pageSlug: STATE_PAGE_SLUGS.get(code) ?? null
}));

const FAQS = [
  {
    q: {
      en: "How many questions are in the real {state} learner test?",
      pt: "Quantas questões tem a prova de learner de {state}?",
      es: "¿Cuántas preguntas tiene el examen learner de {state}?"
    },
    a: {
      en: "The official {testName} in {state} has {questions} multiple-choice questions. You need to answer at least {minCorrect} correctly to pass.",
      pt: "A prova oficial ({testName}) em {state} tem {questions} questões de múltipla escolha. Você precisa acertar pelo menos {minCorrect} para passar.",
      es: "El examen oficial ({testName}) en {state} tiene {questions} preguntas de opción múltiple. Necesitas responder al menos {minCorrect} correctamente para aprobar."
    }
  },
  {
    q: {
      en: "Is KangaLearner free?",
      pt: "O KangaLearner é gratuito?",
      es: "¿KangaLearner es gratuito?"
    },
    a: {
      en: "Studying is free: practice questions, mock tests and progress tracking, with no card and no sign-up required to start. Optional extras may be offered in the future, but the core study tools stay free.",
      pt: "Estudar é grátis: perguntas de prática, simulados e acompanhamento de progresso, sem cartão e sem precisar de cadastro para começar. Recursos extras opcionais podem surgir no futuro, mas as ferramentas principais de estudo continuam gratuitas.",
      es: "Estudiar es gratis: preguntas de práctica, simulacros y seguimiento de progreso, sin tarjeta y sin necesidad de registro para empezar. Podrán ofrecerse extras opcionales en el futuro, pero las herramientas principales de estudio siguen gratis."
    }
  },
  {
    q: {
      en: "Can I study in Portuguese or Spanish?",
      pt: "Posso estudar em português ou espanhol?",
      es: "¿Puedo estudiar en portugués o español?"
    },
    a: {
      en: "Absolutely. KangaLearner supports English, Português, and Español. Every question, explanation, and hint is available in all three languages.",
      pt: "Com certeza. O KangaLearner suporta inglês, português e espanhol. Cada pergunta, explicação e dica está disponível nos três idiomas.",
      es: "Por supuesto. KangaLearner soporta inglés, português y español. Cada pregunta, explicación y pista está disponible en los tres idiomas."
    }
  },
  {
    q: {
      en: "How is the mock test different from practice mode?",
      pt: "Qual a diferença entre o simulado e o modo de prática?",
      es: "¿En qué se diferencia el simulacro del modo práctica?"
    },
    a: {
      en: "The mock test picks 30 random questions and simulates the real exam. Practice mode lets you filter by topic, review wrong answers, and study at your own pace.",
      pt: "O simulado seleciona 30 questões aleatórias e simula a prova real. O modo de prática permite filtrar por tópico, revisar respostas erradas e estudar no seu ritmo.",
      es: "El simulacro selecciona 30 preguntas aleatorias y simula el examen real. El modo práctica te permite filtrar por tema, revisar respuestas incorrectas y estudiar a tu ritmo."
    }
  },
  {
    q: {
      en: "Which Australian states and territories are covered?",
      pt: "Quais estados e territórios australianos são cobertos?",
      es: "¿Qué estados y territorios australianos están cubiertos?"
    },
    a: {
      en: "All of them: WA, NSW, QLD, VIC, SA, TAS, ACT and NT are all available now, each with its own real question bank sourced from the official state test.",
      pt: "Todos: WA, NSW, QLD, VIC, SA, TAS, ACT e NT já estão disponíveis, cada um com seu próprio banco de perguntas reais extraído do teste oficial do estado.",
      es: "Todos: WA, NSW, QLD, VIC, SA, TAS, ACT y NT ya están disponibles, cada uno con su propio banco de preguntas reales extraído del examen oficial del estado."
    }
  }
];

/* ── Hero photos: estradas australianas reais (Unsplash, uso livre) ── */
function HeroPhotos({ lang }: { lang: UiLang }) {
  const passChip = { en: "Passed, 24/30", pt: "Aprovado, 24/30", es: "Aprobado, 24/30" };
  const streakChip = { en: "3-day streak", pt: "3 dias seguidos", es: "3 días seguidos" };
  const signAlt = {
    en: "Kangaroo road sign on an Australian highway",
    pt: "Placa de canguru numa rodovia australiana",
    es: "Señal de canguro en una carretera australiana"
  };
  return (
    <div className="hero-photos">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-photo hero-photo--main"
        src="/images/hero/kangaroo-sign.jpg"
        alt={tx(signAlt, lang)}
        width={520}
        height={392}
        fetchPriority="high"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-photo hero-photo--tl"
        src="/images/hero/outback-road.jpg"
        alt=""
        width={230}
        height={154}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-photo hero-photo--br"
        src="/images/hero/coastal-road.jpg"
        alt=""
        width={230}
        height={154}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <div className="hero-float-chip hero-float-chip--pass">
        <Check size={14} strokeWidth={3} aria-hidden="true" />
        {tx(passChip, lang)}
      </div>
      <div className="hero-float-chip hero-float-chip--streak">
        <Flame size={14} strokeWidth={2.4} aria-hidden="true" />
        {tx(streakChip, lang)}
      </div>
    </div>
  );
}

/* ── Hero stats (animated count-up on first view) ── */
const STAT_ANIM_MS = 900;
const HERO_STATS = [
  { target: 2000, suffix: "+", labelKey: "heroStat1Label" as const },
  { target: 8, suffix: "", labelKey: "heroStat2Label" as const },
  { target: 3, suffix: "", labelKey: "heroStat3Label" as const }
];

function HeroStats() {
  const { s } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / STAT_ANIM_MS, 1);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-stats">
      {HERO_STATS.map(({ target, suffix, labelKey }) => (
        <div key={labelKey} className="hero-stat">
          <span className="hero-stat-num">
            {Math.round(target * progress)}
            {suffix}
          </span>
          <span className="hero-stat-label">{s[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Section header (eyebrow + display title, one voice for every section) ── */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-head">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* ── How It Works (M2.2) ── */
function HowItWorks() {
  const { s } = useLang();
  const steps = [
    { num: "01", title: s.howStep1Title, desc: s.howStep1DescCard, href: "/learn" },
    { num: "02", title: s.howStep2Title, desc: s.howStep2DescCard, href: "/mock-test" },
    { num: "03", title: s.howStep3Title, desc: s.howStep3DescCard, href: "/dashboard" }
  ];
  return (
    <section className="how-it-works section-pad">
      <div className="container">
        <SectionHead eyebrow={s.sectionEyebrowHow} title={s.howItWorksTitle} />
        <div className="how-steps">
          {steps.map((step) => (
            <Link key={step.num} href={step.href} className="how-step-card">
              <span className="how-step-num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Component ── */
export function LandingClient({ stateCounts }: { stateCounts?: Record<string, number> }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const { uiLang: lang, s } = useLang();
  const { t: tState } = useStateCopy();

  return (
    <main className="page-root">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">{s.heroEyebrow}</div>
            <h1 className="hero-title">{s.heroTitle}</h1>
            <p className="hero-desc">{s.heroDesc}</p>
            <div className="hero-badges">
              <span className="hero-badge">✓ {s.heroBadge1}</span>
              <span className="hero-badge">✓ {s.heroBadge2}</span>
              <span className="hero-badge">✓ {s.heroBadge3}</span>
            </div>
            <a
              href="https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-source-pill"
            >
              <span className="hero-source-dot" aria-hidden="true" />
              {s.heroSourcePill}
            </a>
            <div className="hero-actions">
              <Link href="/practice" className="btn btn-primary">
                <Target size={18} strokeWidth={2} aria-hidden="true" />
                {s.heroCta1}
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                <ClipboardList size={18} strokeWidth={2} aria-hidden="true" />
                {s.heroCta2}
              </Link>
            </div>
            <p className="hero-cta-note">{s.heroCtaNote}</p>
            <HeroStats />
            <div className="hero-proof">
              <span className="hero-proof-dot" />
              {s.heroProof}
            </div>
          </div>

          {/* Right: animated product slideshow */}
          <HeroPhotos lang={lang} />
        </div>
      </section>

      <HowItWorks />

      {/* ── Feature cards ────────────────────────────── */}
      <section className="feature-row">
        <div className="feature-container">
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <Link key={f.href} href={f.href} className="feature-card">
                <div className="feature-icon">
                  <f.Icon size={24} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="feature-text">
                  <strong>{s[`${f.iconKey}Title`]}</strong>
                  <span>{s[`${f.iconKey}Sub`]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust section ────────────────────────────── */}
      <section className="trust-section">
        <div className="trust-inner">
          <SectionHead eyebrow={s.sectionEyebrowTrust} title={s.trustTitle} />
          <div className="trust-grid">
            {TRUST_ITEMS.map(({ Icon, titleKey, bodyKey, hasFlags }) => (
              <div key={titleKey} className="trust-item">
                <div className="trust-icon-wrap" aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className="trust-copy">
                  <strong>{s[titleKey]}</strong>
                  <p>{s[bodyKey]}</p>
                  {hasFlags && (
                    <div className="trust-flags">
                      <FlagImg country="au" />
                      <FlagImg country="br" />
                      <FlagImg country="es" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics grid ──────────────────────────────── */}
      <section className="topics-section">
        <div className="topics-inner">
          <SectionHead eyebrow={s.sectionEyebrowTopics} title={s.topicsTitle} />
          <div className="topics-grid">
            {TOPICS.map((topic) => (
              <Link key={topic.key} href={`/practice?cat=${topic.cat}`} className="topic-card">
                <span className="topic-icon" aria-hidden="true">
                  <topic.Icon size={24} strokeWidth={2} />
                </span>
                <span className="topic-copy">
                  <strong>{s[topic.titleKey]}</strong>
                  <span>{s[topic.descKey]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── States map ───────────────────────────────── */}
      <section className="states-section">
        <div className="states-inner">
          <SectionHead eyebrow={s.sectionEyebrowStates} title={s.statesMapTitle} />
          <div className="states-layout">
            <AustraliaMap
              counts={stateCounts ?? {}}
              slugs={Object.fromEntries(AU_STATES.map((st) => [st.code, st.pageSlug]))}
              questionsWord={s.questionsWord}
              hovered={hoveredState}
              onHover={setHoveredState}
            />
            <div className="states-grid">
              {AU_STATES.map((st) => {
                const isHot = hoveredState === st.code;
                const abbr = STATE_TEST_ABBR.get(st.code);
                const className = `state-card${st.available ? " active" : " coming-soon"}${isHot ? " is-hot" : ""}`;
                const count = stateCounts?.[st.code];
                const inner = (
                  <>
                    <span className="state-code">{st.code}</span>
                    <span className="state-badge">
                      {st.available && count
                        ? `${count} ${s.questionsWord}`
                        : st.available
                          ? s.stateAvailable
                          : s.comingSoon}
                    </span>
                    {abbr && <span className="state-abbr">{abbr}</span>}
                  </>
                );
                const hoverProps = {
                  onMouseEnter: () => setHoveredState(st.code),
                  onMouseLeave: () => setHoveredState(null)
                };
                return st.pageSlug ? (
                  <Link
                    key={st.code}
                    href={`/learner-test/${st.pageSlug}`}
                    className={className}
                    {...hoverProps}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={st.code} className={className} {...hoverProps}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <h2 className="section-title">{s.faqTitle}</h2>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{tState(item.q)}</summary>
                <div className="faq-answer">{tState(item.a)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <Kanga pose="celebrate" size={104} />
          <h2>{s.ctaTitle}</h2>
          <Link href="/practice" className="btn btn-primary">
            {s.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  );
}
