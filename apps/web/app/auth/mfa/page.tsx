"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeNextPath } from "@/lib/auth/safeNextPath";
import { useLang } from "@/contexts/LangContext";
import { AuthBrand } from "@/components/auth/AuthBrand";

function MfaForm() {
  const searchParams = useSearchParams();
  const redirect = safeNextPath(searchParams.get("redirect") || searchParams.get("next"), "/admin");
  const { s } = useLang();
  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setError(s.authMfaSetupFailed);
      return;
    }
    const client = supabase;
    let cancelled = false;
    async function setup() {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) {
        window.location.href = `/auth/login?redirect=${encodeURIComponent("/auth/mfa")}`;
        return;
      }
      const { data: factors, error: listError } = await client.auth.mfa.listFactors();
      if (cancelled) return;
      if (listError || !factors) {
        setError(s.authMfaSetupFailed);
        setLoading(false);
        return;
      }
      const verified = factors.totp.find((factor) => factor.status === "verified");
      if (verified) {
        setFactorId(verified.id);
        setLoading(false);
        return;
      }
      for (const leftover of factors.totp.filter((factor) => factor.status !== "verified")) {
        await client.auth.mfa.unenroll({ factorId: leftover.id });
      }
      const { data: enrolled, error: enrollError } = await client.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "KangaLearner admin"
      });
      if (cancelled) return;
      if (enrollError || !enrolled) {
        setError(s.authMfaSetupFailed);
        setLoading(false);
        return;
      }
      setFactorId(enrolled.id);
      setQrCode(enrolled.totp.qr_code);
      setLoading(false);
    }
    void setup();
    return () => {
      cancelled = true;
    };
  }, [supabase, s.authMfaSetupFailed]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !factorId) return;
    setSubmitting(true);
    setError(null);
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId
    });
    if (challengeError || !challenge) {
      setError(s.authMfaFailed);
      setSubmitting(false);
      return;
    }
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.trim()
    });
    if (verifyError) {
      setError(s.authMfaFailed);
      setSubmitting(false);
      return;
    }
    window.location.href = redirect;
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <AuthBrand />
        <h1 className="auth-title">{s.authMfaTitle}</h1>
        <p className="auth-sub">{qrCode ? s.authMfaSubEnroll : s.authMfaSubVerify}</p>
        {qrCode ? (
          <img
            src={qrCode}
            alt=""
            width={180}
            height={180}
            style={{ display: "block", margin: "0 auto 1rem" }}
          />
        ) : null}
        {loading ? (
          <p className="auth-footer-note">{s.loading}</p>
        ) : (
          <form onSubmit={handleVerify} className="auth-form">
            {error ? (
              <p className="auth-error" role="alert">
                {error}
              </p>
            ) : null}
            <div className="auth-field form-field">
              <label className="auth-label" htmlFor="auth-mfa-code">
                {s.authMfaCodeLabel}
              </label>
              <input
                id="auth-mfa-code"
                className="auth-input"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-auth-primary"
              disabled={submitting || !supabase || !factorId}
            >
              {submitting ? s.authMfaVerifying : s.authMfaContinue}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function MfaPage() {
  return (
    <Suspense fallback={<main className="auth-page" aria-busy="true" />}>
      <MfaForm />
    </Suspense>
  );
}
