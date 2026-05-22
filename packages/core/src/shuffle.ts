/** Fisher–Yates partial shuffle — unbiased sample of up to k items. */
export function fisherYatesSlice<T>(arr: readonly T[], k: number): T[] {
  const n = arr.length;
  if (n === 0 || k <= 0) return [];
  const copy = [...arr];
  const take = Math.min(k, n);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (n - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, take);
}
