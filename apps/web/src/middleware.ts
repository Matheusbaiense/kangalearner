import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Rotas que exigem sessão válida. */
const PROTECTED_ROUTES = [
  "/progress",
  "/dashboard",
  "/account",
  "/admin",
];

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
    createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          apiResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            apiResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    if (matchedOrigin) addCorsHeaders(apiResponse, matchedOrigin);
    return apiResponse;
  }

  // --- Standard auth middleware for page routes ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
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

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/webhook|api/webhooks).*)"]
};
