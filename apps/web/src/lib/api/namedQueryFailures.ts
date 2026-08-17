export function namedQueryFailures(
  results: Array<{ name: string; error: unknown }>
): string[] {
  return results.filter((row) => Boolean(row.error)).map((row) => row.name);
}
