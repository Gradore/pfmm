import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { VerwaltungShell, VERWALTUNG_HEAD } from "@/components/verwaltung/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BUCHUNG_STATUS_LABEL,
  FORMAT_LABEL,
  buchungsReferenz,
  datumKurz,
  freiePlaetze,
  zeitraumKurz,
} from "@/lib/buchung";
import type { BuchungMitTermin } from "@/lib/buchung";
import {
  alleBuchungen,
  alleTermine,
  anfrageZuordnen,
  buchungLoeschen,
  buchungStatusSetzen,
} from "@/lib/verwaltung.functions";
import { seminarTitel } from "@/lib/seminar-titel";

export const Route = createFileRoute("/_authenticated/verwaltung/anfragen")({
  head: () => VERWALTUNG_HEAD("Terminanfragen"),
  component: Anfragen,
});

function passt(b: BuchungMitTermin, suche: string): boolean {
  const s = suche.trim().toLowerCase();
  if (!s) return true;
  return [b.vorname, b.nachname, b.unternehmen, b.email].some((w) =>
    (w ?? "").toLowerCase().includes(s),
  );
}

function Anfragen() {
  const buchungenFn = alleBuchungen;
  const termineFn = alleTermine;
  const statusFn = buchungStatusSetzen;
  const zuordnenFn = anfrageZuordnen;
  const loeschenFn = buchungLoeschen;
  const queryClient = useQueryClient();

  const [suche, setSuche] = useState("");
  const [notiz, setNotiz] = useState<Record<string, string>>({});
  const [fehler, setFehler] = useState<string | null>(null);

  const buchungen = useQuery({
    queryKey: ["verwaltung", "buchungen"],
    queryFn: () => buchungenFn({}),
  });
  const termine = useQuery({ queryKey: ["verwaltung", "termine"], queryFn: () => termineFn({}) });

  function aktualisieren() {
    void queryClient.invalidateQueries({ queryKey: ["verwaltung"] });
    void queryClient.invalidateQueries({ queryKey: ["termine"] });
  }

  const status = useMutation({
    mutationFn: (v: {
      ids: string[];
      status: "erledigt" | "abgelehnt" | "angefragt";
      notiz?: string;
    }) => statusFn({ data: v }),
    onSuccess: aktualisieren,
    onError: (e: unknown) => setFehler(e instanceof Error ? e.message : "Aktion nicht möglich."),
  });
  const zuordnen = useMutation({
    mutationFn: (v: { id: string; termin_id: string }) => zuordnenFn({ data: v }),
    onSuccess: aktualisieren,
    onError: (e: unknown) =>
      setFehler(e instanceof Error ? e.message : "Zuordnung nicht möglich."),
  });
  const loeschen = useMutation({
    mutationFn: (id: string) => loeschenFn({ data: { id } }),
    onSuccess: aktualisieren,
  });

  const heute = new Date().toISOString().slice(0, 10);
  const offeneTermine = (termine.data ?? []).filter(
    (t) => t.end_datum >= heute && t.status !== "abgesagt",
  );
  const liste = useMemo(
    () => (buchungen.data ?? []).filter((b) => b.art === "terminanfrage" && passt(b, suche)),
    [buchungen.data, suche],
  );

  return (
    <VerwaltungShell titel="Terminanfragen">
      <p className="max-w-[68ch] text-[16px] leading-[1.65] text-ink-700">
        Unverbindliche Anfragen ohne Termin. Eine Zuordnung zu einem Termin macht daraus eine
        Anmeldung und belegt Plätze.
      </p>

      <div className="mt-6 max-w-[420px] print:hidden">
        <label htmlFor="anf-suche" className="text-[15px] text-ink-500">
          Suche nach Name, Unternehmen oder E-Mail
        </label>
        <Input
          id="anf-suche"
          className="mt-1 min-h-11"
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
        />
      </div>

      {fehler && (
        <p role="alert" className="mt-6 text-[16px] font-semibold text-bordeaux-700">
          {fehler}
        </p>
      )}

      {buchungen.isPending ? (
        <p className="mt-8 text-ink-700">Wird geladen …</p>
      ) : liste.length === 0 ? (
        <p className="mt-8 text-ink-700">Es liegen keine Terminanfragen vor.</p>
      ) : (
        <ul role="list" className="mt-8 grid gap-4">
          {liste.map((b) => (
            <li key={b.id} className="rounded-lg border border-ink-200 bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-[17px] font-semibold text-ink-900">
                  {b.vorname} {b.nachname}
                  {b.unternehmen ? ` · ${b.unternehmen}` : ""}
                </p>
                <p className="text-[15px] text-ink-500">
                  {buchungsReferenz(b.id)} · {datumKurz(b.created_at)} ·{" "}
                  {BUCHUNG_STATUS_LABEL[b.status]}
                </p>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-[15px] text-ink-700 sm:grid-cols-2">
                <div>
                  <dt className="inline text-ink-500">Seminar: </dt>
                  <dd className="inline">{seminarTitel(b.seminar_slug)}</dd>
                </div>
                <div>
                  <dt className="inline text-ink-500">Wunschzeitraum: </dt>
                  <dd className="inline">{b.wunsch_zeitraum ?? "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-ink-500">Format: </dt>
                  <dd className="inline">
                    {b.wunsch_format ? FORMAT_LABEL[b.wunsch_format] : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-ink-500">Personen: </dt>
                  <dd className="inline">{b.anzahl_personen ?? "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-ink-500">Kontakt: </dt>
                  <dd className="inline [overflow-wrap:anywhere]">
                    {b.email}
                    {b.telefon ? ` · ${b.telefon}` : ""}
                  </dd>
                </div>
              </dl>
              {b.nachricht && (
                <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-ink-700">
                  „{b.nachricht}“
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-end gap-3 print:hidden">
                <div>
                  <label
                    htmlFor={`zu-${b.id}`}
                    className="block text-[15px] text-ink-500"
                  >
                    Einem Termin zuordnen
                  </label>
                  <select
                    id={`zu-${b.id}`}
                    className="mt-1 min-h-11 rounded-lg border border-ink-200 bg-card px-3 text-[16px]"
                    defaultValue=""
                    onChange={(e) => {
                      if (!e.target.value) return;
                      zuordnen.mutate({ id: b.id, termin_id: e.target.value });
                    }}
                  >
                    <option value="">Bitte wählen</option>
                    {offeneTermine.map((t) => (
                      <option key={t.id} value={t.id}>
                        {seminarTitel(t.seminar_slug)} ·{" "}
                        {zeitraumKurz(t.start_datum, t.end_datum)} · {freiePlaetze(t)} frei
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghostBrand"
                  onClick={() => status.mutate({ ids: [b.id], status: "erledigt" })}
                >
                  Als erledigt markieren
                </Button>
                <div>
                  <label htmlFor={`ab-${b.id}`} className="block text-[15px] text-ink-500">
                    Ablehnungsgrund
                  </label>
                  <Input
                    id={`ab-${b.id}`}
                    className="mt-1 min-h-11 w-[240px]"
                    value={notiz[b.id] ?? ""}
                    onChange={(e) => setNotiz({ ...notiz, [b.id]: e.target.value })}
                  />
                </div>
                <Button
                  variant="ghostBrand"
                  onClick={() =>
                    status.mutate({
                      ids: [b.id],
                      status: "abgelehnt",
                      notiz: notiz[b.id] ?? "Abgelehnt",
                    })
                  }
                >
                  Ablehnen
                </Button>
                <Button
                  variant="ghostBrand"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Terminanfrage von ${b.vorname} ${b.nachname} (${b.email}) endgültig löschen? Alle personenbezogenen Angaben dieser Anfrage werden entfernt.`,
                      )
                    ) {
                      loeschen.mutate(b.id);
                    }
                  }}
                >
                  Löschen
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </VerwaltungShell>
  );
}
