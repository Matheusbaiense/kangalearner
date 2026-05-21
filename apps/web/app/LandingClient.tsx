"use client";

import { useState, useEffect, useCallback } from "react";
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
  BookOpen,
  Target,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { tx } from "@/lib/i18n";
import { FlagImg } from "@/components/ui/FlagImg";

/* ── Data ── */
const FEATURES: { href: string; iconKey: "feat1" | "feat2" | "feat3" | "feat4"; Icon: LucideIcon }[] = [
  { href: "/learn",     iconKey: "feat1", Icon: BookOpen     },
  { href: "/practice",  iconKey: "feat2", Icon: Target        },
  { href: "/mock-test", iconKey: "feat3", Icon: ClipboardList },
  { href: "/progress",  iconKey: "feat4", Icon: TrendingUp    },
];

const TOPICS = [
  { key: "Speed",   Icon: Gauge,          titleKey: "topicSpeed" as const,   descKey: "topicSpeedDesc" as const,   cat: "speed_limits" },
  { key: "Signs",   Icon: TrafficCone,    titleKey: "topicSigns" as const,   descKey: "topicSignsDesc" as const,   cat: "road_signs" },
  { key: "Parking", Icon: ParkingCircle,  titleKey: "topicParking" as const, descKey: "topicParkingDesc" as const, cat: "parking" },
  { key: "Alcohol", Icon: AlertTriangle,  titleKey: "topicAlcohol" as const, descKey: "topicAlcoholDesc" as const, cat: "alcohol_drugs" },
  { key: "Lanes",   Icon: ArrowLeftRight, titleKey: "topicLanes" as const,   descKey: "topicLanesDesc" as const,   cat: "lane_discipline" },
  { key: "Safety",  Icon: ShieldCheck,    titleKey: "topicSafety" as const,  descKey: "topicSafetyDesc" as const,  cat: "road_safety" },
] as const;

const TRUST_ITEMS = [
  { Icon: Globe,        titleKey: "trustMultiTitle" as const, bodyKey: "trustMultiBody" as const, hasFlags: true },
  { Icon: Database,     titleKey: "trustSaveTitle" as const,  bodyKey: "trustSaveBody" as const,  hasFlags: false },
  { Icon: Check,        titleKey: "trustOfficialTitle" as const, bodyKey: "trustOfficialBody" as const, hasFlags: false },
] as const;

// Show WA (active) + 3 next states (coming soon). SA/TAS/ACT/NT hidden to reduce noise.
const AU_STATES = [
  { code: "WA",  available: true },
  { code: "NSW", available: false },
  { code: "VIC", available: false },
  { code: "QLD", available: false },
];

const TESTIMONIALS = [
  {
    name: "Carlos M.", state: "WA", country: "br",
    quote: {
      en: "Passed first try! The questions in Portuguese made everything so much easier to understand.",
      pt: "Passei na primeira tentativa! As perguntas em português tornaram tudo muito mais fácil de entender.",
      es: "¡Pasé en el primer intento! Las preguntas en portugués hicieron que todo fuera más fácil de entender.",
    },
  },
  {
    name: "Ana R.", state: "WA", country: "es",
    quote: {
      en: "Perfect for someone who doesn't speak fluent English. I studied in Spanish and passed with no problems.",
      pt: "Perfeito para quem não fala inglês fluente. Estudei em espanhol e passei sem problemas.",
      es: "Perfecto para alguien que no habla inglés fluido. Pude estudiar en español y aprobar sin problemas.",
    },
  },
  {
    name: "Michael T.", state: "WA", country: "au",
    quote: {
      en: "The mock test mode is brilliant — I did it 3 times until I consistently got over 90%. Passed first go!",
      pt: "O modo simulado é ótimo — fiz 3 vezes até conseguir mais de 90% sempre. Passei na primeira!",
      es: "El modo simulacro es brillante — lo hice 3 veces hasta conseguir más del 90% siempre. ¡Aprobé!",
    },
  },
  {
    name: "Linh N.", state: "VIC", country: "vn",
    quote: {
      en: "I was nervous about studying in a second language, but the clear explanations made everything click. Passed easily!",
      pt: "Estava nervosa em estudar em um segundo idioma, mas as explicações claras fizeram tudo fazer sentido. Passei com facilidade!",
      es: "Estaba nerviosa estudiando en un segundo idioma, pero las explicaciones claras lo hicieron todo muy claro. ¡Aprobé fácilmente!",
    },
  },
  {
    name: "Priya S.", state: "NSW", country: "in",
    quote: {
      en: "I had failed twice before. After two weeks on KangaLearner the explanations finally made the rules stick. Third time's the charm!",
      pt: "Havia reprovado duas vezes antes. Após duas semanas no KangaLearner as explicações finalmente fixaram as regras. Terceira é a sorte!",
      es: "Había reprobado dos veces antes. Después de dos semanas en KangaLearner las explicaciones hicieron que las reglas se quedaran. ¡A la tercera va la vencida!",
    },
  },
  {
    name: "Marco R.", state: "WA", country: "it",
    quote: {
      en: "Great app for new immigrants. You actually learn the road rules instead of just memorising — that's the difference.",
      pt: "Ótimo app para novos imigrantes. Você realmente aprende as regras de trânsito em vez de só decorar — essa é a diferença.",
      es: "Excelente app para nuevos inmigrantes. Realmente aprendes las normas de tráfico en lugar de solo memorizarlas — esa es la diferencia.",
    },
  },
  {
    name: "Mei L.", state: "QLD", country: "cn",
    quote: {
      en: "The practice mode shows exactly where you're weak. I focused on road signs and went from 60% to 93% in one week.",
      pt: "O modo de prática mostra exatamente onde você é fraco. Foquei nos sinais e fui de 60% para 93% em uma semana.",
      es: "El modo de práctica muestra exactamente dónde estás débil. Me centré en las señales y fui del 60% al 93% en una semana.",
    },
  },
  {
    name: "João S.", state: "WA", country: "br",
    quote: {
      en: "As a Brazilian, studying in Portuguese was essential. This is the only app that takes multilingual learners seriously.",
      pt: "Como brasileiro, estudar em português foi essencial. Esse é o único app que leva a sério os estudantes multilíngues.",
      es: "Como brasileño, estudiar en portugués fue esencial. Esta es la única app que toma en serio a los estudiantes multilingües.",
    },
  },
  {
    name: "Sofia V.", state: "WA", country: "mx",
    quote: {
      en: "Did 5 mock tests before the real one. Scored 100% on the actual test — the questions are almost identical to the official exam!",
      pt: "Fiz 5 simulados antes da prova real. Tirei 100% no exame de verdade — as questões são quase idênticas à prova oficial!",
      es: "¡Hice 5 simulacros antes del examen real. Saqué 100% en el examen de verdad — las preguntas son casi idénticas al oficial!",
    },
  },
  {
    name: "David C.", state: "WA", country: "au",
    quote: {
      en: "Some road rules were really confusing even as an English speaker. This app broke everything down perfectly. First try pass!",
      pt: "Algumas regras de trânsito eram muito confusas mesmo sendo falante de inglês. Esse app explicou tudo perfeitamente. Passei na primeira!",
      es: "Algunas normas de tráfico eran muy confusas incluso siendo anglohablante. Esta app lo explicó todo perfectamente. ¡Aprobé al primer intento!",
    },
  },
];

const FAQS = [
  {
    q: { en: "How many questions are in the real WA learner test?", pt: "Quantas questões tem a prova de learner de WA?", es: "¿Cuántas preguntas tiene el examen learner de WA?" },
    a: { en: "The official WA learner test has 30 multiple-choice questions. You need to answer at least 24 correctly (80%) to pass.", pt: "A prova oficial de learner de WA tem 30 questões de múltipla escolha. Você precisa acertar pelo menos 24 (80%) para passar.", es: "El examen oficial learner de WA tiene 30 preguntas de opción múltiple. Necesitas responder al menos 24 correctamente (80%) para aprobar." },
  },
  {
    q: { en: "Is KangaLearner free?", pt: "O KangaLearner é gratuito?", es: "¿KangaLearner es gratuito?" },
    a: { en: "Yes, completely free. Practice as many questions as you like, take unlimited mock tests, and track your progress — no sign-up required to start.", pt: "Sim, completamente gratuito. Pratique quantas perguntas quiser, faça simulados ilimitados e acompanhe seu progresso — não é necessário se cadastrar para começar.", es: "Sí, completamente gratis. Practica tantas preguntas como quieras, haz simulacros ilimitados y sigue tu progreso — no necesitas registrarte para empezar." },
  },
  {
    q: { en: "Can I study in Portuguese or Spanish?", pt: "Posso estudar em português ou espanhol?", es: "¿Puedo estudiar en portugués o español?" },
    a: { en: "Absolutely. KangaLearner supports English, Português, and Español. Every question, explanation, and hint is available in all three languages.", pt: "Com certeza. O KangaLearner suporta inglês, português e espanhol. Cada pergunta, explicação e dica está disponível nos três idiomas.", es: "Por supuesto. KangaLearner soporta inglés, português y español. Cada pregunta, explicación y pista está disponible en los tres idiomas." },
  },
  {
    q: { en: "How is the mock test different from practice mode?", pt: "Qual a diferença entre o simulado e o modo de prática?", es: "¿En qué se diferencia el simulacro del modo práctica?" },
    a: { en: "The mock test picks 30 random questions and simulates the real exam. Practice mode lets you filter by topic, review wrong answers, and study at your own pace.", pt: "O simulado seleciona 30 questões aleatórias e simula a prova real. O modo de prática permite filtrar por tópico, revisar respostas erradas e estudar no seu ritmo.", es: "El simulacro selecciona 30 preguntas aleatorias y simula el examen real. El modo práctica te permite filtrar por tema, revisar respuestas incorrectas y estudiar a tu ritmo." },
  },
  {
    q: { en: "When will other Australian states be available?", pt: "Quando outros estados australianos estarão disponíveis?", es: "¿Cuándo estarán disponibles otros estados australianos?" },
    a: { en: "We're working on NSW, VIC, and QLD — sign up to be notified when they launch.", pt: "Estamos trabalhando em NSW, VIC e QLD — cadastre-se para ser notificado quando lançarmos.", es: "Estamos trabajando en NSW, VIC y QLD — regístrate para ser notificado cuando se lancen." },
  },
];

/* ── Hero Slideshow ── */
const SLIDE_INTERVAL = 4500;
const SLIDE_COUNT = 4;

function SlideLearn({ lang }: { lang: UiLang }) {
  const chips = [
    { Icon: Gauge,          label: { en: "Speed Limits",  pt: "Velocidade",       es: "Velocidad" } },
    { Icon: TrafficCone,    label: { en: "Road Signs",    pt: "Sinais",            es: "Señales" } },
    { Icon: ParkingCircle,  label: { en: "Parking Rules", pt: "Estacionamento",   es: "Estacionamiento" } },
    { Icon: AlertTriangle,  label: { en: "Alcohol & BAC", pt: "Álcool / BAC",     es: "Alcohol / BAC" } },
    { Icon: ArrowLeftRight, label: { en: "Lanes",         pt: "Faixas",           es: "Carriles" } },
    { Icon: ShieldCheck,    label: { en: "Road Safety",   pt: "Segurança",        es: "Seguridad" } },
  ];
  const hint = { en: "6 topics · 200+ questions", pt: "6 tópicos · 200+ perguntas", es: "6 temas · 200+ preguntas" };
  return (
    <>
      <div className="slide-header">
        <BookOpen size={16} strokeWidth={2} className="slide-header-icon" aria-hidden="true" />
        <span className="slide-header-label">{lang === "pt" ? "Aprender Tópicos" : lang === "es" ? "Aprender Temas" : "Learn Topics"}</span>
      </div>
      <div className="slide-chip-grid">
        {chips.map(({ Icon, label }) => (
          <div key={label.en} className="slide-chip">
            <span className="slide-chip-icon"><Icon size={16} strokeWidth={2} aria-hidden="true" /></span>
            <span>{tx(label, lang)}</span>
          </div>
        ))}
      </div>
      <div className="slide-hint">{tx(hint, lang)}</div>
    </>
  );
}

function SlidePractice({ lang }: { lang: UiLang }) {
  const question = {
    en: "What does a yellow traffic light mean at an intersection?",
    pt: "O que significa um semáforo amarelo numa interseção?",
    es: "¿Qué significa un semáforo amarillo en una intersección?",
  };
  const options: { en: string; pt: string; es: string; correct: boolean }[] = [
    { en: "Stop if it is safe to do so", pt: "Pare se for seguro fazê-lo", es: "Detenerse si es seguro", correct: true },
    { en: "Speed up to clear the intersection", pt: "Acelere para cruzar", es: "Acelera para cruzar", correct: false },
    { en: "Sound your horn before proceeding", pt: "Toque a buzina antes", es: "Toca el claxon antes", correct: false },
  ];
  return (
    <>
      <div className="slide-header">
        <Target size={16} strokeWidth={2} className="slide-header-icon" aria-hidden="true" />
        <span className="slide-header-label">{lang === "pt" ? "Modo Prática" : lang === "es" ? "Modo Práctica" : "Practice Mode"}</span>
        <span className="slide-progress-pill">17 / 30</span>
      </div>
      <div className="slide-prog-wrap">
        <div className="slide-prog-bar" style={{ width: "57%" }} />
      </div>
      <p className="slide-question">{tx(question, lang)}</p>
      <div className="slide-options">
        {options.map((opt, i) => (
          <div key={i} className={`slide-option${opt.correct ? " correct" : ""}`}>
            <span className={`slide-opt-letter${opt.correct ? " correct" : ""}`}>
              {opt.correct ? "✓" : String.fromCharCode(65 + i)}
            </span>
            <span>{tx({ en: opt.en, pt: opt.pt, es: opt.es }, lang)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SlideMock({ lang }: { lang: UiLang }) {
  const labelScore = { en: "24 of 30 correct", pt: "24 de 30 corretas", es: "24 de 30 correctas" };
  const passLabel  = { en: "PASS", pt: "APROVADO", es: "APROBADO" };
  const categories = [
    { label: { en: "Speed Limits", pt: "Velocidade",     es: "Velocidad" },  score: "5/5", ok: true  },
    { label: { en: "Road Signs",   pt: "Sinais",          es: "Señales" },    score: "5/5", ok: true  },
    { label: { en: "Parking",      pt: "Estacionamento",  es: "Estacionamiento" }, score: "5/5", ok: true  },
    { label: { en: "Alcohol & BAC",pt: "Álcool / BAC",   es: "Alcohol / BAC" }, score: "4/5", ok: true  },
    { label: { en: "Lanes",        pt: "Faixas",          es: "Carriles" },   score: "4/5", ok: true  },
    { label: { en: "Road Safety",  pt: "Segurança",       es: "Seguridad" },  score: "3/5", ok: false },
  ];
  const circumference = 2 * Math.PI * 34;
  const offset = circumference * (1 - 0.80);
  return (
    <>
      <div className="slide-header">
        <ClipboardList size={16} strokeWidth={2} className="slide-header-icon" aria-hidden="true" />
        <span className="slide-header-label">{lang === "pt" ? "Simulado" : lang === "es" ? "Simulacro" : "Mock Test"}</span>
      </div>
      <div className="slide-score-wrap">
        <div className="slide-score-ring">
          <svg viewBox="0 0 80 80" width="96" height="96">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="var(--green2)" strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
          </svg>
          <span className="slide-score-num">80%</span>
        </div>
        <div className="slide-score-meta">
          <span className="slide-score-frac">{tx(labelScore, lang)}</span>
        </div>
        <span className="slide-pass-badge">{tx(passLabel, lang)}</span>
      </div>
      <div className="slide-mock-divider" aria-hidden="true" />
      <div className="slide-mock-results">
        {categories.map(({ label, score, ok }) => (
          <div key={label.en} className="slide-mock-row">
            <span className="slide-mock-label">{tx(label, lang)}</span>
            <span className={`slide-mock-score${ok ? "" : " fail"}`}>{score}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SlideProgress({ lang }: { lang: UiLang }) {
  const title = { en: "Your Progress", pt: "Seu Progresso", es: "Tu Progreso" };
  const bars = [
    { label: { en: "Speed Limits", pt: "Velocidade",     es: "Velocidad" },   pct: 92, color: "var(--green2)" },
    { label: { en: "Road Signs",   pt: "Sinais",          es: "Señales" },     pct: 78, color: "var(--green2)" },
    { label: { en: "Alcohol & BAC",pt: "Álcool / BAC",   es: "Alcohol / BAC" },pct: 65, color: "var(--orange)" },
    { label: { en: "Parking Rules",pt: "Estacionamento", es: "Estacionamiento" },pct: 54, color: "var(--red)" },
    { label: { en: "Lanes",        pt: "Faixas",          es: "Carriles" },    pct: 71, color: "var(--orange)" },
    { label: { en: "Road Safety",  pt: "Segurança",       es: "Seguridad" },   pct: 83, color: "var(--green2)" },
  ];
  return (
    <>
      <div className="slide-header">
        <TrendingUp size={16} strokeWidth={2} className="slide-header-icon" aria-hidden="true" />
        <span className="slide-header-label">{tx(title, lang)}</span>
      </div>
      <div className="slide-cat-bars">
        {bars.map(({ label, pct, color }) => (
          <div key={label.en} className="slide-cat-row">
            <span className="slide-cat-label">{tx(label, lang)}</span>
            <div className="slide-cat-track">
              <div className="slide-cat-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="slide-cat-pct">{pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
}

function HeroSlideshow({ lang }: { lang: UiLang }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setSlideIdx(idx);
      setVisible(true);
    }, 280);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((slideIdx + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slideIdx, goTo]);

  const slides = [SlideLearn, SlidePractice, SlideMock, SlideProgress];
  const SlideComponent = slides[slideIdx];

  return (
    <div className="hero-slideshow" aria-live="polite" aria-atomic="true">
      <div className="hero-slide-card">
        <div className={`hero-slide-content${visible ? " slide-visible" : " slide-hidden"}`}>
          <SlideComponent lang={lang} />
        </div>
      </div>
      <div className="slide-dots" role="tablist" aria-label="Product preview slides">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            className={`slide-dot${i === slideIdx ? " active" : ""}`}
            role="tab"
            aria-selected={i === slideIdx}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Testimonial Carousel ── */
function TestimonialCarousel({ lang }: { lang: UiLang }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx(i => (i + 1) % TESTIMONIALS.length);

  const visible = [0, 1, 2].map(offset => TESTIMONIALS[(idx + offset) % TESTIMONIALS.length]);

  return (
    <div className="testimonial-carousel">
      <button className="testimonial-nav" onClick={prev} aria-label="Previous testimonial">&#8249;</button>
      <div className="testimonial-track-wrap">
        <div key={idx} className="testimonial-track">
          {visible.map((t) => (
            <article key={`${idx}-${t.name}`} className="testimonial-card">
              <p className="testimonial-quote">&ldquo;{tx(t.quote, lang)}&rdquo;</p>
              <div className="testimonial-author">
                <FlagImg country={t.country} />
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-state">{t.state}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <button className="testimonial-nav" onClick={next} aria-label="Next testimonial">&#8250;</button>
      <div className="testimonial-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Component ── */
export function LandingClient() {
  const { uiLang: lang, s } = useLang();

  return (
    <main className="page-root">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">{s.heroEyebrow}</div>
            <h1 className="hero-title">{s.heroTitle}</h1>
            <p className="hero-desc">{s.heroDesc}</p>
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
            <div className="hero-proof">
              <span className="hero-proof-dot" />
              {s.heroProof}
            </div>
          </div>

          {/* Right: animated product slideshow */}
          <HeroSlideshow lang={lang} />
        </div>
      </section>

      {/* ── How it works strip ───────────────────────── */}
      <section className="how-strip">
        <div className="how-strip-inner">
          <div className="how-step">
            <span className="how-step-num">1</span>
            <div className="how-step-body">
              <span className="how-step-label">{s.howStep1Label}</span>
              <span className="how-step-desc">{s.howStep1Desc}</span>
            </div>
          </div>
          <div className="how-arrow" aria-hidden="true">→</div>
          <div className="how-step">
            <span className="how-step-num">2</span>
            <div className="how-step-body">
              <span className="how-step-label">{s.howStep2Label}</span>
              <span className="how-step-desc">{s.howStep2Desc}</span>
            </div>
          </div>
          <div className="how-arrow" aria-hidden="true">→</div>
          <div className="how-step">
            <span className="how-step-num">3</span>
            <div className="how-step-body">
              <span className="how-step-label">{s.howStep3Label}</span>
              <span className="how-step-desc">{s.howStep3Desc}</span>
            </div>
          </div>
        </div>
      </section>

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
          <h2 className="section-title">{s.trustTitle}</h2>
          <div className="trust-grid">
            {TRUST_ITEMS.map(({ Icon, titleKey, bodyKey, hasFlags }) => (
              <div key={titleKey} className="trust-item">
                <div className="trust-icon-wrap" aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <strong>{s[titleKey]}</strong>
                <p>{s[bodyKey]}</p>
                {hasFlags && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
                    <FlagImg country="au" /><FlagImg country="br" /><FlagImg country="es" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics grid ──────────────────────────────── */}
      <section className="topics-section">
        <div className="topics-inner">
          <h2 className="section-title">{s.topicsTitle}</h2>
          <div className="topics-grid">
            {TOPICS.map((topic) => (
              <Link
                key={topic.key}
                href={`/practice?cat=${topic.cat}`}
                className="topic-card"
              >
                <span className="topic-icon" aria-hidden="true">
                  <topic.Icon size={24} strokeWidth={2} />
                </span>
                <strong>{s[topic.titleKey]}</strong>
                <span>{s[topic.descKey]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── States strip ─────────────────────────────── */}
      <section className="states-section">
        <div className="states-inner">
          <div className="states-grid">
            {AU_STATES.map((st) => (
              <div key={st.code} className={`state-card${st.available ? " active" : " coming-soon"}`}>
                <span className="state-code">{st.code}</span>
                <span className="state-badge">
                  {st.available ? s.stateAvailable : s.comingSoon}
                </span>
              </div>
            ))}
          </div>
          <p className="states-more-note">
            {s.statesMoreNote ?? "More states coming soon —"}{" "}
            <Link href="/auth/signup" className="states-more-link">
              {s.statesMoreLink ?? "sign up to be notified"}
            </Link>
          </p>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <h2 className="section-title">{s.testimonialsTitle}</h2>
          <TestimonialCarousel lang={lang} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <h2 className="section-title">{s.faqTitle}</h2>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{tx(item.q, lang)}</summary>
                <div className="faq-answer">{tx(item.a, lang)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>{s.ctaTitle}</h2>
          <Link href="/practice" className="btn btn-primary">
            {s.ctaBtn}
          </Link>
        </div>
      </section>

    </main>
  );
}
