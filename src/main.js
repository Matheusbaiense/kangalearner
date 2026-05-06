import { isSupabaseConfigured } from "./js/config.js";

// `import.meta.env` is Vite-only; keep this module safe for non-Vite static serving.
if (import.meta.env && import.meta.env.DEV) {
  console.debug("[KangaLearner] Vite dev active; Supabase env present:", isSupabaseConfigured());
}
