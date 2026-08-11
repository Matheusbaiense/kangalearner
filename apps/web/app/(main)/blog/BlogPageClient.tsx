"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icons } from "@/components/icons";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS, getBlogStates } from "@/lib/blogPosts";
import { tx } from "@/lib/i18n";
import { AU_STATE_OPTIONS, type AuStateCode } from "@kanga/core";

export function BlogPageClient() {
  const { uiLang: lang, s } = useLang();
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<AuStateCode | "all">("all");

  const blogStates = useMemo(() => getBlogStates(), []);
  const stateLabel = (code: AuStateCode) =>
    AU_STATE_OPTIONS.find((o) => o.code === code)?.name ?? code;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      if (stateFilter !== "all" && post.state !== stateFilter) return false;
      if (!q) return true;
      const haystack = `${tx(post.title, lang)} ${tx(post.excerpt, lang)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, stateFilter, lang]);

  return (
    <main className="container section-pad">
      <h1>{s.blogTitle}</h1>
      <p className="page-sub">{s.blogSub}</p>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={s.blogSearchPlaceholder}
          style={{
            flex: "1 1 240px",
            maxWidth: 360,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(15,23,42,0.12)",
            fontSize: ".9rem"
          }}
        />
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value as AuStateCode | "all")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(15,23,42,0.12)",
            fontSize: ".9rem",
            background: "var(--surface, #fff)",
            color: "inherit"
          }}
        >
          <option value="all">{s.blogFilterAll}</option>
          {blogStates.map((code) => (
            <option key={code} value={code}>
              {stateLabel(code)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ marginTop: 32, color: "var(--muted)" }}>{s.blogNoResults}</p>
      ) : (
        <div className="topics-grid" style={{ marginTop: 24 }}>
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="topic-card">
              <IconBadge icon={Icons[post.icon]} tone="brand" className="topic-icon" />
              <strong>{tx(post.title, lang)}</strong>
              <span style={{ fontSize: ".8rem", lineHeight: 1.35 }}>{tx(post.excerpt, lang)}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
