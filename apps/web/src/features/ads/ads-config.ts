export type AdSlotId = "home_top" | "learn_inline" | "practice_inline" | "mock_result";

export type DirectSponsorCampaign = {
  id: string;
  advertiser: string;
  label: string;
  headline: string;
  body: string;
  cta: string;
  url: string;
  slots: AdSlotId[];
  priority: number;
  startsAt: string;
  endsAt: string;
  developmentOnly?: boolean;
};

export type AdSenseUnit = {
  clientId: string;
  slotId: string;
};

type RuntimeOptions = {
  env?: Record<string, string | undefined>;
  includeDevelopmentCampaigns?: boolean;
  isDevelopment?: boolean;
};

export const ADSENSE_SLOT_ENV: Record<AdSlotId, string> = {
  home_top: "NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT_ID",
  learn_inline: "NEXT_PUBLIC_ADSENSE_LEARN_INLINE_SLOT_ID",
  practice_inline: "NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID",
  mock_result: "NEXT_PUBLIC_ADSENSE_MOCK_RESULT_SLOT_ID"
};

// Next.js only inlines `process.env.NEXT_PUBLIC_X` when that exact member
// expression appears literally in the source, it does not follow aliases
// (`const env = process.env; env.NEXT_PUBLIC_X` is never replaced). Reading
// each var once here, at module scope, is what makes the client bundle get
// the real build-time value instead of an empty runtime `process.env` stub.
const DEFAULT_ENV: Record<string, string | undefined> = {
  NEXT_PUBLIC_KANGA_ADS_ENABLED: process.env.NEXT_PUBLIC_KANGA_ADS_ENABLED,
  NEXT_PUBLIC_KANGA_DIRECT_ADS_ENABLED: process.env.NEXT_PUBLIC_KANGA_DIRECT_ADS_ENABLED,
  NEXT_PUBLIC_KANGA_GOOGLE_ADS_ENABLED: process.env.NEXT_PUBLIC_KANGA_GOOGLE_ADS_ENABLED,
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT_ID: process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT_ID,
  NEXT_PUBLIC_ADSENSE_LEARN_INLINE_SLOT_ID: process.env.NEXT_PUBLIC_ADSENSE_LEARN_INLINE_SLOT_ID,
  NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID: process.env.NEXT_PUBLIC_ADSENSE_PRACTICE_INLINE_SLOT_ID,
  NEXT_PUBLIC_ADSENSE_MOCK_RESULT_SLOT_ID: process.env.NEXT_PUBLIC_ADSENSE_MOCK_RESULT_SLOT_ID
};

// developmentOnly previews, illustrative advertiser verticals only, not signed partners.
export const DIRECT_SPONSOR_CAMPAIGNS: DirectSponsorCampaign[] = [
  {
    id: "dev-car-insurance-preview",
    advertiser: "Kanga insurance partner preview",
    label: "Sponsored",
    headline: "New drivers save on their first car insurance policy.",
    body: "This preview slot is for a car insurance partner, a natural fit right after a learner passes their test and starts shopping for cover.",
    cta: "See insurance offer",
    url: "https://kangalearner.com.au/resources",
    slots: ["mock_result"],
    priority: 10,
    startsAt: "2026-06-01T00:00:00.000Z",
    endsAt: "2027-01-01T00:00:00.000Z",
    developmentOnly: true
  },
  {
    id: "dev-driving-school-preview",
    advertiser: "Kanga driving school partner preview",
    label: "Sponsored",
    headline: "Book lessons with a local instructor near you.",
    body: "This preview slot is for driving school partners offering paid lessons alongside KangaLearner's free study tools.",
    cta: "Find an instructor",
    url: "https://kangalearner.com.au/resources",
    slots: ["learn_inline"],
    priority: 10,
    startsAt: "2026-06-01T00:00:00.000Z",
    endsAt: "2027-01-01T00:00:00.000Z",
    developmentOnly: true
  },
  {
    id: "dev-roadside-assist-preview",
    advertiser: "Kanga roadside assistance partner preview",
    label: "Sponsored",
    headline: "Cover for your first year on the road.",
    body: "This preview slot is for roadside assistance or vehicle inspection partners relevant to new P-plate drivers.",
    cta: "View partner offer",
    url: "https://kangalearner.com.au/resources",
    slots: ["home_top"],
    priority: 10,
    startsAt: "2026-06-01T00:00:00.000Z",
    endsAt: "2027-01-01T00:00:00.000Z",
    developmentOnly: true
  }
];

export function isDevelopmentRuntime(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function isAdsEnabled(env: Record<string, string | undefined> = DEFAULT_ENV): boolean {
  return env.NEXT_PUBLIC_KANGA_ADS_ENABLED !== "false";
}

export function isDirectAdsEnabled(
  env: Record<string, string | undefined> = DEFAULT_ENV
): boolean {
  return isAdsEnabled(env) && env.NEXT_PUBLIC_KANGA_DIRECT_ADS_ENABLED !== "false";
}

export function isGoogleAdsEnabled(
  env: Record<string, string | undefined> = DEFAULT_ENV
): boolean {
  return isAdsEnabled(env) && env.NEXT_PUBLIC_KANGA_GOOGLE_ADS_ENABLED !== "false";
}

export function selectDirectSponsorCampaign(
  slotId: AdSlotId,
  now = new Date(),
  options: RuntimeOptions = {}
): DirectSponsorCampaign | null {
  const includeDevelopmentCampaigns =
    options.includeDevelopmentCampaigns ?? options.isDevelopment ?? isDevelopmentRuntime();
  const nowMs = now.getTime();

  return (
    DIRECT_SPONSOR_CAMPAIGNS.filter((campaign) => {
      if (!campaign.slots.includes(slotId)) return false;
      if (campaign.developmentOnly && !includeDevelopmentCampaigns) return false;
      if (Date.parse(campaign.startsAt) > nowMs) return false;
      if (Date.parse(campaign.endsAt) <= nowMs) return false;
      return true;
    }).sort((a, b) => b.priority - a.priority)[0] ?? null
  );
}

export function resolveAdSenseUnit(
  slotId: AdSlotId,
  options: RuntimeOptions = {}
): AdSenseUnit | null {
  // Never request real ads from a local/dev runtime, avoids invalid-traffic risk
  // against a live AdSense account once real credentials are configured.
  if (options.isDevelopment ?? isDevelopmentRuntime()) return null;

  const env = options.env ?? DEFAULT_ENV;
  const clientId = env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  const slotEnvId = env[ADSENSE_SLOT_ENV[slotId]]?.trim();

  if (!clientId || !slotEnvId) return null;
  return { clientId, slotId: slotEnvId };
}
