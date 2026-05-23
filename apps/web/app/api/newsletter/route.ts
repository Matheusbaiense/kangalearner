import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";
import { resend, FROM_ADDRESS } from "@/lib/resend";
import { newsletterConfirmHtml, newsletterConfirmSubject } from "@/lib/emails/newsletter-confirm";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!await rateLimit(`newsletter:${ip}`, 3, 60_000)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email, subscribed_at: new Date().toISOString(), source: "footer" });

    if (error) {
      // Unique constraint violation — already subscribed, treat as success
      if (error.code === "23505") {
        return NextResponse.json({ ok: true });
      }
      // Table doesn't exist yet
      if (error.code === "42P01") {
        return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
      }
      console.error("[newsletter]", error.code);
      return NextResponse.json({ ok: false, error: "subscribe_failed" }, { status: 500 });
    }

    void (async () => {
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: [email],
          subject: newsletterConfirmSubject(),
          html: newsletterConfirmHtml(),
        });
      } catch (err) {
        console.error("[newsletter] confirmation email failed:", err);
      }
    })();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
