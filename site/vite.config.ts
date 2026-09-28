import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

/**
 * Statische Website: Alle Seiten werden beim Build vorgerendert (SEO) und
 * danach im Browser hydriert. Dynamisches (Termine, Buchung, Verwaltung)
 * läuft direkt gegen Supabase. Unbekannte Pfade fallen auf die SPA-Hülle zurück.
 */
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: false,
      },
      spa: {
        enabled: true,
        maskPath: "/?spa=1",
        prerender: {
          outputPath: "/_shell",
          crawlLinks: false,
          retryCount: 0,
        },
      },
      pages: [
        { path: "/" },
        { path: "/sitemap.xml" },
        { path: "/admin", prerender: { enabled: false } },
        { path: "/auth", prerender: { enabled: false } },
      ],
    }),
    viteReact(),
  ],
});
