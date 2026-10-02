import { LAUNCH_FILM, STUDIO } from "@/lib/studio";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Where we remember that the intro has already played. */
const SESSION_KEY = "hm-intro-seen";
/** Hard stop so a slow or failed video can never trap the visitor. */
const MAX_MS = 22000;

function alreadySeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode — the intro simply plays again next load */
  }
}

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE },
  },
};

/**
 * Title-sequence overlay.
 *
 * A short launch film plays full-screen the first time a visitor arrives,
 * framed by the HM monogram and wordmark, with a thin gold progress line and a
 * skip affordance. It fades away on its own when the film ends (or when
 * skipped) and only ever runs once per browser session.
 */
export function LaunchIntro() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => !alreadySeen());
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    markSeen();
    setVisible(false);
  }, []);

  // Reduced motion: never animate a title sequence over the site.
  useEffect(() => {
    if (reduce && visible) dismiss();
  }, [reduce, visible, dismiss]);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Safety net: always release the visitor, even if the film never loads.
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, MAX_MS);
    return () => window.clearTimeout(timer);
  }, [visible, dismiss]);

  // Esc skips the intro, matching the film player's habits.
  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${STUDIO.name} — opening film`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[200] isolate overflow-hidden bg-ink"
        >
          {/* Launch film */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <video
              src={LAUNCH_FILM.src}
              poster={LAUNCH_FILM.poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onError={dismiss}
              onEnded={dismiss}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (video.duration) {
                  setProgress(video.currentTime / video.duration);
                }
              }}
              className="size-full object-cover"
            />
          </div>

          {/* Cinematic grading */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.72))]"
          />

          {/* Top bar: studio mark + skip */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-8">
            <span className="text-[11px] font-semibold tracking-[0.42em] text-foreground/85">
              HM DESIGNZ
            </span>
            <button
              type="button"
              onClick={dismiss}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-foreground/80 backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
            >
              Skip intro
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Center: monogram, wordmark, tagline */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              variants={copyContainer}
              initial={reduce ? undefined : "hidden"}
              animate={reduce ? undefined : "show"}
              className="flex max-w-2xl flex-col items-center text-center"
            >
              <motion.span
                variants={copyItem}
                className="inline-flex size-16 items-center justify-center rounded-[1.15rem] border border-gold/30 bg-black/35 backdrop-blur"
              >
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-hidden="true"
                  className="size-8 text-foreground"
                >
                  <path
                    d="M12 11v18M20 11v18M12 20h8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 29V17l5 6 5-6v12"
                    stroke="#c9a86a"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>

              <motion.span
                variants={copyItem}
                className="mt-8 text-[11px] font-medium uppercase tracking-[0.44em] text-gold"
              >
                Architecture · Interiors · Indore
              </motion.span>

              <motion.h1
                variants={copyItem}
                className="mt-5 text-3xl font-medium leading-[1.14] tracking-[-0.02em] text-balance sm:text-4xl"
              >
                Creating unique architectural and interior solutions
                <span className="mt-1 block font-display italic text-gradient-gold">
                  through thoughtful design.
                </span>
              </motion.h1>

              <motion.button
                variants={copyItem}
                type="button"
                onClick={dismiss}
                className="group mt-9 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-gold"
              >
                Enter the studio
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-gold/60">
                  <ArrowRight className="size-4" />
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom: playback progress */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-8">
            <div className="relative h-px w-full overflow-hidden bg-white/15">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300 ease-linear"
                style={{ width: `${Math.min(progress, 1) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
              {STUDIO.founder} · Est. {STUDIO.founded}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
