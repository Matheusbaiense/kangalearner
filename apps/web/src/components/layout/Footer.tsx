"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import type { UiLang } from "@/lib/i18n";
import { FlagImg } from "@/components/ui/FlagImg";
import { NewsletterForm } from "./NewsletterForm";

const COMPANY_LINKS = [
  { href: "/about", en: "About", pt: "Sobre", es: "Acerca de" },
  { href: "/contact", en: "Contact", pt: "Contato", es: "Contacto" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms", en: "Terms of Service", pt: "Termos de Uso", es: "Términos de Servicio" },
  { href: "/privacy", en: "Privacy Policy", pt: "Política de Privacidade", es: "Política de Privacidad" },
] as const;

interface FooterProps {
  isLoggedIn?: boolean;
}

export function Footer({ isLoggedIn = false }: FooterProps) {
  const { uiLang, s } = useLang();

  function pick(link: { en: string; pt: string; es: string }, lang: UiLang): string {
    return link[lang] ?? link.en;
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Col 1: Brand ── */}
        <div>
          <Link href="/" className="footer-brand">
            <Image src="/brand/logo-nav.svg" alt="KangaLearner" width={110} height={28} />
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
            {isLoggedIn && <li><Link href="/progress">{s.progress}</Link></li>}
            <li><Link href="/resources">{s.resources}</Link></li>
            <li><Link href="/#faq">{s.faqTitle}</Link></li>
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
        <div className="footer-newsletter-block">
          <h3 className="footer-newsletter-heading">{s.footerNewsletterTitle}</h3>
          <p className="footer-newsletter-desc">{s.footerNewsletterDesc}</p>
          <NewsletterForm />
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copyright">{s.footerCopyright}</span>
      </div>
    </footer>
  );
}
