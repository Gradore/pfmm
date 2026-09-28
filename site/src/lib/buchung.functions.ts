import { buchungSchema, terminanfrageSchema } from "@/lib/buchung";
import type { BuchungErgebnis } from "@/lib/buchung";
import { edge } from "@/lib/edge";
import { z } from "zod";

const anmeldungEingabe = buchungSchema.extend({
  seminar_slug: z.string().trim().min(1).max(120),
  seminar_titel: z.string().trim().min(1).max(200),
});

const anfrageEingabe = terminanfrageSchema.extend({
  seminar_titel: z.string().trim().min(1).max(200),
});

/** Verbindliche Anmeldung auf einen konkreten Termin (Edge Function „buchung“). */
export async function buchungAnlegen({ data }: { data: unknown }): Promise<BuchungErgebnis> {
  const d = anmeldungEingabe.parse(data);
  return edge<BuchungErgebnis>("buchung", { ...d, art: "anmeldung" });
}

/** Unverbindliche Terminanfrage — ohne Termin, ohne Platzverbrauch. */
export async function terminanfrageAnlegen({ data }: { data: unknown }): Promise<BuchungErgebnis> {
  const d = anfrageEingabe.parse(data);
  return edge<BuchungErgebnis>("buchung", { ...d, art: "terminanfrage" });
}
