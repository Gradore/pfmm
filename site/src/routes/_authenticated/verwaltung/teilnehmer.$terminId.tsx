import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, Printer } from "lucide-react";
import { VERWALTUNG_HEAD } from "@/components/verwaltung/Shell";
import { Button } from "@/components/ui/button";
import { alleBuchungen, alleTermine } from "@/lib/verwaltung.functions";
import { FORMAT_LABEL, freiePlaetze, zeitraumLang } from "@/lib/buchung";
import { csvHerunterladen } from "@/lib/verwaltung-export";
import { seminarTitel } from "@/lib/seminar-titel";

export const Route = createFileRoute("/_authenticated/verwaltung/teilnehmer/$terminId")({
  head: () => VERWALTUNG_HEAD("Teilnehmerliste"),
  component: Teilnehmerliste,
});

function Teilnehmerliste() {
  const { terminId } = Route.useParams();
  const termineFn = alleTermine;
  const buchungenFn = alleBuchungen;

  const termine = useQuery({ queryKey: ["verwaltung", "termine"], queryFn: () => termineFn({}) });
  const buchungen = useQuery({
    queryKey: ["verwaltung", "buchungen"],
    queryFn: () => buchungenFn({}),
  });

  const termin = (termine.data ?? []).find((t) => t.id === terminId);
  const teilnehmende = (buchungen.data ?? []).filter(
    (b) => b.termin?.id === terminId && b.status === "bestaetigt",
  );

  if (termine.isPending || buchungen.isPending) {
    return <p className="container-page section-y text-ink-700">Wird geladen …</p>;
  }
  if (!termin) {
    return (
      <div className="container-page section-y">
        <p className="text-ink-700">Dieser Termin wurde nicht gefunden.</p>
        <Link to="/verwaltung/termine" className="font-semibold text-brass-700 underline">
          Zurück zu den Terminen
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-100 py-10 print:bg-paper print:py-0">
      <div className="container-page">
        <div className="flex flex-wrap gap-3 print:hidden">
          <Link
            to="/verwaltung/anmeldungen"
            className="inline-flex min-h-11 items-center font-semibold text-brass-700 underline"
          >
            Zurück zu den Anmeldungen
          </Link>
          <Button variant="ghostBrand" onClick={() => window.print()}>
            <Printer className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Drucken
          </Button>
          <Button
            variant="ghostBrand"
            onClick={() => csvHerunterladen(teilnehmende, "teilnehmerliste")}
          >
            <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
            CSV exportieren
          </Button>
        </div>

        <div className="mt-8 rounded-lg border border-ink-200 bg-card p-6 print:border-0 print:p-0">
          <h1 className="h3-display print:text-[22px]">
            Teilnehmerliste — {seminarTitel(termin.seminar_slug)}
          </h1>
          <p className="mt-2 text-[16px] text-ink-700">
            {zeitraumLang(termin.start_datum, termin.end_datum)} · {FORMAT_LABEL[termin.format]}
            {termin.ort ? ` · ${termin.ort}` : ""}
          </p>
          <p className="mt-1 text-[16px] text-ink-700">
            {teilnehmende.reduce((s, b) => s + b.anzahl_plaetze, 0)} bestätigte Plätze ·{" "}
            {freiePlaetze(termin)} frei von {termin.plaetze_gesamt}
          </p>

          <table className="mt-6 w-full border-collapse text-left text-[15px]">
            <caption className="sr-only">Bestätigte Teilnehmerinnen und Teilnehmer</caption>
            <thead>
              <tr className="border-b border-ink-900/40">
                <th scope="col" className="py-2 pr-3 font-semibold">Nr.</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Name</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Unternehmen</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Funktion</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Plätze</th>
                <th scope="col" className="py-2 font-semibold">Unterschrift</th>
              </tr>
            </thead>
            <tbody>
              {teilnehmende.map((b, i) => (
                <tr key={b.id} className="border-b border-ink-200 align-top">
                  <td className="py-3 pr-3">{i + 1}</td>
                  <td className="py-3 pr-3">
                    {b.nachname}, {b.vorname}
                  </td>
                  <td className="py-3 pr-3">{b.unternehmen ?? "—"}</td>
                  <td className="py-3 pr-3">{b.funktion ?? "—"}</td>
                  <td className="py-3 pr-3">{b.anzahl_plaetze}</td>
                  <td className="py-3">&nbsp;</td>
                </tr>
              ))}
              {Array.from({ length: freiePlaetze(termin) }).map((_, i) => (
                <tr key={`frei-${i}`} className="border-b border-ink-200">
                  <td className="py-3 pr-3">{teilnehmende.length + i + 1}</td>
                  <td className="py-3 pr-3 text-ink-500">frei</td>
                  <td className="py-3 pr-3">&nbsp;</td>
                  <td className="py-3 pr-3">&nbsp;</td>
                  <td className="py-3 pr-3">&nbsp;</td>
                  <td className="py-3">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-6 max-w-[68ch] text-[14px] text-ink-500">
            Diese Liste enthält personenbezogene Daten und darf ausschließlich für die
            Durchführung dieses Seminars verwendet werden.
          </p>
        </div>
      </div>
    </div>
  );
}
