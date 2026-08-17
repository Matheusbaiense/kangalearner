"use client";

import { PrepHubView } from "@/components/journey/PrepHubView";
import { buildPracticalHub } from "@/lib/statePrepHubs";
import { useStateProfile } from "@/lib/stateSelection";

export default function PdaPage() {
  const profile = useStateProfile();
  return <PrepHubView hub={buildPracticalHub(profile)} />;
}
