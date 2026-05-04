import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { StatusVariant } from "./types"

interface RecentAppointment {
  id: string
  patient: string
  doctor: string
  time: string
  status: string
}

export const statusColors: Record<string, StatusVariant> = {
  scheduled: 'outline',
  confirmed: 'secondary',
  'in-progress': 'default',
  completed: 'secondary',
  cancelled: 'destructive',
}

interface RecentAppointmentsProps {
  appointments: RecentAppointment[]
}

export function RecentAppointmentsList({ appointments }: RecentAppointmentsProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Appointments</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {appointment.patient.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor} • {appointment.time}</p>
                </div>
              </div>
              <Badge variant={statusColors[appointment.status] || 'outline'}>
                {appointment.status.replace('-', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
