"use client";

import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-client";

// Types for appointments
export type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export interface Appointment {
  id: string;
  clinic_id: string;
  patient_id: string;
  service_id: string;
  dentist_id: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AppointmentFilters {
  clinic_id?: string;
  patient_id?: string;
  status?: AppointmentStatus;
  from_date?: string;
  to_date?: string;
}

export interface CreateAppointmentInput {
  clinic_id: string;
  patient_id: string;
  service_id: string;
  dentist_id: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

export interface UpdateAppointmentInput extends Partial<CreateAppointmentInput> {
  id: string;
  status?: AppointmentStatus;
}

/**
 * Hook for fetching appointments with optional filtering.
 * 
 * @param filters - Optional filters for clinic_id, patient_id, status, date range
 * @returns useQuery result with appointments, loading, error states
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useAppointments({ clinic_id: "123" });
 * ```
 */
export function useAppointments(filters?: AppointmentFilters): UseQueryResult<Appointment[]> {
  return useQuery({
    queryKey: [...queryKeys.appointments, filters ?? {}],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.clinic_id) params.set("clinic_id", filters.clinic_id);
      if (filters?.patient_id) params.set("patient_id", filters.patient_id);
      if (filters?.status) params.set("status", filters.status);
      if (filters?.from_date) params.set("from_date", filters.from_date);
      if (filters?.to_date) params.set("to_date", filters.to_date);

      const url = `/api/appointments${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      return response.json() as Promise<Appointment[]>;
    },
    enabled: true,
  });
}

/**
 * Hook for fetching a single appointment by ID.
 */
export function useAppointment(id: string): UseQueryResult<Appointment> {
  return useQuery({
    queryKey: queryKeys.appointment(id),
    queryFn: async () => {
      const response = await fetch(`/api/appointments/${id}`);
      if (!response.ok) throw new Error("Failed to fetch appointment");
      return response.json() as Promise<Appointment>;
    },
    enabled: !!id,
  });
}

/**
 * Hook for creating a new appointment with optimistic update support.
 * Handles race conditions by rolling back on failure.
 */
export function useCreateAppointment(): UseMutationResult<Appointment, Error, CreateAppointmentInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAppointmentInput) => {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        const error = await response.json().catch((parseErr) => {
          console.error('[useAppointment] Failed to parse error response:', parseErr);
          return { message: 'Unknown server error' };
        });
        throw new Error(error.message || "Failed to create appointment");
      }
      return response.json() as Promise<Appointment>;
    },
    onMutate: async (input) => {
      // Cancel outgoing refetches to prevent race condition
      await queryClient.cancelQueries({ queryKey: queryKeys.appointments });

      // Snapshot current state for rollback
      const previousData = queryClient.getQueryData(queryKeys.appointments);

      // Optimistically add to cache with pending state
      const optimisticItem: Appointment = {
        id: `temp-${Date.now()}`,
        clinic_id: input.clinic_id,
        patient_id: input.patient_id,
        service_id: input.service_id,
        dentist_id: input.dentist_id,
        appointment_date: input.appointment_date,
        appointment_time: input.appointment_time,
        status: "SCHEDULED" as const,
        notes: input.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Appointment[]>(queryKeys.appointments, (old) => {
        if (!old) return [optimisticItem];
        return [...old, optimisticItem]; // FIX: append new item instead of discarding it
      });

      return { previousData };
    },
    onSuccess: (data) => {
      // Immediately refetch to ensure fresh state
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      queryClient.invalidateQueries({ queryKey: queryKeys.appointment(data.id) });
    },
    onError: (err, input, context) => {
      // Rollback to previous state on failure
      if (context?.previousData !== undefined) {
        queryClient.setQueryData(queryKeys.appointments, context.previousData);
      }
      // Invalidate to recover from any partial state
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
    },
  });
}

/**
 * Hook for updating an existing appointment with optimistic update + rollback.
 * Prevents stale state race conditions during concurrent modifications.
 */
export function useUpdateAppointment(): UseMutationResult<Appointment, Error, UpdateAppointmentInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateAppointmentInput) => {
      const response = await fetch(`/api/appointments/${input.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        const error = await response.json().catch((parseErr) => {
          console.error('[useAppointment] Failed to parse error response:', parseErr);
          return { message: 'Unknown server error' };
        });
        throw new Error(error.message || "Failed to update appointment");
      }
      return response.json() as Promise<Appointment>;
    },
    onMutate: async (input) => {
      // Cancel outgoing refetches to prevent race condition
      await queryClient.cancelQueries({ queryKey: queryKeys.appointments });
      await queryClient.cancelQueries({ queryKey: queryKeys.appointment(input.id) });

      // Snapshot current state for rollback
      const previousList = queryClient.getQueryData<Appointment[]>(queryKeys.appointments);
      const previousItem = queryClient.getQueryData<Appointment>(queryKeys.appointment(input.id));

      // Optimistically update list
      queryClient.setQueryData<Appointment[]>(queryKeys.appointments, (old) => {
        if (!old) return [];
        return old.map((a) =>
          a.id === input.id
            ? { ...a, ...input, updated_at: new Date().toISOString() }
            : a
        );
      });

      // Optimistically update single item (return undefined when no cached data — not null)
      queryClient.setQueryData<Appointment>(queryKeys.appointment(input.id), (old) => {
        if (!old) return undefined;
        return { ...old, ...input, updated_at: new Date().toISOString() };
      });

      return { previousList, previousItem };
    },
    onSuccess: (data) => {
      // Replace optimistic data with server response
      queryClient.setQueryData(queryKeys.appointment(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
    },
    onError: (err, input, context) => {
      // Rollback to previous state on failure (prevents race condition with concurrent writes)
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(queryKeys.appointments, context.previousList);
      }
      if (context?.previousItem !== undefined) {
        queryClient.setQueryData(queryKeys.appointment(input.id), context.previousItem);
      }
      // Invalidate to recover from any partial state after rollback
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      queryClient.invalidateQueries({ queryKey: queryKeys.appointment(input.id) });
    },
  });
}

/**
 * Hook for cancelling an appointment with proper invalidation.
 */
export function useCancelAppointment(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to cancel appointment");
    },
    onSuccess: (_data, id) => {
      // Cancel outgoing refetches to prevent race condition
      queryClient.cancelQueries({ queryKey: queryKeys.appointments });
      queryClient.cancelQueries({ queryKey: queryKeys.appointment(id) });

      // Invalidate to trigger refetch with fresh state
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      queryClient.invalidateQueries({ queryKey: queryKeys.appointment(id) });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (err, id, _context) => {
      // Invalidate on error to recover from stale state
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      queryClient.invalidateQueries({ queryKey: queryKeys.appointment(id) });
    },
  });
}
