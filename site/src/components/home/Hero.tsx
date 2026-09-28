import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMEN } from "@/lib/site";
import { AktuellesPanel } from "@/components/home/AktuellesPanel";

export function Hero() {
  const navigate = useNavigate();
  const [thema, setThema] = useState<string>("");

  return (
    <section className="section-y" aria-labelledby="hero-title">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            <p className="eyebrow text-bordeaux-600">SEIT 30 JAHREN – KARBEN BEI FRANKFURT</p>
            <h1 id="hero-title" className="h1-display mt-4 max-w-[16ch] text-ink-900">
              Führungstraining, das beim Denken anfängt.
            </h1>
            <p className="lead-text mt-6 max-w-[68ch] text-ink-700">
              Seit 30 Jahren begleite ich Führungskräfte in Wirtschaft und Verwaltung — mit den
              Werkzeugen der Vertriebspraxis und dem Fundament der Philosophie. Nicht Technik über
              Technik, sondern die Frage, was hinter einer Entscheidung steht.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="brass" size="xl">
                <Link to="/kontakt">Erstgespräch vereinbaren →</Link>
              </Button>
              <Button asChild variant="ghostBrand" size="xl">
                <Link to="/leistungen/seminare">Seminartermine ansehen</Link>
              </Button>
            </div>

            <div className="mt-10 max-w-xl rounded-lg border border-ink-200 bg-card p-6 shadow-soft">
              <h2 className="h3-display font-sans text-[18px]">Wobei darf ich Sie unterstützen?</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Select value={thema} onValueChange={setThema}>
                  <SelectTrigger className="h-12 flex-1 text-[16px]" aria-label="Thema auswählen">
                    <SelectValue placeholder="Thema auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {THEMEN.map((t) => (
                      <SelectItem key={t.label} value={t.label}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="brass"
                  size="lg"
                  onClick={() => {
                    const match = THEMEN.find((t) => t.label === thema);
                    void navigate({ to: match ? match.to : "/leistungen" });
                  }}
                >
                  Finden
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <AktuellesPanel />
      </div>
    </section>
  );
}
