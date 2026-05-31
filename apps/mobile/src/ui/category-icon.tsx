import {
  AlertTriangle,
  CarFront,
  Eye,
  Gauge,
  Map,
  ParkingCircle,
  Route,
  ShieldCheck,
  Signpost,
  TrafficCone,
  Wrench,
  type LucideIcon
} from "lucide-react-native";

export function iconForCategory(category: string): LucideIcon {
  const key = category.toLowerCase();
  if (key.includes("speed")) return Gauge;
  if (key.includes("give")) return Route;
  if (key.includes("alcohol")) return AlertTriangle;
  if (key.includes("parking")) return ParkingCircle;
  if (key.includes("light")) return TrafficCone;
  if (key.includes("sign")) return Signpost;
  if (key.includes("safety")) return ShieldCheck;
  if (key.includes("blind")) return Eye;
  if (key.includes("marking")) return Map;
  if (key.includes("emerg")) return Wrench;
  if (key.includes("road")) return TrafficCone;
  return CarFront;
}
