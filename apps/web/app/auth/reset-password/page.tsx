"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) setError(sessionError.message);
      setReady(Boolean(data.session));
    });
  }, [supabase]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <main className="auth-page">
        <Link href="/" className="auth-brand" aria-label="KangaLearner home">
          <span className="auth-logo-name">KangaLearner</span>
        </Link>
        <div className="auth-card">
          <div className="auth-success" role="status">
            <h2>Password updated</h2>
            <p>Your password has been updated successfully.</p>
          </div>
          <p className="auth-footer-note">
            <Link href="/auth/login">Sign in →</Link>
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
          <h1 className="auth-title">Choose a new password</h1>
          <p className="auth-sub">Enter a new password for your account.</p>
        </div>

        {!ready ? (
          <p className="auth-sub" style={{ color: "var(--orange)", padding: "8px 0" }}>
            Waiting for reset session… If this persists, open the email link again.
          </p>
        ) : (
          <form onSubmit={handleUpdate} className="auth-form">
            <div className="auth-field form-field">
              <label className="auth-label" htmlFor="auth-new-password">
                New password
              </label>
              <input
                id="auth-new-password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
                minLength={8}
              />
            </div>

            <div className="auth-field form-field">
              <label className="auth-label" htmlFor="auth-confirm-password">
                Confirm password
              </label>
              <input
                id="auth-confirm-password"
                className="auth-input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                autoComplete="new-password"
                minLength={8}
              />
            </div>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn-auth-primary" disabled={loading || !supabase}>
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        )}

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
