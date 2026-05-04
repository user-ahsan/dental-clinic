/**
 * Web Worker for heavy computations that would block the main thread
 * 
 * This worker handles:
 * - Large data transformations (deep cloning, merging)
 * - Complex date calculations
 * - Sorting/filtering large datasets
 * - Any CPU-intensive operations
 */

export type WorkerOperation = 'deepClone' | 'sort' | 'filter' | 'paginate';

// Message types for worker communication
// T defaults to `unknown` — payload shapes vary by operation type
interface WorkerMessage<T = unknown> {
  id: string;
  type: WorkerOperation;
  payload?: T;
}

// T defaults to `unknown` because responses can carry arrays, paginated results, primitives, or objects
interface WorkerResponse<T = unknown> {
  id: string;
  success: boolean;
  data?: T;
  error?: string;
}

interface SortPayload<T = unknown> {
  data: T[];
  compareFn?: (a: T, b: T) => number;
}

interface FilterPayload<T = unknown> {
  data: T[];
  predicate: (item: T) => boolean;
}

interface PaginatePayload<T = unknown> {
  data: T[];
  page: number;
  pageSize: number;
}

// Deep clone utility for large objects
// Note: `as T` casts are unavoidable for generic clone — TS cannot verify dynamic key assignment
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  const cloned: Record<string, unknown> = {};
  const source = obj as Record<string, unknown>;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      cloned[key] = deepClone(source[key]);
    }
  }
  return cloned as unknown as T;
}

// Sort large arrays with comparator
function sortArray<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return [...arr].sort(compareFn);
}

// Filter large datasets
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

interface PaginateResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
}

// Pagination calculation
function paginateData<T>(arr: T[], page: number, pageSize: number): PaginateResult<T> {
  const totalItems = arr.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const data = arr.slice(startIndex, startIndex + pageSize);
  return { data, totalPages, totalItems };
}

/** Type guard: is the incoming payload a SortPayload? */
function isSortPayload(payload: unknown): payload is SortPayload {
  return typeof payload === 'object' && payload !== null && 'data' in payload;
}

/** Type guard: is the incoming payload a FilterPayload? */
function isFilterPayload(payload: unknown): payload is FilterPayload {
  return typeof payload === 'object' && payload !== null && 'data' in payload && 'predicate' in payload;
}

/** Type guard: is the incoming payload a PaginatePayload? */
function isPaginatePayload(payload: unknown): payload is PaginatePayload {
  return typeof payload === 'object' && payload !== null && 'data' in payload && 'page' in payload && 'pageSize' in payload;
}

// Handle incoming messages
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;

  try {
    switch (type) {
      case 'deepClone': {
        const cloned = deepClone(payload);
        self.postMessage({ id, success: true, data: cloned } satisfies WorkerResponse);
        break;
      }

      case 'sort': {
        if (!isSortPayload(payload)) {
          self.postMessage({ id, success: false, error: 'Invalid sort payload' } satisfies WorkerResponse);
          return;
        }
        const sorted = sortArray(payload.data, payload.compareFn);
        self.postMessage({ id, success: true, data: sorted } satisfies WorkerResponse);
        break;
      }

      case 'filter': {
        if (!isFilterPayload(payload)) {
          self.postMessage({ id, success: false, error: 'Invalid filter payload' } satisfies WorkerResponse);
          return;
        }
        const filtered = filterArray(payload.data, payload.predicate);
        self.postMessage({ id, success: true, data: filtered } satisfies WorkerResponse);
        break;
      }

      case 'paginate': {
        if (!isPaginatePayload(payload)) {
          self.postMessage({ id, success: false, error: 'Invalid paginate payload' } satisfies WorkerResponse);
          return;
        }
        const paginated = paginateData(payload.data, payload.page, payload.pageSize);
        self.postMessage({ id, success: true, data: paginated } satisfies WorkerResponse);
        break;
      }

      default:
        self.postMessage({ id, success: false, error: `Unknown operation: ${type}` } satisfies WorkerResponse);
    }
  } catch (error) {
    self.postMessage({ id, success: false, error: error instanceof Error ? error.message : 'Unknown error' } satisfies WorkerResponse);
  }
};
