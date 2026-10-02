import { ProjectCard } from "@/components/site/ProjectCard";
import type { Project } from "@/lib/studio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Editorial project index. Large project names run down one side; hovering or
 * focusing one wipes its photograph into the frame on the other. On small
 * screens it becomes a swipeable gallery of cards.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <>
      {/* --- Desktop: index + sticky preview --- */}
      <div className="hidden gap-14 lg:grid lg:grid-cols-[1.1fr_0.9fr] xl:gap-24">
        <ol className="border-t border-border" onMouseLeave={() => undefined}>
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <li key={project.slug} className="border-b border-border">
                <Link
                  to={`/projects/${project.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-6 py-6 xl:gap-8 xl:py-7"
                >
                  {/* Fill line that sweeps across the active row */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-px left-0 h-px bg-gold transition-[width] duration-700 ease-out",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                  <span
                    className={cn(
                      "w-8 font-display text-base tabular-nums transition-colors duration-500",
                      isActive ? "text-gold" : "text-muted-foreground/60",
                    )}
                  >
                    {pad(i)}
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-display text-4xl leading-none tracking-tight transition-all duration-500 xl:text-5xl",
                      isActive
                        ? "translate-x-3 text-foreground italic"
                        : "text-foreground/45",
                    )}
                  >
                    {project.title}
                  </span>
                  <span className="hidden text-right text-[11px] uppercase tracking-[0.24em] text-muted-foreground xl:block">
                    {project.category}
                    <span className="mt-1 block text-[10px] tracking-[0.2em] opacity-70">
                      {project.year}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-full border transition-all duration-500",
                      isActive
                        ? "border-gold bg-gold text-primary-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Preview frame */}
        <div className="relative">
          <div className="sticky top-32">
            <Link
              to={`/projects/${current.slug}`}
              className="relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-champagne"
              aria-label={`Open ${current.title}`}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.slug}
                  src={current.cover}
                  alt={current.title}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
                  }
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
            </Link>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-6 flex items-start justify-between gap-6"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
                    {current.location}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    {current.tagline}
                  </p>
                </div>
                <dl className="shrink-0 text-right text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <dt className="sr-only">Area</dt>
                  <dd>{current.area}</dd>
                  <dt className="sr-only">Scope</dt>
                  <dd className="mt-1 opacity-70">{current.scope}</dd>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- Mobile / tablet: swipeable gallery --- */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="w-[78vw] max-w-[360px] shrink-0 snap-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
}
