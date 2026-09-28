import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen an.")
    .max(100, "Bitte kürzer fassen."),
  unternehmen: z.string().trim().max(120, "Bitte kürzer fassen.").optional(),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255),
  telefon: z.string().trim().max(40, "Bitte kürzer fassen.").optional(),
  anliegen: z
    .string()
    .trim()
    .min(10, "Bitte beschreiben Sie Ihr Anliegen in ein bis zwei Sätzen.")
    .max(2000, "Bitte auf 2.000 Zeichen kürzen."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
  }),
  website: z.string().max(0).optional(), // Honeypot
});

type FormValues = z.input<typeof schema>;

export function KontaktFormular({ thema }: { thema?: string | undefined }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { anliegen: thema ? `Ich interessiere mich für das Thema „${thema}“. ` : "" },
  });

  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-success/40 bg-ink-100 p-8">
        <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="h3-display mt-4">Vielen Dank für Ihre Nachricht.</h3>
        <p className="mt-2 text-ink-700">
          Ich melde mich in der Regel innerhalb eines Werktages persönlich bei Ihnen — kein
          Sekretariat, keine Warteschleife.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => {
        if (values["website"]) return; // Honeypot ausgelöst
        setSent(true);
      })}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name?.message} id="k-name">
          <Input
            id="k-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Unternehmen" error={errors.unternehmen?.message} id="k-firma">
          <Input id="k-firma" autoComplete="organization" {...register("unternehmen")} />
        </Field>
        <Field label="E-Mail" required error={errors.email?.message} id="k-mail">
          <Input
            id="k-mail"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field label="Telefon" error={errors.telefon?.message} id="k-tel">
          <Input id="k-tel" type="tel" autoComplete="tel" {...register("telefon")} />
        </Field>
      </div>

      <Field label="Worum geht es?" required error={errors.anliegen?.message} id="k-text">
        <Textarea id="k-text" rows={5} aria-invalid={!!errors.anliegen} {...register("anliegen")} />
      </Field>

      {/* Honeypot — für Menschen unsichtbar */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="k-website">Website</label>
        <input id="k-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label htmlFor="k-consent" className="flex items-start gap-3 text-[15px] text-ink-700">
          <input
            id="k-consent"
            type="checkbox"
            className="mt-1 size-5 accent-brass-600"
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <span>
            Ich habe die{" "}
            <Link to="/datenschutz" className="text-brass-700 underline underline-offset-4">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu.*
          </span>
        </label>
        {errors.consent?.message && (
          <p className="mt-1 text-[14px] text-error">{errors.consent.message}</p>
        )}
      </div>

      <Button type="submit" variant="brass" size="lg" disabled={isSubmitting}>
        Anfrage senden →
      </Button>
      <p className="text-[14px] text-ink-500">* Pflichtfeld</p>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-[15px] font-semibold text-ink-900">
        {label}
        {required && "*"}
      </Label>
      {children}
      {error && (
        <p className="mt-1 text-[14px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
