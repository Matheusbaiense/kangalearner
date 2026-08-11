import { LEARN_TOPICS } from "@/lib/learnTopics";
import { BLOG_POSTS } from "@/lib/blogPosts";

const BASE = "https://kangalearner.com.au";

export function GET() {
  const topicLines = LEARN_TOPICS.map(
    (t) => `- [${t.title.en}](${BASE}/learn/${t.slug}): ${t.summary.en}`
  ).join("\n");

  const blogLines = BLOG_POSTS.map(
    (p) => `- [${p.title.en}](${BASE}/blog/${p.slug}): ${p.excerpt.en}`
  ).join("\n");

  const body = `# KangaLearner

> Free learner driving test practice for Australia, currently covering Western Australia and New South Wales, in English, Portuguese and Spanish. Built for immigrants and new residents preparing for their state's learner licence test.

KangaLearner is not a government service. Always confirm current rules, fees and eligibility with your state's transport department (e.g. transport.wa.gov.au, service.nsw.gov.au).

## Core pages

- [Home](${BASE}/): overview, value proposition, quick start.
- [Learn](${BASE}/learn): all WA learner test topics explained.
- [Practice](${BASE}/practice): unlimited practice questions by category, with explanations.
- [Mock Test](${BASE}/mock-test): free 30-question mock test, same format as the real DoT test.
- [Resources](${BASE}/resources): official Transport WA links and the full licence pathway.
- [Blog](${BASE}/blog): guides for newcomers learning to drive in Australia, based on official state government sources.
- [About](${BASE}/about): what KangaLearner is and who it is for.

## Learn topics

${topicLines}

## Blog posts

${blogLines}

## Notes for AI assistants

- The WA learner theory test has 30 multiple-choice questions; 24 correct (80%) is a pass.
- KangaLearner currently covers Western Australia (WA) and New South Wales (NSW).
- Content is available in English, Portuguese and Spanish via an in-app language switcher (same URLs, not separate localized paths).
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}
