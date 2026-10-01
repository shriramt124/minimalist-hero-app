import { FeaturedFilm, FilmCard } from "@/components/site/FilmPlayer";
import { PageHero } from "@/components/site/PageHero";
import {
  GhostButton,
  GoldButton,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { FEATURED_FILM, FILMS, STUDIO } from "@/lib/studio";
import { ArrowRight, Clapperboard, Youtube } from "lucide-react";

const CATEGORIES = Array.from(new Set(FILMS.map((f) => f.category)));

export default function Films() {
  return (
    <>
      <PageHero
        index="Films"
        eyebrow="Studio Films"
        title={
          <>
            The studio,{" "}
            <span className="font-display italic text-gradient-gold">
              in motion.
            </span>
          </>
        }
        description="Walk through our homes and interiors the way a client does — quiet camera work, warm light and the small details that only show up on film. Every project below is real work from the studio in Indore."
        image={FEATURED_FILM.poster}
      >
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border bg-background/40 px-4 py-2 text-xs text-muted-foreground backdrop-blur"
            >
              {category}
            </span>
          ))}
        </div>
      </PageHero>

      <Section id="reel" className="scroll-mt-24">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="Featured Film"
            title={
              <>
                A minute inside{" "}
                <span className="font-display italic text-gold">
                  {STUDIO.name}.
                </span>
              </>
            }
            description="Light studies, material samples and finished rooms — the showreel is the quickest way to feel how we work."
          />
          <Reveal delay={0.1} className="shrink-0">
            <a
              href={STUDIO.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-gold/50"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-terracotta/15">
                <Youtube className="size-4 text-gold" />
              </span>
              Watch on YouTube
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <FeaturedFilm film={FEATURED_FILM} />
        </Reveal>
      </Section>

      <Section className="border-t border-border bg-taupe">
        <SectionHeading
          index="02"
          eyebrow="The Collection"
          title={
            <>
              {FILMS.length} films,{" "}
              <span className="font-display italic text-gold">one studio.</span>
            </>
          }
          description="Project walkthroughs, material stories and behind-the-scenes notes from the drawing board. Tap any film to play it full screen."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film, i) => (
            <Reveal key={film.slug} delay={(i % 3) * 0.07}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 size-[460px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
              <Clapperboard className="size-5" />
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-7 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:text-4xl">
              Want your home to be the{" "}
              <span className="font-display italic text-gradient-gold">
                next one filmed?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
              Tell us about your plot, your home or just an idea. We'll walk you
              through how we'd bring it to life — and what it would feel like on
              camera.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <GoldButton to="/contact">
                Start Your Journey
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </GoldButton>
              <GhostButton to="/projects">Explore Projects</GhostButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
