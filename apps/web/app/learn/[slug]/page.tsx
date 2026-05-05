import { notFound } from "next/navigation";

const VALID_SLUGS = [
  "speed-limits",
  "road-signs",
  "parking-rules",
  "alcohol-bac",
  "road-markings",
  "road-safety",
  "traffic-lights",
  "overtaking"
];

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();
  return (
    <main className="container section-pad">
      <h1>{slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
      <p>
        Topic content coming soon. <a href="/practice">Practice questions →</a>
      </p>
    </main>
  );
}
