import { Card, CardContent } from "@/components/ui/card"
import Box from '@mui/material/Box'
import CalendarIcon from '@/assets/icons/quill--paper.svg'
import UsersIcon from '@/assets/icons/fluent--contact-card-group-28-regular.svg'
import ReviewIcon from '@/assets/icons/material-symbols--contact-support-outline-rounded.svg'

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
            <Box component={CalendarIcon} sx={{ width: 24, height: 'auto' }} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Appointment</h3>
          <p className="text-sm text-muted-foreground">Create a new appointment for a patient</p>
        </CardContent>
      </Card>
      <Card className="bg-white cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4">
            <Box component={UsersIcon} sx={{ width: 24, height: 'auto' }} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Patient</h3>
          <p className="text-sm text-muted-foreground">Register a new patient in the system</p>
        </CardContent>
      </Card>
      <Card className="bg-white cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
            <Box component={ReviewIcon} sx={{ width: 24, height: 'auto' }} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Reports</h3>
          <p className="text-sm text-muted-foreground">Check pending reviews and feedback</p>
        </CardContent>
      </Card>
    </div>
  )
}
