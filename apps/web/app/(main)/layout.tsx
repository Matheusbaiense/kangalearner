import { Suspense } from "react";
import type { ReactNode } from "react";
import { SiteNav, type InitialNavUser } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { Onboarding } from "@/components/Onboarding";
import { createClient } from "@/lib/supabase/server";

function getInitials(name: string, email: string): string {
  const src = name || email;
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

// Isolated in its own async component (rather than awaited at the top of MainLayout)
// so the Suspense boundary below can actually stream the rest of the page, including
// {children}, the page content, while this resolves, instead of blocking the whole
// response on a Supabase round-trip before any HTML can be sent.
async function NavUserSlot() {
  let initialNavUser: InitialNavUser | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const name =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined) ||
        "";
      const email = user.email ?? "";
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      initialNavUser = {
        email,
        name,
        initials: getInitials(name, email),
        role: profile?.role ?? "free",
        avatarUrl: (profile?.avatar_url as string | null) ?? null
      };
    }
  } catch {
    // Env vars not configured, dev without .env.local
  }

  return <SiteNav initialNavUser={initialNavUser} />;
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<header style={{ height: 60 }} aria-hidden="true" />}>
        <NavUserSlot />
      </Suspense>
      <Onboarding />
      {children}
      <Footer />
    </>
  );
}
