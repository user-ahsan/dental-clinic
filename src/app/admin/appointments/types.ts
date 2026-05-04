export interface Appointment {
  id: string
  patient: string
  doctor: string
  date: string
  time: string
  service: string
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
}
