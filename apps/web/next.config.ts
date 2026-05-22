import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Content-Security-Policy for production.
// NOTE: 'unsafe-inline' for scripts is required by Next.js App Router (inline hydration scripts).
// A nonce-based approach can replace this in a future hardening sprint.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  `connect-src 'self' ${supabaseUrl} https://api.stripe.com wss://*.supabase.co`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: " +
    "https://olgogtaeifyxwzencilo.supabase.co " +
    "https://lh3.googleusercontent.com " +
    "https://avatars.githubusercontent.com " +
    "https://flagcdn.com " +
    "https://www.google.com",
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: require("node:path").join(__dirname, "../../"),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "olgogtaeifyxwzencilo.supabase.co" },
    ],
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
          // HSTS: only in production — dev uses HTTP
          ...(isDev ? [] : [
            { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          ]),
          { key: "Content-Security-Policy", value: isDev ? "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'" : csp },
        ],
      },
    ];
  },
};

export default nextConfig;
