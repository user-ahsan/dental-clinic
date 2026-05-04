// src/lib/supabase/server.ts
// Server-side Supabase client for Next.js App Router with connection pooling

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import { requireEnv } from '@/lib/env';

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

/**
 * Creates a server-side Supabase client with pooling configuration.
 * Note: Server clients should NOT be cached/shared as they depend on
 * per-request cookie store. Each request gets its own instance but
 * connection settings are reused.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          console.error('Failed to set cookies in Server Component:', error);
        }
      },
    },
  });
}
