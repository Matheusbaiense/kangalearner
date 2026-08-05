import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Rotas que exigem sessão válida. */
const PROTECTED_ROUTES = ["/progress", "/dashboard", "/account", "/admin"];

/** Gera nonce base64 de 16 bytes aleatórios (Web Crypto — funciona em Edge e Node). */
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...Array.from(bytes)));
}

/** Monta o CSP com o nonce fornecido. Estrito em produção; relaxado em dev. */
function buildCsp(nonce: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  let supabaseHost = "";
  try {
    if (supabaseUrl) supabaseHost = new URL(supabaseUrl).hostname;
  } catch {
    /* ignore */
  }
  const supabaseWss = supabaseHost ? `wss://${supabaseHost}` : "wss://*.supabase.co";
  const supabaseImgSrc = supabaseHost ? `https://${supabaseHost}` : "";

  // Next.js dev mode (React Fast Refresh + eval source maps) needs 'unsafe-eval',
  // and HMR opens a localhost websocket that must be allowed in connect-src. Also
  // skip upgrade-insecure-requests so ws://localhost isn't forced to wss. None of
  // this applies to the production bundle, which stays strict + nonce-only.
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = isDev
    ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://js.stripe.com`
    : `script-src 'self' 'nonce-${nonce}' https://js.stripe.com`;
  const connectSrc = [
    "connect-src 'self'",
    supabaseUrl,
    "https://api.stripe.com",
    supabaseWss,
    isDev ? "ws://localhost:* http://localhost:*" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    scriptSrc,
    connectSrc,
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
    // Sentry Session Replay runs its compression worker from a blob: URL.
    "worker-src 'self' blob:",
    "frame-src https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"])
  ].join("; ");
}

/**
 * Rotas de entrada — utilizadores já autenticados são enviados para a home.
 * Inclui `/login` e `/signup` legados e `/auth/*` (INFRA-8).
 */
const AUTH_ROUTES = ["/login", "/signup", "/auth/login", "/auth/signup"];

/** Origins permitidas para CORS. Defaults to localhost in dev. */
function getAllowedOrigins(): string[] {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const origins = ["http://localhost:3000", "http://localhost:3001"];
  if (appUrl && !origins.includes(appUrl)) origins.push(appUrl);
  return origins;
}

function addCorsHeaders(response: NextResponse, origin: string): void {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Vary", "Origin");
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // --- CORS for API routes ---
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin") ?? "";
    const allowed = getAllowedOrigins();
    const matchedOrigin = allowed.find((o) => o === origin);

    // Preflight — respond immediately without Supabase call
    if (request.method === "OPTIONS") {
      const pre = new NextResponse(null, { status: 204 });
      if (matchedOrigin) addCorsHeaders(pre, matchedOrigin);
      pre.headers.set("Access-Control-Max-Age", "86400");
      return pre;
    }

    // Non-API requests fall through to the normal flow below
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      const r = NextResponse.next({ request });
      if (matchedOrigin) addCorsHeaders(r, matchedOrigin);
      return r;
    }

    let apiResponse = NextResponse.next({ request });
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          apiResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            apiResponse.cookies.set(name, value, options)
          );
        }
      }
    });

    if (pathname.startsWith("/api/admin/")) {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        const err = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        if (matchedOrigin) addCorsHeaders(err, matchedOrigin);
        return err;
      }
    }

    if (matchedOrigin) addCorsHeaders(apiResponse, matchedOrigin);
    return apiResponse;
  }

  // --- Standard auth middleware for page routes ---

  // Per-request nonce — forwarded to server components via x-nonce request header.
  // The CSP must also be set on the REQUEST headers so Next.js reads the nonce and
  // stamps it onto its own inline hydration scripts (self.__next_f.push). Setting it
  // only on the response leaves those scripts unnonce'd → blocked by the CSP →
  // hydration never runs → the whole app becomes non-interactive (clicks do nothing).
  const nonce = generateNonce();
  const csp = buildCsp(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const fallback = NextResponse.next({ request: { headers: requestHeaders } });
    fallback.headers.set("Content-Security-Policy", csp);
    return fallback;
  }

  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const search = request.nextUrl.search;

  // Note: /api/* (including /api/admin/*) is fully handled by the CORS branch
  // above and never reaches here. Admin authorization is enforced per-handler
  // via assertAdminRole(), not in middleware.

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Attach the same nonce-based CSP to the final page response (browser enforcement)
  supabaseResponse.headers.set("Content-Security-Policy", csp);
  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/webhook|api/webhooks).*)"]
};
