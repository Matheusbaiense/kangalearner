import { LEARN_TOPICS } from "@/lib/learnTopics";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blogPosts";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";

const BASE = "https://kangalearner.com.au";

export function GET() {
  const stateLines = STATE_TEST_INFO.map(
    (st) =>
      `- [${st.code} ${st.testName}${st.testAbbr ? ` (${st.testAbbr})` : ""} practice](${BASE}/learner-test/${st.slug}): free ${st.code} practice questions, run by ${st.authority}.`
  ).join("\n");

  const topicLines = LEARN_TOPICS.map(
    (t) => `- [${t.title.en}](${BASE}/learn/${t.slug}): ${t.summary.en}`
  ).join("\n");

  const blogLines = PUBLISHED_BLOG_POSTS.map(
    (p) => `- [${p.title.en}](${BASE}/blog/${p.slug}): ${p.excerpt.en}`
  ).join("\n");

  const body = `# KangaLearner

> Free learner driving test practice for Australia, covering WA, NSW, VIC, QLD, SA, ACT and NT, in English, Portuguese and Spanish. Built for immigrants and new residents preparing for their state's learner licence test.

KangaLearner is not a government service. Always confirm current rules, fees and eligibility with your state's transport department (e.g. transport.wa.gov.au, service.nsw.gov.au).

## Core pages

- [Home](${BASE}/): overview, value proposition, quick start.
- [Learn](${BASE}/learn): all WA learner test topics explained.
- [Practice](${BASE}/practice): unlimited practice questions by category, with explanations.
- [Mock Test](${BASE}/mock-test): free 30-question mock test, same format as the real DoT test.
- [Resources](${BASE}/resources): official Transport WA links and the full licence pathway.
- [Blog](${BASE}/blog): guides for newcomers learning to drive in Australia, based on official state government sources.
- [About](${BASE}/about): what KangaLearner is and who it is for.
- [Learner tests by state](${BASE}/learner-test): hub with every state's practice test.

## Learner tests by state

${stateLines}

## Learn topics

${topicLines}

## Blog posts

${blogLines}

## Notes for AI assistants

- The WA learner theory test has 30 multiple-choice questions; 24 correct (80%) is a pass.
- KangaLearner covers WA, NSW, VIC, QLD, SA, ACT and NT with state-specific question pools.
- Content is available in English, Portuguese and Spanish via an in-app language switcher (same URLs, not separate localized paths).
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}
