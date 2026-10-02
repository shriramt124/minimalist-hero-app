import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Parallax image frame. The image is oversized and drifts against the scroll
 * direction inside a clipped box, so it feels deeper than the page around it.
 * Static when the visitor prefers reduced motion.
 */
export function ParallaxImage({
  src,
  alt = "",
  className,
  imgClassName,
  strength = 12,
  children,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** Percentage of travel in each direction. */
  strength?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y, scale: 1 + (strength * 2) / 100 }}
        className={cn("absolute inset-0 size-full object-cover will-change-transform", imgClassName)}
      />
      {children}
    </div>
  );
}

/** Wrapper that drifts its children at a different speed than the page. */
export function ParallaxLayer({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
