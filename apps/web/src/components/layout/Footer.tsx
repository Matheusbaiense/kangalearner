"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";

function FlagImg({ country }: { country: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${country}.png`}
      srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
      width={20}
      height={15}
      alt=""
      aria-hidden="true"
      style={{ borderRadius: 2, objectFit: "cover", display: "block", flexShrink: 0 }}
    />
  );
}

const COMPANY_LINKS = [
  { href: "/about",   en: "About",   pt: "Sobre",   es: "Acerca de" },
  { href: "/contact", en: "Contact", pt: "Contato",  es: "Contacto" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms",   en: "Terms of Service",   pt: "Termos de Uso",          es: "Términos de Servicio" },
  { href: "/privacy", en: "Privacy Policy",     pt: "Política de Privacidade", es: "Política de Privacidad" },
] as const;

type NewsletterStatus = "idle" | "loading" | "success" | "error";

export function Footer() {
  const { uiLang, s } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading" || status === "success") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      setStatus(json?.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function pick(link: { en: string; pt: string; es: string }, lang: UiLang): string {
    return link[lang] ?? link.en;
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Col 1: Brand ── */}
        <div>
          <Link href="/" className="footer-brand">
            <Image src="/brand/logo-mark.svg" alt="KangaLearner" width={28} height={28} />
            <span className="footer-brand-name">KangaLearner</span>
          </Link>
          <p className="footer-tagline">{s.footerTagline}</p>
          <div className="footer-flags">
            <FlagImg country="au" />
            <FlagImg country="br" />
            <FlagImg country="es" />
          </div>
        </div>

        {/* ── Col 2: Product ── */}
        <div>
          <p className="footer-col-title">{s.footerProductTitle}</p>
          <ul className="footer-links">
            <li><Link href="/learn">{s.learn}</Link></li>
            <li><Link href="/practice">{s.practice}</Link></li>
            <li><Link href="/mock-test">{s.mockTest}</Link></li>
            <li><Link href="/progress">{s.progress}</Link></li>
            <li><Link href="/resources">{s.resources}</Link></li>
          </ul>
        </div>

        {/* ── Col 3: Company ── */}
        <div>
          <p className="footer-col-title">{s.footerCompanyTitle}</p>
          <ul className="footer-links">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{pick(l, uiLang)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4: Legal ── */}
        <div>
          <p className="footer-col-title">{s.footerLegalTitle}</p>
          <ul className="footer-links">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{pick(l, uiLang)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 5: Newsletter ── */}
        <div>
          <p className="footer-col-title">{s.footerNewsletterTitle}</p>
          <p className="footer-newsletter-sub">{s.footerNewsletterSub}</p>
          <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
            <input
              className="newsletter-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.newsletterPlaceholder}
              required
              disabled={status === "loading" || status === "success"}
              aria-label={s.newsletterPlaceholder}
            />
            <button
              className="newsletter-btn"
              type="submit"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "…" : s.newsletterBtn}
            </button>
          </form>
          {status === "success" && (
            <p className="newsletter-msg success">{s.newsletterSuccess}</p>
          )}
          {status === "error" && (
            <p className="newsletter-msg error">{s.newsletterError}</p>
          )}
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copyright">{s.footerCopyright}</span>
      </div>
    </footer>
  );
}
