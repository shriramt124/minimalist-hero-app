import { FilmLightbox } from "@/components/site/FilmPlayer";
import { Container, GhostButton } from "@/components/site/primitives";
import type { Film } from "@/lib/studio";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
/** The film plays clean this long, then the card rises by itself. */
const RISE_DELAY_MS = 4000;

/**
 * Films page hero. The showreel fills three quarters of the first screen with
 * just a slim headline strip beneath it. After four seconds the film drifts up
 * and a white card rises over it carrying the story and the actions.
 */
export function FilmsHero({
  film,
  categories,
}: {
  film: Film;
  categories: string[];
}) {
  const reduce = useReducedMotion();
  const [risen, setRisen] = useState(false);
  const [open, setOpen] = useState(false);

  // Rise on a timer, or sooner if the visitor starts scrolling.
  const { scrollY } = useScroll();
  useEffect(() => {
    if (reduce) return;
    const timer = window.setTimeout(() => setRisen(true), RISE_DELAY_MS);
    const onScroll = () => {
      if (window.scrollY > 30) setRisen(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);
  const expanded = reduce || risen;

  const videoParallax = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <section className="relative isolate -mt-[92px] h-[100svh] min-h-[640px] overflow-hidden bg-background sm:-mt-[104px]">
      {/* --- Film: three quarters of the screen, drifts up when the card rises --- */}
      <motion.div
        animate={{ top: expanded ? "-9%" : "0%" }}
        transition={{ duration: reduce ? 0 : 1.3, ease: EASE }}
        className="absolute inset-x-0 top-0 h-[75%] overflow-hidden rounded-b-[1.75rem] bg-champagne sm:rounded-b-[2.5rem]"
      >
        <motion.video
          src={film.src}
          poster={film.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={reduce ? undefined : { y: videoParallax }}
          className="size-full scale-110 object-cover"
        />
      </motion.div>

      {/* --- Card: peeks as a slim strip, then rises over the film --- */}
      <motion.div
        initial={false}
        animate={{ y: expanded ? "0svh" : "31svh" }}
        transition={{ duration: reduce ? 0 : 1.3, ease: EASE }}
        className="absolute inset-x-0 bottom-0 flex h-[56%] min-h-[400px] flex-col rounded-t-[1.75rem] bg-white shadow-[0_-24px_60px_-30px_rgba(42,36,28,0.4)] sm:rounded-t-[2.5rem]"
      >
        <Container className="flex h-full flex-col pt-6 sm:pt-9">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep sm:tracking-[0.34em]">
            Studio Films · Indore
          </p>
          <h1 className="mt-3 text-[1.6rem] font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            The studio,{" "}
            <span className="font-display italic text-gradient-gold">
              in motion.
            </span>
          </h1>

          <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 24 }}
            transition={{
              duration: reduce ? 0 : 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: expanded && !reduce ? 0.7 : 0,
            }}
            className="mt-5 flex flex-1 flex-col justify-between gap-5 pb-6 sm:pb-9"
            aria-hidden={!expanded}
          >
            <div>
              <p className="max-w-2xl text-[14px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                Walk through our homes and interiors the way a client does —
                quiet camera work, warm light and the small details that only
                show up on film. Every project is real work from the studio in
                Indore.
              </p>
              <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 [&>*]:h-11 [&>*]:flex-1 [&>*]:whitespace-nowrap [&>*]:px-3 [&>*]:text-[13px] sm:[&>*]:h-12 sm:[&>*]:flex-none sm:[&>*]:px-7 sm:[&>*]:text-sm">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <Play className="size-4 fill-current" />
                Watch showreel
              </button>
              <GhostButton to="/contact">Start Your Journey</GhostButton>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* --- Scroll cue, only once the card has settled --- */}
      <motion.a
        href="#reel"
        aria-label="Scroll to films"
        initial={false}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ delay: expanded && !reduce ? 1.6 : 0, duration: 0.6 }}
        className="absolute right-5 top-[calc(44%-1.25rem)] hidden size-10 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur sm:flex"
      >
        <ArrowDown className="size-4" />
      </motion.a>

      <AnimatePresence>
        {open && <FilmLightbox film={film} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
