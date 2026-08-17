import { type NextRequest } from "next/server";
import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
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
    return apiError("too_many_requests", 429);
  }

  let supabase;
  let response;
  try {
    ({ supabase, cookieResponse: response } = createRouteHandlerClient(request));
  } catch {
    return apiError("missing_env", 500);
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return apiError("unauthorized", 401);

  if (!(await rateLimit(`saved-questions-bulk:user:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parseResult = payloadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    return apiError("invalid_payload", 400);
  }

  const ids = [...new Set(parseResult.data.questionIds ?? [])].filter(isValidQuestionId);
  if (ids.length === 0) {
    return apiOk({ accepted: 0 }, { headers: response.headers });
  }

  const MAX_BULK = 500;
  if (ids.length > MAX_BULK) {
    return apiError("too_many_saved_questions", 400);
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
    log("error", "saved_questions.bulk_upsert_failed", {
      ...logContext(request, { userId: user.id, action: "upsert" }),
      code: error.code
    });
    return apiError("db_error", 500);
  }

  return apiOk({ accepted: rows.length }, { headers: response.headers });
}
