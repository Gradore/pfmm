/**
 * Verwaltung — direkte Datenbankzugriffe mit der Sitzung der angemeldeten Person.
 * Die Rechte prüft die Datenbank selbst (Row Level Security, Rolle „admin“).
 */
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { berechneStorno } from "@/lib/storno";
import type { BuchungEvent, BuchungMitTermin, BuchungStatus, Termin } from "@/lib/buchung";

const terminEingabe = z.object({
  id: z.string().uuid().optional(),
  seminar_slug: z.string().trim().min(1).max(120),
  titel_zusatz: z.string().trim().max(160).optional().or(z.literal("")),
  start_datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte Datum im Format JJJJ-MM-TT."),
  end_datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte Datum im Format JJJJ-MM-TT."),
  format: z.enum(["praesenz", "online", "inhouse"]),
  ort: z.string().trim().max(160).optional().or(z.literal("")),
  plaetze_gesamt: z.coerce.number().int().min(1).max(200),
  status: z.enum(["geplant", "offen", "ausgebucht", "abgesagt", "durchgefuehrt"]),
  honorar_hinweis: z.string().trim().max(200).optional().or(z.literal("")),
  oeffentlich: z.boolean(),
  notiz: z.string().trim().max(2000).optional().or(z.literal("")),
});

const BUCHUNG_SELECT =
  "*, termin:seminar_termine(id, seminar_slug, start_datum, end_datum, ort, format)";

function pruefe<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data;
}

/** Ist die angemeldete Person Administratorin oder Administrator? */
export async function istAdmin(_: unknown = {}): Promise<boolean> {
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", u.user.id)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

/** Alle Termine inklusive nicht öffentlicher Einträge. */
export async function alleTermine(_: unknown = {}): Promise<Termin[]> {
  const data = pruefe(
    await supabase.from("seminar_termine").select("*").order("start_datum", { ascending: true }),
  );
  return (data ?? []) as unknown as Termin[];
}

/** Termin anlegen oder ändern. */
export async function terminSpeichern({ data: roh }: { data: unknown }): Promise<{ id: string }> {
  const data = terminEingabe.parse(roh);
  if (data.end_datum < data.start_datum) throw new Error("Das Enddatum liegt vor dem Startdatum.");
  const werte = {
    seminar_slug: data.seminar_slug,
    titel_zusatz: data.titel_zusatz || null,
    start_datum: data.start_datum,
    end_datum: data.end_datum,
    format: data.format,
    ort: data.ort || null,
    plaetze_gesamt: data.plaetze_gesamt,
    status: data.status,
    honorar_hinweis: data.honorar_hinweis || null,
    oeffentlich: data.oeffentlich,
    notiz: data.notiz || null,
  };
  if (data.id) {
    const { data: bestand } = await supabase
      .from("seminar_termine")
      .select("plaetze_belegt")
      .eq("id", data.id)
      .single();
    if (bestand && data.plaetze_gesamt < (bestand.plaetze_belegt ?? 0)) {
      throw new Error(
        `Es sind bereits ${bestand.plaetze_belegt} Plätze belegt. Bitte zuerst Anmeldungen anpassen.`,
      );
    }
    pruefe(await supabase.from("seminar_termine").update(werte).eq("id", data.id));
    return { id: data.id };
  }
  const neu = pruefe(await supabase.from("seminar_termine").insert(werte).select("id").single());
  return { id: (neu as { id: string }).id };
}

/** Termin löschen — nur solange keine Buchung daran hängt. */
export async function terminLoeschen({ data }: { data: { id: string } }): Promise<{ ok: true }> {
  const { count } = await supabase
    .from("buchungen")
    .select("id", { count: "exact", head: true })
    .eq("termin_id", data.id);
  if ((count ?? 0) > 0) {
    throw new Error(
      "Zu diesem Termin liegen Anmeldungen vor. Bitte den Termin auf „abgesagt“ setzen.",
    );
  }
  pruefe(await supabase.from("seminar_termine").delete().eq("id", data.id));
  return { ok: true };
}

/** Termin absagen, auf Wunsch mit Storno aller zugehörigen Anmeldungen. */
export async function terminAbsagen({
  data,
}: {
  data: { id: string; buchungenStornieren: boolean };
}): Promise<{ betroffen: number }> {
  pruefe(
    await supabase
      .from("seminar_termine")
      .update({ status: "abgesagt", oeffentlich: false })
      .eq("id", data.id),
  );
  const { data: offene } = await supabase
    .from("buchungen")
    .select("id")
    .eq("termin_id", data.id)
    .in("status", ["angefragt", "bestaetigt", "warteliste"]);
  const ids = (offene ?? []).map((b: { id: string }) => b.id);
  if (data.buchungenStornieren && ids.length > 0) {
    pruefe(
      await supabase
        .from("buchungen")
        .update({
          status: "storniert",
          storno_am: new Date().toISOString(),
          storno_stufe: 0,
          storno_grund: "Absage durch die Praxis — keine Stornogebühr.",
        })
        .in("id", ids),
    );
  }
  return { betroffen: ids.length };
}

/** Alle Anmeldungen und Terminanfragen mit Termindaten. */
export async function alleBuchungen(_: unknown = {}): Promise<BuchungMitTermin[]> {
  const data = pruefe(
    await supabase.from("buchungen").select(BUCHUNG_SELECT).order("created_at", { ascending: false }),
  );
  return (data ?? []) as unknown as BuchungMitTermin[];
}

/** Status einer Buchung setzen; bei Storno wird die Stufe mitgeschrieben. */
export async function buchungStatusSetzen({
  data,
}: {
  data: {
    ids: string[];
    status: BuchungStatus;
    stornoStufe?: number;
    stornoGrund?: string;
    notiz?: string;
  };
}): Promise<{ status: BuchungStatus }> {
  for (const id of data.ids) {
    const felder: Record<string, unknown> = { status: data.status };
    if (data.status === "storniert") {
      const { data: b } = await supabase
        .from("buchungen")
        .select("termin_id, termin:seminar_termine(start_datum)")
        .eq("id", id)
        .single();
      const start = (b as unknown as { termin: { start_datum: string } | null } | null)?.termin
        ?.start_datum;
      const berechnet = start ? berechneStorno(start) : null;
      felder["storno_am"] = new Date().toISOString();
      felder["storno_stufe"] = data.stornoStufe ?? berechnet?.prozent ?? null;
      felder["storno_tage_vorher"] = berechnet?.tage ?? null;
      felder["storno_grund"] = data.stornoGrund || null;
    } else {
      felder["storno_am"] = null;
    }
    pruefe(await supabase.from("buchungen").update(felder).eq("id", id));

    if (data.notiz || data.stornoGrund) {
      await supabase.from("buchung_events").insert({
        buchung_id: id,
        nach_status: data.status,
        notiz: [data.notiz, data.stornoGrund].filter(Boolean).join(" — "),
      });
    }
  }
  return { status: data.status };
}

/** Interne Notiz zu einer Buchung speichern. */
export async function buchungNotiz({
  data,
}: {
  data: { id: string; notiz: string };
}): Promise<{ ok: true }> {
  pruefe(
    await supabase
      .from("buchungen")
      .update({ notiz_intern: data.notiz.trim() || null })
      .eq("id", data.id),
  );
  await supabase.from("buchung_events").insert({ buchung_id: data.id, notiz: "Interne Notiz geändert" });
  return { ok: true };
}

/** Buchung endgültig löschen. */
export async function buchungLoeschen({ data }: { data: { id: string } }): Promise<{ ok: true }> {
  await supabase.from("buchung_events").delete().eq("buchung_id", data.id);
  pruefe(await supabase.from("buchungen").delete().eq("id", data.id));
  return { ok: true };
}

/** Protokoll einer Buchung. */
export async function buchungVerlauf({ data }: { data: { id: string } }): Promise<BuchungEvent[]> {
  const rows = pruefe(
    await supabase
      .from("buchung_events")
      .select("*")
      .eq("buchung_id", data.id)
      .order("created_at", { ascending: false }),
  );
  return (rows ?? []) as unknown as BuchungEvent[];
}

/** Terminanfrage einem Termin zuordnen — sie wird damit zur Anmeldung. */
export async function anfrageZuordnen({
  data,
}: {
  data: { id: string; termin_id: string };
}): Promise<{ ok: true }> {
  const anfrage = pruefe(
    await supabase
      .from("buchungen")
      .select("id, art, anzahl_personen, anzahl_plaetze")
      .eq("id", data.id)
      .single(),
  ) as { art: string; anzahl_personen: number | null; anzahl_plaetze: number };
  if (anfrage.art !== "terminanfrage") throw new Error("Das ist bereits eine Anmeldung.");

  const plaetze = Math.min(Math.max(anfrage.anzahl_personen ?? anfrage.anzahl_plaetze, 1), 10);
  pruefe(
    await supabase
      .from("buchungen")
      .update({
        termin_id: data.termin_id,
        art: "anmeldung",
        storno_ok: true,
        anzahl_plaetze: plaetze,
        status: "angefragt",
      })
      .eq("id", data.id),
  );
  await supabase.from("buchung_events").insert({
    buchung_id: data.id,
    nach_status: "angefragt",
    notiz:
      "Terminanfrage einem Termin zugeordnet. Stornobedingungen sind mit dem Terminvorschlag zu bestätigen.",
  });
  return { ok: true };
}
