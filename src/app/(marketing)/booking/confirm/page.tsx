"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth.context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, Loader2, CalendarDays, Clock, Stethoscope, User } from "lucide-react"
import { appointmentTypes } from "@/app/(marketing)/booking/_components/types"

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

function BookingConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const typeId = searchParams.get("type")
  const date = searchParams.get("date")
  const time = searchParams.get("time")

  const service = appointmentTypes.find((t) => t.id === Number(typeId))

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/booking/confirm")
    }
  }, [user, router])

  const handleConfirm = useCallback(async () => {
    setConfirming(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: String(typeId),
          appointment_date: date,
          appointment_time: time,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.error ?? 'Failed to confirm appointment')
      }

      setConfirmed(true)
      toast.success("Appointment confirmed! Check your email for details.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to confirm appointment. Please try again.')
    } finally {
      setConfirming(false)
    }
  }, [typeId, date, time])

  if (!user) {
    return <LoadingSpinner />
  }

  if (!typeId || !date || !time || !service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-6">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Missing Booking Details</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Please select a service, date, and time from the booking page before confirming your appointment.
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
              {confirmed ? "Booking Confirmed!" : "Confirm Your Booking"}
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              {confirmed
                ? "You're all set. We look forward to seeing you."
                : "Review your appointment details below."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-8 sm:p-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Appointment Confirmed!
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
                      {user.name}, your {service.name.toLowerCase()} is scheduled for{" "}
                      <span className="font-semibold text-slate-900">{date}</span> at{" "}
                      <span className="font-semibold text-slate-900">{time}</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" variant="outline" onClick={() => router.push("/booking")}>
                        Book Another
                      </Button>
                      <Button size="lg" onClick={() => router.push("/")}>
                        Return Home
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white border-slate-200">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">
                      Booking Summary
                    </h2>

                    <div className="bg-slate-50 rounded-xl p-6 mb-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Service</p>
                          <p className="font-semibold text-slate-900">{service.name}</p>
                          <p className="text-xs text-slate-500">{service.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Date</p>
                          <p className="font-semibold text-slate-900">{date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Time</p>
                          <p className="font-semibold text-slate-900">{time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Patient</p>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                      >
                        Go Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleConfirm}
                        disabled={confirming}
                      >
                        {confirming ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingConfirmContent />
    </Suspense>
  )
}
