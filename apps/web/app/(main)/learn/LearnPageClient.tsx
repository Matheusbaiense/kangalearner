"use client";
import { Fragment } from "react";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { LEARN_TOPICS } from "@/lib/learnTopics";
import { useStateCopy } from "@/lib/stateCopy";

export function LearnPageClient({ learnInlineAd }: { learnInlineAd?: React.ReactNode }) {
  const { s } = useLang();
  const { profile, t } = useStateCopy();

  const visible = LEARN_TOPICS.filter(
    (topic) => !topic.states || topic.states.includes(profile.code)
  );
  const special = visible.find((topic) => topic.isSpecial);
  const topics = visible.filter((topic) => !topic.isSpecial);

  return (
    <main className="container section-pad">
      <h1>{s.learnTitle}</h1>
      <p className="page-sub">{s.learnSub}</p>

      {/* Featured "About the Test" card */}
      {special && (
        <Link href={`/learn/${special.slug}`} className="topic-card topic-card--featured">
          <IconBadge icon={Icons[special.icon]} tone="brand" className="topic-icon" />
          <div>
            <strong>{t(special.title)}</strong>
            <span style={{ display: "block", marginTop: 4, fontSize: ".875rem" }}>
              {t(special.summary).slice(0, 120)}…
            </span>
          </div>
        </Link>
      )}

      {/* Topic grid */}
      <div className="topics-grid" style={{ marginTop: 24 }}>
        {topics.map((topic, index) => (
          <Fragment key={topic.slug}>
            <Link href={`/learn/${topic.slug}`} className="topic-card">
              <IconBadge icon={Icons[topic.icon]} tone="brand" className="topic-icon" />
              <span className="topic-copy">
                <strong>{t(topic.title)}</strong>
                <span style={{ fontSize: ".8rem", lineHeight: 1.35 }}>
                  {t(topic.summary).slice(0, 80)}…
                </span>
              </span>
            </Link>
            {index === 1 ? <div style={{ gridColumn: "1 / -1" }}>{learnInlineAd}</div> : null}
          </Fragment>
        ))}
      </div>
    </main>
  );
}
