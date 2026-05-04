import { NextResponse } from 'next/server';
import { services } from '@/constants/service';

/**
 * Services API route - returns static service data with caching headers.
 * 
 * This data is cached aggressively because services rarely change.
 * Cache-Control headers:
 * - public: response can be cached by CDN and browsers
 * - max-age: 30 minutes (1800 seconds)
 * - stale-while-revalidate: serve stale content while revalidating in background
 * - immutable: content won't change until next deployment
 */
export async function GET() {
  return NextResponse.json(services, {
    headers: {
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600, immutable',
    },
  });
}
