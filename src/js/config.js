/**
 * Client-side env for Supabase (and future Vite-only modules).
 * Legacy scripts in assets/js should not import this file until wired in later phases.
 */
export function getSupabaseConfig() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL ?? "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""
  };
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}
