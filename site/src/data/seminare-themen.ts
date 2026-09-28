/**
 * Sieben Seminare aus dem Seminarprogramm nach Themenfeldern.
 * Honorar nach Format (siehe Honorarübersicht), Gruppengröße maximal vier Personen.
 * Es wird ausschließlich geliefertes Material wiedergegeben.
 */

import {
  ABSPRACHE_LABEL,
  HONORAR_LABEL,
  SEMINARORT,
  type Seminar,
} from "@/data/seminar-basis";

const INKLUSIVE = [
  "Ein Leitfaden",
  "Begleitendes Material aus dem Seminargeschehen",
  "Literaturverzeichnis",
];

function organisation(dauer: string) {
  return [
    { dt: "Termin", dd: ABSPRACHE_LABEL },
    { dt: "Dauer", dd: dauer },
    { dt: "Zeiten", dd: "Nach Absprache" },
    { dt: "Teilnehmerzahl", dd: "max. 4" },
    { dt: "Seminarort", dd: SEMINARORT },
    { dt: "Honorar", dd: "Nach Format und Dauer — siehe Honorarübersicht" },
    { dt: "Referent", dd: "Erich Grikscheit" },
  ];
}

const FAQ_BASIS = [
  {
    q: "Was kostet dieses Seminar?",
    a: "Das Honorar richtet sich nach Format und Dauer, nicht nach Thema. Die vollständige Übersicht — Online-Training, Einzeltraining und Inhouse-Training — finden Sie auf der Seite „Honorare“. Alle Beträge verstehen sich zuzüglich gesetzlicher Mehrwertsteuer.",
  },
  {
    q: "Wie groß ist die Gruppe?",
    a: "Die Teilnehmerzahl ist begrenzt. Maximal vier Personen.",
  },
  {
    q: "Wann findet das Seminar statt?",
    a: "Der Termin wird gemeinsam abgestimmt. Offene Termine werden auf dieser Website veröffentlicht.",
  },
];

/** Gemeinsame Voreinstellungen aller Themenfeldseminare. */
function themenSeminar(
  base: Pick<
    Seminar,
    | "slug"
    | "title"
    | "h1"
    | "subtitle"
    | "lead"
    | "eyebrow"
    | "durationLabel"
    | "bereich"
    | "themenfeld"
    | "metaTitle"
    | "metaDescription"
    | "related"
  > &
    Partial<Seminar>,
): Seminar {
  return {
    dateLabel: ABSPRACHE_LABEL,
    isOpenDate: false,
    groupLabel: "max. 4",
    zeitenLabel: "Nach Absprache",
    locationLabel: "Karben bei Frankfurt",
    priceEur: null,
    priceNote: HONORAR_LABEL,
    honorarModell: true,
    quote: null,
    intro: [],
    programme: [],
    outcomes: [],
    audience: [],
    organisation: organisation(base.durationLabel),
    included: INKLUSIVE,
    faq: FAQ_BASIS,
    ...base,
  } as Seminar;
}

export const SEMINARE_THEMENFELD: Seminar[] = [
  themenSeminar({
    slug: "einstieg-fuehrungsrolle",
    title: "Einstieg in die Rolle einer Führungskraft",
    h1: "Einstieg in die Rolle einer Führungskraft",
    subtitle: "Vom Umsetzer zum Gestalter",
    eyebrow: "Themenfeld Führung",
    durationLabel: "Dauer nach Absprache",
    bereich: "Führung",
    themenfeld: "Führung",
    lead: "Der Einstieg in die Rolle einer Führungskraft ist eine der anspruchsvollsten Veränderungen im beruflichen Werdegang. Er bedeutet nicht nur eine neue Aufgabenstellung, sondern vor allem einen Wechsel der inneren Perspektive: vom Umsetzer zum Gestalter, vom Fachspezialisten zum Verantwortlichen für Menschen, Prozesse und Ergebnisse.",
    metaTitle: "Seminar Einstieg in die Führungsrolle | Erich Grikscheit",
    metaDescription:
      "Seminar für neue Führungskräfte: Rollenwechsel, Ordnung als Führungsprinzip und Verantwortung als Haltung. Kleine Runde mit maximal vier Teilnehmern in Karben bei Frankfurt.",
    intro: [
      "Im Mittelpunkt steht die Frage, wie Führungskräfte Orientierung geben, Entscheidungen treffen und gleichzeitig Vertrauen und Motivation im Team aufbauen können. Dabei werden zentrale psychologische, kommunikative und philosophische Grundlagen der Führung beleuchtet und mit praktischen Anforderungen des Führungsalltags verbunden.",
      "Das Seminar greift typische Herausforderungen auf, wie den Umgang mit Erwartungen, den Aufbau von Autorität ohne Distanzverlust sowie die Balance zwischen Klarheit und Empathie. Die Teilnehmer erhalten die Möglichkeit, ihre eigene Rolle zu reflektieren, ihr Führungsverständnis zu schärfen und neue Handlungsperspektiven zu entwickeln.",
      "Die Bedeutung dieses Seminars liegt insbesondere darin, Führung nicht als Technik, sondern als persönliche Entwicklungsaufgabe zu verstehen. Gerade unter den Bedingungen von Wandel, Digitalisierung und steigender Komplexität wird die innere Haltung der Führungskraft zum entscheidenden Erfolgsfaktor.",
    ],
    sections: [
      {
        heading: "Zielsetzung des Seminars",
        body: [
          "Dieses Seminar verfolgt das Ziel, den Übergang von der Sachbearbeitung in die Rolle einer Führungskraft bewusst, reflektiert und wirksam zu gestalten. Der Rollenwechsel bedeutet nicht nur eine Erweiterung der Aufgaben, sondern eine grundlegende Veränderung der Denk- und Handlungsweise. Während in der Sachbearbeitung die fachliche Kompetenz und die eigene Leistung im Mittelpunkt stehen, rückt in der Führungsrolle die Verantwortung für Menschen, Ergebnisse und Strukturen in den Vordergrund.",
          "Ein zentrales Ziel des Seminars ist es daher, diesen Perspektivwechsel verständlich zu machen und aktiv zu begleiten. Die Teilnehmer sollen erkennen, welche neuen Anforderungen an sie gestellt werden und wie sie ihre bisherige Erfahrung sinnvoll in die neue Rolle integrieren können. Gleichzeitig wird deutlich gemacht, dass Führung nicht automatisch mit der Position entsteht, sondern durch Haltung, Verhalten und kontinuierliche Entwicklung.",
          "Ein weiterer Schwerpunkt liegt auf der persönlichen Weiterentwicklung. Die Teilnehmer werden angeregt, ihre eigenen Stärken, Werte und Verhaltensmuster zu reflektieren und gezielt auszubauen. Ziel ist es, die individuellen Voraussetzungen so zu entwickeln, dass sie den wachsenden Anforderungen der Führungsrolle dauerhaft gerecht werden.",
          "Darüber hinaus soll das Seminar die Fähigkeit fördern, die eigene Qualifikation kontinuierlich zu verbessern. Dies umfasst sowohl fachliche als auch soziale und methodische Kompetenzen. Führung wird dabei als ein dynamischer Lernprozess verstanden, der sich an veränderte Rahmenbedingungen, neue Herausforderungen und steigende Erwartungen anpassen muss.",
          "Langfristig trägt das Seminar dazu bei, die persönliche Wirksamkeit als Führungskraft zu erhöhen und die Chancen zu verbessern, verantwortungsvollere und anspruchsvollere Führungsaufgaben zu übernehmen. Es unterstützt die Teilnehmer dabei, ihren eigenen Führungsstil zu entwickeln und ihre Rolle klar, souverän und authentisch auszufüllen.",
        ],
      },
      {
        heading: "Methodisches Vorgehen",
        body: [
          "Das Seminar ist praxisorientiert, interaktiv und erfahrungsbasiert aufgebaut. Ziel ist es, den Teilnehmern nicht nur theoretisches Wissen zu vermitteln, sondern vor allem die Möglichkeit zu geben, Führung konkret zu erleben, zu reflektieren und weiterzuentwickeln.",
          "Ein zentrales Element sind kurze, prägnante Impulsvorträge, die die wesentlichen Grundlagen zu Themen wie Führung, Kommunikation, Ordnung und Verantwortung vermitteln. Diese Inputs schaffen eine gemeinsame Wissensbasis und dienen als Ausgangspunkt für die weitere praktische Arbeit. Darauf aufbauend stehen interaktive Formate im Mittelpunkt. In Gruppenarbeiten und Workshops erarbeiten die Teilnehmer eigene Lösungsansätze, diskutieren unterschiedliche Perspektiven und übertragen die Inhalte auf ihre persönliche Führungssituation.",
          "Ergänzend werden Einzelreflexionen eingesetzt, um die eigene Haltung, das Führungsverständnis und persönliche Verhaltensmuster zu hinterfragen. Diese Selbstreflexion ist ein zentraler Bestandteil der Entwicklung als Führungskraft. Feedbackrunden innerhalb der Gruppe fördern zusätzlich die Wahrnehmung und das Lernen voneinander. Die Teilnehmer erhalten Rückmeldungen zu ihrem Verhalten und ihrer Wirkung und entwickeln daraus konkrete Ansatzpunkte für ihre Weiterentwicklung. Das methodische Vorgehen verbindet somit Wissen, Erfahrung und Reflexion. Es schafft einen Raum, in dem Führung nicht nur verstanden, sondern aktiv gestaltet und weiterentwickelt wird.",
        ],
      },
    ],
    programme: [
      {
        n: 1,
        title: "Ordnung als Führungsprinzip",
        sub: "Struktur schafft Wirksamkeit",
        items: [
          "Ordnung ist mehr als Organisation – sie ist ein grundlegendes Führungsprinzip. Sie beschreibt die Fähigkeit, Komplexität zu strukturieren, Abläufe zu systematisieren und Orientierung zu schaffen. Für eine Führungskraft bedeutet Ordnung, klare Ziele zu formulieren, Prozesse zu definieren und nachvollziehbare Strukturen zu entwickeln, die für alle Beteiligten verständlich und umsetzbar sind.",
          "Im Seminar wird Ordnung als aktive Führungsleistung verstanden: Planung, Priorisierung, Steuerung und Kontrolle sind keine administrativen Nebenaufgaben, sondern zentrale Elemente wirksamer Führung. Ordnung schafft Verlässlichkeit, reduziert Unsicherheit und ermöglicht es Mitarbeitern, ihre Aufgaben effizient und zielgerichtet zu erfüllen.",
          "Darüber hinaus hat Ordnung auch eine kulturelle Dimension. Sie zeigt sich in Klarheit der Kommunikation, in Konsequenz im Handeln und in der Fähigkeit, Entscheidungen systematisch herzuleiten. Eine Führungskraft, die Ordnung lebt, vermittelt Stabilität und Orientierung.",
        ],
      },
      {
        n: 2,
        title: "Verantwortung als Kern der Führungsrolle",
        sub: "Haltung entscheidet",
        items: [
          "Verantwortung ist das zentrale Fundament jeder Führungsrolle. Sie beginnt nicht bei der Aufgabe, sondern bei der inneren Haltung. Eine Führungskraft übernimmt Verantwortung für Entscheidungen, für Ergebnisse, für das Verhalten im Team und für die Entwicklung der Mitarbeiter. Im Seminar wird Verantwortung als bewusste Entscheidung verstanden: die Bereitschaft, Konsequenzen zu tragen, auch unter Unsicherheit zu handeln und sich nicht hinter Strukturen oder Umständen zu verstecken. Verantwortung bedeutet, klare Positionen zu beziehen, Orientierung zu geben und gleichzeitig die Auswirkungen des eigenen Handelns zu reflektieren.",
          "Ein weiterer Aspekt ist die Übertragung von Verantwortung. Führung heißt nicht, alles selbst zu entscheiden, sondern Verantwortung sinnvoll zu delegieren und Mitarbeiter in ihrer Eigenverantwortung zu stärken. Dadurch entsteht Vertrauen, Motivation und langfristig eine leistungsfähige Organisation. Verantwortung ist somit nicht nur eine Aufgabe, sondern Ausdruck von Persönlichkeit, Reife und Führungsqualität.",
        ],
      },
    ],
    zentraleInhalte: [
      "Rollenwechsel verstehen — vom Sachbearbeiter zur Führungskraft: Erwartungen, Chancen und typische Herausforderungen",
      "Selbstverständnis als Führungskraft entwickeln — Klärung der eigenen Rolle, Haltung und Führungsidentität",
      "Ordnung und Struktur als Führungsinstrument — Planung, Priorisierung, Systematik und Kontrolle im Führungsalltag",
      "Verantwortung übernehmen und gestalten — Entscheidungen treffen und Konsequenzen tragen",
      "Zielorientierte Führung — Ziele definieren, kommunizieren und umsetzen",
      "Kommunikation als Führungsinstrument — klare Sprache und aktives Zuhören",
      "Mitarbeiter verstehen und führen",
      "Motivation und Potenziale erkennen",
      "Delegation und Eigenverantwortung — Aufgaben übertragen und Mitarbeiter entwickeln",
      "Konflikte konstruktiv lösen — Umgang mit Spannungen und Kritik",
      "Entscheidungsfähigkeit unter Unsicherheit — strukturiertes Denken und Handeln",
      "Selbstmanagement und persönliche Entwicklung — Reflexion und Weiterentwicklung",
      "Führung im Wandel — Umgang mit Dynamik und Veränderung",
    ],
    related: ["grundlagen-fuehrung", "entscheidungskompetenz", "konflikte"],
  }),

  themenSeminar({
    slug: "strategisches-denken",
    title: "Strategisches Denken im Managementalltag",
    h1: "Strategisches Denken im Managementalltag",
    subtitle: "Zukunft gestalten statt verwalten",
    eyebrow: "Themenfeld Strategie",
    durationLabel: "Dauer nach Absprache",
    bereich: "Führung",
    themenfeld: "Strategie",
    lead: "Strategisches Denken ist heute keine theoretische Disziplin mehr – es ist eine zentrale Führungsaufgabe. In einer Zeit, in der Digitalisierung, Künstliche Intelligenz und dynamische Märkte Entscheidungen beschleunigen und verdichten, braucht es Führungskräfte, die strategisch denken und konsequent handeln können.",
    metaTitle: "Seminar Strategisches Denken im Managementalltag | Grikscheit",
    metaDescription:
      "Strategische Klarheit und operative Umsetzungsstärke: Seminar für Führungskräfte in Karben bei Frankfurt. Kleine Runde, Honorar nach Format, Termin nach Absprache.",
    intro: [
      "Dieses Seminar verbindet strategische Klarheit mit operativer Umsetzungsstärke. Es zeigt, wie aus Ideen tragfähige Strategien entstehen – und wie diese im Managementalltag wirksam werden: in Prozessen, Projekten, Entscheidungen und Führungsroutinen. Dabei geht es nicht um starre Modelle, sondern um strategische Denkfähigkeit unter realen Bedingungen von Komplexität, Unsicherheit und Zeitdruck.",
      "Im Mittelpunkt steht der Mensch in seiner Führungsrolle. Strategisches Management wird als Zusammenspiel von Rationalität, Urteilsvermögen, Erfahrung, Intuition und Verantwortung verstanden. Die Teilnehmenden reflektieren ihre eigene Denk- und Entscheidungslogik und entwickeln ein klares Verständnis dafür, wie persönliche Haltung, strategische Weitsicht und operative Konsequenz zusammenwirken.",
      "Das Seminar ist praxisnah, dialogisch und interaktiv aufgebaut. Workshops, Fallbeispiele, Gruppenarbeiten, Impulse und Selbstreflexionen sorgen für einen nachhaltigen Transfer in den Führungsalltag. Strategisches Denken beginnt im Kopf – und entfaltet seine Wirkung im Handeln.",
    ],
    related: ["entscheidungskompetenz", "ordnung-denken", "unternehmenskultur"],
  }),

  themenSeminar({
    slug: "ordnung-denken",
    title: "Ordnung denken",
    h1: "Ordnung denken",
    subtitle: "Ordnungsintelligenz als Führungs- und Lebensprinzip",
    eyebrow: "Themenfeld Strategie",
    durationLabel: "Dauer nach Absprache",
    bereich: "Führung",
    themenfeld: "Strategie",
    lead: "Ordnung ist heute weit mehr als Struktur, Ablage oder Prozess. Sie ist eine innere Fähigkeit, Komplexität einzuordnen, Wesentliches von Unwesentlichem zu unterscheiden und verantwortliche Entscheidungen zu treffen. In einer Zeit permanenter Beschleunigung, Informationsüberflutung und steigender Unsicherheit wird Ordnung zur zentralen Führungsressource.",
    metaTitle: "Seminar Ordnung denken — Ordnungsintelligenz | Grikscheit",
    metaDescription:
      "Ordnung als Denk-, Orientierungs- und Gestaltungsprinzip der Führung. Seminar in Karben bei Frankfurt, maximal vier Teilnehmer, Termin nach Absprache.",
    intro: [
      "Dieses Seminar versteht Ordnung nicht als Kontrollinstrument oder starres Regelwerk, sondern als Denk-, Orientierungs- und Gestaltungsprinzip. Führungskräfte stehen täglich vor der Aufgabe, Menschen, Aufgaben, Erwartungen und Verantwortung sinnvoll zu verbinden – genau hier entscheidet sich, ob Ordnung trägt oder Unordnung dominiert.",
      "Im Mittelpunkt des Seminars steht die Entwicklung von Ordnungsintelligenz: der Fähigkeit, Klarheit zu schaffen, Prioritäten zu setzen, Zusammenhänge zu erkennen und Entscheidungen verantwortungsvoll zu begründen. Dabei wird Ordnung sowohl aus psychologischer als auch aus philosophischer und praktischer Perspektive betrachtet.",
    ],
    related: ["strategisches-denken", "entscheidungskompetenz", "einstieg-fuehrungsrolle"],
  }),

  themenSeminar({
    slug: "entscheidungskompetenz",
    title: "Entscheidungskompetenz im Management",
    h1: "Entscheidungskompetenz im Management",
    subtitle: "Klar entscheiden. Verantwortung übernehmen. Zukunft gestalten.",
    eyebrow: "Themenfeld Strategie",
    durationLabel: "Dauer nach Absprache",
    bereich: "Führung",
    themenfeld: "Strategie",
    lead: "Entscheidungen prägen den Führungsalltag mehr als jede andere Tätigkeit. Führungskräfte entscheiden täglich – oft unter Zeitdruck, Unsicherheit und widersprüchlichen Erwartungen. Dabei geht es nicht nur um Zahlen, Prozesse oder Strategien, sondern immer auch um Menschen, Beziehungen und Verantwortung.",
    metaTitle: "Seminar Entscheidungskompetenz im Management | Grikscheit",
    metaDescription:
      "Entscheidungen bewusster, klarer und wirksamer treffen: Seminar für Führungskräfte in Karben bei Frankfurt. Kleine Runde, Honorar nach Format.",
    intro: [
      "Das Seminar schafft Verständnis dafür, wie Entscheidungen entstehen und welche Rolle Persönlichkeit, Erfahrung, Sachwissen und Perspektive dabei spielen. Ziel ist es, Entscheidungen bewusster, klarer und wirksamer zu treffen.",
      "Gute Entscheidungen verlangen mehr als schnelle Lösungen. Sie erfordern komplexes Denken, Perspektivwechsel und innere Klarheit. Führung bedeutet, Unsicherheit auszuhalten und dennoch handlungsfähig zu bleiben.",
      "Im Seminar reflektieren die Teilnehmenden ihr eigenes Entscheidungsverhalten, erkennen persönliche Muster und entwickeln tragfähige Entscheidungsstrategien für ihren Führungsalltag.",
    ],
    related: ["strategisches-denken", "ordnung-denken", "grundlagen-fuehrung"],
  }),

  themenSeminar({
    slug: "unternehmenskultur",
    title: "Unternehmenskultur und Unternehmensphilosophie",
    h1: "Bedeutung von Unternehmenskultur und Unternehmensphilosophie im Management",
    subtitle: "Zwei-Tages-Seminar",
    eyebrow: "Themenfeld Strategie",
    durationLabel: "2 Tage",
    bereich: "Führung",
    themenfeld: "Strategie",
    lead: "Unternehmenskultur und Unternehmensphilosophie gehören heute zu den meistgenannten, aber zugleich am wenigsten verstandenen Begriffen moderner Unternehmensführung. Häufig erscheinen sie als Leitbilder, Werteplakate oder wohlklingende Aussagen auf Webseiten – ihre tatsächliche Wirkung jedoch entfaltet sich weit tiefer: im Denken, Entscheiden und Handeln einer Organisation.",
    metaTitle: "Seminar Unternehmenskultur und Unternehmensphilosophie | Grikscheit",
    metaDescription:
      "Zwei-Tages-Seminar: Unternehmenskultur und Unternehmensphilosophie als innere Ordnungs- und Steuerungssysteme verstehen. Karben bei Frankfurt, maximal vier Teilnehmer.",
    intro: [
      "Dieses Zwei-Tages-Seminar lädt dazu ein, Unternehmenskultur und Unternehmensphilosophie nicht als Imageinstrumente, sondern als wirksame innere Ordnungs- und Steuerungssysteme zu begreifen. Im Mittelpunkt steht die Frage, wie Unternehmen sich selbst verstehen, wie sie mit Verantwortung, Macht, Zeit, Leistung und Menschen umgehen – und welche Konsequenzen sich daraus im Alltag ergeben.",
      "Die Teilnehmenden gewinnen ein vertieftes Verständnis dafür, wie Unternehmenskultur Organisation, Kommunikation, Motivation, Zusammenarbeit und Transformation prägt. Sie lernen, kulturelle Muster zu erkennen, Spannungen sichtbar zu machen und Fehlentwicklungen nicht zu überdecken, sondern konstruktiv zu bearbeiten. Besonderes Augenmerk gilt dabei auch den Schattenseiten organisationaler Wirklichkeit: Machtstreben, Konkurrenz, Angst, strategische Verkürzungen und der Verlust von Orientierung.",
    ],
    related: ["unternehmensethik", "strategisches-denken", "grundlagen-fuehrung"],
  }),

  themenSeminar({
    slug: "grundlagen-fuehrung",
    title: "Grundlagen zur erfolgreichen Führung",
    h1: "Grundlagen zur erfolgreichen Führung",
    subtitle: "Haltung, Klarheit, Kommunikation und Menschenkenntnis",
    eyebrow: "Themenfeld Führung",
    durationLabel: "Dauer nach Absprache",
    bereich: "Führung",
    themenfeld: "Führung",
    lead: "Führung ist heute weit mehr als das Steuern von Prozessen und das Erreichen betrieblicher Ziele. In einer Welt voller Unsicherheit, Geschwindigkeit und Wertewandel braucht Führung neue Grundlagen: Haltung, Klarheit, Kommunikation und Menschenkenntnis.",
    metaTitle: "Seminar Grundlagen zur erfolgreichen Führung | Grikscheit",
    metaDescription:
      "Streifzug durch die wesentlichen Begriffe moderner Führung: Verantwortung, Vertrauen, Motivation, Werte, Haltung, Macht und Selbstführung. Seminar in Karben bei Frankfurt.",
    quote: {
      text: "Führen heißt Zukunft gestalten – nicht verwalten.",
    },
    intro: [
      "Dieses Seminar liefert einen Streifzug durch alle wesentlichen Begriffe der modernen Führung – Verantwortung, Vertrauen, Motivation, Werte, Haltung, Konfliktfähigkeit, Teamkultur, Macht, Selbstführung, Kommunikation und strategisches Denken.",
      "Führung ist heute ein Wir-Mechanismus – die Kunst, Menschen zu verbinden und Orientierung zu geben. Dieses Seminar richtet sich an Führungskräfte, die ihre Kommunikations- und Konfliktkompetenzen vertiefen, ihr Menschenverständnis erweitern und eine moderne, wirksame und menschliche Führungskultur etablieren möchten.",
      "Es stärkt Selbstführung, Verantwortungsbewusstsein, strategisches Denken und emotionale Intelligenz.",
    ],
    related: ["einstieg-fuehrungsrolle", "entscheidungskompetenz", "moderation"],
  }),

  themenSeminar({
    slug: "moderation",
    title: "Moderations-Seminar",
    h1: "Moderations-Seminar",
    subtitle: "Kommunikation gestalten. Prozesse führen. Menschen verbinden.",
    eyebrow: "Themenfeld Kommunikation",
    durationLabel: "Dauer nach Absprache",
    bereich: "Kommunikation",
    themenfeld: "Kommunikation",
    lead: "Moderation ist eine der zentralen Schlüsselkompetenzen moderner Zusammenarbeit. In Zeiten wachsender Komplexität, vielfältiger Perspektiven und dynamischer Veränderungen entscheidet nicht allein Fachwissen über den Erfolg von Teams, sondern die Qualität der Kommunikation und der gemeinsamen Denkprozesse.",
    metaTitle: "Moderations-Seminar für Führungskräfte | Erich Grikscheit",
    metaDescription:
      "Moderation als bewusste Haltung: Gespräche, Workshops und Gruppenprozesse sicher führen. Seminar in Karben bei Frankfurt, maximal vier Teilnehmer.",
    intro: [
      "Dieses Seminar vermittelt Moderation als professionelle Gestaltungsform von Dialog, Interaktion und Wissenstransfer. Moderation wird dabei nicht als Technik verstanden, sondern als bewusste Haltung, die Struktur schafft, ohne Kreativität zu begrenzen, und Orientierung gibt, ohne Denkprozesse zu verengen.",
      "Teilnehmende lernen, wie Gespräche, Workshops und Gruppenprozesse so gestaltet werden, dass Beteiligung entsteht, unterschiedliche Sichtweisen produktiv genutzt werden und tragfähige Ergebnisse möglich werden.",
      "Dabei geht es um Präsenz, Klarheit, Wahrnehmung und die Fähigkeit, Gruppen sicher durch offene Prozesse zu führen.",
    ],
    related: ["praesentation", "grundlagen-fuehrung", "konflikte"],
  }),
];
