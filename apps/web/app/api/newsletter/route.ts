import { type NextRequest } from "next/server";
import { apiError, apiOk } from "@/lib/api/envelope";
import { log, logContext } from "@/lib/log";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/requestClientIp";
import { resend, FROM_ADDRESS } from "@/lib/resend";
import { newsletterConfirmHtml, newsletterConfirmSubject } from "@/lib/emails/newsletter-confirm";

import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email()
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!(await rateLimit(`newsletter:${ip}`, 3, 60_000))) {
    return apiError("too_many_requests", 429);
  }

  try {
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = newsletterSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return apiError("invalid_payload", 400);
    }

    const email = parseResult.data.email.toLowerCase();

    // Per-address limit: rotating-IP replays must not re-trigger emails to a
    // victim inbox. Opaque ok response (matches the already-subscribed path).
    if (!(await rateLimit(`newsletter:email:${email}`, 1, 3_600_000))) {
      return apiOk();
    }

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email, subscribed_at: new Date().toISOString(), source: "footer" });

    if (error) {
      // Unique constraint violation, already subscribed, treat as success
      if (error.code === "23505") {
        return apiOk();
      }
      // Table doesn't exist yet
      if (error.code === "42P01") {
        return apiError("service_unavailable", 503);
      }
      log("error", "newsletter.insert_failed", {
        ...logContext(req, { action: "insert" }),
        code: error.code
      });
      return apiError("subscribe_failed", 500);
    }

    void (async () => {
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: [email],
          subject: newsletterConfirmSubject(),
          html: newsletterConfirmHtml()
        });
      } catch (err) {
        log("error", "newsletter.confirm_email_failed", {
          ...logContext(req, { action: "send_email" })
        });
      }
    })();

    return apiOk();
  } catch {
    return apiError("internal_error", 500);
  }
}
