import { NextResponse } from 'next/server'

/**
 * GET /api/health
 * Health check endpoint with database connectivity verification.
 * Used by Docker HEALTHCHECK (30s interval) and external monitoring.
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Lightweight database connectivity check (with timeout)
  let database: 'ok' | 'unreachable' | 'skipped' = 'skipped'
  let dbLatency: number | null = null

  if (supabaseUrl && supabaseKey) {
    const start = Date.now()
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)

      const res = await fetch(
        `${supabaseUrl}/rest/v1/`,
        {
          method: 'HEAD',
          headers: { apikey: supabaseKey },
          signal: controller.signal,
        }
      )
      clearTimeout(timeout)

      database = res.ok ? 'ok' : 'unreachable'
      dbLatency = Date.now() - start
    } catch {
      database = 'unreachable'
      dbLatency = null
    }
  }

  const healthy = database !== 'unreachable'

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: {
        database,
        dbLatencyMs: dbLatency,
      },
    },
    {
      status: healthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  )
}
