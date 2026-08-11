"use client";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { tx } from "@/lib/i18n";

export function BlogPageClient() {
  const { uiLang: lang, s } = useLang();

  return (
    <main className="container section-pad">
      <h1>{s.blogTitle}</h1>
      <p className="page-sub">{s.blogSub}</p>

      <div className="topics-grid" style={{ marginTop: 24 }}>
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="topic-card">
            <IconBadge icon={Icons[post.icon]} tone="brand" className="topic-icon" />
            <strong>{tx(post.title, lang)}</strong>
            <span style={{ fontSize: ".8rem", lineHeight: 1.35 }}>{tx(post.excerpt, lang)}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
