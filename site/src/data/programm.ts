/**
 * Seminarprogramm nach Themenfeldern — reine Titellisten aus dem Programm.
 * Titel mit eigener Seite verlinken dorthin; alle anderen bleiben Titel ohne
 * erfundene Beschreibung und tragen den Hinweis „auf Anfrage“.
 */

import type { Themenfeld } from "@/data/seminar-basis";
import { SEMINARE } from "@/data/seminare";

export type ProgrammTitel = { titel: string; slug?: string };

export const PROGRAMM_THEMENFELDER: { feld: Themenfeld; titel: ProgrammTitel[] }[] = [
  {
    feld: "Strategie",
    titel: [
      { titel: "Strategisches Denken. Zukunft gestalten", slug: "strategisches-denken" },
      { titel: "Ordnung denken", slug: "ordnung-denken" },
      { titel: "Unternehmensethik", slug: "unternehmensethik" },
      { titel: "Entscheidungskompetenz im Management", slug: "entscheidungskompetenz" },
      { titel: "Interdisziplinäres Denken und Transformation" },
      { titel: "Nachhaltigkeit" },
      { titel: "Erfolgsmanagement" },
      { titel: "Unternehmenskultur und Unternehmensphilosophie", slug: "unternehmenskultur" },
      { titel: "Management-Philosophie" },
      { titel: "Märchen, Rituale, Mythen und Fabeln" },
      { titel: "Stoizismus im Management" },
    ],
  },
  {
    feld: "Führung",
    titel: [
      { titel: "Grundlagen Führung", slug: "grundlagen-fuehrung" },
      { titel: "Leadership und Change Management" },
      { titel: "Werte und Verantwortung" },
      { titel: "Führung ohne Vorgesetztenfunktion" },
      { titel: "Macht und Konflikte in Führung und Organisation" },
      { titel: "Resilienz oder die innere Führung der Stärke" },
      { titel: "Wege zum Menschenkenner" },
      { titel: "Führungspsychologie" },
      { titel: "Kommunikation im Change" },
      { titel: "Einstieg in die Rolle der Führungskraft", slug: "einstieg-fuehrungsrolle" },
      { titel: "Effektivität und Effizienz" },
      { titel: "Gesprächsführung für Führungskräfte" },
    ],
  },
  {
    feld: "Kommunikation",
    titel: [
      { titel: "Moderation", slug: "moderation" },
      { titel: "Präsentation", slug: "praesentation" },
      { titel: "Wertschätzung" },
      { titel: "Kommunikation verstehen" },
      { titel: "Interaktive Gesprächsführung" },
      { titel: "Feedback und Dialog" },
      { titel: "Die Kunst der Besprechung" },
    ],
  },
  {
    feld: "Persönlichkeit",
    titel: [
      { titel: "Verhandlungsführung" },
      { titel: "Key Account Management" },
      { titel: "Grundlagen Verkauf und Vertrieb" },
      { titel: "Kreativität – Schlüsselkompetenz zur Führung" },
      { titel: "Umgang mit Rückschlägen und Enttäuschungen" },
      { titel: "Erfahrungen denken" },
      { titel: "Lebenskunst und Lebensgestaltung" },
      { titel: "20 Stufen zur Selbstbeauftragung" },
      { titel: "Persönliche Rhetorik", slug: "rhetorik" },
      { titel: "Train the Trainer" },
      { titel: "Dialektik und die Kunst des Vernunftdenkens" },
      { titel: "Zeit – Horizonte", slug: "zeit-horizonte" },
    ],
  },
];

/** Nur tatsächlich vorhandene Seminarseiten werden verlinkt. */
const VIER_THEMEN_TITEL: { feld: Themenfeld; titel: string[] }[] = [
  { feld: "Strategie", titel: ["Verhandlungstraining", "Dialektik", "Rhetorik", "Motivation", "Zeitmanagement", "Erfolgsmanagement", "Resilienz"] },
  { feld: "Führung", titel: ["Grundlagen", "Teamführung", "Führen mit Zielen", "Mitarbeiterführung", "Vom Kollegen zur Führungskraft"] },
  { feld: "Kommunikation", titel: ["Kommunikation verstehen", "Dialog und Verstehen", "Kommunikation im Change", "Business Knigge", "Präsentation", "Gesprächsführung"] },
  { feld: "Persönlichkeit", titel: ["Meistern von Rückschlägen", "Wege zum Menschenkenner", "Train the Trainer", "Schlagfertigkeit", "Zwischen Ton und Inhalt"] },
];

export const VIER_THEMENBEREICHE: { feld: Themenfeld; titel: ProgrammTitel[] }[] = VIER_THEMEN_TITEL.map((gruppe) => ({ ...gruppe, titel: gruppe.titel.map((name) => {
  const match = SEMINARE.find((s) => s.title.toLocaleLowerCase("de") === name.toLocaleLowerCase("de") ||
    (name === "Grundlagen" && s.slug === "grundlagen-fuehrung") ||
    (name === "Vom Kollegen zur Führungskraft" && s.slug === "einstieg-fuehrungsrolle") ||
    (name === "Rhetorik" && s.slug === "rhetorik"));
  return { titel: name, ...(match ? { slug: match.slug } : {}) };
}) }));
