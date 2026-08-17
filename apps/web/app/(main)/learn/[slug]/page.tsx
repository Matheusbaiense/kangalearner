import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { applyStateTokens, getStateProfile } from "@kanga/core";
import { findTopic, LEARN_TOPICS } from "@/lib/learnTopics";
import { TopicPageClient } from "./TopicPageClient";

/**
 * Metadata is rendered once at build time, so it uses the app's default jurisdiction.
 * The page body itself follows whichever state the visitor has selected.
 */
const DEFAULT_PROFILE = getStateProfile(null);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  const title = applyStateTokens(topic.title.en, DEFAULT_PROFILE, { sectionNote: "" });
  const summary = applyStateTokens(topic.summary.en, DEFAULT_PROFILE, { sectionNote: "" });

  return {
    title: `${title}, Australian Learner Test`,
    description: `${summary.slice(0, 155)}`,
    alternates: {
      canonical: `https://kangalearner.com.au/learn/${slug}`
    },
    openGraph: {
      title: `${title}, Australian Learner Test Guide`,
      description: `${summary.slice(0, 155)}`,
      url: `https://kangalearner.com.au/learn/${slug}`
    }
  };
}

export function generateStaticParams() {
  return LEARN_TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) notFound();

  return <TopicPageClient topic={topic} />;
}
