import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { VerwaltungShell, VERWALTUNG_HEAD } from "@/components/verwaltung/Shell";
import { alleTermine, alleBuchungen } from "@/lib/verwaltung.functions";
import {
  BUCHUNG_STATUS_LABEL,
  FORMAT_LABEL,
  TERMIN_STATUS_LABEL,
  datumKurz,
  freiePlaetze,
  zeitraumKurz,
} from "@/lib/buchung";
import { seminarTitel } from "@/lib/seminar-titel";

export const Route = createFileRoute("/_authenticated/verwaltung/")({
  head: () => VERWALTUNG_HEAD("Übersicht"),
  component: Uebersicht,
});

function Uebersicht() {
  const termineFn = alleTermine;
  const buchungenFn = alleBuchungen;
  const termine = useQuery({ queryKey: ["verwaltung", "termine"], queryFn: () => termineFn({}) });
  const buchungen = useQuery({
    queryKey: ["verwaltung", "buchungen"],
    queryFn: () => buchungenFn({}),
  });

  const heute = new Date().toISOString().slice(0, 10);
  const alleT = termine.data ?? [];
  const alleB = buchungen.data ?? [];
  const kommend = alleT.filter((t) => t.end_datum >= heute && t.status !== "abgesagt");
  const kommendeIds = new Set(kommend.map((t) => t.id));

  const offeneAnmeldungen = alleB.filter(
    (b) => b.art === "anmeldung" && b.status === "angefragt",
  ).length;
  const bestaetigtePlaetze = alleB
    .filter((b) => b.status === "bestaetigt" && b.termin && kommendeIds.has(b.termin.id))
    .reduce((s, b) => s + b.anzahl_plaetze, 0);
  const warteliste = alleB.filter((b) => b.status === "warteliste").length;
  const offeneAnfragen = alleB.filter(
    (b) => b.art === "terminanfrage" && b.status === "angefragt",
  ).length;

  const kennzahlen = [
    { label: "Offene Anmeldungen", wert: offeneAnmeldungen },
    { label: "Bestätigte Plätze (kommend)", wert: bestaetigtePlaetze },
    { label: "Auf Warteliste", wert: warteliste },
    { label: "Offene Terminanfragen", wert: offeneAnfragen },
  ];

  return (
    <VerwaltungShell titel="Übersicht">
      {(termine.error ?? buchungen.error) && (
        <p role="alert" className="text-[16px] font-semibold text-bordeaux-700">
          Daten konnten nicht geladen werden. Vermutlich fehlt Ihrem Konto die Administratorrolle.
        </p>
      )}

      <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kennzahlen.map((k) => (
          <li key={k.label} className="rounded-lg border border-ink-200 bg-card p-6">
            <p className="text-[16px] text-ink-500">{k.label}</p>
            <p className="mt-1 font-serif text-[36px] leading-none text-bordeaux-900">{k.wert}</p>
          </li>
        ))}
      </ul>

      <h2 className="h3-display mt-12">Kommende Termine</h2>
      {termine.isPending ? (
        <p className="mt-4 text-ink-700">Wird geladen …</p>
      ) : kommend.length === 0 ? (
        <p className="mt-4 text-ink-700">
          Es sind keine kommenden Termine angelegt.{" "}
          <Link to="/verwaltung/termine" className="font-semibold text-brass-700 underline">
            Termin anlegen
          </Link>
        </p>
      ) : (
        <ul role="list" className="mt-6 grid gap-4">
          {kommend.map((t) => {
            const anteil = Math.min(
              100,
              Math.round((t.plaetze_belegt / Math.max(t.plaetze_gesamt, 1)) * 100),
            );
            return (
              <li key={t.id} className="rounded-lg border border-ink-200 bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[17px] font-semibold text-ink-900 [overflow-wrap:anywhere]">
                    {t.titel_zusatz ?? seminarTitel(t.seminar_slug)}
                  </p>
                  <p className="text-[15px] text-ink-500">
                    {zeitraumKurz(t.start_datum, t.end_datum)} · {FORMAT_LABEL[t.format]} ·{" "}
                    {TERMIN_STATUS_LABEL[t.status]}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-2 w-full overflow-hidden rounded-full bg-ink-200"
                >
                  <span
                    className="block h-full rounded-full bg-bordeaux-600"
                    style={{ width: `${Math.max(anteil, 2)}%` }}
                  />
                </span>
                <p className="mt-2 text-[15px] text-ink-700">
                  {t.plaetze_belegt} von {t.plaetze_gesamt} Plätzen belegt · {freiePlaetze(t)} frei
                </p>
                <p className="mt-3">
                  <Link
                    to="/verwaltung/teilnehmer/$terminId"
                    params={{ terminId: t.id }}
                    className="font-semibold text-brass-700 underline"
                  >
                    Teilnehmerliste öffnen
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      )}

      <h2 className="h3-display mt-12">Zuletzt eingegangen</h2>
      <ul role="list" className="mt-6 grid gap-3">
        {alleB.slice(0, 10).map((b) => (
          <li
            key={b.id}
            className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-ink-200 bg-card p-4"
          >
            <span className="text-[17px] font-semibold text-ink-900">
              {b.vorname} {b.nachname}
            </span>
            <span className="text-[15px] text-ink-500">
              {seminarTitel(b.termin?.seminar_slug ?? b.seminar_slug)} ·{" "}
              {b.art === "anmeldung" ? "Anmeldung" : "Terminanfrage"} ·{" "}
              {BUCHUNG_STATUS_LABEL[b.status]} · {datumKurz(b.created_at)}
            </span>
            <Link
              to={b.art === "anmeldung" ? "/verwaltung/anmeldungen" : "/verwaltung/anfragen"}
              className="text-[15px] font-semibold text-brass-700 underline"
            >
              Öffnen
            </Link>
          </li>
        ))}
      </ul>
    </VerwaltungShell>
  );
}
