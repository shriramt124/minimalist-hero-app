import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Studio loader — the HM monogram draws itself in gold while a soft light
 * breathes behind it, then the wordmark settles into place. Used for route
 * transitions and app boot instead of a plain "Loading…" line.
 */
export function LogoLoader({
  fullScreen = true,
  className,
}: {
  fullScreen?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const draw = (delay: number) => ({
    initial: reduce
      ? { pathLength: 1, opacity: 1 }
      : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: reduce ? { duration: 0 } : { duration: 1.15, ease: EASE, delay },
  });

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-7 bg-background",
        fullScreen && "min-h-screen",
        className,
      )}
    >
      <div className="relative flex size-24 items-center justify-center">
        {/* Breathing gold halo */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/25 blur-2xl"
          animate={
            reduce
              ? undefined
              : { opacity: [0.2, 0.55, 0.2], scale: [0.88, 1.08, 0.88] }
          }
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="relative size-16 text-foreground"
        >
          <motion.rect
            x="1"
            y="1"
            width="38"
            height="38"
            rx="11"
            stroke="currentColor"
            strokeOpacity="0.22"
            {...draw(0)}
          />
          <motion.path
            d="M12 11v18M20 11v18M12 20h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            {...draw(0.3)}
          />
          <motion.path
            d="M20 29V17l5 6 5-6v12"
            stroke="#8a7556"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...draw(0.62)}
          />
        </svg>
      </div>

      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.8 }}
        className="flex flex-col items-center"
      >
        <span className="text-[13px] font-semibold tracking-[0.42em] text-foreground">
          HM DESIGNZ
        </span>
        <span className="mt-2.5 text-[9px] font-medium uppercase tracking-[0.34em] text-muted-foreground">
          Architecture · Interiors · Indore
        </span>
      </motion.div>

      {/* Indeterminate hairline sweep */}
      <div className="relative h-px w-40 overflow-hidden bg-foreground/10">
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
          animate={reduce ? undefined : { x: ["-4rem", "10rem"] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
}