import { CinematicHero } from "@/components/site/CinematicHero";
import { StackedFilms } from "@/components/site/StackedFilms";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import {
  Container,
  GhostButton,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { ParallaxImage, ParallaxLayer } from "@/components/site/Parallax";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import {
  FILMS,
  FOUNDER_PORTRAIT,
  INSTAGRAM_FEED,
  PROCESS,
  PROJECTS,
  SERVICES,
  STATS,
  STUDIO,
  TESTIMONIALS,
  VALUES,
} from "@/lib/studio";
import {
  ArrowRight,
  Instagram,
  Quote,
} from "lucide-react";
import { Link } from "react-router";

function StatsBar() {
  return (
    <div className="border-y border-border bg-taupe">
      <Container className="grid grid-cols-2 gap-y-10 py-12 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <div className="px-2 text-center">
              <p className="text-3xl font-medium tracking-tight text-gradient-gold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </Container>
    </div>
  );
}

function FeaturedProjects() {
  return (
    <Section id="work" className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title={
            <>
              Projects shaped by{" "}
              <span className="font-display italic text-gold">light, warmth</span>{" "}
              and how you live.
            </>
          }
          description="A look at recent homes, interiors and workplaces across Indore and central India — each one designed from a conversation, not a catalogue."
        />
        <Reveal delay={0.1} className="shrink-0">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            View all projects
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-gold/60 group-hover:text-gold">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <ProjectIndex projects={PROJECTS.slice(0, 6)} />
      </Reveal>
    </Section>
  );
}

function StudioFilms() {
  return (
    <Section id="films" className="scroll-mt-24 border-t border-border">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="02"
          eyebrow="Studio Films"
          title={
            <>
              Our work,{" "}
              <span className="font-display italic text-gold">in motion.</span>
            </>
          }
          description="Walk through recent homes and interiors the way a client does — quiet camera work, warm light and the small details that only show up on film."
        />
        <Reveal delay={0.1} className="shrink-0">
          <GhostButton to="/films">
            Watch all films
            <ArrowRight className="size-4" />
          </GhostButton>
        </Reveal>
      </div>

      <div className="mt-12">
        <StackedFilms films={FILMS.slice(0, 4)} />
      </div>
    </Section>
  );
}

function FounderStory() {
  return (
    <Section className="border-t border-border bg-taupe">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <ParallaxImage
                src={FOUNDER_PORTRAIT}
                alt={`${STUDIO.founder}, founder of ${STUDIO.name}`}
                strength={8}
                className="aspect-[4/5] w-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-52 rounded-2xl border border-border bg-background/90 p-5 backdrop-blur sm:block">
              <p className="font-display text-3xl italic text-gold">Harish</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Founder &amp; Principal Designer
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow index="03">The Studio</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
              “A home should feel finished the moment you walk in — and warmer
              with every year.”
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">
              Founded in 2014 by {STUDIO.founder}, {STUDIO.name} has grown into a
              close-knit studio of architects, interior designers and
              craftspeople. We work the way we design: slowly, carefully, and
              always around the people who will live in the space.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
              From bungalows in Vijay Nagar to boutique workplaces in Palasia,
              our work blends modern aesthetics with cozy comfort — layering
              timber, stone and glass with a warm, understated luxury that never
              shouts.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {VALUES.slice(0, 4).map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-background/40 p-5">
                  <p className="text-sm font-medium text-foreground">
                    {value.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <GhostButton to="/about">
                Meet the studio
                <ArrowRight className="size-4" />
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function StudioGallery() {
  return (
    <Section className="border-t border-border">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="04"
            eyebrow="Inside the Studio"
            title={
              <>
                Warm materials,{" "}
                <span className="font-display italic text-gold">
                  soft light,
                </span>{" "}
                honest craft.
              </>
            }
            description="We build every palette from timber, stone, glass, brass and lime plaster — natural materials that age gracefully and make a home feel lived-in from day one."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Timber",
                "Marble",
                "Concrete texture",
                "Brass",
                "Lime plaster",
                "Glass",
              ].map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <ParallaxLayer distance={40} className="space-y-3 sm:space-y-5">
            <ParallaxImage
              src="/studio/office-1.webp"
              alt="HM DESIGNZ studio — timber slat wall and marble desk"
              strength={7}
              className="aspect-[9/16] w-full rounded-2xl"
            />
          </ParallaxLayer>
          <ParallaxLayer distance={-30} className="space-y-3 pt-10 sm:space-y-5 sm:pt-16">
            <ParallaxImage
              src="/studio/office-2.webp"
              alt="Studio entry console with brass frame and compass clock"
              strength={7}
              className="aspect-[4/5] w-full rounded-2xl"
            />
            <ParallaxImage
              src="/studio/office-3.webp"
              alt="Hanging shelf on lime-plaster wall"
              strength={7}
              className="aspect-[4/5] w-full rounded-2xl"
            />
          </ParallaxLayer>
        </div>
      </div>
    </Section>
  );
}

function ServicesPreview() {
  return (
    <Section id="services" className="border-t border-border">
      <SectionHeading
        index="05"
        eyebrow="What We Do"
        title={
          <>
            Six disciplines,{" "}
            <span className="font-display italic text-gold">
              one continuous
            </span>{" "}
            design language.
          </>
        }
        description="Whether it's a ground-up bungalow or a single warm kitchen, we bring the same care, craft and coordination to every scale."
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          return (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <Link
                to="/services"
                className="group relative flex h-full flex-col rounded-2xl border border-border card-sheen p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
              >
                <span className="font-display text-3xl italic tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-medium tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-soft/80">
                  {service.tagline}
                </p>
                <p className="mt-4 flex-1 text-[14px] leading-7 text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-foreground/70 transition-colors group-hover:text-gold">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function ProcessPreview() {
  return (
    <Section className="border-t border-border bg-taupe">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="06"
          eyebrow="The Process"
          title={
            <>
              From first conversation to{" "}
              <span className="font-display italic text-gold">final key.</span>
            </>
          }
          description="A calm, transparent path — you always know what is happening, what is next, and how your home is coming together."
        />
        <Reveal delay={0.1} className="shrink-0">
          <GhostButton to="/process">
            See the full process
            <ArrowRight className="size-4" />
          </GhostButton>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {PROCESS.map((step, i) => (
          <Reveal key={step.index} delay={i * 0.06}>
            <div className="group h-full bg-background p-7 transition-colors duration-500 hover:bg-card">
              <span className="font-display text-3xl italic text-gold/80">
                {step.index}
              </span>
              <h3 className="mt-5 text-base font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                {step.duration}
              </p>
              <p className="mt-4 text-[13px] leading-6 text-muted-foreground">
                {step.summary}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section className="border-t border-border">
      <SectionHeading
        index="07"
        eyebrow="Kind Words"
        title={
          <>
            The relationships are the{" "}
            <span className="font-display italic text-gold">real project.</span>
          </>
        }
        align="center"
        className="mx-auto"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <Quote className="size-6 text-gold/70" />
              <blockquote className="mt-5 flex-1 text-[15px] leading-8 text-foreground/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function InstagramStrip() {
  return (
    <Section className="border-t border-border bg-taupe">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading
          index="08"
          eyebrow="Latest Works"
          title={
            <>
              Fresh from the{" "}
              <span className="font-display italic text-gold">studio feed.</span>
            </>
          }
        />
        <Reveal delay={0.1} className="shrink-0">
          <a
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-gold/50"
          >
            <span className="relative flex size-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full ig-ring" />
              <span className="absolute inset-[2px] rounded-full bg-background" />
              <Instagram className="relative size-4" />
            </span>
            @hmdesignz
          </a>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {INSTAGRAM_FEED.map((src, i) => (
          <Reveal key={i} delay={(i % 6) * 0.05}>
            <a
              href={STUDIO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl border border-border"
            >
              <img
                src={src}
                alt={`Studio work ${i + 1}`}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="size-5 text-white" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  const lines = [
    {
      label: "WhatsApp",
      value: "Message the studio",
      href: `https://wa.me/91${STUDIO.whatsapp.replace(/\D/g, "").slice(-10)}`,
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

  return (
    <section id="contact" className="scroll-mt-24 px-3 pb-3 pt-6 sm:px-6 sm:pb-6 sm:pt-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-taupe sm:rounded-[3rem]">
        <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:py-28">
          {/* Left: the invitation */}
          <div className="flex flex-col">
            <Reveal>
              <Eyebrow index="09">Begin</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-7 text-[2.75rem] font-medium leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem]">
                Let&apos;s{" "}
                <span className="font-display italic text-gradient-gold">
                  talk.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[15px] leading-8 text-muted-foreground">
                Share your plot, your home or just an idea. We&apos;ll walk you
                through how we&apos;d bring it to life — no obligation, just a
                good conversation.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-foreground/10">
              {lines.map((line, i) => (
                <Reveal as="li" key={line.label} delay={0.1 + i * 0.07}>
                  <a
                    href={line.href}
                    target={line.external ? "_blank" : undefined}
                    rel={line.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-foreground/10 py-5 transition-colors"
                  >
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.24em] text-gold">
                        {line.label}
                      </span>
                      <span className="mt-1 block text-lg transition-transform duration-500 group-hover:translate-x-2">
                        {line.value}
                      </span>
                    </span>
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground">
                      <ArrowRight className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.35}>
              <p className="mt-8 text-sm leading-7 text-muted-foreground">
                {STUDIO.address}
                <br />
                Mon–Sat · 10:00 am – 7:00 pm
              </p>
            </Reveal>
          </div>

          {/* Right: compact form */}
          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_80px_-50px_rgba(42,36,28,0.4)] sm:rounded-[2.25rem] sm:p-10">
              <h3 className="font-display text-3xl italic sm:text-4xl">
                Start your project
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A few lines are enough — we&apos;ll take it from there.
              </p>
              <div className="mt-8">
                <InquiryForm compact />
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Want the full brief?{" "}
                <Link
                  to="/contact"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Open the contact page
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <CinematicHero />
      <StatsBar />
      <FeaturedProjects />
      <StudioFilms />
      <FounderStory />
      <StudioGallery />
      <ServicesPreview />
      <ProcessPreview />
      <Testimonials />
      <InstagramStrip />
      <ContactSection />
    </>
  );
}