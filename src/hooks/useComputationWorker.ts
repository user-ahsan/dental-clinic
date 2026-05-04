/**
 * Hook for using Web Workers for heavy computations
 * 
 * Usage:
 * import { useComputationWorker } from '@/hooks/useComputationWorker'
 * 
 * const { processInWorker, isProcessing } = useComputationWorker()
 * 
 * // For heavy data operations
 * const result = await processInWorker('deepClone', largeObject)
 * const sorted = await processInWorker('sort', { data: largeArray, compareFn: (a, b) => a.value - b.value })
 */

"use client"

import { useCallback, useRef, useState } from "react"
import type { WorkerOperation } from "@/workers/computation.worker"

interface WorkerRequest {
  id: string
  type: WorkerOperation
  payload?: Record<string, unknown>
}

interface PendingRequest {
  resolve: (value: unknown) => void
  reject: (error: Error) => void
}

let workerInstance: Worker | null = null
const pendingRequests = new Map<string, PendingRequest>()

function getWorker(): Worker {
  if (!workerInstance) {
    // Create worker with dynamic import for code splitting
    workerInstance = new Worker(
      new URL("../workers/computation.worker.ts", import.meta.url)
    )
    workerInstance.onmessage = (event) => {
      const { id, success, data, error } = event.data
      const pending = pendingRequests.get(id)
      if (pending) {
        if (success) {
          pending.resolve(data)
        } else {
          pending.reject(new Error(error))
        }
        pendingRequests.delete(id)
      }
    }
    workerInstance.onerror = (error) => {
      console.error("Worker error:", error)
    }
  }
  return workerInstance
}

interface UseComputationWorkerReturn {
  processInWorker: <T>(type: WorkerOperation, payload?: Record<string, unknown>) => Promise<T>;
  terminateWorker: () => void;
  isProcessing: boolean;
}

export function useComputationWorker(): UseComputationWorkerReturn {
  const [isProcessing, setIsProcessing] = useState(false)
  const requestIdRef = useRef(0)

  /** Send work to the web worker and await typed result */
  const processInWorker = useCallback(<T>(type: WorkerOperation, payload?: Record<string, unknown>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const id = `req_${++requestIdRef.current}_${Date.now()}`
      // Store as unknown → caller casts back to T via the promise's generic
      pendingRequests.set(id, {
        resolve: (value: unknown) => resolve(value as T),
        reject,
      })

      const worker = getWorker()
      worker.postMessage({ id, type, payload } satisfies WorkerRequest)
      setIsProcessing(true)

      // Clean up processing state after a short delay
      setTimeout(() => setIsProcessing(false), 100)
    })
  }, [])

  const terminateWorker = useCallback(() => {
    if (workerInstance) {
      workerInstance.terminate()
      workerInstance = null
    }
  }, [])

  return {
    processInWorker,
    terminateWorker,
    isProcessing,
  }
}
