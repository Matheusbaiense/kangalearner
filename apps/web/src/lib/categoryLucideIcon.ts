import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Eye,
  Gauge,
  GitMerge,
  Map,
  ParkingCircle,
  ShieldCheck,
  Signal,
  TrafficCone,
  Wrench,
  FileText
} from "lucide-react";

/** Maps `CATEGORIES[].key` from `@kanga/core` to Lucide icons (replaces emoji `icon` field in UI only). */
const CATEGORY_LUCIDE: Record<string, LucideIcon> = {
  "Speed Limits": Gauge,
  "Give Way Rules": GitMerge,
  "Alcohol & BAC": AlertTriangle,
  "Parking Rules": ParkingCircle,
  "Traffic Lights": Signal,
  "Road Signs": TrafficCone,
  "Road Safety": ShieldCheck,
  "Blind Spot & Overtaking": Eye,
  "Road Markings": Map,
  Emergencies: Wrench
};

export function categoryLucideIcon(categoryKey: string): LucideIcon {
  return CATEGORY_LUCIDE[categoryKey] ?? FileText;
}
