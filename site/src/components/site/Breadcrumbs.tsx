import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen-Navigation" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-[14px] text-ink-500">
        <li className="flex items-center gap-1">
          <Link to="/" className="hover:text-brass-700">
            Startseite
          </Link>
          <ChevronRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-brass-700">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-700">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** JSON-LD BreadcrumbList für Unterseiten. */
export function breadcrumbJsonLd(items: { name: string; item: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", item: "/" }, ...items].map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      item: e.item,
    })),
  });
}
