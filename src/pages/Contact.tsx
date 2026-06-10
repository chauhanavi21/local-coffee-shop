import { useEffect, useState, type FormEvent } from "react";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { SmartImage } from "../components/ui/SmartImage";
import { api, ApiError, type ContactInfoDTO } from "../lib/api";
import { cafe } from "../data/cafe";

const sectionIcons = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
} as const;

function fallbackContact(): ContactInfoDTO {
  return {
    businessName: cafe.name,
    shortName: cafe.shortName,
    tagline: cafe.tagline,
    description: cafe.description,
    hero: {
      eyebrow: "Contact",
      title: "We'd love to hear from you",
      image: "/images/contact.jpg",
    },
    form: {
      title: "Send a message",
      description: "Catering inquiries, feedback, or questions about our menu.",
    },
    address: { ...cafe.address },
    phone: cafe.phone,
    phoneHref: cafe.phoneHref,
    email: "",
    emailHref: "",
    website: cafe.website,
    facebook: cafe.facebook,
    hours: { ...cafe.hours },
    mapQuery: cafe.address.full,
    sections: [
      {
        id: "address",
        icon: "map-pin",
        label: "Address",
        value: cafe.address.full,
      },
      {
        id: "phone",
        icon: "phone",
        label: "Phone",
        value: cafe.phone,
        href: cafe.phoneHref,
      },
      {
        id: "hours",
        icon: "clock",
        label: "Hours",
        value: `${cafe.hours.weekday} · ${cafe.hours.sunday}`,
      },
    ],
  };
}

export function Contact() {
  const [contact, setContact] = useState<ContactInfoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    api
      .getContact()
      .then((data) => {
        if (!cancelled) setContact(data.contact);
      })
      .catch(() => {
        if (!cancelled) setContact(fallbackContact());
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const info = contact ?? fallbackContact();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.submitContactMessage({
        firstName,
        lastName,
        email,
        subject,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-espresso pt-32 pb-20 md:pt-40">
        <div className="page-shell relative">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber">
              {info.hero.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-5xl text-parchment md:text-7xl">
              {info.hero.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="page-shell grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <SmartImage
                src={info.hero.image}
                alt={info.businessName}
                className="aspect-[4/3]"
              />
            </div>

            {loading ? (
              <div className="mt-10 flex items-center gap-3 text-sm text-mocha/60">
                <Loader2 size={18} className="animate-spin" />
                Loading contact details...
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                {info.sections.map((item) => {
                  const Icon = sectionIcons[item.icon as keyof typeof sectionIcons] ?? MapPin;

                  return (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oat text-copper">
                        <Icon size={18} />
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
                  );
                })}

                {info.mapQuery && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-copper transition-colors hover:text-espresso"
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </a>
                )}
              </div>
            )}
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
                  Thanks for reaching out. Your message is saved and our team will
                  follow up soon. For immediate questions, call us at{" "}
                  <a href={info.phoneHref} className="text-copper hover:underline">
                    {info.phone}
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
                  {info.form.title}
                </h2>
                <p className="mt-2 text-sm text-mocha/70">
                  {info.form.description}
                </p>

                {error && (
                  <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First name"
                      name="firstName"
                      value={firstName}
                      onChange={setFirstName}
                      required
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      value={lastName}
                      onChange={setLastName}
                      required
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                  <Field
                    label="Subject"
                    name="subject"
                    value={subject}
                    onChange={setSubject}
                    required
                  />
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-xl border border-espresso/10 bg-parchment px-4 py-3 text-sm text-espresso outline-none transition-all focus:border-copper focus:ring-2 focus:ring-copper/20"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-8 w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={16} />
                    </>
                  )}
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
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-espresso/10 bg-parchment px-4 py-3 text-sm text-espresso outline-none transition-all focus:border-copper focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}
