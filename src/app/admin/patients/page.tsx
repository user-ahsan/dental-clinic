"use client"

export const dynamic = 'force-dynamic'

import { useState, useMemo } from "react"
import nextDynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { AlertTriangle, Plus, Users } from "lucide-react"
import type { Patient } from "./types"

const PatientStatCards = nextDynamic(() => import('./_components/patient-stat-cards') as any, {
  loading: () => <StatCardsSkeleton />,
})
const PatientFilters = nextDynamic(() => import('./_components/patient-filters') as any, {
  loading: () => <Skeleton className="h-16 w-full rounded-lg" />,
})
const PatientTable = nextDynamic(() => import('./_components/patient-table') as any, {
  loading: () => <TableSkeleton />,
})

interface ApiPatient {
  id: string
  name: string
  email: string
  phone: string
  avatar_url: string | null
  status: string
  created_at: string
  profile: Record<string, unknown> | null
}

interface ApiResponse {
  data: ApiPatient[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}

function mapToPatient(api: ApiPatient): Patient {
  return {
    id: api.id,
    name: api.name,
    email: api.email,
    phone: api.phone ?? 'N/A',
    lastVisit: api.created_at ? new Date(api.created_at).toLocaleDateString() : 'N/A',
    nextAppointment: null,
    status: api.status === 'ACTIVE' ? 'active' : 'inactive',
    totalVisits: 0,
  }
}

function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-white">
          <CardContent className="pt-6">
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
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
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function AdminPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<ApiResponse>({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await fetch('/api/patients')
      if (!res.ok) throw new Error('Failed to fetch patients')
      return res.json()
    },
  })

  const patients: Patient[] = useMemo(
    () => (response?.data ?? []).map(mapToPatient),
    [response],
  )

  const filteredPatients = useMemo(
    () => patients.filter((patient) => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
      return matchesSearch && matchesStatus
    }),
    [patients, searchTerm, statusFilter],
  )

  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    upcoming: 0,
    avgVisits: 0,
  }), [patients])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-muted-foreground mt-1">
            Manage patient records and history
          </p>
        </div>
        <Button variant="default" onClick={() => toast("Opening add patient form")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Patients</span>
      </div>

      {/* Error State */}
      {error && (
        <div className="py-12 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <p className="text-destructive font-medium">Failed to load patients</p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">Retry</Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <>
          <StatCardsSkeleton />
          <Skeleton className="h-16 w-full rounded-lg" />
          <TableSkeleton />
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && patients.length === 0 && (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">No patients found</p>
          <p className="text-muted-foreground text-sm mt-1">Add a patient to get started</p>
          <Button variant="default" className="mt-4" onClick={() => toast("Opening add patient form")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && patients.length > 0 && (
        <>
          <PatientStatCards stats={stats} {...({} as any)} />
          <PatientFilters {...({
            searchTerm,
            statusFilter,
            onSearchChange: setSearchTerm,
            onStatusChange: setStatusFilter,
          } as any)} />
          <PatientTable patients={filteredPatients} {...({} as any)} />
        </>
      )}
    </div>
  )
}
