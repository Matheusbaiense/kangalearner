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
  FileText,
  RefreshCw,
  ArrowLeftRight,
  CloudRain,
  ShieldAlert,
  Award,
  PhoneOff,
  BedDouble,
  School,
  Footprints,
  Truck
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
  Emergencies: Wrench,
  Roundabouts: RefreshCw,
  "Lane Changing": ArrowLeftRight,
  "Weather Conditions": CloudRain,
  Seatbelts: ShieldAlert,
  "Demerit Points": Award,
  "Mobile Phones": PhoneOff,
  Fatigue: BedDouble,
  "School Zones": School,
  "Shared Zones": Footprints,
  Towing: Truck
};

export function categoryLucideIcon(categoryKey: string): LucideIcon {
  return CATEGORY_LUCIDE[categoryKey] ?? FileText;
}
