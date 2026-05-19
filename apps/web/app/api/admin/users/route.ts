import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { UserRole } from "@/lib/supabase/database.types";

async function assertAdmin(): Promise<string | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "super_admin"].includes(profile.role)) return null;
  return user.id;
}

/** GET /api/admin/users?page=0&limit=50&search=&role= */
export async function GET(req: NextRequest) {
  const uid = await assertAdmin();
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

  if (role) query = query.eq("role", role as UserRole);
  if (search) query = query.ilike("display_name", `%${search}%`);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Enrich with auth.users email via admin API
  const enriched = await Promise.all(
    (data ?? []).map(async (profile) => {
      try {
        const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(profile.id);
        return {
          ...profile,
          email: authUser?.user?.email ?? null,
          last_sign_in: authUser?.user?.last_sign_in_at ?? null,
        };
      } catch {
        return { ...profile, email: null, last_sign_in: null };
      }
    })
  );

  return NextResponse.json({ users: enriched, total: count ?? 0, page, limit });
}

/** PATCH /api/admin/users — update a user's role */
export async function PATCH(req: NextRequest) {
  const uid = await assertAdmin();
  if (!uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json() as { userId: string; role: string };
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

  // Use service role to bypass role-escalation trigger
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ role: role as UserRole })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
