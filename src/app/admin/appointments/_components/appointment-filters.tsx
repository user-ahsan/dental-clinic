import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const doctorOptions = [
  { value: 'all', label: 'All Doctors' },
  { value: 'Dr. Emily Chen', label: 'Dr. Emily Chen' },
  { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
  { value: 'Dr. Sarah Thompson', label: 'Dr. Sarah Thompson' },
  { value: 'Dr. Michael Brown', label: 'Dr. Michael Brown' },
]

interface AppointmentFiltersProps {
  searchTerm: string
  statusFilter: string
  doctorFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onDoctorChange: (value: string) => void
}

export function AppointmentFilters({
  searchTerm,
  statusFilter,
  doctorFilter,
  onSearchChange,
  onStatusChange,
  onDoctorChange,
}: AppointmentFiltersProps) {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <label htmlFor="appointment-search" className="sr-only">Search appointments</label>
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="appointment-search"
              placeholder="Search patient or doctor..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="appointment-status-filter" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Status
            </label>
            <select
              id="appointment-status-filter"
              className="min-h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
            >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label htmlFor="appointment-doctor-filter" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Doctor
            </label>
            <select
              id="appointment-doctor-filter"
              className="min-h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
              value={doctorFilter}
              onChange={(e) => onDoctorChange(e.target.value)}
            >
            {doctorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          </div>
          <div className="flex gap-2 items-end">
            <Button variant="outline" size="sm" className="flex-1">Export</Button>
            <Button variant="ghost" size="sm">Clear Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
