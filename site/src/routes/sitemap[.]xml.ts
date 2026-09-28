import { createFileRoute } from "@tanstack/react-router";
import { SEMINARE } from "@/data/seminare";
import { PRAXISBRIEFE } from "@/data/praxisbriefe";
import { SITE_URL } from "@/lib/konfig";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/leistungen", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/seminare", changefreq: "weekly", priority: "0.9" },
  { path: "/seminare/termine", changefreq: "weekly", priority: "0.8" },
  { path: "/leistungen/seminare/moderation-workshops", changefreq: "monthly", priority: "0.6" },
  { path: "/leistungen/seminare/zeit-effektivitaet", changefreq: "monthly", priority: "0.6" },
  { path: "/leistungen/seminare/fuehren-mit-zielen", changefreq: "monthly", priority: "0.6" },
  { path: "/leistungen/seminare/kraft-der-wertschaetzung", changefreq: "monthly", priority: "0.6" },
  ...SEMINARE.map((s) => ({
    path: `/leistungen/seminare/${s.slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  { path: "/leistungen/inhouse", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/beratung", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/konzepte", changefreq: "monthly", priority: "0.8" },
  { path: "/leistungen/talk", changefreq: "weekly", priority: "0.7" },
  { path: "/honorare", changefreq: "monthly", priority: "0.7" },
  { path: "/praxisbriefe", changefreq: "monthly", priority: "0.8" },
  ...PRAXISBRIEFE.map((b) => ({
    path: `/praxisbriefe/${b.slug}`,
    changefreq: "yearly" as const,
    priority: "0.6",
  })),
  { path: "/leitfaeden", changefreq: "monthly", priority: "0.7" },
  { path: "/ueber-mich", changefreq: "monthly", priority: "0.8" },
  { path: "/kontakt", changefreq: "monthly", priority: "0.9" },
  { path: "/anfahrt", changefreq: "yearly", priority: "0.5" },
  { path: "/impressum", changefreq: "yearly", priority: "0.3" },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
