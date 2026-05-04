import { motion } from "framer-motion"
import { CheckCircle2, Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface BookingProgressProps {
  selectedType: number | null
  selectedDate: string
  selectedTime: string
}

const steps = [
  { step: 1, label: "Select Service" },
  { step: 2, label: "Choose Date & Time" },
  { step: 3, label: "Your Details" },
]

export function BookingProgress({ selectedType, selectedDate, selectedTime }: BookingProgressProps) {
  const activeMap = [
    true,
    selectedType !== null,
    selectedDate !== "" && selectedTime !== "",
  ]

  return (
    <Card className="bg-white border-slate-200 sticky top-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Steps</h3>
        <div className="space-y-4">
          {steps.map((item, i) => (
            <div key={item.step} className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  activeMap[i]
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {activeMap[i] ? <CheckCircle2 className="w-4 h-4" /> : item.step}
              </div>
              <span
                className={`text-sm ${
                  activeMap[i] ? "text-slate-900 font-medium" : "text-slate-600"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
