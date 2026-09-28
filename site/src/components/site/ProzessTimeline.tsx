import { useInView, useReducedMotion } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const SCHRITTE = [
  {
    title: "Vorgespräche",
    text: "Zuerst klären wir gemeinsam, welche Aufgabe wirklich vor Ihnen liegt — und welche nur so aussieht.",
  },
  {
    title: "Einzelinterviews mit den Teilnehmern",
    text: "Ich spreche vertraulich mit den Beteiligten, um die Lage aus ihrer Sicht kennenzulernen.",
  },
  {
    title: "Konzeptentwicklung, Abstimmung und Ablaufplanung",
    text: "Aus beidem entsteht ein Konzept, das ich mit Ihnen abstimme, bevor ein Termin steht.",
  },
  {
    title: "Seminardurchführung",
    text: "Wir arbeiten an Ihren eigenen Fällen — in einer Gruppengröße, die Gespräch zulässt.",
  },
  {
    title: "Dokumentation der Ergebnisse oder Nachbesprechung",
    text: "Zum Schluss halten wir fest, was gilt, oder wir setzen uns nach einigen Wochen erneut zusammen.",
  },
];

/** Fünf Schritte — horizontal ab lg, vertikal auf dem Telefon. Linie zeichnet sich beim Scrollen. */
export function ProzessTimeline() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const active = reduced || inView;

  return (
    <div ref={ref} className="relative mt-12">
      {/* Verbindungslinie */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 bottom-6 left-[19px] w-px origin-top bg-bordeaux-600/40 transition-transform duration-1000 ease-out lg:top-[19px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left",
          active ? "scale-y-100 lg:scale-x-100" : "scale-y-0 lg:scale-y-100 lg:scale-x-0",
        )}
      />
      <ol role="list" className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
        {SCHRITTE.map((s, i) => (
          <li
            key={s.title}
            className={cn(
              "relative pl-14 transition-all duration-500 lg:pl-0",
              active ? "reveal-in" : "reveal",
            )}
            style={{ transitionDelay: `${i * 140}ms` }}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-bordeaux-700 font-serif text-[18px] font-semibold text-paper lg:static lg:mb-5"
            >
              {i + 1}
            </span>
            <h3 className="font-sans text-[18px] font-semibold text-ink-900">
              <span className="sr-only">Schritt {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-2 text-[16px] text-ink-700">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
