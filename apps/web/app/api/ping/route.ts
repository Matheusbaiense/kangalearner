import { supabaseAdmin } from "@/lib/supabase/admin";
import { log, logContext } from "@/lib/log";
import { isAuthorizedCron } from "@/lib/auth/cronAuth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!isAuthorizedCron(authHeader, cronSecret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin.from("profiles").select("id").limit(1).maybeSingle();

  if (error) {
    log("error", "ping.probe_failed", {
      ...logContext(request, { action: "probe" }),
      code: error.code
    });
    return Response.json({ ok: false, error: "probe_failed" }, { status: 500 });
  }

  return Response.json({ ok: true, ts: new Date().toISOString() });
}
