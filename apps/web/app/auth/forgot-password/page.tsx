"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/contexts/LangContext";
import { AuthBrand } from "@/components/auth/AuthBrand";
import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { captchaAuthOptions, isTurnstileConfigured } from "@/lib/auth/turnstile";
import { getAppOrigin } from "@/lib/auth/getAppOrigin";
import { authErrorToUserMessage } from "@/lib/auth/authErrorMessage";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const { s } = useLang();

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
      redirectTo: `${origin}/auth/reset-password`,
      ...captchaAuthOptions(captchaToken)
    });

    if (resetError) {
      setError(authErrorToUserMessage("reset", resetError));
      setCaptchaToken("");
      setCaptchaReset((n) => n + 1);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="auth-page">
        <AuthBrand />
        <div className="auth-card">
          <div className="auth-success" role="status">
            <div className="auth-success-icon" aria-hidden="true">
              ✉️
            </div>
            <h2>{s.authCheckYourEmail}</h2>
            <p>
              {s.authResetEmailSentPrefix} <strong>{email}</strong>. {s.authResetEmailSentSuffix}
            </p>
          </div>
          <p className="auth-footer-note">
            <Link href="/auth/login">{s.authBackToSignIn}</Link>
          </p>
        </div>
        <p className="auth-tagline">{s.authTagline}</p>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <AuthBrand />

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{s.authResetPassword}</h1>
          <p className="auth-sub">{s.authResetSub}</p>
        </div>

        <form onSubmit={handleReset} className="auth-form">
          <div className="auth-field form-field">
            <label className="auth-label" htmlFor="auth-reset-email">
              {s.emailLabel}
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

          <TurnstileWidget onToken={setCaptchaToken} resetKey={captchaReset} />

          <button
            type="submit"
            className="btn-auth-primary"
            disabled={loading || !supabase || (isTurnstileConfigured() && !captchaToken)}
          >
            {loading ? s.authSending : s.authSendResetLink}
          </button>
        </form>

        <p className="auth-footer-note">
          {s.authRememberedIt} <Link href="/auth/login">{s.signIn}</Link>
        </p>
      </div>

      <p className="auth-tagline">{s.authTagline}</p>
    </main>
  );
}
