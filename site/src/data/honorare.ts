/** Honorare nach Format sowie Stornostaffel — geliefertes Material, nichts ergänzt. */

export type HonorarZeile = { format: string; dauer: string; honorar: string };

export const HONORARE: HonorarZeile[] = [
  { format: "Online-Training", dauer: "1 Tag", honorar: "395 €" },
  { format: "Einzeltraining", dauer: "1 Tag", honorar: "598 €" },
  { format: "Einzeltraining", dauer: "2 Tage", honorar: "985 €" },
  { format: "Einzeltraining", dauer: "3 Tage", honorar: "1.395 €" },
  { format: "Inhouse-Training", dauer: "1 Tag", honorar: "395 € pro Teilnehmer" },
  { format: "Inhouse-Training", dauer: "2 Tage", honorar: "495 € pro Teilnehmer" },
  { format: "Inhouse-Training", dauer: "3 Tage", honorar: "645 € pro Teilnehmer" },
  {
    format: "Inhouse-Beratung oder Vorgespräche, Einzel- oder Gruppengespräche",
    dauer: "1 Tag",
    honorar: "750 €",
  },
];

export const STORNO: { zeitraum: string; prozent: number; text: string }[] = [
  { zeitraum: "bis 30 Tage vorher", prozent: 0, text: "kostenfrei" },
  { zeitraum: "29. bis 10. Tag", prozent: 50, text: "50 %" },
  { zeitraum: "10. bis 3. Tag", prozent: 70, text: "70 %" },
  { zeitraum: "3. bis 1. Tag", prozent: 90, text: "90 %" },
  { zeitraum: "Nichtantritt am Veranstaltungstag", prozent: 100, text: "100 %" },
];

export const HONORAR_INKLUSIVE = [
  "Seminarleitfaden",
  "Digitale Dokumentation",
  "Seminargetränke",
];
