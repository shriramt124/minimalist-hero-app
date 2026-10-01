import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { STUDIO } from "@/lib/studio";
import { useMutation } from "convex/react";
import { Clock, Instagram, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PROJECT_TYPES = [
  "New Home / Bungalow",
  "Interior Design",
  "Modular Kitchen",
  "Renovation",
  "Commercial / Office",
  "Vastu Consultation",
];

const BUDGETS = [
  "Under ₹10 Lakh",
  "₹10–25 Lakh",
  "₹25–50 Lakh",
  "₹50 Lakh–1 Crore",
  "Above ₹1 Crore",
];

const inputClass =
  "h-12 rounded-xl border-border bg-background/60 px-4 text-sm placeholder:text-muted-foreground/70 focus-visible:border-gold/60 focus-visible:ring-gold/20";

export default function Contact() {
  const submitInquiry = useMutation(api.inquiries.submit);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitInquiry({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? "") || undefined,
        projectType: String(data.get("projectType") ?? "") || undefined,
        location: String(data.get("location") ?? "") || undefined,
        budget: String(data.get("budget") ?? "") || undefined,
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setDone(true);
      toast.success("Thank you — we'll be in touch within a day.", {
        description: "Your enquiry has reached the studio.",
      });
    } catch (error) {
      toast.error("We couldn't send that just now.", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const details = [
    {
      icon: MapPin,
      label: "Studio",
      value: STUDIO.address,
      href: "https://maps.google.com/?q=Vijay+Nagar+Indore",
    },
    {
      icon: Phone,
      label: "Call",
      value: STUDIO.phone,
      href: `tel:${STUDIO.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: STUDIO.email,
      href: `mailto:${STUDIO.email}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Sat · 10:00 am – 7:00 pm",
    },
  ];

  return (
    <>
      <PageHero
        index="Say Hello"
        eyebrow="Contact"
        title={
          <>
            Tell us about your{" "}
            <span className="font-display italic text-gradient-gold">
              space.
            </span>
          </>
        }
        description="Share a few details and we'll get back to you within a working day. Prefer to talk? Call or message the studio directly on WhatsApp — we'd love to hear about the project."
      />

      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border card-sheen p-7 sm:p-10">
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Start your project
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fields marked with * are required.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Full name *
                    </label>
                    <Input
                      name="name"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Phone / WhatsApp
                    </label>
                    <Input
                      name="phone"
                      placeholder="+91 00000 00000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Location
                    </label>
                    <Input
                      name="location"
                      placeholder="Area, city"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Project type
                    </label>
                    <select
                      name="projectType"
                      defaultValue=""
                      className="h-12 w-full rounded-xl border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition-colors focus:border-gold/60"
                    >
                      <option value="">Select a type</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-card">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Approx. budget
                    </label>
                    <select
                      name="budget"
                      defaultValue=""
                      className="h-12 w-full rounded-xl border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition-colors focus:border-gold/60"
                    >
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-card">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Tell us about the project *
                  </label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="A few lines about your space, timeline and what you're hoping for…"
                    className="min-h-32 rounded-xl border-border bg-background/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-gold/60 focus-visible:ring-gold/20"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-muted-foreground">
                    We reply personally — no bots, no auto-funnels.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 rounded-full bg-gold px-7 text-sm font-medium text-primary-foreground hover:bg-gold-soft"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </div>

                {done && (
                  <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
                    Your enquiry is with us. Expect a reply within one working
                    day.
                  </p>
                )}
              </form>
            </div>
          </Reveal>

          {/* Details + map */}
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-7">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  Studio details
                </p>
                <ul className="mt-6 space-y-6">
                  {details.map((d) => (
                    <li key={d.label} className="flex gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-gold">
                        <d.icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          {d.label}
                        </p>
                        {d.href ? (
                          <a
                            href={d.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block text-sm leading-6 text-foreground transition-colors hover:text-gold"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm leading-6 text-foreground">
                            {d.value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6">
                  <a
                    href={`https://wa.me/91${STUDIO.whatsapp.replace(/\D/g, "").slice(-10)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    Message on WhatsApp
                  </a>
                  <a
                    href={STUDIO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    <Instagram className="size-4 text-gold" />
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-3xl border border-border">
                <iframe
                  title="HM DESIGNZ studio location, Indore"
                  src="https://www.google.com/maps?q=Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh&output=embed"
                  className="h-72 w-full grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
