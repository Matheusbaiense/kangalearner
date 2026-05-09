"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function getAppOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const origin = getAppOrigin();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${origin}/auth/reset-password`
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="auth-page">
        <Link href="/" className="auth-brand" aria-label="KangaLearner home">
          <span className="auth-logo-name">KangaLearner</span>
        </Link>
        <div className="auth-card">
          <div className="auth-success" role="status">
            <div className="auth-success-icon" aria-hidden="true">✉️</div>
            <h2>Check your email</h2>
            <p>
              We sent a password reset link to <strong>{email}</strong>. Follow the link to choose a
              new password.
            </p>
          </div>
          <p className="auth-footer-note">
            <Link href="/auth/login">← Back to sign in</Link>
          </p>
        </div>
        <p className="auth-tagline">
          Official road rules · Up to date · Trusted by learner drivers Australia-wide
        </p>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <Link href="/" className="auth-brand" aria-label="KangaLearner home">
        <span className="auth-logo-name">KangaLearner</span>
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-sub">Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <form onSubmit={handleReset} className="auth-form">
          <div className="auth-field form-field">
            <label className="auth-label" htmlFor="auth-reset-email">
              Email
            </label>
            <input
              id="auth-reset-email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn-auth-primary" disabled={loading || !supabase}>
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="auth-footer-note">
          Remembered it? <Link href="/auth/login">Sign in</Link>
        </p>
      </div>

      <p className="auth-tagline">
        Official road rules · Up to date · Trusted by learner drivers Australia-wide
      </p>
    </main>
  );
}
