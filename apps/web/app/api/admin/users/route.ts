import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertAdminRole } from "@/lib/auth/assertAdminRole";
import { rateLimit } from "@/lib/rateLimit";

/** GET /api/admin/users?page=0&limit=50&search=&role= */
export async function GET(req: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!(await rateLimit(`admin:users:get:${uid}`, 30, 60_000))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? "";

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

import { z } from "zod";

const patchUserSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["free", "premium", "admin", "super_admin"])
});

/** PATCH /api/admin/users — update a user's role */
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

  // Fetch caller and target profiles in parallel
  const [{ data: callerProfile }, { data: targetProfile }] = await Promise.all([
    supabaseAdmin.from("profiles").select("role").eq("id", uid).single(),
    supabaseAdmin.from("profiles").select("role").eq("id", userId).single()
  ]);

  // Assigning admin/super_admin requires super_admin
  if (["admin", "super_admin"].includes(role) && callerProfile?.role !== "super_admin") {
    return NextResponse.json({ error: "Only super_admin can assign admin roles" }, { status: 403 });
  }

  // Modifying an existing admin/super_admin (even to demote) requires super_admin
  if (
    ["admin", "super_admin"].includes(targetProfile?.role ?? "") &&
    callerProfile?.role !== "super_admin"
  ) {
    return NextResponse.json({ error: "Only super_admin can modify admin users" }, { status: 403 });
  }

  const { error } = await supabaseAdmin.from("profiles").update({ role }).eq("id", userId);

  if (error) {
    console.error("[admin/users] PATCH failed:", error.code, error.message);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
