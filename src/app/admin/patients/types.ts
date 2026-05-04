export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  nextAppointment: string | null
  status: 'active' | 'inactive'
  totalVisits: number
}
