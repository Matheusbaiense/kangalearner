export default function HomePage() {
  return (
    <main style={{ fontFamily: "Inter, sans-serif", padding: 32 }}>
      <h1>KangaLearner Web (Next.js)</h1>
      <p>Monorepo scaffold created. Next step is migrating UI and quiz logic.</p>
      <p style={{ marginTop: 12 }}>
        <a href="/login" style={{ fontWeight: 800 }}>
          Login with Google →
        </a>
      </p>
      <p style={{ marginTop: 10 }}>
        <a href="/practice" style={{ fontWeight: 800 }}>
          Practice (React) →
        </a>
      </p>
    </main>
  );
}
