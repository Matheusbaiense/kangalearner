/** Build the Sentry envelope ingest URL from tunnel query params. Rejects non-numeric ids. */
export function sentryIngestUrl(
  orgId: string,
  projectId: string,
  region?: string | null
): string | null {
  if (!/^\d+$/.test(orgId) || !/^\d+$/.test(projectId)) return null;
  if (region && !/^[a-z]{2}$/.test(region)) return null;
  const host = region
    ? `https://o${orgId}.ingest.${region}.sentry.io`
    : `https://o${orgId}.ingest.sentry.io`;
  return `${host}/api/${projectId}/envelope/?hsts=0`;
}
