import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Nunito, Sora } from "next/font/google";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--kl-font-body",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--kl-font-heading",
  display: "swap"
});

export const viewport: Viewport = { themeColor: "#071A2C" };

export const metadata: Metadata = {
  title: {
    default: "KangaLearner — WA Learner Test Practice",
    template: "%s | KangaLearner"
  },
  description:
    "Free WA learner licence test practice in English, Portuguese and Spanish. " +
    "Covers all road rule topics: signs, speed limits, give way, alcohol laws and more. " +
    "Used by immigrants in Perth preparing for the DoT learner test.",
  keywords: [
    "WA learner test",
    "Western Australia driving test",
    "Perth learner licence",
    "learner test practice WA",
    "driving test WA",
    "learner licence WA",
    "prova de habilitação WA",
    "examen de manejo WA",
    "practice learner test Perth",
    "immigrant driving test Australia"
  ],
  authors: [{ name: "KangaLearner" }],
  creator: "KangaLearner",
  alternates: {
    canonical: "https://kangalearner.com.au"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.svg",
    apple: "/icon-192.png"
  },
  openGraph: {
    title: "KangaLearner — Pass Your WA Learner Test",
    description:
      "Practice all WA learner test topics in English, Portuguese or Spanish. Free mock test — same format as the real DoT test.",
    type: "website",
    url: "https://kangalearner.com.au",
    siteName: "KangaLearner",
    locale: "en_AU"
  },
  twitter: {
    card: "summary_large_image",
    title: "KangaLearner — WA Learner Test Practice",
    description: "Free WA learner test in 3 languages. Pass first time."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${sora.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "KangaLearner",
              url: "https://kangalearner.com.au",
              description:
                "WA learner driving test practice in English, Portuguese and Spanish. " +
                "Covers all road rule topics aligned with the DoT WA Learner Licence test.",
              applicationCategory: "EducationApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "AUD",
                availability: "https://schema.org/InStock"
              },
              inLanguage: ["en", "pt", "es"],
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Western Australia",
                containedInPlace: { "@type": "Country", name: "Australia" }
              },
              audience: {
                "@type": "Audience",
                audienceType: "Immigrants and new residents in Western Australia"
              }
            })
          }}
        />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
