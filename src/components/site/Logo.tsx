import { cn } from "@/lib/utils";

/**
 * HM DESIGNZ hexagon mark (the studio's own logo artwork).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      className={cn("size-9 object-contain dark:brightness-0 dark:invert", className)}
    />
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
    <img
      src="/logo-full.png"
      alt="HM DESIGNZ"
      onClick={onClick}
      className={cn(
        "h-[44px] w-auto max-w-none shrink-0 object-contain transition-opacity duration-300 hover:opacity-80 sm:h-[70px] dark:brightness-0 dark:invert",
        className,
      )}
    />
  );
}
