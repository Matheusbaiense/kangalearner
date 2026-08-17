import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { bankCategoryLabelsFor, bankCountsFor } from "@/lib/stateBankCounts";
import {
  buildStateFaq,
  findStateBySlug,
  STATE_TEST_INFO,
  type StateTestInfo
} from "@/lib/stateTestInfo";
import { StatePageClient } from "./StatePageClient";

const BASE = "https://kangalearner.com.au";

interface Props {
  params: Promise<{ state: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return STATE_TEST_INFO.map((s) => ({ state: s.slug }));
}

function metaDescription(info: StateTestInfo): string {
  const { total } = bankCountsFor(info.code);
  return (
    `${total} free ${info.code} practice questions in English, Portuguese or Spanish. ` +
    info.descriptionTail
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) return { title: "State not found" };

  const description = metaDescription(info);
  const url = `${BASE}/learner-test/${info.slug}`;

  return {
    title: info.metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: { title: info.metaTitle, description, url, type: "website" }
  };
}

export default async function StateTestPage({ params }: Props) {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) notFound();

  const nonce = (await headers()).get("x-nonce") ?? "";
  const counts = bankCountsFor(info.code);
  const categories = bankCategoryLabelsFor(info.code);
  const url = `${BASE}/learner-test/${info.slug}`;

  // JSON-LD sempre em EN: mesmo conteudo do SSR indexavel.
  const faqEn = buildStateFaq(info, counts, "en");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEn.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learner practice tests",
        item: `${BASE}/learner-test`
      },
      { "@type": "ListItem", position: 3, name: info.stateName, item: url }
    ]
  };

  return (
    <main className="app-page">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StatePageClient info={info} counts={counts} categories={categories} />
    </main>
  );
}
