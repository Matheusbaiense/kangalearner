"use client";

import Link from "next/link";
import type { LocalizedText } from "@kanga/core";
import { Kanga } from "@/components/brand/Kanga";
import { useLang } from "@/contexts/LangContext";
import { fill, tx } from "@/lib/i18n";
import { STATE_SIGNS } from "@/lib/stateSigns";
import { buildStateFaq, STATE_TEST_INFO, type StateTestInfo } from "@/lib/stateTestInfo";
import { StateCtaButtons } from "./StateCtaButtons";

/** Mesma forma de StateBankCounts, sem importar o modulo server-only. */
interface BankCounts {
  total: number;
  car: number;
  motorcycle: number;
}

interface Props {
  info: StateTestInfo;
  counts: BankCounts;
  categories: LocalizedText[];
}

/** "24 of 30" vira "24/30": compacto e neutro nos 3 idiomas. */
function passMarkDisplay(passMark: string): string {
  return passMark.replace(" of ", "/");
}

export function StatePageClient({ info, counts, categories }: Props) {
  const { uiLang, s } = useLang();

  const abbrSuffix = info.testAbbr ? ` (${info.testAbbr})` : "";
  const testFull = `${info.code} ${info.testName}${abbrSuffix}`;
  const testLabel = info.testAbbr ?? info.testName;
  const faq = buildStateFaq(info, counts, uiLang);
  const signs = STATE_SIGNS[info.code] ?? [];
  const otherStates = STATE_TEST_INFO.filter((st) => st.code !== info.code);

  const intro =
    fill(s.ltStateIntro, {
      test: `${info.testName}${abbrSuffix}`,
      state: info.stateName,
      authority: info.authority
    }) +
    (info.examQuestions !== null && info.examPassMark !== null
      ? ` ${fill(s.ltStateIntroExam, { n: info.examQuestions, pass: passMarkDisplay(info.examPassMark) })}`
      : "");

  const bankIntro =
    fill(counts.motorcycle > 0 ? s.ltStateBankBoth : s.ltStateBankCarOnly, {
      total: counts.total,
      code: info.code,
      car: counts.car,
      moto: counts.motorcycle
    }) + ` ${s.ltStateBankLangs}`;

  return (
    <>
      <div className="lt-hero">
        <div className="app-container">
          <header className="page-header state-hero">
            <div className="state-hero-copy">
              <h1 className="page-title">{fill(s.ltStateH1, { test: testFull })}</h1>
              <p className="page-sub">
                {fill(s.ltStateSub, { test: testLabel, state: info.stateName })}
              </p>
            </div>
            <Kanga pose="hero" size={132} className="state-hero-kanga" />
          </header>

          <p>{intro}</p>
          <p>{bankIntro}</p>

      <div className="facts-strip">
        <div className="fact-cell">
          <div className="fact-label">{s.ltFactTest}</div>
          <div className={info.testAbbr ? "fact-value" : "fact-value fact-value--long"}>
            {testLabel}
          </div>
          {info.testAbbr && <div className="fact-sub">{info.testName}</div>}
        </div>
        <div className="fact-cell">
          <div className="fact-label">{s.ltFactAuthority}</div>
          <div className="fact-value fact-value--long">{info.authorityAbbr}</div>
          {info.authorityAbbr !== info.authority && (
            <div className="fact-sub">{info.authority}</div>
          )}
        </div>
        {info.examQuestions !== null && (
          <div className="fact-cell">
            <div className="fact-label">{s.ltFactQuestions}</div>
            <div className="fact-value">{info.examQuestions}</div>
            <div className="fact-sub">{s.questionsWord}</div>
          </div>
        )}
        {info.examPassMark !== null && (
          <div className="fact-cell">
            <div className="fact-label">{s.passMarkWord}</div>
            <div className="fact-value fact-value--long">{passMarkDisplay(info.examPassMark)}</div>
          </div>
        )}
        <div className="fact-cell">
          <div className="fact-label">{s.ltFactBank}</div>
          <div className="fact-value">{counts.total}</div>
          <div className="fact-sub">
            {counts.motorcycle > 0
              ? fill(s.ltFactBankSplit, { car: counts.car, moto: counts.motorcycle })
              : s.ltFactBankCarOnly}
          </div>
        </div>
      </div>

          <StateCtaButtons stateCode={info.code} />
        </div>
      </div>

      <div className="app-container">
        {signs.length > 0 && (
        <section className="signs-section">
          <h2 className="section-title">{s.ltSignsTitle}</h2>
          <p className="signs-sub">{fill(s.ltSignsSub, { state: info.stateName })}</p>
          <div className="signs-strip">
            {signs.map((sign) => (
              <figure key={sign.src} className="sign-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sign.src}
                  alt={tx(sign.alt, uiLang)}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: "2.5rem" }}>
        <h2 className="section-title">{s.ltTopicsTitle}</h2>
        <p>
          {fill(s.ltTopicsBody, {
            code: info.code,
            topics: categories.map((c) => tx(c, uiLang)).join(", ")
          })}
          {info.slug === "wa" ? (
            <>
              {" "}
              {s.ltWaGuidePre}
              <Link href="/learn/about-the-test">{s.ltWaGuideLink}</Link>
              {s.ltWaGuidePost}
            </>
          ) : null}
        </p>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="section-title">{fill(s.ltFaqTitle, { code: info.code })}</h2>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="road-divider" aria-hidden="true" />

      <section className="states-section">
        <div className="states-inner">
          <h2 className="section-title">{s.ltOtherStatesTitle}</h2>
          <div className="states-grid">
            {otherStates.map((st) => (
              <Link
                key={st.code}
                href={`/learner-test/${st.slug}`}
                className="state-card active"
                title={`${st.stateName} learner practice test`}
              >
                <span className="state-code">{st.code}</span>
                <span className="state-badge">{st.testAbbr ?? s.ltPracticeBadge}</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/learner-test">{s.ltAllStatesLink}</Link>
          </p>
        </div>
      </section>

        <p className="disclaimer">
          {fill(s.ltDisclaimer, {
            authority: info.authority,
            url: info.authorityUrl,
            date: info.verifiedAt
          })}
        </p>
      </div>
    </>
  );
}
