type GoogleMobileAdsModule = typeof import("react-native-google-mobile-ads");

declare const require: (moduleName: string) => GoogleMobileAdsModule;

let cachedModule: GoogleMobileAdsModule | null | false = null;
let initializePromise: Promise<boolean> | null = null;

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

    await module.AdsConsent.gatherConsent({
      tagForUnderAgeOfConsent: false,
      testDeviceIdentifiers: ["EMULATOR"]
    }).catch(() => null);

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
