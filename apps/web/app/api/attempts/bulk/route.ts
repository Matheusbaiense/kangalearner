import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import {
  isValidAttemptCategory,
  isValidAttemptState,
  isValidQuestionId,
  normalizeAttemptSource
} from "@/lib/api/attemptValidation";

import { z } from "zod";

const bulkAttemptSchema = z.object({
  attempt_id: z.string().min(1).max(64),
  question_id: z.string().min(1).max(50),
  state: z.string().min(1).max(10),
  category: z.string().max(50).nullable().optional(),
  is_correct: z.boolean(),
  chosen: z.string().max(20).nullable().optional(),
  source: z.string().max(20).optional(),
  answered_at: z.string().max(40).optional()
});

const bulkAttemptsPayloadSchema = z.object({
  attempts: z.array(bulkAttemptSchema).optional()
});

export async function POST(request: NextRequest) {
  // IP guard, defence against unauthenticated flood
  const ip = getClientIp(request);
  if (!(await rateLimit(`attempts-bulk:ip:${ip}`, 20, 60_000))) {
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

  // Per-user rate limit, bulk migration is a one-time event; 5 per minute is ample
  if (!(await rateLimit(`attempts-bulk:user:${user.id}`, 5, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parseResult = bulkAttemptsPayloadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    return apiError("invalid_payload", 400);
  }

  const attempts = parseResult.data.attempts ?? [];
  if (attempts.length === 0) {
    return apiOk({ inserted: 0 });
  }

  // P2-04: never trust a client-supplied future timestamp (would let a client
  // pre-claim "today" toward streaks/goals). We still honour legitimate PAST
  // timestamps so an offline guest's real answer history survives the migration.
  const nowIso = new Date().toISOString();
  function safeAnsweredAt(value: string | undefined): string {
    if (!value) return nowIso;
    const ms = Date.parse(value);
    if (Number.isNaN(ms) || ms > Date.now()) return nowIso;
    return new Date(ms).toISOString();
  }

  const MAX_BULK = 500;
  if (attempts.length > MAX_BULK) {
    return apiError("too_many_attempts", 400);
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
    return apiOk({ inserted: 0 });
  }

  const rows = validRows
    .filter((a) => typeof a.attempt_id === "string" && a.attempt_id.trim().length > 0)
    .map((a) => ({
      user_id: user.id,
      attempt_id: a.attempt_id.trim(),
      question_id: a.question_id,
      state: a.state,
      category: a.category ?? null,
      is_correct: a.is_correct,
      chosen: a.chosen ?? null,
      source: normalizeAttemptSource(a.source),
      answered_at: safeAnsweredAt(a.answered_at)
    }));

  if (rows.length === 0) {
    return apiError("invalid_payload", 400);
  }

  const { error } = await supabase.from("question_attempts").upsert(rows, {
    onConflict: "user_id,attempt_id",
    ignoreDuplicates: true
  });

  if (error) {
    log("error", "attempts.bulk_upsert_failed", {
      ...logContext(request, { userId: user.id, action: "upsert" }),
      code: error.code
    });
    return apiError("db_error", 500);
  }

  return apiOk({ accepted: rows.length }, { headers: response.headers });
}
