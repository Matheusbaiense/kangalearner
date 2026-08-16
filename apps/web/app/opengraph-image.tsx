import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KangaLearner | You've got this, free learner test practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KANGAROO_BADGE_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSIxMTIiIGZpbGw9IiM1MkI3ODgiLz4KPHBhdGggZD0iTSA0MzEuNDkgMjQ2LjAxIEwgNDIyLjQ1IDI2OS43OSBMIDQxMi40NyAyODYuOTEgTCA0MDMuNDMgMjk3Ljg1IEwgMzg2Ljc5IDMxMi41OSBMIDM3My45NCAzMjAuNjggTCAzNTYuMzUgMzI5LjI0IEwgMjc3Ljg4IDM1Ni4zNSBMIDIyOS4zNyAzNzguMjMgTCAyMDYuNTQgMzkxLjU0IEwgMTg0LjY2IDQwNi43NiBMIDE2Mi43OSA0MjUuMzEgTCAxNTAuOTAgNDM4LjE1IEwgMjU5LjgwIDQzOC4xNSBMIDI3OC4zNSA0MzYuNzIgTCAyOTguMzMgNDMyLjQ0IEwgMzA5Ljc0IDQyOC42NCBMIDMyNy4zNCA0MjAuNTUgTCAzNDMuMDMgNDExLjA0IEwgMzYwLjYzIDM5Ny4yNSBMIDM4MS4wOCAzNzYuODAgTCAzOTQuODcgMzU5LjY4IEwgNDExLjA0IDMzMy41MiBMIDQyMi45MyAzMDUuOTQgTCA0MjguNjQgMjg1LjQ5IEwgNDMxLjk3IDI2My4xMyBaIE0gMjc4LjgzIDQwNC4zOCBMIDI1NC41NyA0MjEuNTAgTCAyMzkuODMgNDMzLjg3IEwgMjE5Ljg2IDQyNi43MyBMIDIyMS4yOCA0MjQuMzYgTCAyMzYuOTggNDEyLjk0IEwgMjYzLjEzIDM5Ny4yNSBaIE0gMzMzLjA0IDM3My40NyBMIDMzMi41NyAzNzQuOTAgTCAyOTcuMzggMzk0Ljg3IEwgMjk1LjQ3IDM5NC44NyBMIDI4Mi4xNiAzODcuNzQgTCAyODMuMTEgMzg2LjMxIEwgMzIyLjU4IDM2Ny4yOSBMIDMyNC45NiAzNjcuNzYgWiBNIDM3Ny43NSAzNDUuODkgTCAzNjYuMzQgMzU1LjQwIEwgMzUwLjE3IDM2Ni4zNCBMIDMzOS4yMyAzNTkuNjggTCAzNjkuNjYgMzQxLjEzIFogTSA0MDMuNDMgMzE5LjI1IEwgMzk3LjcyIDMyNy4zNCBMIDM4OS4xNiAzMzYuMzcgTCAzODEuNTUgMzMyLjA5IEwgMzk3LjcyIDMxNS45MiBaIE0gNDEwLjU2IDMwMC43MCBMIDQxMy40MiAzMDIuMTMgTCA0MTMuODkgMzA0LjAzIEwgNDA3LjcxIDMxMi41OSBMIDQwMi45NiAzMDkuMjcgTCA0MDguMTkgMzAyLjEzIFogTSA0MjcuNjkgMjY1LjA0IEwgNDI4LjY0IDI2Ni45NCBMIDQyNC4zNiAyODEuNjggTCA0MTYuMjcgMjk4LjgwIEwgNDE0Ljg1IDI5OC44MCBMIDQxMS45OSAyOTYuNDIgTCA0MTkuMTMgMjgzLjU4IEwgNDI1Ljc4IDI2Ni40NiBaIE0gNDcyLjM5IDE4MS4zMyBMIDQ0My44NiAxNTUuNjUgTCA0MzEuMDEgMTUxLjg1IEwgNDIwLjA4IDE1MS44NSBMIDQxMi45NCAxMzguNTMgTCA0MDQuMzggMTI5LjQ5IEwgMzgzLjkzIDExNy42MSBMIDM4Ny43NCAxNDEuMzggTCA0MDIuNDggMTYxLjgzIEwgMzkxLjA3IDE3OS45MSBMIDM4Mi4wMyAxODcuOTkgTCAzNzIuMDQgMTkwLjg1IEwgMzYyLjUzIDE4OS44OSBMIDMyNi44NiAxNzQuNjggTCAzMDQuNTEgMTY5LjkyIEwgMjc3LjQwIDE3MC4zOSBMIDI1NC4xMCAxNzYuMTAgTCAyMzEuNzUgMTg3LjUyIEwgMjExLjc3IDIwMy4yMSBMIDE2MS4zNiAyNjEuMjMgTCAxNDIuMzQgMjgwLjI1IEwgMTIwLjQ2IDI5Ny4zOCBMIDEwNC4yOSAzMDYuNDEgTCA4My4zNiAzMTMuNTUgTCA1OC4xNiAzMTUuOTIgTCAzOS4xMyAzMTMuMDcgTCA1NC44MyAzMjMuMDYgTCA3My4zOCAzMjcuODEgTCA5NS43MyAzMjcuODEgTCAxMTYuNjUgMzIzLjA2IEwgMTQwLjkxIDMxMi4xMiBMIDE1Ni42MCAzMDIuMTMgTCAyMTEuNzcgMjU1LjA1IEwgMjI2LjUxIDI1Mi4yMCBMIDI0Mi4yMSAyNTcuOTAgTCAyNTIuNjcgMjY1Ljk5IEwgMjYxLjcxIDI3Ny44OCBMIDI2NS4wNCAyODcuODYgTCAyNjUuMDQgMjk3Ljg1IEwgMjYxLjIzIDMxMS4xNyBMIDI0My4xNiAzNDMuOTggTCAyNjkuMzIgMzM0Ljk1IEwgMjk5Ljc1IDI5OC44MCBMIDMxMi41OSAyNzUuOTcgTCAzMTYuNDAgMjUxLjI0IEwgMzIyLjExIDI1NC4xMCBMIDMzOC4yOCAyNDUuMDYgTCAzNDkuNjkgMjQxLjczIEwgMzY1Ljg2IDI0NS4wNiBMIDM1Mi41NCAyNzEuMjIgTCAzMzQuMDAgMjgwLjI1IEwgMzI0LjAxIDI5My4xMCBMIDM1MS4xMiAyODcuMzkgTCAzNjcuNzYgMjc1Ljk3IEwgMzkwLjU5IDI1MC43NyBMIDQyMi40NSAxOTUuMTMgTCA0MzUuNzcgMTk1LjEzIEwgNDQ3LjY2IDE5Mi4yNyBMIDQ2NC43OCAxOTMuMjIgTCA0NzAuNDkgMTg3Ljk5IFogTSA0MjkuMTEgMTY1LjE2IEwgNDMyLjkyIDE2My4yNiBMIDQzOC4xNSAxNjMuMjYgTCA0NDMuMzggMTY4LjQ5IEwgNDQwLjUzIDE3MC44NyBMIDQzNS43NyAxNzEuMzUgTCA0MzMuMzkgMTcwLjM5IFoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNIDEwNy4xNCAzNDguMjYgTCAxMTAuOTUgMzU2LjM1IEwgMTI1LjIxIDM3NS44NSBMIDE0MS4zOCAzOTIuNDkgTCAxNTYuMTMgNDA0LjM4IEwgMTcxLjgyIDM5Mi40OSBMIDE1My43NSAzNzguNzAgTCAxNDAuNDMgMzY1LjM4IEwgMTMyLjgyIDM1Ni4zNSBMIDEyMy4zMSAzNDIuNTYgWiBNIDM2MC42MyAxMDEuOTEgTCAzMzguMjggODkuMDcgTCAzMTYuODcgODAuOTkgTCAyODguODIgNzQuODAgTCAyNjUuOTkgNzMuMzggTCAyMzkuMzUgNzUuMjggTCAyMTEuMzAgODEuNDYgTCAxODguNDcgOTAuMDIgTCAxNjAuNDEgMTA1LjcyIEwgMTM5LjAxIDEyMi44NCBMIDEyMy4zMSAxMzkuNDggTCAxMDcuNjIgMTYxLjM2IEwgOTQuNzggMTg2LjA5IEwgODYuMjIgMjEwLjgyIEwgODAuOTkgMjM5LjgzIEwgODAuMDMgMjYxLjcxIEwgODIuODkgMjg4LjgyIEwgOTguNTggMjgxLjY4IEwgOTcuMTUgMjQ5LjgyIEwgOTkuMDYgMjMyLjcwIEwgMTA1LjcyIDIwNi41NCBMIDExNS4yMyAxODQuNjYgTCAxMjguMDcgMTYzLjc0IEwgMTM3LjU4IDE1MS44NSBMIDE1My43NSAxMzUuNjggTCAxNjguNDkgMTI0LjI2IEwgMTk1LjYwIDEwOS4wNCBMIDIxNi4wNSAxMDEuNDQgTCAyNDIuMjEgOTUuNzMgTCAyNzAuMjcgOTQuMzAgTCAyOTcuODUgOTcuNjMgTCAzMjEuNjMgMTA0Ljc2IEwgMzQ2Ljg0IDExNy42MSBMIDM2NC45MSAxMzEuODcgWiIgZmlsbD0iIzA3MUEyQyIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=";

const KANGAROO_HERO_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZD0iTSA0MzEuNDkgMjQ2LjAxIEwgNDIyLjQ1IDI2OS43OSBMIDQxMi40NyAyODYuOTEgTCA0MDMuNDMgMjk3Ljg1IEwgMzg2Ljc5IDMxMi41OSBMIDM3My45NCAzMjAuNjggTCAzNTYuMzUgMzI5LjI0IEwgMjc3Ljg4IDM1Ni4zNSBMIDIyOS4zNyAzNzguMjMgTCAyMDYuNTQgMzkxLjU0IEwgMTg0LjY2IDQwNi43NiBMIDE2Mi43OSA0MjUuMzEgTCAxNTAuOTAgNDM4LjE1IEwgMjU5LjgwIDQzOC4xNSBMIDI3OC4zNSA0MzYuNzIgTCAyOTguMzMgNDMyLjQ0IEwgMzA5Ljc0IDQyOC42NCBMIDMyNy4zNCA0MjAuNTUgTCAzNDMuMDMgNDExLjA0IEwgMzYwLjYzIDM5Ny4yNSBMIDM4MS4wOCAzNzYuODAgTCAzOTQuODcgMzU5LjY4IEwgNDExLjA0IDMzMy41MiBMIDQyMi45MyAzMDUuOTQgTCA0MjguNjQgMjg1LjQ5IEwgNDMxLjk3IDI2My4xMyBaIE0gMjc4LjgzIDQwNC4zOCBMIDI1NC41NyA0MjEuNTAgTCAyMzkuODMgNDMzLjg3IEwgMjE5Ljg2IDQyNi43MyBMIDIyMS4yOCA0MjQuMzYgTCAyMzYuOTggNDEyLjk0IEwgMjYzLjEzIDM5Ny4yNSBaIE0gMzMzLjA0IDM3My40NyBMIDMzMi41NyAzNzQuOTAgTCAyOTcuMzggMzk0Ljg3IEwgMjk1LjQ3IDM5NC44NyBMIDI4Mi4xNiAzODcuNzQgTCAyODMuMTEgMzg2LjMxIEwgMzIyLjU4IDM2Ny4yOSBMIDMyNC45NiAzNjcuNzYgWiBNIDM3Ny43NSAzNDUuODkgTCAzNjYuMzQgMzU1LjQwIEwgMzUwLjE3IDM2Ni4zNCBMIDMzOS4yMyAzNTkuNjggTCAzNjkuNjYgMzQxLjEzIFogTSA0MDMuNDMgMzE5LjI1IEwgMzk3LjcyIDMyNy4zNCBMIDM4OS4xNiAzMzYuMzcgTCAzODEuNTUgMzMyLjA5IEwgMzk3LjcyIDMxNS45MiBaIE0gNDEwLjU2IDMwMC43MCBMIDQxMy40MiAzMDIuMTMgTCA0MTMuODkgMzA0LjAzIEwgNDA3LjcxIDMxMi41OSBMIDQwMi45NiAzMDkuMjcgTCA0MDguMTkgMzAyLjEzIFogTSA0MjcuNjkgMjY1LjA0IEwgNDI4LjY0IDI2Ni45NCBMIDQyNC4zNiAyODEuNjggTCA0MTYuMjcgMjk4LjgwIEwgNDE0Ljg1IDI5OC44MCBMIDQxMS45OSAyOTYuNDIgTCA0MTkuMTMgMjgzLjU4IEwgNDI1Ljc4IDI2Ni40NiBaIE0gNDcyLjM5IDE4MS4zMyBMIDQ0My44NiAxNTUuNjUgTCA0MzEuMDEgMTUxLjg1IEwgNDIwLjA4IDE1MS44NSBMIDQxMi45NCAxMzguNTMgTCA0MDQuMzggMTI5LjQ5IEwgMzgzLjkzIDExNy42MSBMIDM4Ny43NCAxNDEuMzggTCA0MDIuNDggMTYxLjgzIEwgMzkxLjA3IDE3OS45MSBMIDM4Mi4wMyAxODcuOTkgTCAzNzIuMDQgMTkwLjg1IEwgMzYyLjUzIDE4OS44OSBMIDMyNi44NiAxNzQuNjggTCAzMDQuNTEgMTY5LjkyIEwgMjc3LjQwIDE3MC4zOSBMIDI1NC4xMCAxNzYuMTAgTCAyMzEuNzUgMTg3LjUyIEwgMjExLjc3IDIwMy4yMSBMIDE2MS4zNiAyNjEuMjMgTCAxNDIuMzQgMjgwLjI1IEwgMTIwLjQ2IDI5Ny4zOCBMIDEwNC4yOSAzMDYuNDEgTCA4My4zNiAzMTMuNTUgTCA1OC4xNiAzMTUuOTIgTCAzOS4xMyAzMTMuMDcgTCA1NC44MyAzMjMuMDYgTCA3My4zOCAzMjcuODEgTCA5NS43MyAzMjcuODEgTCAxMTYuNjUgMzIzLjA2IEwgMTQwLjkxIDMxMi4xMiBMIDE1Ni42MCAzMDIuMTMgTCAyMTEuNzcgMjU1LjA1IEwgMjI2LjUxIDI1Mi4yMCBMIDI0Mi4yMSAyNTcuOTAgTCAyNTIuNjcgMjY1Ljk5IEwgMjYxLjcxIDI3Ny44OCBMIDI2NS4wNCAyODcuODYgTCAyNjUuMDQgMjk3Ljg1IEwgMjYxLjIzIDMxMS4xNyBMIDI0My4xNiAzNDMuOTggTCAyNjkuMzIgMzM0Ljk1IEwgMjk5Ljc1IDI5OC44MCBMIDMxMi41OSAyNzUuOTcgTCAzMTYuNDAgMjUxLjI0IEwgMzIyLjExIDI1NC4xMCBMIDMzOC4yOCAyNDUuMDYgTCAzNDkuNjkgMjQxLjczIEwgMzY1Ljg2IDI0NS4wNiBMIDM1Mi41NCAyNzEuMjIgTCAzMzQuMDAgMjgwLjI1IEwgMzI0LjAxIDI5My4xMCBMIDM1MS4xMiAyODcuMzkgTCAzNjcuNzYgMjc1Ljk3IEwgMzkwLjU5IDI1MC43NyBMIDQyMi40NSAxOTUuMTMgTCA0MzUuNzcgMTk1LjEzIEwgNDQ3LjY2IDE5Mi4yNyBMIDQ2NC43OCAxOTMuMjIgTCA0NzAuNDkgMTg3Ljk5IFogTSA0MjkuMTEgMTY1LjE2IEwgNDMyLjkyIDE2My4yNiBMIDQzOC4xNSAxNjMuMjYgTCA0NDMuMzggMTY4LjQ5IEwgNDQwLjUzIDE3MC44NyBMIDQzNS43NyAxNzEuMzUgTCA0MzMuMzkgMTcwLjM5IFoiIGZpbGw9IiMwNzFBMkMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNIDEwNy4xNCAzNDguMjYgTCAxMTAuOTUgMzU2LjM1IEwgMTI1LjIxIDM3NS44NSBMIDE0MS4zOCAzOTIuNDkgTCAxNTYuMTMgNDA0LjM4IEwgMTcxLjgyIDM5Mi40OSBMIDE1My43NSAzNzguNzAgTCAxNDAuNDMgMzY1LjM4IEwgMTMyLjgyIDM1Ni4zNSBMIDEyMy4zMSAzNDIuNTYgWiBNIDM2MC42MyAxMDEuOTEgTCAzMzguMjggODkuMDcgTCAzMTYuODcgODAuOTkgTCAyODguODIgNzQuODAgTCAyNjUuOTkgNzMuMzggTCAyMzkuMzUgNzUuMjggTCAyMTEuMzAgODEuNDYgTCAxODguNDcgOTAuMDIgTCAxNjAuNDEgMTA1LjcyIEwgMTM5LjAxIDEyMi44NCBMIDEyMy4zMSAxMzkuNDggTCAxMDcuNjIgMTYxLjM2IEwgOTQuNzggMTg2LjA5IEwgODYuMjIgMjEwLjgyIEwgODAuOTkgMjM5LjgzIEwgODAuMDMgMjYxLjcxIEwgODIuODkgMjg4LjgyIEwgOTguNTggMjgxLjY4IEwgOTcuMTUgMjQ5LjgyIEwgOTkuMDYgMjMyLjcwIEwgMTA1LjcyIDIwNi41NCBMIDExNS4yMyAxODQuNjYgTCAxMjguMDcgMTYzLjc0IEwgMTM3LjU4IDE1MS44NSBMIDE1My43NSAxMzUuNjggTCAxNjguNDkgMTI0LjI2IEwgMTk1LjYwIDEwOS4wNCBMIDIxNi4wNSAxMDEuNDQgTCAyNDIuMjEgOTUuNzMgTCAyNzAuMjcgOTQuMzAgTCAyOTcuODUgOTcuNjMgTCAzMjEuNjMgMTA0Ljc2IEwgMzQ2Ljg0IDExNy42MSBMIDM2NC45MSAxMzEuODcgWiIgZmlsbD0iIzZCQkYzRCIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=";

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
        headers: {
          // Old-Firefox UA forces the API to return legacy TTF links instead of WOFF2, which Satori requires.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0"
        }
      })
    ).text();
    const match = css.match(/src: url\(([^)]+)\)/);
    if (!match) return null;
    const fontResponse = await fetch(match[1]);
    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const [soraExtraBold, soraBold, nunitoSemiBold, nunitoBold] = await Promise.all([
    loadGoogleFont("Sora", 800),
    loadGoogleFont("Sora", 700),
    loadGoogleFont("Nunito", 600),
    loadGoogleFont("Nunito", 700)
  ]);

  const fonts = [
    soraExtraBold && {
      name: "Sora",
      data: soraExtraBold,
      weight: 800 as const,
      style: "normal" as const
    },
    soraBold && { name: "Sora", data: soraBold, weight: 700 as const, style: "normal" as const },
    nunitoSemiBold && {
      name: "Nunito",
      data: nunitoSemiBold,
      weight: 600 as const,
      style: "normal" as const
    },
    nunitoBold && {
      name: "Nunito",
      data: nunitoBold,
      weight: 700 as const,
      style: "normal" as const
    }
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const headingFont = fonts.some((f) => f.name === "Sora") ? "Sora" : "Arial";
  const bodyFont = fonts.some((f) => f.name === "Nunito") ? "Nunito" : "Arial";

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #FFFBF2 0%, #FFEEDA 45%, #FFDDB3 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        fontFamily: bodyFont
      }}
    >
      {/* Warm glow behind the kangaroo, built from stacked flat-opacity circles (no radial-gradient) */}
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: 700,
          top: -30,
          borderRadius: 310,
          background: "#6BBF3D",
          opacity: 0.1,
          display: "flex"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          left: 800,
          top: 70,
          borderRadius: 210,
          background: "#52B788",
          opacity: 0.18,
          display: "flex"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          left: 880,
          top: 150,
          borderRadius: 125,
          background: "#52B788",
          opacity: 0.28,
          display: "flex"
        }}
      />

      {/* Motion-dash trail behind the kangaroo's leap */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 14,
          left: 700,
          top: 470,
          borderRadius: 999,
          background: "#6BBF3D",
          opacity: 0.5,
          transform: "rotate(-18deg)",
          display: "flex"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 108,
          height: 14,
          left: 660,
          top: 500,
          borderRadius: 999,
          background: "#6BBF3D",
          opacity: 0.35,
          transform: "rotate(-18deg)",
          display: "flex"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 82,
          height: 14,
          left: 630,
          top: 528,
          borderRadius: 999,
          background: "#6BBF3D",
          opacity: 0.2,
          transform: "rotate(-18deg)",
          display: "flex"
        }}
      />

      {/* Hero kangaroo, mid-leap, full opacity — the emotional payoff of the card */}
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 95,
          display: "flex",
          transform: "rotate(-4deg)"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={KANGAROO_HERO_DATA_URI} width={430} height={430} alt="" />
      </div>

      {/* Content column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "64px 0 64px 90px",
          maxWidth: 660
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={KANGAROO_BADGE_DATA_URI} width={48} height={48} alt="" />
          <span
            style={{ fontFamily: headingFont, fontSize: 26, fontWeight: 700, color: "#071A2C" }}
          >
            KangaLearner
          </span>
        </div>

        {/* Kicker */}
        <span
          style={{
            marginTop: 56,
            fontFamily: headingFont,
            fontSize: 32,
            fontWeight: 700,
            color: "rgba(7,26,44,0.72)"
          }}
        >
          Worried about the test?
        </span>

        {/* Hero line */}
        <span
          style={{
            marginTop: 10,
            fontFamily: headingFont,
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#071A2C"
          }}
        >
          {"You've got this."}
        </span>

        {/* Subheadline */}
        <span
          style={{
            marginTop: 22,
            fontFamily: bodyFont,
            fontSize: 27,
            fontWeight: 600,
            lineHeight: 1.4,
            color: "rgba(7,26,44,0.58)",
            maxWidth: 560
          }}
        >
          Free practice in English, Português and Español.
        </span>

        {/* Trust seal */}
        <div
          style={{
            marginTop: 38,
            width: 130,
            height: 130,
            borderRadius: 65,
            background: "#2E8F5C",
            boxShadow: "0 10px 24px rgba(7,26,44,0.25)",
            transform: "rotate(-7deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span
            style={{ fontFamily: headingFont, fontSize: 30, fontWeight: 800, color: "#ffffff" }}
          >
            100%
          </span>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#ffffff"
            }}
          >
            FREE
          </span>
        </div>
      </div>
    </div>,
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
