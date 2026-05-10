"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";

/* ── Helpers ── */
function FlagImg({ country }: { country: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${country}.png`}
      srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
      width={20}
      height={15}
      alt=""
      aria-hidden="true"
      style={{ borderRadius: 2, objectFit: "cover", display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

/* ── Data ── */
const FEATURES = [
  { href: "/learn",     iconKey: "feat1" as const, svgD: ["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"] },
  { href: "/practice",  iconKey: "feat2" as const, svgD: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M9 9h6v6H9z"] },
  { href: "/mock-test", iconKey: "feat3" as const, svgD: ["M6 4h12v3a6 6 0 0 1-12 0V4Z", "M12 13v4", "M8 21h8"] },
  { href: "/progress",  iconKey: "feat4" as const, svgD: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
] as const;

const TOPICS = [
  { key: "Speed",   icon: "🚗", titleKey: "topicSpeed" as const, descKey: "topicSpeedDesc" as const,    cat: "speed_limits" },
  { key: "Signs",   icon: "🛑", titleKey: "topicSigns" as const, descKey: "topicSignsDesc" as const,    cat: "road_signs" },
  { key: "Parking", icon: "🅿️", titleKey: "topicParking" as const, descKey: "topicParkingDesc" as const, cat: "parking" },
  { key: "Alcohol", icon: "🍺", titleKey: "topicAlcohol" as const, descKey: "topicAlcoholDesc" as const, cat: "alcohol_drugs" },
  { key: "Lanes",   icon: "🛣️", titleKey: "topicLanes" as const, descKey: "topicLanesDesc" as const,   cat: "lane_discipline" },
  { key: "Safety",  icon: "⛑️", titleKey: "topicSafety" as const, descKey: "topicSafetyDesc" as const,  cat: "road_safety" },
] as const;

const AU_STATES = [
  { code: "WA",  available: true },
  { code: "NSW", available: false },
  { code: "VIC", available: false },
  { code: "QLD", available: false },
  { code: "SA",  available: false },
  { code: "TAS", available: false },
  { code: "ACT", available: false },
  { code: "NT",  available: false },
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
];

const FAQS = [
  {
    q: { en: "How many questions are in the real WA learner test?", pt: "Quantas questões tem a prova de learner de WA?", es: "¿Cuántas preguntas tiene el examen learner de WA?" },
    a: { en: "The official WA learner test has 30 multiple-choice questions. You need to answer at least 26 correctly (87%) to pass.", pt: "A prova oficial de learner de WA tem 30 questões de múltipla escolha. Você precisa acertar pelo menos 26 (87%) para passar.", es: "El examen oficial learner de WA tiene 30 preguntas de opción múltiple. Necesitas responder al menos 26 correctamente (87%) para aprobar." },
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

function tx(obj: Record<string, string>, lang: UiLang): string {
  return obj[lang] ?? obj.en ?? "";
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
                <Image src="/icons/practice.svg" alt="" width={18} height={18} />
                {s.heroCta1}
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                <Image src="/icons/mock.svg" alt="" width={18} height={18} />
                {s.heroCta2}
              </Link>
            </div>
            <div className="hero-proof">
              <span className="hero-proof-dot" />
              {s.heroProof}
            </div>
          </div>

          {/* Right: quiz preview mockup */}
          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-header">
                <span className="preview-label">
                  {lang === "pt" ? "Sessão de Prática" : lang === "es" ? "Sesión de Práctica" : "Practice Session"}
                </span>
                <span className="preview-badge">17 / 30</span>
              </div>
              <div className="preview-progress-bar">
                <div className="preview-progress-fill" />
              </div>
              <p className="preview-question">
                {lang === "pt"
                  ? "O que significa um semáforo amarelo numa interseção?"
                  : lang === "es"
                    ? "¿Qué significa un semáforo amarillo en una intersección?"
                    : "What does a yellow traffic light mean at an intersection?"}
              </p>
              <div className="preview-options">
                {[
                  {
                    letter: "A",
                    text: lang === "pt" ? "Pare se for seguro fazê-lo" : lang === "es" ? "Detenerse si es seguro hacerlo" : "Stop if it is safe to do so",
                    correct: true,
                  },
                  {
                    letter: "B",
                    text: lang === "pt" ? "Acelere para cruzar" : lang === "es" ? "Acelera para cruzar" : "Speed up to clear the intersection",
                  },
                  {
                    letter: "C",
                    text: lang === "pt" ? "Toque a buzina antes de prosseguir" : lang === "es" ? "Toca el claxon antes de avanzar" : "Sound your horn before proceeding",
                  },
                ].map((opt) => (
                  <div key={opt.letter} className={`preview-option${opt.correct ? " correct" : ""}`}>
                    <span className="preview-option-dot">{opt.correct ? "✓" : opt.letter}</span>
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="preview-stats">
              <div className="preview-card preview-stat-card">
                <div className="preview-stat-value">72%</div>
                <div className="preview-stat-label">
                  {lang === "pt" ? "Corretas" : lang === "es" ? "Correctas" : "Correct"}
                </div>
              </div>
              <div className="preview-card preview-stat-card">
                <div className="preview-stat-value">4</div>
                <div className="preview-stat-label">
                  {lang === "pt" ? "Revisar" : lang === "es" ? "Revisar" : "To Review"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof bar ─────────────────────────── */}
      <section className="proof-bar">
        <div className="proof-bar-inner">
          <div className="proof-item">
            <span className="proof-item-value">200+</span>
            <span className="proof-item-label">{s.proofQuestions}</span>
          </div>
          <div className="proof-item">
            <span className="proof-item-value">3</span>
            <span className="proof-item-label">{s.proofLanguages}</span>
          </div>
          <div className="proof-item">
            <span className="proof-item-value">Free</span>
            <span className="proof-item-label">{s.proofFree}</span>
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    {f.svgD.map((d, i) => <path key={i} d={d} />)}
                  </svg>
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
            <div className="trust-item">
              <div className="trust-icon">🌍</div>
              <strong>{s.trustMultiTitle}</strong>
              <p>{s.trustMultiBody}</p>
              <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
                <FlagImg country="au" /><FlagImg country="br" /><FlagImg country="es" />
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💾</div>
              <strong>{s.trustSaveTitle}</strong>
              <p>{s.trustSaveBody}</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">✅</div>
              <strong>{s.trustOfficialTitle}</strong>
              <p>{s.trustOfficialBody}</p>
            </div>
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
                <span className="topic-icon" aria-hidden="true">{topic.icon}</span>
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
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <h2 className="section-title">{s.testimonialsTitle}</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="testimonial-card">
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
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="faq-section">
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
