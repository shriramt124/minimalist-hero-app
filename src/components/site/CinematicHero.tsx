import { Container, GhostButton, GoldButton } from "@/components/site/primitives";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SLIDE_MS = 6500;

/**
 * Optionally drop a muted background video here and it will play behind the
 * image slideshow (kept as a fallback layer). Leave null to use stills only —
 * reliable and lightweight for a prototype.
 */
const HERO_VIDEO: string | null = null;

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
    label: "Serial Residency",
    location: "Vijay Nagar, Indore",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
    label: "Noir Penthouse",
    location: "AB Road, Indore",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    label: "The Courtyard House",
    location: "Bicholi Mardana, Indore",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80",
    label: "Ivory Suite",
    location: "Vijay Nagar, Indore",
  },
];

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

export function CinematicHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gentle parallax as the visitor scrolls away from the hero.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, 130]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0.15]);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduce, paused]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate -mt-[74px] flex min-h-[100svh] flex-col overflow-hidden pt-[74px]"
    >
      {/* --- Layered slideshow with slow Ken Burns zoom --- */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {HERO_VIDEO && (
          <video
            className="absolute inset-0 size-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {SLIDES.map((slide, i) => (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.img
              src={slide.src}
              alt=""
              className="size-full object-cover"
              initial={false}
              animate={reduce ? undefined : { scale: i === active ? 1.14 : 1.02 }}
              transition={{ duration: 9.5, ease: "linear" }}
            />
          </motion.div>
        ))}
      </div>

      {/* --- Cinematic grading overlays --- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55))]"
      />

      {/* --- Copy --- */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative flex flex-1 items-center"
      >
        <Container className="py-24">
          <motion.div
            variants={copyContainer}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            className="max-w-3xl"
          >
            <motion.div variants={copyItem} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft backdrop-blur">
                <span className="size-1.5 animate-pulse rounded-full bg-gold" />
                Architecture &amp; Interiors · Indore
              </span>
            </motion.div>

            <motion.h1
              variants={copyItem}
              className="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.5rem]"
            >
              Homes that feel like you,
              <span className="mt-1 block font-display italic text-gradient-gold">
                designed to stay that way.
              </span>
            </motion.h1>

            <motion.p
              variants={copyItem}
              className="mt-7 max-w-xl text-base leading-8 text-foreground/75 sm:text-lg"
            >
              HM DESIGNZ is an Indore-based design studio creating unique
              architectural and interior solutions — modern, warm and quietly
              Vastu-aligned. Thoughtful design, made personal.
            </motion.p>

            <motion.div
              variants={copyItem}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <GoldButton to="/projects">
                Explore Projects
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </GoldButton>
              <GhostButton
                to="/contact"
                className="border-white/25 bg-black/20 backdrop-blur"
              >
                Start Your Journey
              </GhostButton>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* --- Bottom bar: slide caption, progress, scroll cue --- */}
      <div className="relative">
        <Container className="pb-9">
          <div className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Active slide caption */}
            <div className="min-h-[44px]">
              <motion.div
                key={active}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
                  Now viewing
                </p>
                <p className="mt-1.5 text-sm text-foreground/90">
                  {SLIDES[active].label}
                  <span className="text-muted-foreground">
                    {" "}
                    · {SLIDES[active].location}
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Show ${slide.label}`}
                    onClick={() => setActive(i)}
                    className="group relative h-1 w-10 overflow-hidden rounded-full bg-white/20 transition-colors hover:bg-white/35"
                  >
                    {i === active && (
                      <motion.span
                        key={active}
                        className="absolute inset-y-0 left-0 rounded-full bg-gold"
                        initial={{ width: reduce ? "100%" : 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: reduce || paused ? 0.4 : SLIDE_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Bouncing scroll cue */}
              <a
                href="#work"
                aria-label="Scroll to projects"
                className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-gold sm:inline-flex"
              >
                Scroll
                <motion.span
                  animate={reduce ? undefined : { y: [0, 7, 0] }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-white/20"
                >
                  <ArrowDown className="size-3.5" />
                </motion.span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
