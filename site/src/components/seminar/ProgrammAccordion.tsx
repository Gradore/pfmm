import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ProgrammBlock, Seminar } from "@/data/seminare";
import { cn } from "@/lib/utils";

/**
 * Programm als nummeriertes Akkordeon auf Basis von <details> — funktioniert
 * auch ohne JavaScript. Der erste Block ist offen; „Alle aufklappen“ steuert alle.
 */
export function ProgrammAccordion({ seminar }: { seminar: Seminar }) {
  const filter = seminar.durationFilter;
  const [aktiv, setAktiv] = useState(filter ? filter[0]!.id : "alle");
  const [alleOffen, setAlleOffen] = useState<boolean | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const sichtbar = seminar.programme.filter(
    (b) => !filter || aktiv === "alle" || !b.groups || b.groups.includes(aktiv),
  );

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (!filter) return;
    const richtung = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!richtung) return;
    e.preventDefault();
    const next = (index + richtung + filter.length) % filter.length;
    setAktiv(filter[next]!.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {filter && (
        <div
          role="tablist"
          aria-label="Trainingsumfang wählen"
          className="mt-6 flex flex-wrap gap-2"
        >
          {filter.map((f, i) => (
            <button
              key={f.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${f.id}`}
              aria-selected={aktiv === f.id}
              tabIndex={aktiv === f.id ? 0 : -1}
              onKeyDown={(e) => onTabKey(e, i)}
              onClick={() => setAktiv(f.id)}
              className={cn(
                "min-h-11 cursor-pointer rounded-lg border px-4 text-[15px] font-semibold transition-colors",
                aktiv === f.id
                  ? "border-brass-600 bg-brass-600 text-paper"
                  : "border-ink-200 bg-card text-ink-700 hover:border-brass-600 hover:text-brass-700",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setAlleOffen((v) => !v)}
          className="cursor-pointer text-[15px] font-semibold text-brass-700 underline underline-offset-4"
        >
          {alleOffen ? "Alle zuklappen" : "Alle aufklappen"}
        </button>
      </div>

      <ol role="list" className="mt-4 space-y-4">
        {sichtbar.map((block, i) => (
          <li key={block.n}>
            <ProgrammBlockItem block={block} defaultOpen={i === 0} forced={alleOffen} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProgrammBlockItem({
  block,
  defaultOpen,
  forced,
}: {
  block: ProgrammBlock;
  defaultOpen: boolean;
  forced: boolean | null;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (forced === null || !ref.current) return;
    ref.current.open = forced;
  }, [forced]);

  return (
    <details
      ref={ref}
      open={defaultOpen}
      className="group overflow-hidden rounded-lg border border-ink-200 bg-card shadow-soft"
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-bordeaux-700 font-serif text-[17px] font-semibold text-paper"
        >
          {block.n}
        </span>
        <span className="flex-1">
          <span className="block font-serif text-[21px] leading-snug font-semibold text-bordeaux-900">
            {block.title}
          </span>
          <span className="mt-1 block text-[15px] text-ink-500">{block.sub}</span>
        </span>
        <ChevronDown
          className="mt-2 size-5 shrink-0 text-brass-700 transition-transform duration-200 group-open:rotate-180"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </summary>

      <div className="border-t border-ink-200 px-6 pt-5 pb-6 sm:pl-19">
        <ul role="list" className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-[1.6] text-ink-700">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-600"
              />
              {item}
            </li>
          ))}
        </ul>

        {block.merke && (
          <figure className="mt-6 rounded-lg border-l-4 border-brass-600 bg-ink-100 p-5">
            <p className="eyebrow text-bordeaux-600">Merke</p>
            <blockquote className="mt-2 font-serif text-[18px] leading-[1.6] text-ink-900 italic">
              „{block.merke.text}“
            </blockquote>
            <figcaption className="mt-2 text-[15px] text-ink-500">
              — {block.merke.source}
            </figcaption>
          </figure>
        )}
      </div>
    </details>
  );
}
