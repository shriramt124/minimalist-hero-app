import type { Film } from "@/lib/studio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gold play affordance shared by every video surface. */
function PlayBadge({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims =
    size === "lg"
      ? "size-20 sm:size-24"
      : size === "sm"
        ? "size-11"
        : "size-14";
  const icon =
    size === "lg" ? "size-7" : size === "sm" ? "size-4" : "size-5";
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border border-gold/40 bg-black/45 text-gold backdrop-blur transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground",
        dims,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gold/30 blur-md transition-opacity duration-500 group-hover:opacity-0"
      />
      <Play className={cn("relative translate-x-[1px] fill-current", icon)} />
    </span>
  );
}

/** Locks page scroll while a lightbox is open. */
function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/**
 * Full-screen player. Rendered through a portal so it always sits above the
 * site chrome, regardless of any transformed ancestor.
 */
export function FilmLightbox({
  film,
  onClose,
}: {
  film: Film;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  useScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} — ${film.category}`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="dark fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={reduce ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative w-full max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close film"
          className="absolute -top-11 right-0 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-gold"
        >
          Close
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border text-foreground">
            <X className="size-4" />
          </span>
        </button>

        <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-2xl shadow-black/60">
          <video
            src={film.src}
            poster={film.poster}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full bg-black"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-medium tracking-tight">{film.title}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gold">
              {film.category} · {film.year} · {film.duration}
            </p>
          </div>
          <p className="max-w-md text-[13px] leading-6 text-muted-foreground">
            {film.blurb}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/** Poster thumbnail that opens the film in the lightbox. */
export function FilmCard({
  film,
  className,
}: {
  film: Film;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("group", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left"
        aria-label={`Play ${film.title}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src={film.poster}
            alt={film.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayBadge />
          </span>
          <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-medium tabular-nums tracking-[0.12em] text-foreground/90 backdrop-blur">
            {film.duration}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
            {film.category} · {film.year}
          </p>
          <h3 className="mt-2 text-base font-medium tracking-tight transition-colors group-hover:text-gold">
            {film.title}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
            {film.blurb}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {open && <FilmLightbox film={film} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/** Large inline player: shows the poster with a gold play button, then plays. */
export function FeaturedFilm({
  film,
  className,
}: {
  film: Film;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "dark relative overflow-hidden rounded-3xl border border-border bg-black text-foreground",
        className,
      )}
    >
      <video
        src={film.src}
        poster={film.poster}
        controls={playing}
        autoPlay={playing}
        loop
        playsInline
        preload={playing ? "auto" : "none"}
        className="aspect-video w-full object-cover"
      />

      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${film.title}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-black/85 via-black/25 to-black/40 text-center"
        >
          <PlayBadge size="lg" />
          <span className="px-6">
            <span className="block text-[11px] uppercase tracking-[0.3em] text-gold">
              Studio Film · {film.duration}
            </span>
            <span className="mt-3 block font-display text-2xl italic text-foreground sm:text-3xl">
              {film.title}
            </span>
          </span>
        </button>
      )}

      {playing && (
        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-foreground/90 backdrop-blur">
          {film.category} · {film.year}
        </div>
      )}
    </div>
  );
}
