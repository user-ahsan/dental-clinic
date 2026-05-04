import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface PatientFiltersProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function PatientFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: PatientFiltersProps) {
  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label htmlFor="patient-search" className="sr-only">Search patients</label>
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="patient-search"
              placeholder="Search by name or email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="patient-status-filter" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Status
            </label>
            <select
              id="patient-status-filter"
              className="min-h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
            >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <Button variant="outline" size="sm" className="flex-1">Export</Button>
            <Button variant="ghost" size="sm">Clear</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
