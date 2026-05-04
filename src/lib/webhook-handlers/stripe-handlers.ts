import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import type { WebhookHandler } from '@/lib/queue/webhook-queue';

// ── Lazy Stripe client (API calls, not signature verification) ───────────────
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is required');
  _stripe = new Stripe(key);
  return _stripe;
}

// ── Handlers ─────────────────────────────────────────────────────────────────

export const handleInvoicePaid: WebhookHandler = async (payload) => {
  const invoice = payload as Stripe.Invoice;
  const supabase = createAdminClient();

  await supabase
    .from('invoice')
    // @ts-expect-error — Supabase typed client resolves .update() to never (version mismatch)
    .update({
      status: 'PAID',
      paid_at: new Date().toISOString(),
    })
    .eq('stripe_invoice_id', invoice.id);
};

export const handlePaymentFailed: WebhookHandler = async (payload) => {
  const invoice = payload as Stripe.Invoice;
  const supabase = createAdminClient();

  await supabase
    .from('invoice')
    // @ts-expect-error — Supabase typed client resolves .update() to never (version mismatch)
    .update({
      status: 'FAILED',
    })
    .eq('stripe_invoice_id', invoice.id);
};

export const handleSubscriptionDeleted: WebhookHandler = async (payload) => {
  const subscription = payload as Stripe.Subscription;
  const supabase = createAdminClient();

  await supabase
    .from('invoice')
    // @ts-expect-error — Supabase typed client resolves .update() to never (version mismatch)
    .update({
      status: 'CANCELLED',
    })
    .eq('stripe_subscription_id', subscription.id);
};

// ── Handler registry ─────────────────────────────────────────────────────────
export const handlers: Record<string, WebhookHandler> = {
  'invoice.paid': handleInvoicePaid,
  'invoice.payment_failed': handlePaymentFailed,
  'customer.subscription.deleted': handleSubscriptionDeleted,
};
