"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { readApiOkData } from "@/lib/api/envelope";

interface ReactionState {
  helpful: number;
  notHelpful: number;
  yourReaction: "helpful" | "not_helpful" | null;
}

export function ReactionButtons({ slug }: { slug: string }) {
  const { s } = useLang();
  const [state, setState] = useState<ReactionState | null>(null);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/blog-reactions?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data: unknown) => {
        const payload = readApiOkData<ReactionState>(data);
        if (!cancelled && payload) {
          setState(payload);
        }
      })
      .catch((err) => {
        console.error("[blog-reactions] GET failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function react(reaction: "helpful" | "not_helpful") {
    setPostError(false);
    const previous = state;
    setState((prev) =>
      prev
        ? {
            helpful:
              prev.helpful + (reaction === "helpful" && prev.yourReaction !== "helpful" ? 1 : 0),
            notHelpful:
              prev.notHelpful +
              (reaction === "not_helpful" && prev.yourReaction !== "not_helpful" ? 1 : 0),
            yourReaction: reaction
          }
        : prev
    );
    try {
      const res = await fetch("/api/blog-reactions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, reaction })
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("[blog-reactions] POST failed:", err);
      setState(previous);
      setPostError(true);
    }
  }

  if (!state) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 24,
        padding: "12px 16px",
        borderRadius: 12,
        background: "rgba(15,23,42,0.04)"
      }}
    >
      {state.yourReaction ? (
        <span style={{ fontSize: ".85rem" }}>{s.blogHelpfulThanks}</span>
      ) : (
        <>
          <span style={{ fontSize: ".85rem", fontWeight: 700 }}>{s.blogHelpfulQuestion}</span>
          <button type="button" className="btn btn-secondary" onClick={() => react("helpful")}>
            {s.blogHelpfulYes} ({state.helpful})
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => react("not_helpful")}>
            {s.blogHelpfulNo} ({state.notHelpful})
          </button>
        </>
      )}
      {postError ? (
        <span role="alert" style={{ fontSize: ".8rem", color: "var(--red, #b91c1c)" }}>
          {s.syncSaveFailed}
        </span>
      ) : null}
    </div>
  );
}
