import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useInView, useReducedMotion } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type Format = { label: string; to: string };

const FORMATE: Format[] = [
  { label: "Individuelle Seminare", to: "/leistungen/inhouse" },
  { label: "Seminare aus dem Praxisangebot", to: "/leistungen/seminare" },
  { label: "Kreative Workshops", to: "/leistungen/konzepte" },
  { label: "Beratungsgespräche", to: "/leistungen/beratung" },
  { label: "Event-Training", to: "/leistungen/inhouse" },
  { label: "Intervall-Training", to: "/leistungen/inhouse" },
  { label: "Bedarfsorientierte Trainings", to: "/leistungen/inhouse" },
];

const SIZE = 720;
const C = SIZE / 2;
const R = 252;
const STEP = 360 / FORMATE.length;
const CIRCUMFERENCE = 2 * Math.PI * R;

function polar(angleDeg: number, radius = R) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

function arcSegment(index: number) {
  const from = polar(index * STEP - STEP / 2);
  const to = polar(index * STEP + STEP / 2);
  return `M ${from.x} ${from.y} A ${R} ${R} 0 0 1 ${to.x} ${to.y}`;
}

const RING_PATH = `M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R} Z`;

export function TrainingsangeboteOrbit() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [laufend, setLaufend] = useState<number | null>(null);
  const active = reduced || inView;
  useEffect(() => {
    if (!inView || reduced) return;
    const started = performance.now();
    const timer = window.setInterval(() => {
      const progress = ((performance.now() - started) % 12000) / 12000;
      setLaufend(Math.round(progress * FORMATE.length) % FORMATE.length);
    }, 90);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  return (
    <div ref={ref} aria-label="Sieben Trainingsformate rund um Ihr Trainingskonzept" role="group">
      {/* ---------- Mobil: vertikale Spine ---------- */}
      <div className="lg:hidden">
        <div
          className={cn(
            "rounded-lg bg-bordeaux-700 px-5 py-4 text-center text-paper shadow-soft transition-all duration-700",
            active ? "reveal-in" : "reveal",
          )}
        >
          <span className="eyebrow block text-brass-400">Ausgangspunkt</span>
          <span className="mt-1 block font-serif text-[22px] font-semibold">Trainingskonzept</span>
        </div>

        <ul role="list" className="relative mt-6 space-y-4 pl-7">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 bottom-6 left-[7px] w-px origin-top bg-bordeaux-600/50 transition-transform duration-1000 ease-out",
              active ? "scale-y-100" : "scale-y-0",
            )}
          />
          {FORMATE.map((f, i) => (
            <li key={f.label} role="listitem" className="relative">
              <span
                aria-hidden="true"
                className="absolute top-[26px] -left-7 h-px w-5 bg-bordeaux-600/50"
              />
              <span
                aria-hidden="true"
                className="absolute top-[22px] -left-[26px] block size-2.5 rounded-full bg-bordeaux-600"
              />
              <Link
                to={f.to}
                style={{ transitionDelay: `${180 + i * 90}ms` }}
                className={cn(
                  "flex min-h-12 items-center rounded-lg border border-ink-200 bg-card px-4 py-3 text-[16px] font-semibold text-ink-900 shadow-soft transition-all duration-500 hover:border-brass-600 hover:text-brass-700",
                  laufend === i && "border-brass-600 text-brass-700",
                  active ? "reveal-in" : "reveal",
                )}
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Desktop: Orbit ---------- */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[720px] lg:block">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 size-full"
          aria-hidden="true"
          focusable="false"
        >
          <path id="pfmm-orbit-path" d={RING_PATH} fill="none" stroke="none" />
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--color-bordeaux-600)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={active && !reduced ? undefined : reduced ? 0 : CIRCUMFERENCE}
            style={
              active && !reduced
                ? {
                    strokeDashoffset: CIRCUMFERENCE,
                    animation: "pfmm-draw 1.2s ease-out forwards",
                  }
                : undefined
            }
            transform={`rotate(-90 ${C} ${C})`}
          />
          {hovered !== null && (
            <path
              d={arcSegment(hovered)}
              fill="none"
              stroke="var(--color-brass-600)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          {!reduced && (
            <circle r="5" fill="var(--color-brass-400)">
              <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                <mpath href="#pfmm-orbit-path" />
              </animateMotion>
            </circle>
          )}
        </svg>

        {/* Zentrum */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 flex w-[248px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[999px] bg-bordeaux-700 px-8 py-7 text-center text-paper shadow-lift transition-all duration-700",
            active ? "reveal-in" : "reveal",
          )}
          style={
            !reduced && active ? { animation: "pfmm-breathe 4s ease-in-out infinite" } : undefined
          }
        >
          <span className="eyebrow text-brass-400">Ausgangspunkt</span>
          <span className="mt-1 font-serif text-[26px] leading-tight font-semibold">
            Trainings&shy;konzept
          </span>
        </div>

        {/* Satelliten */}
        <ul role="list" className="absolute inset-0">
          {FORMATE.map((f, i) => {
            const p = polar(i * STEP);
            return (
              <li
                key={f.label}
                role="listitem"
                className="absolute w-[188px]"
                style={{
                  left: `${(p.x / SIZE) * 100}%`,
                  top: `${(p.y / SIZE) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Link
                  to={f.to}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  style={{ transitionDelay: `${900 + i * 90}ms` }}
                  className={cn(
                    "block rounded-lg border border-ink-200 bg-card px-4 py-3 text-center text-[15px] leading-snug font-semibold text-ink-900 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brass-600 hover:text-brass-700 hover:shadow-lift",
                    active ? "reveal-in scale-100" : "reveal scale-95",
                    (hovered === i || laufend === i) && "border-brass-600 text-brass-700 shadow-lift",
                  )}
                >
                  {f.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
