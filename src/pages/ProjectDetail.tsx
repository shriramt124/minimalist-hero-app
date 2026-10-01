import {
  GhostButton,
  GoldButton,
  Section,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { getProject, PROJECTS } from "@/lib/studio";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <Section className="flex min-h-[60vh] items-center">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            404
          </p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight">
            This project couldn't be found.
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            It may have been renamed or moved. Browse the full portfolio instead.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldButton to="/projects">
              <ArrowLeft className="size-4" />
              Back to projects
            </GoldButton>
          </div>
        </div>
      </Section>
    );
  }

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const meta = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Scope", value: project.scope },
    { label: "Timeline", value: project.duration },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/20"
        />
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8">
          <Reveal>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-gold"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              All projects
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold">
              <MapPin className="size-3.5" />
              {project.location}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.06] tracking-[-0.03em] text-balance sm:text-6xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/75">
              {project.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meta bar */}
      <div className="border-y border-border bg-taupe">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-6">
          {meta.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-foreground">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Overview + story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-2xl font-medium tracking-[-0.01em]">
                Overview
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  Materials
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {project.materials.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-9">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  Palette
                </p>
                <div className="mt-4 flex gap-3">
                  {project.palette.map((color) => (
                    <span
                      key={color}
                      className="size-10 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            {project.story.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[15px] leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.12}>
              <div className="mt-4 rounded-2xl border border-border bg-card p-7">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
                  Design Highlights
                </p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="text-sm leading-6 text-foreground/85">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="border-t border-border bg-taupe">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Gallery
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal
              key={src}
              delay={(i % 2) * 0.08}
              className={i % 3 === 0 ? "md:col-span-2" : undefined}
            >
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  loading="lazy"
                  className={
                    "w-full object-cover transition-transform duration-700 hover:scale-[1.03] " +
                    (i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]")
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Next project */}
      <section className="border-t border-border">
        <Link
          to={`/projects/${next.slug}`}
          className="group relative isolate flex min-h-[46vh] items-center overflow-hidden"
        >
          <img
            src={next.cover}
            alt={next.title}
            loading="lazy"
            className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-background/75 transition-colors duration-500 group-hover:bg-background/65" />
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              Next Project
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] sm:text-5xl">
              {next.title}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5 text-gold" />
              {next.location}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
              View project
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold group-hover:text-primary-foreground">
                <ArrowRight className="size-3.5" />
              </span>
            </span>
          </div>
        </Link>
      </section>

      <Section className="border-t border-border bg-taupe">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
            Imagine something like this for your own space.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <GoldButton to="/contact">
              Start Your Journey
              <ArrowRight className="size-4" />
            </GoldButton>
            <GhostButton to="/projects">Explore more projects</GhostButton>
          </div>
        </div>
      </Section>
    </>
  );
}
