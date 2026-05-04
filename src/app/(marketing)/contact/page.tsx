"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Dental Care Drive, Suite 100, Cityville, ST 12345",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-SMILE",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@smilecare.dental",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM | Sun: Closed",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const reason = (formData.get("reason") as string)?.trim()

    if (!name || !email || !reason) {
      setError("Please fill in all required fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: (formData.get('phone') as string)?.trim() || undefined,
          message: reason,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.error ?? 'Failed to send message')
      }

      toast.success("Message sent! We'll get back to you soon.")
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        backButtonLabel="Back to Home"
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Your Smile Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Here</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have questions about our services or ready to book your appointment? We&apos;re here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">SmileCare Dental Clinic</h3>
                <p className="text-slate-600">Your trusted partner in dental health since 2016.</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-1">{item.label}</p>
                      <p className="text-slate-900 font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact Options */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="flex-1">
                  <Button size="lg" variant="default" className="w-full">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="flex-1">
                  <MessageCircle className="w-5 h-5" />
                  Chat With Us
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 lg:p-10 border border-slate-200 shadow-[var(--shadow-sm)]"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
              <form className="space-y-5" aria-label="Contact form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input id="name" name="name" type="text" placeholder="John Smith" required className="w-full h-12" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required className="w-full h-12" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full h-12" />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea id="reason" name="reason" rows={4} placeholder="How can we help you?" required className="min-h-32" />
                </div>
                {error && (
                  <p className="text-sm text-red-600" role="alert" aria-live="polite">
                    {error}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-sm text-slate-500 text-center">We typically respond within 24 hours.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}