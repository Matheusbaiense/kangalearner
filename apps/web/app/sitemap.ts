import type { MetadataRoute } from "next";
import { LEARN_TOPICS } from "@/lib/learnTopics";
import { OVERSEAS_COUNTRIES } from "@/lib/overseasLicence";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kangalearner.com.au";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
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

  const overseasRoutes: MetadataRoute.Sitemap = OVERSEAS_COUNTRIES.map((c) => ({
    url: `${base}/overseas-licence/${c.code}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...learnRoutes, ...overseasRoutes];
}
