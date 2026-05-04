import { Worker, Job, UnrecoverableError } from 'bullmq'
import { getRedisConnection, moveToDeadLetterQueue, queues } from './index'

export type ProcessorFn<T extends Record<string, unknown> = Record<string, unknown>, R = unknown> = (
  data: T
) => Promise<R> | R

export interface WorkerConfig {
  queueName: string
  processor: ProcessorFn
  concurrency?: number
}

/** Central worker registry — shared across all queue modules */
export const workers: Map<string, Worker> = new Map()

export function createWorker(config: WorkerConfig): Worker {
  const { queueName, processor, concurrency = 5 } = config

  const worker = new Worker(
    queueName,
    async (job: Job) => {
      return await processor(job.data)
    },
    {
      connection: getRedisConnection(),
      concurrency,
    }
  )

  worker.on('completed', (_job) => {
    // Job completion handled by queue monitoring
  })

  worker.on('failed', async (job, error) => {
    if (!job) return

    // Unrecoverable errors should go straight to DLQ — don't retry
    const isUnrecoverable = error instanceof UnrecoverableError
    const isPermanentlyFailed = job.attemptsMade >= (job.opts.attempts || 5)

    if (isUnrecoverable) {
      console.info(
        `[${queueName}] Job ${job.id} marked unrecoverable: ${error.message} — moving to DLQ immediately`
      )
      await moveJobToDLQ(queueName, job, error)
      return
    }

    if (isPermanentlyFailed) {
      console.error(
        `[${queueName}] Job ${job.id} exhausted all retries (${job.attemptsMade}/${job.opts.attempts || 5})`
      )
      await moveJobToDLQ(queueName, job, error)
      return
    }

    console.error(
      `[${queueName}] Job ${job.id} attempt ${job.attemptsMade}/${job.opts.attempts || 5} failed:`,
      error.message
    )
  })

  worker.on('error', (error) => {
    console.error(`[${queueName}] Worker error:`, error)
  })

  workers.set(queueName, worker)
  return worker
}

/**
 * Safe DLQ move — catches errors so a failed move doesn't crash the worker event loop.
 */
async function moveJobToDLQ(queueName: string, job: Job, error: Error): Promise<void> {
  try {
    await moveToDeadLetterQueue(queueName, job, error)
  } catch (moveError) {
    console.error(
      `[${queueName}] CRITICAL: Failed to move job ${job.id} to DLQ — job may be lost:`,
      moveError
    )
  }
}

interface WorkerStats {
  queueName: string
  completed: number
  failed: number
  waiting: number
  active: number
  successRate: string
}

export async function getWorkerStats(queueName: string): Promise<WorkerStats | null> {
  const worker = workers.get(queueName)
  if (!worker) return null

  const queue = queues.find(q => q.name === queueName)
  if (!queue) return null

  const [completedCount, failedCount, waitingCount, activeCount] = await Promise.all([
    queue.getCompletedCount(),
    queue.getFailedCount(),
    queue.getWaitingCount(),
    queue.getActiveCount(),
  ])

  return {
    queueName,
    completed: completedCount,
    failed: failedCount,
    waiting: waitingCount,
    active: activeCount,
    successRate: completedCount + failedCount > 0
      ? (completedCount / (completedCount + failedCount) * 100).toFixed(2) + '%'
      : 'N/A',
  }
}

export async function getAllWorkerStats(): Promise<WorkerStats[]> {
  const results = await Promise.all(
    Array.from(workers.keys()).map((workerName) => getWorkerStats(workerName))
  )
  return results.filter((s): s is WorkerStats => s !== null)
}

export async function closeAllWorkers(): Promise<void> {
  await Promise.all(
    Array.from(workers.values()).map((worker) => worker.close())
  )
  workers.clear()
}
