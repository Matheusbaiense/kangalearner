"use client";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { LEARN_TOPICS } from "@/lib/learnTopics";
import type { UiLang } from "@/lib/i18n";

function tx(obj: Record<UiLang, string>, lang: UiLang): string {
  return obj[lang] ?? obj.en;
}

export default function LearnPage() {
  const { uiLang: lang, s } = useLang();
  const special = LEARN_TOPICS.find((t) => t.isSpecial);
  const topics = LEARN_TOPICS.filter((t) => !t.isSpecial);

  return (
    <main className="container section-pad">
      <h1>{s.learnTitle}</h1>
      <p className="page-sub">{s.learnSub}</p>

      {/* Featured "About the Test" card */}
      {special && (
        <Link href={`/learn/${special.slug}`} className="topic-card topic-card--featured">
          <IconBadge icon={Icons[special.icon]} tone="brand" className="topic-icon" />
          <div>
            <strong>{tx(special.title, lang)}</strong>
            <span style={{ display: "block", marginTop: 4, fontSize: ".875rem" }}>
              {tx(special.summary, lang).slice(0, 120)}…
            </span>
          </div>
        </Link>
      )}

      {/* Topic grid */}
      <div className="topics-grid" style={{ marginTop: 24 }}>
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/learn/${topic.slug}`} className="topic-card">
            <IconBadge icon={Icons[topic.icon]} tone="brand" className="topic-icon" />
            <strong>{tx(topic.title, lang)}</strong>
            <span style={{ fontSize: ".8rem", lineHeight: 1.35 }}>
              {tx(topic.summary, lang).slice(0, 80)}…
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
