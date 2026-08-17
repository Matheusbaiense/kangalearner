export const THEME_STORAGE_KEY = "kl-theme";
export const THEME_STORAGE_KEY_LEGACY = "kanga-theme";

type ThemeStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Read kl-theme, migrating the legacy kanga-theme key once. */
export function migrateAndReadTheme(storage: ThemeStorage): string | null {
  const current = storage.getItem(THEME_STORAGE_KEY);
  if (current) return current;
  const legacy = storage.getItem(THEME_STORAGE_KEY_LEGACY);
  if (!legacy) return null;
  storage.setItem(THEME_STORAGE_KEY, legacy);
  storage.removeItem(THEME_STORAGE_KEY_LEGACY);
  return legacy;
}

export function writeTheme(storage: ThemeStorage, value: string): void {
  storage.setItem(THEME_STORAGE_KEY, value);
  storage.removeItem(THEME_STORAGE_KEY_LEGACY);
}
