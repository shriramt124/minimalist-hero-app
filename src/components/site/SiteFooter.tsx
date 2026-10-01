import { Logo } from "@/components/site/Logo";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { Link } from "react-router";

const quickLinks = [
  { label: "Studio", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Films", to: "/films" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Architecture", to: "/services" },
  { label: "Interior Design", to: "/services" },
  { label: "Modular Kitchen", to: "/services" },
  { label: "Vastu Planning", to: "/services" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-taupe">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-[420px] rounded-full bg-gold/5 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          {/* Brand + social */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Creating unique architectural and interior solutions through
              thoughtful design — rooted in Indore, warm to live in, and made to
              last.
            </p>

            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Follow the studio
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/hmdesignz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HM DESIGNZ on Instagram"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-background/40 px-4 py-2.5 transition-colors hover:border-gold/50"
              >
                <span className="relative flex size-8 items-center justify-center">
                  <span className="absolute inset-0 rounded-full ig-ring" />
                  <span className="absolute inset-[2px] rounded-full bg-background" />
                  <Instagram className="relative size-4 text-foreground" />
                </span>
                <span className="text-sm text-foreground/85 transition-colors group-hover:text-gold">
                  @hmdesignz
                </span>
              </a>
              <a
                href="https://youtube.com/@hmdesignz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HM DESIGNZ on YouTube"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-background/40 px-4 py-2.5 transition-colors hover:border-gold/50"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-terracotta/15">
                  <Youtube className="size-4 text-gold" />
                </span>
                <span className="text-sm text-foreground/85 transition-colors group-hover:text-gold">
                  Watch the studio
                </span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Studio
            </p>
            <ul className="mt-5 space-y-4 text-sm text-foreground/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  16/2, Scheme No. 78, Vijay Nagar,
                  <br />
                  Indore, MP 452010
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href="tel:+919826012345"
                  className="transition-colors hover:text-gold"
                >
                  +91 98260 12345
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href="mailto:studio@hmdesignz.in"
                  className="transition-colors hover:text-gold"
                >
                  studio@hmdesignz.in
                </a>
              </li>
              <li>
                <Link
                  to="/auth?returnTo=%2Fdashboard"
                  className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-gold"
                >
                  Client Portal
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} HM DESIGNZ · Founded by Harish Malviya
          </p>
          <p className="tracking-[0.2em] uppercase">
            Architecture · Interiors · Vastu
          </p>
        </div>
      </div>
    </footer>
  );
}