import { type NextRequest } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/routeClient";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { SUPPORTED_COUNTRY, WA_PASS_THRESHOLD } from "@kanga/core";
import { isValidAttemptState, normalizeAttemptSource } from "@/lib/api/attemptValidation";

import { z } from "zod";

const mockSessionSchema = z.object({
  state: z.string().min(1).max(10),
  score: z.number().int().min(0),
  total: z.number().int().positive().max(500),
  mode: z.enum(["exam", "practice"]).optional(),
  source: z.string().max(20).optional()
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!(await rateLimit(`mock-sessions:ip:${ip}`, 40, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  const { supabase, cookieResponse } = createRouteHandlerClient(request);

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return apiError("unauthorized", 401);

  if (!(await rateLimit(`mock-sessions:user:${user.id}`, 20, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return apiError("invalid_json", 400);
  }

  const parseResult = mockSessionSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    return apiError("invalid_payload", 400);
  }

  const payload = parseResult.data;

  if (!isValidAttemptState(payload.state) || payload.score > payload.total) {
    return apiError("invalid_payload", 400);
  }

  const sessionMode = payload.mode ?? "exam";
  const total = payload.total;
  const score = payload.score;
  const passed = total > 0 && score / total >= WA_PASS_THRESHOLD;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  const { error } = await supabase.from("mock_sessions").insert({
    user_id: user.id,
    country: SUPPORTED_COUNTRY,
    state: payload.state,
    mode: sessionMode,
    score,
    total,
    passed,
    percent,
    time_seconds: null,
    answers: {},
    weak_categories: null,
    source: normalizeAttemptSource(payload.source),
    completed_at: new Date().toISOString()
  });

  if (error) {
    log("error", "mock_sessions.insert_failed", {
      ...logContext(request, { userId: user.id, action: "insert" }),
      code: error.code
    });
    return apiError("db_error", 500);
  }
  return apiOk(undefined, { headers: cookieResponse.headers });
}
