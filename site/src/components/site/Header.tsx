import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEISTUNGEN, MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { OFFENE_SEMINARE } from "@/data/offene-seminare";

function SailMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M16 2 L28 28 H16 Z" fill="currentColor" />
      <path d="M13 12 L4 28 h9 Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"seminare" | "leistungen" | null>(null);
  const [mobileGroup, setMobileGroup] = useState<"seminare" | "leistungen" | null>("seminare");
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Off-canvas: Body-Scroll-Lock, ESC, Focus-Trap
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full self-stretch border-b border-ink-200 bg-background/95 transition-all duration-300",
        scrolled ? "shadow-soft" : "",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <Link to="/" className="flex items-center gap-3" aria-label="Zur Startseite">
          <SailMark className="size-8 shrink-0 text-bordeaux-600" />
          <span className="leading-tight">
            <span className="block font-serif text-[19px] font-semibold tracking-tight text-bordeaux-900">
              GRIKSCHEIT
            </span>
            <span className="hidden text-[12px] tracking-wide text-ink-500 sm:block">
              Praxis für Marketing &amp; Motivation
            </span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setMenu("seminare")}
            onMouseLeave={() => setMenu(null)}
          >
            <button
              type="button"
              aria-expanded={menu === "seminare"}
              aria-haspopup="true"
              onClick={() => setMenu((v) => (v === "seminare" ? null : "seminare"))}
              aria-current={isActive("/leistungen/seminare") ? "page" : undefined}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-[16px] font-medium text-ink-700 transition-colors hover:text-bordeaux-700",
                isActive("/leistungen/seminare") && "text-bordeaux-700",
              )}
            >
              Seminare
              <ChevronDown className="size-4" strokeWidth={1.5} />
            </button>
            {menu === "seminare" && (
              <div className="absolute top-full left-0 w-80 rounded-lg border border-ink-200 bg-popover p-2 shadow-lift">
                {OFFENE_SEMINARE.map(({ name, seminar: s, dauer }) => (
                  s ? (
                  <Link
                    key={s.slug}
                    to="/leistungen/seminare/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[15px] text-ink-700 transition-colors hover:bg-muted hover:text-bordeaux-700"
                  >
                    <span className="flex items-center gap-2">
                      {s.isOpenDate && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-full bg-brass-600"
                        />
                      )}
                      {name}
                    </span>
                    <span className="shrink-0 text-[13px] text-ink-500">
                      {dauer}
                    </span>
                  </Link>
                  ) : <span key={name} className="flex items-center justify-between gap-3 px-3 py-2 text-[15px] text-ink-700">{name}<small>{dauer}</small></span>
                ))}
                <Link to="/seminare/termine" className="block rounded-md px-3 py-2 text-[15px] font-semibold text-brass-700">Termine &amp; Anmeldung</Link>
                <Link
                  to="/leistungen/seminare"
                  className="mt-2 block border-t border-ink-200 px-3 pt-3 pb-1 text-[15px] font-semibold text-brass-700 hover:text-brass-600"
                >
                  Alle Seminare ansehen →
                </Link>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setMenu("leistungen")}
            onMouseLeave={() => setMenu(null)}
          >
            <button
              type="button"
              aria-expanded={menu === "leistungen"}
              aria-haspopup="true"
              onClick={() => setMenu((v) => (v === "leistungen" ? null : "leistungen"))}
              aria-current={isActive("/leistungen") ? "page" : undefined}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-[16px] font-medium text-ink-700 transition-colors hover:text-bordeaux-700",
                isActive("/leistungen") && "text-bordeaux-700",
              )}
            >
              Leistungen
              <ChevronDown className="size-4" strokeWidth={1.5} />
            </button>
            {menu === "leistungen" && (
              <div className="absolute top-full left-0 w-64 rounded-lg border border-ink-200 bg-popover p-2 shadow-lift">
                {LEISTUNGEN.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-md px-3 py-2 text-[15px] text-ink-700 transition-colors hover:bg-muted hover:text-bordeaux-700"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {MAIN_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              aria-current={isActive(n.to) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-[16px] font-medium text-ink-700 transition-colors hover:text-bordeaux-700",
                isActive(n.to) && "text-bordeaux-700",
              )}
            >
              {n.label}
            </Link>
          ))}

          <Button asChild variant="brass" size="default" className="ml-3">
            <Link to="/kontakt">Erstgespräch vereinbaren</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-lg border border-ink-200 text-ink-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-6" strokeWidth={1.5} />
          ) : (
            <Menu className="size-6" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[70] lg:hidden">
            <button
              type="button"
              aria-label="Menü schließen"
              className="absolute inset-0 bg-ink-900/60"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-background p-6 shadow-lift"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mb-6 ml-auto flex size-12 items-center justify-center rounded-lg border border-ink-200"
                aria-label="Menü schließen"
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                <button
                  type="button"
                  aria-expanded={mobileGroup === "seminare"}
                  onClick={() => setMobileGroup((v) => (v === "seminare" ? null : "seminare"))}
                  className="flex min-h-12 items-center justify-between rounded-md px-2 text-[17px] font-semibold text-ink-900"
                >
                  Seminare
                  <ChevronDown
                    className={cn(
                      "size-5 transition-transform",
                      mobileGroup === "seminare" && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {mobileGroup === "seminare" && (
                  <>
                    {OFFENE_SEMINARE.map(({ name, seminar: s, dauer }) => (
                      s ? (
                      <Link
                        key={s.slug}
                        to="/leistungen/seminare/$slug"
                        params={{ slug: s.slug }}
                        className="flex min-h-12 items-center justify-between gap-3 rounded-md px-4 text-[16px] text-ink-700"
                      >
                        <span className="flex items-center gap-2">
                          {s.isOpenDate && (
                            <span
                              aria-hidden="true"
                              className="size-1.5 shrink-0 rounded-full bg-brass-600"
                            />
                          )}
                          {name}
                        </span>
                        <span className="shrink-0 text-[13px] text-ink-500">
                          {dauer}
                        </span>
                      </Link>
                      ) : <span key={name} className="flex min-h-12 items-center justify-between gap-3 px-4 text-[16px] text-ink-700">{name}<small>{dauer}</small></span>
                    ))}
                    <Link to="/seminare/termine" className="flex min-h-12 items-center rounded-md px-4 text-[16px] font-semibold text-brass-700">Termine &amp; Anmeldung</Link>
                    <Link
                      to="/leistungen/seminare"
                      className="flex min-h-12 items-center rounded-md px-4 text-[16px] font-semibold text-brass-700"
                    >
                      Alle Seminare ansehen →
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  aria-expanded={mobileGroup === "leistungen"}
                  onClick={() => setMobileGroup((v) => (v === "leistungen" ? null : "leistungen"))}
                  className="flex min-h-12 items-center justify-between rounded-md px-2 text-[17px] font-semibold text-ink-900"
                >
                  Leistungen
                  <ChevronDown
                    className={cn(
                      "size-5 transition-transform",
                      mobileGroup === "leistungen" && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {mobileGroup === "leistungen" &&
                  LEISTUNGEN.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="flex min-h-12 items-center rounded-md px-4 text-[16px] text-ink-700"
                    >
                      {l.label}
                    </Link>
                  ))}

                <span className="eyebrow mt-5 mb-1 text-ink-500">Mehr</span>
                {MAIN_NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="flex min-h-12 items-center rounded-md px-2 text-[17px] text-ink-700"
                  >
                    {n.label}
                  </Link>
                ))}

                <Button asChild variant="brass" size="lg" className="mt-6 w-full">
                  <Link to="/kontakt">Erstgespräch vereinbaren</Link>
                </Button>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
