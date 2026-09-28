import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";

/** Brotkrumen + genau eine H1 + Lead. Für alle Leistungs- und Inhaltsseiten. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <Reveal>
        <div className="container-page pt-10">
          {eyebrow && <p className="eyebrow text-bordeaux-600">{eyebrow}</p>}
          <h1 className="h1-display mt-3 max-w-[22ch] text-ink-900">{title}</h1>
          {lead && <p className="lead-text mt-6 max-w-[68ch] text-ink-700">{lead}</p>}
          {children}
        </div>
      </Reveal>
    </>
  );
}
