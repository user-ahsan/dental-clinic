// src/lib/supabase/client.ts
// Browser-side Supabase client with connection pooling

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';
import { requireEnv } from '@/lib/env';

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

/**
 * Browser client singleton to prevent connection pool exhaustion.
 * Creates a single shared instance across the application lifecycle.
 */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const createClient = (): ReturnType<typeof createBrowserClient<Database>> => {
  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-client-info': 'dental-clinic-web',
      },
    },
  });

  return browserClient;
};
