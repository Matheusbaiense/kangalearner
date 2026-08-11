import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findTopic, LEARN_TOPICS } from "@/lib/learnTopics";
import { TopicPageClient } from "./TopicPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  const title = topic.title.en;
  const summary = topic.summary.en;

  return {
    title: `${title}, WA Learner Test`,
    description: `${summary.slice(0, 155)}`,
    alternates: {
      canonical: `https://kangalearner.com.au/learn/${slug}`
    },
    openGraph: {
      title: `${title}, WA Learner Test Guide`,
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
