"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const contactInfo = [
  { icon: MapPin, label: "Address", value: "123 Dental Care Drive, Suite 100, Cityville, ST 12345" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-SMILE" },
  { icon: Mail, label: "Email", value: "hello@smilecare.dental" },
  { icon: Clock, label: "Hours", value: "Mon-Fri: 8AM-6PM | Sat: 9AM-2PM | Sun: Closed" },
]

export function ContactInfoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">SmileCare Dental Clinic</h3>
        <p className="text-slate-600">Your trusted partner in dental health since 2016.</p>
      </div>

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
              <p className="text-slate-900 font-medium truncate max-w-64">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 p-6 border border-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white shadow-[var(--shadow-sm)] flex items-center justify-center">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 truncate max-w-64">Visit Our Clinic</p>
            <p className="text-sm text-slate-600">Located in the heart of Cityville</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
