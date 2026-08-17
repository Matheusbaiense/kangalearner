import { describe, expect, it } from "vitest";
import {
  THEME_STORAGE_KEY,
  THEME_STORAGE_KEY_LEGACY,
  migrateAndReadTheme,
  writeTheme
} from "./themeStorage";

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map(Object.entries(initial));
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => [...map.keys()][index] ?? null,
    removeItem: (key: string) => {
      map.delete(key);
    },
    setItem: (key: string, value: string) => {
      map.set(key, value);
    }
  };
}

describe("themeStorage", () => {
  it("reads the canonical key", () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: "dark" });
    expect(migrateAndReadTheme(storage)).toBe("dark");
  });

  it("migrates kanga-theme and deletes the legacy key", () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY_LEGACY]: "light" });
    expect(migrateAndReadTheme(storage)).toBe("light");
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(storage.getItem(THEME_STORAGE_KEY_LEGACY)).toBeNull();
  });

  it("prefers kl-theme when both exist", () => {
    const storage = memoryStorage({
      [THEME_STORAGE_KEY]: "dark",
      [THEME_STORAGE_KEY_LEGACY]: "light"
    });
    expect(migrateAndReadTheme(storage)).toBe("dark");
  });

  it("writeTheme drops the legacy key", () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY_LEGACY]: "dark" });
    writeTheme(storage, "light");
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(storage.getItem(THEME_STORAGE_KEY_LEGACY)).toBeNull();
  });
});
