import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Check,
  CircleDashed,
  Clock,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const PHASES = [
  { name: "Discover", status: "done", date: "12 Feb" },
  { name: "Concept", status: "done", date: "28 Feb" },
  { name: "Design", status: "active", date: "In progress" },
  { name: "Execution", status: "todo", date: "From 15 Apr" },
  { name: "Handover", status: "todo", date: "Jun 2026" },
] as const;

const MILESTONES = [
  {
    title: "Concept plans approved",
    detail: "Signed off on courtyard layout and material direction.",
    date: "28 Feb 2026",
    done: true,
  },
  {
    title: "Lighting & electrical layout",
    detail: "Shared for review — awaiting your comments.",
    date: "06 Mar 2026",
    done: true,
  },
  {
    title: "Joinery and finish drawings",
    detail: "In progress — kitchen and wardrobe detailing.",
    date: "Due 22 Mar 2026",
    done: false,
  },
  {
    title: "Contractor handover pack",
    detail: "Working drawings and BOQ for site execution.",
    date: "Due 10 Apr 2026",
    done: false,
  },
];

const DOCUMENTS = [
  { name: "Concept drawings v2.pdf", size: "8.4 MB", date: "28 Feb 2026" },
  { name: "Material palette.pdf", size: "3.1 MB", date: "01 Mar 2026" },
  { name: "Lighting layout.pdf", size: "5.7 MB", date: "06 Mar 2026" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const activeIndex = PHASES.findIndex((p) => p.status === "active");
  const progress = Math.round(((activeIndex + 0.5) / PHASES.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Portal top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" aria-label="HM DESIGNZ home">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/projects"
              className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              Studio site
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignOut}
              className="h-9 gap-2 rounded-full border-border bg-transparent text-[13px]"
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Greeting */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold">
              <LayoutDashboard className="size-3.5" />
              Client Portal
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Welcome back, {firstName}.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Track your project's progress, review drawings and stay in step
              with the studio — all in one calm place.
            </p>
          </div>
          <Button
            asChild
            className="h-11 shrink-0 self-start rounded-full bg-gold px-6 text-sm font-medium text-primary-foreground hover:bg-gold-soft"
          >
            <a href="https://wa.me/919826012345" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="size-4" />
              Message the studio
            </a>
          </Button>
        </div>

        {/* Project card */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-border card-sheen">
          <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-gold">
                  In Progress
                </span>
                <span className="text-[12px] text-muted-foreground">
                  Serial Residency · Vijay Nagar, Indore
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                Your family bungalow — design phase
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                We're currently resolving joinery and finishes. Review the latest
                lighting layout and share any notes so we can lock details before
                site execution begins in April.
              </p>

              <div className="mt-7">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Overall progress</span>
                  <span className="text-gold">{progress}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Phase rail */}
              <div className="mt-8 flex flex-wrap gap-2">
                {PHASES.map((phase) => (
                  <span
                    key={phase.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs",
                      phase.status === "done" &&
                        "border-border bg-muted text-foreground/80",
                      phase.status === "active" &&
                        "border-gold/50 bg-gold/10 text-gold",
                      phase.status === "todo" &&
                        "border-border/60 text-muted-foreground",
                    )}
                  >
                    {phase.status === "done" ? (
                      <Check className="size-3.5" />
                    ) : phase.status === "active" ? (
                      <Clock className="size-3.5" />
                    ) : (
                      <CircleDashed className="size-3.5" />
                    )}
                    {phase.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Side snapshot */}
            <div className="rounded-2xl border border-border bg-background/50 p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Project snapshot
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Current phase</dt>
                  <dd className="text-foreground">Design</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Designer</dt>
                  <dd className="text-foreground">Harish Malviya</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Next review</dt>
                  <dd className="text-foreground">22 Mar 2026</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Site start</dt>
                  <dd className="text-foreground">15 Apr 2026</dd>
                </div>
              </dl>
              <Button
                asChild
                variant="outline"
                className="mt-6 h-10 w-full rounded-full border-border bg-transparent"
              >
                <a href="tel:+919826012345">
                  <Phone className="size-4" />
                  Call the studio
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Milestones + documents */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="text-lg font-medium tracking-tight">
              Milestones
            </h2>
            <ol className="mt-6 space-y-6">
              {MILESTONES.map((m, i) => (
                <li key={m.title} className="relative flex gap-4">
                  {i < MILESTONES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[15px] top-9 h-[calc(100%+0.5rem)] w-px bg-border"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border",
                      m.done
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {m.done ? (
                      <Check className="size-4" />
                    ) : (
                      <CircleDashed className="size-4" />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {m.title}
                      </p>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {m.date}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">
                      {m.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="text-lg font-medium tracking-tight">Documents</h2>
            <ul className="mt-6 space-y-3">
              {DOCUMENTS.map((doc) => (
                <li
                  key={doc.name}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:border-gold/40"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-gold">
                    <FileText className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {doc.size} · {doc.date}
                    </p>
                  </div>
                  <Download className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-gold/25 bg-gold/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                Need a hand?
              </p>
              <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                Have a question about your drawings? The studio usually replies
                the same working day.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold transition-colors hover:text-gold-soft"
              >
                Contact the studio
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
