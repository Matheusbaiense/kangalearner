import Link from "next/link";

export const metadata = { title: "Terms — KangaLearner" };

/** Página legal mínima; substituir por texto aprovado juridicamente quando existir. */
export default function TermsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        Terms of use
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        This is a placeholder summary. KangaLearner is provided for internal product development and
        learner practice. Content does not replace official road authority materials. By using the
        service you agree to use it responsibly and in accordance with applicable law.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
