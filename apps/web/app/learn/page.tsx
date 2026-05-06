import Link from "next/link";
import { Icons } from "@/components/icons";
import { IconBadge } from "@/components/ui/IconBadge";

const TOPICS = [
  {
    slug: "speed-limits",
    icon: Icons.speed,
    title: "Speed Limits",
    desc: "Urban, rural, school zones and special limits."
  },
  {
    slug: "road-signs",
    icon: Icons.signs,
    title: "Road Signs",
    desc: "Warning, regulatory and informational signs."
  },
  {
    slug: "parking-rules",
    icon: Icons.parking,
    title: "Parking Rules",
    desc: "Distances, restrictions and clearways."
  },
  {
    slug: "alcohol-bac",
    icon: Icons.warning,
    title: "Alcohol & BAC",
    desc: "Limits for learner, P1, P2 and full licence."
  },
  {
    slug: "road-markings",
    icon: Icons.map,
    title: "Road Markings",
    desc: "Lines, arrows, and painted zones."
  },
  {
    slug: "road-safety",
    icon: Icons.safety,
    title: "Road Safety",
    desc: "Fatigue, distractions and hazards."
  },
  {
    slug: "traffic-lights",
    icon: Icons.trafficSignal,
    title: "Traffic Lights",
    desc: "Signals, arrows and special conditions."
  },
  {
    slug: "overtaking",
    icon: Icons.arrowRight,
    title: "Overtaking",
    desc: "When, where and how to overtake safely."
  }
];

export default function LearnPage() {
  return (
    <main className="container section-pad">
      <h1>Learn Road Rules</h1>
      <p className="page-sub">Study by topic before taking the practice quiz or mock test.</p>
      <div className="topics-grid">
        {TOPICS.map((t) => (
          <Link key={t.slug} href={`/learn/${t.slug}`} className="topic-card">
            <IconBadge icon={t.icon} tone="brand" className="topic-icon" />
            <strong>{t.title}</strong>
            <span>{t.desc}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
