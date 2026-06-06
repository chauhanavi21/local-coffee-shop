import { Reveal, StaggerContainer, StaggerItem } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SmartImage } from "../components/ui/SmartImage";
import { ButtonLink } from "../components/ui/Button";
import { cafe } from "../data/cafe";

const highlights = [
  {
    title: "On-site coffee roasting",
    text: "We roast our own beans — French Roast, Guatemalan Antigua, Ethiopian Harrar, and more available by the pound.",
  },
  {
    title: "House-baked treats",
    text: "Cinnamon buns, brownies, scones, muffins, and our vegan Awesome Bars and Heavenly Oat Bars — baked fresh daily.",
  },
  {
    title: "Full breakfast & lunch",
    text: "From the Professor's Egg Sandwich and breakfast wraps to paninis, BLTs, soups, and salads — served open to close.",
  },
  {
    title: "Catering",
    text: "Box coffee to go, breakfast catering, and jet catering — ask about group orders for your next event.",
  },
];

const values = [
  {
    title: "Made here",
    text: "Coffee roasted, pastries baked, and sandwiches assembled under one roof on Wolf Road.",
  },
  {
    title: "Named with personality",
    text: "Every latte, wrap, and panini has a story — from the Cappawappacino to Sarah's Psychedelic Breakfast Wrap.",
  },
  {
    title: "Albany's gathering place",
    text: "A Capital District staple at Shoppers Park — grab a seat, take your order to go, or call ahead for pickup.",
  },
];

export function About() {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-espresso pt-32">
        <SmartImage
          src="/images/about-hero.jpg"
          alt="Coffee beans at Professor Java's"
          className="absolute inset-0 h-full w-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              Our story
            </p>
            <h1 className="max-w-4xl font-display text-5xl text-parchment md:text-7xl lg:text-8xl">
              Albany&apos;s coffee sanctuary
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Who we are"
              title={cafe.name}
              description="Professor Java's Coffee Sanctuary roasts its own coffee, bakes its own treats, and loves to create delicious sandwiches, wraps, and specials for everyone to enjoy — right here in Albany, New York."
            />
            <Reveal direction="right">
              <blockquote className="border-l-2 border-copper pl-8">
                <p className="font-display text-3xl leading-snug text-espresso md:text-4xl">
                  &ldquo;We create food, you enjoy it.&rdquo;
                </p>
                <footer className="mt-6 text-sm text-mocha/70">
                  — {cafe.shortName}
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-oat py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="More than a cup of coffee"
            align="center"
          />
          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2">
            {highlights.map((item) => (
              <StaggerItem
                key={item.title}
                className="rounded-2xl border border-espresso/5 bg-parchment p-8"
              >
                <h3 className="font-display text-2xl text-espresso">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mocha/70">
                  {item.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <SmartImage
                  src="/images/about-roasting.jpg"
                  alt="Coffee roasting at Professor Java's"
                  className="aspect-[4/3]"
                />
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="overflow-hidden rounded-2xl">
                <SmartImage
                  src="/images/about-sourcing.jpg"
                  alt="Fresh ingredients"
                  className="aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-espresso py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Values"
            title="Why locals keep coming back"
            light
            align="center"
          />
          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem
                key={v.title}
                className="rounded-2xl border border-crema/10 p-8 text-center md:p-10"
              >
                <h3 className="font-display text-2xl text-parchment">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-crema/70">{v.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 text-center md:py-32">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl text-espresso md:text-5xl">
              Come see us on Wolf Road
            </h2>
            <p className="mt-4 text-mocha/70">
              {cafe.address.full} · {cafe.hours.summary}
            </p>
            <ButtonLink to="/locations" className="mt-8">
              Get directions
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
