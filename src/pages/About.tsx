import { PageHero } from "@/components/site/PageHero";
import {
  GhostButton,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { AWARDS, FOUNDER_PORTRAIT, STATS, STUDIO, VALUES } from "@/lib/studio";
import { ArrowRight, Award } from "lucide-react";

const CRAFT_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
];

export default function About() {
  return (
    <>
      <PageHero
        index="The Studio"
        eyebrow="About HM DESIGNZ"
        title={
          <>
            A studio built on{" "}
            <span className="font-display italic text-gradient-gold">
              listening
            </span>{" "}
            before drawing.
          </>
        }
        description={`${STUDIO.name} is an architectural and interior design practice rooted in ${STUDIO.city}, ${STUDIO.region}. We design homes, workplaces and interiors that feel warm, considered and unmistakably yours.`}
      />

      {/* Founder story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={FOUNDER_PORTRAIT}
                  alt={STUDIO.founder}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="font-display text-4xl italic text-gold">
                  HM
                </span>
                <div>
                  <p className="text-sm font-medium">{STUDIO.founder}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Founder & Principal Designer
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <h2 className="text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-4xl">
                “We don't design for a photograph. We design for the way a
                family actually lives.”
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="space-y-5 text-[15px] leading-8 text-muted-foreground">
                <p>
                  {STUDIO.name} began in {STUDIO.founded} with a single belief:
                  that good design should feel personal long after the novelty of
                  a new space wears off. What started as a small practice in{" "}
                  {STUDIO.city} has grown into a studio of architects, interior
                  designers and craftspeople who share that same quiet
                  obsession.
                </p>
                <p>
                  We begin every project the same way — with a long, unhurried
                  conversation. How do you start your mornings? Where does the
                  family gather? What do you want to feel when you walk through
                  the door? Those answers shape everything that follows: the
                  plan, the light, the materials, the details you'll touch every
                  day.
                </p>
                <p>
                  Our visual language is modern but never cold — timber, stone,
                  glass and brass layered with warm, soft lighting. Where clients
                  want it, we weave in Vastu principles from the very first
                  sketch, so tradition and contemporary design move together
                  instead of competing.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-2xl font-medium tracking-tight text-gold">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="border-t border-border bg-taupe">
        <SectionHeading
          index="01"
          eyebrow="Our Philosophy"
          title={
            <>
              Warmth is a{" "}
              <span className="font-display italic text-gold">design value</span>{" "}
              — not an afterthought.
            </>
          }
          description="Luxury, to us, is a space that feels effortless. It is generous daylight, materials that age well, and rooms that invite you to slow down. We aim for beauty that doesn't demand attention."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-background p-7">
                <span className="font-display text-2xl italic text-gold/80">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-base font-medium tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Craft images */}
      <Section className="border-t border-border">
        <div className="grid gap-5 md:grid-cols-3">
          {CRAFT_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.07}>
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={src}
                  alt="Studio craft"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section className="border-t border-border bg-taupe">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            index="02"
            eyebrow="Recognition"
            title={
              <>
                Quiet accolades for{" "}
                <span className="font-display italic text-gold">
                  careful work.
                </span>
              </>
            }
            description="We don't design for awards — but it's lovely when the work is noticed. Our gratitude goes to the families and teams who trusted us with their spaces."
          />
          <div className="divide-y divide-border border-y border-border">
            {AWARDS.map((award, i) => (
              <Reveal key={award.title} delay={i * 0.05}>
                <div className="flex items-center gap-5 py-6">
                  <span className="font-display text-2xl italic text-gold/80">
                    {award.year}
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-border text-gold">
                    <Award className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {award.title}
                    </p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {award.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border">
        <div className="overflow-hidden rounded-3xl border border-border card-sheen">
          <div className="flex flex-col items-center gap-6 px-8 py-16 text-center sm:px-16">
            <h2 className="max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
              Come see how we work — and let's talk about your space.
            </h2>
            <p className="max-w-xl text-[15px] leading-7 text-muted-foreground">
              Visit the studio in Vijay Nagar, or drop us a message. We're always
              happy to talk design, even before there's a project.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <GhostButton to="/contact">
                Book a consultation
                <ArrowRight className="size-4" />
              </GhostButton>
              <GhostButton to="/projects">View our work</GhostButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
