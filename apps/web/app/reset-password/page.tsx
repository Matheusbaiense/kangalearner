"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";
import { AuthCard } from "../../src/components/auth/AuthCard";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  const supabase = useMemo(() => {
    try { return createSupabaseBrowserClient(); } catch { return null; }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) setError(error.message);
      setReady(Boolean(data.session));
    });
  }, [supabase]);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setBusy(false); }
    else { setDone(true); setBusy(false); }
  }

  if (done) {
    return (
      <AuthCard title="Password updated">
        <div className="auth-success">
          Your password has been updated successfully.
        </div>
        <div className="auth-card-footer" style={{ marginTop: 20 }}>
          <Link href="/login" className="auth-link">Sign in →</Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Choose new password"
      subtitle="Enter a new password for your account."
    >
      {!ready ? (
        <p style={{ color: "var(--orange)", fontWeight: 700, fontSize: ".88rem", padding: "8px 0" }}>
          Waiting for reset session… If this persists, open the email link again.
        </p>
      ) : (
        <form className="auth-form" onSubmit={updatePassword}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">New password</label>
            <input
              id="password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              className="auth-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-auth-primary"
            disabled={busy || !supabase}
          >
            {busy ? "Updating…" : "Update password"}
          </button>

          <div className="auth-card-footer">
            <Link href="/login" className="auth-link-muted">← Back to login</Link>
          </div>
        </form>
      )}

      {error && <div className="auth-error">{error}</div>}
    </AuthCard>
  );
}
