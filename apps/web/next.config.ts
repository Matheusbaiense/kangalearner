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
const supabaseImgSrc = supabaseHost ? `https://${supabaseHost}` : "";
const supabaseWss = supabaseHost ? `wss://${supabaseHost}` : "wss://*.supabase.co";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  `connect-src 'self' ${supabaseUrl} https://api.stripe.com ${supabaseWss}`.trim(),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  [
    "img-src 'self' data: blob:",
    supabaseImgSrc,
    "https://lh3.googleusercontent.com",
    "https://avatars.githubusercontent.com",
    "https://flagcdn.com",
    "https://www.google.com"
  ]
    .filter(Boolean)
    .join(" "),
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join("; ");

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
              ]),
          {
            key: "Content-Security-Policy",
            value: isDev
              ? "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'"
              : csp
          }
        ]
      }
    ];
  }
};

export default nextConfig;
