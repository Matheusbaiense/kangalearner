import Link from "next/link";
import Image from "next/image";

// Static server component on purpose: the 404 must render even when client
// providers fail, so copy is inline in the three supported languages.
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "48px 24px",
        textAlign: "center"
      }}
    >
      <Image src="/brand/logo-mark.svg" alt="KangaLearner" width={72} height={72} />
      <h1 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "1.6rem", margin: 0 }}>
        Page not found · Página não encontrada · Página no encontrada
      </h1>
      <p style={{ color: "var(--muted2, #536778)", maxWidth: 480, margin: 0 }}>
        The page you are looking for hopped away. Try one of these instead:
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-secondary" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/practice" className="btn btn-primary" style={{ textDecoration: "none" }}>
          Practice · Praticar · Practicar
        </Link>
      </div>
    </main>
  );
}
