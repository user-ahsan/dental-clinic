import { Calendar, Clock, User } from "lucide-react"
import type { AppointmentType } from "./types"

interface StepServiceSelectionProps {
  appointmentTypes: AppointmentType[]
  selectedType: number | null
  onSelect: (id: number) => void
}

export function StepServiceSelection({
  appointmentTypes,
  selectedType,
  onSelect,
}: StepServiceSelectionProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" aria-hidden="true">
        <User className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">Select Service</h3>
    </div>
  )
}

export function ServiceTypeCards({
  appointmentTypes,
  selectedType,
  onSelect,
}: StepServiceSelectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {appointmentTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={`p-4 rounded-xl border-2 text-left transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none ${
            selectedType === type.id
              ? "border-blue-600 bg-blue-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-900">{type.name}</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            {type.duration}
          </div>
          <p className="text-sm text-slate-600 mt-2">{type.description}</p>
        </button>
      ))}
    </div>
  )
}
