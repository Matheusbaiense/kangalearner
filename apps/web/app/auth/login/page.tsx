"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeNextPath } from "@/lib/auth/safeNextPath";

function getAppOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = safeNextPath(searchParams.get("redirect") || searchParams.get("next"), "/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });

    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }

    const { runLocalAttemptMigration } = await import("@/lib/migrateLocalAttempts");
    await runLocalAttemptMigration();
    // Full navigation so the middleware picks up the new Supabase session cookie
    window.location.href = redirect;
  }

  async function handleGoogleLogin() {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const origin = getAppOrigin();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      }
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <Link href="/" className="auth-brand" aria-label="KangaLearner home">
        <span className="auth-logo-name">KangaLearner</span>
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">
            Sign in to access your progress, insights and mock test history.
          </p>
        </div>

        {!supabase && (
          <div className="auth-error" role="alert">
            Authentication service unavailable. Please refresh the page or try again later.
          </div>
        )}

        <button
          className="btn-google"
          onClick={handleGoogleLogin}
          disabled={loading || !supabase}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleEmailLogin} className="auth-form">
          <div className="auth-field form-field">
            <label className="auth-label" htmlFor="auth-login-email">
              Email
            </label>
            <input
              id="auth-login-email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field form-field">
            <label className="auth-label auth-label-row" htmlFor="auth-login-password">
              <span>Password</span>
              <Link href="/auth/forgot-password" className="form-field-link">
                Forgot password?
              </Link>
            </label>
            <input
              id="auth-login-password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              minLength={8}
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn-auth-primary" disabled={loading || !supabase}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer-note">
          Don&apos;t have an account?{" "}
          <Link href={`/auth/signup?redirect=${encodeURIComponent(redirect)}`}>Create one</Link>
        </p>
      </div>

      <p className="auth-tagline">
        Official road rules · Up to date · Trusted by learner drivers Australia-wide
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="auth-page" aria-busy="true" />}>
      <LoginForm />
    </Suspense>
  );
}
