import { NextRequest, NextResponse } from 'next/server';
import { webhookQueue } from '@/lib/queue/webhook-queue';
import { getEnv } from '@/lib/env';
import Stripe from 'stripe';
import { headers } from 'next/headers';

// ── App Router uses standard Web API Request — body is always available raw ──

// ── Constants ────────────────────────────────────────────────────────────────
const MAX_BODY_SIZE = 1_048_576; // 1 MB — reject oversized webhook payloads

// ── Credential access via centralised env manager ────────────────────────────
function getStripeClient(): Stripe {
  const { secretKey } = getEnv().stripe;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    timeout: 5_000, // Signature verification should be fast
    maxNetworkRetries: 1,
  });
}

function getWebhookSecret(): string {
  const { webhookSecret } = getEnv().stripe;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }
  return webhookSecret;
}

// ── Signature verification ───────────────────────────────────────────────────
function verifyAndParseEvent(payload: string, signature: string): Stripe.Event {
  const stripe = getStripeClient();
  const webhookSecret = getWebhookSecret();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── 1. Read raw body & headers in parallel ────────────────────────────
  const [payload, headersList] = await Promise.all([
    req.text(),
    headers(),
  ]);

  // ── 2. Reject oversized payloads early ────────────────────────────────
  if (Buffer.byteLength(payload, 'utf-8') > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: 'Payload too large' },
      { status: 413 }
    );
  }

  const signature = headersList.get('stripe-signature');
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  // ── 3. Verify signature — returns the validated event ─────────────────
  let event: Stripe.Event;
  try {
    event = verifyAndParseEvent(payload, signature);
  } catch {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    );
  }

  // ── 4. Acknowledge immediately — the queue handles async processing ────
  try {
    await webhookQueue.add('webhook', {
      payload: event.data.object,
      receivedAt: Date.now(),
      retryCount: 0,
      webhookType: event.type,
    });
  } catch (queueError) {
    // Queue is down — still return 200 so Stripe doesn't think the endpoint is dead.
    // The event can be replayed from Stripe dashboard.
    console.error('[stripe-webhook] Failed to enqueue event:', queueError);
  }

  // Always return 200 immediately — processing happens in the worker
  return NextResponse.json({ received: true }, { status: 200 });
}
