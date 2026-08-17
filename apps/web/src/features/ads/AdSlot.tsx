import {
  type AdSlotId,
  isAdsEnabled,
  isDevelopmentRuntime,
  isDirectAdsEnabled,
  isGoogleAdsEnabled,
  resolveAdSenseUnit,
  selectDirectSponsorCampaign
} from "./ads-config";
import { GoogleAdSlot } from "./GoogleAdSlot";
import { SponsorCard } from "./SponsorCard";

// Resolves everything (env checks, campaign pick, AdSense unit lookup) here,
// server-side, so the "use client" leaf below only ever receives plain data
// and never needs to import ads-config.ts itself.
export function AdSlot({ slotId }: { slotId: AdSlotId }) {
  if (!isAdsEnabled()) return null;

  const directCampaign = isDirectAdsEnabled()
    ? selectDirectSponsorCampaign(slotId, new Date(), {
        includeDevelopmentCampaigns: isDevelopmentRuntime()
      })
    : null;

  if (directCampaign) return <SponsorCard slotId={slotId} campaign={directCampaign} />;

  if (!isGoogleAdsEnabled()) return null;
  const unit = resolveAdSenseUnit(slotId, { isDevelopment: isDevelopmentRuntime() });
  if (!unit) return null;

  return <GoogleAdSlot unit={unit} />;
}
