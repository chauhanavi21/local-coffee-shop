import { MapPin, Phone, Clock } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SmartImage } from "../components/ui/SmartImage";
import { ButtonLink } from "../components/ui/Button";
import { locations } from "../data/locations";
import { cafe } from "../data/cafe";

export function Locations() {
  const loc = locations[0];

  return (
    <>
      <section className="bg-oat pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Visit us"
            title="Find us on Wolf Road"
            description="One location in Albany's Shoppers Park — fresh coffee, breakfast, and lunch served daily."
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="page-shell">
          <Reveal>
            <article className="group overflow-hidden rounded-2xl border border-espresso/5 bg-parchment">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                  <SmartImage
                    src={loc.image}
                    alt={loc.name}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                    Shoppers Park · Albany, NY
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-espresso md:text-4xl">
                    {loc.name}
                  </h2>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3 text-sm text-mocha/80">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-copper" />
                      <div>
                        <p>{loc.address}</p>
                        <p>{loc.city}</p>
                        <p className="mt-1 text-xs text-mocha/60">
                          {cafe.address.place}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-mocha/80">
                      <Clock size={16} className="shrink-0 text-copper" />
                      <div>
                        <p>{cafe.hours.weekday}</p>
                        <p>{cafe.hours.sunday}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-mocha/80">
                      <Phone size={16} className="shrink-0 text-copper" />
                      <a
                        href={cafe.phoneHref}
                        className="transition-colors hover:text-copper"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {loc.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-oat px-4 py-1.5 text-xs font-medium text-mocha"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <ButtonLink to="/order">Order ahead</ButtonLink>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium text-espresso transition-colors hover:border-copper hover:text-copper"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-espresso/5 bg-espresso py-20 md:py-28">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Hours"
            title="Open seven days a week"
            description="Closed on major holidays. Menu served from open to close."
            light
            align="center"
          />
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
            <StaggerItem className="rounded-2xl border border-crema/10 p-8 text-center">
              <h3 className="font-display text-xl text-parchment">Mon – Sat</h3>
              <p className="mt-3 text-2xl text-amber">7:00 AM – 9:00 PM</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-crema/10 p-8 text-center">
              <h3 className="font-display text-xl text-parchment">Sunday</h3>
              <p className="mt-3 text-2xl text-amber">7:00 AM – 7:00 PM</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
