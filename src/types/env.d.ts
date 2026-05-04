declare namespace NodeJS {
  interface ProcessEnv {
    // ── Supabase ─────────────────────────────────────────────────
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;

    // ── Stripe ───────────────────────────────────────────────────
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;

    // ── Redis / BullMQ ──────────────────────────────────────────
    REDIS_URL?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_PASSWORD?: string;

    // ── Database Connection Pool (PM2 / direct DB connections) ──
    DATABASE_URL?: string;
    DB_POOL_MAX?: string;
    DB_POOL_IDLE_TIMEOUT?: string;
    DB_POOL_CONNECTION_TIMEOUT?: string;
  }
}
