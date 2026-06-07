import { Link } from "react-router-dom";
import { ArrowRight, Coffee, ChefHat, Wheat } from "lucide-react";
import { ButtonLink } from "../components/ui/Button";
import { Reveal, StaggerContainer, StaggerItem } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SmartImage } from "../components/ui/SmartImage";
import { useMenu } from "../context/MenuContext";
import { cafe } from "../data/cafe";

const stats = [
  { value: "Roasted", label: "In-house, on Wolf Road" },
  { value: "50+", label: "Menu items daily" },
  { value: "7 days", label: "Open every week" },
];

const testimonials = [
  {
    quote: "Best coffee in town.",
    author: "Julie",
    role: "Grubhub review",
  },
  {
    quote:
      "Great food and fantastic coffee. The sandwich was delicious and the latte was amazing.",
    author: "Joseph E.",
    role: "Grubhub review",
  },
  {
    quote:
      "It was excellent — a mix with coffee and espresso. My first choice for the morning now.",
    author: "Uber Eats customer",
    role: "Verified review",
  },
];

const marqueeItems = [
  "Fresh Roasted Coffee",
  "House-Baked Pastries",
  "Breakfast All Day",
  "Specialty Lattes",
  "Organic Tea",
  "Albany NY",
];

export function Home() {
  const { featured } = useMenu();

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/hero-poster.jpg"
            alt=""
            priority
            aria-hidden
            className="h-full w-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />
        </div>

        <div className="page-shell relative z-10 pb-24 pt-36 md:pb-32">
          <Reveal delay={100}>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
              Albany, New York · Coffee Sanctuary
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-parchment md:text-7xl lg:text-8xl">
              We create food.
              <br />
              <span className="text-amber">You enjoy it.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-crema/80 md:text-lg">
              {cafe.description}
            </p>
          </Reveal>
          <Reveal delay={250} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/order">
              Order ahead
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink
              to="/menu"
              variant="outline"
              className="!border-crema/30 !text-parchment hover:!border-amber hover:!text-amber"
            >
              View the menu
            </ButtonLink>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-crema/50">
              Scroll
            </span>
            <div className="scroll-indicator h-8 w-px bg-gradient-to-b from-crema/0 via-crema/50 to-crema/0" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-espresso/5 bg-oat py-5">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 inline-flex items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-mocha/60"
            >
              {item}
              <span className="text-copper">◆</span>
            </span>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Best sellers"
            title="Start with what Albany orders most"
            description="Real favorites from our menu — lattes, specialty drinks, and breakfast made fresh every morning."
          />

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
            {featured.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  to="/order"
                  className="group relative block overflow-hidden rounded-2xl bg-oat"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.15em] text-amber">
                      {item.tag ?? "Featured"} · ${item.price.toFixed(2)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-parchment md:text-3xl">
                      {item.name}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-crema/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Order now <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-espresso py-24 md:py-32">
        <div className="page-shell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl">
                <SmartImage
                  src="/images/ritual.jpg"
                  alt="Fresh coffee at Professor Java's"
                  className="aspect-[4/3]"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="The sanctuary"
                title="Roasted, baked, and served on Wolf Road"
                description="Professor Java's roasts its own coffee, bakes its own treats, and makes sandwiches, wraps, and breakfast specials from open to close."
                light
              />
              <StaggerContainer className="mt-12 space-y-8">
                {[
                  {
                    icon: Coffee,
                    title: "Fresh-roasted coffee",
                    text: "Beans roasted in-house — from espresso to pour-over, brewed medium and bold.",
                  },
                  {
                    icon: Wheat,
                    title: "House-baked goods",
                    text: "Cinnamon buns, brownies, Awesome Bars, and muffins — flavors rotate daily.",
                  },
                  {
                    icon: ChefHat,
                    title: "Breakfast & lunch",
                    text: "Egg sandwiches, wraps, quesadillas, paninis, soups, and salads made to order.",
                  },
                ].map((item) => (
                  <StaggerItem
                    key={item.title}
                    className="flex gap-5 border-t border-crema/10 pt-8 first:border-0 first:pt-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper/20 text-amber">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-parchment">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-crema/70">
                        {item.text}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Reveal delay={150} className="mt-10">
                <ButtonLink
                  to="/about"
                  variant="outline"
                  className="!border-crema/30 !text-parchment hover:!border-amber hover:!text-amber"
                >
                  Our story
                  <ArrowRight size={16} />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-espresso/5 py-20 md:py-28">
        <div className="page-shell">
          <StaggerContainer className="grid gap-12 md:grid-cols-3">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="font-display text-4xl text-copper md:text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.15em] text-mocha/70">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Reviews"
            title="What Albany is saying"
            align="center"
          />
          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem
                key={t.author}
                className="rounded-2xl border border-espresso/5 bg-oat p-8 md:p-10"
              >
                <p className="font-display text-xl leading-relaxed text-espresso md:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 border-t border-espresso/10 pt-6">
                  <p className="text-sm font-medium text-espresso">{t.author}</p>
                  <p className="mt-1 text-xs text-mocha/60">{t.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <SmartImage src="/images/about-team.jpg" alt="" />
          <div className="absolute inset-0 bg-espresso/75" />
        </div>
        <div className="page-shell relative max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl text-parchment md:text-6xl lg:text-7xl">
              Visit us on Wolf Road
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-lg text-crema/80">
              {cafe.address.full} · {cafe.phone}. Order ahead or walk in — open{" "}
              {cafe.hours.summary.toLowerCase()}.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/order">Order ahead</ButtonLink>
            <ButtonLink
              to="/locations"
              variant="outline"
              className="!border-crema/30 !text-parchment hover:!border-amber hover:!text-amber"
            >
              Hours & directions
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
