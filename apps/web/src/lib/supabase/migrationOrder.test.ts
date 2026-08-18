import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "../../../../../supabase/migrations");

function stripComments(sql: string): string {
  return sql.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/--[^\n]*/g, " ");
}

/** Guarded blocks already check information_schema; skip them. */
function maskDoBlocks(sql: string): string {
  return sql.replace(/\bDO\s+\$\$[\s\S]*?\$\$;/gi, " ");
}

function publicRelation(raw: string): string | null {
  const qualified = raw.trim().toLowerCase();
  if (qualified.startsWith("auth.") || qualified.startsWith("storage.")) {
    return null;
  }
  const name = qualified.startsWith("public.") ? qualified.slice("public.".length) : qualified;
  if (!/^[a-z][a-z0-9_]*$/.test(name)) {
    return null;
  }
  return name;
}

type Mention = { file: string; table: string; kind: "create" | "require"; index: number };

function mentionsIn(file: string, sql: string): Mention[] {
  const text = maskDoBlocks(stripComments(sql));
  const found: Mention[] = [];

  const createTable = /\bCREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+((?:[a-zA-Z_][a-zA-Z0-9_]*\.)?[a-zA-Z_][a-zA-Z0-9_]*)/gi;
  const requireRel =
    /\b(?:(?:CREATE|DROP)\s+POLICY\s+(?:IF\s+EXISTS\s+)?(?:"[^"]+"|[a-zA-Z_][a-zA-Z0-9_]*)\s+ON|(?:CREATE|DROP)\s+TRIGGER\s+(?:IF\s+EXISTS\s+)?[a-zA-Z_][a-zA-Z0-9_]*\s+(?:[\s\S]*?)\s+ON|ALTER\s+TABLE(?:\s+IF\s+EXISTS)?)\s+((?:[a-zA-Z_][a-zA-Z0-9_]*\.)?[a-zA-Z_][a-zA-Z0-9_]*)/gi;

  for (const match of text.matchAll(createTable)) {
    const table = publicRelation(match[1] ?? "");
    if (table && match.index !== undefined) {
      found.push({ file, table, kind: "create", index: match.index });
    }
  }
  for (const match of text.matchAll(requireRel)) {
    const table = publicRelation(match[1] ?? "");
    if (table && match.index !== undefined) {
      found.push({ file, table, kind: "require", index: match.index });
    }
  }

  return found.sort((a, b) => a.index - b.index);
}

function loadMigrationFiles(): { name: string; sql: string }[] {
  return readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((name) => ({ name, sql: readFileSync(join(migrationsDir, name), "utf8") }));
}

describe("supabase migration order", () => {
  it("creates public tables before policies, triggers, or ALTER TABLE", () => {
    const created = new Set<string>();
    const violations: string[] = [];

    for (const file of loadMigrationFiles()) {
      for (const mention of mentionsIn(file.name, file.sql)) {
        if (mention.kind === "create") {
          created.add(mention.table);
          continue;
        }
        if (!created.has(mention.table)) {
          violations.push(`${file.name}: ${mention.kind} ${mention.table} before CREATE TABLE`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
