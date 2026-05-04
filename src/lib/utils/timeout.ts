/**
 * Utility for wrapping async operations with a configurable timeout.
 *
 * Usage:
 *   const result = await withTimeout(fetch(url), 5000, 'API timeout')
 *   const data  = await withTimeout(dbQuery(), 3000)
 */

export class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Wraps a promise with a timeout. If the promise does not resolve within
 * the specified ms, it rejects with a TimeoutError.
 *
 * @param promise  The promise to wrap
 * @param ms       Timeout in milliseconds (default: 10_000)
 * @param message  Custom error message
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number = 10_000,
  message?: string
): Promise<T> {
  if (ms <= 0) return promise;

  let timer: NodeJS.Timeout | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new TimeoutError(message ?? `Operation timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

/**
 * Wraps a function so that every invocation is subject to the given timeout.
 */
export function createTimedFunction<T extends (...args: never[]) => Promise<unknown>>(
  fn: T,
  ms: number = 10_000,
  message?: string
): T {
  return ((...args: Parameters<T>) => withTimeout(fn(...args), ms, message)) as T;
}
