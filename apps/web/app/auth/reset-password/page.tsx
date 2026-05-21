"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const { s } = useLang();

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
      setError(s.authPasswordsDoNotMatch);
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
            <h2>{s.authPasswordUpdated}</h2>
            <p>{s.authPasswordUpdatedSub}</p>
          </div>
          <p className="auth-footer-note">
            <Link href="/auth/login">{s.authSignInArrow}</Link>
          </p>
        </div>
        <p className="auth-tagline">{s.authTagline}</p>
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
          <h1 className="auth-title">{s.authChooseNewPassword}</h1>
          <p className="auth-sub">{s.authChooseNewPasswordSub}</p>
        </div>

        {!ready ? (
          <p className="auth-sub" style={{ color: "var(--orange)", padding: "8px 0" }}>
            {s.authWaitingResetSession}
          </p>
        ) : (
          <form onSubmit={handleUpdate} className="auth-form">
            <div className="auth-field form-field">
              <label className="auth-label" htmlFor="auth-new-password">
                {s.authNewPasswordLabel}
              </label>
              <input
                id="auth-new-password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={s.authAtLeast8}
                required
                autoComplete="new-password"
                minLength={8}
              />
            </div>

            <div className="auth-field form-field">
              <label className="auth-label" htmlFor="auth-confirm-password">
                {s.authConfirmPasswordLabel}
              </label>
              <input
                id="auth-confirm-password"
                className="auth-input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={s.authRepeatYourPassword}
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
              {loading ? s.authUpdating : s.authUpdatePassword}
            </button>
          </form>
        )}

        <p className="auth-footer-note">
          <Link href="/auth/login">{s.authBackToSignIn}</Link>
        </p>
      </div>

      <p className="auth-tagline">{s.authTagline}</p>
    </main>
  );
}
