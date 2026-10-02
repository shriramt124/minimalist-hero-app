import { FilmLightbox } from "@/components/site/FilmPlayer";
import type { Film } from "@/lib/studio";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Distance the stack is pinned below the floating header. */
const STICKY_TOP = 116;
/** Each buried card peeks out a little so the pile reads as a stack. */
const PEEK = 14;

/** How long the film plays clean before the text card rises. */
const TEXT_DELAY_MS = 3000;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pad = (n: number) => String(n).padStart(2, "0");

function StackCard({
  film,
  index,
  total,
  progress,
  animate,
}: {
  film: Film;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  // Let the film play clean for a few seconds, then raise the text card.
  // Leaving the card resets it so the moment replays on the way back.
  const inView = useInView(cardRef, { amount: 0.55 });
  useEffect(() => {
    if (!inView) return;
    // Browsers pause muted autoplay clips that scroll off-screen — wake it.
    void videoRef.current?.play().catch(() => undefined);
    const timer = window.setTimeout(() => setShowText(true), TEXT_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      setShowText(false);
    };
  }, [inView]);
  const textVisible = reduce || showText;

  // This card is "covered" while the next one slides over it.
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.92]);
  const shade = useTransform(progress, [start, end], [0, isLast ? 0 : 0.55]);

  // Buried videos stop decoding so five clips never play at once.
  useMotionValueEvent(progress, "change", (p) => {
    const video = videoRef.current;
    if (!video) return;
    const buried = !isLast && p > end - 0.02;
    if (buried) video.pause();
    else void video.play().catch(() => undefined);
  });

  return (
    <div
      className={animate ? "sticky" : "relative"}
      style={animate ? { top: STICKY_TOP + index * PEEK } : undefined}
    >
      <div className="pb-6 sm:pb-10">
        <motion.article
          ref={cardRef}
          style={animate ? { scale, transformOrigin: "50% 0%" } : undefined}
          className="group relative h-[calc(100svh-190px)] min-h-[460px] overflow-hidden rounded-[1.75rem] border border-border bg-black shadow-[0_-18px_50px_-18px_rgba(42,36,28,0.45)] sm:max-h-[680px] sm:rounded-[2.25rem]"
        >
          {/* Clean film — nothing over it but two small tags */}
          <video
            ref={videoRef}
            src={film.src}
            poster={film.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="absolute inset-0 size-full transform-gpu object-cover"
          />
          {animate && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: shade }}
              className="pointer-events-none absolute inset-0 bg-black"
            />
          )}

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-7">
            <span className="rounded-full bg-black/45 px-3.5 py-1.5 font-display text-base tabular-nums text-white">
              {pad(index + 1)}
              <span className="mx-1.5 text-white/50">/</span>
              <span className="text-white/70">{pad(total)}</span>
            </span>
            <span className="rounded-full bg-black/45 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-white">
              {film.category} · {film.year}
            </span>
          </div>

          {/* Text card — rises over the lower part of the film after a pause */}
          <motion.div
            initial={false}
            animate={{ y: textVisible ? "0%" : "105%" }}
            transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
            className="absolute inset-x-3 bottom-3 rounded-[1.4rem] bg-white p-5 text-foreground sm:inset-x-6 sm:bottom-6 sm:rounded-[1.75rem] sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <div className="max-w-xl">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
                  {film.category} · {film.duration}
                </p>
                <h3 className="mt-2 font-display text-2xl italic leading-tight sm:text-4xl">
                  {film.title}
                </h3>
                <p className="mt-2 hidden text-sm leading-6 text-muted-foreground sm:block">
                  {film.blurb}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Play ${film.title} full screen`}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2.5 self-stretch rounded-full bg-gold px-6 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft sm:h-12 sm:self-auto"
              >
                <Play className="size-4 fill-current" />
                Watch film
              </button>
            </div>
          </motion.div>
        </motion.article>
      </div>

      <AnimatePresence>
        {open && <FilmLightbox film={film} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/**
 * Stacking film reel. Each film pins under the header while the next one
 * slides up over it, the covered film shrinking and dimming as it goes.
 * Falls back to a plain vertical list for visitors who prefer reduced motion.
 */
export function StackedFilms({ films }: { films: Film[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative">
      {films.map((film, i) => (
        <StackCard
          key={film.slug}
          film={film}
          index={i}
          total={films.length}
          progress={scrollYProgress}
          animate={!reduce}
        />
      ))}
    </div>
  );
}
