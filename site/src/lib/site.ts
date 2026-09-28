/** Zentrale Inhalts- und Kontaktdaten der Praxis für Marketing & Motivation. */

export const CONTACT = {
  company: "Praxis für Marketing & Motivation",
  person: "Erich Grikscheit",
  street: "Max-Planck-Str. 27",
  zip: "61184",
  city: "Karben",
  phoneDisplay: "0 60 39 / 45 45 8",
  phoneHref: "tel:+49603945458",
  mobileDisplay: "0170 46 33 088",
  mobileHref: "tel:+491704633088",
  email: "info@pfmm.de",
  linkedin: "https://www.linkedin.com/in/erich-grikscheit-pfmm",
  geo: { lat: 50.222643, lng: 8.76512 },
} as const;

export type NavItem = { label: string; to: string };

export const LEISTUNGEN: NavItem[] = [
  { label: "Inhouse-Trainings", to: "/leistungen/inhouse" },
  { label: "Philosophische Beratung", to: "/leistungen/beratung" },
  { label: "Konzeptentwicklung", to: "/leistungen/konzepte" },
  { label: "90 Minuten Talk", to: "/leistungen/talk" },
  { label: "Honorare", to: "/honorare" },
  { label: "Leitfäden", to: "/leitfaeden" },
  { label: "Übersicht", to: "/leistungen" },
];

export const MAIN_NAV: NavItem[] = [
  { label: "Praxisbriefe", to: "/praxisbriefe" },
  { label: "Über mich", to: "/ueber-mich" },
  { label: "Kontakt", to: "/kontakt" },
];

/** Die zwölf Themen — Select im Hero und Kachel-Grid. */
export const THEMEN: NavItem[] = [
  { label: "Führung und Leadership", to: "/leistungen/inhouse" },
  { label: "Konflikte", to: "/leistungen/inhouse" },
  { label: "Rhetorik", to: "/leistungen/seminare" },
  { label: "Präsentation", to: "/leistungen/seminare" },
  { label: "Gesprächsführung", to: "/leistungen/seminare" },
  { label: "Verhandlung", to: "/leistungen/inhouse" },
  { label: "Vertrieb", to: "/leistungen/konzepte" },
  { label: "Zeitmanagement", to: "/leistungen/seminare" },
  { label: "Resilienz", to: "/leistungen/seminare" },
  { label: "Unternehmensethik", to: "/leistungen/beratung" },
  { label: "Motivation", to: "/leistungen/inhouse" },
  { label: "Besprechungsmanagement", to: "/leistungen/inhouse" },
];

export {
  PRAXISBRIEFE,
  findPraxisbrief,
  praxisbriefNachbarn,
  AUTOR_BILD,
  LINKEDIN_URL,
  type Praxisbrief,
} from "@/data/praxisbriefe";

export {
  SEMINARE,
  SEMINARE_PROGRAMM,
  SEMINARE_THEMENFELD,
  findSeminar,
  ABSPRACHE_LABEL,
  type Seminar,
} from "@/data/seminare";
