import { describe, expect, it } from "vitest";
import { toBlogPostCard, uniqueBlogStates, type BlogPostCard } from "./blogIndex";

const sample = {
  slug: "driving-in-wa-guide-for-newcomers",
  icon: "safety" as const,
  state: "WA" as const,
  publishedAt: "2026-08-11",
  title: { en: "Title", pt: "Título", es: "Título" },
  excerpt: { en: "Excerpt", pt: "Resumo", es: "Resumen" },
  body: [{ type: "paragraph" as const, text: { en: "SECRET_BODY", pt: "x", es: "x" } }],
  sourceUrl: "https://example.test",
  published: true,
  readingMinutes: 8
};

describe("toBlogPostCard", () => {
  it("keeps index fields and drops the post body", () => {
    const card = toBlogPostCard(sample);
    expect(card).toEqual({
      slug: sample.slug,
      icon: sample.icon,
      state: sample.state,
      publishedAt: sample.publishedAt,
      title: sample.title,
      excerpt: sample.excerpt
    } satisfies BlogPostCard);
    expect(card).not.toHaveProperty("body");
    expect(JSON.stringify(card)).not.toContain("SECRET_BODY");
  });
});

describe("uniqueBlogStates", () => {
  it("preserves first-seen order", () => {
    expect(
      uniqueBlogStates([
        { state: "WA" },
        { state: "NSW" },
        { state: "WA" },
        { state: "SA" }
      ])
    ).toEqual(["WA", "NSW", "SA"]);
  });
});
