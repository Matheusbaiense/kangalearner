import { Suspense } from "react";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import { Onboarding } from "@/components/Onboarding";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<header style={{ height: 60 }} aria-hidden="true" />}>
        <SiteNav />
      </Suspense>
      <Onboarding />
      {children}
      <Footer />
    </>
  );
}
