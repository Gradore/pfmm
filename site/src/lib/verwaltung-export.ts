/** CSV-Ausgabe der Verwaltung — deutsche Kopfzeile, Semikolon, UTF-8 mit BOM. */

import { BUCHUNG_STATUS_LABEL, buchungsReferenz, datumKurz, zeitraumKurz } from "@/lib/buchung";
import type { BuchungMitTermin } from "@/lib/buchung";
import { seminarTitel } from "@/lib/seminar-titel";

function feld(wert: string | number | null | undefined): string {
  return `"${String(wert ?? "").replace(/"/g, '""')}"`;
}

const KOPF = [
  "Seminar",
  "Termin",
  "Name",
  "Vorname",
  "Unternehmen",
  "Funktion",
  "E-Mail",
  "Telefon",
  "Anschrift",
  "Plätze",
  "Status",
  "Eingang",
  "Buchungsnummer",
];

export function csvHerunterladen(zeilen: BuchungMitTermin[], dateiname: string): void {
  const inhalt = [
    KOPF.map(feld).join(";"),
    ...zeilen.map((b) =>
      [
        seminarTitel(b.termin?.seminar_slug ?? b.seminar_slug),
        b.termin ? zeitraumKurz(b.termin.start_datum, b.termin.end_datum) : "Terminanfrage",
        b.nachname,
        b.vorname,
        b.unternehmen,
        b.funktion,
        b.email,
        b.telefon,
        b.anschrift,
        b.anzahl_plaetze,
        BUCHUNG_STATUS_LABEL[b.status],
        datumKurz(b.created_at),
        buchungsReferenz(b.id),
      ]
        .map(feld)
        .join(";"),
    ),
  ].join("\r\n");

  const blob = new Blob([`﻿${inhalt}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${dateiname}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
