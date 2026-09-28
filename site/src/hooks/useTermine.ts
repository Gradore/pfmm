import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Termin } from "@/lib/buchung";

const SPALTEN =
  "id, seminar_slug, titel_zusatz, start_datum, end_datum, format, ort, plaetze_gesamt, plaetze_belegt, status, honorar_hinweis, oeffentlich";

/**
 * Lädt öffentliche, künftige Termine. Läuft mit dem anonymen Schlüssel und
 * funktioniert deshalb auch beim Vorrendern (Route-Loader).
 */
export async function ladeOeffentlicheTermine(seminarSlug?: string): Promise<Termin[]> {
  const heute = new Date().toISOString().slice(0, 10);
  let q = supabase
    .from("seminar_termine")
    .select(SPALTEN)
    .eq("oeffentlich", true)
    .gte("end_datum", heute)
    .order("start_datum", { ascending: true });
  if (seminarSlug) q = q.eq("seminar_slug", seminarSlug);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Termin[];
}

export function terminQueryKey(seminarSlug?: string) {
  return ["termine", "oeffentlich", seminarSlug ?? "alle"] as const;
}

/** Öffentliche, künftige Termine — optional auf ein Seminar eingegrenzt. */
export function useOeffentlicheTermine(seminarSlug?: string, initialData?: Termin[]) {
  return useQuery({
    queryKey: terminQueryKey(seminarSlug),
    queryFn: () => ladeOeffentlicheTermine(seminarSlug),
    ...(initialData ? { initialData } : {}),
  });
}
