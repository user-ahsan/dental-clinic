"use client"

import nextDynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, CalendarDays, CalendarX, DollarSign, MessageSquareText, Users } from "lucide-react"

const QuickActions = nextDynamic(() => import('./_components/quick-actions') as any, {
  loading: () => null,
})
const RecentAppointmentsList = nextDynamic(() => import('./_components/recent-appointments') as any, {
  loading: () => (
    <Card className="bg-white">
      <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
      <CardContent className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1"><Skeleton className="h-4 w-32 mb-1" /><Skeleton className="h-3 w-24" /></div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  ),
})

export const dynamic = 'force-dynamic'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>{trend}</p>
        )}
      </CardContent>
    </Card>
  )
}

function StatCardSkeleton() {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="w-10 h-10 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

interface ApiAppointment {
  id: string
  status: string
  start_time: string
  patient?: { first_name: string; last_name: string } | null
  doctor?: { first_name: string; last_name: string } | null
}

interface Appointment {
  id: string
  patient: string
  doctor: string
  time: string
  status: string
}

function computeStats(appointments: ApiAppointment[]) {
  const today = new Date().toISOString().split('T')[0] ?? ''
  const todayCount = appointments.filter(a => a.start_time ? a.start_time.startsWith(today) : false).length
  return {
    todayAppointments: todayCount,
    totalAppointments: appointments.length,
    scheduled: appointments.filter(a => a.status === 'SCHEDULED').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    inProgress: appointments.filter(a => a.status === 'IN_PROGRESS').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
  }
}

export default function AdminDashboardPage() {
  const {
    data: appointments = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ApiAppointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await fetch('/api/appointments')
      if (!res.ok) throw new Error('Failed to fetch appointments')
      return res.json()
    },
  })

  const stats = computeStats(appointments)
  const recentAppointments: Appointment[] = [...appointments]
    .sort((a, b) => b.start_time?.localeCompare(a.start_time))
    .slice(0, 5)
    .map((a: ApiAppointment) => ({
      id: a.id,
      patient: a.patient ? `${a.patient.first_name} ${a.patient.last_name}` : 'Unknown',
      doctor: a.doctor ? `Dr. ${a.doctor.first_name} ${a.doctor.last_name}` : 'Unassigned',
      time: a.start_time ? new Date(a.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : 'N/A',
      status: a.status?.toLowerCase().replace('_', '-') ?? 'scheduled',
    }))

  if (error) {
    return (
      <div className="py-16 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-destructive/60 mb-4" />
        <p className="text-lg font-medium text-destructive">Failed to load dashboard</p>
        <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
        <Button variant="outline" onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Today's Appointments"
              value={stats.todayAppointments}
              icon={<CalendarDays className="w-5 h-5" />}
              trend={`${stats.totalAppointments} total`}
              trendUp
            />
            <StatCard
              title="Scheduled"
              value={stats.scheduled}
              icon={<Users className="w-5 h-5" />}
              trend={`${stats.confirmed} confirmed`}
              trendUp
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              icon={<DollarSign className="w-5 h-5" />}
              trend={`${stats.completed} completed`}
              trendUp
            />
            <StatCard
              title="Pending Reviews"
              value={stats.completed}
              icon={<MessageSquareText className="w-5 h-5" />}
              trend={`${stats.inProgress} active`}
              trendUp={false}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <Card className="bg-white">
          <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1"><Skeleton className="h-4 w-32 mb-1" /><Skeleton className="h-3 w-24" /></div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : recentAppointments.length === 0 ? (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <CalendarX className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">No recent appointments</p>
              <p className="text-sm text-muted-foreground mt-1">Appointments will appear here once scheduled.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <RecentAppointmentsList appointments={recentAppointments} {...({} as any)} />
      )}
      <QuickActions />
    </div>
  )
}
