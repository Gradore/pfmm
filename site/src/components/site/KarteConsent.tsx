import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site";
import { useConsent, writeConsent, readConsent } from "@/lib/consent";

const { lat, lng } = CONTACT.geo;
const BBOX = `${lng - 0.006},${lat - 0.004},${lng + 0.006},${lat + 0.004}`;
const EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${lat},${lng}`;
const LINK = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

/** Zwei-Klick-Lösung: Die Karte wird erst nach ausdrücklicher Zustimmung geladen. */
export function KarteConsent() {
  const [einmalig, setEinmalig] = useState(false);
  const { consent } = useConsent();
  const geladen = einmalig || !!consent?.karten;

  const zustimmen = () => {
    const aktuell = readConsent();
    writeConsent({ analyse: !!aktuell?.analyse, karten: true });
    setEinmalig(true);
  };

  if (geladen) {
    return (
      <figure className="overflow-hidden rounded-lg border border-ink-200 shadow-soft">
        <iframe
          title="Karte: Max-Planck-Str. 27, 61184 Karben"
          src={EMBED}
          width={800}
          height={420}
          loading="lazy"
          className="h-[420px] w-full border-0"
        />
        <figcaption className="bg-card px-5 py-4 text-[15px] text-ink-500">
          Kartendaten von OpenStreetMap.{" "}
          <a
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brass-700 underline underline-offset-4"
          >
            Größere Karte öffnen
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5 rounded-lg border border-dashed border-ink-200 bg-ink-100 p-8">
      <MapPin className="size-8 text-bordeaux-600" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-[60ch] text-ink-700">
        Hier können Sie eine Karte mit dem Standort Max-Planck-Str. 27, 61184 Karben laden. Die
        Kartendaten werden dabei von einem externen Anbieter (OpenStreetMap) geladen; dabei wird
        Ihre IP-Adresse an diesen Anbieter übertragen. Ohne Ihre Zustimmung wird nichts geladen.
      </p>
      <Button variant="brass" size="lg" onClick={zustimmen}>
        Karte laden
      </Button>
    </div>
  );
}
