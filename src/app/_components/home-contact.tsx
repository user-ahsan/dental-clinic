"use client"

import React from "react"
import { motion } from "framer-motion"
import { ContactInfoSection } from "./contact-info-section"
import { ContactFormSection } from "./contact-form-section"

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
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Your Smile Starts
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500"> Here</span>
          </h2>
          <p className="text-lg text-slate-600">
            Have questions about our services or ready to book your appointment? We&apos;re here to help with all your dental care needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfoSection />
          <ContactFormSection />
        </div>
      </div>
    </section>
  )
}
