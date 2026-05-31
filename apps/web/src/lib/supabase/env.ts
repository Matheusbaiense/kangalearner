/**
 * Shared Supabase env resolver. Throws a clear error instead of allowing
 * non-null assertions (`!`) to surface an opaque runtime crash when the
 * NEXT_PUBLIC_SUPABASE_* variables are missing.
 */
export function requireSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to apps/web/.env.local."
    );
  }
  return { url, anonKey };
}
