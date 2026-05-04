// src/lib/supabase/middleware.ts
// Supabase client for Next.js middleware — with role-based route protection

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing required environment variables:\n' +
    '- NEXT_PUBLIC_SUPABASE_URL\n' +
    '- NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    'Please add them to your .env.local file'
  );
}

// ── Role-to-route authorization ──────────────────────────────────────────────

/** Which route prefixes each role is authorized to access. Values are UPPERCASE to match DB enum. */
const ROLE_ROUTE_MAP: Record<string, string[]> = {
  ADMIN: ['/admin', '/api/admin'],
  DOCTOR: ['/admin', '/api/admin', '/doctor'],
  RECEPTIONIST: ['/admin', '/api/admin', '/receptionist'],
  PATIENT: ['/patient'],
};

/** Routes that require authentication but are accessible to any role. */
const AUTH_ONLY_PREFIXES = ['/booking'];

/** Where to redirect a user when their role cannot access the requested route. */
const ROLE_DEFAULT_PATH: Record<string, string> = {
  ADMIN: '/admin',
  DOCTOR: '/admin',
  RECEPTIONIST: '/admin',
  PATIENT: '/',
};

/** All route prefixes that trigger an auth check (deduplicated). */
const ALL_PROTECTED_PREFIXES = [
  ...new Set([
    ...Object.values(ROLE_ROUTE_MAP).flat(),
    ...AUTH_ONLY_PREFIXES,
  ]),
];

function isProtectedRoute(pathname: string): boolean {
  return ALL_PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function getAllowedPrefixes(role: string): string[] {
  return ROLE_ROUTE_MAP[role] ?? [];
}

function canAccessRoute(role: string | null, pathname: string): boolean {
  // Auth-only routes: any authenticated user can access regardless of role
  if (AUTH_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  // Role-protected routes require a valid role with matching prefix
  if (!role) return false;
  return getAllowedPrefixes(role).some((prefix) => pathname.startsWith(prefix));
}

function getDefaultRedirect(role: string): string {
  return ROLE_DEFAULT_PATH[role] ?? '/';
}

// ── Main middleware export ───────────────────────────────────────────────────

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Short-circuit: public routes pass through untouched
  if (!isProtectedRoute(pathname)) {
    return { supabaseResponse, user };
  }

  // Unauthenticated users on any protected route → redirect to /login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Query the app_user table for the user's role (DB source of truth)
  let role: string | null = null;
  try {
    const { data: appUser } = await supabase
      .from('app_user')
      .select('role')
      .eq('id', user.id)
      .single();
    role = (appUser as { role: string } | null)?.role ?? null;
  } catch {
    // Fall back to user metadata if the DB query fails
    role = (user.app_metadata?.role as string) ?? null;
  }

  // Check role-based access and redirect if unauthorized
  if (!canAccessRoute(role, pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = role ? getDefaultRedirect(role) : '/';
    return NextResponse.redirect(url);
  }

  return { supabaseResponse, user };
}
