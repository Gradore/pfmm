import { SEMINARE } from "@/data/seminare";

/** Kundenliste; noch nicht gelieferte Seminare werden erst mit Teil 2 verlinkt. */
const WUNSCHLISTE = [
  { name: "Zeit-Horizonte", slug: "zeit-horizonte" },
  { name: "Individuelle Rhetorik", slug: "rhetorik" },
  { name: "Neue Rolle als Führungskraft", slug: "einstieg-fuehrungsrolle" },
  { name: "Moderation", slug: "moderation" },
  { name: "Kraft der Wertschätzung", slug: "kraft-der-wertschaetzung" },
  { name: "Führung ohne Vorgesetztenfunktion", slug: "fuehrung-ohne-vorgesetztenfunktion" },
  { name: "Verhandlungsführung", slug: "verhandlungsfuehrung" },
  { name: "Macht und Konflikte", slug: "konflikte" },
] as const;

export const OFFENE_SEMINARE = WUNSCHLISTE.map(({ name, slug }) => {
  const seminar = SEMINARE.find((s) => s.slug === slug);
  return { name, seminar, dauer: seminar?.durationLabel ?? "Dauer folgt" };
});
