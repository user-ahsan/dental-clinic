import { Queue, Job } from 'bullmq'
import { Redis } from 'ioredis'
import { getEnv } from '@/lib/env'

function getRedisConfig() {
  const env = getEnv();
  return {
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
    tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
    maxRetriesPerRequest: null,
  };
}

const redisConfig = getRedisConfig()

let connection: Redis | null = null

export function getRedisConnection(): Redis {
  if (!connection) {
    connection = new Redis(redisConfig)
  }
  return connection
}

export interface DLQEntry {
  jobId: string
  queueName: string
  failedAt: string
  error: string
  attempts: number
  originalData: Record<string, unknown>
}

export interface QueueConfig {
  name: string
  defaultJobOptions?: {
    attempts?: number
    backoff?: {
      type: 'exponential' | 'fixed'
      delay: number
    }
    removeOnFail?: boolean
  }
}

const queueConfigs: QueueConfig[] = [
  {
    name: 'appointment-reminders',
    defaultJobOptions: {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnFail: false,
    },
  },
  {
    name: 'email-notifications',
    defaultJobOptions: {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnFail: false,
    },
  },
  {
    name: 'payment-processing',
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'fixed', delay: 2000 },
      removeOnFail: false,
    },
  },
  {
    name: 'report-generation',
    defaultJobOptions: {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnFail: false,
    },
  },
]

export let queues: Queue[] = []
export const deadLetterQueues: Map<string, Queue> = new Map()
// NOTE: The `workers` Map lives in worker-factory.ts — import from there

export function createQueue(config: QueueConfig): Queue {
  const queue = new Queue(config.name, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      attempts: config.defaultJobOptions?.attempts || 5,
      backoff: config.defaultJobOptions?.backoff || { type: 'exponential', delay: 1000 },
      removeOnFail: config.defaultJobOptions?.removeOnFail ?? false,
    },
  })

  const dlqName = `${config.name}-dlq`
  const dlq = new Queue(dlqName, {
    connection: getRedisConnection(),
  })

  // Register side effects on shared state (immutable reassignment)
  queues = [...queues, queue]
  deadLetterQueues.set(config.name, dlq)

  return queue
}

export function initializeQueues(): Queue[] {
  return queueConfigs.map((config) => createQueue(config))
}

export async function moveToDeadLetterQueue(
  queueName: string,
  job: Job,
  error: Error | string
): Promise<void> {
  const dlq = deadLetterQueues.get(queueName)
  if (!dlq) {
    console.error(`DLQ not found for queue: ${queueName}`)
    return
  }

  const dlqEntry: DLQEntry = {
    jobId: job.id || 'unknown',
    queueName,
    failedAt: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
    attempts: job.attemptsMade,
    originalData: job.data,
  }

  await dlq.add(`dlq-${job.id}-${Date.now()}`, dlqEntry, {
    removeOnComplete: true,
    removeOnFail: false,
  })

  // Job moved to dead-letter queue
}

export async function getDLQSize(queueName: string): Promise<number> {
  const dlq = deadLetterQueues.get(queueName)
  if (!dlq) return 0
  return await dlq.getWaitingCount()
}

export async function getAllDLQSizes(): Promise<Record<string, number>> {
  const entries = Array.from(deadLetterQueues.entries())
  const counts = await Promise.all(
    entries.map(async ([queueName, dlq]) => ({
      queueName,
      count: await dlq.getWaitingCount(),
    }))
  )
  const sizes: Record<string, number> = {}
  for (const { queueName, count } of counts) {
    sizes[queueName] = count
  }
  return sizes
}

export async function retryFromDLQ(
  sourceQueueName: string,
  jobId: string
): Promise<boolean> {
  const dlq = deadLetterQueues.get(sourceQueueName)
  const targetQueue = queues.find(q => q.name === sourceQueueName)

  if (!dlq || !targetQueue) return false

  const dlqJobs = await dlq.getWaiting()
  const job = dlqJobs.find((j: Job) => j.id?.includes(jobId) || j.id === jobId)

  if (!job) return false

  const jobData = job.data as DLQEntry
  if (!jobData.originalData || typeof jobData.originalData !== 'object') {
    console.error(`Invalid DLQ entry data for job ${jobId}`)
    return false
  }
  await targetQueue.add(jobData.queueName, jobData.originalData)
  await job.remove()

  // Job retried from dead-letter queue
  return true
}

export async function checkDLQAlerts(): Promise<void> {
  const sizes = await getAllDLQSizes()
  for (const [queueName, size] of Object.entries(sizes)) {
    if (size > 0) {
      // DLQ alert: queue has failed jobs
    }
  }
}

export async function closeAllQueues(): Promise<void> {
  const allQueues = [...queues, ...Array.from(deadLetterQueues.values())]
  await Promise.all(allQueues.map((q) => q.close()))
  if (connection) {
    await connection.quit()
    connection = null
  }
}
