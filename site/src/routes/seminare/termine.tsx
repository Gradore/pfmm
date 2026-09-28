import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand } from "@/components/site/CtaBand";
import { ladeOeffentlicheTermine, useOeffentlicheTermine } from "@/hooks/useTermine";
import { findSeminar } from "@/data/seminare";
import { FORMAT_LABEL, freiePlaetze, zeitraumLang, type Termin } from "@/lib/buchung";

export const Route = createFileRoute("/seminare/termine")({
  loader: async () => {
    try { return { termine: await ladeOeffentlicheTermine() }; }
    catch (error) { console.error(error); return { termine: [] as Termin[] }; }
  },
  head: () => ({ meta: [
    { title: "Termine & Anmeldung | Offene Seminare in Karben" },
    { name: "description", content: "Alle öffentlich ausgeschriebenen Seminartermine der Praxis für Management – Training in chronologischer Reihenfolge." },
    { property: "og:title", content: "Termine & Anmeldung | Offene Seminare in Karben" },
    { property: "og:description", content: "Alle öffentlich ausgeschriebenen Seminartermine in Karben." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/seminare/termine" },
  ], links: [{ rel: "canonical", href: "/seminare/termine" }] }),
  component: TerminePage,
});

function TerminePage() {
  const { termine: vorgerendert } = Route.useLoaderData();
  // Beim Aufruf im Browser aktuellen Stand nachladen (Belegung ändert sich laufend).
  const { data } = useOeffentlicheTermine(undefined, vorgerendert);
  const termine = data ?? vorgerendert;
  return <>
    <PageHeader crumbs={[{ label: "Offene Seminare", to: "/leistungen/seminare" }, { label: "Termine & Anmeldung" }]} eyebrow="Offene Seminare" title="Termine & Anmeldung" lead="Die Übersicht für 2027 wird laufend ergänzt." />
    <section className="container-page section-y" aria-label="Alle ausgeschriebenen Termine">
      {termine.length === 0 ? <p className="text-ink-700">Derzeit sind keine öffentlichen Termine ausgeschrieben. Weitere Termine werden hier veröffentlicht.</p> : <ul className="grid gap-5 md:grid-cols-2">{termine.map((t) => {
        const s = findSeminar(t.seminar_slug);
        const frei = freiePlaetze(t);
        return <li key={t.id} className="rounded-lg border border-ink-200 bg-card p-6 shadow-soft">
          <p className="eyebrow text-bordeaux-600">{zeitraumLang(t.start_datum, t.end_datum)} · {FORMAT_LABEL[t.format]}</p>
          <h2 className="mt-3 font-serif text-[24px] text-bordeaux-900">{s?.title ?? t.seminar_slug}</h2>
          <p className="mt-2 text-ink-700">{s?.durationLabel}{t.ort ? ` · ${t.ort}` : ""}</p>
          <p className="mt-1 text-ink-700">{t.honorar_hinweis ?? (s?.priceEur != null ? `${s.priceEur} € netto, zzgl. MwSt.` : "Preis auf Anfrage")}</p>
          <p className="mt-3 font-semibold text-ink-900">{frei === 0 ? "Ausgebucht · Warteliste möglich" : `Noch ${frei} von ${t.plaetze_gesamt} Plätzen frei`}</p>
          {s && <Link to="/leistungen/seminare/$slug" params={{ slug: s.slug }} hash="termine" className="mt-4 inline-flex min-h-11 items-center rounded-md bg-brass-600 px-5 font-semibold text-paper hover:bg-brass-700">Anmelden</Link>}
        </li>;
      })}</ul>}
    </section>
    <div className="container-page pb-12"><CtaBand /></div>
  </>;
}
