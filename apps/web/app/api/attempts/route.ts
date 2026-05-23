import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId,
  normalizeAttemptSource,
} from "@/lib/api/attemptValidation";

import { z } from "zod";

const attemptSchema = z.object({
  attempt_id: z.string().optional(),
  question_id: z.string().min(1),
  state: z.string().min(1),
  category: z.string().optional(),
  is_correct: z.boolean(),
  chosen: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // IP guard — defence against unauthenticated flood (loose: accounts for shared NAT)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts:ip:${ip}`, 120, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let supabase;
  let response;
  try {
    ({ supabase, cookieResponse: response } = createRouteHandlerClient(request));
  } catch {
    return NextResponse.json({ error: "missing_env" }, { status: 500 });
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Per-user rate limit — each authenticated user gets their own bucket
  if (!await rateLimit(`attempts:user:${user.id}`, 60, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parseResult = attemptSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const payload = parseResult.data;

  if (!isValidAttemptState(payload.state)) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }

  if (!isValidQuestionId(payload.question_id)) {
    return NextResponse.json({ error: "invalid_question_id" }, { status: 400 });
  }

  if (!isValidAttemptCategory(payload.category)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }

  const attemptId =
    typeof payload.attempt_id === "string" && payload.attempt_id.trim().length > 0
      ? payload.attempt_id.trim()
      : randomUUID();

  const { error } = await supabase.from("question_attempts").insert({
    user_id: user.id,
    attempt_id: attemptId,
    question_id: payload.question_id,
    state: payload.state,
    category: payload.category ?? null,
    is_correct: payload.is_correct,
    chosen: payload.chosen ?? null,
    source: normalizeAttemptSource(payload.source),
    answered_at: new Date().toISOString(),
  });

  if (error) {
    console.error("attempts: insert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 400 });
  }

  if (payload.category) {
    const adminRpc = supabaseAdmin as unknown as {
      rpc: (fn: string, args: Record<string, unknown>) => Promise<{ error: { message: string } | null }>;
    };
    void adminRpc
      .rpc("upsert_category_stat", {
        p_user_id: user.id,
        p_country: "AU",
        p_state: payload.state,
        p_category: payload.category,
        p_is_correct: payload.is_correct,
      })
      .then(({ error: statErr }) => {
        if (statErr) console.error("upsert_category_stat:", statErr.message);
      })
      .catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
