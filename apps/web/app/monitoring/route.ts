import { sentryIngestUrl } from "@/lib/sentry/sentryTunnel";

export const dynamic = "force-dynamic";

/** GET is a liveness probe so `/monitoring` is not a silent 404. The SDK uses POST. */
export function GET(): Response {
  return Response.json({ ok: true, tunnel: true });
}

/**
 * Browser Sentry events are POSTed here (tunnelRoute) so CSP connect-src 'self' covers them.
 * Query `o` / `p` / optional `r` come from the SDK; we only forward to ingest.sentry.io.
 */
export async function POST(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const dest = sentryIngestUrl(
    url.searchParams.get("o") ?? "",
    url.searchParams.get("p") ?? "",
    url.searchParams.get("r")
  );
  if (!dest) {
    return new Response(null, { status: 400 });
  }

  const body = await request.arrayBuffer();
  const contentType = request.headers.get("content-type") ?? "application/x-sentry-envelope";
  const upstream = await fetch(dest, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "text/plain" }
  });
}
