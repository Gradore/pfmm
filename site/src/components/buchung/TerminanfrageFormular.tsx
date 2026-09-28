import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { terminanfrageAnlegen } from "@/lib/buchung.functions";
import { terminanfrageSchema, WUNSCH_FORMATE } from "@/lib/buchung";
import type { BuchungErgebnis, TerminanfrageEingabe } from "@/lib/buchung";
import { CONTACT } from "@/lib/site";

const feld = "mt-1 min-h-11";
const fehlerText = "mt-1 text-[14px] text-bordeaux-700";

type Props = { seminarSlug: string; seminarTitel: string; onFertig?: () => void; initialFormat?: "inhouse" };

/** Unverbindliche Terminanfrage zu einem Seminar ohne ausgeschriebenen Termin. */
export function TerminanfrageFormular({ seminarSlug, seminarTitel, onFertig, initialFormat }: Props) {
  const [ergebnis, setErgebnis] = useState<BuchungErgebnis | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TerminanfrageEingabe>({
    resolver: zodResolver(terminanfrageSchema),
    defaultValues: { seminar_slug: seminarSlug, anzahl_personen: 1, wunsch_format: initialFormat ?? "" },
  });
  useEffect(() => {
    const onInhouse = () => setValue("wunsch_format", "inhouse");
    window.addEventListener("pfmm:inhouse-anfragen", onInhouse);
    return () => window.removeEventListener("pfmm:inhouse-anfragen", onInhouse);
  }, [setValue]);

  async function absenden(values: TerminanfrageEingabe) {
    setFehler(null);
    try {
      const res = await terminanfrageAnlegen({
        data: { ...values, seminar_slug: seminarSlug, seminar_titel: seminarTitel },
      });
      setErgebnis(res);
    } catch (err) {
      setFehler(
        err instanceof Error
          ? err.message
          : "Ihre Anfrage konnte nicht gespeichert werden. Bitte rufen Sie mich an.",
      );
    }
  }

  if (ergebnis) {
    const werte = getValues();
    return (
      <div role="status">
        <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="h3-display mt-4">Ihre Terminanfrage ist eingegangen.</h3>
        <dl className="mt-5 grid gap-2 rounded-lg border border-ink-200 bg-ink-100 p-5 text-[16px] sm:grid-cols-[170px_1fr]">
          <dt className="text-ink-500">Vorgangsnummer</dt>
          <dd className="font-semibold text-ink-900">{ergebnis.referenz}</dd>
          <dt className="text-ink-500">Seminar</dt>
          <dd className="font-semibold text-ink-900">{seminarTitel}</dd>
          <dt className="text-ink-500">Wunschzeitraum</dt>
          <dd className="font-semibold text-ink-900">{werte.wunsch_zeitraum || "noch offen"}</dd>
          <dt className="text-ink-500">Format</dt>
          <dd className="font-semibold text-ink-900">
            {WUNSCH_FORMATE.find((f) => f.value === werte.wunsch_format)?.label ?? "noch offen"}
          </dd>
          <dt className="text-ink-500">Personen</dt>
          <dd className="font-semibold text-ink-900">{werte.anzahl_personen}</dd>
        </dl>
        <p className="mt-5 text-[17px] leading-[1.65] text-ink-700">
          Ihre Anfrage ist unverbindlich. Ich sehe mir Ihre Angaben an und melde mich mit einem
          Terminvorschlag — erst danach entscheiden Sie.
        </p>
        <p className="mt-4 text-[17px] text-ink-700">
          Fragen? Rufen Sie mich an:{" "}
          <a
            href={CONTACT.phoneHref}
            className="font-semibold text-brass-700 underline underline-offset-4"
          >
            {CONTACT.phoneDisplay}
          </a>
        </p>
        {onFertig && (
          <Button className="mt-6" variant="brass" onClick={onFertig}>
            Schließen
          </Button>
        )}
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(absenden)} noValidate>
      <div>
        <Label htmlFor="t-seminar">Seminar</Label>
        <Input
          id="t-seminar"
          readOnly
          value={seminarTitel}
          className="mt-1 min-h-11 bg-ink-100 font-semibold text-ink-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="t-vorname">Vorname *</Label>
          <Input id="t-vorname" className={feld} autoComplete="given-name" {...register("vorname")} />
          {errors.vorname && <p className={fehlerText}>{errors.vorname.message}</p>}
        </div>
        <div>
          <Label htmlFor="t-nachname">Nachname *</Label>
          <Input id="t-nachname" className={feld} autoComplete="family-name" {...register("nachname")} />
          {errors.nachname && <p className={fehlerText}>{errors.nachname.message}</p>}
        </div>
        <div>
          <Label htmlFor="t-unternehmen">Unternehmen</Label>
          <Input id="t-unternehmen" className={feld} autoComplete="organization" {...register("unternehmen")} />
        </div>
        <div>
          <Label htmlFor="t-funktion">Funktion</Label>
          <Input id="t-funktion" className={feld} autoComplete="organization-title" {...register("funktion")} />
        </div>
        <div>
          <Label htmlFor="t-telefon">Telefon</Label>
          <Input id="t-telefon" className={feld} type="tel" autoComplete="tel" {...register("telefon")} />
        </div>
        <div>
          <Label htmlFor="t-email">E-Mail *</Label>
          <Input id="t-email" className={feld} type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className={fehlerText}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="t-zeitraum">Wunschzeitraum</Label>
          <Input
            id="t-zeitraum"
            className={feld}
            placeholder="z. B. Frühjahr 2027 oder KW 12"
            {...register("wunsch_zeitraum")}
          />
        </div>
        <div>
          <Label htmlFor="t-format">Bevorzugtes Format</Label>
          <select
            id="t-format"
            className="mt-1 min-h-11 w-full rounded-md border border-ink-200 bg-card px-3 text-[16px] text-ink-900"
            {...register("wunsch_format")}
          >
            <option value="">Noch offen</option>
            {WUNSCH_FORMATE.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sm:w-48">
        <Label htmlFor="t-personen">Anzahl Personen</Label>
        <Input
          id="t-personen"
          className={feld}
          type="number"
          min={1}
          max={200}
          {...register("anzahl_personen")}
        />
        {errors.anzahl_personen && <p className={fehlerText}>{errors.anzahl_personen.message}</p>}
      </div>

      <div>
        <Label htmlFor="t-nachricht">Nachricht</Label>
        <Textarea id="t-nachricht" rows={4} className="mt-1" {...register("nachricht")} />
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
        {errors.datenschutz_ok && <p className={fehlerText}>{errors.datenschutz_ok.message}</p>}
      </div>

      <p className="text-[16px] leading-[1.6] text-ink-700">
        Unverbindlich. Sie erhalten einen Terminvorschlag, erst danach entscheiden Sie.
      </p>

      {fehler && (
        <p role="alert" className="text-[16px] font-semibold text-bordeaux-700">
          {fehler} Sie erreichen mich unter {CONTACT.phoneDisplay}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brass" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Wird gesendet …" : "Wunschtermin anfragen"}
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
  );
}
