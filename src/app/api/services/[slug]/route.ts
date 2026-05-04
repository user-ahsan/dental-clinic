import { NextResponse } from 'next/server';
import { services } from '@/constants/service';

/**
 * Single service by slug API route.
 * Returns service details with aggressive caching.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return NextResponse.json(
      { error: 'Service not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(service, {
    headers: {
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600, immutable',
    },
  });
}
