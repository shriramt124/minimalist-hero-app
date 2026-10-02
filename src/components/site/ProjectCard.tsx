import { ParallaxImage } from "@/components/site/Parallax";
import { type Project } from "@/lib/studio";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
        <ParallaxImage
          src={project.cover}
          alt={project.title}
          strength={6}
          className="absolute inset-0"
          imgClassName="transition-[filter] duration-[900ms] ease-out group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        <div className="absolute right-4 top-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-gold text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#e9dcc0]">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{project.location}</p>

          <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            <p className="text-sm leading-6 text-white/70">{project.tagline}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
