import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import {
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId,
  normalizeAttemptSource,
} from "@/lib/api/attemptValidation";

type BulkAttempt = {
  attempt_id: string;
  question_id: string;
  state: string;
  category?: string | null;
  is_correct: boolean;
  chosen?: string | null;
  source?: string;
};

export async function POST(request: NextRequest) {
  // IP guard — defence against unauthenticated flood
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts-bulk:ip:${ip}`, 20, 60_000)) {
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

  // Per-user rate limit — bulk migration is a one-time event; 5 per minute is ample
  if (!await rateLimit(`attempts-bulk:user:${user.id}`, 5, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: { attempts?: BulkAttempt[] };
  try {
    body = (await request.json()) as { attempts?: BulkAttempt[] };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const attempts = Array.isArray(body.attempts) ? body.attempts : [];
  if (attempts.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  const MAX_BULK = 500;
  if (attempts.length > MAX_BULK) {
    return NextResponse.json({ error: "too_many_attempts", max: MAX_BULK }, { status: 400 });
  }

  const validRows = attempts.filter(
    (r) =>
      r &&
      isValidQuestionId(r.question_id) &&
      isValidAttemptState(r.state) &&
      isValidAttemptCategory(r.category) &&
      typeof r.is_correct === "boolean"
  );

  if (validRows.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  const rows = validRows
    .filter(
      (a) =>
        typeof a.attempt_id === "string" &&
        a.attempt_id.trim().length > 0
    )
    .map((a) => ({
      user_id: user.id,
      attempt_id: a.attempt_id.trim(),
      question_id: a.question_id,
      state: a.state,
      category: a.category ?? null,
      is_correct: a.is_correct,
      chosen: a.chosen ?? null,
      source: normalizeAttemptSource(a.source)
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const { error } = await supabase.from("question_attempts").upsert(rows, {
    onConflict: "user_id,attempt_id",
    ignoreDuplicates: true
  });

  if (error) {
    console.error("attempts/bulk: upsert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 400 });
  }

  return NextResponse.json(
    { ok: true, accepted: rows.length },
    { headers: response.headers }
  );
}
