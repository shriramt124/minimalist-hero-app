import { InquiryForm } from "@/components/site/InquiryForm";
import { ParallaxImage } from "@/components/site/Parallax";
import { Container } from "@/components/site/primitives";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import { STUDIO } from "@/lib/studio";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

const whatsappHref = `https://wa.me/91${STUDIO.whatsapp.replace(/\D/g, "").slice(-10)}`;

const QUICK = [
  {
    label: "WhatsApp",
    value: "Message the studio",
    href: whatsappHref,
    external: true,
  },
  {
    label: "Call",
    value: STUDIO.phone,
    href: `tel:${STUDIO.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Email",
    value: STUDIO.email,
    href: `mailto:${STUDIO.email}`,
  },
];

const NEXT = [
  { step: "01", title: "We reply", body: "A personal response from the studio within one working day." },
  { step: "02", title: "We talk", body: "A relaxed call or visit to understand your space and how you live." },
  { step: "03", title: "We propose", body: "A clear scope, timeline and design direction — before anything is committed." },
];

export default function Contact() {
  return (
    <>
      {/* --- Headline --- */}
      <section className="pb-14 pt-[132px] sm:pb-20 sm:pt-[168px]">
        <Container>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-7 max-w-5xl text-[2.5rem] font-medium leading-[1.02] tracking-[-0.035em] text-balance sm:text-7xl lg:text-[5.5rem]">
              Let&apos;s design a space{" "}
              <span className="font-display italic text-gradient-gold">
                that feels like you.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-[15px] leading-8 text-muted-foreground sm:text-base">
              Share a few details and we&apos;ll reply within a working day.
              Prefer to talk? Reach the studio directly below.
            </p>
          </Reveal>

          {/* Direct lines */}
          <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4">
            {QUICK.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-taupe"
                >
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.24em] text-gold">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-[15px] text-foreground">
                      {item.value}
                    </span>
                  </span>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --- Form + studio photo --- */}
      <section className="border-t border-border bg-taupe py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Photo, pinned while the form scrolls */}
            <div className="relative order-2 lg:order-1">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <ParallaxImage
                    src="/studio/office-1.webp"
                    alt="HM DESIGNZ studio in Indore"
                    strength={7}
                    className="aspect-[4/5] w-full rounded-[2rem]"
                  />
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-6 space-y-4 text-sm">
                    <p className="flex gap-3 leading-6">
                      <MapPin className="mt-1 size-4 shrink-0 text-gold" />
                      <a
                        href="https://maps.google.com/?q=Vijay+Nagar+Indore"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-gold"
                      >
                        {STUDIO.address}
                      </a>
                    </p>
                    <p className="flex gap-3 leading-6 text-muted-foreground">
                      <Clock className="mt-1 size-4 shrink-0 text-gold" />
                      Mon–Sat · 10:00 am – 7:00 pm
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Form */}
            <Reveal className="order-1 lg:order-2">
              <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-50px_rgba(42,36,28,0.35)] sm:p-12">
                <h2 className="font-display text-4xl italic leading-tight sm:text-5xl">
                  Start your project
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Fields marked with * are required.
                </p>
                <div className="mt-10">
                  <InquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- What happens next --- */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <Eyebrow>What happens next</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {NEXT.map((n, i) => (
              <Reveal key={n.step} delay={0.1 * i}>
                <div className="border-t border-border pt-6">
                  <span className="font-display text-3xl italic text-gold">
                    {n.step}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --- Map --- */}
      <section className="px-3 pb-3 sm:px-6 sm:pb-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
            <iframe
              title="HM DESIGNZ studio location, Indore"
              src="https://www.google.com/maps?q=Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh&output=embed"
              className="h-[380px] w-full grayscale-[40%] sm:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:left-8 sm:top-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                Visit us
              </p>
              <p className="mt-1.5 font-display text-2xl italic">
                {STUDIO.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Vijay Nagar, Indore
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
