import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KangaLearner — Pass Your WA Learner Test";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BADGES = ["Free Forever", "Growing Bank", "Mock Test", "3 Languages"] as const;

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#071A2C",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, Helvetica, sans-serif"
      }}
    >
      {/* Top accent bar */}
      <div style={{ width: "100%", height: 8, background: "#52B788", display: "flex" }} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "0 80px"
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#52B788",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <span style={{ color: "#071A2C", fontSize: 44, fontWeight: 900, lineHeight: 1 }}>
              K
            </span>
          </div>
          <span style={{ color: "#ffffff", fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>
            KangaLearner
          </span>
        </div>

        {/* Headline */}
        <span
          style={{
            color: "#ffffff",
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.08
          }}
        >
          Pass Your WA Learner Test
        </span>

        {/* Sub-headline */}
        <span style={{ color: "#94a3b8", fontSize: 24, textAlign: "center" }}>
          Free practice in English · Português · Español
        </span>

        {/* Badge pills */}
        <div style={{ display: "flex", gap: 14 }}>
          {BADGES.map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(82,183,136,0.12)",
                borderWidth: 1.5,
                borderStyle: "solid",
                borderColor: "rgba(82,183,136,0.4)",
                borderRadius: 100,
                padding: "10px 22px",
                color: "#52B788",
                fontSize: 17,
                fontWeight: 700,
                display: "flex"
              }}
            >
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          width: "100%",
          height: 56,
          background: "rgba(82,183,136,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14
        }}
      >
        <div
          style={{ width: 6, height: 6, borderRadius: 100, background: "#52B788", display: "flex" }}
        />
        <span style={{ color: "rgba(148,163,184,0.7)", fontSize: 18 }}>
          kangalearner.com.au · Western Australia · DoT Learner Licence
        </span>
        <div
          style={{ width: 6, height: 6, borderRadius: 100, background: "#52B788", display: "flex" }}
        />
      </div>

      {/* Bottom accent bar */}
      <div style={{ width: "100%", height: 8, background: "#52B788", display: "flex" }} />
    </div>,
    { ...size }
  );
}
