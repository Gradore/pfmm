import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MWST_SUFFIX,
  preisLabel,
  SEMINARE_PROGRAMM,
  SEMINARE_THEMENFELD,
  zeitenLabel,
  type Seminar,
  type Themenfeld,
} from "@/data/seminare";
import { PROGRAMM_THEMENFELDER } from "@/data/programm";
import { VIER_THEMENBEREICHE } from "@/data/programm";
import { KontaktOrganisation } from "@/components/site/KontaktOrganisation";
import { SeminarMotiv } from "@/components/seminar/SeminarMotiv";
import { ladeOeffentlicheTermine, useOeffentlicheTermine } from "@/hooks/useTermine";
import { freiePlaetze, zeitraumKurz, type Termin } from "@/lib/buchung";

/** Nächster öffentlicher Termin je Seminar — aus der Datenbank. */
function terminMap(termine: Termin[]): Record<string, Termin> {
  const map: Record<string, Termin> = {};
  for (const t of termine) {
    if (t.status === "abgesagt") continue;
    if (!map[t.seminar_slug]) map[t.seminar_slug] = t;
  }
  return map;
}

/** Zustands-Chip einer Karte: echter Termin oder „nach Absprache“. */
function TerminChip({ termin }: { termin?: Termin }) {
  if (!termin) {
    return (
      <span className="text-[15px] font-semibold text-ink-500">Termin nach Absprache</span>
    );
  }
  const frei = freiePlaetze(termin);
  return (
    <span className="text-[15px] font-semibold text-ink-900">
      Termin: {zeitraumKurz(termin.start_datum, termin.end_datum)} ·{" "}
      {frei === 0 ? "ausgebucht" : frei === 1 ? "noch 1 Platz frei" : `noch ${frei} Plätze frei`}
    </span>
  );
}

const title = "Offene Seminare in Karben bei Frankfurt | Erich Grikscheit";
const description =
  "Offene Seminare zu Strategie, Führung, Kommunikation, Vertrieb und Zeitmanagement in Karben bei Frankfurt.";

export const Route = createFileRoute("/leistungen/seminare/")({
  loader: async () => {
    // Beim Vorrendern laden, damit die Terminstände schon im HTML stehen.
    try {
      return { termine: await ladeOeffentlicheTermine() };
    } catch (err) {
      console.error(err);
      return { termine: [] as Termin[] };
    }
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/seminare/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/seminare/" }],
  }),
  component: Page,
});

function Page() {
  const { termine: vorgerendert } = Route.useLoaderData() as { termine: Termin[] };
  const { data } = useOeffentlicheTermine(undefined, vorgerendert);
  const termineJeSeminar = terminMap(data ?? vorgerendert);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Leistungen", to: "/leistungen" }, { label: "Offene Seminare" }]}
        eyebrow="Offene Seminare"
        title="Offene Seminare in Karben bei Frankfurt"
        lead="In Karben bei Frankfurt biete ich offene Seminare in kleinen Gruppen an. Sie arbeiten an Fragen aus Ihrer Praxis — zu Strategie, Führung, Kommunikation und Persönlichkeit."
      />

      <div className="container-page section-y">
        <section aria-labelledby="themen-title">
          <Reveal>
            <h2 id="themen-title" className="h2-display">
              Die vier Themenbereiche
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <Accordion type="single" collapsible className="mt-8 max-w-[80ch]">
              {VIER_THEMENBEREICHE.map((t) => (
                <AccordionItem key={t.feld} value={t.feld} className="border-ink-200">
                  <AccordionTrigger className="text-left font-sans text-[19px] font-semibold text-ink-900 hover:text-brass-700">
                    {t.feld}-Seminare
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] text-[17px] text-ink-700">
                    <ul className="space-y-2">{t.titel.map((item) => <li key={item.titel}>{item.slug ? <Link to="/leistungen/seminare/$slug" params={{ slug: item.slug }} className="text-brass-700 underline underline-offset-4">{item.titel}</Link> : item.titel}</li>)}</ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        <section className="mt-20" aria-labelledby="liste-title">
          <Reveal>
            <h2 id="liste-title" className="h2-display">
              Seminare mit ausgearbeitetem Programm
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Eine Reihe von Seminaren sind für 2027 fest ausgeschrieben. Alle weiteren Seminare führe ich als Inhouse-Format durch – den Termin stimmen wir gemeinsam ab.
            </p>
            <Link to="/seminare/termine" className="mt-3 inline-flex min-h-11 items-center font-semibold text-brass-700 underline underline-offset-4">Siehe offene Seminare 2027 Jan. – Mai →</Link>
          </Reveal>

          <SeminarListe termine={termineJeSeminar} />
        </section>

        <section className="mt-24" aria-labelledby="themenfeld-title">
          <Reveal>
            <h2 id="themenfeld-title" className="h2-display">
              Seminarprogramm nach Themenfeldern
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Diese Seminare rechne ich nach Format und Dauer ab, nicht nach Thema. Die
              Teilnehmerzahl ist begrenzt: maximal vier Personen.{" "}
              <Link
                to="/honorare"
                className="font-semibold text-brass-700 underline underline-offset-4"
              >
                Zur Honorarübersicht
              </Link>
            </p>
          </Reveal>

          <ThemenfeldListe termine={termineJeSeminar} />
        </section>

        <section className="mt-24" aria-labelledby="matrix-title">
          <Reveal>
            <h2 id="matrix-title" className="h2-display">
              Alle Themen im Überblick
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              Themen ohne eigene Seite führe ich auf Anfrage durch. Nennen Sie mir den Titel — ich
              melde mich mit einem Vorschlag.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROGRAMM_THEMENFELDER.map((spalte, i) => (
              <Reveal key={spalte.feld} delay={i * 70}>
                <div className="flex h-full flex-col rounded-lg border border-ink-200 bg-card p-6">
                  <h3 className="font-serif text-[21px] font-semibold text-bordeaux-900">
                    {spalte.feld}
                  </h3>
                  <ul role="list" className="mt-4 flex-1 space-y-2.5 text-[16px]">
                    {spalte.titel.map((t) => (
                      <li key={t.titel} className="leading-[1.5]">
                        {t.slug ? (
                          <Link
                            to="/leistungen/seminare/$slug"
                            params={{ slug: t.slug }}
                            className="text-ink-900 underline decoration-ink-200 underline-offset-4 hover:text-brass-700"
                          >
                            {t.titel}
                          </Link>
                        ) : (
                          <span className="text-ink-700">
                            {t.titel}{" "}
                            <span className="text-[13px] whitespace-nowrap text-ink-500">
                              · auf Anfrage
                            </span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghostBrand" className="mt-6 w-full">
                    <Link to="/kontakt" search={{ thema: `Themenfeld ${spalte.feld}` }}>
                      Thema anfragen
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-12 max-w-sm"><KontaktOrganisation /></div>
        <CtaBand text="Sie möchten eines dieser Seminare in Ihrem Haus durchführen? Dreißig Minuten Gespräch, kostenlos und unverbindlich." />
      </div>
    </>
  );
}

type FilterId = "alle" | "termin" | "absprache";

const FILTER: { id: FilterId; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "termin", label: "Mit Termin" },
  { id: "absprache", label: "Nach Absprache" },
];

const chip = (aktiv: boolean) =>
  aktiv
    ? "min-h-11 cursor-pointer rounded-lg border border-brass-600 bg-brass-600 px-4 text-[15px] font-semibold text-paper"
    : "min-h-11 cursor-pointer rounded-lg border border-ink-200 bg-card px-4 text-[15px] font-semibold text-ink-700 transition-colors hover:border-brass-600 hover:text-brass-700";

/** Kartenliste mit Filterleiste über den Terminstatus. */
function SeminarListe({ termine }: { termine: Record<string, Termin> }) {
  const [filter, setFilter] = useState<FilterId>("alle");
  const liste = SEMINARE_PROGRAMM.filter((s) =>
    filter === "alle" ? true : filter === "termin" ? !!termine[s.slug] : !termine[s.slug],
  );

  return (
    <>
      <Reveal delay={60}>
        <div role="group" aria-label="Seminare filtern" className="mt-8 flex flex-wrap gap-2">
          {FILTER.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={chip(filter === f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <ul
        role="list"
        className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 [&>*]:min-w-0 lg:grid-cols-2"
      >
        {liste.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={(i % 2) * 80}>
            <SeminarKarte seminar={s} {...(termine[s.slug] ? { termin: termine[s.slug]! } : {})} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}

const FELDER: Themenfeld[] = ["Strategie", "Führung", "Kommunikation", "Persönlichkeit"];

/** Die Seminare des Themenfeldprogramms, filterbar nach Themenfeld. */
function ThemenfeldListe({ termine }: { termine: Record<string, Termin> }) {
  const [feld, setFeld] = useState<Themenfeld | "alle">("alle");
  const liste = SEMINARE_THEMENFELD.filter((s) => feld === "alle" || s.themenfeld === feld);

  return (
    <>
      <Reveal delay={60}>
        <div
          role="group"
          aria-label="Nach Themenfeld filtern"
          className="mt-8 flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={feld === "alle"}
            onClick={() => setFeld("alle")}
            className={chip(feld === "alle")}
          >
            Alle Themenfelder
          </button>
          {FELDER.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={feld === f}
              onClick={() => setFeld(f)}
              className={chip(feld === f)}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {liste.length === 0 ? (
        <p className="mt-8 text-ink-700">
          In diesem Themenfeld liegt derzeit keine ausgearbeitete Seminarseite vor. Die Titel finden
          Sie in der Übersicht darunter.
        </p>
      ) : (
        <ul
          role="list"
          className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 [&>*]:min-w-0 lg:grid-cols-2"
        >
          {liste.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 80}>
              <SeminarKarte seminar={s} {...(termine[s.slug] ? { termin: termine[s.slug]! } : {})} />
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}

/** Eine Seminarkarte — identisch für beide Blöcke. */
function SeminarKarte({ seminar: s, termin }: { seminar: Seminar; termin?: Termin }) {
  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden break-words [overflow-wrap:anywhere] rounded-lg border border-ink-200 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <SeminarMotiv
        seminar={s.slug}
        mini
        className="pointer-events-none absolute top-3 right-3 size-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="flex flex-wrap items-center gap-3">
        {termin && (
          <span className="rounded-full bg-bordeaux-700 px-3 py-1 text-[13px] font-semibold tracking-wide text-paper uppercase">
            Offener Termin
          </span>
        )}
        {s.themenfeld && (
          <span className="rounded-full border border-ink-200 px-3 py-1 text-[13px] font-semibold text-ink-700">
            {s.themenfeld}
          </span>
        )}
        <span className="rounded-full border border-ink-200 px-3 py-1 text-[13px] font-semibold text-ink-700">auch Inhouse</span>
        <TerminChip {...(termin ? { termin } : {})} />
      </div>
      <h3 className="mt-4 font-serif text-[23px] leading-snug font-semibold text-bordeaux-900">
        <Link to="/leistungen/seminare/$slug" params={{ slug: s.slug }}>
          {s.title}
        </Link>
      </h3>
      <p className="mt-2 text-[16px] text-ink-500">{s.subtitle}</p>
      <p className="mt-4 flex-1 text-[16px] leading-[1.6] text-ink-700">{s.lead}</p>

      <dl className="mt-5 grid gap-x-6 gap-y-1 border-t border-ink-200 pt-4 text-[15px] sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="text-ink-500">Dauer:</dt>
          <dd className="font-semibold text-ink-900">{s.durationLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-500">Gruppe:</dt>
          <dd className="font-semibold text-ink-900">{s.groupLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-500">{s.honorarModell ? "Honorar:" : "Preis:"}</dt>
          <dd className="font-semibold text-ink-900">
            {s.honorarModell ? (
              <Link to="/honorare" className="text-brass-700 underline underline-offset-4">
                nach Format
              </Link>
            ) : (
              <>
                {preisLabel(s)}
                {s.priceEur !== null && (
                  <span className="ml-1 font-normal text-ink-500">{MWST_SUFFIX}</span>
                )}
              </>
            )}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-500">Zeiten:</dt>
          <dd className="font-semibold text-ink-900">{zeitenLabel(s)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button asChild variant="brass">
          <Link to="/leistungen/seminare/$slug" params={{ slug: s.slug }}>
            {termin ? "Platz verbindlich buchen" : "Termin anfragen"}
          </Link>
        </Button>
        {s.pdfUrl && (
          <a
            href={s.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-brass-700 underline underline-offset-4"
          >
            <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Programm als PDF{s.pdfSize ? ` (${s.pdfSize})` : ""}
          </a>
        )}
      </div>
    </article>
  );
}
