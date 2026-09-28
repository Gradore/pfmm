/**
 * Seminardaten — einzige Quelle für Übersicht, Detailseiten, Sitemap und Startseite.
 *
 * Ehrlichkeitsregeln: Nur ein Seminar hat einen bestätigten Termin. Preise sind
 * Nettobeträge und werden ausnahmslos mit „zzgl. gesetzl. MwSt.“ ausgegeben.
 * Seminare ohne gelieferte Inhalte bleiben bewusst kurz — nichts wird erfunden.
 */

const PDF_BASE = "https://www.pfmm.de/das_angebot/aktuelle_seminare/seminare/";

import { SEMINARE_THEMENFELD } from "@/data/seminare-themen";
import {
  ABSPRACHE_LABEL,
  MWST_SUFFIX,
  SEMINARORT,
  ZEITEN_LABEL,
  HONORAR_LABEL,
  type ProgrammBlock,
  type Seminar,
  type Themenfeld,
} from "@/data/seminar-basis";

export {
  ABSPRACHE_LABEL,
  MWST_SUFFIX,
  SEMINARORT,
  ZEITEN_LABEL,
  HONORAR_LABEL,
  type ProgrammBlock,
  type Seminar,
  type Themenfeld,
};

const MOLIERE = {
  text: "Wir sind nicht nur verantwortlich für das, was wir tun, sondern auch für das, was wir nicht tun.",
  source: "Molière (1622–1673)",
};

/** Kurzfassung für Seminare, deren ausführliches Programm noch nicht vorliegt. */
function knapp(
  base: Pick<
    Seminar,
    | "slug"
    | "title"
    | "h1"
    | "subtitle"
    | "lead"
    | "eyebrow"
    | "dateLabel"
    | "isOpenDate"
    | "durationLabel"
    | "groupLabel"
    | "bereich"
    | "metaTitle"
    | "metaDescription"
    | "audience"
    | "related"
    | "pdfUrl"
  > &
    Partial<Seminar>,
): Seminar {
  return {
    locationLabel: "Karben bei Frankfurt",
    priceEur: null,
    priceNote: "Auf Anfrage",
    quote: null,
    intro: [],
    programme: [],
    outcomes: [],
    organisation: [
      { dt: "Termin", dd: base.dateLabel },
      { dt: "Dauer", dd: base.durationLabel },
      { dt: "Zeiten", dd: ZEITEN_LABEL },
      { dt: "Teilnehmerzahl", dd: base.groupLabel },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Referent", dd: "Erich Grikscheit" },
    ],
    included: [],
    faq: [],
    ...base,
  } as Seminar;
}

export const SEMINARE_PROGRAMM: Seminar[] = [
  knapp({
    slug: "zeit-horizonte",
    title: "Zeit — Horizonte",
    h1: "Zeit — Horizonte",
    subtitle: "Resilienz – Angst – Konflikte",
    lead: "Die ausführliche Seminarbeschreibung finden Sie derzeit im PDF.",
    eyebrow: "Offenes Seminar · 02.–04.09.2026",
    dateLabel: "02.–04.09.2026",
    isOpenDate: true,
    durationLabel: "3 Tage",
    groupLabel: "Kleine Gruppe",
    bereich: "Führung",
    metaTitle: "Seminar Zeit — Horizonte, 02.–04.09.2026 | Karben",
    metaDescription:
      "Dreitägiges Seminar „Zeit — Horizonte“ (Resilienz – Angst – Konflikte) vom 02. bis 04.09.2026 in Karben bei Frankfurt. Die Seminarbeschreibung liegt als PDF vor.",
    audience: [],
    organisation: [
      { dt: "Termin", dd: "02.–04.09.2026" },
      { dt: "Dauer", dd: "3 Tage" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Referent", dd: "Erich Grikscheit" },
    ],
    related: ["konflikte", "freiheit-fuehrung-persoenlichkeit", "erfahrung-im-management"],
    pdfUrl: `${PDF_BASE}2026-09-02_zeit-horizonte.pdf`,
    pdfSize: "PDF, 1,3 MB",
  }),

  {
    slug: "praesentation-rhetorik",
    title: "Die Kunst der Präsentation und Rhetorik",
    h1: "Präsentations- und Rhetorikseminar für Wirtschaft und Verwaltung",
    subtitle: "Für Interessierte in Wirtschaft und Verwaltung",
    lead: "Kann man lernen, eine gute Präsentation zu halten? Ja — wenn Sie Ihr Thema genau kennen und bereit sind, Ihre Gedanken mit Überzeugungskraft klar darzulegen. Drei Tage lang arbeiten wir an Aufbau, Sprache, Körpersprache und dem Umgang mit schwierigen Situationen.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "3 Tage",
    groupLabel: "max. 8 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 575,
    priceNote: MWST_SUFFIX,
    bereich: "Kommunikation",
    metaTitle: "Präsentationstraining mit Rhetorik | 3 Tage, max. 8 Teilnehmer",
    metaDescription:
      "Dreitägiges Seminar zu Präsentation und Rhetorik für Wirtschaft und Verwaltung. Max. 8 Teilnehmer, 575 € zzgl. MwSt., Karben bei Frankfurt. Vorgespräch inklusive.",
    quote: MOLIERE,
    intro: [
      "Je komplexer die wirtschaftlichen Zusammenhänge werden, umso mehr brauchen Menschen den Austausch ihrer Ideen. Konferenzen, Meetings, Workshops und Events wollen dieses Bedürfnis schnell und effektiv befriedigen. Eine Präsentation ist dabei eine besondere Art, Informationsbedarf zu decken — denn das Spezifische einer Präsentation ist die Inszenierung.",
      "Hier sollen Fakten erlebnisstark, Argumente praxisnah und Überzeugungen nutzenorientiert vermittelt werden. Das Handwerkszeug dafür ist in erster Linie Ihre Stimme und Ihr Sprachspiel, dazu visuelle Hilfsmittel und eine angenehme Atmosphäre. Entscheidend bleibt: Sie kennen Ihr Thema und sind nah bei Ihren Zuhörern.",
      "Vor Seminarbeginn werden alle Teilnehmer angerufen und nach ihrem beruflichen Hintergrund befragt. So lassen sich individuelle Wünsche im Seminar berücksichtigen.",
    ],
    programme: [
      {
        n: 1,
        title: "Vorbereitung und Aufbau",
        sub: "Erster Seminartag",
        items: [
          "Kurze Einführung: Begriffsbestimmungen von Präsentation und Rhetorik",
          "Wie bereite ich mich auf meine Präsentation vor? Ideensammlung, Ideenkonzept, Manuskript",
          "Welche Arbeitstechniken kann ich zur Vorbereitung verwenden? Kreativitätstechniken und Präsentationsformate",
          "Wie setze ich bestimmte Stilelemente ein? Zitate, Aphorismen, Gedichte, Sprichwörter, Kommentare",
          "Welche psychologischen Aspekte sind bei einer Präsentation zu beachten?",
        ],
      },
      {
        n: 2,
        title: "Wirkung und Körpersprache",
        sub: "Zweiter Seminartag",
        items: [
          "Wie baue ich Redehemmungen ab?",
          "Was kann meine Präsentation wirkungsvoll unterstützen? Periphere Stimuli, Gruppenübungen, Rollenspiele, Video, Kurzdiagnosen",
          "Welche Bedeutung hat der erste Eindruck bei einer Präsentation?",
          "Welche Rolle spielt die Körpersprache und welche Wirkung hat sie? Gestik, Mimik, Stimme",
          "Welche Dialogtechniken sollte ich beherrschen?",
          "Wie wichtig ist Zuhören? Schweigen, Annehmen, Deuten",
          "Fallbeispiele und Übungen zum zweiten Tag",
        ],
      },
      {
        n: 3,
        title: "Schwierige Situationen und Technik",
        sub: "Dritter Seminartag",
        items: [
          "Wie verhalte ich mich gegenüber schwierigen Teilnehmern? Einwände, Zwischenrufe, Machtkämpfe",
          "Welche Bedeutung hat meine Sprache? Sprachspiel, Sprachunarten, rhetorische Sünden",
          "Zeitmanagement einer Präsentation: Zeiteinteilung, Übergänge, Pausen",
          "Die Rahmenbedingungen einer gelungenen Präsentation: Räume, Bestuhlung, Ausrüstung",
          "Technische Mittel zur Umsetzung: Beamer, Flipchart, Overhead, Mind Mapping",
          "Verschiedene Feedbackformen: Ermutigung, Annahme, Würdigung",
          "Praktische Übungen und Abschlussrunde",
        ],
      },
    ],
    outcomes: [
      "Sie bauen eine Präsentation systematisch auf statt sie zusammenzustellen",
      "Sie kennen Kreativitätstechniken für die Vorbereitung",
      "Sie setzen Stimme, Gestik und Mimik bewusst ein",
      "Sie behalten die Ruhe bei Einwänden, Zwischenrufen und Machtkämpfen",
      "Sie steuern Zeit, Übergänge und Pausen souverän",
      "Sie geben und nehmen Feedback in einer Form, die weiterbringt",
    ],
    audience: [
      "Fach- und Führungskräfte aus Wirtschaft und Verwaltung",
      "Alle, die regelmäßig vor Gruppen präsentieren oder vortragen",
      "Teams, die ihre Präsentationskultur vereinheitlichen wollen",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "3 Tage" },
      { dt: "Zeiten", dd: ZEITEN_LABEL },
      { dt: "Teilnehmerzahl", dd: "max. 8" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `575 € ${MWST_SUFFIX}` },
      { dt: "Referent", dd: "Erich Grikscheit" },
      {
        dt: "Vorbereitung",
        dd: "Vor Seminarbeginn werden alle Teilnehmer angerufen und nach ihrem beruflichen Hintergrund befragt",
      },
      { dt: "Zimmerreservierung", dd: "Übernehmen die Teilnehmer selbst" },
    ],
    included: [
      "Telefonisches Vorgespräch zur Berücksichtigung Ihrer Wünsche",
      "Seminarleitfaden",
      "DVD aus dem Seminargeschehen",
      "Mittagsimbisse",
      "Seminargetränke",
    ],
    faq: [
      {
        q: "Worin unterscheidet sich dieses Seminar vom zweitägigen Präsentationsseminar?",
        a: "Der dritte Tag kommt hinzu: Umgang mit schwierigen Teilnehmern, Sprachunarten und rhetorische Sünden, Zeitmanagement, Technik und Feedbackformen.",
      },
      {
        q: "Werde ich vor der Gruppe sprechen müssen?",
        a: "Ja — an allen drei Tagen gibt es Fallbeispiele und Übungen. Genau darin liegt der Lerneffekt. Die Gruppe ist mit maximal acht Personen bewusst klein gehalten.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "575 € zzgl. gesetzlicher Mehrwertsteuer, inklusive Mittagsimbissen, Seminargetränken, Seminarleitfaden und einer DVD aus dem Seminargeschehen.",
      },
      {
        q: "Kann ich eigene Themen einbringen?",
        a: "Ausdrücklich ja. Vor Seminarbeginn werden Sie angerufen und nach Ihrem beruflichen Hintergrund befragt, damit individuelle Wünsche berücksichtigt werden können.",
      },
    ],
    related: ["praesentation", "rhetorik", "konflikte"],
    pdfUrl: `${PDF_BASE}2019_Praesentation-Rhetorik_oT.pdf`,
  },

  {
    slug: "praesentation",
    title: "Die Kunst der Präsentation",
    h1: "Präsentationstraining: die Kunst der Präsentation in zwei Tagen",
    subtitle: "Zwei Tage für Wirtschaft und Verwaltung",
    lead: "Die kompakte Fassung: zwei Tage, in denen Sie lernen, eine Präsentation zu bauen, die trägt. Vom Ideenkonzept über die Stilelemente bis zur Körpersprache — mit Fallbeispielen und Übungen an beiden Tagen.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "2 Tage",
    groupLabel: "max. 8 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 425,
    priceNote: MWST_SUFFIX,
    bereich: "Kommunikation",
    metaTitle: "Präsentationstraining 2 Tage | Karben bei Frankfurt",
    metaDescription:
      "Zweitägiges Präsentationstraining für Wirtschaft und Verwaltung: Aufbau, Stilelemente, Körpersprache, Dialogtechnik. Max. 8 Teilnehmer, 425 € zzgl. MwSt.",
    quote: MOLIERE,
    intro: [
      "Kann man lernen, eine gute Präsentation zu halten? Ja, das ist möglich — wenn Sie Ihr Thema genau kennen und bereit sind, mit Überzeugungskraft Ihre Gedanken klar und konkret darzulegen. Ein weiterer Grund, weshalb es erlernbar ist: Sie konzentrieren sich auf Ihre Lösung und beschäftigen sich weniger mit den Problemen, die auftreten könnten.",
      "Das Spezifische einer Präsentation ist die Inszenierung. Fakten sollen erlebnisstark, Argumente praxisnah und Überzeugungen nutzenorientiert vermittelt werden. Das Handwerkszeug dafür ist Ihre Stimme und Ihr Sprachspiel, dazu visuelle Hilfsmittel und eine angenehme Atmosphäre.",
      "Vor Seminarbeginn werden alle Teilnehmer angerufen und nach ihrem beruflichen Hintergrund befragt, damit individuelle Wünsche berücksichtigt werden können.",
    ],
    programme: [
      {
        n: 1,
        title: "Vorbereitung und Aufbau",
        sub: "Erster Seminartag",
        items: [
          "Kurze Einführung: Begriffsbestimmungen von Präsentation und Rhetorik",
          "Wie bereite ich mich auf meine Präsentation vor? Ideensammlung, Ideenkonzept, Manuskript",
          "Welche Arbeitstechniken kann ich zur Vorbereitung verwenden? Kreativitätstechniken und Präsentationsformate",
          "Wie setze ich bestimmte Stilelemente ein? Zitate, Aphorismen, Gedichte, Sprichwörter, Kommentare",
          "Welche psychologischen Aspekte sind zu beachten?",
          "Fallbeispiele und Übungen zum ersten Tag",
        ],
      },
      {
        n: 2,
        title: "Wirkung und Dialog",
        sub: "Zweiter Seminartag",
        items: [
          "Wie baue ich Redehemmungen ab?",
          "Was kann meine Präsentation wirkungsvoll unterstützen? Periphere Stimuli, Gruppenübungen, Rollenspiele, Video, Kurzdiagnosen",
          "Welche Bedeutung hat der erste Eindruck?",
          "Welche Rolle spielt die Körpersprache und welche Wirkung hat sie auf die Teilnehmer? Gestik, Mimik, Stimme",
          "Welche Dialogtechniken sollte ich beherrschen?",
          "Fallbeispiele",
        ],
      },
    ],
    outcomes: [
      "Sie entwickeln aus einer Idee ein tragfähiges Präsentationskonzept",
      "Sie kennen Arbeitstechniken für eine schnelle, gute Vorbereitung",
      "Sie bauen Redehemmungen ab",
      "Sie wissen, welche Wirkung Ihre Körpersprache auf die Zuhörer hat",
      "Sie beherrschen Dialogtechniken für den Austausch während der Präsentation",
    ],
    audience: [
      "Fach- und Führungskräfte, die gelegentlich präsentieren",
      "Alle, die einen kompakten Einstieg suchen",
      "Teams mit begrenztem Zeitbudget für Weiterbildung",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "2 Tage" },
      { dt: "Zeiten", dd: ZEITEN_LABEL },
      { dt: "Teilnehmerzahl", dd: "max. 8" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `425 € ${MWST_SUFFIX}` },
      { dt: "Referent", dd: "Erich Grikscheit" },
      { dt: "Hotelreservierung", dd: "Übernimmt der Teilnehmer selbst" },
    ],
    included: [
      "Telefonisches Vorgespräch",
      "Seminarleitfaden",
      "DVD aus dem Seminargeschehen",
      "Seminargetränke",
    ],
    faq: [
      {
        q: "Reichen zwei Tage aus?",
        a: "Für den Aufbau, die Stilelemente und die Grundlagen der Wirkung ja. Wer zusätzlich den Umgang mit schwierigen Teilnehmern, Zeitmanagement und Technik behandeln möchte, bucht das dreitägige Seminar.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "425 € zzgl. gesetzlicher Mehrwertsteuer, inklusive Seminargetränken, Seminarleitfaden und einer DVD aus dem Seminargeschehen.",
      },
      { q: "Wie groß ist die Gruppe?", a: "Maximal acht Teilnehmer." },
      {
        q: "Kann ich das Seminar auch inhouse buchen?",
        a: "Ja. Sprechen Sie mich an — Termin und Ort legen wir gemeinsam fest.",
      },
    ],
    related: ["praesentation-rhetorik", "rhetorik", "erfahrung-im-management"],
    pdfUrl: `${PDF_BASE}2019_Praesentation_oT.pdf`,
  },

  {
    slug: "rhetorik",
    title: "Rhetorik",
    h1: "Rhetorik-Individualtraining für Führungskräfte",
    subtitle: "Individualtraining über 1, 2, 3 oder 6 Tage",
    lead: "Eigene Gedanken in Worte fassen, Überzeugungen darlegen, Ideen begründen — und die Zuhörer zum Nachdenken anregen. Dieses Rhetoriktraining ist bewusst als Einzeltraining angelegt: Die beste Weiterentwicklung gelingt in einer ganz persönlichen Arbeitsatmosphäre.",
    eyebrow: "Individualtraining · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "1, 2, 3 oder 6 Tage",
    zeitenLabel: "ab 08:59 Uhr",
    groupLabel: "Einzeltraining",
    locationLabel: "Seminarort bestimmen Sie",
    priceEur: null,
    priceNote: "Preis auf Anfrage",
    bereich: "Kommunikation",
    metaTitle: "Rhetoriktraining Einzelcoaching | 1–6 Tage, Karben & vor Ort",
    metaDescription:
      "Rhetorik als Individualtraining für Führungskräfte: 1, 2, 3 oder 6 Tage, Seminarort nach Ihrer Wahl, Inhalte nach Vorgespräch. Zertifikat ab dem zweiten Tag.",
    quote: {
      text: "Daher ist es erforderlich, Kunstfertigkeit anzuwenden, ohne dass man es merkt, und die Rede nicht als verfertigt, sondern als natürlich erscheinen zu lassen — dies nämlich macht sie glaubwürdig.",
      source: "Aristoteles",
    },
    intro: [
      "Für Personen in Führungspositionen gehört es zum Alltag, bei jedem Anlass den richtigen Ton zu finden — bei Verhandlungen, bei einer Rede, die aufmuntern soll, oder bei einer Festansprache. Wer auf dem Gebiet des öffentlichen Sprechens Nachholbedarf empfindet, sollte einmal Zeit in die eigenen Darstellungsmöglichkeiten investieren.",
      "Den Seminarort bestimmen Sie. Die inhaltlichen Schwerpunkte legen wir gemeinsam in einem Vorgespräch fest. Zielsetzung: so nah wie möglich an Ihrer Praxis. Grundlagen und Hintergründe der Rhetorik werden besprochen und fließen in die gemeinsame Arbeit ein. Spezielle Übungen unterstützen den Fortschritt, und in den Gesprächen während und nach den Übungen lassen sich ganz individuelle Fragen klären.",
    ],
    durationFilter: [
      { id: "alle", label: "Alle Trainingstage" },
      { id: "2", label: "2-Tages-Training" },
      { id: "3", label: "3-Tages-Training" },
      { id: "6", label: "6-Tages-Training" },
    ],
    programme: [
      {
        n: 1,
        title: "Grundlagen und erste Reden",
        sub: "Tag 1",
        groups: ["2", "3", "6"],
        items: [
          "Die erste Rede vorbereiten und präsentieren",
          "Blickwinkel erkennen und zum Ausdruck bringen",
          "Das ABC des Betonens",
          "Der erfolgreiche 9-Punkte-Vortrag",
          "Eine zweite Rede vorbereiten und durchführen",
          "Verschiedene Kurzvorträge halten",
          "Zum Abschluss: kurze Zusammenfassung und persönliche Analyse",
        ],
        merke: {
          source: "Sprichwort aus China",
          text: "Sag du's mir, so vergesse ich es. Zeigst du's mir, so merke ich es mir. Lässt du mich teilhaben, so verstehe ich es.",
        },
      },
      {
        n: 2,
        title: "Überzeugen und visualisieren",
        sub: "Tag 2",
        groups: ["2", "3", "6"],
        items: [
          "Eine Überzeugungsrede vorbereiten und halten",
          "Visualisierungstechniken für einen Vortrag",
          "Perspektiven, Bezugsrahmen und Muster zur Darstellung eines Vortrages",
          "Einen motivierenden Vortrag vorbereiten — mit Thema aus Ihrer beruflichen Praxis",
          "Aktivieren eines Themas, Vortrages oder Präsentationskonzeptes",
          "Zum Abschluss: Zusammenfassung, Analyse und Zertifikat",
        ],
        merke: {
          source: "Cicero",
          text: "Der gute Redner wird Vergleiche anwenden und Beispiele vorbringen.",
        },
      },
      {
        n: 3,
        title: "Körpersprache, Humor, Schlagfertigkeit",
        sub: "Tag 3",
        groups: ["3", "6"],
        items: [
          "Die Bedeutung der Körpersprache für den Vortragenden (Teil 1)",
          "Präsentation einer ausdrucksstarken und lebendigen Rede zu einem Thema aus Ihrem Umfeld",
          "Humor in der Rede",
          "Schlagfertigkeit in Stegreifreden",
          "Kurzreden zum Thema Humor und Schlagfertigkeit",
          "Vortrag und Moderation",
          "Zum Abschluss: Zusammenfassung, Analyse und Zertifikat",
        ],
        merke: {
          source: "Cicero",
          text: "Ein kluger Mensch wird genau bemerken, wie lange seine Rede dem anderen Vergnügen macht — und so wie er nicht ohne eine vernünftige Ursache angefangen hat zu reden, so wird er auch das Ziel wissen, wo er aufhören soll.",
        },
      },
      {
        n: 4,
        title: "Hermeneutik, Dialektik, Debatte",
        sub: "Tag 4",
        groups: ["6"],
        items: [
          "Die Bedeutung der Körpersprache für den Vortragenden (Teil 2)",
          "Was wir von Casanova lernen können",
          "Begriffsfindung zum Hintergrund der Rhetorik: Hermeneutik, Dialektik, Debattieren",
          "Bedeutende Reden kennenlernen — Videobetrachtungen und Analysen für die praktische Arbeit",
          "Rede mit methodischem Vorgehen",
          "Abschlussgespräch mit neuer Aufgabenstellung",
        ],
        merke: {
          source: "Cicero",
          text: "Der vollkommene Redner wird durch rhetorische Fragen seinem Standpunkt Nachdruck verleihen; er wird sich selbst sozusagen wie auf gestellte Fragen antworten.",
        },
      },
      {
        n: 5,
        title: "Gefühle, Stilistik, Lampenfieber",
        sub: "Tag 5",
        groups: ["6"],
        items: [
          "Formen der Rede und Redewendungen kennenlernen",
          "Die Rede, die unter die Haut geht — Umgang mit Gefühlen",
          "Bedeutung von Monolog und Dialog in der Rede",
          "Stilistik in der Rhetorik (Teil 1)",
          "Die Überzeugungsrede",
          "Die Kunst des kreativen Sprachgebrauchs",
          "Lampenfieber und Redehemmungen",
          "Abschlussgespräch mit neuer Aufgabenstellung",
        ],
        merke: {
          source: "Albert Einstein",
          text: "Persönlichkeiten werden nicht durch schöne Reden geformt, sondern durch Arbeit und eigene Leistung.",
        },
      },
      {
        n: 6,
        title: "Argumentation und Abschluss",
        sub: "Tag 6",
        groups: ["6"],
        items: [
          "Bedeutung verschiedener Redefunktionen",
          "Weitere Einsatzmöglichkeiten rhetorischer Mittel",
          "Erfolgreich argumentieren",
          "Das Referat — ein praktisches Beispiel",
          "Zur Stilistik der Rhetorik (Teil 2)",
          "Abschlussarbeit vor kleinem Zuhörerkreis präsentieren",
          "Abschlussgespräch mit Übergabe des Zertifikates",
        ],
        merke: {
          source: "Kurt Tucholsky",
          text: "Wer auf andere Leute wirken will, der muss erst einmal in ihrer Sprache mit ihnen reden.",
        },
      },
    ],
    background: {
      heading: "Fragen, die im Training geklärt werden",
      ordered: true,
      body: [
        "Wie bereite ich mich auf eine Rede oder einen Vortrag konkret vor? Welche Arbeitstechniken kann ich zur Vorbereitung verwenden?",
        "Wie setze ich bestimmte Stilelemente ein — Zitate, Aphorismen, Fabeln, Gedichte, Sprichwörter, Kommentare, Auswertungen, Bilder?",
        "Welche psychologischen Gesichtspunkte gilt es zu berücksichtigen? Wie kann ich Redehemmungen abbauen?",
        "Welche Rolle spielt die Körpersprache und wie setze ich sie ein? Welche Bedeutung hat die Sprache, und wie aktiviere ich meinen Wortschatz?",
      ],
    },
    outcomes: [
      "Sie bereiten eine Rede systematisch vor, statt sie zu improvisieren",
      "Sie beherrschen das ABC des Betonens und den 9-Punkte-Vortrag",
      "Sie setzen Stilelemente gezielt ein — Zitate, Bilder, Vergleiche",
      "Sie bauen Redehemmungen und Lampenfieber messbar ab",
      "Sie nutzen Körpersprache bewusst statt zufällig",
      "Ab dem zweiten Trainingstag erhalten Sie ein Zertifikat",
    ],
    audience: [
      "Führungskräfte, die regelmäßig vor Gruppen sprechen",
      "Fach- und Führungskräfte mit Nachholbedarf beim öffentlichen Sprechen",
      "Alle, die lieber allein arbeiten als in der Gruppe zu üben",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "1, 2, 3 oder 6 Tage" },
      { dt: "Zeiten", dd: "ab 08:59 Uhr" },
      { dt: "Teilnehmerzahl", dd: "Einzeltraining" },
      { dt: "Seminarort", dd: "Den Seminarort bestimmen Sie" },
      { dt: "Teilnahmegebühr", dd: "Auf Anfrage — abhängig von Dauer und Ort" },
      { dt: "Format", dd: "Individualtraining, Sie arbeiten allein mit dem Trainer" },
      {
        dt: "Einstieg",
        dd: "Zum Einstieg kann nach Wunsch ein 1- oder 2-Tages-Training gebucht werden",
      },
    ],
    included: [
      "Vorgespräch zur Festlegung der Schwerpunkte",
      "Seminarort nach Ihrer Wahl",
      "Individuelle Übungen mit persönlicher Analyse",
      "Zertifikat ab dem zweiten Trainingstag",
    ],
    faq: [
      {
        q: "Warum ist das ein Einzeltraining und kein Gruppenseminar?",
        a: "Weil die Erfahrung zeigt, dass die beste Weiterentwicklung in einer ganz persönlichen Arbeitsatmosphäre gelingt. Die Verluste zwischen Zeitaufwand und Ertrag sind so am geringsten.",
      },
      {
        q: "Wie viele Tage soll ich buchen?",
        a: "Zum Einstieg genügt ein 1- oder 2-Tages-Training. Das 3-Tages-Training vertieft Körpersprache, Humor und Schlagfertigkeit; das 6-Tages-Training führt bis zur Stilistik und zur Abschlussarbeit vor Publikum.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Den Seminarort bestimmen Sie — in Ihrem Unternehmen oder in Karben.",
      },
      {
        q: "Was kostet das Training?",
        a: "Das hängt von Dauer und Ort ab. Termine, Preise und Seminarort erfahren Sie auf Anfrage.",
      },
      { q: "Bekomme ich ein Zertifikat?", a: "Ja, ab dem Abschluss des zweiten Trainingstages." },
    ],
    related: ["praesentation-rhetorik", "praesentation", "konflikte"],
    pdfUrl: `${PDF_BASE}2019_Rhetorik-mit-Tabelle_oT.pdf`,
  },

  {
    slug: "unternehmensethik",
    title: "Praktische Unternehmensethik",
    h1: "Seminar praktische Unternehmensethik für Führungskräfte",
    subtitle: "Für Führungskräfte in Wirtschaft und Verwaltung",
    lead: "Wie wollen wir leben? Was wollen wir erreichen? Zwei scheinbar einfache Fragen — auf die es keine schnellen Antworten gibt. Das Seminar macht aus dem Modewort Unternehmensethik ein Arbeitsinstrument für Führungskräfte, mit drei Referenten aus Soziologie, Psychologie und Praxis.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "Mehrtägig",
    groupLabel: "max. 8 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 575,
    priceNote: MWST_SUFFIX,
    bereich: "Führung",
    metaTitle: "Unternehmensethik-Seminar für Führungskräfte | Karben",
    metaDescription:
      "Seminar zu praktischer Unternehmensethik: Werte, Führungsleitlinien, Teamentwicklung. Drei Referenten, max. 8 Teilnehmer, 575 € zzgl. MwSt., Karben bei Frankfurt.",
    quote: {
      text: "Abseits vom Markte und Ruhme begibt sich alles Große; abseits vom Markte und Ruhme wohnten von je die Erfinder neuer Werte.",
      source: "Friedrich Nietzsche (1844–1900)",
    },
    intro: [
      "Die Wertmaßstäbe für gutes und faires Handeln stehen auf dem Prüfstand. In vielen Unternehmen wird plötzlich über Unternehmensethik nachgedacht. Was ist das Besondere daran? Erstens: Ethisches Handeln heißt, Wertmaßstäbe für unterschiedliche Willensbildungsprozesse zu finden. Zweitens: Führungskräfte müssen ihre Verantwortung für Mitarbeiter unter dem Gesichtspunkt gesellschaftlicher Veränderungen neu definieren.",
      "Konkret werden neue soziale Formen des Miteinanders gewünscht — Klimabildung in Teams, Diskussionen über richtiges moralisches Verhalten, ethisches Handeln ohne Rechtfertigungstendenzen. Für die Unternehmensführung bedeutet das: neue Organisationsstrukturen, neue Formen der Kommunikation, neue Zielperspektiven. Das drückt sich in Führungsleitlinien, Produktentwicklungen und Kundenbeziehungen aus.",
      "Für Führungskräfte geht es vor allem darum, die Nachhaltigkeit von Handlungen und Entscheidungen einschätzen zu lernen — und Bereitschaft für permanentes Veränderungsmanagement mitzubringen.",
    ],
    programme: [
      {
        n: 1,
        title: "Begriff und Hintergrund",
        sub: "Kleine Streifzüge in Ethik und Moral",
        items: [
          "Ethik und Begriffsklärung",
          "Philosophische Hintergründe der Ethik",
          "Werte-, Ethik- und Nachhaltigkeitsmanagement",
          "Wertehierarchien und Zweckbildungen",
          "Bedürfnisse, Lebensstile und Menschenbild",
        ],
        merke: {
          source: "Dr. Fritz P. Rinnhofer",
          text: "In der heutigen Verschleißgesellschaft werden auch die moralischen Werte verschlissen.",
        },
      },
      {
        n: 2,
        title: "Ethik und Führung",
        sub: "Leitlinien und Orientierung",
        items: [
          "Unternehmensethik und Führung: Zielfindungen und Leitlinien zur inneren und äußeren Orientierung",
          "Führungsethik, zum Beispiel Empowerment",
          "Motivationsstrategien und Veränderungsmanagement",
          "Wertevermittlung: Gerechtigkeit und Ungerechtigkeit, Gleichheit und Ungleichheit",
          "Informale Ordnungen: Gebote und Verbote",
          "Formale Ordnungen: Regeln, Normen, Prinzipien, Atmosphären",
        ],
      },
      {
        n: 3,
        title: "Unternehmenskommunikation",
        sub: "Ethik als Transportmittel",
        items: [
          "Was bedeutet ethisches Handeln für den Einzelnen?",
          "Welche Normen, Regeln oder Prinzipien leiten unsere Zusammenarbeit?",
          "Wie handeln Führungskräfte im Team?",
          "Welche Strategien entwickeln Teams in Willensbildung und Wahrheitsfindung?",
          "Wahrheit und Wahrhaftigkeit, Realität, Idealisierungen",
          "Sprache und Gefühle in Verbindung mit ethischem Handeln",
        ],
      },
      {
        n: 4,
        title: "Teamentwicklung",
        sub: "Der längste Teil des Seminars",
        items: [
          "Verantwortung und Pflichtgefühl",
          "Gerechtigkeit und Ungerechtigkeit",
          "Bewertungskriterien bei Entscheidungen",
          "Richtiges Handeln im Sinne von Realitätsnähe oder Idealisierung",
          "Wie erkennen wir, dass wir etwas richtig machen?",
          "Ethik des Geldes und Erfolges, Nützlichkeitsprinzipien",
          "Die äußeren Anzeichen eines Teams: Zielvereinbarungen, Teamatmosphäre",
          "Neue Wege und Strategien zur Teamentwicklung",
          "Praktische Übungen an Fallbeispielen",
        ],
        merke: {
          source: "Walter Ludin",
          text: "Es sind immer die andern, die sich ändern müssen.",
        },
      },
    ],
    background: {
      heading: "Die Leitfrage des Seminars",
      body: [
        "Wie können wir das gesamte Team erfolgreich weiterentwickeln? An praktischen Beispielen in Form von Diskussionen, Gruppenübungen und Einzelpräsentationen soll praktisches und ethisches Handeln verstärkt werden.",
        "Das Seminar soll einen Beitrag zur Gemeinschaftsbildung leisten und das Bewusstsein für Empfindlichkeiten schärfen — damit ein Menschenbild voller Respekt, Fairness und freier Willensbildung entstehen kann.",
      ],
    },
    outcomes: [
      "Sie können Unternehmensethik von Wohlfühlrhetorik unterscheiden",
      "Sie kennen die philosophischen Grundlagen hinter heutigen Wertedebatten",
      "Sie formulieren Führungsleitlinien, die im Alltag tragen",
      "Sie erkennen den Unterschied zwischen Anspruch und Wirklichkeit im eigenen Haus",
      "Sie haben konkrete Strategien zur Teamentwicklung erarbeitet",
    ],
    audience: [
      "Führungskräfte in Wirtschaft und Verwaltung",
      "Geschäftsführungen, die Führungsleitlinien erarbeiten oder überarbeiten",
      "Teams, die an ihrer Zusammenarbeit grundsätzlich arbeiten wollen",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "Mehrtägig" },
      { dt: "Zeiten", dd: ZEITEN_LABEL },
      { dt: "Teilnehmerzahl", dd: "max. 8" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `575 € ${MWST_SUFFIX}` },
      {
        dt: "Referenten",
        dd: "Dipl.-Soziologin Maren Siepmann, Erich Grikscheit und Dipl.-Psychologe Florian Grikscheit",
      },
      { dt: "Zeitplanung", dd: "Erhalten Sie bei Anmeldung zu diesem Seminar" },
      { dt: "Zimmerreservierung", dd: "Organisiert der Teilnehmer selbst" },
    ],
    included: [
      "Seminarleitfaden",
      "DVD aus dem Seminargeschehen",
      "Mittagsimbisse",
      "Seminargetränke",
      "Drei Referenten aus Soziologie, Psychologie und Praxis",
    ],
    faq: [
      {
        q: "Wer sind die Referenten?",
        a: "Drei: Dipl.-Soziologin Maren Siepmann, Erich Grikscheit und Dipl.-Psychologe Florian Grikscheit. Damit kommen soziologische, psychologische und praktische Perspektive zusammen.",
      },
      {
        q: "Ist das ein theoretisches Seminar?",
        a: "Nein. Dem letzten Teil — der Teamentwicklung — ist die meiste Zeit gewidmet, und gearbeitet wird an Fallbeispielen, in Diskussionen, Gruppenübungen und Einzelpräsentationen.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "575 € zzgl. gesetzlicher Mehrwertsteuer, inklusive Mittagsimbissen, Seminargetränken, Seminarleitfaden und einer DVD aus dem Seminargeschehen.",
      },
      {
        q: "Eignet sich das Seminar als Inhouse-Format?",
        a: "Besonders gut. Führungsleitlinien und Teamentwicklung lassen sich am besten mit dem tatsächlichen Team erarbeiten. Sprechen Sie mich an.",
      },
    ],
    related: ["konflikte", "freiheit-fuehrung-persoenlichkeit", "erfahrung-im-management"],
    pdfUrl: `${PDF_BASE}2019_Unternehmensethik_oT.pdf`,
  },

  {
    slug: "konflikte",
    title: "Kontroversen, Kritik, Krisen und Konflikte",
    h1: "Konflikttraining für Führungskräfte: Kontroversen, Kritik, Krisen und Konflikte",
    subtitle: "Die vier K erfolgreich bewältigen",
    lead: "Die vier K — Konflikte, Krisen, Kontroversen und Kritik — sorgen in Unternehmen und Verwaltungen für ständige Veränderung. Einerseits schaffen sie kreative Räume, andererseits führen sie zu psychischen Belastungen. Drei Tage lang arbeiten wir daran, mit ihnen ein offenes und freundschaftliches Klima zu schaffen statt eines belasteten.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "3 Tage",
    zeitenLabel: "08:59 – 17:29 Uhr",
    groupLabel: "max. 8 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 575,
    priceNote: MWST_SUFFIX,
    bereich: "Führung",
    metaTitle: "Konflikttraining für Führungskräfte | 3 Tage, Karben",
    metaDescription:
      "Die vier K — Konflikte, Krisen, Kontroversen, Kritik. Dreitägiges Seminar mit Fachvortrag zu Depression und Burnout. Max. 8 Teilnehmer, 575 € zzgl. MwSt.",
    quote: {
      text: "Kritik ist ein Regenschirm, den man bei Sonnenschein leicht bekommt, aber beim ersten Regentropfen zurückgeben muss.",
      source: "Lord Chesterfield (1694–1773)",
    },
    intro: [
      "Häufig ist der Ausgangspunkt der vier K mit Streit und Auseinandersetzung verbunden. In erster Linie sind es unterschiedliche Meinungen, die dorthin führen. Bevor wir an Methoden arbeiten, klären wir deshalb das Wesen jedes einzelnen K — denn ein Konflikt verlangt eine andere Antwort als eine Krise, und Kritik etwas anderes als eine Kontroverse.",
      "Das Seminar verbindet philosophische Betrachtung mit gründlicher praktischer Übung. Am Nachmittag des ersten Tages hält Dipl.-Psychologe Florian Grikscheit einen Vortrag mit gemeinsamer Diskussion über Krankheitssymptome wie Depression und Burnout — Grundlagen, damit Führungskräfte ein tieferes Verständnis für seelische Nöte in der Berufswelt entwickeln.",
    ],
    programme: [
      {
        n: 1,
        title: "Konflikte verstehen und lösen",
        sub: "Grundlagen",
        items: [
          "Was sind Konflikte, und wie gehen Sie im Alltag damit um?",
          "Wie erkennen und lösen Sie Konflikte — welche Methoden gibt es?",
          "Welche Methoden und Möglichkeiten der Veränderung gibt es?",
          "Welche Persönlichkeitstypen neigen besonders stark zu den vier K?",
          "Kennenlernen der verschiedenen Eskalationsstufen bei Konflikten",
        ],
        merke: {
          source: "Johann Wolfgang von Goethe, West-östlicher Diwan",
          text: "Das eigentliche, einzige und tiefste Thema der Welt- und Menschengeschichte, dem alle übrigen untergeordnet sind, bleibt der Konflikt des Glaubens und Unglaubens.",
        },
      },
      {
        n: 2,
        title: "Krisen als Ressource",
        sub: "Wenn Erwartungen unerfüllt bleiben",
        items: [
          "Was ist eine Krise und wie schöpft man daraus neue Ressourcen?",
          "Welche Formen von Krisen spielen im Berufsleben eine wichtige Rolle?",
          "Der erste Eindruck und seine Bedeutung für die Bewertung von Konflikten, Krisen und Kontroversen",
          "Der Beruf und seine Bedeutung bei Krisen oder Konflikten",
        ],
        merke: {
          source: "Aus dem Seminarmaterial",
          text: "Jede Krise ist auch eine Chance. Die Chance besteht darin, die gemachten Fehler zu erkennen und sie nicht zu wiederholen.",
        },
      },
      {
        n: 3,
        title: "Kritik und Gesprächsführung",
        sub: "Vom Zerreden zur konstruktiven Form",
        items: [
          "Wie finden Sie nützliche Strategien zur Bewältigung von Konflikten, Krisen und Kontroversen?",
          "Umgang mit Krisen, Kritik, Kontroversen und Konflikten in der Mitarbeiterführung",
          "Erfolgreiches Feedback, wenn Kontroversen die Zusammenarbeit beeinträchtigen",
          "Psychologische Grundlagen der Gesprächsführung",
          "Sprache als Manipulationsmittel bei Kontroversen, Kritikgesprächen und Konflikten",
          "Gründliche praktische Übungen und intensive Analysen",
        ],
        merke: {
          source: "Aus dem Seminarmaterial",
          text: "Aus unserer Kritikfähigkeit wird Kleinheit und Mittelmaß, wenn wir die Gedanken anderer zerreden, verzerren, überinterpretieren, problematisieren oder entwerten.",
        },
      },
      {
        n: 4,
        title: "Fachvortrag Depression und Burnout",
        sub: "Erster Seminartag, Nachmittag",
        items: [
          "Vortrag von Dipl.-Psychologe Florian Grikscheit",
          "Gemeinsame Diskussion über verschiedene Krankheitssymptome",
          "Grundlagen für Führungskräfte, um seelische Nöte in der Berufswelt zu erkennen",
        ],
      },
    ],
    background: {
      heading: "Wie ein Konflikt entsteht — fünf Punkte",
      ordered: true,
      body: [
        "Er entsteht aus der inneren Bereitschaft, um die Erfüllung der eigenen Vorstellungen zu kämpfen — oder gegen fremde Ideen, sofern sie den eigenen widersprechen. Die Reaktion ist dann Abwehr oder Protest.",
        "Er entsteht aus unterschiedlichen perspektivischen Wahrnehmungen, vor allem im sozialen Umfeld.",
        "Er entsteht als Versuch, eine Situation auszugleichen. Menschen im Berufsleben möchten nicht unentwegt in Schwierigkeiten stecken.",
        "In der Regel handelt es sich um Beziehungsstörungen — bei einem einzelnen Menschen oder bei einer ganzen Gruppe.",
        "Er wirkt auf viele Menschen als Bedrohung, weil er den eigenen Platz in der Gemeinschaft gefährdet.",
      ],
    },
    background2: {
      heading: "Was eine Kontroverse von einem Konflikt unterscheidet",
      body: [
        "Was wird nicht alles zu Streitpunkten erhoben — und wie oft wird dabei die Sachebene verlassen, bis Emotion über das Rationale siegt. Kontroversen werden meistens geführt, damit intellektuelle Fähigkeiten demonstrativ zur Schau gestellt werden. Aus dem Kollegen wird plötzlich der Gegner.",
        "Im Seminar probieren wir aus, wie man die Hintergründe des Argumentierens sowie den Umgang mit Rechtfertigungen und Verteidigungsstrategien kennenlernt — und wie man im alltäglichen Umgang eine sanftere Art der Kommunikation erlernt.",
        "Manchmal hat ein geistiger Wettstreit ausgesprochen positive Eigenschaften. Kommt allerdings Aggression ins Spiel, führt der Disput schnell zu Verletzungen.",
      ],
    },
    outcomes: [
      "Sie unterscheiden sicher zwischen Konflikt, Krise, Kontroverse und Kritik",
      "Sie kennen die Eskalationsstufen und erkennen, an welcher Stufe Sie gerade stehen",
      "Sie führen Kritikgespräche, die etwas verändern statt zu verletzen",
      "Sie erkennen früh, welche Persönlichkeitstypen zu welchen Reaktionen neigen",
      "Sie verstehen die Grundzüge von Depression und Burnout im beruflichen Kontext",
      "Sie haben praktische Übungen und Analysen aus echten Fällen durchlaufen",
    ],
    audience: [
      "Führungskräfte in Wirtschaft und Verwaltung mit Personalverantwortung",
      "Teamleitungen, die wiederkehrende Reibungen auflösen wollen",
      "Personalentwicklung und Betriebsrat, die Konfliktkompetenz im Haus aufbauen",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "3 Tage" },
      { dt: "Zeiten", dd: "08:59 – 17:29 Uhr" },
      { dt: "Teilnehmerzahl", dd: "max. 8" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `575 € ${MWST_SUFFIX}` },
      { dt: "Referenten", dd: "Erich Grikscheit sowie Dipl.-Psychologe Florian Grikscheit" },
      { dt: "Übernachtung", dd: "Organisiert der Teilnehmer selbst" },
    ],
    included: [
      "Seminarleitfaden",
      "DVD aus dem Seminargeschehen",
      "Mittagsimbisse",
      "Seminargetränke",
      "Fachvortrag von Dipl.-Psychologe Florian Grikscheit",
    ],
    faq: [
      {
        q: "Was sind die vier K?",
        a: "Konflikte, Krisen, Kontroversen und Kritik. Jedes davon verlangt eine andere Antwort — deshalb klären wir zuerst das Wesen jedes einzelnen, bevor wir an Methoden arbeiten.",
      },
      {
        q: "Für wen ist das Seminar gedacht?",
        a: "Für Führungskräfte in Wirtschaft und Verwaltung, die regelmäßig mit Reibungen im Team zu tun haben. Vorkenntnisse sind nicht nötig, Berufserfahrung schon.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "575 € zzgl. gesetzlicher Mehrwertsteuer. Enthalten sind Mittagsimbisse, Seminargetränke, ein Seminarleitfaden und eine DVD aus dem Seminargeschehen.",
      },
      {
        q: "Wann findet das Seminar statt?",
        a: "Der Termin wird nach Absprache festgelegt — als offenes Seminar in Karben oder als Inhouse-Format in Ihrem Unternehmen. Sprechen Sie mich an.",
      },
      {
        q: "Was hat es mit dem Vortrag zu Depression und Burnout auf sich?",
        a: "Am Nachmittag des ersten Seminartages hält Dipl.-Psychologe Florian Grikscheit einen Vortrag mit anschließender Diskussion. Für Führungskräfte sind das Grundlagen, um seelische Nöte in der Berufswelt früher zu erkennen.",
      },
    ],
    related: ["freiheit-fuehrung-persoenlichkeit", "unternehmensethik", "zeit-horizonte"],
    pdfUrl: `${PDF_BASE}2019_Konflikte_oT.pdf`,
  },

  {
    slug: "freiheit-fuehrung-persoenlichkeit",
    title: "Freiheit — Führung — Persönlichkeit",
    h1: "Seminar Freiheit, Führung und Persönlichkeit",
    subtitle: "Drei Tage für Interessierte in Wirtschaft und Verwaltung",
    lead: "Freiheit ist ein Wort, das wir täglich unreflektiert benutzen. Drei Tage lang tun wir nichts anderes, als es zu durchdringen — und zwar dort, wo es im Berufsleben zählt: bei Verantwortung, Hierarchie und Führung. Die kleinste Runde im ganzen Programm: maximal fünf Teilnehmer.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "3 Tage",
    zeitenLabel: "08:59 – 15:59 Uhr",
    groupLabel: "max. 5 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 550,
    priceNote: MWST_SUFFIX,
    bereich: "Führung",
    metaTitle: "Seminar Freiheit, Führung, Persönlichkeit | 3 Tage, max. 5",
    metaDescription:
      "Dreitägiges Seminar über Freiheit, Verantwortung und Führungspersönlichkeit. Kleinste Runde im Programm: max. 5 Teilnehmer, 550 € zzgl. MwSt., Karben.",
    quote: {
      text: "Der verdient sich Freiheit wie das Leben, der täglich sie erobern muss.",
      source: "Johann Wolfgang von Goethe",
    },
    intro: [
      "Den Begriff Freiheit verbinden wir mit Freidenken, Freizügigkeit, sich verwirklichen, eigene Maßstäbe setzen, selbstständig arbeiten, die eigene Meinung sagen, die freie Wahl haben. Doch wann stellen wir uns die Frage, was Freiheit genau heißt — und was sie für das eigene Leben bedeutet?",
      "Arthur Schopenhauer hat es in seinen Aphorismen zur Lebensweisheit auf den Punkt gebracht: Von dem, was einer hat, von dem, was einer ist, und von dem, was einer vorstellt — das sind die ausschlaggebenden Lebensfelder für ein freiheitliches Leben. Er glaubt, dass der Einzelne erst dann zur Persönlichkeit heranwächst, wenn das Leben als Ganzes wohlgefällig und ausgewogen verläuft. Freiheit ist demnach Arbeit an sich selbst.",
      "Besonderes Augenmerk legen wir auf die Zusammenhänge zwischen Beruf, Verantwortung, Hierarchie und Führung. Und wir widmen uns der negativen Freiheit: jenen Einflüssen, die unser Leben unter Zwang, Ärger oder Enttäuschung daran hindern, Kreativität zu entwickeln.",
    ],
    programme: [
      {
        n: 1,
        title: "Was Freiheit ist",
        sub: "Begriff und Geschichte",
        items: [
          "Was ist Freiheit und was bedeutet sie für mein Leben?",
          "Kurzer Abriss zur Geschichte der Freiheit",
          "Freiheit der persönlichen Wahl",
        ],
        merke: {
          source: "Immanuel Kant",
          text: "Zur inneren Freiheit aber werden zwei Stücke erfordert: seiner selbst in einem gegebenen Fall Meister und über sich selbst Herr zu sein.",
        },
      },
      {
        n: 2,
        title: "Was Freiheit einschränkt",
        sub: "Druck, Zwang, Selbstbegrenzung",
        items: [
          "Wodurch und womit setzen wir uns unter Druck?",
          "Wer oder was schränkt unsere Freiheit ein?",
          "Was bedeutet negative Freiheit?",
          "Unfreiheit oder die Flucht vor sich selbst",
          "Wie gehe ich mit meiner Zeit um?",
        ],
        merke: {
          source: "Pavel Kosorin",
          text: "Unsere Freiheit ist nicht durch die Regeln der äußerlichen Welt begrenzt, wohl aber durch die Regellosigkeit unserer eigenen inneren Welt.",
        },
      },
      {
        n: 3,
        title: "Freiheit und Persönlichkeit",
        sub: "Verwirklichung und Kontrolle",
        items: [
          "Was bedeutet es im Sinne der Freiheit, sich selbst zu verwirklichen?",
          "Freiheit und Authentizität",
          "Freiheit und Selbstkontrolle",
          "Freiheit und Persönlichkeit",
        ],
        merke: {
          source: "Christian Friedrich Hebbel",
          text: "Die sogenannte Freiheit des Menschen läuft darauf hinaus, dass er seine Abhängigkeit von den allgemeinen Gesetzen nicht kennt.",
        },
      },
      {
        n: 4,
        title: "Freiheit in der Führungsarbeit",
        sub: "Arbeit, Verantwortung, Hierarchie",
        items: ["Arbeit und Führung", "Gemeinsame Präsentationen, Diskussionen und Gruppenübungen"],
      },
    ],
    background: {
      heading: "Warum die Runde so klein ist",
      body: [
        "In einem kleinen Kreis von Gleichgesinnten gestalten wir die gemeinsame Zeit, indem wir uns aufmerksam den Gedanken der Mitstreiterinnen und Mitstreiter öffnen. Bei maximal fünf Teilnehmern kommt jeder wirklich zu Wort — und drei Tage reichen, um in die Tiefe zu gehen.",
        "Manche geistige Einlassung aus Psychologie und Philosophie, verbunden mit den Erlebnissen unserer Alltagserfahrung, ergibt genau die Mischung, um im Begriff der Freiheit neue schöpferische Kraft zu finden.",
      ],
    },
    outcomes: [
      "Sie haben einen eigenen, tragfähigen Begriff von Freiheit erarbeitet",
      "Sie erkennen, wodurch Sie sich selbst unter Druck setzen",
      "Sie verstehen den Zusammenhang von Freiheit, Verantwortung und Hierarchie",
      "Sie wissen, was negative Freiheit in Ihrem Alltag konkret bedeutet",
      "Sie nehmen einen Seminarleitfaden von rund 60 Seiten mit",
    ],
    audience: [
      "Führungskräfte, die ihre Rolle grundsätzlicher verstehen wollen",
      "Menschen an einem beruflichen Wendepunkt",
      "Alle, die philosophische Arbeit an sich selbst einem Methodentraining vorziehen",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "3 Tage" },
      { dt: "Zeiten", dd: "08:59 – 15:59 Uhr" },
      { dt: "Teilnehmerzahl", dd: "max. 5" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `550 € ${MWST_SUFFIX}` },
      {
        dt: "Gruppengröße",
        dd: "Maximal fünf Teilnehmer, die kleinste Runde im gesamten Programm",
      },
      { dt: "Übernachtung", dd: "Organisiert der Teilnehmer selbst" },
    ],
    included: [
      "Seminarleitfaden mit ca. 60 Seiten",
      "DVD aus dem Seminargeschehen",
      "Seminargetränke",
    ],
    voices: [
      {
        quote:
          "Erst wenn man sich drei Tage reserviert, um über nichts anderes zu sprechen — und wann macht man je so etwas — dann erst erschließt sich einem annähernd die tiefere Bedeutung dieses Begriffes für unser ganzes Leben. Immer wieder ziehen die Diskussionen der angenehm überschaubaren Teilnehmer-Runde bewegende Gedankenschweife nach sich, die noch lange nach dem Seminar nicht enden wollen.",
        name: "Markus K.",
        role: "Mehrfacher Teilnehmer",
      },
      {
        quote:
          "Mein heutiges Verständnis für den Begriff Freiheit ist deutlich breiter als es vor dem Seminar der Fall war. Die Tiefe, mit der wir drei Tage lang in den Begriff eingetaucht sind, hätte ich rückblickend so nie erfahren. Gerade bezogen auf meine tägliche Führungsarbeit ist dieses Wissen sehr wichtig.",
        name: "Rene S.",
        role: "Führungskraft",
      },
      {
        quote:
          "Im positiven Sinne anstrengend durch die Auseinandersetzung mit sich selbst, horizonterweiternd durch gänzlich neue Betrachtungsweisen und impulsgebend zur weiteren Beschäftigung mit Themen dieser Art. Ich werde beim nächsten Mal auf jeden Fall wieder dabei sein und kann die Teilnahme nur weiterempfehlen.",
        name: "Maria K.",
        role: "Business-Coaching-Klientin",
      },
    ],
    faq: [
      {
        q: "Warum nur fünf Teilnehmer?",
        a: "Weil das Seminar vom Gespräch lebt. Bei mehr als fünf Personen kommt nicht jeder in drei Tagen ausreichend zu Wort.",
      },
      {
        q: "Brauche ich philosophische Vorkenntnisse?",
        a: "Nein. Gearbeitet wird an Ihren eigenen Erfahrungen; die philosophischen Bezüge bringe ich mit.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "550 € zzgl. gesetzlicher Mehrwertsteuer, inklusive Seminargetränken, einem Seminarleitfaden von rund 60 Seiten und einer DVD aus dem Seminargeschehen.",
      },
      {
        q: "Wie sind die Seminarzeiten?",
        a: "Das Seminar beginnt um 08:59 Uhr und endet am letzten Tag um 15:59 Uhr.",
      },
    ],
    related: ["konflikte", "unternehmensethik", "erfahrung-im-management"],
    pdfUrl: `${PDF_BASE}2019_Freiheit_oT.pdf`,
  },

  {
    slug: "erfahrung-im-management",
    title: "Die Bedeutung der Erfahrungen im Management",
    h1: "Seminar: die Bedeutung der Erfahrungen im Management",
    subtitle: "Drei Tage über einen Begriff, den alle benutzen",
    lead: "Haben Sie schon einmal ein Seminar besucht mit dem Thema: Was bedeutet Erfahrung? Drei Tage lang gehen wir einem Begriff auf den Grund, der im Management ständig als Argument dient — und selten hinterfragt wird.",
    eyebrow: "Seminar · Termin nach Absprache",
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    durationLabel: "3 Tage",
    zeitenLabel: "08:59 – 15:59 Uhr",
    groupLabel: "max. 6 Teilnehmer",
    locationLabel: "Karben bei Frankfurt",
    priceEur: 550,
    priceNote: MWST_SUFFIX,
    bereich: "Führung",
    metaTitle: "Seminar Erfahrung im Management | 3 Tage, max. 6 Teilnehmer",
    metaDescription:
      "Dreitägiges Seminar über die Bedeutung von Erfahrung im Management. Max. 6 Teilnehmer, 550 € zzgl. MwSt., Karben bei Frankfurt. Termin nach Absprache.",
    quote: {
      text: "Wir glauben, Erfahrungen zu machen, aber die Erfahrungen machen uns.",
      source: "Eugène Ionesco",
    },
    intro: [
      "„Vieles erfahren haben, heißt noch nicht Erfahrung besitzen“, formulierte Marie von Ebner-Eschenbach. Genau darum geht es: über die Bedeutung des Begriffes nachzudenken und die eigenen Erfahrungen aus unterschiedlichen Perspektiven neu zu deuten. Wir kennen eine ganze Reihe artverwandter Worte — Einsichten gewinnen, Fähigkeiten erwerben, Klugheit, Menschenkenntnis, Moral, Routine, Übung, Weitblick.",
      "Erfahrungen leben von unseren Erkenntnissen. Dabei treten wir allerdings gern als Selbstverführer auf, indem wir Erlebnisse und Ereignisse mit unserer individuellen Wahrheit ausstatten. Für Führungskräfte besteht eine wichtige Funktion darin, Mitarbeiterinnen und Mitarbeiter an die Bedeutung des Begriffes heranzuführen — denn zwischen Einsichtsfähigkeit, Sinnerkennung und Selbsterkenntnis können viele Verständnisschwierigkeiten liegen.",
      "Erfahrung ist nicht austauschbar: Jeder Einzelne schafft sich seine eigene Welt der Erfahrungen. Das macht das Zusammenleben leicht, wenn Menschen darüber sprechen — und schwierig, wenn unterschiedliche Erfahrungen aufeinanderprallen.",
    ],
    programme: [
      {
        n: 1,
        title: "Persönliche Erfahrungen",
        sub: "Erster Block",
        items: [
          "Der Begriff Erfahrung",
          "Bewusstsein und Erfahrung",
          "Meine persönlichen Erfahrungen",
          "Identität und Erfahrung",
          "Formen der Erfahrung",
          "Gemeinsame Übungen zur Erfahrung",
          "Gemeinsames Abendessen",
        ],
        merke: {
          source: "Oscar Wilde",
          text: "Seine eigenen Erfahrungen bedauern heißt, seine eigene Entwicklung aufhalten.",
        },
      },
      {
        n: 2,
        title: "Sinnliche Erfahrungen",
        sub: "Zweiter Block",
        items: [
          "Erfahrungen mit dem Unterbewusstsein: Augenblicke des Erkennens, Versprecher als Fehlleistung, Schicksal oder Zufall",
          "Über Gewohnheiten und Grundsätze",
          "Erfahrungen durch Bildbotschaften und Manipulation",
          "Erfahrungen durch die Sprache und ihre Codes",
          "Erfahrungen durch Kunst und Literatur",
          "Erfahrungen im sozialen Miteinander",
          "Erfahrung durch Übersinnliches und durch Musik",
          "Gemeinsame Übungen zur sinnlichen Erfahrung",
        ],
      },
      {
        n: 3,
        title: "Erfahrungen im Arbeitsleben",
        sub: "Dritter Block",
        items: [
          "Jeder ist sein eigener Lebensexperte",
          "Über die Schattenseiten des Arbeitslebens",
          "Unternehmen und Unternehmenskultur",
          "Zusammenleben in sozialen Strukturen",
          "Erfahrungen mit Konflikten",
          "Führung und Achtsamkeit — oder: der Zweck heiligt nicht jedes Mittel",
          "Teamerfahrungen und ihre negativen Folgen",
          "Gemeinsame Übungen",
        ],
        merke: {
          source: "Aus dem Seminarmaterial",
          text: "Der Arbeitsalltag wird im Wesentlichen durch routinierte, kurzlebige Erfahrungen wahrgenommen. Ergebnis: Das Tagesbewusstsein wird als Leitbild der Arbeit erlebt.",
        },
      },
    ],
    outcomes: [
      "Sie unterscheiden Erlebnis, Ereignis und Erfahrung",
      "Sie erkennen, wo Sie sich selbst etwas vormachen",
      "Sie verstehen, warum unterschiedliche Erfahrungen Zusammenarbeit stören können",
      "Sie führen Gespräche, die die Erfahrung anderer erschließen statt sie zu übergehen",
      "Sie sehen die Schattenseiten des Arbeitslebens klarer und benennbar",
    ],
    audience: [
      "Führungskräfte, die ihre eigene Erfahrung kritisch prüfen wollen",
      "Menschen mit langer Berufserfahrung, die Routine spüren",
      "Teams, in denen unterschiedliche Erfahrungen regelmäßig kollidieren",
    ],
    organisation: [
      { dt: "Termin", dd: ABSPRACHE_LABEL },
      { dt: "Dauer", dd: "3 Tage" },
      { dt: "Zeiten", dd: "08:59 – 15:59 Uhr" },
      { dt: "Teilnehmerzahl", dd: "max. 6" },
      { dt: "Seminarort", dd: SEMINARORT },
      { dt: "Teilnahmegebühr", dd: `550 € ${MWST_SUFFIX}` },
      { dt: "Gruppengröße", dd: "Maximal sechs Teilnehmer" },
      { dt: "Hotelbuchung", dd: "Organisiert der Teilnehmer selbst" },
    ],
    included: [
      "Seminarleitfaden",
      "DVD aus dem Seminargeschehen",
      "Seminargetränke",
      "Teilnahmezertifikat auf Wunsch",
    ],
    faq: [
      {
        q: "Ist das ein Führungsseminar oder ein philosophisches Seminar?",
        a: "Beides. Der Zugang ist philosophisch, die Anwendung ist Führungsarbeit — der dritte Block behandelt ausschließlich Erfahrungen im Arbeitsleben.",
      },
      {
        q: "Was kostet die Teilnahme?",
        a: "550 € zzgl. gesetzlicher Mehrwertsteuer, inklusive Seminargetränken, Seminarleitfaden und einer DVD aus dem Seminargeschehen. Auf Wunsch kommt ein Teilnahmezertifikat hinzu.",
      },
      { q: "Wie groß ist die Gruppe?", a: "Maximal sechs Teilnehmer." },
      {
        q: "Wie sind die Zeiten?",
        a: "Das Seminar beginnt um 08:59 Uhr und endet um 15:59 Uhr. Zum ersten und zweiten Block gehört jeweils ein gemeinsames Abendessen.",
      },
    ],
    related: ["freiheit-fuehrung-persoenlichkeit", "konflikte", "praesentation"],
    pdfUrl: `${PDF_BASE}2019_Erfahrung_oT.pdf`,
  },
];

export { SEMINARE_THEMENFELD };

/** Alle Seminare: acht mit ausgearbeitetem Programm, dann das Themenfeldprogramm. */
export const SEMINARE: Seminar[] = [...SEMINARE_PROGRAMM, ...SEMINARE_THEMENFELD];

export function findSeminar(slug: string) {
  return SEMINARE.find((s) => s.slug === slug);
}

/** Verwandte Seminare in der Reihenfolge der Slugs, ohne Lücken. */
export function relatedSeminare(seminar: Seminar) {
  return seminar.related
    .map((slug) => SEMINARE.find((s) => s.slug === slug))
    .filter((s): s is Seminar => Boolean(s));
}

/** Preis immer netto und niemals ohne Hinweis auf die Mehrwertsteuer. */
export function preisLabel(seminar: Seminar) {
  return seminar.priceEur === null ? seminar.priceNote : `${seminar.priceEur} €`;
}

/** Seminarzeiten — wörtlich je Seminar, sonst der Standardtext. */
export function zeitenLabel(seminar: Seminar) {
  return seminar.zeitenLabel ?? ZEITEN_LABEL;
}

/** Honorarhinweis statt Festpreis, wenn nach Format abgerechnet wird. */
export function istHonorarModell(seminar: Seminar) {
  return seminar.honorarModell === true;
}
