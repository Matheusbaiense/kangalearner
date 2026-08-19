import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api/envelope";
import { throwSentryServerTestError } from "@/lib/observability/sentryServerTest";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";

/**
 * Temporary Sentry 0.5 probe (wizard-style throw). No auth, no DB.
 * Rate-limited so it cannot burn quota. Delete after dashboard confirmation.
 */
export async function GET(request: NextRequest) {
  const allowed = await rateLimit(`sentry-test:${getClientIp(request)}`, 3, 60 * 60 * 1000);
  if (!allowed) return apiError("rate_limited", 429);
  throwSentryServerTestError();
}
