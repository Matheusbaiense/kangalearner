"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../../src/lib/supabase/client";
import { runLocalAttemptMigration } from "../../src/lib/migrateLocalAttempts";
import { AuthCard } from "../../src/components/auth/AuthCard";
import { safeNextPath } from "../../src/lib/auth/safeNextPath";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z"
        fill="#4285F4"
      />
      <path
        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9254L15.0218 2.344C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"), "/account");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  async function signInWithGoogle() {
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      }
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    }
    /* on success the page navigates away — no setBusy(false) needed */
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    } else {
      await runLocalAttemptMigration();
      window.location.assign(next);
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Save your progress and sync across devices."
    >
      {/* Google OAuth */}
      <button
        className="btn-google"
        onClick={signInWithGoogle}
        disabled={busy || !supabase}
      >
        <GoogleIcon />
        {busy ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="auth-divider">
        <span>or</span>
      </div>

      {/* Email + password form */}
      <form className="auth-form" onSubmit={signInWithPassword}>
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
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-auth-primary"
          disabled={busy || !supabase}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <div className="auth-card-footer">
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="auth-link"
          >
            Create account →
          </Link>
          <Link href="/forgot-password" className="auth-link-muted">
            Forgot password?
          </Link>
        </div>
      </form>

      {error && <div className="auth-error">{error}</div>}
    </AuthCard>
  );
}

/* Wrap in Suspense because useSearchParams requires it in Next.js 15 */
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
