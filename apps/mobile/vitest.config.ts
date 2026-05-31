import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Mobile unit tests run in node and only cover RN-free logic modules
// (src/lib/sync-logic.ts and the pure helpers in src/lib/questions.ts).
// Resolve the @kanga/core workspace package straight to its TypeScript source
// the same way Metro/tsconfig paths do, since core ships no exports map.
const resolveCore = (relativePath: string) =>
  fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    passWithNoTests: false
  },
  resolve: {
    alias: [
      {
        find: "@kanga/core/data/questions",
        replacement: resolveCore("../../packages/core/src/data/questions.ts")
      },
      { find: "@kanga/core", replacement: resolveCore("../../packages/core/src/index.ts") }
    ]
  }
});
