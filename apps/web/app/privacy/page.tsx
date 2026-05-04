import Link from "next/link";

export const metadata = { title: "Privacy — KangaLearner" };

/** Página legal mínima; substituir por política de privacidade formal quando existir. */
export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem", lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "1rem" }}>Privacy</h1>
      <p style={{ color: "var(--muted2, #536778)", marginBottom: "1.25rem" }}>
        This is a placeholder. We aim to collect only what is needed to run the product (e.g. account and practice
        data you choose to sync). Review your Supabase project settings and data processing agreements for the
        authoritative privacy posture. Replace this page with a full policy before public launch.
      </p>
      <p>
        <Link href="/" style={{ color: "var(--green)", fontWeight: 700 }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
