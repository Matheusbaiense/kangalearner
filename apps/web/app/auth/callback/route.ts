import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPPORTED_COUNTRY } from "@kanga/core";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { safeNextPath } from "@/lib/auth/safeNextPath";

/**
 * OAuth / magic-link callback (INFRA-7).
 * Troca o código por sessão (cookies na resposta de redirect) e, se aplicável,
 * cria customer Stripe e associa a `profiles.stripe_customer_id`.
 *
 * Rotas vivem em `app/` (requisito do Next). Imports `@/` → `src/`.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNextPath(url.searchParams.get("next") ?? url.searchParams.get("redirect"), "/");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=no_code", url.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/auth/login?error=missing_env", url.origin));
  }

  // exchangeCodeForSession tem de escrever cookies na mesma resposta do redirect.
  const response = NextResponse.redirect(new URL(next, url.origin));
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("Auth callback error:", error?.message ?? "unknown");
    return NextResponse.redirect(new URL("/auth/login?error=auth_failed", url.origin));
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Auth callback profile read:", profileError.message);
  }

  // Sync Google avatar for existing users who didn't have one yet
  if (profile && !profile.avatar_url) {
    const googleAvatar =
      (user.user_metadata?.avatar_url as string | undefined) ||
      (user.user_metadata?.picture as string | undefined);
    if (googleAvatar) {
      await supabaseAdmin
        .from("profiles")
        .update({ avatar_url: googleAvatar })
        .eq("id", user.id);
    }
  }

  if (profile && !profile.stripe_customer_id && process.env.STRIPE_SECRET_KEY && user.email) {
    try {
      const { createStripeCustomer } = await import("@/lib/stripe");
      const stripeCustomerId = await createStripeCustomer({
        email: user.email,
        name:
          (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
          (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
          undefined,
        userId: user.id,
        country: SUPPORTED_COUNTRY
      });

      await supabaseAdmin
        .from("profiles")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", user.id);
    } catch (stripeError) {
      console.error("Stripe customer creation failed:", stripeError instanceof Error ? stripeError.message : String(stripeError));
    }
  }

  return response;
}
