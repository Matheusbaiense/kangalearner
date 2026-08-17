import type { IconName } from "@/components/icons";
import type { UiLang } from "@/lib/i18n";
import type { AuStateCode } from "@kanga/core";

/** Index row for /blog — never include `body` so the listing client stays small. */
export type BlogPostCard = {
  slug: string;
  icon: IconName;
  state: AuStateCode;
  publishedAt: string;
  title: Record<UiLang, string>;
  excerpt: Record<UiLang, string>;
};

export function toBlogPostCard(post: BlogPostCard): BlogPostCard {
  return {
    slug: post.slug,
    icon: post.icon,
    state: post.state,
    publishedAt: post.publishedAt,
    title: post.title,
    excerpt: post.excerpt
  };
}

export function uniqueBlogStates(posts: Array<{ state: AuStateCode }>): AuStateCode[] {
  return Array.from(new Set(posts.map((post) => post.state)));
}
