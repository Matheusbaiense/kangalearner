import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with KangaLearner to report a question error, ask something, or suggest a feature.",
  alternates: { canonical: "https://kangalearner.com.au/contact" }
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>
        Contact
      </h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Have a question, found an error in a question, or want to suggest a feature? We&apos;d love
        to hear from you.
      </p>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        Email us at{" "}
        <a
          href="mailto:hello@kangalearner.com.au"
          style={{ color: "var(--green)", fontWeight: 700 }}
        >
          hello@kangalearner.com.au
        </a>
        . We usually reply within two business days, in English, Portuguese or Spanish.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
