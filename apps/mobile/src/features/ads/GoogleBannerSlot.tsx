import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { radius, spacing } from "../../theme";
import { useThemeColors } from "../../ui/kit";
import {
  type AdSlotId,
  isDevelopmentRuntime,
  isGoogleAdsEnabled,
  resolveGoogleAdUnit
} from "./ads-config";
import { getGoogleMobileAdsModule, prepareGoogleMobileAds } from "./google-mobile-ads";

type GoogleAdsModule = NonNullable<ReturnType<typeof getGoogleMobileAdsModule>>;

export function GoogleBannerSlot({ slotId }: { slotId: AdSlotId }) {
  const c = useThemeColors();
  const [module, setModule] = useState<GoogleAdsModule | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const adsModule = getGoogleMobileAdsModule();

    if (!isGoogleAdsEnabled() || !adsModule) {
      setFailed(true);
      return;
    }

    prepareGoogleMobileAds(adsModule).then((initialized) => {
      if (!mounted) return;
      if (initialized) {
        setModule(adsModule);
        setReady(true);
      } else {
        setFailed(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (failed || !ready || !module) return null;

  const unit = resolveGoogleAdUnit(slotId, {
    isDevelopment: isDevelopmentRuntime(),
    testIds: {
      admobBanner: module.TestIds.BANNER,
      gamBanner: module.TestIds.GAM_BANNER
    }
  });

  if (!unit) return null;

  return (
    <View
      style={{
        minHeight: 62,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: c.border,
        backgroundColor: c.card,
        padding: spacing.xs,
        overflow: "hidden"
      }}
    >
      <Text style={{ color: c.muted, fontSize: 11, fontWeight: "800", alignSelf: "flex-start" }}>
        Ad
      </Text>
      {unit.provider === "gam" ? (
        <module.GAMBannerAd
          unitId={unit.unitId}
          sizes={[module.GAMBannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
          requestOptions={{ requestNonPersonalizedAdsOnly: false }}
          onAdFailedToLoad={() => setFailed(true)}
        />
      ) : (
        <module.BannerAd
          unitId={unit.unitId}
          size={module.BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: false }}
          onAdFailedToLoad={() => setFailed(true)}
        />
      )}
    </View>
  );
}
