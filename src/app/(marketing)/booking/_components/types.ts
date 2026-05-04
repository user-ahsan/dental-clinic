export interface AppointmentType {
  id: number
  name: string
  duration: string
  description: string
}

export const appointmentTypes: AppointmentType[] = [
  { id: 1, name: "General Checkup", duration: "30 min", description: "Routine examination and cleaning" },
  { id: 2, name: "Teeth Cleaning", duration: "45 min", description: "Professional dental cleaning" },
  { id: 3, name: "Consultation", duration: "30 min", description: "Discuss treatment options" },
  { id: 4, name: "Emergency Care", duration: "60 min", description: "Urgent dental issues" },
]

export const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split("T")[0] as string
}
