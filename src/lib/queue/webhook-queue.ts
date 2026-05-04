import { Queue, Worker, QueueEvents, Job, UnrecoverableError } from 'bullmq';
import { getRedisConnection, moveToDeadLetterQueue } from './index';

// ── Job interface ────────────────────────────────────────────────────────────
export interface WebhookJob {
  payload: unknown;
  receivedAt: number;
  retryCount: number;
  webhookType: string;
}

// ── External API call timeout (ms) ───────────────────────────────────────────
const HANDLER_TIMEOUT_MS = 30_000; // 30 seconds max for any handler

// ── Handler type ─────────────────────────────────────────────────────────────
export type WebhookHandler = (payload: unknown) => Promise<void>;

// ── Lazy singletons (only connect when first used) ───────────────────────────
let _redis: ReturnType<typeof getRedisConnection> | null = null;
let _webhookQueue: Queue<WebhookJob> | null = null;
let _queueEvents: QueueEvents | null = null;
let _eventsBound = false;

function getRedis() {
  if (!_redis) _redis = getRedisConnection();
  return _redis;
}

function getWebhookQueue(): Queue<WebhookJob> {
  if (!_webhookQueue) {
    _webhookQueue = new Queue<WebhookJob>('webhooks', {
      connection: getRedis(),
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 1_000 },
        removeOnComplete: { count: 1_000 },
        removeOnFail: false,
      },
    });
  }
  return _webhookQueue;
}

function getQueueEvents(): QueueEvents {
  if (!_queueEvents) {
    _queueEvents = new QueueEvents('webhooks', { connection: getRedis() });
  }
  return _queueEvents;
}

function bindDLQEvents() {
  if (_eventsBound) return;
  _eventsBound = true;

  const events = getQueueEvents();
  const queue = getWebhookQueue();

  events.on('retries-exhausted', async ({ jobId, attemptsMade }) => {
    console.error(
      `[webhooks] Job ${jobId} exhausted all ${attemptsMade + 1} attempts — moving to DLQ`
    );
    try {
      const job = await Job.fromId(queue, jobId!);
      if (job) {
        const error = job.failedReason || 'Unknown error (retries exhausted)';
        await moveToDeadLetterQueue('webhooks', job, error);
      }
    } catch (moveError) {
      console.error(`[webhooks] Failed to move job ${jobId} to DLQ:`, moveError);
    }
  });
}

// ── Public API (backward-compatible) ─────────────────────────────────────────

/** Add a job to the webhook queue. Safe to call at any time. */
export async function enqueueWebhook(type: string, payload: unknown) {
  return getWebhookQueue().add(type, {
    payload,
    receivedAt: Date.now(),
    retryCount: 0,
    webhookType: type,
  });
}

/** Lazily get the webhook queue (for workers, etc.) */
export const webhookQueue = {
  get queue() { return getWebhookQueue(); },
  add: (name: string, data: WebhookJob, opts?: any) => getWebhookQueue().add(name, data, opts),
};

// ── Worker factory ───────────────────────────────────────────────────────────
export function createWebhookWorker(
  handlers: Record<string, WebhookHandler>
): Worker<WebhookJob> {
  bindDLQEvents();

  const worker = new Worker<WebhookJob>(
    'webhooks',
    async (job: Job<WebhookJob>) => {
      const { webhookType, payload } = job.data;
      const handler = handlers[webhookType];

      if (!handler) {
        throw new UnrecoverableError(
          `No handler registered for webhook type: ${webhookType}`
        );
      }

      const handlerPromise = handler(payload);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(
            new UnrecoverableError(
              `Webhook handler for '${webhookType}' timed out after ${HANDLER_TIMEOUT_MS}ms`
            )
          );
        }, HANDLER_TIMEOUT_MS);
      });

      await Promise.race([handlerPromise, timeoutPromise]);
    },
    {
      connection: getRedis(),
      concurrency: 5,
      lockDuration: 60_000,
      stalledInterval: 30_000,
      maxStalledCount: 2,
    }
  );

  worker.on('failed', (job, error) => {
    if (!(error instanceof UnrecoverableError)) {
      console.error(
        `[webhooks] Job ${job?.id} attempt ${job?.attemptsMade}/${job?.opts.attempts} failed:`,
        error.message
      );
    }
  });

  worker.on('error', (err) => {
    console.error('[webhooks] Worker-level error:', err);
  });

  return worker;
}

// ── Graceful shutdown helper ─────────────────────────────────────────────────
export async function shutdownWebhookWorker(worker: Worker): Promise<void> {
  if (_queueEvents) await _queueEvents.close();
  await worker.close();
}
