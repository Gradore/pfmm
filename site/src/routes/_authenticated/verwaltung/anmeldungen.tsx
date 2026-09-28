import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { VerwaltungShell, VERWALTUNG_HEAD } from "@/components/verwaltung/Shell";
import { AnmeldungDetail } from "@/components/verwaltung/AnmeldungDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { alleBuchungen, buchungStatusSetzen } from "@/lib/verwaltung.functions";
import { BUCHUNG_STATUS_LABEL, buchungsReferenz, datumKurz, zeitraumKurz } from "@/lib/buchung";
import type { BuchungMitTermin, BuchungStatus } from "@/lib/buchung";
import { csvHerunterladen } from "@/lib/verwaltung-export";
import { seminarTitel } from "@/lib/seminar-titel";

export const Route = createFileRoute("/_authenticated/verwaltung/anmeldungen")({
  head: () => VERWALTUNG_HEAD("Anmeldungen"),
  component: Anmeldungen,
});

const STATUS: BuchungStatus[] = ["angefragt", "bestaetigt", "warteliste", "storniert"];

function passt(b: BuchungMitTermin, suche: string): boolean {
  const s = suche.trim().toLowerCase();
  if (!s) return true;
  return [b.vorname, b.nachname, b.unternehmen, b.email].some((w) =>
    (w ?? "").toLowerCase().includes(s),
  );
}

function Anmeldungen() {
  const listeFn = alleBuchungen;
  const statusFn = buchungStatusSetzen;
  const queryClient = useQueryClient();
  const [filterTermin, setFilterTermin] = useState("alle");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [suche, setSuche] = useState("");
  const [auswahl, setAuswahl] = useState<string[]>([]);
  const [offen, setOffen] = useState<string | null>(null);

  const liste = useQuery({ queryKey: ["verwaltung", "buchungen"], queryFn: () => listeFn({}) });

  const setzen = useMutation({
    mutationFn: (v: { ids: string[]; status: BuchungStatus }) => statusFn({ data: v }),
    onSuccess: () => {
      setAuswahl([]);
      void queryClient.invalidateQueries({ queryKey: ["verwaltung"] });
      void queryClient.invalidateQueries({ queryKey: ["termine"] });
    },
  });

  const alle = (liste.data ?? []).filter((b) => b.art === "anmeldung");
  const termine = useMemo(() => {
    const map = new Map<string, string>();
    alle.forEach((b) => {
      if (b.termin) {
        map.set(
          b.termin.id,
          `${seminarTitel(b.termin.seminar_slug)} · ${zeitraumKurz(b.termin.start_datum, b.termin.end_datum)}`,
        );
      }
    });
    return [...map.entries()];
  }, [alle]);

  const gefiltert = alle.filter(
    (b) =>
      (filterTermin === "alle" || b.termin?.id === filterTermin) &&
      (filterStatus === "alle" || b.status === filterStatus) &&
      passt(b, suche),
  );

  const auswahlBar =
    "mt-1 block min-h-11 rounded-lg border border-ink-200 bg-card px-3 text-[16px]";

  return (
    <VerwaltungShell titel="Anmeldungen">
      <div className="flex flex-wrap items-end gap-4 print:hidden">
        <div>
          <label htmlFor="f-termin" className="text-[15px] text-ink-500">
            Termin
          </label>
          <select
            id="f-termin"
            className={auswahlBar}
            value={filterTermin}
            onChange={(e) => setFilterTermin(e.target.value)}
          >
            <option value="alle">Alle Termine</option>
            {termine.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-status" className="text-[15px] text-ink-500">
            Status
          </label>
          <select
            id="f-status"
            className={auswahlBar}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="alle">Alle</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {BUCHUNG_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-suche" className="text-[15px] text-ink-500">
            Suche
          </label>
          <Input
            id="f-suche"
            className="mt-1 min-h-11 w-[240px]"
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
          />
        </div>
        <Button variant="ghostBrand" onClick={() => csvHerunterladen(gefiltert, "anmeldungen")}>
          <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
          CSV exportieren
        </Button>
        {auswahl.length > 0 && (
          <Button
            variant="brass"
            disabled={setzen.isPending}
            onClick={() => setzen.mutate({ ids: auswahl, status: "bestaetigt" })}
          >
            {auswahl.length} Auswahl bestätigen
          </Button>
        )}
      </div>

      {liste.isPending ? (
        <p className="mt-8 text-ink-700">Wird geladen …</p>
      ) : gefiltert.length === 0 ? (
        <p className="mt-8 text-ink-700">Es liegen keine Anmeldungen vor.</p>
      ) : (
        <ul role="list" className="mt-8 grid gap-3">
          {gefiltert.map((b) => (
            <li key={b.id} className="overflow-hidden rounded-lg border border-ink-200 bg-card">
              <div className="grid gap-3 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <label className="flex min-h-11 items-center gap-2 text-[15px] text-ink-500 print:hidden">
                  <input
                    type="checkbox"
                    className="size-5 accent-[hsl(var(--brass-600))]"
                    checked={auswahl.includes(b.id)}
                    onChange={(e) =>
                      setAuswahl(
                        e.target.checked
                          ? [...auswahl, b.id]
                          : auswahl.filter((i) => i !== b.id),
                      )
                    }
                  />
                  <span className="sr-only">
                    {b.vorname} {b.nachname} auswählen
                  </span>
                </label>
                <div>
                  <p className="text-[17px] font-semibold text-ink-900 [overflow-wrap:anywhere]">
                    {b.vorname} {b.nachname}
                    {b.unternehmen ? ` · ${b.unternehmen}` : ""}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-500 [overflow-wrap:anywhere]">
                    {b.email}
                    {b.telefon ? ` · ${b.telefon}` : ""} · {b.anzahl_plaetze}{" "}
                    {b.anzahl_plaetze === 1 ? "Platz" : "Plätze"} · Eingang{" "}
                    {datumKurz(b.created_at)} · {buchungsReferenz(b.id)}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    {b.termin ? (
                      <>
                        {seminarTitel(b.termin.seminar_slug)} ·{" "}
                        {zeitraumKurz(b.termin.start_datum, b.termin.end_datum)}
                      </>
                    ) : (
                      seminarTitel(b.seminar_slug)
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 print:hidden">
                  <select
                    aria-label={`Status von ${b.vorname} ${b.nachname}`}
                    className="min-h-11 rounded-lg border border-ink-200 bg-card px-2 text-[16px]"
                    value={b.status}
                    onChange={(e) =>
                      setzen.mutate({ ids: [b.id], status: e.target.value as BuchungStatus })
                    }
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {BUCHUNG_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="ghostBrand"
                    aria-expanded={offen === b.id}
                    onClick={() => setOffen(offen === b.id ? null : b.id)}
                  >
                    {offen === b.id ? "Details schließen" : "Details"}
                  </Button>
                </div>
              </div>
              {offen === b.id && <AnmeldungDetail buchung={b} />}
            </li>
          ))}
        </ul>
      )}

      {filterTermin !== "alle" && (
        <p className="mt-8 print:hidden">
          <Link
            to="/verwaltung/teilnehmer/$terminId"
            params={{ terminId: filterTermin }}
            className="font-semibold text-brass-700 underline"
          >
            Teilnehmerliste dieses Termins zum Drucken
          </Link>
        </p>
      )}
    </VerwaltungShell>
  );
}
