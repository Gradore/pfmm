import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { ConsentBanner } from "@/components/site/ConsentBanner";
import { CONTACT } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="container-page section-y">
      <p className="eyebrow text-bordeaux-600">Fehler 404</p>
      <h1 className="h1-display mt-3">Diese Seite gibt es nicht (mehr).</h1>
      <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.65] text-ink-700">
        Die Adresse wurde geändert, die Seite wurde entfernt — oder es hat sich ein Tippfehler
        eingeschlichen. Diese drei Wege führen Sie weiter:
      </p>
      <ul role="list" className="mt-8 space-y-3 text-[18px]">
        <li>
          <Link to="/" className="font-semibold text-brass-700 underline underline-offset-4">
            Zur Startseite
          </Link>
        </li>
        <li>
          <Link
            to="/leistungen"
            className="font-semibold text-brass-700 underline underline-offset-4"
          >
            Leistungen — Seminare, Inhouse, Beratung
          </Link>
        </li>
        <li>
          <Link
            to="/praxisbriefe"
            className="font-semibold text-brass-700 underline underline-offset-4"
          >
            Praxisbriefe lesen
          </Link>
        </li>
      </ul>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="container-page section-y text-center">
      <h1 className="h1-display">Diese Seite konnte nicht geladen werden.</h1>
      <p className="mx-auto mt-4 max-w-[52ch] text-ink-700">
        Bitte laden Sie die Seite neu oder kehren Sie zur Startseite zurück.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex h-12 items-center rounded-lg bg-brass-600 px-6 font-semibold text-paper hover:bg-brass-700"
        >
          Erneut versuchen
        </button>
        <a
          href="/"
          className="inline-flex h-12 items-center rounded-lg border border-ink-200 px-6 font-semibold text-ink-900"
        >
          Zur Startseite
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Führungstraining, das beim Denken anfängt | Grikscheit" },
      {
        name: "description",
        content:
          "Praxis für Management – Training, Erich Grikscheit: Führungstraining, Seminare und philosophische Beratung für den Mittelstand — Karben bei Frankfurt.",
      },
      { name: "author", content: "Erich Grikscheit" },
      { property: "og:site_name", content: "Praxis für Management – Training" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: CONTACT.company,
          description:
            "Führungstraining, Seminare und philosophische Beratung für Führungskräfte im Mittelstand.",
          telephone: "+49 6039 45458",
          email: CONTACT.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: CONTACT.street,
            postalCode: CONTACT.zip,
            addressLocality: CONTACT.city,
            addressCountry: "DE",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: CONTACT.geo.lat,
            longitude: CONTACT.geo.lng,
          },
          founder: {
            "@type": "Person",
            name: CONTACT.person,
            jobTitle: "Trainer und Berater",
            sameAs: [CONTACT.linkedin],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brass-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-paper"
      >
        Zum Inhalt springen
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="inhalt" className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileActionBar />
      <ConsentBanner />
    </QueryClientProvider>
  );
}
