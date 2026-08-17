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

export type GoogleAdProvider = "gam" | "admob";

export type GoogleAdUnit = {
  provider: GoogleAdProvider;
  unitId: string;
};

type RuntimeOptions = {
  env?: Record<string, string | undefined>;
  includeDevelopmentCampaigns?: boolean;
  isDevelopment?: boolean;
  testIds?: {
    admobBanner: string;
    gamBanner: string;
  };
};

type SlotGoogleEnv = {
  gam: string;
  admob: string;
};

export const GOOGLE_SLOT_ENV: Record<AdSlotId, SlotGoogleEnv> = {
  home_top: {
    gam: "EXPO_PUBLIC_GAM_HOME_TOP_ID",
    admob: "EXPO_PUBLIC_ADMOB_HOME_TOP_BANNER_ID"
  },
  learn_inline: {
    gam: "EXPO_PUBLIC_GAM_LEARN_INLINE_ID",
    admob: "EXPO_PUBLIC_ADMOB_LEARN_INLINE_BANNER_ID"
  },
  practice_inline: {
    gam: "EXPO_PUBLIC_GAM_PRACTICE_INLINE_ID",
    admob: "EXPO_PUBLIC_ADMOB_PRACTICE_INLINE_BANNER_ID"
  },
  mock_result: {
    gam: "EXPO_PUBLIC_GAM_MOCK_RESULT_ID",
    admob: "EXPO_PUBLIC_ADMOB_MOCK_RESULT_BANNER_ID"
  }
};

export const DIRECT_SPONSOR_CAMPAIGNS: DirectSponsorCampaign[] = [
  {
    id: "dev-wa-local-sponsor-preview",
    advertiser: "Kanga local partner preview",
    label: "Sponsored",
    headline: "Local WA brands can support learner drivers here.",
    body: "This preview slot is for direct campaigns such as insurers, driving schools, mechanics, and community partners.",
    cta: "View partner offer",
    url: "https://kangalearner.com.au/resources",
    slots: ["home_top", "learn_inline", "mock_result"],
    priority: 10,
    startsAt: "2026-06-01T00:00:00.000Z",
    endsAt: "2027-01-01T00:00:00.000Z",
    developmentOnly: true
  },
  {
    id: "dev-car-insurance-preview",
    advertiser: "Kanga insurance partner preview",
    label: "Sponsored",
    headline: "New drivers save on their first car insurance policy.",
    body: "This preview slot is for a car insurance partner, a natural fit right after a learner passes their test and starts shopping for cover.",
    cta: "See insurance offer",
    url: "https://kangalearner.com.au/resources",
    slots: ["practice_inline"],
    priority: 10,
    startsAt: "2026-06-01T00:00:00.000Z",
    endsAt: "2027-01-01T00:00:00.000Z",
    developmentOnly: true
  }
];

declare const __DEV__: boolean | undefined;

export function isDevelopmentRuntime(): boolean {
  if (typeof __DEV__ !== "undefined") return Boolean(__DEV__);
  return process.env.NODE_ENV !== "production";
}

export function isAdsEnabled(env = process.env): boolean {
  return env.EXPO_PUBLIC_KANGA_ADS_ENABLED !== "false";
}

export function isDirectAdsEnabled(env = process.env): boolean {
  return isAdsEnabled(env) && env.EXPO_PUBLIC_KANGA_DIRECT_ADS_ENABLED !== "false";
}

export function isGoogleAdsEnabled(env = process.env): boolean {
  return isAdsEnabled(env) && env.EXPO_PUBLIC_KANGA_GOOGLE_ADS_ENABLED !== "false";
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

export function resolveGoogleAdUnit(
  slotId: AdSlotId,
  options: RuntimeOptions = {}
): GoogleAdUnit | null {
  const env = options.env ?? process.env;
  const slotEnv = GOOGLE_SLOT_ENV[slotId];
  const gamUnitId = env[slotEnv.gam]?.trim();
  const admobUnitId = env[slotEnv.admob]?.trim();

  if (gamUnitId) return { provider: "gam", unitId: gamUnitId };
  if (admobUnitId) return { provider: "admob", unitId: admobUnitId };

  if (options.isDevelopment && options.testIds) {
    return {
      provider: "gam",
      unitId: options.testIds.gamBanner
    };
  }

  return null;
}
