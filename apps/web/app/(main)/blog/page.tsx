import type { Metadata } from "next";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blogPosts";
import { toBlogPostCard } from "@/lib/blogIndex";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides for newcomers learning to drive in Australia, based on official state government sources, in English, Portuguese and Spanish.",
  alternates: { canonical: "https://kangalearner.com.au/blog" },
  openGraph: {
    title: "KangaLearner Blog",
    description:
      "Guides for newcomers learning to drive in Australia, based on official state government sources.",
    url: "https://kangalearner.com.au/blog"
  }
};

export default function BlogPage() {
  const posts = PUBLISHED_BLOG_POSTS.map(toBlogPostCard);
  return <BlogPageClient posts={posts} />;
}
