import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

/** Three monochrome cards that fan out on load. */
const CARD_LAYOUT = [
  { x: -168, y: 14, rotate: -13, z: 0, tone: "outline" as const },
  { x: 0, y: -18, rotate: -3, z: 1, tone: "outline" as const },
  { x: 168, y: 14, rotate: 8, z: 2, tone: "solid" as const },
];

function CardFace({ tone }: { tone: "outline" | "solid" }) {
  const solid = tone === "solid";
  return (
    <div
      className={
        solid
          ? "flex h-full w-full flex-col justify-between rounded-2xl bg-foreground p-5 text-background shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]"
          : "flex h-full w-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.45)]"
      }
    >
      <div className="flex items-start justify-between">
        <div
          className={
            solid
              ? "h-7 w-9 rounded-md border border-background/40 bg-background/10"
              : "h-7 w-9 rounded-md border border-border bg-muted"
          }
        />
        <span
          className={
            solid
              ? "text-[10px] font-medium uppercase tracking-[0.2em] text-background/70"
              : "text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
          }
        >
          Value
        </span>
      </div>
      <div className="space-y-2">
        <div
          className={
            solid ? "h-px w-3/4 bg-background/30" : "h-px w-3/4 bg-border"
          }
        />
        <div
          className={
            solid ? "h-px w-1/2 bg-background/20" : "h-px w-1/2 bg-border/70"
          }
        />
      </div>
      <div className="flex items-end justify-between">
        <span
          className={
            solid
              ? "text-sm font-semibold tracking-tight text-background"
              : "text-sm font-semibold tracking-tight text-foreground"
          }
        >
          ₹ 4,800
        </span>
        <span
          className={
            solid
              ? "text-[10px] uppercase tracking-[0.2em] text-background/60"
              : "text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
          }
        >
          /yr
        </span>
      </div>
    </div>
  );
}

function CardStack() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="relative mt-16 flex h-[230px] w-full items-center justify-center sm:mt-20"
      aria-hidden="true"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-[180px] w-[288px]"
      >
        {CARD_LAYOUT.map((card, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 70, x: card.x * 0.4, rotate: 0, scale: 0.92 },
              show: {
                opacity: 1,
                y: card.y,
                x: card.x,
                rotate: card.rotate,
                scale: 1,
                transition: { duration: 1, ease: easeOut, delay: 0.35 + index * 0.13 },
              },
            }}
            style={{ zIndex: card.z }}
            className="absolute inset-0 h-[180px] w-[288px]"
          >
            <CardFace tone={card.tone} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Faint grid, faded toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_35%,black,transparent)]"
      />

      {/* Minimal header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-6 items-center justify-center">
            <span className="absolute size-3.5 translate-x-1 rounded-[3px] border border-foreground" />
            <span className="absolute size-3.5 -translate-x-1 rounded-[3px] bg-foreground" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Karo</span>
        </div>
        <button
          type="button"
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          How it works
        </button>
      </motion.header>

      {/* Hero */}
      <motion.main
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 flex flex-1 flex-col items-center px-6 pb-24"
      >
        <motion.p
          variants={fadeUp}
          className="mt-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:mt-16"
        >
          <span className="h-px w-8 bg-border" />
          Personal finance
          <span className="h-px w-8 bg-border" />
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-8 max-w-3xl text-center text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl"
        >
          Find the card that
          <span className="block text-muted-foreground">actually pays you back.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-md text-center text-base leading-7 text-muted-foreground"
        >
          Compare credit cards by their real rupee value — not marketing noise.
          Clear numbers, quiet design, no clutter.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-full px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See the numbers
          </button>
        </motion.div>

        <CardStack />

        {/* Restrained stat row */}
        <motion.div
          variants={fadeUp}
          className="mt-14 grid w-full max-w-2xl grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {[
            ["120+", "Cards compared"],
            ["₹4.6L", "Avg. rewards found"],
            ["0", "Spam calls"],
          ].map(([value, label]) => (
            <div key={label} className="px-6 py-5 text-center">
              <p className="text-xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
