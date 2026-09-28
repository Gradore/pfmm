import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Award, Clock, GraduationCap, MapPin } from "lucide-react";
import { Reveal, useInView } from "@/components/site/Reveal";

const ITEMS = [
  { icon: Clock, value: 30, suffix: "", label: "Jahre Praxis" },
  { icon: Award, value: 0, suffix: "", label: "Vortragsreihe im Lecturio-Verlag" },
  { icon: GraduationCap, value: 0, suffix: "", label: "Philosophie & Individualpsychologie" },
  { icon: MapPin, value: 0, suffix: "", label: "Karben bei Frankfurt" },
];

function CountUp({ to }: { to: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{n}</span>;
}

export function TrustBar() {
  return (
    <section className="bg-ink-900 py-8 text-paper/85" aria-label="Kurzprofil">
      <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 90}>
            <div className="flex items-start gap-3">
              <item.icon
                className="mt-0.5 size-5 shrink-0 text-brass-400"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-[16px] leading-snug">
                {item.value > 0 && (
                  <span className="font-semibold text-paper">
                    <CountUp to={item.value} />
                    {item.suffix}{" "}
                  </span>
                )}
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const SITUATIONEN = [
  {
    eyebrow: "Für Sie persönlich",
    question: "Möchten Sie Klarheit darüber gewinnen, wie Sie führen, entscheiden und auf andere wirken?",
    ground: "bg-bordeaux-900",
    accent: "text-rose-tint",
    links: [
      { label: "Philosophische Beratung", to: "/leistungen/beratung" },
      { label: "Offene Seminare", to: "/leistungen/seminare" },
    ],
  },
  {
    eyebrow: "Für Ihr Team",
    question: "Möchten Sie Zusammenarbeit, Kommunikation und Verantwortung in Ihrem Team neu beleben?",
    ground: "bg-ink-900",
    accent: "text-brass-400",
    links: [
      { label: "Inhouse-Trainings", to: "/leistungen/inhouse" },
      { label: "Konflikttraining", to: "/leistungen/inhouse" },
    ],
  },
  {
    eyebrow: "Für Ihre Organisation",
    question: "Suchen Sie neue Wege, um Führung und Management weiterzuentwickeln?",
    ground: "bg-umbra-900",
    accent: "text-sand-tint",
    links: [
      { label: "Konzeptentwicklung", to: "/leistungen/konzepte" },
      { label: "Referenzen", to: "/ueber-mich" },
    ],
  },
];

export function SituationCards() {
  return (
    <section className="section-y" aria-labelledby="situation-title">
      <div className="container-page">
        <Reveal>
          <h2 id="situation-title" className="h2-display max-w-[20ch]">
            Was beschäftigt Sie gerade?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SITUATIONEN.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 90}>
              <article
                className={`group h-full rounded-lg ${s.ground} p-8 text-paper/85 shadow-soft transition-transform duration-300 hover:-translate-y-1`}
              >
                <p className={`eyebrow ${s.accent}`}>{s.eyebrow}</p>
                <h3 className="mt-4 font-serif text-[24px] leading-snug font-semibold text-paper">
                  {s.question}
                </h3>
                <ul className="mt-6 space-y-2">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className={`inline-flex items-center gap-2 text-[16px] font-semibold ${s.accent}`}
                      >
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
