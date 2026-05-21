import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { rateLimit } from "@/lib/rateLimit";
import { WA_PASS_THRESHOLD } from "@kanga/core";

type MockPayload = {
  state: string;
  score: number;
  total: number;
  mode?: string;
  source?: string;
};

const AU_STATES = new Set([
  "WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT",
]);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`mock-sessions:${ip}`, 20, 60_000)) {
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

  let payload: MockPayload;
  try {
    payload = (await request.json()) as MockPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    !payload?.state ||
    !AU_STATES.has(payload.state) ||
    !Number.isFinite(payload.score) ||
    !Number.isFinite(payload.total) ||
    payload.total <= 0 ||
    payload.score < 0 ||
    payload.score > payload.total
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const VALID_MODES = new Set(["exam", "practice"]);
  const sessionMode = payload.mode && VALID_MODES.has(payload.mode) ? payload.mode : "exam";

  const total = payload.total;
  const score = payload.score;
  const passed = total > 0 && score / total >= WA_PASS_THRESHOLD;

  const { error } = await supabase.from("mock_sessions").insert({
    user_id: user.id,
    country: "AU",
    state: payload.state,
    mode: sessionMode,
    score,
    total,
    passed,
    time_seconds: null,
    answers: {},
    weak_categories: null,
    source: payload.source ?? "web"
  });

  if (error) {
    console.error("mock-sessions: insert failed", error.code);
    return NextResponse.json({ error: "db_error" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
