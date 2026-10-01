import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Store a design enquiry submitted from the public contact page.
 * Public mutation by design — the studio site has no sign-in for visitors.
 */
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    projectType: v.optional(v.string()),
    location: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const message = args.message.trim();

    if (!name || !email || !message) {
      throw new Error("Name, email and message are required.");
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    return await ctx.db.insert("inquiries", {
      name,
      email,
      phone: args.phone?.trim() || undefined,
      projectType: args.projectType?.trim() || undefined,
      location: args.location?.trim() || undefined,
      budget: args.budget?.trim() || undefined,
      message,
    });
  },
});

/** Recent enquiries, newest first — studio-side review list. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").order("desc").take(50);
  },
});
