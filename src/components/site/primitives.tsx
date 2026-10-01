import { Eyebrow, Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-6 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Primary gold CTA — used for the main path into the product. */
export function GoldButton({
  to,
  children,
  className,
  external,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-gold-soft hover:-translate-y-0.5",
    className,
  );
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

/** Quiet outline CTA — secondary paths like "Explore projects". */
export function GhostButton({
  to,
  children,
  className,
  external,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 text-sm font-medium text-foreground transition-all duration-300 hover:border-gold/60 hover:text-gold",
    className,
  );
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
