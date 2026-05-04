import Link from "next/link";

export default function MockTestResultsPage() {
  return (
    <main className="container section-pad">
      <div className="mock-setup-card">
        <h1>Results — coming soon</h1>
        <p className="mock-meta">This page will show your score, mistakes, and review options.</p>
        <Link href="/mock-test" className="btn btn-secondary">
          Back to setup
        </Link>
      </div>
    </main>
  );
}

