import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { QUESTIONS } from "../packages/core/src/data/questions.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "apps/web/public/data");
const outFile = join(outDir, "questions.json");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(QUESTIONS));
console.log(`Wrote ${QUESTIONS.length} questions to ${outFile}`);
