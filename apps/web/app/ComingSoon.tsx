import Link from "next/link";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="app-page">
      <div className="app-container app-section">
        <div className="page-header">
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">{description}</p>
        </div>

        <div className="dash-empty" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ marginTop: 0, marginBottom: 18 }}>
            This section is coming soon. Practice questions are available now.
          </p>
          <Link href="/practice" className="btn btn-primary">
            Go to Practice
          </Link>
        </div>
      </div>
    </main>
  );
}
