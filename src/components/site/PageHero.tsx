import { Container } from "@/components/site/primitives";
import { ParallaxImage } from "@/components/site/Parallax";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import type { ReactNode } from "react";

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate -mt-[92px] sm:-mt-[104px] overflow-hidden border-b border-border pt-[92px] sm:pt-[104px]">
      {image ? (
        <>
          <ParallaxImage
            src={image}
            strength={10}
            className="absolute inset-0 -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-background/50"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 -z-10 size-[460px] rounded-full bg-gold/10 blur-[140px]"
        />
      )}

      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted-foreground sm:text-base">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.16}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
