// src/lib/env.ts
// Centralised environment variable validation and access.
// All credential access MUST go through this module — never use
// process.env directly for secrets.

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Public-only environment variables. Safe to expose to the client.
 * ONLY exposes variables prefixed with NEXT_PUBLIC_ — nothing else.
 */
export function getPublicEnv() {
  return {
    supabaseUrl: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  } as const;
}

/**
 * Lazy env accessor. Values are validated on first access.
 *
 * WARNING: Never pass the returned object (or any of its properties)
 * to client-side code. Use getPublicEnv() for that.
 */
export function getEnv() {
  return {
    supabase: {
      url: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
      anonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    },
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    redis: {
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
    },
    validateStripe() {
      const sk = process.env.STRIPE_SECRET_KEY;
      const wh = process.env.STRIPE_WEBHOOK_SECRET;
      const issues: string[] = [];
      if (!sk) issues.push('STRIPE_SECRET_KEY');
      if (!wh) issues.push('STRIPE_WEBHOOK_SECRET');
      if (issues.length > 0) {
        console.warn(
          `[env] Missing Stripe credentials: ${issues.join(', ')} — Stripe features will fail`
        );
      }
      return issues.length === 0;
    },
  };
}
