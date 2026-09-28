import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BUCHUNG_STATUS_LABEL, buchungsReferenz, datumKurz } from "@/lib/buchung";
import type { BuchungMitTermin } from "@/lib/buchung";
import { berechneStorno, STORNO_AUSLEGUNG_HINWEIS, STORNO_ERSATZ_HINWEIS } from "@/lib/storno";
import {
  buchungLoeschen,
  buchungNotiz,
  buchungStatusSetzen,
  buchungVerlauf,
} from "@/lib/verwaltung.functions";

/** Aufklappbarer Detailbereich einer Anmeldung: Storno, Notiz, Verlauf, Löschung. */
export function AnmeldungDetail({ buchung }: { buchung: BuchungMitTermin }) {
  const statusFn = buchungStatusSetzen;
  const notizFn = buchungNotiz;
  const loeschenFn = buchungLoeschen;
  const verlaufFn = buchungVerlauf;
  const queryClient = useQueryClient();

  const berechnet = buchung.termin ? berechneStorno(buchung.termin.start_datum) : null;
  const [prozent, setProzent] = useState<number>(berechnet?.prozent ?? 0);
  const [grund, setGrund] = useState("");
  const [notiz, setNotiz] = useState(buchung.notiz_intern ?? "");
  const [fehler, setFehler] = useState<string | null>(null);

  const verlauf = useQuery({
    queryKey: ["verwaltung", "verlauf", buchung.id],
    queryFn: () => verlaufFn({ data: { id: buchung.id } }),
  });

  function aktualisieren() {
    void queryClient.invalidateQueries({ queryKey: ["verwaltung"] });
    void queryClient.invalidateQueries({ queryKey: ["termine"] });
  }

  const stornieren = useMutation({
    mutationFn: () =>
      statusFn({
        data: {
          ids: [buchung.id],
          status: "storniert",
          stornoStufe: prozent,
          stornoGrund:
            grund ||
            (berechnet && prozent !== berechnet.prozent
              ? `Abweichend von der berechneten Stufe (${berechnet.prozent} %).`
              : ""),
        },
      }),
    onSuccess: aktualisieren,
    onError: (e: unknown) => setFehler(e instanceof Error ? e.message : "Storno nicht möglich."),
  });

  const notizSpeichern = useMutation({
    mutationFn: () => notizFn({ data: { id: buchung.id, notiz } }),
    onSuccess: aktualisieren,
  });

  const loeschen = useMutation({
    mutationFn: () => loeschenFn({ data: { id: buchung.id } }),
    onSuccess: aktualisieren,
  });

  return (
    <div className="grid gap-6 border-t border-ink-200 bg-ink-100/60 p-5 text-[15px] print:hidden">
      <section>
        <h3 className="text-[16px] font-semibold text-bordeaux-900">Stornierung</h3>
        {berechnet ? (
          <>
            <p className="mt-2 text-ink-700">{berechnet.satz}</p>
            <p className="mt-1 text-ink-500">{STORNO_ERSATZ_HINWEIS}</p>
            <p className="mt-1 max-w-[68ch] text-ink-500">{STORNO_AUSLEGUNG_HINWEIS}</p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor={`p-${buchung.id}`} className="block text-ink-500">
                  Stufe in Prozent
                </label>
                <Input
                  id={`p-${buchung.id}`}
                  type="number"
                  min={0}
                  max={100}
                  className="mt-1 min-h-11 w-[110px]"
                  value={prozent}
                  onChange={(e) => setProzent(Number(e.target.value))}
                />
              </div>
              <div className="grow">
                <label htmlFor={`g-${buchung.id}`} className="block text-ink-500">
                  Begründung bei abweichender Entscheidung
                </label>
                <Input
                  id={`g-${buchung.id}`}
                  className="mt-1 min-h-11"
                  value={grund}
                  onChange={(e) => setGrund(e.target.value)}
                />
              </div>
              <Button
                variant="ghostBrand"
                disabled={stornieren.isPending}
                onClick={() => stornieren.mutate()}
              >
                Stornieren
              </Button>
            </div>
          </>
        ) : (
          <p className="mt-2 text-ink-700">Ohne Termin gibt es keine Stornostufe.</p>
        )}
        {buchung.storno_stufe !== null && buchung.storno_stufe !== undefined && (
          <p className="mt-3 text-ink-700">
            Festgehalten: {buchung.storno_stufe} % bei {buchung.storno_tage_vorher ?? "—"} Tagen
            vor Beginn{buchung.storno_grund ? ` — ${buchung.storno_grund}` : ""}.
          </p>
        )}
        {fehler && (
          <p role="alert" className="mt-2 font-semibold text-bordeaux-700">
            {fehler}
          </p>
        )}
      </section>

      <section>
        <h3 className="text-[16px] font-semibold text-bordeaux-900">Interne Notiz</h3>
        <Textarea
          aria-label="Interne Notiz"
          rows={2}
          className="mt-2"
          value={notiz}
          onChange={(e) => setNotiz(e.target.value)}
        />
        <Button
          variant="ghostBrand"
          className="mt-2"
          disabled={notizSpeichern.isPending}
          onClick={() => notizSpeichern.mutate()}
        >
          Notiz speichern
        </Button>
      </section>

      <section>
        <h3 className="text-[16px] font-semibold text-bordeaux-900">Verlauf</h3>
        {verlauf.isPending ? (
          <p className="mt-2 text-ink-700">Wird geladen …</p>
        ) : (
          <ul role="list" className="mt-2 grid gap-1 text-ink-700">
            {(verlauf.data ?? []).map((e) => (
              <li key={e.id}>
                {datumKurz(e.created_at)} ·{" "}
                {e.von_status ? `${e.von_status} → ` : ""}
                {e.nach_status ?? "Notiz"}
                {e.notiz ? ` · ${e.notiz}` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-[16px] font-semibold text-bordeaux-900">Datensatz löschen</h3>
        <p className="mt-2 max-w-[68ch] text-ink-500">
          Löscht Name, Kontaktdaten, Nachricht und Verlauf dieser Anmeldung unwiderruflich.
        </p>
        <Button
          variant="ghostBrand"
          className="mt-2"
          onClick={() => {
            if (
              window.confirm(
                `Anmeldung ${buchungsReferenz(buchung.id)} von ${buchung.vorname} ${buchung.nachname} (${buchung.email}) endgültig löschen? Status: ${BUCHUNG_STATUS_LABEL[buchung.status]}.`,
              )
            ) {
              loeschen.mutate();
            }
          }}
        >
          Endgültig löschen
        </Button>
      </section>
    </div>
  );
}
