import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isValidQuestionId } from "@/lib/api/attemptValidation";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { SUPPORTED_COUNTRY } from "@kanga/core";

// max(501) caps schema-validation work; the post-dedupe MAX_BULK check below
// still owns the specific error. 50 matches the varchar(50) column.
const payloadSchema = z.object({
  questionIds: z.array(z.string().min(1).max(50)).max(501).optional()
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`saved-questions-bulk:ip:${ip}`, 20, 60_000))) {
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

  if (!(await rateLimit(`saved-questions-bulk:user:${user.id}`, 5, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parseResult = payloadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const ids = [...new Set(parseResult.data.questionIds ?? [])].filter(isValidQuestionId);
  if (ids.length === 0) {
    return NextResponse.json({ ok: true, accepted: 0 }, { headers: response.headers });
  }

  const MAX_BULK = 500;
  if (ids.length > MAX_BULK) {
    return NextResponse.json({ error: "too_many_saved_questions", max: MAX_BULK }, { status: 400 });
  }

  const rows = ids.map((questionId) => ({
    user_id: user.id,
    question_id: questionId,
    country: SUPPORTED_COUNTRY
  }));

  const { error } = await supabase.from("saved_questions").upsert(rows, {
    onConflict: "user_id,question_id",
    ignoreDuplicates: true
  });

  if (error) {
    console.error("saved-questions/bulk: upsert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, accepted: rows.length }, { headers: response.headers });
}
