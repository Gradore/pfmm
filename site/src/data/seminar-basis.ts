/**
 * Gemeinsame Typen und Konstanten der Seminardaten.
 * Liegt getrennt, damit Programm- und Themenfeldseminare sich gegenseitig
 * nicht zirkulär importieren müssen.
 */

export const ABSPRACHE_LABEL = "Termin nach Absprache";
export const ZEITEN_LABEL = "täglich ab 08:59 Uhr";
export const MWST_SUFFIX = "zzgl. gesetzl. MwSt.";
export const SEMINARORT = "Max-Planck-Straße 27, 61184 Karben";
export const HONORAR_LABEL = "Honorar nach Format";

export type Themenfeld = "Strategie" | "Führung" | "Kommunikation" | "Persönlichkeit";

export type ProgrammBlock = {
  n: number;
  title: string;
  sub: string;
  items: string[];
  merke?: { source: string; text: string };
  /** Für das Rhetorik-Individualtraining: zu welchen Paketen der Tag gehört. */
  groups?: string[];
};

export type Seminar = {
  slug: string;
  /** Kurztitel für Karten, Navigation und Breadcrumb. */
  title: string;
  /** Überschrift der Detailseite. */
  h1: string;
  subtitle: string;
  lead: string;
  eyebrow: string;
  dateLabel: string;
  /** true = bestätigter, ausgeschriebener Termin. */
  isOpenDate: boolean;
  durationLabel: string;
  groupLabel: string;
  locationLabel: string;
  /** Nettopreis in Euro oder null, wenn kein Preis vorliegt. */
  priceEur: number | null;
  priceNote: string;
  bereich: "Vertrieb" | "Führung" | "Kommunikation";
  /** Themenfeld des Seminarprogramms. */
  themenfeld?: Themenfeld;
  /** true = Abrechnung nach Format und Dauer statt festem Seminarpreis. */
  honorarModell?: true;
  /** Träger oder Kooperationspartner, falls angegeben. */
  traeger?: string;
  /** Seminarzeiten — wörtlich, je Seminar unterschiedlich. */
  zeitenLabel?: string;
  /** Echte Teilnehmerstimmen — nur wenn tatsächlich vorhanden. */
  voices?: { quote: string; name: string; role: string }[];
  metaTitle: string;
  metaDescription: string;
  quote: { text: string; source?: string } | null;
  /** „Darum geht es“ */
  intro: string[];
  programme: ProgrammBlock[];
  /** Fließtextabschnitte für Seminare ohne Tagesprogramm. */
  sections?: { heading: string; body: string[]; ordered?: boolean }[];
  background?: { heading: string; body: string[]; ordered?: boolean };
  /** Zweiter Hintergrundabschnitt, falls das Material zwei Teile vorsieht. */
  background2?: { heading: string; body: string[]; ordered?: boolean };
  /** „Zentrale Inhalte“ — behandelte Themen, kein Ergebnisversprechen. */
  zentraleInhalte?: string[];
  /** „Das nehmen Sie mit“ */
  outcomes: string[];
  /** „Für wen das Seminar gedacht ist“ */
  audience: string[];
  organisation: { dt: string; dd: string }[];
  included: string[];
  faq: { q: string; a: string }[];
  related: string[];
  pdfUrl?: string;
  pdfSize?: string;
  /** Für das Rhetoriktraining: Tab-Filter über den Programmtagen. */
  durationFilter?: { id: string; label: string }[];
};
