"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth.context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Sparkles } from "lucide-react"
import { appointmentTypes, timeSlots } from "@/app/(marketing)/booking/_components/types"

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    </div>
  )
}

function BookingSlotContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const typeId = searchParams.get("selectedType")
  const date = searchParams.get("date")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const service = appointmentTypes.find((t) => t.id === Number(typeId))

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/booking/slot")
    }
  }, [user, router])

  const handleSelectSlot = useCallback(
    (slot: string) => {
      setSelectedTime(slot)
      router.push(
        `/booking/confirm?type=${typeId}&date=${date}&time=${encodeURIComponent(slot)}`
      )
    },
    [router, typeId, date]
  )

  if (!user) {
    return <LoadingSpinner />
  }

  if (!typeId || !date || !service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Missing Selection</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Please select a service and date from the booking page first.
          </p>
          <Button size="lg" onClick={() => router.push("/booking")}>
            Go to Booking
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Select a Time Slot
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              {service.name} on {date}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Time Slots Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-slate-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Available Times
            </h2>
            <p className="text-slate-600">
              Select a time that works best for you. Appointments are {service.duration} long.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => handleSelectSlot(slot)}
                  className="w-full text-left focus:outline-none group"
                  aria-pressed={selectedTime === slot}
                >
                  <Card
                    className={`border transition-all duration-200 cursor-pointer
                      ${selectedTime === slot
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
                          ${selectedTime === slot
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`font-semibold transition-colors
                            ${selectedTime === slot ? "text-blue-700" : "text-slate-900 group-hover:text-blue-700"}`}
                        >
                          {slot}
                        </p>
                        <p className="text-xs text-slate-500">{service.duration}</p>
                      </div>
                      {selectedTime === slot && (
                        <Sparkles className="w-4 h-4 text-blue-500 shrink-0 ml-auto" />
                      )}
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function BookingSlotPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingSlotContent />
    </Suspense>
  )
}
