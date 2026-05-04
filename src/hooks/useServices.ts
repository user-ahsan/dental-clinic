"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { queryKeys, CACHE_PROFILES } from "@/lib/query-client";

/**
 * Service type (extends global IService with image field)
 * Note: Using global IService type to avoid duplication
 */
export interface Service extends Omit<IService, 'image'> {
  image: string
}

/**
 * Hook for fetching services with static caching.
 *
 * Services are considered static data that rarely changes,
 * so we use a 30-minute stale time to reduce database hits.
 *
 * @example
 * ```tsx
 * const { data: services } = useServices();
 * ```
 */
export function useServices(): UseQueryResult<Service[]> {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: async (): Promise<Service[]> => {
      const response = await fetch("/api/services");
      if (!response.ok) {
        // Return static fallback if API fails
        const staticServices = await import("@/constants/service").then(
          (m) => m.services
        );
        return staticServices.filter((s): s is Service => typeof s.image === 'string');
      }
      return response.json() as Promise<Service[]>;
    },
    ...CACHE_PROFILES.static,
  });
}

/**
 * Hook for fetching a single service by slug
 */
export function useService(slug: string): UseQueryResult<Service> {
  return useQuery({
    queryKey: queryKeys.service(slug),
    queryFn: async () => {
      const response = await fetch(`/api/services/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch service");
      }
      return response.json() as Promise<Service>;
    },
    ...CACHE_PROFILES.static,
    enabled: !!slug,
  });
}
