"use client";

import { PrepHubView } from "@/components/journey/PrepHubView";
import { buildHazardHub } from "@/lib/statePrepHubs";
import { useStateProfile } from "@/lib/stateSelection";

export default function HptPage() {
  const profile = useStateProfile();
  return <PrepHubView hub={buildHazardHub(profile)} />;
}
