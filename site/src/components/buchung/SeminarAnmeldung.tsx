import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/site/Reveal";
import { useOeffentlicheTermine } from "@/hooks/useTermine";
import { TerminPlaetze } from "@/components/buchung/TerminPlaetze";
import { BuchungDialog } from "@/components/buchung/BuchungDialog";
import { TerminanfrageFormular } from "@/components/buchung/TerminanfrageFormular";
import { FORMAT_LABEL, freiePlaetze, zeitraumLang } from "@/lib/buchung";
import type { Termin } from "@/lib/buchung";

type Props = { seminarSlug: string; seminarTitel: string; initialTermine?: Termin[] };

/** Einheitlicher Buchungsabschnitt: Anmeldung bei Termin, sonst Terminanfrage. */
export function SeminarAnmeldung({ seminarSlug, seminarTitel, initialTermine }: Props) {
  const { data } = useOeffentlicheTermine(seminarSlug, initialTermine);
  const [gewaehlt, setGewaehlt] = useState<Termin | null>(null);
  const [anfrageOffen, setAnfrageOffen] = useState(false);
  const [inhouse, setInhouse] = useState(false);
  useEffect(() => {
    const open = () => { setInhouse(true); setAnfrageOffen(true); };
    window.addEventListener("pfmm:inhouse-anfragen", open);
    return () => window.removeEventListener("pfmm:inhouse-anfragen", open);
  }, []);
  const termine = (data ?? initialTermine ?? []).filter((t) => t.status !== "abgesagt");

  return (
    <section className="section-y bg-card" id="termine" aria-labelledby="termine-title">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-bordeaux-600">
            {termine.length > 0 ? "Termine" : "Terminanfrage"}
          </p>
          <h2 id="termine-title" className="h2-display mt-3">
            {termine.length > 0 ? "Termine und Plätze" : "Termin anfragen"}
          </h2>
          <p className="lead-text mt-5 max-w-[68ch] text-ink-700">
            {termine.length > 0
              ? "Die Gruppe bleibt klein. Sie sehen hier den tatsächlichen Stand der Anmeldungen."
              : "Für dieses Seminar ist derzeit kein offener Termin ausgeschrieben. Sagen Sie mir, was Ihnen vorschwebt — ich melde mich mit einem Vorschlag."}
          </p>
        </Reveal>

        {termine.length > 0 ? (
          <>
            <ul role="list" className="mt-10 grid gap-6 lg:grid-cols-2">
              {termine.map((t, i) => {
                const frei = freiePlaetze(t);
                return (
                  <Reveal as="li" key={t.id} delay={i * 80}>
                    <article className="flex h-full min-w-0 flex-col rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8">
                      <p className="flex items-center gap-2 text-[15px] font-semibold text-bordeaux-600">
                        <CalendarDays
                          className="size-4 shrink-0"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="[overflow-wrap:anywhere]">
                          {zeitraumLang(t.start_datum, t.end_datum)}
                        </span>
                      </p>
                      <h3 className="h3-display mt-2 [overflow-wrap:anywhere]">
                        {t.titel_zusatz ?? seminarTitel}
                      </h3>
                      <p className="mt-2 flex items-center gap-2 text-[16px] text-ink-700">
                        <MapPin className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span className="[overflow-wrap:anywhere]">
                          {FORMAT_LABEL[t.format]}
                          {t.ort ? ` · ${t.ort}` : ""}
                        </span>
                      </p>
                      {t.honorar_hinweis && (
                        <p className="mt-2 text-[16px] text-ink-700">{t.honorar_hinweis}</p>
                      )}

                      <div className="mt-6">
                        <TerminPlaetze termin={t} />
                      </div>

                      <div className="mt-6 pt-2">
                        <Button variant="brass" size="lg" onClick={() => setGewaehlt(t)}>
                          {frei === 0 ? "Auf die Warteliste" : "Platz verbindlich buchen"}
                        </Button>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={120}>
              <p className="mt-8 text-[17px] text-ink-700">
                Kein Termin passend?{" "}
                <button
                  type="button"
                  onClick={() => { setInhouse(false); setAnfrageOffen(true); }}
                  className="min-h-11 cursor-pointer font-semibold text-brass-700 underline underline-offset-4"
                >
                  Wunschtermin anfragen
                </button>
              </p>
            </Reveal>
          </>
        ) : (
          <Reveal delay={80}>
            <div className="mt-8 max-w-[820px] rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8">
              <TerminanfrageFormular seminarSlug={seminarSlug} seminarTitel={seminarTitel} />
            </div>
          </Reveal>
        )}
      </div>

      {gewaehlt && (
        <BuchungDialog
          termin={gewaehlt}
          seminarSlug={seminarSlug}
          seminarTitel={seminarTitel}
          offen={gewaehlt !== null}
          onOpenChange={(o) => {
            if (!o) setGewaehlt(null);
          }}
        />
      )}

      <Dialog open={anfrageOffen} onOpenChange={setAnfrageOffen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle className="h3-display text-left">Wunschtermin anfragen</DialogTitle>
            <DialogDescription className="text-left text-[16px] text-ink-700">
              Unverbindlich — Sie erhalten einen Terminvorschlag zu „{seminarTitel}“.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <TerminanfrageFormular
              key={inhouse ? "inhouse" : "termin"}
              {...(inhouse ? { initialFormat: "inhouse" as const } : {})}
              seminarSlug={seminarSlug}
              seminarTitel={seminarTitel}
              onFertig={() => setAnfrageOffen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
