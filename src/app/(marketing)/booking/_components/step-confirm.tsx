import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { appointmentTypes } from "./types"

interface StepConfirmProps {
  selectedType: number
  selectedDate: string
  selectedTime: string
}

export function StepConfirm({ selectedType, selectedDate, selectedTime }: StepConfirmProps) {
  const service = appointmentTypes.find((t) => t.id === selectedType)

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" aria-hidden="true">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Confirm Booking</h3>
      </div>
      <div className="bg-slate-50 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Service:</span>
            <p className="font-medium text-slate-900">{service?.name}</p>
          </div>
          <div>
            <span className="text-slate-500">Date:</span>
            <p className="font-medium text-slate-900">{selectedDate}</p>
          </div>
          <div>
            <span className="text-slate-500">Time:</span>
            <p className="font-medium text-slate-900">{selectedTime}</p>
          </div>
        </div>
      </div>
      <Link href="/booking/confirm" className="w-full">
        <Button size="lg" className="w-full">
          Confirm Appointment
          <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </>
  )
}
