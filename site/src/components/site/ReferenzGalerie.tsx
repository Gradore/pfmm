import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const BASE = "https://www.pfmm.de/das_angebot/konzeptentwicklungen/bilder/";
const BILDER = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  thumb: `${BASE}Bild${n}.jpg`,
  full: `${BASE}Bild${n}-1.jpg`,
  alt: `Referenzarbeit aus der Konzeptentwicklung — Beispiel ${n}`,
}));

/** Referenzgalerie mit Lightbox. Tastatur: ESC schließt, Pfeiltasten blättern. */
export function ReferenzGalerie() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setOpen((i) => (i === null ? i : (i + delta + BILDER.length) % BILDER.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open === null ? null : BILDER[open];

  return (
    <>
      <ul role="list" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BILDER.map((b, i) => (
          <Reveal as="li" key={b.thumb} delay={(i % 4) * 70}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full cursor-pointer overflow-hidden rounded-lg border border-ink-200 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brass-600 hover:shadow-lift focus-visible:outline-3 focus-visible:outline-brass-600 focus-visible:outline-offset-2"
            >
              <img
                src={b.thumb}
                alt={b.alt}
                width={480}
                height={340}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="block px-4 py-3 text-left text-[15px] font-semibold text-ink-700 group-hover:text-brass-700">
                Beispiel {i + 1} vergrößern
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="font-sans text-[16px] font-semibold text-ink-700">
            {current?.alt}
          </DialogTitle>
          {current && (
            <img
              src={current.full}
              alt={current.alt}
              width={1200}
              height={850}
              decoding="async"
              className="max-h-[70vh] w-full rounded-lg object-contain"
            />
          )}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="cursor-pointer font-semibold text-brass-700 underline underline-offset-4"
            >
              ← Vorheriges Beispiel
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="cursor-pointer font-semibold text-brass-700 underline underline-offset-4"
            >
              Nächstes Beispiel →
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
