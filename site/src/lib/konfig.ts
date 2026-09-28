/** Öffentliche Adresse der Website — für JSON-LD, Sitemap und Bestätigungslinks. */
export const SITE_URL = import.meta.env["VITE_SITE_URL"] ?? "https://pfmm.gradore.de";

/** Supabase-Projekt der Praxis (eigenes Projekt, Frankfurt). Der Schlüssel ist öffentlich. */
export const SUPABASE_URL =
  import.meta.env["VITE_SUPABASE_URL"] ?? "https://oawbsphowxobedyrnrlq.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? "";
