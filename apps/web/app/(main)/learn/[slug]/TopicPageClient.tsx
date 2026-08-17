"use client";

import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { applyStateTokens } from "@kanga/core";
import type { LearnTopic } from "@/lib/learnTopics";
import { useStateCopy } from "@/lib/stateCopy";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";

interface TopicPageClientProps {
  topic: LearnTopic;
}

/** Pull the first official URL out of the topic source string, if present. */
function extractSourceUrl(source: string): string | undefined {
  const match = source.match(/(https?:\/\/)?(www\.)?transport\.wa\.gov\.au[^\s)]*/i);
  if (!match) return undefined;
  const raw = match[0];
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

/** Date the learn content was last reviewed against the official sources. */
const LAST_VERIFIED = "2026-06-01";

export function TopicPageClient({ topic }: TopicPageClientProps) {
  const { uiLang: lang, s } = useLang();
  const { profile, t } = useStateCopy();
  const statePageSlug = STATE_TEST_INFO.find((info) => info.code === profile.code)?.slug;

  const practiceHref = topic.practiceCategory
    ? `/practice?category=${encodeURIComponent(topic.practiceCategory)}`
    : "/practice";

  return (
    <main className="container section-pad">
      <div className="mock-setup-card" style={{ maxWidth: 760 }}>
        <Link
          href="/learn"
          className="btn btn-secondary"
          style={{ marginBottom: 20, display: "inline-block" }}
        >
          {s.learnBack}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <IconBadge icon={Icons[topic.icon]} tone="brand" className="topic-icon" />
          <h1 style={{ fontSize: "1.4rem", fontWeight: 850, lineHeight: 1.2, margin: 0 }}>
            {t(topic.title)}
          </h1>
        </div>

        <p style={{ lineHeight: 1.6, marginBottom: 24 }}>{t(topic.summary)}</p>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>{s.learnKeyRules}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.keyRules.map((r, i) => (
              <li key={i}>{t(r)}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>{s.learnMistakes}</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.mistakes.map((m, i) => (
              <li key={i}>{t(m)}</li>
            ))}
          </ul>
        </section>

        <section
          style={{
            marginBottom: 24,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(15,23,42,0.04)"
          }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 8 }}>{s.learnExample}</h2>
          <p style={{ lineHeight: 1.6, margin: 0 }}>{t(topic.example)}</p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>
            {s.learnQuickCheck}
          </h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            {topic.quickCheck.map((q, i) => (
              <li key={i}>{t(q)}</li>
            ))}
          </ul>
        </section>

        <p style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: 12 }}>
          <strong>{s.learnSource}:</strong> {t(topic.source)}
        </p>

        <div style={{ marginBottom: 24 }}>
          <VerifiedBadge
            lang={lang}
            lastVerified={LAST_VERIFIED}
            sourceUrl={extractSourceUrl(t(topic.source)) ?? profile.handbookUrl}
            reportContext={topic.slug}
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={practiceHref} className="btn btn-primary">
            {s.learnPractice}
          </Link>
          <Link href="/practice" className="btn btn-secondary">
            {s.learnAllTopics}
          </Link>
          {topic.slug === "about-the-test" && statePageSlug ? (
            <Link href={`/learner-test/${statePageSlug}`} className="btn btn-secondary">
              {applyStateTokens(s.learnStateTestCta, profile)}
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
