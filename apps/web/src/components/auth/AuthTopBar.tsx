"use client";
import { useLang } from "@/contexts/LangContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en",    label: "EN" },
  { code: "pt",    label: "PT" },
  { code: "es",    label: "ES" },
  { code: "pt-en", label: "PT·EN" },
  { code: "es-en", label: "ES·EN" },
];

export function AuthTopBar() {
  const { lang, setLang } = useLang();

  return (
    <div className="auth-topbar">
      <div className="auth-topbar-langs">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            className={`auth-topbar-lang${lang === l.code ? " active" : ""}`}
            onClick={() => setLang(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <ThemeToggle />
    </div>
  );
}
