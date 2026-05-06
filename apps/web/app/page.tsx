import Link from "next/link";
import type { Metadata } from "next";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";

export const metadata: Metadata = {
  title: "KangaLearner — Pass your Australian learner test",
  description:
    "Practice questions, take mock tests and track your progress in English, Portuguese or Spanish."
};

export default function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-badge">Western Australia · WA</div>
          <h1 className="hero-title">
            Pass your learner test
            <br />
            with confidence
          </h1>
          <p className="hero-sub">
            Practice real questions, take timed mock tests, and track your weak spots — in English,
            Portuguese or Spanish.
          </p>
          <div className="hero-ctas">
            <Link href="/practice" className="btn btn-primary">
              Start Practising →
            </Link>
            <Link href="/mock-test" className="btn btn-secondary">
              Take a Mock Test
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-inner">
          {[
            {
              icon: Icons.book,
              title: "Learn",
              sub: "Study road rules by topic with clear explanations.",
              href: "/learn"
            },
            {
              icon: Icons.car,
              title: "Practice",
              sub: "Answer questions filtered by category and difficulty.",
              href: "/practice"
            },
            {
              icon: Icons.mock,
              title: "Mock Test",
              sub: "Simulate the official 30-question WA learner test.",
              href: "/mock-test"
            },
            {
              icon: Icons.progress,
              title: "Progress",
              sub: "See your accuracy by category and review mistakes.",
              href: "/progress"
            }
          ].map((f) => (
            <Link key={f.href} href={f.href} className="feature-card">
              <IconBadge icon={f.icon} tone="brand" />
              <strong>{f.title}</strong>
              <span>{f.sub}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
