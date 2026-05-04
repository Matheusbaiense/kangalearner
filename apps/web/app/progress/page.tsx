/**
 * Placeholder protegido pelo middleware (INFRA-10).
 * Utilizadores sem sessão são enviados para `/auth/login?redirect=/progress`.
 */
export default function ProgressPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", marginBottom: "0.5rem" }}>
        Progress
      </h1>
      <p style={{ color: "var(--muted2, #536778)" }}>
        Your learning progress and insights will appear here.
      </p>
    </main>
  );
}
