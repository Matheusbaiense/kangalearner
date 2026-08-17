"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="app-page">
      <div className="app-container app-section">
        <h1 className="page-title">Something went wrong</h1>
        <p className="page-sub">Please try again. If this keeps happening, come back later.</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button type="button" className="btn" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn-ghost-light">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
