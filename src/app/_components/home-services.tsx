"use client"

import React, { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { services } from "@/constants/service"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// SVG node factory — used in useMemo to prevent recreation each render
function createServiceIcons(): Record<string, React.ReactNode> {
  return {
  general: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="General Dentistry service icon" role="img">
      <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  cosmetic: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="Cosmetic Dentistry service icon" role="img">
      <path d="M12 36l6-18 6 12 6-18 6 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  orthodontics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="Orthodontics service icon" role="img">
      <rect x="8" y="16" width="32" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M14 22h6M28 22h6M14 28h6M28 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "oral-surgery": (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="Oral Surgery service icon" role="img">
      <path d="M24 8v8M16 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20l10 20 10-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="28" r="3" fill="currentColor" />
    </svg>
  ),
  pediatric: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="Pediatric Dentistry service icon" role="img">
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M10 40c0-8 8-12 8-12s8 4 8 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M28 38l8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-label="Emergency Dentistry service icon" role="img">
      <path d="M24 8v6M24 34v6M8 24h6M34 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="10" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="3" />
      <path d="M19 24h10M24 19v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  }
}

interface ServiceCardProps {
  service: (typeof services)[number]
  index: number
  serviceIcons: Record<string, React.ReactNode>
}

const ServiceCard = memo(function ServiceCard({ service, index, serviceIcons }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
<Link href={`/services/${service.slug}`} className="block group">
        <Card className="h-full bg-white border border-slate-200 shadow-sm active:border-blue-300 active:shadow-md active:-translate-y-1 transition-all duration-300 tap-highlight-transparent">
          <CardContent className="p-6 lg:p-8">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-active:bg-blue-600 group-active:text-white transition-colors duration-300 tap-highlight-transparent">
              {serviceIcons[service.slug] || serviceIcons.general}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-3 group-active:text-blue-600 transition-colors line-clamp-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>

            {/* Learn More Link */}
            <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
              <span className="text-sm">Learn More</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
})

export function HomeServices() {
  const serviceIcons = useMemo(() => createServiceIcons(), [])

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
            Our Dental Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Comprehensive Dental Care for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500"> Every Smile</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From routine checkups to advanced procedures, our team delivers exceptional care using the latest techniques and technology.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-slate-500" aria-label="No services available" role="img">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Services Available</h3>
              <p className="text-slate-500 max-w-sm">Our dental services are currently being updated. Please check back soon for our complete range of treatments.</p>
            </div>
          ) : (
            services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} serviceIcons={serviceIcons} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}