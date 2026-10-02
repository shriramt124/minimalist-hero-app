import { Container, GhostButton, GoldButton } from "@/components/site/primitives";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Drop the studio's own film at /public/videos/hero.mp4 (and an optional
 * /public/videos/hero-poster.jpg) and it plays here automatically. Until then
 * the hero falls back to the sample clip below.
 */
const HERO_VIDEO = "/videos/hero.mp4";
const HERO_POSTER = "/videos/hero-poster.jpg";
const FALLBACK_VIDEO =
  "https://videos.pexels.com/video-files/5744424/5744424-hd_1920_1080_30fps.mp4";
const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80";

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: EASE },
  },
};

/** Minimal full-bleed video hero: one film, one line, two actions. */
export function CinematicHero() {
  const reduce = useReducedMotion();
  // null = still checking, so the poster shows instead of a failed request.
  const [useLocal, setUseLocal] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(HERO_VIDEO, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled) setUseLocal(res.ok && type.startsWith("video"));
      })
      .catch(() => !cancelled && setUseLocal(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // Video drifts slower than the page for a gentle parallax on scroll.
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 140]);

  return (
    <section className="relative isolate -mt-[92px] flex min-h-[100svh] flex-col bg-background sm:-mt-[104px]">
      {/* --- Pure video: three quarters of the first screen --- */}
      <div className="relative h-[56svh] min-h-[300px] sm:h-[75svh] sm:min-h-[440px] overflow-hidden rounded-b-[1.75rem] bg-champagne sm:rounded-b-[2.5rem]">
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: videoY }}
          className="absolute inset-x-0 -top-[10%] h-[120%]"
        >
          <video
            key={String(useLocal)}
            src={useLocal === null ? undefined : useLocal ? HERO_VIDEO : FALLBACK_VIDEO}
            poster={useLocal ? HERO_POSTER : FALLBACK_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="size-full object-cover"
          />
        </motion.div>
      </div>

      {/* --- Headline and actions below the film --- */}
      <Container className="flex flex-1 items-center py-8 sm:py-10">
        <motion.div
          variants={copyContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="flex w-full flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={copyItem}
              className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep sm:tracking-[0.34em]"
            >
              Architecture &amp; Interiors · Indore
            </motion.p>
            <motion.h1
              variants={copyItem}
              className="mt-3 text-[1.6rem] font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:mt-4 sm:text-5xl"
            >
              Homes that feel like you,{" "}
              <span className="font-display italic text-gradient-gold">
                designed to stay that way.
              </span>
            </motion.h1>
          </div>

          <motion.div
            variants={copyItem}
            className="flex shrink-0 gap-3 [&>a]:h-11 [&>a]:flex-1 [&>a]:whitespace-nowrap [&>a]:px-3 [&>a]:text-[13px] sm:[&>a]:h-12 sm:[&>a]:flex-none sm:[&>a]:px-7 sm:[&>a]:text-sm"
          >
            <GoldButton to="/projects">
              Explore Projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </GoldButton>
            <GhostButton to="/contact">Start Your Journey</GhostButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
