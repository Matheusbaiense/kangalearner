import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { findBlogPost, BLOG_POSTS } from "@/lib/blogPosts";
import { BlogPostClient } from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title.en,
    description: post.excerpt.en,
    alternates: {
      canonical: `https://kangalearner.com.au/blog/${slug}`
    },
    openGraph: {
      title: post.title.en,
      description: post.excerpt.en,
      url: `https://kangalearner.com.au/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt
    }
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = findBlogPost(slug);

  if (!post) notFound();

  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title.en,
            description: post.excerpt.en,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            url: `https://kangalearner.com.au/blog/${slug}`,
            author: { "@type": "Organization", name: "KangaLearner" },
            publisher: { "@type": "Organization", name: "KangaLearner" }
          })
        }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
