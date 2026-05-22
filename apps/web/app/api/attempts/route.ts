import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { rateLimit } from "@/lib/rateLimit";
import { AU_STATE_OPTIONS } from "@kanga/core";

const AU_STATES = new Set<string>(AU_STATE_OPTIONS.map((s) => s.code));

type AttemptPayload = {
  attempt_id?: string;
  question_id: string;
  state: string;
  category?: string;
  is_correct: boolean;
  chosen?: string;
  source?: string;
};

export async function POST(request: NextRequest) {
  // IP guard — defence against unauthenticated flood (loose: accounts for shared NAT)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`attempts:ip:${ip}`, 120, 60_000)) {
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

  // Per-user rate limit — each authenticated user gets their own bucket
  if (!await rateLimit(`attempts:user:${user.id}`, 60, 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let payload: AttemptPayload;
  try {
    payload = (await request.json()) as AttemptPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!payload?.question_id || !payload?.state || typeof payload.is_correct !== "boolean") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!AU_STATES.has(payload.state)) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
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
    source: payload.source ?? "web"
  });

  if (error) {
    console.error("attempts: insert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
