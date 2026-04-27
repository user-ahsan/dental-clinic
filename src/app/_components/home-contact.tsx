"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

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

export function HomeContact() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Your Smile Starts
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500"> Here</span>
          </h2>
          <p className="text-lg text-slate-600">
            Have questions about our services or ready to book your appointment? We&apos;re here to help with all your dental care needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Clinic Name & Tagline */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">SmileCare Dental Clinic</h3>
              <p className="text-slate-600">Your trusted partner in dental health since 2016.</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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

            {/* Map placeholder / decorative element */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 p-6 border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Visit Our Clinic</p>
                  <p className="text-sm text-slate-600">Located in the heart of Cityville</p>
                </div>
              </div>
              {/* Decorative dots pattern */}
              <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-30">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl p-8 lg:p-10 border border-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>

            <form className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
              </div>

              {/* Reason for Visit */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                  Reason for Visit
                </label>
                <Textarea
                  id="reason"
                  rows={4}
                  placeholder="I'd like to schedule a checkup and cleaning..."
                  className="w-full min-h-[120px] bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25">
                  Send Message
                </Button>
              </motion.div>

              {/* Form note */}
              <p className="text-sm text-slate-500 text-center">
                We typically respond within 24 hours. For urgent matters, please call us directly.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}