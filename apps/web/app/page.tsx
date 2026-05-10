import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KangaLearner — Pass your WA learner test | Free practice",
  description:
    "Practice real Western Australia road-rule questions in English, Portuguese or Spanish. 200+ questions, 30-question mock test, instant feedback. Free forever.",
  keywords:
    "WA learner test, Western Australia learner licence, road rules practice, learner driver test, driver knowledge test",
  openGraph: {
    title: "KangaLearner — Pass your WA learner test",
    description:
      "Practice real WA road-rule questions in English, Português or Español. Free mock tests with instant feedback.",
    type: "website",
    locale: "en_AU"
  }
};

const FEATURES = [
  {
    href: "/learn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Learn",
    sub: "Study road rules by topic with clear explanations."
  },
  {
    href: "/practice",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
    title: "Practice",
    sub: "Answer questions filtered by category and difficulty."
  },
  {
    href: "/mock-test",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 4h12v3a6 6 0 0 1-12 0V4Z" />
        <path d="M12 13v4" />
        <path d="M8 21h8" />
      </svg>
    ),
    title: "Mock Test",
    sub: "Simulate the official 30-question WA learner test."
  },
  {
    href: "/progress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Progress",
    sub: "See your accuracy by category and review mistakes."
  }
];

const TESTIMONIALS = [
  {
    name: "Carlos M.",
    state: "WA",
    flag: "🇧🇷",
    lang: "Português",
    quote:
      "Passei na primeira tentativa! As perguntas em português tornaram tudo muito mais fácil de entender."
  },
  {
    name: "Ana R.",
    state: "WA",
    flag: "🇪🇸",
    lang: "Español",
    quote:
      "Perfecto para alguien que no habla inglés fluido. Pude estudiar en español y aprobar sin problemas."
  },
  {
    name: "Michael T.",
    state: "WA",
    flag: "🇦🇺",
    lang: "English",
    quote:
      "The mock test mode is brilliant — I did it 3 times until I consistently got over 90%. Passed first go!"
  }
];

const FAQS = [
  {
    q: "How many questions are in the real WA learner test?",
    a: "The official WA learner test has 30 multiple-choice questions. You need to answer at least 26 correctly (87%) to pass."
  },
  {
    q: "Is KangaLearner free?",
    a: "Yes, completely free. Practice as many questions as you like, take unlimited mock tests, and track your progress — no sign-up required to start."
  },
  {
    q: "Can I study in Portuguese or Spanish?",
    a: "Absolutely. KangaLearner supports English, Português, and Español. Every question, explanation, and hint is available in all three languages."
  },
  {
    q: "How is the mock test different from practice mode?",
    a: "The mock test picks 30 random questions and simulates the real exam. Practice mode lets you filter by topic, review wrong answers, and study at your own pace."
  },
  {
    q: "When will other Australian states be available?",
    a: "We're working on NSW, VIC, and QLD — sign up to be notified when they launch."
  }
];

export default function HomePage() {
  return (
    <main className="page-root">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-inner">
          {/* Left: copy */}
          <div className="hero-copy">
            <div className="hero-eyebrow">WA learner test practice</div>

            <h1 className="hero-title">
              Prepare for your WA learner test
              <br />
              with confidence
            </h1>

            <p className="hero-desc">
              Practice real questions, take timed mock tests, and track your weak spots — in
              English, Portuguese or Spanish.
            </p>

            <div className="hero-actions">
              <Link href="/practice" className="btn btn-primary">
                <Image src="/icons/practice.svg" alt="" width={18} height={18} />
                Start practising WA questions →
              </Link>
              <Link href="/mock-test" className="btn btn-secondary">
                <Image src="/icons/mock.svg" alt="" width={18} height={18} />
                Take the 30-question mock test →
              </Link>
            </div>

            <div className="hero-proof">
              <span className="hero-proof-dot" />
              WA available now. Other Australian states coming soon.
            </div>
          </div>

          {/* Right: quiz preview mockup */}
          <div className="hero-preview">
            {/* Practice card */}
            <div className="preview-card">
              <div className="preview-header">
                <span className="preview-label">Practice Session</span>
                <span className="preview-badge">17 / 30</span>
              </div>
              <div className="preview-progress-bar">
                <div className="preview-progress-fill" />
              </div>
              <p className="preview-question">
                What does a yellow traffic light mean at an intersection?
              </p>
              <div className="preview-options">
                {[
                  { letter: "A", text: "Stop if it is safe to do so", correct: true },
                  { letter: "B", text: "Speed up to clear the intersection" },
                  { letter: "C", text: "Sound your horn before proceeding" }
                ].map((opt) => (
                  <div key={opt.letter} className={`preview-option${opt.correct ? " correct" : ""}`}>
                    <span className="preview-option-dot">
                      {opt.correct ? "✓" : opt.letter}
                    </span>
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="preview-stats">
              <div className="preview-card preview-stat-card">
                <div className="preview-stat-value">72%</div>
                <div className="preview-stat-label">Correct</div>
              </div>
              <div className="preview-card preview-stat-card">
                <div className="preview-stat-value">4</div>
                <div className="preview-stat-label">To Review</div>
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
            <span className="proof-item-label">Questions</span>
          </div>
          <div className="proof-item">
            <span className="proof-item-value">3</span>
            <span className="proof-item-label">Languages</span>
          </div>
          <div className="proof-item">
            <span className="proof-item-value">Free</span>
            <span className="proof-item-label">Forever</span>
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────── */}
      <section className="feature-row">
        <div className="feature-container">
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <Link key={f.href} href={f.href} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <h2 className="section-title">What learners say</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="testimonial-card">
                <p className="testimonial-quote">“{t.quote}”</p>
                <div className="testimonial-author">
                  <span className="testimonial-flag" aria-hidden>
                    {t.flag}
                  </span>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-state">
                      {t.state} · {t.lang}
                    </div>
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
          <h2 className="section-title">Frequently asked questions</h2>
          <div className="faq-list">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to pass your learner test?</h2>
          <Link href="/practice" className="btn btn-primary">
            Start practising now →
          </Link>
        </div>
      </section>
    </main>
  );
}
