import { useState, type ReactNode } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SmartImage } from "../components/ui/SmartImage";
import { Reveal, StaggerContainer, StaggerItem } from "../components/ui/Reveal";
import { useMenu } from "../context/MenuContext";
import type { MenuCategory } from "../types/menu";
import { cafe } from "../data/cafe";
import { AddToOrderButton } from "../components/cart/AddToOrderButton";

export function Menu() {
  const { items, categories, retailBeans, loading, error } = useMenu();
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const filtered =
    active === "all"
      ? items
      : items.filter((item) => item.category === active);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-oat border-t-copper" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell py-32 text-center">
        <p className="text-mocha">{error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-espresso pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative page-shell">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              The menu
            </p>
            <h1 className="max-w-3xl font-display text-5xl text-parchment md:text-7xl">
              The Java Menu
            </h1>
            <p className="mt-6 max-w-xl text-crema/70">
              {cafe.menuSource} Ask about dairy-free and vegan options. Muffin,
              scone, and brownie flavors rotate daily.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-b border-espresso/5 bg-parchment/95">
        <div className="page-shell flex gap-2 overflow-x-auto py-4">
          <FilterButton
            active={active === "all"}
            onClick={() => setActive("all")}
          >
            All
          </FilterButton>
          {categories.map((cat) => (
            <FilterButton
              key={cat.id}
              active={active === cat.id}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </FilterButton>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="page-shell">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-espresso/5 bg-oat"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-espresso/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl text-espresso md:text-2xl">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-medium text-copper">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mocha/70">
                    {item.description}
                  </p>
                  <AddToOrderButton item={item} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-espresso/5 bg-oat py-20 md:py-28">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Retail"
            title="Take the roast home"
            description="Whole beans, ground to order. Rotating single-origin bags available at all locations and online."
          />
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {retailBeans.map((bean) => (
              <StaggerItem
                key={bean.name}
                className="rounded-2xl border border-espresso/5 bg-parchment p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-espresso/5"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-copper">
                  {bean.note}
                </p>
                <h3 className="mt-3 font-display text-2xl text-espresso">
                  {bean.name}
                </h3>
                <p className="mt-4 font-medium text-mocha">
                  ${bean.price.toFixed(2)} · 1 lb
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-espresso text-parchment shadow-md"
          : "bg-oat text-mocha hover:bg-crema"
      }`}
    >
      {children}
    </button>
  );
}
