import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireSupabaseEnv } from "@/lib/supabase/env";

/** Server Component gate — same source of truth as assertAdminRole (service role). */
export async function requireAdminPage(): Promise<{ userId: string; role: string }> {
  const cookieStore = await cookies();
  const { url, anonKey } = requireSupabaseEnv();
  const supabase = createServerClient(url, anonKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?redirect=/admin");

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    redirect("/");
  }

  return { userId: user.id, role: profile.role };
}
