import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

/**
 * Gerüst für Unterseiten: Brotkrumen, genau eine H1, saubere H2-Struktur.
 * Die Inhalte werden schrittweise ergänzt.
 */
export function PageStub({
  crumbs,
  eyebrow,
  title,
  lead,
  sections = [],
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  sections?: { heading: string; text?: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <div className="container-page section-y">
        <Reveal>
          <div className="max-w-[68ch]">
            {eyebrow && <p className="eyebrow text-bordeaux-600">{eyebrow}</p>}
            <h1 className="h1-display mt-3 text-ink-900">{title}</h1>
            {lead && <p className="lead-text mt-6 text-ink-700">{lead}</p>}
          </div>
        </Reveal>

        {children}

        {sections.length > 0 && (
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 90}>
                <section className="rounded-lg border border-ink-200 bg-card p-7 shadow-soft">
                  <h2 className="h3-display font-sans">{s.heading}</h2>
                  <p className="mt-3 max-w-[68ch] text-ink-700">
                    {s.text || "Inhalte zu diesem Abschnitt folgen in Kürze."}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-ink-100 p-8">
            <p className="max-w-[48ch] text-ink-700">
              Sie überlegen, ob das zu Ihrer Aufgabe passt? Dreißig Minuten Gespräch, kostenlos und
              unverbindlich.
            </p>
            <Button asChild variant="brass" size="lg">
              <Link to="/kontakt">Erstgespräch vereinbaren</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
