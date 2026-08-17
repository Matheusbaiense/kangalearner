import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertAdminRole } from "@/lib/auth/assertAdminRole";
import { evaluateAdminRolePatch, PROFILE_ROLES } from "@/lib/auth/adminRolePatch";
import { rateLimit } from "@/lib/rateLimit";
import { z } from "zod";

const adminUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  search: z.string().max(100).optional(),
  role: z.enum(PROFILE_ROLES).optional()
});

const patchUserSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(PROFILE_ROLES)
});

/** GET /api/admin/users?page=0&limit=50&search=&role= */
export async function GET(req: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!(await rateLimit(`admin:users:get:${uid}`, 30, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const parsed = adminUsersQuerySchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    role: searchParams.get("role") || undefined
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_query" }, { status: 400 });
  }

  const { page, limit, search, role } = parsed.data;

  let query = supabaseAdmin
    .from("profiles")
    .select(
      "id, role, display_name, country, preferred_state, lang, created_at, updated_at, email, last_sign_in_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (role) query = query.eq("role", role);
  if (search) query = query.ilike("display_name", `%${search}%`);

  const { data, count, error } = await query;
  if (error) {
    console.error("[admin/users] GET failed:", error.code, error.message);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }

  const enriched = (data ?? []).map((profile) => ({
    ...profile,
    email: profile.email ?? "(no email)",
    last_sign_in: profile.last_sign_in_at ?? null
  }));

  return NextResponse.json({ users: enriched, total: count ?? 0, page, limit });
}

/** PATCH /api/admin/users, update a user's role */
export async function PATCH(req: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!(await rateLimit(`admin:users:patch:${uid}`, 10, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parseResult = patchUserSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid userId or role" }, { status: 400 });
  }

  const { userId, role } = parseResult.data;

  const [{ data: callerProfile }, { data: targetProfile }] = await Promise.all([
    supabaseAdmin.from("profiles").select("role").eq("id", uid).single(),
    supabaseAdmin.from("profiles").select("role").eq("id", userId).single()
  ]);

  const decision = evaluateAdminRolePatch({
    callerRole: callerProfile?.role,
    targetRole: targetProfile?.role,
    nextRole: role
  });
  if (!decision.ok) {
    return NextResponse.json({ error: decision.error }, { status: 403 });
  }

  const { error } = await supabaseAdmin.from("profiles").update({ role }).eq("id", userId);

  if (error) {
    console.error("[admin/users] PATCH failed:", error.code, error.message);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
