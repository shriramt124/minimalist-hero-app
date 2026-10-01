import { cn } from "@/lib/utils";

/**
 * Category filter chips with counts. Shared by the homepage featured grid and
 * the full portfolio page so filtering reads identically in both places.
 */
export function FilterChips<T extends string>({
  categories,
  active,
  counts,
  onChange,
  className,
}: {
  categories: readonly T[];
  active: T;
  counts: Map<T, number>;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300",
              isActive
                ? "border-gold/60 bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground",
            )}
          >
            {category}
            <span
              className={cn(
                "text-[11px] tabular-nums",
                isActive ? "text-gold/70" : "text-muted-foreground/60",
              )}
            >
              {counts.get(category) ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}