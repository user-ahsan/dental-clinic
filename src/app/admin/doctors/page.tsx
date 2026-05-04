"use client"

export const dynamic = 'force-dynamic'

import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { AlertTriangle, Eye, Pencil, Plus, Stethoscope } from "lucide-react"

interface Doctor {
  id: string
  name: string
  email: string
  phone: string
  specialization?: string
  status: string
  years_of_experience?: number
  consultation_fee?: number
}

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
  ACTIVE: { variant: 'secondary', label: 'Available' },
  IN_SESSION: { variant: 'default', label: 'In Session' },
  PENDING_APPROVAL: { variant: 'outline', label: 'Pending' },
  SUSPENDED: { variant: 'destructive', label: 'Suspended' },
}

function DoctorCardSkeleton() {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-36 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDoctorsPage() {
  const {
    data: doctors = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await fetch('/api/doctors')
      if (!res.ok) throw new Error('Failed to fetch doctors')
      return res.json()
    },
  })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
          <p className="text-muted-foreground mt-1">
            Manage dental staff and their schedules
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => toast.success("Doctor list exported")}>Export List</Button>
          <Button variant="default" onClick={() => toast("Opening add doctor form")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Doctors</span>
      </div>

      {/* Error State */}
      {error && (
        <div className="py-16 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive/60 mb-4" />
          <p className="text-lg font-medium text-destructive">Failed to load doctors</p>
          <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">Try Again</Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && doctors.length === 0 && (
        <div className="py-16 text-center">
          <Stethoscope className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No doctors found</p>
          <p className="text-sm text-muted-foreground mt-1">Add a doctor to start managing your dental staff.</p>
        </div>
      )}

      {/* Doctors Grid */}
      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => <DoctorCardSkeleton key={i} />)
            : doctors.map((doctor) => {
                const status = statusConfig[doctor.status] ?? { variant: 'outline' as const, label: doctor.status }
                return (
                  <Card key={doctor.id} className="bg-white hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <CardTitle className="text-base">{doctor.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{doctor.specialization ?? 'General Dentistry'}</p>
                          </div>
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Experience</p>
                          <p className="font-semibold text-gray-900">
                            {doctor.years_of_experience ? `${doctor.years_of_experience} years` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fee</p>
                          <p className="font-semibold text-gray-900">${doctor.consultation_fee}</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-muted-foreground mb-2">{doctor.email}</p>
                        <p className="text-xs text-muted-foreground mb-4">{doctor.phone}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => toast(`Viewing Dr. ${doctor.name}'s profile`)}
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => toast.success(`Editing Dr. ${doctor.name}`)}
                          >
                            <Pencil className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
        </div>
      )}
    </div>
  )
}
