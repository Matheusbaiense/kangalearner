import { ExternalLink } from "lucide-react-native";
import { useEffect } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { colors, radius, spacing } from "../../theme";
import { Card, useThemeColors } from "../../ui/kit";
import type { AdSlotId, DirectSponsorCampaign } from "./ads-config";

type SponsorEvent = "impression" | "click";

function recordSponsorEvent(
  slotId: AdSlotId,
  campaign: DirectSponsorCampaign,
  event: SponsorEvent
) {
  console.info("[ads:direct]", event, {
    slotId,
    campaignId: campaign.id,
    advertiser: campaign.advertiser
  });
}

export function SponsorCard({
  slotId,
  campaign
}: {
  slotId: AdSlotId;
  campaign: DirectSponsorCampaign;
}) {
  const c = useThemeColors();

  useEffect(() => {
    recordSponsorEvent(slotId, campaign, "impression");
  }, [campaign, slotId]);

  async function openSponsor() {
    recordSponsorEvent(slotId, campaign, "click");
    const canOpen = await Linking.canOpenURL(campaign.url);
    if (canOpen) await Linking.openURL(campaign.url);
  }

  return (
    <Card
      style={{
        borderColor: "rgba(82,183,136,0.5)",
        backgroundColor: c.card
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: radius.sm,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EAF7F1"
          }}
        >
          <Text style={{ color: colors.teal, fontWeight: "900" }}>
            {campaign.advertiser.slice(0, 1).toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{ color: c.green, fontSize: 12, fontWeight: "900", textTransform: "uppercase" }}
          >
            {campaign.label}
          </Text>
          <Text selectable style={{ color: c.muted, fontSize: 13, fontWeight: "700" }}>
            {campaign.advertiser}
          </Text>
        </View>
      </View>
      <Text selectable style={{ color: c.ink, fontSize: 19, fontWeight: "900", lineHeight: 26 }}>
        {campaign.headline}
      </Text>
      <Text selectable style={{ color: c.muted, lineHeight: 23 }}>
        {campaign.body}
      </Text>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${campaign.cta} - ${campaign.advertiser}`}
        onPress={() => void openSponsor()}
        style={({ pressed }) => ({
          minHeight: 48,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: spacing.sm,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: c.border,
          opacity: pressed ? 0.72 : 1
        })}
      >
        <Text style={{ color: c.ink, fontWeight: "900" }}>{campaign.cta}</Text>
        <ExternalLink color={c.ink} size={17} />
      </Pressable>
    </Card>
  );
}
