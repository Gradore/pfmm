/** Gemeinsame Typen, Texte und Hilfsfunktionen der Seminarbuchung. */

import { z } from "zod";

export type TerminFormat = "praesenz" | "online" | "inhouse";
export type TerminStatus = "geplant" | "offen" | "ausgebucht" | "abgesagt" | "durchgefuehrt";
export type BuchungStatus =
  | "angefragt"
  | "bestaetigt"
  | "warteliste"
  | "storniert"
  | "erledigt"
  | "abgelehnt";

export type Termin = {
  id: string;
  seminar_slug: string;
  titel_zusatz: string | null;
  start_datum: string;
  end_datum: string;
  format: TerminFormat;
  ort: string | null;
  plaetze_gesamt: number;
  plaetze_belegt: number;
  status: TerminStatus;
  honorar_hinweis: string | null;
  oeffentlich: boolean;
  notiz?: string | null;
};

export const FORMAT_LABEL: Record<TerminFormat, string> = {
  praesenz: "Präsenz",
  online: "Online",
  inhouse: "Inhouse",
};

export const TERMIN_STATUS_LABEL: Record<TerminStatus, string> = {
  geplant: "Geplant",
  offen: "Offen",
  ausgebucht: "Ausgebucht",
  abgesagt: "Abgesagt",
  durchgefuehrt: "Durchgeführt",
};

export const BUCHUNG_STATUS_LABEL: Record<BuchungStatus, string> = {
  angefragt: "Angefragt",
  bestaetigt: "Bestätigt",
  warteliste: "Warteliste",
  storniert: "Storniert",
  erledigt: "Erledigt",
  abgelehnt: "Abgelehnt",
};

/** Stornobedingungen — wortgleich zur Honorarübersicht. */
export const STORNO_TEXT = [
  "Stornierungen sind bis 30 Tage vor Veranstaltungsbeginn kostenfrei möglich.",
  "Bei Rücktritt vom 29. bis 10. Tag vor Beginn werden 50 % des Honorars fällig.",
  "Vom 10. bis 3. Tag vor Beginn werden 70 % fällig.",
  "Vom 3. bis 1. Tag vor Beginn werden 90 % fällig.",
  "Bei Nichtantritt am Veranstaltungstag wird eine Stornogebühr von 100 % fällig.",
  "Storno ist jeder Rücktritt, auch im Krankheitsfall. Wenn Sie eine Ersatzteilnehmerin oder einen Ersatzteilnehmer benennen, entfällt die Stornogebühr.",
];

export function freiePlaetze(t: Pick<Termin, "plaetze_gesamt" | "plaetze_belegt">): number {
  return Math.max(t.plaetze_gesamt - t.plaetze_belegt, 0);
}

const LANG = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const TAG_MONAT = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long" });
const KURZ = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

/** „2. bis 4. September 2026“ bzw. „2. September 2026“. */
export function zeitraumLang(start: string, ende: string): string {
  const a = new Date(`${start}T12:00:00Z`);
  const b = new Date(`${ende}T12:00:00Z`);
  if (start === ende) return LANG.format(a);
  if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth()) {
    return `${a.getUTCDate()}. bis ${LANG.format(b)}`;
  }
  return `${TAG_MONAT.format(a)} bis ${LANG.format(b)}`;
}

export function zeitraumKurz(start: string, ende: string): string {
  const a = new Date(`${start}T12:00:00Z`);
  const b = new Date(`${ende}T12:00:00Z`);
  return start === ende ? KURZ.format(a) : `${KURZ.format(a)} – ${KURZ.format(b)}`;
}

export function datumKurz(iso: string): string {
  return KURZ.format(new Date(iso));
}

/** Kurzreferenz aus der UUID — für Rückfragen am Telefon. */
export function buchungsReferenz(id: string): string {
  return `PFMM-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export const buchungSchema = z.object({
  termin_id: z.string().uuid(),
  vorname: z.string().trim().min(2, "Bitte geben Sie Ihren Vornamen an.").max(80, "Bitte kürzen."),
  nachname: z.string().trim().min(2, "Bitte geben Sie Ihren Nachnamen an.").max(80, "Bitte kürzen."),
  unternehmen: z.string().trim().max(120, "Bitte kürzen.").optional().or(z.literal("")),
  funktion: z.string().trim().max(120, "Bitte kürzen.").optional().or(z.literal("")),
  anschrift: z.string().trim().max(300, "Bitte kürzen.").optional().or(z.literal("")),
  telefon: z.string().trim().max(40, "Bitte kürzen.").optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255, "Bitte kürzen."),
  anzahl_plaetze: z.coerce
    .number()
    .int("Bitte eine ganze Zahl angeben.")
    .min(1, "Mindestens ein Platz.")
    .max(10, "Höchstens zehn Plätze."),
  nachricht: z.string().trim().max(2000, "Bitte auf 2.000 Zeichen kürzen.").optional().or(z.literal("")),
  datenschutz_ok: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Datenschutzerklärung." }),
  }),
  storno_ok: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Stornobedingungen." }),
  }),
  website: z.string().max(0).optional(),
});

export type BuchungEingabe = z.input<typeof buchungSchema>;

/** Auswahl für das gewünschte Format einer Terminanfrage. */
export const WUNSCH_FORMATE = [
  { value: "praesenz", label: "Präsenz in Karben" },
  { value: "online", label: "Online" },
  { value: "inhouse", label: "Inhouse bei uns im Haus" },
] as const;

/** Unverbindliche Terminanfrage — ohne Termin, ohne Stornobedingungen. */
export const terminanfrageSchema = z.object({
  seminar_slug: z.string().trim().min(1).max(120),
  vorname: z.string().trim().min(2, "Bitte geben Sie Ihren Vornamen an.").max(80, "Bitte kürzen."),
  nachname: z.string().trim().min(2, "Bitte geben Sie Ihren Nachnamen an.").max(80, "Bitte kürzen."),
  unternehmen: z.string().trim().max(120, "Bitte kürzen.").optional().or(z.literal("")),
  funktion: z.string().trim().max(120, "Bitte kürzen.").optional().or(z.literal("")),
  telefon: z.string().trim().max(40, "Bitte kürzen.").optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255, "Bitte kürzen."),
  wunsch_zeitraum: z.string().trim().max(200, "Bitte kürzen.").optional().or(z.literal("")),
  wunsch_format: z.enum(["praesenz", "online", "inhouse"]).optional().or(z.literal("")),
  anzahl_personen: z.coerce
    .number()
    .int("Bitte eine ganze Zahl angeben.")
    .min(1, "Mindestens eine Person.")
    .max(200, "Bitte rufen Sie mich bei größeren Gruppen an."),
  nachricht: z
    .string()
    .trim()
    .max(2000, "Bitte auf 2.000 Zeichen kürzen.")
    .optional()
    .or(z.literal("")),
  datenschutz_ok: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Datenschutzerklärung." }),
  }),
  website: z.string().max(0).optional(),
});

export type TerminanfrageEingabe = z.input<typeof terminanfrageSchema>;

export type BuchungErgebnis = {
  id: string;
  referenz: string;
  status: BuchungStatus;
  art: "anmeldung" | "terminanfrage";
  mailVersandt: boolean;
};

export type Buchung = {
  id: string;
  termin_id: string | null;
  seminar_slug: string;
  art: "anmeldung" | "terminanfrage";
  wunsch_zeitraum: string | null;
  wunsch_format: TerminFormat | null;
  anzahl_personen: number | null;
  vorname: string;
  nachname: string;
  unternehmen: string | null;
  funktion: string | null;
  anschrift: string | null;
  telefon: string | null;
  email: string;
  anzahl_plaetze: number;
  nachricht: string | null;
  status: BuchungStatus;
  created_at: string;
  storno_am?: string | null;
  notiz_intern?: string | null;
  storno_stufe?: number | null;
  storno_tage_vorher?: number | null;
  storno_grund?: string | null;
};

/** Protokolleintrag zu einer Buchung. */
export type BuchungEvent = {
  id: string;
  buchung_id: string;
  von_status: string | null;
  nach_status: string | null;
  notiz: string | null;
  created_at: string;
};

export type BuchungMitTermin = Buchung & {
  termin: Pick<Termin, "id" | "seminar_slug" | "start_datum" | "end_datum" | "ort" | "format"> | null;
};
