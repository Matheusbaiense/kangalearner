import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertAdminRole } from "@/lib/auth/assertAdminRole";

/** GET /api/admin/users?page=0&limit=50&search=&role= */
export async function GET(req: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const page   = Math.max(0, parseInt(searchParams.get("page") ?? "0"));
  const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const search = searchParams.get("search") ?? "";
  const role   = searchParams.get("role") ?? "";

  let query = supabaseAdmin
    .from("profiles")
    .select("id, role, display_name, country, preferred_state, lang, created_at, updated_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (role) query = query.eq("role", role);
  if (search) query = query.ilike("display_name", `%${search}%`);

  const { data, count, error } = await query;
  if (error) {
    console.error("[admin/users] GET failed:", error.code, error.message);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }

  // Batch: fetch all auth users once and index by id (avoids N+1)
  const { data: authData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  const users = authData?.users ?? [];
  const authMap = new Map(users.map((u) => [u.id, u]));

  const enriched = (data ?? []).map((profile) => {
    const authUser = authMap.get(profile.id);
    return {
      ...profile,
      email: authUser?.email ?? "(no email)",
      last_sign_in: authUser?.last_sign_in_at ?? null,
    };
  });

  const res = NextResponse.json({ users: enriched, total: count ?? 0, page, limit });

  if (users.length >= 1000) {
    res.headers.set("X-Admin-Warning", "user-list-capped-at-1000");
    console.warn("[admin/users] user count hit 1000 cap — pagination not implemented");
  }

  return res;
}

/** PATCH /api/admin/users — update a user's role */
export async function PATCH(req: NextRequest) {
  const uid = await assertAdminRole();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: { userId: string; role: string };
  try {
    body = (await req.json()) as { userId: string; role: string };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const { userId, role } = body;

  const validRoles = ["free", "premium", "admin", "super_admin"];
  if (!userId || !validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid userId or role" }, { status: 400 });
  }

  // Only super_admins can promote to admin/super_admin
  const { data: callerProfile } = await supabaseAdmin
    .from("profiles").select("role").eq("id", uid).single();
  if (["admin", "super_admin"].includes(role) && callerProfile?.role !== "super_admin") {
    return NextResponse.json({ error: "Only super_admin can assign admin roles" }, { status: 403 });
  }

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) {
    console.error("[admin/users] PATCH failed:", error.code, error.message);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
