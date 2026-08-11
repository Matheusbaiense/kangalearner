import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "KangaLearner helps learner drivers in Australia prepare for their official learner test with practice questions, mock exams and multilingual support.",
  alternates: { canonical: "https://kangalearner.com.au/about" }
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        About KangaLearner
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        KangaLearner helps learner drivers in Australia prepare for their official learner test with
        practice questions, mock exams and multilingual support. Currently available for Western
        Australia (WA). More states coming soon.
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
