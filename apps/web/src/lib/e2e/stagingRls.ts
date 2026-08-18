import { assertNotProductionTarget, type StagingLogin } from "./stagingAuth";

export type RlsCheckName =
  | "patch_stats_blocked"
  | "attempts_only_own"
  | "cannot_read_peer_attempts";

export type RlsCheckResult = {
  name: RlsCheckName;
  pass: boolean;
  detail: string;
};

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

function origin(url: string): string {
  return url.replace(/\/+$/, "");
}

export function restUrl(supabaseUrl: string, table: string, query?: string): string {
  const base = `${origin(supabaseUrl)}/rest/v1/${table}`;
  return query ? `${base}?${query}` : base;
}

export function isCiPlaceholderSupabase(url: string): boolean {
  return url.toLowerCase().includes("ci-build-placeholder");
}

export function readStagingPeerLogin(env: NodeJS.ProcessEnv = process.env): StagingLogin | null {
  const email = env.E2E_STAGING_PEER_EMAIL?.trim() ?? "";
  const password = env.E2E_STAGING_PEER_PASSWORD?.trim() ?? "";
  if (!email || !password) return null;
  return { email, password };
}

export function parseAccessToken(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const token = (json as { access_token?: unknown }).access_token;
  return typeof token === "string" && token.length > 0 ? token : null;
}

export function parseUserId(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const user = (json as { user?: unknown }).user;
  if (!user || typeof user !== "object") return null;
  const id = (user as { id?: unknown }).id;
  return typeof id === "string" && id.length > 0 ? id : null;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function rowUserId(row: unknown): string | null {
  if (!isObjectRecord(row)) return null;
  return typeof row.user_id === "string" ? row.user_id : null;
}

function fingerprintStats(body: unknown): string {
  if (!Array.isArray(body)) return `non-array:${typeof body}`;
  const rows = body
    .map((row) => {
      if (!isObjectRecord(row)) return "";
      const category = typeof row.category === "string" ? row.category : "";
      const total = typeof row.total_attempts === "number" ? row.total_attempts : "";
      return `${category}:${total}`;
    })
    .sort();
  return rows.join("|");
}

/** True when a second GET of stats differs from the first (PATCH leaked). */
export function statsChanged(before: unknown, after: unknown): boolean {
  return fingerprintStats(before) !== fingerprintStats(after);
}

export function interpretPatchStats(status: number, body: unknown): RlsCheckResult {
  const name: RlsCheckName = "patch_stats_blocked";
  if (status === 401 || status === 403) {
    return { name, pass: true, detail: `blocked HTTP ${status}` };
  }
  if (status === 204) {
    return { name, pass: false, detail: "204 may mean a write succeeded (return=minimal)" };
  }
  if (status === 200 && Array.isArray(body) && body.length === 0) {
    return { name, pass: true, detail: "200 [] (no write policy)" };
  }
  return { name, pass: false, detail: `unexpected PATCH ${status}` };
}

export function interpretOwnAttempts(
  userId: string,
  status: number,
  body: unknown
): RlsCheckResult {
  const name: RlsCheckName = "attempts_only_own";
  if (status !== 200 || !Array.isArray(body)) {
    return { name, pass: false, detail: `unexpected GET own attempts ${status}` };
  }
  const leaked = body.some((row) => rowUserId(row) !== userId);
  if (leaked) {
    return { name, pass: false, detail: "SELECT returned another user's attempts" };
  }
  return { name, pass: true, detail: `own rows=${body.length}` };
}

export function interpretPeerAttempts(
  peerUserId: string,
  status: number,
  body: unknown
): RlsCheckResult {
  const name: RlsCheckName = "cannot_read_peer_attempts";
  if (status === 401 || status === 403) {
    return { name, pass: true, detail: `cannot read peer HTTP ${status}` };
  }
  if (status !== 200 || !Array.isArray(body)) {
    return { name, pass: false, detail: `unexpected GET peer attempts ${status}` };
  }
  const visible = body.some((row) => rowUserId(row) === peerUserId);
  if (visible) {
    return { name, pass: false, detail: "SELECT returned peer attempts" };
  }
  return { name, pass: true, detail: "peer attempts hidden" };
}

async function readJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function signIn(
  fetchImpl: FetchLike,
  supabaseUrl: string,
  anonKey: string,
  login: StagingLogin
): Promise<{ accessToken: string; userId: string }> {
  const res = await fetchImpl(`${origin(supabaseUrl)}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: login.email, password: login.password })
  });
  const json = await readJson(res);
  const accessToken = parseAccessToken(json);
  const userId = parseUserId(json);
  if (!res.ok || !accessToken || !userId) {
    throw new Error("staging RLS sign-in failed");
  }
  return { accessToken, userId };
}

function restHeaders(anonKey: string, jwt: string, extra?: Record<string, string>): HeadersInit {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
    ...extra
  };
}

export async function runStagingRlsSmoke(opts: {
  supabaseUrl: string;
  anonKey: string;
  user: StagingLogin;
  peer?: StagingLogin | null;
  fetchImpl: FetchLike;
}): Promise<{ ok: boolean; results: RlsCheckResult[] }> {
  assertNotProductionTarget({
    baseUrl: opts.supabaseUrl,
    supabaseUrl: opts.supabaseUrl
  });
  if (isCiPlaceholderSupabase(opts.supabaseUrl)) {
    throw new Error("staging RLS must not run against the CI placeholder Supabase URL");
  }

  const session = await signIn(opts.fetchImpl, opts.supabaseUrl, opts.anonKey, opts.user);
  const statsPath = restUrl(
    opts.supabaseUrl,
    "user_category_stats",
    `user_id=eq.${session.userId}&select=category,total_attempts`
  );

  const beforeRes = await opts.fetchImpl(statsPath, {
    headers: restHeaders(opts.anonKey, session.accessToken)
  });
  const beforeStats = await readJson(beforeRes);

  const patchRes = await opts.fetchImpl(
    restUrl(opts.supabaseUrl, "user_category_stats", `user_id=eq.${session.userId}`),
    {
      method: "PATCH",
      headers: restHeaders(opts.anonKey, session.accessToken, {
        Prefer: "return=representation"
      }),
      body: JSON.stringify({ total_attempts: 0 })
    }
  );
  const patchBody = await readJson(patchRes);
  let patchCheck = interpretPatchStats(patchRes.status, patchBody);

  const afterRes = await opts.fetchImpl(statsPath, {
    headers: restHeaders(opts.anonKey, session.accessToken)
  });
  const afterStats = await readJson(afterRes);
  if (patchCheck.pass && statsChanged(beforeStats, afterStats)) {
    patchCheck = {
      name: "patch_stats_blocked",
      pass: false,
      detail: "GET after PATCH changed user_category_stats"
    };
  }
  const results: RlsCheckResult[] = [patchCheck];

  const ownRes = await opts.fetchImpl(
    restUrl(opts.supabaseUrl, "question_attempts", "select=id,user_id"),
    { headers: restHeaders(opts.anonKey, session.accessToken) }
  );
  const ownBody = await readJson(ownRes);
  results.push(interpretOwnAttempts(session.userId, ownRes.status, ownBody));

  if (opts.peer) {
    const peerSession = await signIn(opts.fetchImpl, opts.supabaseUrl, opts.anonKey, opts.peer);
    const peerRes = await opts.fetchImpl(
      restUrl(
        opts.supabaseUrl,
        "question_attempts",
        `select=id,user_id&user_id=eq.${peerSession.userId}`
      ),
      { headers: restHeaders(opts.anonKey, session.accessToken) }
    );
    const peerBody = await readJson(peerRes);
    results.push(interpretPeerAttempts(peerSession.userId, peerRes.status, peerBody));
  }

  return { ok: results.every((r) => r.pass), results };
}
