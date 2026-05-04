import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../src/lib/supabase/server";

/* Account page now redirects to the dashboard */
export default async function AccountPage() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  } catch {}
  redirect("/auth/login?redirect=/dashboard");
}
