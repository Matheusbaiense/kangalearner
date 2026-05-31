import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireSupabaseEnv } from "@/lib/supabase/env";

/**
 * Returns the authenticated user's ID if they have admin or super_admin role.
 * Returns null otherwise. Use in API route handlers before performing admin ops.
 */
export async function assertAdminRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const { url, anonKey } = requireSupabaseEnv();
  const supabase = createServerClient(url, anonKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
  });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "super_admin"].includes(profile.role)) return null;
  return user.id;
}
