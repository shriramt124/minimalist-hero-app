import { InquiryForm } from "@/components/site/InquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { STUDIO } from "@/lib/studio";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
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

              <div className="mt-8">
                <InquiryForm />
              </div>
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
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
                  >
                    <MessageCircle className="size-4" />
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