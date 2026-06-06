import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cafe } from "../../data/cafe";

const footerLinks = {
  explore: [
    { to: "/menu", label: "Menu" },
    { to: "/order", label: "Order Ahead" },
    { to: "/about", label: "Our Story" },
    { to: "/locations", label: "Visit" },
  ],
  connect: [
    { to: "/contact", label: "Contact" },
    { href: cafe.phoneHref, label: cafe.phone, external: false },
    {
      href: cafe.facebook,
      label: "Facebook",
      external: true,
    },
    {
      href: cafe.website,
      label: "professorjavas.com",
      external: true,
    },
  ] as const,
};

export function Footer() {
  return (
    <footer className="bg-espresso text-crema">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-2xl text-parchment md:text-3xl">
              Professor <span className="text-copper">Java&apos;s</span>
            </Link>
            <p className="mt-1 text-sm text-amber/80">Coffee Sanctuary</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-crema/70">
              {cafe.description}
            </p>
            <div className="mt-6 flex items-start gap-2 text-sm text-crema/60">
              <MapPin size={14} className="mt-0.5 shrink-0 text-copper" />
              <span>{cafe.address.full}</span>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              Explore
            </p>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-crema/70 transition-colors hover:text-parchment"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber">
              Connect
            </p>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  {"href" in link ? (
                    <a
                      href={link.href}
                      className="text-sm text-crema/70 transition-colors hover:text-parchment"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm text-crema/70 transition-colors hover:text-parchment"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-crema/10 pt-8 md:flex-row">
          <p className="text-xs text-crema/40">
            © {new Date().getFullYear()} {cafe.name}. Albany, NY.
          </p>
          <p className="text-xs text-crema/40">{cafe.hours.summary}</p>
        </div>
      </div>
    </footer>
  );
}
