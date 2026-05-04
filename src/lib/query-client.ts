import { QueryClient } from "@tanstack/react-query";

/**
 * Centralized QueryClient configuration for the dental clinic app.
 * 
 * React Query is configured for SERVER state management.
 * staleTime: 60 * 1000 (1 minute) - data is considered fresh for 1 minute
 * 
 * IMPORTANT: React Query is for SERVER state, not UI state.
 * Use useState for UI state (modals, forms, toggles).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute default for dynamic data
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection (formerly cacheTime)
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

/**
 * Cache profiles for different data freshness requirements.
 * Use these in query options for appropriate caching behavior.
 */
export const CACHE_PROFILES = {
  /** Static data: services, clinic info - rarely changes */
  static: {
    staleTime: 30 * 60 * 1000, // 30 minutes - data considered fresh
    gcTime: 60 * 60 * 1000, // 1 hour garbage collection
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
  /** Semi-static data: staff, facilities - changes occasionally */
  semiStatic: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes garbage collection
    refetchOnWindowFocus: false,
  },
  /** Dynamic data: appointments, availability - changes frequently */
  dynamic: {
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes garbage collection
    refetchOnWindowFocus: true,
  },
  /** Real-time: waiting times, live availability - needs frequent updates */
  realtime: {
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes garbage collection
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000, // Refetch every minute when visible
  },
} as const;

/**
 * Query keys for consistent cache management across the app.
 * Use these keys when calling useQuery({ queryKey: [...] })
 */
export const queryKeys = {
  clinics: ["clinics"] as const,
  clinic: (id: string) => ["clinics", id] as const,
  appointments: ["appointments"] as const,
  appointment: (id: string) => ["appointments", id] as const,
  services: ["services"] as const,
  service: (slug: string) => ["services", slug] as const,
  patients: ["patients"] as const,
  patient: (id: string) => ["patients", id] as const,
} as const;
