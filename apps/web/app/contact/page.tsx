import Link from "next/link";

export const metadata = { title: "Contact — KangaLearner" };

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        Contact
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Have a question, found an error in a question, or want to suggest a feature? We'd love to
        hear from you.
      </p>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Contact options and a support form are coming soon. In the meantime, reach out via the
        newsletter form in the footer and we'll get back to you.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
