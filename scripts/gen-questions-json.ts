import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { QUESTIONS } from "../packages/core/src/data/questions.ts";

const STATES = ["WA", "NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "apps/web/public/data");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "questions.json"), JSON.stringify(QUESTIONS));
console.log(`Wrote ${QUESTIONS.length} questions to questions.json`);

for (const state of STATES) {
  const slice = QUESTIONS.filter((q) => !q.states || q.states.includes(state));
  writeFileSync(join(outDir, `questions-${state}.json`), JSON.stringify(slice));
  console.log(`Wrote ${slice.length} questions to questions-${state}.json`);
}
