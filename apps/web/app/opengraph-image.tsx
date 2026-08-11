import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KangaLearner | Pass Your WA Learner Test";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BADGES = ["Free Forever", "Growing Bank", "Mock Test", "3 Languages"] as const;

const KANGAROO_BADGE_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSIxMTIiIGZpbGw9IiM1MkI3ODgiLz4KPHBhdGggZD0iTSA0MzEuNDkgMjQ2LjAxIEwgNDIyLjQ1IDI2OS43OSBMIDQxMi40NyAyODYuOTEgTCA0MDMuNDMgMjk3Ljg1IEwgMzg2Ljc5IDMxMi41OSBMIDM3My45NCAzMjAuNjggTCAzNTYuMzUgMzI5LjI0IEwgMjc3Ljg4IDM1Ni4zNSBMIDIyOS4zNyAzNzguMjMgTCAyMDYuNTQgMzkxLjU0IEwgMTg0LjY2IDQwNi43NiBMIDE2Mi43OSA0MjUuMzEgTCAxNTAuOTAgNDM4LjE1IEwgMjU5LjgwIDQzOC4xNSBMIDI3OC4zNSA0MzYuNzIgTCAyOTguMzMgNDMyLjQ0IEwgMzA5Ljc0IDQyOC42NCBMIDMyNy4zNCA0MjAuNTUgTCAzNDMuMDMgNDExLjA0IEwgMzYwLjYzIDM5Ny4yNSBMIDM4MS4wOCAzNzYuODAgTCAzOTQuODcgMzU5LjY4IEwgNDExLjA0IDMzMy41MiBMIDQyMi45MyAzMDUuOTQgTCA0MjguNjQgMjg1LjQ5IEwgNDMxLjk3IDI2My4xMyBaIE0gMjc4LjgzIDQwNC4zOCBMIDI1NC41NyA0MjEuNTAgTCAyMzkuODMgNDMzLjg3IEwgMjE5Ljg2IDQyNi43MyBMIDIyMS4yOCA0MjQuMzYgTCAyMzYuOTggNDEyLjk0IEwgMjYzLjEzIDM5Ny4yNSBaIE0gMzMzLjA0IDM3My40NyBMIDMzMi41NyAzNzQuOTAgTCAyOTcuMzggMzk0Ljg3IEwgMjk1LjQ3IDM5NC44NyBMIDI4Mi4xNiAzODcuNzQgTCAyODMuMTEgMzg2LjMxIEwgMzIyLjU4IDM2Ny4yOSBMIDMyNC45NiAzNjcuNzYgWiBNIDM3Ny43NSAzNDUuODkgTCAzNjYuMzQgMzU1LjQwIEwgMzUwLjE3IDM2Ni4zNCBMIDMzOS4yMyAzNTkuNjggTCAzNjkuNjYgMzQxLjEzIFogTSA0MDMuNDMgMzE5LjI1IEwgMzk3LjcyIDMyNy4zNCBMIDM4OS4xNiAzMzYuMzcgTCAzODEuNTUgMzMyLjA5IEwgMzk3LjcyIDMxNS45MiBaIE0gNDEwLjU2IDMwMC43MCBMIDQxMy40MiAzMDIuMTMgTCA0MTMuODkgMzA0LjAzIEwgNDA3LjcxIDMxMi41OSBMIDQwMi45NiAzMDkuMjcgTCA0MDguMTkgMzAyLjEzIFogTSA0MjcuNjkgMjY1LjA0IEwgNDI4LjY0IDI2Ni45NCBMIDQyNC4zNiAyODEuNjggTCA0MTYuMjcgMjk4LjgwIEwgNDE0Ljg1IDI5OC44MCBMIDQxMS45OSAyOTYuNDIgTCA0MTkuMTMgMjgzLjU4IEwgNDI1Ljc4IDI2Ni40NiBaIE0gNDcyLjM5IDE4MS4zMyBMIDQ0My44NiAxNTUuNjUgTCA0MzEuMDEgMTUxLjg1IEwgNDIwLjA4IDE1MS44NSBMIDQxMi45NCAxMzguNTMgTCA0MDQuMzggMTI5LjQ5IEwgMzgzLjkzIDExNy42MSBMIDM4Ny43NCAxNDEuMzggTCA0MDIuNDggMTYxLjgzIEwgMzkxLjA3IDE3OS45MSBMIDM4Mi4wMyAxODcuOTkgTCAzNzIuMDQgMTkwLjg1IEwgMzYyLjUzIDE4OS44OSBMIDMyNi44NiAxNzQuNjggTCAzMDQuNTEgMTY5LjkyIEwgMjc3LjQwIDE3MC4zOSBMIDI1NC4xMCAxNzYuMTAgTCAyMzEuNzUgMTg3LjUyIEwgMjExLjc3IDIwMy4yMSBMIDE2MS4zNiAyNjEuMjMgTCAxNDIuMzQgMjgwLjI1IEwgMTIwLjQ2IDI5Ny4zOCBMIDEwNC4yOSAzMDYuNDEgTCA4My4zNiAzMTMuNTUgTCA1OC4xNiAzMTUuOTIgTCAzOS4xMyAzMTMuMDcgTCA1NC44MyAzMjMuMDYgTCA3My4zOCAzMjcuODEgTCA5NS43MyAzMjcuODEgTCAxMTYuNjUgMzIzLjA2IEwgMTQwLjkxIDMxMi4xMiBMIDE1Ni42MCAzMDIuMTMgTCAyMTEuNzcgMjU1LjA1IEwgMjI2LjUxIDI1Mi4yMCBMIDI0Mi4yMSAyNTcuOTAgTCAyNTIuNjcgMjY1Ljk5IEwgMjYxLjcxIDI3Ny44OCBMIDI2NS4wNCAyODcuODYgTCAyNjUuMDQgMjk3Ljg1IEwgMjYxLjIzIDMxMS4xNyBMIDI0My4xNiAzNDMuOTggTCAyNjkuMzIgMzM0Ljk1IEwgMjk5Ljc1IDI5OC44MCBMIDMxMi41OSAyNzUuOTcgTCAzMTYuNDAgMjUxLjI0IEwgMzIyLjExIDI1NC4xMCBMIDMzOC4yOCAyNDUuMDYgTCAzNDkuNjkgMjQxLjczIEwgMzY1Ljg2IDI0NS4wNiBMIDM1Mi41NCAyNzEuMjIgTCAzMzQuMDAgMjgwLjI1IEwgMzI0LjAxIDI5My4xMCBMIDM1MS4xMiAyODcuMzkgTCAzNjcuNzYgMjc1Ljk3IEwgMzkwLjU5IDI1MC43NyBMIDQyMi40NSAxOTUuMTMgTCA0MzUuNzcgMTk1LjEzIEwgNDQ3LjY2IDE5Mi4yNyBMIDQ2NC43OCAxOTMuMjIgTCA0NzAuNDkgMTg3Ljk5IFogTSA0MjkuMTEgMTY1LjE2IEwgNDMyLjkyIDE2My4yNiBMIDQzOC4xNSAxNjMuMjYgTCA0NDMuMzggMTY4LjQ5IEwgNDQwLjUzIDE3MC44NyBMIDQzNS43NyAxNzEuMzUgTCA0MzMuMzkgMTcwLjM5IFoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNIDEwNy4xNCAzNDguMjYgTCAxMTAuOTUgMzU2LjM1IEwgMTI1LjIxIDM3NS44NSBMIDE0MS4zOCAzOTIuNDkgTCAxNTYuMTMgNDA0LjM4IEwgMTcxLjgyIDM5Mi40OSBMIDE1My43NSAzNzguNzAgTCAxNDAuNDMgMzY1LjM4IEwgMTMyLjgyIDM1Ni4zNSBMIDEyMy4zMSAzNDIuNTYgWiBNIDM2MC42MyAxMDEuOTEgTCAzMzguMjggODkuMDcgTCAzMTYuODcgODAuOTkgTCAyODguODIgNzQuODAgTCAyNjUuOTkgNzMuMzggTCAyMzkuMzUgNzUuMjggTCAyMTEuMzAgODEuNDYgTCAxODguNDcgOTAuMDIgTCAxNjAuNDEgMTA1LjcyIEwgMTM5LjAxIDEyMi44NCBMIDEyMy4zMSAxMzkuNDggTCAxMDcuNjIgMTYxLjM2IEwgOTQuNzggMTg2LjA5IEwgODYuMjIgMjEwLjgyIEwgODAuOTkgMjM5LjgzIEwgODAuMDMgMjYxLjcxIEwgODIuODkgMjg4LjgyIEwgOTguNTggMjgxLjY4IEwgOTcuMTUgMjQ5LjgyIEwgOTkuMDYgMjMyLjcwIEwgMTA1LjcyIDIwNi41NCBMIDExNS4yMyAxODQuNjYgTCAxMjguMDcgMTYzLjc0IEwgMTM3LjU4IDE1MS44NSBMIDE1My43NSAxMzUuNjggTCAxNjguNDkgMTI0LjI2IEwgMTk1LjYwIDEwOS4wNCBMIDIxNi4wNSAxMDEuNDQgTCAyNDIuMjEgOTUuNzMgTCAyNzAuMjcgOTQuMzAgTCAyOTcuODUgOTcuNjMgTCAzMjEuNjMgMTA0Ljc2IEwgMzQ2Ljg0IDExNy42MSBMIDM2NC45MSAxMzEuODcgWiIgZmlsbD0iIzA3MUEyQyIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=";

const KANGAROO_WATERMARK_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZD0iTSA0MzEuNDkgMjQ2LjAxIEwgNDIyLjQ1IDI2OS43OSBMIDQxMi40NyAyODYuOTEgTCA0MDMuNDMgMjk3Ljg1IEwgMzg2Ljc5IDMxMi41OSBMIDM3My45NCAzMjAuNjggTCAzNTYuMzUgMzI5LjI0IEwgMjc3Ljg4IDM1Ni4zNSBMIDIyOS4zNyAzNzguMjMgTCAyMDYuNTQgMzkxLjU0IEwgMTg0LjY2IDQwNi43NiBMIDE2Mi43OSA0MjUuMzEgTCAxNTAuOTAgNDM4LjE1IEwgMjU5LjgwIDQzOC4xNSBMIDI3OC4zNSA0MzYuNzIgTCAyOTguMzMgNDMyLjQ0IEwgMzA5Ljc0IDQyOC42NCBMIDMyNy4zNCA0MjAuNTUgTCAzNDMuMDMgNDExLjA0IEwgMzYwLjYzIDM5Ny4yNSBMIDM4MS4wOCAzNzYuODAgTCAzOTQuODcgMzU5LjY4IEwgNDExLjA0IDMzMy41MiBMIDQyMi45MyAzMDUuOTQgTCA0MjguNjQgMjg1LjQ5IEwgNDMxLjk3IDI2My4xMyBaIE0gMjc4LjgzIDQwNC4zOCBMIDI1NC41NyA0MjEuNTAgTCAyMzkuODMgNDMzLjg3IEwgMjE5Ljg2IDQyNi43MyBMIDIyMS4yOCA0MjQuMzYgTCAyMzYuOTggNDEyLjk0IEwgMjYzLjEzIDM5Ny4yNSBaIE0gMzMzLjA0IDM3My40NyBMIDMzMi41NyAzNzQuOTAgTCAyOTcuMzggMzk0Ljg3IEwgMjk1LjQ3IDM5NC44NyBMIDI4Mi4xNiAzODcuNzQgTCAyODMuMTEgMzg2LjMxIEwgMzIyLjU4IDM2Ny4yOSBMIDMyNC45NiAzNjcuNzYgWiBNIDM3Ny43NSAzNDUuODkgTCAzNjYuMzQgMzU1LjQwIEwgMzUwLjE3IDM2Ni4zNCBMIDMzOS4yMyAzNTkuNjggTCAzNjkuNjYgMzQxLjEzIFogTSA0MDMuNDMgMzE5LjI1IEwgMzk3LjcyIDMyNy4zNCBMIDM4OS4xNiAzMzYuMzcgTCAzODEuNTUgMzMyLjA5IEwgMzk3LjcyIDMxNS45MiBaIE0gNDEwLjU2IDMwMC43MCBMIDQxMy40MiAzMDIuMTMgTCA0MTMuODkgMzA0LjAzIEwgNDA3LjcxIDMxMi41OSBMIDQwMi45NiAzMDkuMjcgTCA0MDguMTkgMzAyLjEzIFogTSA0MjcuNjkgMjY1LjA0IEwgNDI4LjY0IDI2Ni45NCBMIDQyNC4zNiAyODEuNjggTCA0MTYuMjcgMjk4LjgwIEwgNDE0Ljg1IDI5OC44MCBMIDQxMS45OSAyOTYuNDIgTCA0MTkuMTMgMjgzLjU4IEwgNDI1Ljc4IDI2Ni40NiBaIE0gNDcyLjM5IDE4MS4zMyBMIDQ0My44NiAxNTUuNjUgTCA0MzEuMDEgMTUxLjg1IEwgNDIwLjA4IDE1MS44NSBMIDQxMi45NCAxMzguNTMgTCA0MDQuMzggMTI5LjQ5IEwgMzgzLjkzIDExNy42MSBMIDM4Ny43NCAxNDEuMzggTCA0MDIuNDggMTYxLjgzIEwgMzkxLjA3IDE3OS45MSBMIDM4Mi4wMyAxODcuOTkgTCAzNzIuMDQgMTkwLjg1IEwgMzYyLjUzIDE4OS44OSBMIDMyNi44NiAxNzQuNjggTCAzMDQuNTEgMTY5LjkyIEwgMjc3LjQwIDE3MC4zOSBMIDI1NC4xMCAxNzYuMTAgTCAyMzEuNzUgMTg3LjUyIEwgMjExLjc3IDIwMy4yMSBMIDE2MS4zNiAyNjEuMjMgTCAxNDIuMzQgMjgwLjI1IEwgMTIwLjQ2IDI5Ny4zOCBMIDEwNC4yOSAzMDYuNDEgTCA4My4zNiAzMTMuNTUgTCA1OC4xNiAzMTUuOTIgTCAzOS4xMyAzMTMuMDcgTCA1NC44MyAzMjMuMDYgTCA3My4zOCAzMjcuODEgTCA5NS43MyAzMjcuODEgTCAxMTYuNjUgMzIzLjA2IEwgMTQwLjkxIDMxMi4xMiBMIDE1Ni42MCAzMDIuMTMgTCAyMTEuNzcgMjU1LjA1IEwgMjI2LjUxIDI1Mi4yMCBMIDI0Mi4yMSAyNTcuOTAgTCAyNTIuNjcgMjY1Ljk5IEwgMjYxLjcxIDI3Ny44OCBMIDI2NS4wNCAyODcuODYgTCAyNjUuMDQgMjk3Ljg1IEwgMjYxLjIzIDMxMS4xNyBMIDI0My4xNiAzNDMuOTggTCAyNjkuMzIgMzM0Ljk1IEwgMjk5Ljc1IDI5OC44MCBMIDMxMi41OSAyNzUuOTcgTCAzMTYuNDAgMjUxLjI0IEwgMzIyLjExIDI1NC4xMCBMIDMzOC4yOCAyNDUuMDYgTCAzNDkuNjkgMjQxLjczIEwgMzY1Ljg2IDI0NS4wNiBMIDM1Mi41NCAyNzEuMjIgTCAzMzQuMDAgMjgwLjI1IEwgMzI0LjAxIDI5My4xMCBMIDM1MS4xMiAyODcuMzkgTCAzNjcuNzYgMjc1Ljk3IEwgMzkwLjU5IDI1MC43NyBMIDQyMi40NSAxOTUuMTMgTCA0MzUuNzcgMTk1LjEzIEwgNDQ3LjY2IDE5Mi4yNyBMIDQ2NC43OCAxOTMuMjIgTCA0NzAuNDkgMTg3Ljk5IFogTSA0MjkuMTEgMTY1LjE2IEwgNDMyLjkyIDE2My4yNiBMIDQzOC4xNSAxNjMuMjYgTCA0NDMuMzggMTY4LjQ5IEwgNDQwLjUzIDE3MC44NyBMIDQzNS43NyAxNzEuMzUgTCA0MzMuMzkgMTcwLjM5IFoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0A2238 0%, #071A2C 55%, #041220 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative"
      }}
    >
      {/* Decorative oversized kangaroo watermark for depth */}
      <div
        style={{
          position: "absolute",
          right: -70,
          bottom: -60,
          display: "flex",
          opacity: 0.06,
          transform: "rotate(-6deg)"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={KANGAROO_WATERMARK_DATA_URI} width={480} height={480} alt="" />
      </div>

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
              width: 76,
              height: 76,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={KANGAROO_BADGE_DATA_URI} width={76} height={76} alt="" />
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
