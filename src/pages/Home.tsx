import { ProjectCard } from "@/components/site/ProjectCard";
import {
  Container,
  GhostButton,
  GoldButton,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import {
  FEATURED_PROJECTS,
  FOUNDER_PORTRAIT,
  INSTAGRAM_FEED,
  PROCESS,
  SERVICES,
  STATS,
  STUDIO,
  TESTIMONIALS,
  VALUES,
} from "@/lib/studio";
import {
  ArrowRight,
  Compass,
  Instagram,
  Quote,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";
const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80";

const SERVICE_ICONS: Record<string, typeof Compass> = {
  architecture: Compass,
  interior: Sparkles,
  furniture: Sparkles,
  renovation: Compass,
  kitchen: Sparkles,
  vastu: Compass,
};

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate -mt-[74px] flex min-h-[100vh] items-center overflow-hidden pt-[74px]">
      <motion.div
        aria-hidden="true"
        initial={reduce ? undefined : { scale: 1.12, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          className="size-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/40 to-transparent"
      />

      <Container className="relative py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft backdrop-blur">
              <span className="size-1.5 rounded-full bg-gold" />
              Architecture & Interiors · Indore
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-8 text-4xl font-medium leading-[1.06] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            Homes that feel like you,
            <span className="block font-display italic text-gradient-gold">
              designed to stay that way.
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="mt-7 max-w-xl text-base leading-8 text-foreground/75 sm:text-lg"
          >
            {STUDIO.name} is an Indore-based design studio creating unique
            architectural and interior solutions — modern, warm and quietly
            Vastu-aligned. Thoughtful design, made personal.
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <GoldButton to="/projects">
              Explore Projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </GoldButton>
            <GhostButton to="/contact" className="border-white/25 bg-black/20 backdrop-blur">
              Start Your Journey
            </GhostButton>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.32em] text-foreground/50">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </div>
    </section>
  );
}

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
    <Section id="work">
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

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROJECTS.slice(0, 6).map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
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
              <img
                src={FOUNDER_PORTRAIT}
                alt={`${STUDIO.founder}, founder of ${STUDIO.name}`}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-52 rounded-2xl border border-border bg-background/90 p-5 backdrop-blur sm:block">
              <p className="font-display text-3xl italic text-gold">Harish</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Founder & Principal Designer
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Eyebrow index="02">The Studio</Eyebrow>
          <h2 className="mt-6 text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
            “A home should feel finished the moment you walk in — and warmer
            with every year.”
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-muted-foreground">
            Founded in 2014 by {STUDIO.founder}, {STUDIO.name} has grown into a
            close-knit studio of architects, interior designers and craftspeople.
            We work the way we design: slowly, carefully, and always around the
            people who will live in the space.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
            From bungalows in Vijay Nagar to boutique workplaces in Palasia, our
            work blends modern aesthetics with cozy comfort — layering timber,
            stone and glass with a warm, understated luxury that never shouts.
          </p>

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

          <div className="mt-9">
            <GhostButton to="/about">
              Meet the studio
              <ArrowRight className="size-4" />
            </GhostButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ServicesPreview() {
  return (
    <Section id="services" className="border-t border-border">
      <SectionHeading
        index="03"
        eyebrow="What We Do"
        title={
          <>
            Six disciplines,{" "}
            <span className="font-display italic text-gold">one continuous</span>{" "}
            design language.
          </>
        }
        description="Whether it's a ground-up bungalow or a single warm kitchen, we bring the same care, craft and coordination to every scale."
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Compass;
          return (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <Link
                to="/services"
                className="group relative flex h-full flex-col rounded-2xl border border-border card-sheen p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  <Icon className="size-5" />
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
          index="04"
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

function StudioGallery() {
  return (
    <Section className="border-t border-border">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="05"
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
          <div className="mt-8 flex flex-wrap gap-3">
            {["Timber", "Travertine", "Terracotta", "Brass", "Lime plaster", "Glass"].map(
              (m) => (
                <span
                  key={m}
                  className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                >
                  {m}
                </span>
              ),
            )}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={STUDIO_IMAGE}
              alt="Warm interior detail"
              className="col-span-2 aspect-[16/10] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80"
              alt="Bedroom interior"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80"
              alt="Modular kitchen interior"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section className="border-t border-border bg-taupe">
      <SectionHeading
        index="06"
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
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-8">
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
    <Section className="border-t border-border">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading
          index="07"
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
          <a
            key={i}
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl border border-border"
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
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-taupe to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <Container className="relative py-24 text-center sm:py-32">
        <Reveal>
          <Eyebrow className="justify-center">Begin</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:text-5xl">
            Let's design a space that feels like{" "}
            <span className="font-display italic text-gradient-gold">
              exactly you.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
            Share your plot, your home or just an idea. We'll walk you through
            how we'd bring it to life — no obligation, just a good conversation.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoldButton to="/contact">
              Start Your Journey
              <ArrowRight className="size-4" />
            </GoldButton>
            <GhostButton to={STUDIO.whatsapp ? `tel:${STUDIO.phone}` : "/contact"} external>
              Call the studio
            </GhostButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProjects />
      <FounderStory />
      <ServicesPreview />
      <ProcessPreview />
      <StudioGallery />
      <Testimonials />
      <InstagramStrip />
      <FinalCTA />
    </>
  );
}
