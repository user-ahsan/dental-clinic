"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import { getTomorrowDate, timeSlots } from "./types"

interface StepDateTimeProps {
  selectedDate: string
  selectedTime: string
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
}

export function StepDateTime({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: StepDateTimeProps) {
  // Fix: compute tomorrow's date client-side to avoid hydration mismatch.
  // new Date() runs at different times on server vs client — min attribute must match.
  const [minDate, setMinDate] = useState<string>("")

  useEffect(() => {
    setMinDate(getTomorrowDate())
  }, [])

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" aria-hidden="true">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Choose Date & Time</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="booking-date" className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
          <input
            id="booking-date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={minDate}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label htmlFor="booking-time" className="block text-sm font-medium text-slate-700 mb-2">Select Time</label>
          <select
            id="booking-time"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Choose a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
