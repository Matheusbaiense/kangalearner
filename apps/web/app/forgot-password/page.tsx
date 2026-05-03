"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";
import { AuthCard } from "../../src/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const supabase = useMemo(() => {
    try { return createSupabaseBrowserClient(); } catch { return null; }
  }, []);

  async function sendReset(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) { setError(error.message); setBusy(false); }
    else { setSent(true); setBusy(false); }
  }

  if (sent) {
    return (
      <AuthCard title="Check your email">
        <div className="auth-success">
          We sent a password reset link to <strong>{email}</strong>. Check your
          inbox and follow the link to choose a new password.
        </div>
        <div className="auth-card-footer" style={{ marginTop: 20 }}>
          <Link href="/login" className="auth-link">← Back to login</Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <form className="auth-form" onSubmit={sendReset}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-auth-primary"
          disabled={busy || !supabase}
        >
          {busy ? "Sending…" : "Send reset link"}
        </button>

        <div className="auth-card-footer">
          <Link href="/login" className="auth-link-muted">← Back to login</Link>
        </div>
      </form>

      {error && <div className="auth-error">{error}</div>}
    </AuthCard>
  );
}
