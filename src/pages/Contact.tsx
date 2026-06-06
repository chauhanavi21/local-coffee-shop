import { useState, type FormEvent } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { SmartImage } from "../components/ui/SmartImage";
import { cafe } from "../data/cafe";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-espresso pt-32 pb-20 md:pt-40">
        <div className="page-shell relative">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              Contact
            </p>
            <h1 className="max-w-3xl font-display text-5xl text-parchment md:text-7xl">
              We&apos;d love to hear from you
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="page-shell grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <SmartImage
                src="/images/contact.jpg"
                alt="Professor Java's Coffee Sanctuary"
                className="aspect-[4/3]"
              />
            </div>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: cafe.address.full,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: cafe.phone,
                  href: cafe.phoneHref,
                },
                {
                  icon: MapPin,
                  label: "Hours",
                  value: `${cafe.hours.weekday} · ${cafe.hours.sunday}`,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oat text-copper">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-mocha/60">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-espresso transition-colors hover:text-copper"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-espresso">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-espresso/5 bg-oat p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-copper/20 text-copper">
                  <Send size={24} />
                </div>
                <h2 className="mt-6 font-display text-3xl text-espresso">
                  Message received
                </h2>
                <p className="mt-3 max-w-sm text-sm text-mocha/70">
                  Thanks for reaching out. For immediate questions, call us at{" "}
                  <a href={cafe.phoneHref} className="text-copper hover:underline">
                    {cafe.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-espresso/5 bg-oat p-8 md:p-10"
              >
                <h2 className="font-display text-2xl text-espresso">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-mocha/70">
                  Catering inquiries, feedback, or questions about our menu.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Subject" name="subject" required />
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-mocha/60"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full resize-none rounded-xl border border-espresso/10 bg-parchment px-4 py-3 text-sm text-espresso outline-none transition-all focus:border-copper focus:ring-2 focus:ring-copper/20"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-8 w-full sm:w-auto">
                  Send message
                  <Send size={16} />
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = name;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-mocha/60"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-espresso/10 bg-parchment px-4 py-3 text-sm text-espresso outline-none transition-all focus:border-copper focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}
