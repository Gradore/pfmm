import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { praxisbriefAnmelden } from "@/lib/praxisbrief.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
  }),
});

type Values = z.input<typeof schema>;

export function NewsletterSection() {
  const [sent, setSent] = useState(false);
  const [fehler, setFehler] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <section className="section-y bg-ink-900 text-paper/85" aria-labelledby="newsletter-title">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-brass-400">Praxisbrief</p>
          <h2 id="newsletter-title" className="h2-display mt-3 text-paper">
            Alle sechs Wochen ein Denkanstoß
          </h2>
          <p className="mt-5 max-w-[68ch]">
            Der Praxisbrief bringt philosophische und psychologische Impulse für die Führungsarbeit
            — zu Themen wie Ordnung, Vertrauen, Verantwortung und Arbeit. Kostenlos, jederzeit
            kündbar, kein Verkauf.
          </p>
        </div>

        <div className="lg:pt-14">
          {sent ? (
            <p role="status" className="rounded-lg border border-brass-400/50 p-6 text-paper">
              Fast geschafft: Sie erhalten gleich eine Bestätigungsmail. Bitte klicken Sie den Link
              darin — erst danach ist Ihre Anmeldung aktiv.
            </p>
          ) : (
            <form noValidate onSubmit={handleSubmit(async (werte) => { setFehler(""); try { await praxisbriefAnmelden({ data: { email: werte.email, consent: true } }); setSent(true); } catch (error) { setFehler(error instanceof Error ? error.message : "Anmeldung nicht möglich. Bitte schreiben Sie an info@pfmm.de."); } })} className="space-y-4">
              <div>
                <label
                  htmlFor="nl-mail"
                  className="mb-1.5 block text-[15px] font-semibold text-paper"
                >
                  E-Mail-Adresse
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    id="nl-mail"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="h-12 border-paper/25 bg-paper/10 text-paper placeholder:text-paper/50"
                    placeholder="ihre.adresse@unternehmen.de"
                    {...register("email")}
                  />
                  <Button type="submit" disabled={isSubmitting} variant="brass" size="lg" className="shrink-0">
                    {isSubmitting ? "Wird gesendet …" : "Praxisbrief erhalten"}
                  </Button>
                </div>
                {errors.email?.message && (
                  <p role="alert" className="mt-1 text-[14px] text-brass-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <label htmlFor="nl-consent" className="flex items-start gap-3 text-[15px]">
                <input
                  id="nl-consent"
                  type="checkbox"
                  className="mt-1 size-5 accent-brass-600"
                  aria-invalid={!!errors.consent}
                  {...register("consent")}
                />
                <span>
                  Ich stimme dem Versand des elektronischen Praxisbriefs zu und habe die{" "}
                  <Link to="/datenschutz" className="text-brass-400 underline underline-offset-4">
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen.
                </span>
              </label>
              {errors.consent?.message && (
                <p role="alert" className="text-[14px] text-brass-400">
                  {errors.consent.message}
                </p>
              )}
              {fehler && <p role="alert" className="text-[14px] text-brass-400">{fehler}</p>}
              <p className="text-[14px] text-paper/60">
                Double-Opt-in — Sie erhalten zuerst eine Bestätigungsmail.
              </p>
              <Link to="/praxisbrief/abmelden" className="inline-flex min-h-11 items-center text-[14px] text-brass-400 underline underline-offset-4">Praxisbrief abbestellen</Link>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
