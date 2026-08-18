import { randomUUID } from "node:crypto";
import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import {
  buildAttemptInsertRow,
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId
} from "@/lib/api/attemptValidation";

import { z } from "zod";

const attemptSchema = z.object({
  attempt_id: z.string().max(64).optional(),
  question_id: z.string().min(1).max(64),
  state: z.string().min(1).max(10),
  category: z.string().max(50).optional(),
  is_correct: z.boolean(),
  chosen: z.string().max(20).optional(),
  source: z.string().max(20).optional()
});

export async function POST(request: NextRequest) {
  // IP guard, defence against unauthenticated flood (loose: accounts for shared NAT)
  const ip = getClientIp(request);
  if (!(await rateLimit(`attempts:ip:${ip}`, 120, 60_000))) {
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

  // Per-user rate limit, each authenticated user gets their own bucket
  if (!(await rateLimit(`attempts:user:${user.id}`, 60, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parseResult = attemptSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    return apiError("invalid_payload", 400);
  }

  const payload = parseResult.data;

  if (!isValidAttemptState(payload.state)) {
    return apiError("invalid_state", 400);
  }

  if (!isValidQuestionId(payload.question_id)) {
    return apiError("invalid_question_id", 400);
  }

  if (!isValidAttemptCategory(payload.category)) {
    return apiError("invalid_category", 400);
  }

  const attemptId =
    typeof payload.attempt_id === "string" && payload.attempt_id.trim().length > 0
      ? payload.attempt_id.trim()
      : randomUUID();

  const { error } = await supabase
    .from("question_attempts")
    .insert(buildAttemptInsertRow(user.id, payload, attemptId));

  if (error) {
    log("error", "attempts.insert_failed", {
      ...logContext(request, { userId: user.id, action: "insert" }),
      code: error.code
    });
    return apiError("db_error", 500);
  }

  // user_category_stats is maintained by the AFTER INSERT trigger on
  // question_attempts (migration 028), covers this route, /bulk and mobile.

  return apiOk(undefined, { headers: response.headers });
}
