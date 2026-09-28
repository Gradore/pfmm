import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, Phone, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";
import type { Seminar } from "@/data/seminare";

const schema = z.object({
  seminar: z.string(),
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
    .max(255, "Bitte kürzer fassen."),
  telefon: z.string().trim().max(40, "Bitte kürzer fassen.").optional(),
  frage: z.string().trim().max(2000, "Bitte auf 2.000 Zeichen kürzen.").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
  }),
  website: z.string().max(0).optional(),
});

type FormValues = z.input<typeof schema>;

/** Anfrageformular, fest auf ein Seminar bezogen. */
export function SeminarAnfrage({ seminar }: { seminar: Seminar }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { seminar: seminar.title },
  });

  return (
    <section className="section-y bg-ink-100" id="anfrage" aria-labelledby="anfrage-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div>
            <p className="eyebrow text-bordeaux-600">Anfrage</p>
            <h2 id="anfrage-title" className="h2-display mt-3">
              Termin für dieses Seminar anfragen
            </h2>
            <p className="lead-text mt-5 max-w-[68ch] text-ink-700">
              Sie erhalten zunächst eine Rückmeldung von mir persönlich — keine automatische
              Buchung, kein Verkaufsgespräch.
            </p>

            <div className="mt-8 rounded-lg border border-ink-200 bg-card p-6 shadow-soft sm:p-8">
              {sent ? (
                <div role="status">
                  <CheckCircle2
                    className="size-8 text-success"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="h3-display mt-4">Vielen Dank für Ihre Anfrage.</h3>
                  <p className="mt-2 text-ink-700">
                    Ihre Anfrage zum Seminar „{seminar.title}“ ist bei mir eingegangen. Ich melde
                    mich in der Regel innerhalb eines Werktages persönlich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit((values) => {
                    if (values.website) return;
                    setSent(true);
                  })}
                  className="space-y-5"
                >
                  <Field label="Seminar" id="s-seminar">
                    <Input
                      id="s-seminar"
                      readOnly
                      className="bg-ink-100 font-semibold text-ink-900"
                      {...register("seminar")}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" required error={errors.name?.message} id="s-name">
                      <Input
                        id="s-name"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Unternehmen" error={errors.unternehmen?.message} id="s-firma">
                      <Input
                        id="s-firma"
                        autoComplete="organization"
                        {...register("unternehmen")}
                      />
                    </Field>
                    <Field label="E-Mail" required error={errors.email?.message} id="s-mail">
                      <Input
                        id="s-mail"
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                    </Field>
                    <Field label="Telefon" error={errors.telefon?.message} id="s-tel">
                      <Input id="s-tel" type="tel" autoComplete="tel" {...register("telefon")} />
                    </Field>
                  </div>

                  <Field
                    label="Ihre Frage oder Anmerkung"
                    error={errors.frage?.message}
                    id="s-frage"
                  >
                    <Textarea id="s-frage" rows={5} {...register("frage")} />
                  </Field>

                  {/* Honeypot — für Menschen unsichtbar */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="s-website">Website</label>
                    <input
                      id="s-website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="s-consent"
                      className="flex items-start gap-3 text-[15px] text-ink-700"
                    >
                      <input
                        id="s-consent"
                        type="checkbox"
                        className="mt-1 size-5 accent-brass-600"
                        aria-invalid={!!errors.consent}
                        {...register("consent")}
                      />
                      <span>
                        Ich habe die{" "}
                        <Link
                          to="/datenschutz"
                          className="text-brass-700 underline underline-offset-4"
                        >
                          Datenschutzerklärung
                        </Link>{" "}
                        gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner
                        Anfrage zu.*
                      </span>
                    </label>
                    {errors.consent?.message && (
                      <p className="mt-1 text-[14px] text-error" role="alert">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="brass" size="lg" disabled={isSubmitting}>
                    Anfrage senden →
                  </Button>
                  <p className="text-[14px] text-ink-500">* Pflichtfeld</p>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className="rounded-lg bg-bordeaux-900 p-8 text-paper/85">
            <img
              src="https://www.pfmm.de/home/eg_110.jpg"
              alt="Porträt von Erich Grikscheit, Trainer und Berater aus Karben"
              width={110}
              height={110}
              loading="lazy"
              className="size-24 rounded-full object-cover"
            />
            <p className="mt-5 font-serif text-[22px] font-semibold text-paper">{CONTACT.person}</p>
            <p className="mt-3">
              Sie erreichen mich direkt — kein Sekretariat, keine Warteschleife.
            </p>
            <ul role="list" className="mt-6 space-y-3 text-[17px]">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 hover:text-brass-400"
                >
                  <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mobileHref}
                  className="flex items-center gap-3 hover:text-brass-400"
                >
                  <Smartphone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.mobileDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 hover:text-brass-400"
                >
                  <Mail className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[15px] text-paper/70">
              {CONTACT.company}
              <br />
              {CONTACT.street}, {CONTACT.zip} {CONTACT.city}
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
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
