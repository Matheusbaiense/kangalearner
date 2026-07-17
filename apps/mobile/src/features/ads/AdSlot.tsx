import {
  type AdSlotId,
  isAdsEnabled,
  isDevelopmentRuntime,
  isDirectAdsEnabled,
  selectDirectSponsorCampaign
} from "./ads-config";
import { GoogleBannerSlot } from "./GoogleBannerSlot";
import { SponsorCard } from "./SponsorCard";

export function AdSlot({ slotId }: { slotId: AdSlotId }) {
  if (!isAdsEnabled()) return null;

  const directCampaign = isDirectAdsEnabled()
    ? selectDirectSponsorCampaign(slotId, new Date(), {
        includeDevelopmentCampaigns: isDevelopmentRuntime()
      })
    : null;

  if (directCampaign) return <SponsorCard slotId={slotId} campaign={directCampaign} />;

  return <GoogleBannerSlot slotId={slotId} />;
}
