import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";

/** Abschließendes CTA-Band — auf jeder Leistungsseite identisch. */
export function CtaBand({
  text = "Sie überlegen, ob das zu Ihrer Aufgabe passt? Dreißig Minuten Gespräch, kostenlos und unverbindlich.",
}: {
  text?: string;
}) {
  return (
    <Reveal className="mt-20">
      <div className="flex flex-wrap items-center gap-6 rounded-lg bg-ink-100 p-8">
        <p className="max-w-[48ch] flex-1 text-ink-700">{text}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="brass" size="lg">
            <Link to="/kontakt">Erstgespräch vereinbaren</Link>
          </Button>
          <Button asChild variant="ghostBrand" size="lg">
            <a href={CONTACT.phoneHref}>
              <Phone strokeWidth={1.5} aria-hidden="true" />
              Anrufen
            </a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
