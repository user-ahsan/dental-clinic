import { useMemo, useState } from "react"
import type { Patient } from "../types"

export interface PatientFilters {
  searchTerm: string
  statusFilter: string
  setSearchTerm: (value: string) => void
  setStatusFilter: (value: string) => void
  filteredPatients: Patient[]
  stats: {
    total: number
    active: number
    upcoming: number
    avgVisits: number
  }
}

export function usePatientFilters(patients: Patient[]): PatientFilters {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredPatients = useMemo(
    () =>
      patients.filter((patient) => {
        const matchesSearch =
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus =
          statusFilter === 'all' || patient.status === statusFilter
        return matchesSearch && matchesStatus
      }),
    [patients, searchTerm, statusFilter],
  )

  const stats = useMemo(
    () => ({
      total: patients.length,
      active: patients.filter((p) => p.status === 'active').length,
      upcoming: patients.filter((p) => p.nextAppointment).length,
      avgVisits: Math.round(
        patients.reduce((acc, p) => acc + p.totalVisits, 0) / (patients.length || 1),
      ),
    }),
    [patients],
  )

  return { searchTerm, statusFilter, setSearchTerm, setStatusFilter, filteredPatients, stats }
}
