import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { rateLimit } from "@/lib/rateLimit";

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
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!rateLimit(`attempts-bulk:${ip}`, 10, 60_000)) {
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

  const rows = attempts
    .filter(
      (a) =>
        a &&
        typeof a.attempt_id === "string" &&
        a.attempt_id.trim().length > 0 &&
        typeof a.question_id === "string" &&
        typeof a.state === "string" &&
        typeof a.is_correct === "boolean"
    )
    .map((a) => ({
      user_id: user.id,
      attempt_id: a.attempt_id.trim(),
      question_id: a.question_id,
      state: a.state,
      category: a.category ?? null,
      is_correct: a.is_correct,
      chosen: a.chosen ?? null,
      source: typeof a.source === "string" ? a.source : "migration"
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

  const json = NextResponse.json({ ok: true, accepted: rows.length });
  response.cookies.getAll().forEach((c) => {
    json.cookies.set(c.name, c.value);
  });
  return json;
}
