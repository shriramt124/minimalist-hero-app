import { PageHero } from "@/components/site/PageHero";
import { GhostButton, GoldButton, Section } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { PROCESS, STUDIO } from "@/lib/studio";
import { ArrowRight, MessageCircle, PenTool, Ruler, HardHat, KeyRound } from "lucide-react";

const STEP_ICONS = [MessageCircle, PenTool, Ruler, HardHat, KeyRound];

export default function Process() {
  return (
    <>
      <PageHero
        index="How We Work"
        eyebrow="The Process"
        title={
          <>
            A calm path from{" "}
            <span className="font-display italic text-gradient-gold">
              idea to handover.
            </span>
          </>
        }
        description="Design should never feel like guesswork. Here's exactly how a project moves through the studio — what happens, how long it takes, and what you'll receive at each stage."
      />

      <Section className="pt-12 sm:pt-16">
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline spine */}
          <span
            aria-hidden="true"
            className="absolute left-[26px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/60 via-border to-transparent sm:block"
          />

          <ol className="space-y-8">
            {PROCESS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageCircle;
              return (
                <Reveal as="li" key={step.index} delay={i * 0.05}>
                  <div className="relative sm:pl-20">
                    <span className="absolute left-0 top-1 hidden size-14 items-center justify-center rounded-full border border-border bg-background sm:flex">
                      <Icon className="size-5 text-gold" />
                    </span>

                    <div className="rounded-2xl border border-border card-sheen p-7 sm:p-9">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-display text-2xl italic text-gold/80">
                          {step.index}
                        </span>
                        <span className="rounded-full border border-border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          {step.duration}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm italic text-gold-soft/80">
                        {step.summary}
                      </p>
                      <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
                        {step.detail}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2.5 border-t border-border pt-6">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-full bg-muted px-4 py-2 text-xs text-foreground/80"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section className="border-t border-border bg-taupe">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
              Have a site, a home or just an idea?{" "}
              <span className="font-display italic text-gold">
                Start at step one.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">
              The first conversation is always free. Bring your plans, your
              Pinterest board, or nothing at all — we'll help you find the
              direction. We work across {STUDIO.city} and central India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GoldButton to="/contact">
                Book a discovery call
                <ArrowRight className="size-4" />
              </GoldButton>
              <GhostButton to="/projects">See past projects</GhostButton>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                alt="Studio reviewing drawings on site"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
