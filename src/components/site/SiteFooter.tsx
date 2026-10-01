import { Logo } from "@/components/site/Logo";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router";

const explore = [
  { label: "Studio", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-taupe">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-[420px] rounded-full bg-gold/5 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              {`Creating unique architectural and interior solutions through thoughtful design — rooted in Indore, warm to live in, and made to last.`}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://instagram.com/hmdesignz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group relative inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-transparent"
              >
                <span className="absolute inset-0 rounded-full ig-ring opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-[1.5px] rounded-full bg-taupe" />
                <Instagram className="relative size-4 text-foreground" />
              </a>
              <a
                href="https://youtube.com/@hmdesignz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
              >
                <Youtube className="size-4 text-gold" />
                Watch the studio
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
