import { z } from "zod";

// Coming-soon states that can join the per-state waitlist (WA is already live).
export const WAITLIST_STATES = ["NSW", "VIC", "QLD", "SA", "TAS", "ACT", "NT"] as const;

export type WaitlistState = (typeof WAITLIST_STATES)[number];

export const newsletterSchema = z.object({
  email: z.string().email(),
  source: z
    .enum([
      "footer",
      "waitlist:NSW",
      "waitlist:VIC",
      "waitlist:QLD",
      "waitlist:SA",
      "waitlist:TAS",
      "waitlist:ACT",
      "waitlist:NT"
    ])
    .default("footer")
});
