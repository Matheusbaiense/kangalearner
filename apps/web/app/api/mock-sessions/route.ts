import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { AU_STATE_OPTIONS, SUPPORTED_COUNTRY, WA_PASS_THRESHOLD } from "@kanga/core";
import { normalizeAttemptSource } from "@/lib/api/attemptValidation";

import { z } from "zod";

const mockSessionSchema = z.object({
  state: z.string().min(1).max(10),
  score: z.number().int().min(0),
  total: z.number().int().positive().max(500),
  mode: z.enum(["exam", "practice"]).optional(),
  source: z.string().max(20).optional()
});

const AU_STATES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!await rateLimit(`mock-sessions:ip:${ip}`, 40, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "missing_env" }, { status: 500 });
  }

  const response = NextResponse.next();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      }
    }
  });

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!await rateLimit(`mock-sessions:user:${user.id}`, 20, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parseResult = mockSessionSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const payload = parseResult.data;

  if (!AU_STATES.has(payload.state) || payload.score > payload.total) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const sessionMode = payload.mode ?? "exam";
  const total = payload.total;
  const score = payload.score;
  const passed = total > 0 && score / total >= WA_PASS_THRESHOLD;

  const { error } = await supabase.from("mock_sessions").insert({
    user_id: user.id,
    country: SUPPORTED_COUNTRY,
    state: payload.state,
    mode: sessionMode,
    score,
    total,
    passed,
    time_seconds: null,
    answers: {},
    weak_categories: null,
    source: normalizeAttemptSource(payload.source),
    completed_at: new Date().toISOString()
  });

  if (error) {
    console.error("mock-sessions: insert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
