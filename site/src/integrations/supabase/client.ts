import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/konfig";

/**
 * Supabase-Client der Website (eigenes Projekt „PFMM“, Frankfurt).
 * Der anonyme Schlüssel ist öffentlich; alle Rechte regelt Row Level Security.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
  },
});
