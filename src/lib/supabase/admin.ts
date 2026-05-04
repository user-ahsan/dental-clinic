// src/lib/supabase/admin.ts
// Server-only Supabase client with service_role key for privileged operations.
// NEVER import this file in client components or `"use client"` files.
// Usage: import { createAdminClient } from '@/lib/supabase/admin';
//
// WARNING: This client bypasses RLS entirely. Only use in:
// - Webhook handlers (Stripe, n8n)
// - Background jobs
// - Admin API routes
// - Server-side data migration scripts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getEnv } from '@/lib/env';

/**
 * Creates a Supabase client with service_role privileges.
 * This client bypasses Row Level Security - treat it as admin-only.
 *
 * IMPORTANT: Do NOT cache or export a singleton. Create a new client
 * for each operation to ensure fresh token state for long-running processes.
 *
 * @returns Supabase client with service_role key
 */
export function createAdminClient(): ReturnType<typeof createClient<Database>> {
  const env = getEnv();
  const url = env.supabase.url;
  const serviceRoleKey = env.supabaseServiceKey;

  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY. ' +
      'This key is required for server-admin operations. ' +
      'Add it to your .env.local file (NEVER prefix with NEXT_PUBLIC_).'
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'x-client-info': 'dental-clinic-admin',
      },
    },
  });
}
