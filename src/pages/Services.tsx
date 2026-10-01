import { PageHero } from "@/components/site/PageHero";
import { GoldButton, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/studio";
import {
  ArrowRight,
  Armchair,
  Building2,
  ChefHat,
  Compass,
  Hammer,
  Sparkles,
} from "lucide-react";

const ICONS = {
  architecture: Building2,
  interior: Sparkles,
  furniture: Armchair,
  renovation: Hammer,
  kitchen: ChefHat,
  vastu: Compass,
} as const;

export default function Services() {
  return (
    <>
      <PageHero
        index="Capabilities"
        eyebrow="Services"
        title={
          <>
            Full-service design, from{" "}
            <span className="font-display italic text-gradient-gold">
              first line
            </span>{" "}
            to final flourish.
          </>
        }
        description="Architecture, interiors, bespoke furniture, kitchens and Vastu — delivered by one studio, in one continuous design language, so nothing feels stitched together."
      />

      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.05}>
                <div className="grid items-center gap-8 rounded-3xl border border-border card-sheen p-8 sm:p-10 lg:grid-cols-[auto_1fr_1fr]">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="size-6" />
                  </span>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-gold-soft/80">
                      {service.tagline}
                    </p>
                    <h2 className="mt-3 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-[14px] leading-7 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/50 p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      What's included
                    </p>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                          <span className="text-sm leading-6 text-foreground/85">
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-border bg-taupe">
        <SectionHeading
          eyebrow="How we scope"
          title={
            <>
              Every service,{" "}
              <span className="font-display italic text-gold">
                tailored to the brief.
              </span>
            </>
          }
          description="No two projects are the same, so we don't sell fixed packages. After a first conversation we'll share a clear scope, timeline and fee structure built around what your space actually needs."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 flex justify-center">
          <GoldButton to="/contact">
            Request a proposal
            <ArrowRight className="size-4" />
          </GoldButton>
        </div>
      </Section>
    </>
  );
}
