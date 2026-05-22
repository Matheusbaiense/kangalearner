"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

export function NewsletterForm() {
  const { s } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      setStatus(json?.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="newsletter-success">{s.footerNewsletterSuccess}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={s.footerNewsletterPlaceholder}
        required
        disabled={status === "loading"}
        className="newsletter-input"
        aria-label={s.footerNewsletterPlaceholder}
      />
      <button type="submit" disabled={status === "loading"} className="newsletter-btn">
        {status === "loading" ? "…" : s.footerNewsletterCta}
      </button>
      {status === "error" && (
        <p className="newsletter-error" role="alert">
          {s.footerNewsletterError}
        </p>
      )}
    </form>
  );
}
