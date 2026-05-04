// src/middleware.ts
// Next.js middleware — runs on every matching request.
// Handles Supabase session refresh and protects admin routes.

import { updateSession } from '@/lib/supabase/middleware';
import type { NextRequest } from 'next/server';

/**
 * Config matcher: only run middleware on protected paths.
 * Public pages (/, /services, /faq, etc.) are excluded for performance.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Static image assets (svg, png, jpg, jpeg, gif, webp)
     *
     * All other routes (including public pages and API routes) flow through
     * the middleware so role-based protection and session refresh are applied.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const result = await updateSession(request);

  // If updateSession returns a redirect response, pass it through
  if (result instanceof Response) {
    return result;
  }

  // Otherwise return the supabase response with refreshed cookies
  const { supabaseResponse } = result;
  return supabaseResponse;
}
