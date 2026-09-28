/** Stornostaffel der Praxis für Marketing & Motivation — Auslegung für die Verwaltung. */

export type StornoBerechnung = {
  /** Tage zwischen heute und dem Veranstaltungsbeginn (negativ nach Beginn). */
  tage: number;
  /** Fällige Stornogebühr in Prozent. */
  prozent: number;
  /** Ein Satz für die Anzeige in der Verwaltung. */
  satz: string;
};

export const STORNO_ERSATZ_HINWEIS =
  "Bei Benennung einer Ersatzteilnehmerin oder eines Ersatzteilnehmers entfällt die Gebühr.";

export const STORNO_AUSLEGUNG_HINWEIS =
  "Die schriftlichen Bedingungen überschneiden sich am 10. und am 3. Tag. Angewandte Auslegung: ab 30 Tagen kostenfrei · 29 bis 11 Tage 50 % · 10 bis 4 Tage 70 % · 3 bis 1 Tag 90 % · am Veranstaltungstag 100 %. Bitte einmal bestätigen lassen.";

/** Volle Tage zwischen Stichtag und Beginn, jeweils auf Kalendertage gerundet. */
export function tageBisBeginn(startDatum: string, stichtag: Date = new Date()): number {
  const start = Date.parse(`${startDatum}T00:00:00Z`);
  const heute = Date.parse(`${stichtag.toISOString().slice(0, 10)}T00:00:00Z`);
  return Math.round((start - heute) / 86_400_000);
}

export function stornoProzent(tage: number): number {
  if (tage >= 30) return 0;
  if (tage >= 11) return 50;
  if (tage >= 4) return 70;
  if (tage >= 1) return 90;
  return 100;
}

export function berechneStorno(
  startDatum: string,
  stichtag: Date = new Date(),
): StornoBerechnung {
  const tage = tageBisBeginn(startDatum, stichtag);
  const prozent = stornoProzent(tage);
  const satz =
    tage < 0
      ? `Storno nach Veranstaltungsbeginn — es werden ${prozent} % fällig.`
      : tage === 0
        ? `Storno am Veranstaltungstag — es werden ${prozent} % fällig.`
        : prozent === 0
          ? `Storno ${tage} Tage vor Beginn — kostenfrei.`
          : `Storno ${tage} Tag${tage === 1 ? "" : "e"} vor Beginn — es werden ${prozent} % fällig.`;
  return { tage, prozent, satz };
}
