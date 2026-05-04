"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth.context"
import { Card, CardContent } from "@/components/ui/card"
import { showInfo } from "@/lib/toast-utils"
import { appointmentTypes } from "./_components/types"
import { StepServiceSelection, ServiceTypeCards } from "./_components/step-service"
import { StepDateTime } from "./_components/step-date-time"
import { StepConfirm } from "./_components/step-confirm"
import { BookingProgress } from "./_components/booking-progress"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function BookingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/booking")
    }
  }, [user, router])

  // Step completion toasts
  useEffect(() => {
    if (selectedType !== null) {
      const service = appointmentTypes.find((t) => t.id === selectedType)
      if (service) showInfo(`Selected: ${service.name}`)
    }
  }, [selectedType])

  useEffect(() => {
    if (selectedDate && selectedTime) {
      showInfo(`Date & time selected: ${selectedDate} at ${selectedTime}`)
    }
  }, [selectedDate, selectedTime])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Book Appointment", href: "/booking" },
        ]}
        backButtonLabel="Back to Home"
      />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Book Your Appointment</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Schedule your visit in just a few clicks. No wait time, no hassle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps Sidebar */}
            <div className="lg:col-span-1">
              <BookingProgress
                selectedType={selectedType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Service Type */}
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <StepServiceSelection
                    appointmentTypes={appointmentTypes}
                    selectedType={selectedType}
                    onSelect={setSelectedType}
                  />
                  <ServiceTypeCards
                    appointmentTypes={appointmentTypes}
                    selectedType={selectedType}
                    onSelect={setSelectedType}
                  />
                </CardContent>
              </Card>

              {/* Step 2: Date & Time */}
              <Card className="bg-white border-slate-200">
                <CardContent className="p-6">
                  <StepDateTime
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                  />
                </CardContent>
              </Card>

              {/* Step 3: Confirm — Always reserve space to prevent CLS */}
              {selectedType && selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <StepConfirm
                        selectedType={selectedType}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
