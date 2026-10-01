import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2, Send } from "lucide-react";
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
  "h-12 rounded-xl border-border bg-background/60 px-4 text-sm placeholder:text-muted-foreground/70 focus-visible:border-gold/60 focus-visible:ring-gold/20";

const selectClass =
  "h-12 w-full rounded-xl border border-border bg-background/60 px-4 text-sm text-foreground outline-none transition-colors focus:border-gold/60";

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
      form.reset();
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
    "mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
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
        <div>
          <label className={label} htmlFor="hm-type">
            Project type
          </label>
          <select
            id="hm-type"
            name="projectType"
            defaultValue=""
            className={selectClass}
          >
            <option value="">Select a type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-card">
                {t}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <>
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
            <div>
              <label className={label} htmlFor="hm-budget">
                Approx. budget
              </label>
              <select
                id="hm-budget"
                name="budget"
                defaultValue=""
                className={selectClass}
              >
                <option value="">Select a range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-card">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div>
        <label className={label} htmlFor="hm-message">
          Tell us about the project *
        </label>
        <Textarea
          id="hm-message"
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder="A few lines about your space, timeline and what you're hoping for…"
          className="min-h-32 rounded-xl border-border bg-background/60 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-gold/60 focus-visible:ring-gold/20"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">
          We reply personally — no bots, no auto-funnels.
        </p>
        <Button
          type="submit"
          disabled={submitting}
          className="h-12 rounded-full bg-gold px-7 text-sm font-medium text-primary-foreground hover:bg-gold-soft"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send className="size-4" />
            </>
          )}
        </Button>
      </div>

      {done && (
        <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          Your enquiry is with us. Expect a reply within one working day.
        </p>
      )}
    </form>
  );
}