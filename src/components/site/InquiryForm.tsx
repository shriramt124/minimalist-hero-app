import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export const PROJECT_TYPES = [
  "New Home / Bungalow",
  "Interior Design",
  "Modular Kitchen",
  "Renovation",
  "Commercial / Office",
  "Vastu Consultation",
];

export const BUDGETS = [
  "Under ₹10 Lakh",
  "₹10–25 Lakh",
  "₹25–50 Lakh",
  "₹50 Lakh–1 Crore",
  "Above ₹1 Crore",
];

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-[15px] shadow-none placeholder:text-muted-foreground/60 focus-visible:border-gold focus-visible:ring-0";

/** Tap-to-select chips that post their value through a hidden input. */
function ChipGroup({
  name,
  options,
}: {
  name: string;
  options: string[];
}) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-wrap gap-2">
      <input type="hidden" name={name} value={value} />
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => setValue(active ? "" : option)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] transition-all duration-300",
              active
                ? "border-gold bg-gold text-primary-foreground"
                : "border-border text-muted-foreground hover:border-gold/60 hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Studio enquiry form. `compact` drops the optional location/budget fields so
 * the homepage can offer a shorter path while the contact page asks in full.
 */
export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const submitInquiry = useMutation(api.inquiries.submit);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitInquiry({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? "") || undefined,
        projectType: String(data.get("projectType") ?? "") || undefined,
        location: String(data.get("location") ?? "") || undefined,
        budget: String(data.get("budget") ?? "") || undefined,
        message: String(data.get("message") ?? ""),
      });
      setDone(true);
      toast.success("Thank you — we'll be in touch within a day.", {
        description: "Your enquiry has reached the studio.",
      });
    } catch (error) {
      toast.error("We couldn't send that just now.", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const label =
    "block text-[11px] uppercase tracking-[0.22em] text-muted-foreground";

  if (done) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-80 flex-col items-start justify-center"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold text-primary-foreground">
            <Check className="size-5" />
          </span>
          <h3 className="mt-6 font-display text-4xl italic">Thank you.</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
            Your enquiry is with the studio. Expect a personal reply within one
            working day.
          </p>
          <button
            type="button"
            onClick={() => setDone(false)}
            className="mt-6 text-sm text-gold underline-offset-4 hover:underline"
          >
            Send another enquiry
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="hm-name">
            Full name *
          </label>
          <Input
            id="hm-name"
            name="name"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={label} htmlFor="hm-email">
            Email *
          </label>
          <Input
            id="hm-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={label} htmlFor="hm-phone">
            Phone / WhatsApp
          </label>
          <Input
            id="hm-phone"
            name="phone"
            placeholder="+91 00000 00000"
            className={fieldClass}
          />
        </div>
        {!compact && (
          <div>
            <label className={label} htmlFor="hm-location">
              Location
            </label>
            <Input
              id="hm-location"
              name="location"
              placeholder="Area, city"
              className={fieldClass}
            />
          </div>
        )}
      </div>

      <div>
        <p className={cn(label, "mb-3")}>What are we designing?</p>
        <ChipGroup name="projectType" options={PROJECT_TYPES} />
      </div>

      {!compact && (
        <div>
          <p className={cn(label, "mb-3")}>Approx. budget</p>
          <ChipGroup name="budget" options={BUDGETS} />
        </div>
      )}

      <div>
        <label className={label} htmlFor="hm-message">
          Tell us about the project *
        </label>
        <Textarea
          id="hm-message"
          name="message"
          required
          rows={compact ? 3 : 4}
          placeholder="A few lines about your space, timeline and what you're hoping for…"
          className="min-h-28 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] shadow-none placeholder:text-muted-foreground/60 focus-visible:border-gold focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">
          We reply personally — no bots, no auto-funnels.
        </p>
        <Button
          type="submit"
          disabled={submitting}
          className="group h-12 rounded-full bg-gold px-8 text-sm font-medium text-primary-foreground hover:bg-gold-soft"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
