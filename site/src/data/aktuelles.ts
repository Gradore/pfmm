export type AktuellesEintrag = { datum: string; ende?: string; label: string; dauer?: string; slug?: string };

export const AKTUELLE_SEMINARE: AktuellesEintrag[] = [
  { datum: "2026-11-03", ende: "2026-11-04", label: "Moderation von Workshops", dauer: "2 Tage", slug: "moderation-workshops" },
  { datum: "2026-11-12", ende: "2026-11-13", label: "Zeit und Effizienztraining", dauer: "2 Tage", slug: "zeit-effektivitaet" },
  { datum: "2026-11-18", ende: "2026-11-19", label: "Führen mit Zielen", dauer: "2 Tage", slug: "fuehren-mit-zielen" },
  { datum: "2026-11-24", ende: "2026-11-25", label: "Kraft der Wertschätzung", dauer: "2 Tage", slug: "kraft-der-wertschaetzung" },
];

export const TALK_TERMINE: AktuellesEintrag[] = [
  { datum: "2026-11-05", label: "Führen, wenn die KI mit entscheidet" },
  { datum: "2026-11-26", label: "Warum sollten mir meine Mitarbeiter:innen noch glauben?" },
  { datum: "2026-12-03", label: "Vertrauen – die neue Führungswährung" },
];

export const DIGITALE_THEMEN: AktuellesEintrag[] = [
  { datum: "2026-11-01", ende: "2026-11-30", label: "Macht und Führung – Teil 1" },
  { datum: "2027-01-01", ende: "2027-01-31", label: "Macht und Führung – Teil 2" },
];

export function kommendeEintraege(eintraege: AktuellesEintrag[], heute = new Date().toISOString().slice(0, 10)) {
  return eintraege.filter((e) => (e.ende ?? e.datum) >= heute);
}

export function aktuellesDatum(e: AktuellesEintrag) {
  const a = new Date(`${e.datum}T12:00:00Z`);
  if (!e.ende) return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(a);
  const b = new Date(`${e.ende}T12:00:00Z`);
  if (e.datum.slice(0, 7) === e.ende.slice(0, 7) && a.getUTCDate() === 1 && b.getUTCDate() >= 28) {
    return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric", timeZone: "UTC" }).format(a);
  }
  return `${a.getUTCDate()}.–${b.getUTCDate()}. ${new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric", timeZone: "UTC" }).format(b)}`;
}
