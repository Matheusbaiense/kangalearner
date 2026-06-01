/** Rounded integer percentage of `correct` out of `total`. Returns 0 when total is 0. */
export function pct(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}
