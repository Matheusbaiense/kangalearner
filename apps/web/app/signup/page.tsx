"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";
import { AuthCard } from "../../src/components/auth/AuthCard";

function SignupForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      }
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    } else {
      setSuccess(true);
      setBusy(false);
    }
  }

  if (success) {
    return (
      <AuthCard title="Check your email">
        <div className="auth-success">
          We sent a confirmation link to <strong>{email}</strong>. Open it to
          activate your account and start saving your progress.
        </div>
        <div className="auth-card-footer" style={{ marginTop: 20 }}>
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="auth-link">
            ← Back to login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Free account to save your scores and track progress."
    >
      <form className="auth-form" onSubmit={signUp}>
        <div className="auth-field">
          <label className="auth-label" htmlFor="email">
            Email
          </label>
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

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">
            Password
            <span
              style={{ fontWeight: 600, color: "var(--muted)", marginLeft: 6 }}
            >
              (min. 8 characters)
            </span>
          </label>
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

        <button
          type="submit"
          className="btn-auth-primary"
          disabled={busy || !supabase}
        >
          {busy ? "Creating account…" : "Create account"}
        </button>

        <div className="auth-card-footer">
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className="auth-link-muted"
          >
            ← Already have an account?
          </Link>
        </div>
      </form>

      {error && <div className="auth-error">{error}</div>}
    </AuthCard>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
