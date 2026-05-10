"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { findTopic } from "@/lib/learnTopics";
import type { UiLang } from "@/lib/i18n";

function tx(obj: Record<UiLang, string>, lang: UiLang): string {
  return obj[lang] ?? obj.en;
}

export default function TopicPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const topic = findTopic(slug);

  const { uiLang: lang, s } = useLang();

  if (!topic) {
    notFound();
    return null;
  }

  const practiceHref = topic.practiceCategory
    ? `/practice?category=${encodeURIComponent(topic.practiceCategory)}`
    : "/practice";

  return (
    <main className="container section-pad">
      <div className="mock-setup-card" style={{ maxWidth: 760 }}>
        {/* Back link */}
        <Link href="/learn" className="btn btn-secondary" style={{ marginBottom: 20, display: "inline-block" }}>
          {s.learnBack}
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <IconBadge icon={Icons[topic.icon]} tone="brand" className="topic-icon" />
          <h1 style={{ fontSize: "1.4rem", fontWeight: 850, lineHeight: 1.2, margin: 0 }}>
            {tx(topic.title, lang)}
          </h1>
        </div>

        {/* Summary */}
        <p style={{ lineHeight: 1.6, marginBottom: 24 }}>{tx(topic.summary, lang)}</p>

        {/* Key Rules */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>{s.learnKeyRules}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.keyRules.map((r, i) => (
              <li key={i}>{tx(r, lang)}</li>
            ))}
          </ul>
        </section>

        {/* Common Mistakes */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>{s.learnMistakes}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.mistakes.map((m, i) => (
              <li key={i}>{tx(m, lang)}</li>
            ))}
          </ul>
        </section>

        {/* Practical Example */}
        <section
          style={{
            marginBottom: 24,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(15,23,42,0.04)",
          }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 8 }}>{s.learnExample}</h2>
          <p style={{ lineHeight: 1.6, margin: 0 }}>{tx(topic.example, lang)}</p>
        </section>

        {/* Quick Check */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>{s.learnQuickCheck}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.quickCheck.map((q, i) => (
              <li key={i}>{tx(q, lang)}</li>
            ))}
          </ul>
        </section>

        {/* Source */}
        <p style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: 24 }}>
          <strong>{s.learnSource}:</strong> {tx(topic.source, lang)}
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={practiceHref} className="btn btn-primary">
            {s.learnPractice}
          </Link>
          <Link href="/practice" className="btn btn-secondary">
            {s.learnAllTopics}
          </Link>
        </div>
      </div>
    </main>
  );
}
