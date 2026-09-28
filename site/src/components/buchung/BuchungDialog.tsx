import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buchungAnlegen } from "@/lib/buchung.functions";
import { buchungSchema, freiePlaetze, STORNO_TEXT, zeitraumLang } from "@/lib/buchung";
import type { BuchungEingabe, BuchungErgebnis, Termin } from "@/lib/buchung";
import { CONTACT } from "@/lib/site";

type Props = {
  termin: Termin;
  seminarSlug: string;
  seminarTitel: string;
  offen: boolean;
  onOpenChange: (offen: boolean) => void;
};

const feld = "mt-1 min-h-11";
const fehlerText = "mt-1 text-[14px] text-bordeaux-700";

/** Dialog mit dem verbindlichen Anmeldeformular zu einem konkreten Termin. */
export function BuchungDialog({ termin, seminarSlug, seminarTitel, offen, onOpenChange }: Props) {
  const [ergebnis, setErgebnis] = useState<BuchungErgebnis | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const warteliste = freiePlaetze(termin) === 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BuchungEingabe>({
    resolver: zodResolver(buchungSchema),
    defaultValues: { termin_id: termin.id, anzahl_plaetze: 1 },
  });

  async function absenden(values: BuchungEingabe) {
    setFehler(null);
    try {
      const res = await buchungAnlegen({
        data: {
          ...values,
          termin_id: termin.id,
          seminar_slug: seminarSlug,
          seminar_titel: seminarTitel,
        },
      });
      setErgebnis(res);
      void queryClient.invalidateQueries({ queryKey: ["termine"] });
    } catch (err) {
      setFehler(
        err instanceof Error
          ? err.message
          : "Die Anmeldung konnte nicht gespeichert werden. Bitte rufen Sie mich an.",
      );
    }
  }

  return (
    <Dialog
      open={offen}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setErgebnis(null);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[640px]">
        {ergebnis ? (
          <div role="status">
            <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} aria-hidden="true" />
            <DialogHeader className="mt-4">
              <DialogTitle className="h3-display text-left">
                {ergebnis.status === "warteliste"
                  ? "Sie stehen auf der Warteliste."
                  : "Ihre Anmeldung ist eingegangen."}
              </DialogTitle>
            </DialogHeader>
            <dl className="mt-5 grid gap-2 rounded-lg border border-ink-200 bg-ink-100 p-5 text-[16px] sm:grid-cols-[160px_1fr]">
              <dt className="text-ink-500">Buchungsnummer</dt>
              <dd className="font-semibold text-ink-900">{ergebnis.referenz}</dd>
              <dt className="text-ink-500">Seminar</dt>
              <dd className="font-semibold text-ink-900">{seminarTitel}</dd>
              <dt className="text-ink-500">Termin</dt>
              <dd className="font-semibold text-ink-900">
                {zeitraumLang(termin.start_datum, termin.end_datum)}
              </dd>
              <dt className="text-ink-500">Status</dt>
              <dd className="font-semibold text-ink-900">
                {ergebnis.status === "warteliste" ? "Warteliste" : "Angefragt"}
              </dd>
            </dl>
            {ergebnis.status === "warteliste" ? (
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-700">
                Für diesen Termin sind derzeit alle Plätze belegt. Ihre Anmeldung ist notiert: Wird
                ein Platz frei, melde ich mich in der Reihenfolge des Eingangs bei Ihnen. Bis dahin
                entstehen Ihnen keine Kosten und keine Verpflichtung.
              </p>
            ) : (
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-700">
                Sie erhalten in Kürze eine Bestätigung per E-Mail. Ich prüfe die Anmeldung
                persönlich und sage Ihnen den Platz zu — erst damit gilt die Teilnahme als
                bestätigt.
              </p>
            )}
            <p className="mt-4 text-[17px] text-ink-700">
              Fragen? Rufen Sie mich an:{" "}
              <a
                href={CONTACT.phoneHref}
                className="font-semibold text-brass-700 underline underline-offset-4"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <Button className="mt-6" variant="brass" onClick={() => onOpenChange(false)}>
              Schließen
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="h3-display text-left">
                {warteliste ? "Auf die Warteliste" : "Platz verbindlich buchen"}
              </DialogTitle>
              <DialogDescription className="text-left text-[16px] text-ink-700">
                {seminarTitel} · {zeitraumLang(termin.start_datum, termin.end_datum)}
                {termin.ort ? ` · ${termin.ort}` : ""}
              </DialogDescription>
            </DialogHeader>

            <form className="mt-2 grid gap-4" onSubmit={handleSubmit(absenden)} noValidate>
              <div>
                <Label htmlFor="b-seminar">Seminar</Label>
                <Input
                  id="b-seminar"
                  readOnly
                  value={seminarTitel}
                  className="mt-1 min-h-11 bg-ink-100 font-semibold text-ink-900"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="b-vorname">Vorname *</Label>
                  <Input id="b-vorname" className={feld} autoComplete="given-name" {...register("vorname")} />
                  {errors.vorname && <p className={fehlerText}>{errors.vorname.message}</p>}
                </div>
                <div>
                  <Label htmlFor="b-nachname">Nachname *</Label>
                  <Input id="b-nachname" className={feld} autoComplete="family-name" {...register("nachname")} />
                  {errors.nachname && <p className={fehlerText}>{errors.nachname.message}</p>}
                </div>
                <div>
                  <Label htmlFor="b-unternehmen">Unternehmen</Label>
                  <Input id="b-unternehmen" className={feld} autoComplete="organization" {...register("unternehmen")} />
                </div>
                <div>
                  <Label htmlFor="b-funktion">Funktion</Label>
                  <Input id="b-funktion" className={feld} autoComplete="organization-title" {...register("funktion")} />
                </div>
              </div>

              <div>
                <Label htmlFor="b-anschrift">Anschrift</Label>
                <Input id="b-anschrift" className={feld} autoComplete="street-address" {...register("anschrift")} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="b-telefon">Telefon</Label>
                  <Input id="b-telefon" className={feld} type="tel" autoComplete="tel" {...register("telefon")} />
                </div>
                <div>
                  <Label htmlFor="b-email">E-Mail *</Label>
                  <Input id="b-email" className={feld} type="email" autoComplete="email" {...register("email")} />
                  {errors.email && <p className={fehlerText}>{errors.email.message}</p>}
                </div>
              </div>

              <div className="sm:w-40">
                <Label htmlFor="b-plaetze">Anzahl Plätze</Label>
                <Input
                  id="b-plaetze"
                  className={feld}
                  type="number"
                  min={1}
                  max={10}
                  {...register("anzahl_plaetze")}
                />
                {errors.anzahl_plaetze && (
                  <p className={fehlerText}>{errors.anzahl_plaetze.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="b-nachricht">Nachricht</Label>
                <Textarea id="b-nachricht" rows={4} className="mt-1" {...register("nachricht")} />
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("website")}
              />

              <div className="rounded-lg border border-ink-200 bg-ink-100 p-4">
                <label className="flex items-start gap-3 text-[16px] text-ink-700">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 accent-[hsl(var(--brass-600))]"
                    {...register("datenschutz_ok")}
                  />
                  <span>
                    Ich habe die{" "}
                    <Link
                      to="/datenschutz"
                      className="font-semibold text-brass-700 underline underline-offset-4"
                    >
                      Datenschutzerklärung
                    </Link>{" "}
                    gelesen. *
                  </span>
                </label>
                {errors.datenschutz_ok && (
                  <p className={fehlerText}>{errors.datenschutz_ok.message}</p>
                )}

                <label className="mt-4 flex items-start gap-3 text-[16px] text-ink-700">
                  <input
                    type="checkbox"
                    className="mt-1 size-5 accent-[hsl(var(--brass-600))]"
                    {...register("storno_ok")}
                  />
                  <span>Ich habe die Stornobedingungen gelesen und akzeptiere sie. *</span>
                </label>
                {errors.storno_ok && <p className={fehlerText}>{errors.storno_ok.message}</p>}

                <details className="mt-3">
                  <summary className="min-h-11 cursor-pointer py-2 text-[16px] font-semibold text-brass-700">
                    Stornobedingungen anzeigen
                  </summary>
                  <ul className="mt-2 grid gap-2 text-[15px] leading-[1.6] text-ink-700">
                    {STORNO_TEXT.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </details>
              </div>

              <p className="text-[16px] leading-[1.6] text-ink-700">
                Ihre Anmeldung ist verbindlich. Sie erhalten zunächst eine Bestätigung per E-Mail;
                die Teilnahme gilt als bestätigt, sobald ich Ihnen den Platz zusage.
              </p>

              {fehler && (
                <p role="alert" className="text-[16px] font-semibold text-bordeaux-700">
                  {fehler}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" variant="brass" size="lg" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Wird gesendet …"
                    : warteliste
                      ? "Auf die Warteliste setzen"
                      : "Platz verbindlich buchen"}
                </Button>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-brass-700"
                >
                  <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
