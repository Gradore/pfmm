import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  thema: z.string().trim().min(2, "Bitte nennen Sie ein Thema.").max(120, "Bitte kürzer fassen."),
  vorname: z.string().trim().min(2, "Bitte geben Sie Ihren Vornamen an.").max(80),
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(80),
  unternehmen: z.string().trim().max(120, "Bitte kürzer fassen.").optional(),
  funktion: z.string().trim().max(120, "Bitte kürzer fassen.").optional(),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
  }),
  website: z.string().max(0).optional(),
});

type FormValues = z.input<typeof schema>;

/** Anmeldung für den 90-Minuten-Talk. Ohne Backend — Versand folgt. */
export function TalkFormular() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-success/40 bg-ink-100 p-8">
        <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="h3-display mt-4">Vielen Dank für Ihre Anmeldung.</h3>
        <p className="mt-2 text-ink-700">
          Sobald der nächste Termin feststeht, erhalten Sie die Einwahldaten per E-Mail.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={handleSubmit((values) => {
        if (values.website) return;
        setSent(true);
      })}
    >
      <Feld id="t-thema" label="Thema" required error={errors.thema?.message}>
        <Input id="t-thema" aria-invalid={!!errors.thema} {...register("thema")} />
      </Feld>

      <div className="grid gap-5 sm:grid-cols-2">
        <Feld id="t-vorname" label="Vorname" required error={errors.vorname?.message}>
          <Input
            id="t-vorname"
            autoComplete="given-name"
            aria-invalid={!!errors.vorname}
            {...register("vorname")}
          />
        </Feld>
        <Feld id="t-name" label="Name" required error={errors.name?.message}>
          <Input
            id="t-name"
            autoComplete="family-name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Feld>
        <Feld id="t-firma" label="Unternehmen">
          <Input id="t-firma" autoComplete="organization" {...register("unternehmen")} />
        </Feld>
        <Feld id="t-funktion" label="Funktion">
          <Input id="t-funktion" autoComplete="organization-title" {...register("funktion")} />
        </Feld>
      </div>

      <Feld id="t-email" label="E-Mail" required error={errors.email?.message}>
        <Input
          id="t-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Feld>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="t-website">Bitte leer lassen</label>
        <input id="t-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex gap-3">
        <input
          id="t-consent"
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-brass-600"
          aria-invalid={!!errors.consent}
          {...register("consent")}
        />
        <Label htmlFor="t-consent" className="text-[16px] leading-[1.55] font-normal text-ink-700">
          Ich habe die{" "}
          <Link to="/datenschutz" className="text-brass-700 underline underline-offset-4">
            Datenschutzerklärung
          </Link>{" "}
          gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anmeldung
          einverstanden.
        </Label>
      </div>
      {errors.consent && (
        <p role="alert" className="text-[15px] text-destructive">
          {errors.consent.message}
        </p>
      )}

      <Button type="submit" variant="brass" size="lg" disabled={isSubmitting}>
        Kostenlos zum Talk anmelden
      </Button>
    </form>
  );
}

function Feld({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-[16px] font-semibold text-ink-900">
        {label}
        {required && <span className="text-bordeaux-600"> *</span>}
      </Label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-[15px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
