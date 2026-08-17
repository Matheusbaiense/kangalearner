import type { MetadataRoute } from "next";
import { LEARN_TOPICS } from "@/lib/learnTopics";
import { OVERSEAS_COUNTRIES } from "@/lib/overseasLicence";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blogPosts";
import { STATE_TEST_INFO } from "@/lib/stateTestInfo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kangalearner.com.au";
  // ponytail: static content-revision date, not new Date() per request, a
  // lastModified that changes on every crawl is a meaningless freshness
  // signal to Google. Bump this when page content actually changes.
  const now = new Date("2026-08-16T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learner-test`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/practice`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/mock-test`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/quick-quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/today`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    {
      url: `${base}/overseas-licence`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    { url: `${base}/journey`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hpt`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/supervisor`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/confidence`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/eyesight-test`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];

  const stateRoutes: MetadataRoute.Sitemap = STATE_TEST_INFO.map((st) => ({
    url: `${base}/learner-test/${st.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  const learnRoutes: MetadataRoute.Sitemap = LEARN_TOPICS.map((t) => ({
    url: `${base}/learn/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const overseasRoutes: MetadataRoute.Sitemap = OVERSEAS_COUNTRIES.map((c) => ({
    url: `${base}/overseas-licence/${c.code}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const blogRoutes: MetadataRoute.Sitemap = PUBLISHED_BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...stateRoutes, ...learnRoutes, ...overseasRoutes, ...blogRoutes];
}
