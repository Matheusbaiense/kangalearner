import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { bankCategoryNamesFor, bankCountsFor, type StateBankCounts } from "@/lib/stateBankCounts";
import { findStateBySlug, STATE_TEST_INFO, type StateTestInfo } from "@/lib/stateTestInfo";
import { StateCtaButtons } from "./StateCtaButtons";

const BASE = "https://kangalearner.com.au";

interface Props {
  params: Promise<{ state: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return STATE_TEST_INFO.map((s) => ({ state: s.slug }));
}

function metaDescription(info: StateTestInfo): string {
  const { total } = bankCountsFor(info.code);
  return (
    `${total} free ${info.code} practice questions in English, Portuguese or Spanish. ` +
    info.descriptionTail
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) return { title: "State not found" };

  const description = metaDescription(info);
  const url = `${BASE}/learner-test/${info.slug}`;

  return {
    title: info.metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: { title: info.metaTitle, description, url, type: "website" }
  };
}

function buildFaq(info: StateTestInfo, counts: StateBankCounts) {
  const bankAnswer =
    counts.motorcycle > 0
      ? `${counts.total} free questions: ${counts.car} for the car test and ` +
        `${counts.motorcycle} for the motorcycle test. Every question has an explanation.`
      : `${counts.total} free questions, all focused on the car knowledge test. ` +
        `Every question has an explanation.`;

  return [
    ...info.faq,
    {
      q: `Can I practise for the ${info.testAbbr ?? info.testName} in Portuguese or Spanish?`,
      a:
        "Yes. Every KangaLearner question is available in English, Portuguese and Spanish, " +
        "including bilingual study modes."
    },
    {
      q: `How many ${info.code} practice questions does KangaLearner have?`,
      a: bankAnswer
    }
  ];
}

export default async function StateTestPage({ params }: Props) {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) notFound();

  const nonce = (await headers()).get("x-nonce") ?? "";
  const counts = bankCountsFor(info.code);
  const categories = bankCategoryNamesFor(info.code);
  const faq = buildFaq(info, counts);
  const otherStates = STATE_TEST_INFO.filter((s) => s.code !== info.code);
  const url = `${BASE}/learner-test/${info.slug}`;
  const abbrSuffix = info.testAbbr ? ` (${info.testAbbr})` : "";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learner practice tests",
        item: `${BASE}/learner-test`
      },
      { "@type": "ListItem", position: 3, name: info.stateName, item: url }
    ]
  };

  return (
    <main className="app-page">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="app-container">
        <header className="page-header">
          <h1 className="page-title">{`${info.code} ${info.testName}${abbrSuffix} Practice`}</h1>
          <p className="page-sub">
            {`Free ${info.testAbbr ?? info.testName} practice questions for ${info.stateName}. ` +
              "Study in English, Portuguese or Spanish."}
          </p>
        </header>

        <p>
          {`The ${info.testName}${abbrSuffix} is the official knowledge test you must pass to get ` +
            `your learner licence in ${info.stateName}. It is run by ${info.authority}.` +
            (info.examQuestions
              ? ` The real test has ${info.examQuestions} questions and the pass mark is ${info.examPassMark}.`
              : "")}
        </p>
        <p>
          {`KangaLearner has ${counts.total} free practice questions for ${info.code}` +
            (counts.motorcycle > 0
              ? `: ${counts.car} for the car test and ${counts.motorcycle} for the motorcycle test.`
              : ", all focused on the car knowledge test.") +
            " Every question is available in English, Portuguese and Spanish, with clear explanations."}
        </p>

        <div className="stat-grid" style={{ margin: "1.5rem 0" }}>
          <div className="stat-card">
            <div className="stat-card-label">Official test</div>
            <div className="stat-card-value">{info.testAbbr ?? info.testName}</div>
            {info.testAbbr && <div className="stat-card-sub">{info.testName}</div>}
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Run by</div>
            <div className="stat-card-value">{info.authority}</div>
          </div>
          {info.examQuestions !== null && (
            <div className="stat-card">
              <div className="stat-card-label">Real test</div>
              <div className="stat-card-value">{info.examQuestions} questions</div>
            </div>
          )}
          {info.examPassMark !== null && (
            <div className="stat-card">
              <div className="stat-card-label">Pass mark</div>
              <div className="stat-card-value">{info.examPassMark}</div>
            </div>
          )}
          <div className="stat-card">
            <div className="stat-card-label">KangaLearner bank</div>
            <div className="stat-card-value">{counts.total} questions</div>
            <div className="stat-card-sub">
              {counts.motorcycle > 0
                ? `${counts.car} car, ${counts.motorcycle} motorcycle`
                : "car questions"}
            </div>
          </div>
        </div>

        <StateCtaButtons stateCode={info.code} />

        <section style={{ marginTop: "2.5rem" }}>
          <h2 className="section-title">What is on the test</h2>
          <p>
            {`The ${info.code} question pool covers every topic tested in the real exam: ` +
              `${categories.join(", ")}.`}
            {info.slug === "wa" ? (
              <>
                {" "}
                Read the full <Link href="/learn/about-the-test">WA test format guide</Link> for
                booking details and what to expect on the day.
              </>
            ) : null}
          </p>
        </section>

        <section className="faq-section">
          <div className="faq-inner">
            <h2 className="section-title">{info.code} learner test FAQ</h2>
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

        <section className="states-section">
          <div className="states-inner">
            <h2 className="section-title">Practice tests in other states</h2>
            <div className="states-grid">
              {otherStates.map((st) => (
                <Link
                  key={st.code}
                  href={`/learner-test/${st.slug}`}
                  className="state-card active"
                  title={`${st.stateName} learner practice test`}
                >
                  <span className="state-code">{st.code}</span>
                  <span className="state-badge">{st.testAbbr ?? "Practice test"}</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: "1rem" }}>
              <Link href="/learner-test">All Australian learner practice tests by state</Link>
            </p>
          </div>
        </section>

        <p className="disclaimer">
          {`KangaLearner is an independent study tool and is not affiliated with ${info.authority}. ` +
            `Always check ${info.authorityUrl} for current test requirements. ` +
            `Test facts last reviewed on ${info.verifiedAt}.`}
        </p>
      </div>
    </main>
  );
}
