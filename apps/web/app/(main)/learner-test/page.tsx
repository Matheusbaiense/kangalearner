import type { Metadata } from "next";
import Link from "next/link";
import { bankCountsFor, bankTotalFor } from "@/lib/stateBankCounts";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";

const BASE = "https://kangalearner.com.au";
const TOTAL = bankTotalFor(STATE_TEST_INFO.map((s) => s.code));

// ponytail: sem force-static. O CSP com nonce do middleware exige render por
// request (os scripts de hidratacao precisam do nonce); igual a /learn e /blog.

const DESCRIPTION =
  `${TOTAL} free practice questions across WA, NSW, VIC, QLD, SA, ACT and NT. ` +
  "Pick your state and study in English, Portuguese or Spanish.";

export const metadata: Metadata = {
  title: "Australian Learner Practice Tests by State",
  description: DESCRIPTION,
  alternates: { canonical: `${BASE}/learner-test` },
  openGraph: {
    title: "Australian Learner Practice Tests by State",
    description: DESCRIPTION,
    url: `${BASE}/learner-test`,
    type: "website"
  }
};

export default function LearnerTestHubPage() {
  const states = STATE_TEST_INFO.map((info) => ({ info, counts: bankCountsFor(info.code) }));

  return (
    <main className="app-page">
      <div className="app-container">
        <header className="page-header">
          <h1 className="page-title">Learner practice tests by state</h1>
          <p className="page-sub">
            {`${TOTAL} free practice questions for Australian learner licence tests. ` +
              "Pick your state or territory to practise with real exam-style questions in " +
              "English, Portuguese or Spanish."}
          </p>
        </header>

        <p>
          Every state and territory runs its own learner knowledge test, with its own name, question
          count and pass mark. KangaLearner keeps a separate question pool for each one, so you
          practise exactly what your state tests.
        </p>

        <section className="states-section">
          <div className="states-inner">
            <div className="states-grid">
              {states.map(({ info, counts }) => (
                <Link
                  key={info.code}
                  href={`/learner-test/${info.slug}`}
                  className="state-card active"
                  title={`${info.stateName} learner practice test`}
                >
                  <span className="state-code">{info.code}</span>
                  <span className="state-badge">{counts.total} questions</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="panel panel-pad" style={{ marginTop: "1.5rem" }}>
          <h2 className="panel-title">Official tests covered</h2>
          <ul>
            {states.map(({ info, counts }) => (
              <li key={info.code} style={{ margin: "0.5rem 0" }}>
                <Link href={`/learner-test/${info.slug}`}>
                  {`${info.code} ${info.testName}${info.testAbbr ? ` (${info.testAbbr})` : ""} practice`}
                </Link>
                {`: ${counts.total} free questions, run by ${info.authority}.`}
              </li>
            ))}
          </ul>
        </section>

        <p className="disclaimer">
          KangaLearner is an independent study tool and is not affiliated with any state transport
          authority. Always check your state&apos;s official website for current test requirements.
        </p>
      </div>
    </main>
  );
}
