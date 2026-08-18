const PROD_HOST_RE = /(^|\.)kangalearner\.com\.au$/i;
const PROD_SUPABASE_REF = "olgogtaeifyxwzencilo";

export type StagingLogin = {
  email: string;
  password: string;
};

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

/** Auth-real E2E must never hit production web or the prod Supabase project. */
export function assertNotProductionTarget(opts: { baseUrl: string; supabaseUrl?: string }): void {
  const host = hostnameOf(opts.baseUrl);
  if (host && PROD_HOST_RE.test(host)) {
    throw new Error("E2E auth-real must not run against production (kangalearner.com.au)");
  }
  const supabase = opts.supabaseUrl?.trim() ?? "";
  if (supabase.toLowerCase().includes(PROD_SUPABASE_REF)) {
    throw new Error("E2E auth-real must not use the production Supabase project");
  }
}

export function readStagingLogin(env: NodeJS.ProcessEnv = process.env): StagingLogin | null {
  const email = env.E2E_STAGING_EMAIL?.trim() ?? "";
  const password = env.E2E_STAGING_PASSWORD?.trim() ?? "";
  if (!email || !password) return null;
  return { email, password };
}

/** smoke-a / smoke-b are kept as RLS fixtures — never delete them in E2E. */
export function isProtectedStagingFixture(email: string): boolean {
  const local = email.trim().toLowerCase().split("@")[0] ?? "";
  return local === "smoke-a" || local === "smoke-b";
}
