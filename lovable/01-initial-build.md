# Lovable-Anweisung 1 — Grundgerüst, Design-System, Startseite

Gesendet am 10.08.2026 als `initial_message` bei der Projekterstellung.

---

Build a complete, mobile-first relaunch of the German website **pfmm.de** — "Praxis für Marketing & Motivation", Erich Grikscheit, Karben near Frankfurt. React + TypeScript + Tailwind + shadcn/ui, React Router. ALL user-facing copy is **German**.

Positioning line: **"Führungstraining, das beim Denken anfängt."**

## 1. Design system
Colors as HSL tokens: bordeaux-600 `#A81F39` (brand), bordeaux-900 `#5E0A28`, bordeaux-700 `#8A0F3A`, brass-600 `#8A6624` (every CTA), brass-700 `#6E5019`, brass-400 `#C9A85E`, umbra-900 `#3D2510`, ink-900/700/500/200/100, paper. No pure red anywhere.
Typography: Lora (H1/H2/quotes) + Inter (body), self-hosted via @fontsource, no Google CDN. Body 18/17px, line-height 1.65. Max content width 1180px, 8px spacing scale, radius 14px.
Icons: lucide-react. Motion: staggered scroll-reveal, respects prefers-reduced-motion.

## 2. Centrepiece — `<TrainingsangeboteOrbit />`
Replaces the old static diagram. Centre pill "KUNDENAUFGABEN" plus seven satellites on a ring: Individuelle Seminare · Seminare aus dem Praxisangebot · Kreative Workshops · Coaching · Event-Training · Intervall-Training · Bedarfsorientierte Trainings.
Desktop: ring draws itself (stroke-dashoffset), cards stagger in clockwise, centre breathes, a glowing dot travels the arc, hover lifts the card and highlights its arc segment. Ring never rotates.
Mobile (<1024px): vertical spine instead of a shrunken circle — bordeaux band on top, vertical line, seven branching cards revealed on scroll, 48px tap targets.
Inline SVG for the ring, HTML cards for the labels, list semantics, keyboard operable.

## 3. Homepage sections
Sticky header · mobile off-canvas with focus trap · fixed mobile bottom bar (Anrufen · Erstgespräch) · hero with portrait and topic selector · trust bar · "Wo stehen Sie gerade?" (three question cards) · TrainingsangeboteOrbit · twelve topic tiles · next open seminar (02.–04.09.2026, "Zeit — Horizonte") · three Praxisbriefe · bordeaux quote band · Über-mich teaser · testimonials as visible placeholders · newsletter (double opt-in) · contact form with named person panel · four-column footer.

## 4. Routes
`/` `/leistungen/` `/leistungen/seminare/` `/leistungen/seminare/:slug` `/leistungen/inhouse/` `/leistungen/beratung/` `/leistungen/konzepte/` `/praxisbriefe/` `/praxisbriefe/:slug` `/leitfaeden/` `/ueber-mich/` `/kontakt/` `/anfahrt/` `/impressum/` `/datenschutz/` · 404

## 5. Technical requirements
Static viewport without scaling lock · one h1 per page · per-page title/description/canonical/OG via react-helmet-async · JSON-LD (LocalBusiness, Person, Course, Article, BreadcrumbList) · German alt texts, width/height on all images · tel: links, never format-detection=telephone=no · WCAG 2.1 AA (contrast, brass focus ring, keyboard, skip link, landmarks) · robots.txt + sitemap.xml · lang="de"
