import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

function supabaseHostname(): string {
  if (!supabaseUrl) return "";
  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return "";
  }
}

const supabaseHost = supabaseHostname();
// Note: CSP is set per-request in middleware.ts with a nonce — not here.

const imageRemotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "https", hostname: "flagcdn.com" },
  { protocol: "https", hostname: "lh3.googleusercontent.com" },
  { protocol: "https", hostname: "avatars.githubusercontent.com" }
];

if (supabaseHost) {
  imageRemotePatterns.push({ protocol: "https", hostname: supabaseHost });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: require("node:path").join(__dirname, "../../"),
  images: {
    remotePatterns: imageRemotePatterns
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload"
                }
              ])
        ]
      }
    ];
  }
};

export default nextConfig;
