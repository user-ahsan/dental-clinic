import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { CalendarX, Clock, Eye } from "lucide-react"
import type { Patient } from "../types"

interface PatientTableProps {
  patients: Patient[]
}

export function PatientTable({ patients }: PatientTableProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>All Patients ({patients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Visit</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Next Appointment</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <CalendarX className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">No results found</p>
                    <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.totalVisits} visits</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{patient.email}</p>
                      <p className="text-xs text-muted-foreground">{patient.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{patient.lastVisit}</td>
                  <td className="py-4 px-4">
                    {patient.nextAppointment ? (
                      <Badge variant="secondary">{patient.nextAppointment}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={patient.status === 'active' ? 'secondary' : 'outline'}>
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="View Profile"
                        onClick={() => toast(`Viewing ${patient.name}'s profile`)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="View History"
                        onClick={() => toast(`Viewing ${patient.name}'s history`)}
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </Button>
                    </div>
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
