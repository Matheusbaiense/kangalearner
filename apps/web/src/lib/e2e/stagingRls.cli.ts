/**
 * Live RLS smoke against staging only.
 * Skip (exit 0) without E2E_STAGING_EMAIL/PASSWORD.
 * Never prints passwords or JWTs. Refuses prod + CI placeholder.
 */
import { readStagingLogin } from "./stagingAuth";
import { readStagingPeerLogin, runStagingRlsSmoke } from "./stagingRls";

async function main(): Promise<void> {
  const user = readStagingLogin();
  if (!user) {
    console.log("skip: set E2E_STAGING_EMAIL and E2E_STAGING_PASSWORD (staging only)");
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!supabaseUrl || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required");
  }

  const out = await runStagingRlsSmoke({
    supabaseUrl,
    anonKey,
    user,
    peer: readStagingPeerLogin(),
    fetchImpl: fetch
  });

  console.log(JSON.stringify({ ok: out.ok, results: out.results }));
  if (!out.ok) {
    process.exitCode = 1;
  }
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : "staging RLS smoke failed";
  console.error(message);
  process.exitCode = 1;
});
