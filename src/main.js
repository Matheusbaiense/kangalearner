import { isSupabaseConfigured } from "./js/config.js";

if (import.meta.env.DEV) {
  console.debug("[KangaLearner] Vite dev active; Supabase env present:", isSupabaseConfigured());
}
