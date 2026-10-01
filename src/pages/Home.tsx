import { CinematicHero } from "@/components/site/CinematicHero";
import { FilterChips } from "@/components/site/FilterChips";
import { InquiryForm } from "@/components/site/InquiryForm";
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
  Clock,
  Compass,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router";

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

/** A trimmed set of disciplines for the homepage grid. */
const HOME_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
] as const;
type HomeFilter = (typeof HOME_CATEGORIES)[number];

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
  const [filter, setFilter] = useState<HomeFilter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<HomeFilter, number>();
    HOME_CATEGORIES.forEach((category) => {
      map.set(
        category,
        category === "All"
          ? PROJECTS.length
          : PROJECTS.filter((p) => p.category === category).length,
      );
    });
    return map;
  }, []);

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

      <Reveal delay={0.12} className="mt-10">
        <FilterChips
          categories={HOME_CATEGORIES}
          active={filter}
          counts={counts}
          onChange={setFilter}
        />
      </Reveal>

      <div className="mt-12">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
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
                Founder &amp; Principal Designer
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow index="02">The Studio</Eyebrow>
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
            index="03"
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
                "Travertine",
                "Terracotta",
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
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={STUDIO_IMAGE}
              alt="Warm interior detail"
              loading="lazy"
              className="col-span-2 aspect-[16/10] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80"
              alt="Bedroom interior"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=80"
              alt="Modular kitchen interior"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ServicesPreview() {
  return (
    <Section id="services" className="border-t border-border">
      <SectionHeading
        index="04"
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
          index="05"
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
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow index="08" className="justify-center">
              Begin
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:text-5xl">
              Let's design a space that feels like{" "}
              <span className="font-display italic text-gradient-gold">
                exactly you.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
              Share your plot, your home or just an idea. We'll walk you through
              how we'd bring it to life — no obligation, just a good
              conversation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <div className="rounded-3xl border border-border card-sheen p-7 sm:p-10">
              <h3 className="text-2xl font-medium tracking-[-0.01em]">
                Start your project
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A few lines are enough — we'll take it from there.
              </p>
              <div className="mt-8">
                <InquiryForm compact />
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  Visit the studio
                </p>
                <ul className="mt-6 space-y-5">
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
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
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

            <Reveal delay={0.14}>
              <div className="overflow-hidden rounded-3xl border border-border">
                <iframe
                  title="HM DESIGNZ studio location, Indore"
                  src="https://www.google.com/maps?q=Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh&output=embed"
                  className="h-64 w-full grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <CinematicHero />
      <StatsBar />
      <FeaturedProjects />
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