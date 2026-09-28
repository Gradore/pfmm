import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { VerwaltungShell, VERWALTUNG_HEAD } from "@/components/verwaltung/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  alleTermine,
  terminAbsagen,
  terminLoeschen,
  terminSpeichern,
} from "@/lib/verwaltung.functions";
import { FORMAT_LABEL, TERMIN_STATUS_LABEL, zeitraumKurz } from "@/lib/buchung";
import type { Termin, TerminFormat, TerminStatus } from "@/lib/buchung";
import { SEMINARE } from "@/data/seminare";
import { seminarTitel } from "@/lib/seminar-titel";

export const Route = createFileRoute("/_authenticated/verwaltung/termine")({
  head: () => VERWALTUNG_HEAD("Termine"),
  component: TermineVerwalten,
});

type Entwurf = {
  id?: string;
  seminar_slug: string;
  titel_zusatz: string;
  start_datum: string;
  end_datum: string;
  format: TerminFormat;
  ort: string;
  plaetze_gesamt: number;
  status: TerminStatus;
  honorar_hinweis: string;
  oeffentlich: boolean;
  notiz: string;
};

const LEER: Entwurf = {
  seminar_slug: SEMINARE[0]?.slug ?? "",
  titel_zusatz: "",
  start_datum: "",
  end_datum: "",
  format: "praesenz",
  ort: "Karben",
  plaetze_gesamt: 4,
  status: "offen",
  honorar_hinweis: "",
  oeffentlich: true,
  notiz: "",
};

function ausTermin(t: Termin): Entwurf {
  return {
    id: t.id,
    seminar_slug: t.seminar_slug,
    titel_zusatz: t.titel_zusatz ?? "",
    start_datum: t.start_datum,
    end_datum: t.end_datum,
    format: t.format,
    ort: t.ort ?? "",
    plaetze_gesamt: t.plaetze_gesamt,
    status: t.status,
    honorar_hinweis: t.honorar_hinweis ?? "",
    oeffentlich: t.oeffentlich,
    notiz: t.notiz ?? "",
  };
}

const select =
  "mt-1 min-h-11 w-full rounded-lg border border-ink-200 bg-card px-3 text-[16px] text-ink-900";

function TermineVerwalten() {
  const listeFn = alleTermine;
  const speichernFn = terminSpeichern;
  const absagenFn = terminAbsagen;
  const loeschenFn = terminLoeschen;
  const queryClient = useQueryClient();
  const [entwurf, setEntwurf] = useState<Entwurf | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [filterSeminar, setFilterSeminar] = useState("alle");
  const [filterStatus, setFilterStatus] = useState("alle");

  const liste = useQuery({ queryKey: ["verwaltung", "termine"], queryFn: () => listeFn({}) });

  const speichern = useMutation({
    mutationFn: (e: Entwurf) => speichernFn({ data: e }),
    onSuccess: () => {
      setEntwurf(null);
      setFehler(null);
      void queryClient.invalidateQueries({ queryKey: ["verwaltung"] });
      void queryClient.invalidateQueries({ queryKey: ["termine"] });
    },
    onError: (e: unknown) =>
      setFehler(e instanceof Error ? e.message : "Speichern nicht möglich."),
  });

  function aktualisieren() {
    setFehler(null);
    void queryClient.invalidateQueries({ queryKey: ["verwaltung"] });
    void queryClient.invalidateQueries({ queryKey: ["termine"] });
  }

  const absagen = useMutation({
    mutationFn: (v: { id: string; buchungenStornieren: boolean }) => absagenFn({ data: v }),
    onSuccess: aktualisieren,
    onError: (e: unknown) => setFehler(e instanceof Error ? e.message : "Absage nicht möglich."),
  });

  const loeschen = useMutation({
    mutationFn: (id: string) => loeschenFn({ data: { id } }),
    onSuccess: aktualisieren,
    onError: (e: unknown) => setFehler(e instanceof Error ? e.message : "Löschen nicht möglich."),
  });

  const heute = new Date().toISOString().slice(0, 10);

  return (
    <VerwaltungShell titel="Termine">
      <Button variant="brass" onClick={() => setEntwurf(LEER)}>
        Neuen Termin anlegen
      </Button>

      {entwurf && (
        <form
          className="mt-8 grid gap-4 rounded-lg border border-ink-200 bg-card p-6 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            speichern.mutate(entwurf);
          }}
        >
          <div className="sm:col-span-2">
            <Label htmlFor="t-seminar">Seminar</Label>
            <select
              id="t-seminar"
              className={select}
              value={entwurf.seminar_slug}
              onChange={(e) => setEntwurf({ ...entwurf, seminar_slug: e.target.value })}
            >
              {SEMINARE.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="t-zusatz">Titelzusatz (optional)</Label>
            <Input
              id="t-zusatz"
              className="mt-1 min-h-11"
              value={entwurf.titel_zusatz}
              onChange={(e) => setEntwurf({ ...entwurf, titel_zusatz: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="t-start">Beginn</Label>
            <Input
              id="t-start"
              type="date"
              required
              className="mt-1 min-h-11"
              value={entwurf.start_datum}
              onChange={(e) => setEntwurf({ ...entwurf, start_datum: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="t-ende">Ende</Label>
            <Input
              id="t-ende"
              type="date"
              required
              className="mt-1 min-h-11"
              value={entwurf.end_datum}
              onChange={(e) => setEntwurf({ ...entwurf, end_datum: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="t-format">Format</Label>
            <select
              id="t-format"
              className={select}
              value={entwurf.format}
              onChange={(e) =>
                setEntwurf({ ...entwurf, format: e.target.value as TerminFormat })
              }
            >
              {Object.entries(FORMAT_LABEL).map(([w, l]) => (
                <option key={w} value={w}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="t-ort">Ort</Label>
            <Input
              id="t-ort"
              className="mt-1 min-h-11"
              value={entwurf.ort}
              onChange={(e) => setEntwurf({ ...entwurf, ort: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="t-plaetze">Plätze gesamt</Label>
            <Input
              id="t-plaetze"
              type="number"
              min={1}
              className="mt-1 min-h-11"
              value={entwurf.plaetze_gesamt}
              onChange={(e) =>
                setEntwurf({ ...entwurf, plaetze_gesamt: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="t-status">Status</Label>
            <select
              id="t-status"
              className={select}
              value={entwurf.status}
              onChange={(e) =>
                setEntwurf({ ...entwurf, status: e.target.value as TerminStatus })
              }
            >
              {Object.entries(TERMIN_STATUS_LABEL).map(([w, l]) => (
                <option key={w} value={w}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="t-honorar">Honorarhinweis</Label>
            <Input
              id="t-honorar"
              className="mt-1 min-h-11"
              placeholder="z. B. 575 € zzgl. gesetzl. MwSt."
              value={entwurf.honorar_hinweis}
              onChange={(e) => setEntwurf({ ...entwurf, honorar_hinweis: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="t-notiz">Interne Notiz</Label>
            <Textarea
              id="t-notiz"
              rows={3}
              className="mt-1"
              value={entwurf.notiz}
              onChange={(e) => setEntwurf({ ...entwurf, notiz: e.target.value })}
            />
          </div>
          <label className="flex min-h-11 items-center gap-3 text-[16px] text-ink-700 sm:col-span-2">
            <input
              type="checkbox"
              className="size-5 accent-[hsl(var(--brass-600))]"
              checked={entwurf.oeffentlich}
              onChange={(e) => setEntwurf({ ...entwurf, oeffentlich: e.target.checked })}
            />
            Auf der Website anzeigen
          </label>

          {fehler && (
            <p role="alert" className="text-[16px] font-semibold text-bordeaux-700 sm:col-span-2">
              {fehler}
            </p>
          )}

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button type="submit" variant="brass" disabled={speichern.isPending}>
              {speichern.isPending ? "Wird gespeichert …" : "Speichern"}
            </Button>
            <Button type="button" variant="ghostBrand" onClick={() => setEntwurf(null)}>
              Abbrechen
            </Button>
          </div>
        </form>
      )}

      <div className="mt-12 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="f-seminar" className="text-[15px] text-ink-500">
            Seminar
          </label>
          <select
            id="f-seminar"
            className={select}
            value={filterSeminar}
            onChange={(e) => setFilterSeminar(e.target.value)}
          >
            <option value="alle">Alle Seminare</option>
            {SEMINARE.map((s2) => (
              <option key={s2.slug} value={s2.slug}>
                {s2.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-tstatus" className="text-[15px] text-ink-500">
            Status
          </label>
          <select
            id="f-tstatus"
            className={select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="alle">Alle</option>
            {Object.entries(TERMIN_STATUS_LABEL).map(([w, l]) => (
              <option key={w} value={w}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {liste.isPending ? (
        <p className="mt-6 text-ink-700">Wird geladen …</p>
      ) : (
        (() => {
          const gefiltert = (liste.data ?? []).filter(
            (t) =>
              (filterSeminar === "alle" || t.seminar_slug === filterSeminar) &&
              (filterStatus === "alle" || t.status === filterStatus),
          );
          const kommend = gefiltert.filter((t) => t.end_datum >= heute);
          const vergangen = gefiltert.filter((t) => t.end_datum < heute);

          const karte = (t: Termin) => (
            <li key={t.id} className="rounded-lg border border-ink-200 bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-[17px] font-semibold text-ink-900 [overflow-wrap:anywhere]">
                  {seminarTitel(t.seminar_slug)}
                  {t.titel_zusatz ? ` — ${t.titel_zusatz}` : ""}
                </p>
                <p className="text-[15px] text-ink-500">
                  {zeitraumKurz(t.start_datum, t.end_datum)} · {FORMAT_LABEL[t.format]} ·{" "}
                  {TERMIN_STATUS_LABEL[t.status]} · {t.plaetze_belegt}/{t.plaetze_gesamt} ·{" "}
                  {t.oeffentlich ? "sichtbar" : "nicht sichtbar"}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="ghostBrand" onClick={() => setEntwurf(ausTermin(t))}>
                  Bearbeiten
                </Button>
                <Button
                  variant="ghostBrand"
                  onClick={() => {
                    const kopie = ausTermin(t);
                    delete kopie.id;
                    setEntwurf({ ...kopie, status: "geplant", oeffentlich: false });
                  }}
                >
                  Duplizieren
                </Button>
                <Link
                  to="/verwaltung/teilnehmer/$terminId"
                  params={{ terminId: t.id }}
                  className="inline-flex min-h-11 items-center px-2 font-semibold text-brass-700 underline"
                >
                  Teilnehmerliste
                </Link>
                {t.plaetze_belegt > 0 ? (
                  <Button
                    variant="ghostBrand"
                    onClick={() => {
                      const alleStornieren = window.confirm(
                        `Diesen Termin absagen. Betroffen sind ${t.plaetze_belegt} gebuchte Plätze. OK: alle zugehörigen Anmeldungen zugleich stornieren (ohne Gebühr). Abbrechen: nur den Termin absagen.`,
                      );
                      absagen.mutate({ id: t.id, buchungenStornieren: alleStornieren });
                    }}
                  >
                    Absagen
                  </Button>
                ) : (
                  <Button
                    variant="ghostBrand"
                    onClick={() => {
                      if (window.confirm("Diesen Termin löschen?")) loeschen.mutate(t.id);
                    }}
                  >
                    Löschen
                  </Button>
                )}
              </div>
            </li>
          );

          return (
            <>
              <h2 className="h3-display mt-8">Kommende Termine</h2>
              {kommend.length === 0 ? (
                <p className="mt-4 text-ink-700">Keine kommenden Termine.</p>
              ) : (
                <ul role="list" className="mt-6 grid gap-4">
                  {kommend.map(karte)}
                </ul>
              )}

              {vergangen.length > 0 && (
                <details className="mt-10 rounded-lg border border-ink-200 bg-card p-5">
                  <summary className="min-h-11 cursor-pointer text-[17px] font-semibold text-bordeaux-900">
                    Vergangene Termine ({vergangen.length})
                  </summary>
                  <ul role="list" className="mt-6 grid gap-4">
                    {vergangen.map(karte)}
                  </ul>
                </details>
              )}
            </>
          );
        })()
      )}

    </VerwaltungShell>
  );
}
