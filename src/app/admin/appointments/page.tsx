"use client"

export const dynamic = 'force-dynamic'

import { useMemo, useState } from "react"
import nextDynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import Box from '@mui/material/Box'
import CalendarIcon from '@/assets/icons/quill--paper.svg'
import { toast } from "sonner"
import { AlertTriangle, CalendarX } from "lucide-react"
import type { Appointment } from "./types"

const AppointmentFilters = nextDynamic(() => import('./_components/appointment-filters') as any, {
  loading: () => <Skeleton className="h-16 w-full rounded-lg" />,
})
const AppointmentTable = nextDynamic(() => import('./_components/appointment-table') as any, {
  loading: () => <TableSkeleton />,
})

interface ApiAppointment {
  id: string
  patient_id: string
  doctor_id: string | null
  start_time: string
  end_time: string
  status: string
  notes: string | null
  patient: { first_name: string; last_name: string } | null
  doctor: { first_name: string; last_name: string } | null
}

function mapToAppointment(api: ApiAppointment): Appointment {
  const dt = new Date(api.start_time)
  const status = api.status.toLowerCase().replace('_', '-')
  return {
    id: api.id,
    patient: api.patient ? `${api.patient.first_name} ${api.patient.last_name}` : 'Unknown',
    doctor: api.doctor ? `Dr. ${api.doctor.first_name} ${api.doctor.last_name}` : 'Unassigned',
    date: dt.toLocaleDateString(),
    time: dt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    service: api.notes ?? 'Appointment',
    status: (['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'].includes(status)
      ? status
      : 'scheduled') as Appointment['status'],
  }
}

function TableSkeleton() {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function AdminAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [doctorFilter, setDoctorFilter] = useState<string>('all')

  const {
    data: apiAppointments = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ApiAppointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await fetch('/api/appointments')
      if (!res.ok) throw new Error('Failed to fetch appointments')
      return res.json()
    },
  })

  const appointments: Appointment[] = useMemo(
    () => apiAppointments.map(mapToAppointment),
    [apiAppointments],
  )

  const filteredAppointments = useMemo(
    () => appointments.filter((apt) => {
      const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
      const matchesDoctor = doctorFilter === 'all' || apt.doctor.includes(doctorFilter)
      return matchesSearch && matchesStatus && matchesDoctor
    }),
    [appointments, searchTerm, statusFilter, doctorFilter],
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all patient appointments
          </p>
        </div>
        <Button variant="default" onClick={() => toast("Opening new appointment form")}>
          <Box component={CalendarIcon} sx={{ width: 16, height: 'auto' }} className="mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Appointments</span>
      </div>

      {/* Error State */}
      {error && (
        <div className="py-12 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <p className="text-destructive font-medium">Failed to load appointments</p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">Retry</Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <>
          <Skeleton className="h-16 w-full rounded-lg" />
          <TableSkeleton />
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && appointments.length === 0 && (
        <div className="py-12 text-center">
          <CalendarX className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">No appointments found</p>
          <p className="text-muted-foreground text-sm mt-1">Create your first appointment to get started</p>
          <Button variant="default" className="mt-4" onClick={() => toast("Opening new appointment form")}>New Appointment</Button>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && appointments.length > 0 && (
        <>
          <AppointmentFilters {...({
            searchTerm,
            statusFilter,
            doctorFilter,
            onSearchChange: setSearchTerm,
            onStatusChange: setStatusFilter,
            onDoctorChange: setDoctorFilter,
          } as any)} />
          <AppointmentTable appointments={filteredAppointments} {...({} as any)} />
        </>
      )}
    </div>
  )
}
