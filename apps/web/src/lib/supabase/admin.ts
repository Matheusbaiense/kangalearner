import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Service-role client — bypasses RLS. Use only in server-side Route Handlers
 * or other trusted server code. Never import from Client Components or expose
 * `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
function createSupabaseAdmin(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

let _adminClient: SupabaseClient<Database> | null = null;

export const supabaseAdmin: SupabaseClient<Database> = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    _adminClient ??= createSupabaseAdmin();
    const value = (_adminClient as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(_adminClient) : value;
  }
});
