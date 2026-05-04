import { useMemo, useState } from "react"
import type { Appointment } from "../types"

export interface AppointmentFilters {
  searchTerm: string
  statusFilter: string
  doctorFilter: string
  setSearchTerm: (value: string) => void
  setStatusFilter: (value: string) => void
  setDoctorFilter: (value: string) => void
  filteredAppointments: Appointment[]
}

export function useAppointmentFilters(appointments: Appointment[]): AppointmentFilters {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [doctorFilter, setDoctorFilter] = useState<string>('all')

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((apt) => {
        const matchesSearch =
          apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
        const matchesDoctor =
          doctorFilter === 'all' || apt.doctor.includes(doctorFilter)
        return matchesSearch && matchesStatus && matchesDoctor
      }),
    [appointments, searchTerm, statusFilter, doctorFilter],
  )

  return {
    searchTerm,
    statusFilter,
    doctorFilter,
    setSearchTerm,
    setStatusFilter,
    setDoctorFilter,
    filteredAppointments,
  }
}
