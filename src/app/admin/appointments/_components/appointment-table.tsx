import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { CalendarX, Eye, RefreshCw, XCircle } from "lucide-react"
import type { Appointment } from "../types"
import type { StatusVariant } from "../../_components/types"

const statusColors: Record<string, StatusVariant> = {
  scheduled: 'outline',
  confirmed: 'secondary',
  'in-progress': 'default',
  completed: 'secondary',
  cancelled: 'destructive',
}

interface AppointmentTableProps {
  appointments: Appointment[]
}

function AppointmentActions({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="View appointment details"
        onClick={() => toast(`Viewing appointment for ${appointment.patient}`)}
      >
        <Eye className="w-3.5 h-3.5" />
      </Button>
      {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
        <>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Reschedule appointment"
            onClick={() => toast.success(`Appointment rescheduled for ${appointment.patient}`)}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="destructive"
            size="icon-xs"
            aria-label="Cancel appointment"
            onClick={() => toast.error(`Appointment for ${appointment.patient} cancelled`)}
          >
            <XCircle className="w-3.5 h-3.5" />
          </Button>
        </>
      )}
    </div>
  )
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>All Appointments ({appointments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <CalendarX className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">No results found</p>
                    <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                          {appointment.patient.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{appointment.patient}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{appointment.doctor}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{appointment.service}</td>
                    <td className="py-4 px-4">
                      <Badge variant={statusColors[appointment.status] || 'outline'}>
                        {appointment.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <AppointmentActions appointment={appointment} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
