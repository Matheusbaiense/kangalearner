import { withSentryConfig } from "@sentry/nextjs";
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
    remotePatterns: imageRemotePatterns,
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    // Canonical auth paths live under /auth/* (INFRA-8). These replace the
    // legacy one-line redirect pages under app/{login,signup,...}/page.tsx.
    return [
      { source: "/login", destination: "/auth/login", permanent: true },
      { source: "/signup", destination: "/auth/signup", permanent: true },
      { source: "/forgot-password", destination: "/auth/forgot-password", permanent: true },
      { source: "/reset-password", destination: "/auth/reset-password", permanent: true }
    ];
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

const hasSentryUploadConfig = Boolean(
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
);

// Applied unconditionally so tunnelRoute (the CSP bypass for browser events)
// works with a DSN-only setup; source-map upload only activates when the
// auth-token env vars are present.
export default withSentryConfig(nextConfig, {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: { disable: !hasSentryUploadConfig },
  // Proxy browser events through /monitoring so connect-src 'self' covers
  // them — without this the CSP blocks every client-side Sentry event.
  tunnelRoute: "/monitoring"
});
