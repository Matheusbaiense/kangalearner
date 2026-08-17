"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
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
  useEffect(() => {
    recordSponsorEvent(slotId, campaign, "impression");
  }, [slotId, campaign]);

  return (
    <div
      className="sponsor-card"
      style={{
        margin: "24px 0 0",
        padding: "16px 20px",
        borderRadius: "var(--radius-md)",
        background: "var(--brand3, #f0f9ff)",
        border: "1px solid rgba(46,125,91,0.35)"
      }}
    >
      <p
        style={{
          fontSize: ".72rem",
          fontWeight: 900,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          color: "var(--green)",
          margin: "0 0 6px"
        }}
      >
        {campaign.label} · {campaign.advertiser}
      </p>
      <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", margin: "0 0 4px" }}>
        {campaign.headline}
      </p>
      <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.5, margin: "0 0 14px" }}>
        {campaign.body}
      </p>
      <a
        href={campaign.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn btn-secondary"
        style={{
          fontSize: ".85rem",
          padding: "8px 16px",
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }}
        onClick={() => recordSponsorEvent(slotId, campaign, "click")}
      >
        {campaign.cta}
        <ExternalLink size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
