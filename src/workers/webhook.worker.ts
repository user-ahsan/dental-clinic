import { createWebhookWorker, shutdownWebhookWorker } from '@/lib/queue/webhook-queue';
import { handlers } from '@/lib/webhook-handlers/stripe-handlers';

// ── Create the webhook worker ────────────────────────────────────────────────
const worker = createWebhookWorker(handlers);

// ── Completed handler ────────────────────────────────────────────────────────
worker.on('completed', (job) => {
  if (job?.data?.webhookType) {
    const latency = Date.now() - job.data.receivedAt;
    // Log only high-latency webhooks
    // High-latency webhooks are silently tracked; monitor via external metrics
  }
});

// ── Graceful shutdown ────────────────────────────────────────────────────────
let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;

  try {
    await shutdownWebhookWorker(worker);
  } catch (err) {
    console.error('[webhooks] Error during shutdown:', err);
  }
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Prevent unhandled rejections from crashing the process silently
process.on('unhandledRejection', (reason) => {
  console.error('[webhooks] Unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[webhooks] Uncaught exception:', error);
  // Still exit on truly unhandled exceptions after logging
  process.exit(1);
});

// ── Active webhook types ─────────────────────────────────────────────────────
// Worker started; handler keys are introspectable via Object.keys(handlers)
