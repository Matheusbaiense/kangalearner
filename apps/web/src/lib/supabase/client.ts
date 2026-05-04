import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

function requireSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to apps/web/.env.local."
    );
  }
  return { url, anonKey };
}

/** Browser / Client Components — uses anon key and respects RLS. */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}

/** @deprecated Prefer {@link createClient} (same implementation). */
export function createSupabaseBrowserClient() {
  return createClient();
}
