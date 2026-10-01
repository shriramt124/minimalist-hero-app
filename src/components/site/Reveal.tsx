import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/**
 * Scroll-triggered reveal. Content fades and lifts once as it enters view,
 * and is left static when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE, delay },
        },
      }}
    >
      {children}
    </Comp>
  );
}

/** Section eyebrow — a small gold-indexed label used across pages. */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-gold " +
        (className ?? "")
      }
    >
      {index && <span className="text-muted-foreground/70">{index}</span>}
      <span className="h-px w-7 bg-gold/50" />
      {children}
    </p>
  );
}
