import { cn } from "@/lib/utils";

/**
 * HM DESIGNZ monogram — a clean geometric mark built from two offset
 * architectural "rooms" that read as H and M, with a gold keystone.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("size-9", className)}
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      {/* H — two vertical posts and a bridge */}
      <path
        d="M12 11v18M20 11v18M12 20h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* M — descending diagonals tying into the gold keystone */}
      <path
        d="M20 29V17l5 6 5-6v12"
        stroke="#c9a86a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-3 text-foreground",
        className,
      )}
    >
      <LogoMark className="size-9 shrink-0 transition-opacity duration-300 group-hover:opacity-80" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.26em]">
          HM DESIGNZ
        </span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.34em] text-muted-foreground">
          Indore · Est. 2014
        </span>
      </span>
    </span>
  );
}
