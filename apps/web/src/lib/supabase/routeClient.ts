import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";
import { requireSupabaseEnv } from "./env";

/** Cookie-backed Supabase client for Route Handlers (session refresh on write). */
export function createRouteHandlerClient(request: NextRequest) {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieResponse = NextResponse.next();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieResponse.cookies.set(name, value, options)
        );
      }
    }
  });

  return { supabase, cookieResponse };
}
