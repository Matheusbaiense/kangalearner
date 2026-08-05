type GoogleMobileAdsModule = typeof import("react-native-google-mobile-ads");

declare const require: (moduleName: string) => GoogleMobileAdsModule;

let cachedModule: GoogleMobileAdsModule | null | false = null;
let initializePromise: Promise<boolean> | null = null;
let nonPersonalizedOnly = true;

// Fail-safe default: request non-personalized ads until the UMP flow confirms
// the user allowed (or does not require consent for) personalized ads.
export function shouldRequestNonPersonalizedAdsOnly(): boolean {
  return nonPersonalizedOnly;
}

export function getGoogleMobileAdsModule(): GoogleMobileAdsModule | null {
  if (cachedModule === false) return null;
  if (cachedModule) return cachedModule;

  try {
    cachedModule = require("react-native-google-mobile-ads");
    return cachedModule;
  } catch {
    cachedModule = false;
    return null;
  }
}

export function prepareGoogleMobileAds(module: GoogleMobileAdsModule): Promise<boolean> {
  if (initializePromise) return initializePromise;

  initializePromise = (async () => {
    const mobileAds = module.default;
    const { AdsConsent, AdsConsentStatus } = module;

    let consentInfo = await AdsConsent.gatherConsent({
      tagForUnderAgeOfConsent: false,
      testDeviceIdentifiers: ["EMULATOR"]
    }).catch((error: unknown) => {
      console.warn("[ads] gatherConsent failed", error);
      return null;
    });

    if (!consentInfo) {
      // gatherConsent failed (e.g. no network for the UMP form). Fall back to
      // the last known consent state instead of assuming consent.
      consentInfo = await AdsConsent.getConsentInfo().catch(() => null);
    }

    // Fail safe: without confirmation that ads may be requested, show no ads.
    if (!consentInfo?.canRequestAds) return false;

    if (consentInfo.status === AdsConsentStatus.OBTAINED) {
      // A consent form was completed: honor the user's personalization choice.
      const choices = await AdsConsent.getUserChoices().catch(() => null);
      nonPersonalizedOnly = !choices?.selectPersonalisedAds;
    } else {
      // NOT_REQUIRED (unregulated region) allows personalized ads; anything
      // else means consent was not obtained.
      nonPersonalizedOnly = consentInfo.status !== AdsConsentStatus.NOT_REQUIRED;
    }

    await mobileAds().setRequestConfiguration({
      maxAdContentRating: module.MaxAdContentRating.T,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
      testDeviceIdentifiers: ["EMULATOR"]
    });

    await mobileAds().initialize();
    return true;
  })().catch(() => false);

  return initializePromise;
}
