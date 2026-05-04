"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactFormSection() {
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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-slate-50 rounded-xl p-6 md:p-8 lg:p-10 border border-slate-100"
    >
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">Send Us a Message</h3>

      <form className="space-y-5" aria-label="Contact form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Full Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Input id="name" name="name" type="text" placeholder="John Smith" required aria-required className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-md" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required aria-required className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-md" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-md" />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
            Reason for Visit <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Textarea id="reason" name="reason" rows={4} placeholder="I'd like to schedule a checkup and cleaning..." required aria-required className="w-full min-h-32 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none" />
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" size="lg" variant="default" aria-label="Submit contact form" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
        <p className="text-sm text-slate-500 text-center" role="note">
          We typically respond within 24 hours. For urgent matters, please call us directly.
        </p>
      </form>
    </motion.div>
  )
}
