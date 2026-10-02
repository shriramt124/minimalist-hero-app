import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { NAV_LINKS } from "@/lib/studio";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

function isActivePath(to: string, pathname: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[92px] w-full px-3 pt-3 sm:h-[104px] sm:px-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-[72px] sm:h-[84px] w-full max-w-7xl items-center justify-between gap-6 rounded-full border px-6 transition-all duration-500 sm:px-9",
          scrolled
            ? "border-border bg-background/85 shadow-[0_8px_30px_-12px_rgba(42,36,28,0.2)] backdrop-blur-xl"
            : "border-white/40 bg-background/55 backdrop-blur-md",
        )}
      >
        <Link to="/" aria-label="HM DESIGNZ home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-9 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "group relative text-[14px] font-medium tracking-[0.03em] transition-colors",
                  isActive || isActivePath(link.to, pathname)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300",
                      isActive || isActivePath(link.to, pathname)
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            to={isAuthenticated ? "/dashboard" : "/auth?returnTo=%2Fdashboard"}
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {isAuthenticated ? "Client Portal" : "Client Login"}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Button
            asChild
            className="h-11 rounded-full bg-gold px-6 text-[14px] font-medium text-primary-foreground hover:bg-gold-soft"
          >
            <Link to="/contact">Start Your Journey</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/60 xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-l border-border bg-background sm:max-w-sm"
          >
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle asChild>
                <Link to="/" onClick={() => setOpen(false)}>
                  <Logo />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-border/60 py-4 text-lg tracking-tight transition-colors",
                      isActive
                        ? "text-gold"
                        : "text-foreground hover:text-gold",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 px-6 pb-8">
              <Button asChild className="h-11 rounded-full bg-gold text-primary-foreground hover:bg-gold-soft">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Start Your Journey
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-border bg-transparent"
              >
                <Link
                  to={isAuthenticated ? "/dashboard" : "/auth?returnTo=%2Fdashboard"}
                  onClick={() => setOpen(false)}
                >
                  {isAuthenticated ? "Client Portal" : "Client Login"}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
