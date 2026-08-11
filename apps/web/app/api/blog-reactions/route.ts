import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { findBlogPost } from "@/lib/blogPosts";

function visitorHash(ip: string, slug: string): string {
  return createHash("sha256").update(`${ip}:${slug}`).digest("hex");
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  if (!findBlogPost(slug)) {
    return NextResponse.json({ ok: false, error: "unknown_slug" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_reactions")
    .select("reaction")
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ ok: false, error: "query_failed" }, { status: 500 });
  }

  const helpful = data.filter((r) => r.reaction === "helpful").length;
  const notHelpful = data.filter((r) => r.reaction === "not_helpful").length;

  const ip = getClientIp(req);
  const hash = visitorHash(ip, slug);
  const { data: ownRow } = await supabaseAdmin
    .from("blog_reactions")
    .select("reaction")
    .eq("slug", slug)
    .eq("visitor_hash", hash)
    .maybeSingle();

  return NextResponse.json({
    ok: true,
    helpful,
    notHelpful,
    yourReaction: ownRow?.reaction ?? null
  });
}

const reactionSchema = z.object({
  slug: z.string().min(1),
  reaction: z.enum(["helpful", "not_helpful"])
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!(await rateLimit(`blog-reactions:${ip}`, 20, 60_000))) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  const rawBody = await req.json().catch(() => ({}));
  const parsed = reactionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { slug, reaction } = parsed.data;
  if (!findBlogPost(slug)) {
    return NextResponse.json({ ok: false, error: "unknown_slug" }, { status: 404 });
  }

  const hash = visitorHash(ip, slug);

  const { error } = await supabaseAdmin
    .from("blog_reactions")
    .upsert({ slug, reaction, visitor_hash: hash }, { onConflict: "slug,visitor_hash" });

  if (error) {
    return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
