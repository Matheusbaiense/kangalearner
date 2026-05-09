import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KangaLearner — Pass your Australian learner test",
  description:
    "Practice real WA road-rule questions, take a 30-question mock test and track your progress — in English, Portuguese or Spanish."
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
    </main>
  );
}
