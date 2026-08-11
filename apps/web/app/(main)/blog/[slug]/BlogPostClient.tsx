"use client";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import type { BlogPost } from "@/lib/blogPosts";
import { tx } from "@/lib/i18n";
import { ReactionButtons } from "./ReactionButtons";

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { uiLang: lang, s } = useLang();

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString(
    lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-AU",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="container section-pad">
      <div className="mock-setup-card" style={{ maxWidth: 760 }}>
        <Link
          href="/blog"
          className="btn btn-secondary"
          style={{ marginBottom: 20, display: "inline-block" }}
        >
          {s.blogBack}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <IconBadge icon={Icons[post.icon]} tone="brand" className="topic-icon" />
          <h1 style={{ fontSize: "1.4rem", fontWeight: 850, lineHeight: 1.2, margin: 0 }}>
            {tx(post.title, lang)}
          </h1>
        </div>

        <p style={{ fontSize: ".8rem", color: "var(--muted)", marginBottom: 24 }}>
          {s.blogPublished} {publishedLabel} · {post.readingMinutes} min
        </p>

        {post.body.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2
                key={i}
                style={{ fontSize: "1.1rem", fontWeight: 800, marginTop: 28, marginBottom: 10 }}
              >
                {tx(block.text, lang)}
              </h2>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} style={{ paddingLeft: 20, lineHeight: 1.7, marginBottom: 16 }}>
                {block.items.map((item, j) => (
                  <li key={j}>{tx(item, lang)}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} style={{ lineHeight: 1.7, marginBottom: 16 }}>
              {tx(block.text, lang)}
            </p>
          );
        })}

        <p style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: 8, marginBottom: 24 }}>
          <strong>{s.blogSource}:</strong>{" "}
          <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
            {tx(post.sourceLabel, lang)}
          </a>
        </p>

        <ReactionButtons slug={post.slug} />

        <section
          style={{
            marginBottom: 8,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(15,23,42,0.04)"
          }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 10 }}>
            {s.blogRelatedTitle}
          </h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/learn" className="btn btn-primary">
              {s.blogRelatedLearn}
            </Link>
            <Link href="/practice" className="btn btn-secondary">
              {s.blogRelatedPractice}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
