/**
 * Praxisbriefe — die Aufsätze von Erich Grikscheit.
 * Teaser sind wörtlich übernommen. `body` bleibt leer, solange keine
 * HTML-Fassung vorliegt; ist es gefüllt, wird der Aufsatz als Artikel gerendert.
 */
export type Praxisbrief = {
  slug: string;
  title: string;
  /** Monatslabel, z. B. "August 2026" */
  month: string;
  /** ISO-Datum der Veröffentlichung */
  date: string;
  teaser: string;
  pdfUrl: string;
  pdfSize: string;
  coverUrl: string;
  /** Volltext als HTML — wird nachgereicht. */
  body?: string;
};

const PDF_BASE = "https://www.pfmm.de/das_angebot/praxisbriefe/";
const IMG_BASE = "https://www.pfmm.de/das_angebot/praxisbriefe/bilder/";

export const PRAXISBRIEFE: Praxisbrief[] = [
  {
    slug: "ordnung",
    title: "Ordnung",
    month: "August 2026",
    date: "2026-08-05",
    teaser:
      "Der Begriff Ordnung begleitet das menschliche Denken seit jeher. Er ist Teil unseres alltäglichen Sprachgebrauchs, taucht scheinbar selbstverständlich in privaten, beruflichen, politischen und gesellschaftlichen Kontexten auf und wird meist ohne weiteres Nachdenken verwendet.",
    pdfUrl: `${PDF_BASE}2026-08-05_ordnung.pdf`,
    pdfSize: "678,1 kB",
    coverUrl: `${IMG_BASE}2026-08-05_ordnung.jpg`,
  },
  {
    slug: "arbeit",
    title: "Arbeit",
    month: "Juni 2026",
    date: "2026-06-19",
    teaser:
      "Arbeit ist eine der grundlegendsten Ausdrucksformen menschlichen Bewusstseins. Sie ist nicht nur Tätigkeit, nicht bloß ökonomische Notwendigkeit, sondern eine Form, in der sich das Verhältnis des Menschen zu sich selbst, zur Welt und zu anderen Menschen offenbart.",
    pdfUrl: `${PDF_BASE}2026-06-19_arbeit.pdf`,
    pdfSize: "775,4 kB",
    coverUrl: `${IMG_BASE}2026-06-19_arbeit.jpg`,
  },
  {
    slug: "vertrauen",
    title: "Vertrauen",
    month: "April 2026",
    date: "2026-04-23",
    teaser:
      "Es ist ein merkwürdiges Schauspiel unserer Zeit: Diplomaten sitzen an langen Tischen, Kameras laufen, Worte werden mit Bedacht gewählt – und doch spürt jeder, dass etwas fehlt: Vertrauen – zwischen Staaten, Regierungen und Machtblöcken. Im Hintergrund stehen Kriege, gebrochene Zusagen, historische Verletzungen.",
    pdfUrl: `${PDF_BASE}2026-04-23_vertrauen.pdf`,
    pdfSize: "204,3 kB",
    coverUrl: `${IMG_BASE}2026-04-23_vertrauen.jpg`,
  },
  {
    slug: "verantwortung-erfahrung-urteil",
    title: "Verantwortung – Erfahrung – Urteil",
    month: "Januar 2026",
    date: "2026-01-23",
    teaser:
      "Verantwortung erscheint im Alltag häufig als moralische Forderung, als Pflicht oder als Zuschreibung von außen. Man erwartet Verantwortung von Führungskräften, von Eltern, von Institutionen – selten jedoch fragt man nach ihrem inneren Ursprung. Philosophisch und psychologisch betrachtet entsteht Verantwortung nicht plötzlich und nicht isoliert.",
    pdfUrl: `${PDF_BASE}2026-01-23_verantwortung_erfahrung_urteil.pdf`,
    pdfSize: "822,2 kB",
    coverUrl: `${IMG_BASE}2026-01-23_verantwortung_erfahrung_urteil.jpg`,
  },
  {
    slug: "sehen-als-lebenspraxis",
    title: "Den Blick neu überdenken – Sehen als Lebenspraxis",
    month: "Dezember 2025",
    date: "2025-12-22",
    teaser:
      "Sehen ist mehr als ein physiologischer Vorgang. Es ist zugleich ein Akt des Erkennens und ein Spiegel des eigenen Inneren. Der Aufsatz fasst philosophische und psychologische Impulse zusammen, die helfen können, den eigenen Blick bewusst zu erneuern – im Alltag, im Umgang mit sich selbst und anderen.",
    pdfUrl: `${PDF_BASE}2025-12-22_den-blick-neu-ueberdenken.pdf`,
    pdfSize: "188,5 kB",
    coverUrl: `${IMG_BASE}2025-12-22_den-blick-neu-ueberdenken.jpg`,
  },
  {
    slug: "die-geschichte-des-ichs",
    title: "Das Wesentliche – Die Geschichte des Ichs",
    month: "November 2025",
    date: "2025-11-17",
    teaser:
      "Die Geschichte des Ichs ist ein Spiegel der menschlichen Entwicklung – von göttlicher Ordnung zu individueller Selbstbestimmung. Mit der Aufklärung begann das Ich, sich als denkendes, moralisches und freies Wesen zu verstehen.",
    pdfUrl: `${PDF_BASE}2025-11-17_die-geschichte-des-ichs.pdf`,
    pdfSize: "493,0 kB",
    coverUrl: `${IMG_BASE}2025-11-17_die-geschichte-des-ichs.jpg`,
  },
  {
    slug: "wertschaetzung-und-tradition",
    title: "Wertschätzung und Tradition / Unternehmen + Marke",
    month: "Juli 2025",
    date: "2025-07-04",
    teaser:
      "Wie agiert ein Unternehmen, das sich der Tradition verpflichtet fühlt? Wenn es bereits 50, 100 oder mehr Jahre existiert, dann hat sich in den Köpfen der Kunden ein bestimmtes Bild oder Gefühl festgesetzt (Image).",
    pdfUrl: `${PDF_BASE}2025-07-04_wertschaetzung-tradition.pdf`,
    pdfSize: "275,7 kB",
    coverUrl: `${IMG_BASE}2025-07-04_wertschaetzung-tradition.jpg`,
  },
  {
    slug: "wertschaetzung",
    title: "Wertschätzung",
    month: "Mai 2025",
    date: "2025-05-19",
    teaser:
      "Häufig tritt die Frage auf, was denn Wertschätzung auf eine kurze Formel gebracht ist. Antwort: Wertschätzung soll Mut machen, damit andere das eigene Denken und Fühlen erkennen und entsprechend auf ein wertschätzendes Verhalten reagieren können.",
    pdfUrl: `${PDF_BASE}2025-05-19_wertschaetzung.pdf`,
    pdfSize: "187,8 kB",
    coverUrl: `${IMG_BASE}2025-05-19_wertschaetzung.jpg`,
  },
];

export function findPraxisbrief(slug: string) {
  return PRAXISBRIEFE.find((b) => b.slug === slug);
}

/** Vorheriger (älterer) und nächster (neuerer) Praxisbrief. */
export function praxisbriefNachbarn(slug: string) {
  const i = PRAXISBRIEFE.findIndex((b) => b.slug === slug);
  return {
    neuer: i > 0 ? PRAXISBRIEFE[i - 1] : undefined,
    aelter: i >= 0 && i < PRAXISBRIEFE.length - 1 ? PRAXISBRIEFE[i + 1] : undefined,
  };
}

export const AUTOR_BILD = "https://www.pfmm.de/home/eg_110.jpg";
export const LINKEDIN_URL = "https://www.linkedin.com/in/erich-grikscheit-pfmm";
