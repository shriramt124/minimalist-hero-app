import { FilterChips } from "@/components/site/FilterChips";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Container, Section } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/studio";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Filter = (typeof PROJECT_CATEGORIES)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>();
    PROJECT_CATEGORIES.forEach((c) => {
      map.set(c, c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length);
    });
    return map;
  }, []);

  return (
    <>
      <PageHero
        index="Portfolio"
        eyebrow="Selected Work"
        title={
          <>
            Spaces designed around{" "}
            <span className="font-display italic text-gradient-gold">
              real lives.
            </span>
          </>
        }
        description="Homes, interiors and workplaces across Indore and central India. Filter by discipline to see the range of what the studio takes on."
      />

      <Section className="pt-12 sm:pt-16">
        <Reveal>
          <FilterChips
            categories={PROJECT_CATEGORIES}
            active={filter}
            counts={counts}
            onChange={setFilter}
          />
        </Reveal>

        <div className="mt-12">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No projects in this category yet — check back soon.
          </p>
        )}
      </Section>

      <section className="border-t border-border bg-taupe">
        <Container className="py-20 text-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Currently accepting
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl">
              Two new residential projects for the coming season.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">
              If you're planning a home, an extension or a full interior fit-out,
              now is a lovely time to start the conversation.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
