export function firstUnansweredIndex(
  qids: readonly string[],
  answers: Record<string, unknown>
): number {
  const i = qids.findIndex((id) => {
    const value = answers[id];
    return value == null || value === "";
  });
  return i === -1 ? 0 : i;
}
