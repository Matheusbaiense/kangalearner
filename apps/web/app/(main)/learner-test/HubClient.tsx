"use client";

import Link from "next/link";
import type { AuStateCode } from "@kanga/core";
import { Kanga } from "@/components/brand/Kanga";
import { useLang } from "@/contexts/LangContext";
import { fill } from "@/lib/i18n";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";

interface Props {
  total: number;
  stateCounts: Array<{ code: AuStateCode; total: number }>;
}

export function HubClient({ total, stateCounts }: Props) {
  const { s } = useLang();
  const countFor = new Map(stateCounts.map((st) => [st.code, st.total]));

  return (
    <>
      <div className="lt-hero">
        <div className="app-container">
          <header className="page-header state-hero">
            <div className="state-hero-copy">
              <h1 className="page-title">{s.ltHubTitle}</h1>
              <p className="page-sub">{fill(s.ltHubSub, { total })}</p>
            </div>
            <Kanga pose="search" size={132} className="state-hero-kanga" />
          </header>

          <p>{s.ltHubIntro}</p>

          <div className="facts-strip">
            <div className="fact-cell">
              <div className="fact-label">{s.ltHubFactQuestions}</div>
              <div className="fact-value">{total}</div>
            </div>
            <div className="fact-cell">
              <div className="fact-label">{s.ltHubFactStates}</div>
              <div className="fact-value">{stateCounts.length}</div>
            </div>
            <div className="fact-cell">
              <div className="fact-label">{s.ltHubFactLangs}</div>
              <div className="fact-value">3</div>
              <div className="fact-sub">EN, PT, ES</div>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container">

      <section className="states-section">
        <div className="states-inner">
          <div className="states-grid">
            {STATE_TEST_INFO.map((info) => (
              <Link
                key={info.code}
                href={`/learner-test/${info.slug}`}
                className="state-card active"
                title={`${info.stateName} learner practice test`}
              >
                <span className="state-code">{info.code}</span>
                <span className="state-badge">
                  {fill(s.ltQuestionsCount, { n: countFor.get(info.code) ?? 0 })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="panel panel-pad" style={{ marginTop: "1.5rem" }}>
        <h2 className="panel-title">{s.ltHubOfficialTitle}</h2>
        <ul>
          {STATE_TEST_INFO.map((info) => (
            <li key={info.code} style={{ margin: "0.5rem 0" }}>
              <Link href={`/learner-test/${info.slug}`}>
                {`${info.code} ${info.testName}${info.testAbbr ? ` (${info.testAbbr})` : ""}`}
              </Link>
              {fill(s.ltHubListTail, {
                n: countFor.get(info.code) ?? 0,
                authority: info.authority
              })}
            </li>
          ))}
        </ul>
      </section>

        <p className="disclaimer">{s.ltHubDisclaimer}</p>
      </div>
    </>
  );
}
