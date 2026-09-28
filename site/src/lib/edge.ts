import { supabase } from "@/integrations/supabase/client";

/** Ruft eine Edge Function auf und gibt deren Fehlermeldung verständlich weiter. */
export async function edge<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    let meldung = "Die Anfrage konnte nicht gespeichert werden. Bitte rufen Sie mich an.";
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === "function") {
      try {
        const j = (await ctx.json()) as { error?: string };
        if (j.error) meldung = j.error;
      } catch {
        /* Antwort ohne JSON */
      }
    }
    throw new Error(meldung);
  }
  return data as T;
}
