import { Card, CardContent } from "@/components/ui/card"

interface StatCardsProps {
  stats: {
    total: number
    active: number
    upcoming: number
    avgVisits: number
  }
}

export function PatientStatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <p className="text-sm text-muted-foreground">Total Patients</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <p className="text-sm text-muted-foreground">Active Patients</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-gray-900">{stats.avgVisits}</div>
          <p className="text-sm text-muted-foreground">Avg. Visits per Patient</p>
        </CardContent>
      </Card>
    </div>
  )
}
