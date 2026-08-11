import type { MetadataRoute } from "next";
import { LEARN_TOPICS } from "@/lib/learnTopics";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kangalearner.com.au";
  // ponytail: static content-revision date, not new Date() per request — a
  // lastModified that changes on every crawl is a meaningless freshness
  // signal to Google. Bump this when page content actually changes.
  const now = new Date("2026-08-11T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/practice`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/mock-test`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];

  const learnRoutes: MetadataRoute.Sitemap = LEARN_TOPICS.map((t) => ({
    url: `${base}/learn/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...learnRoutes];
}
