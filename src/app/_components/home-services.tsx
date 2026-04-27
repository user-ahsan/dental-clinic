"use client"

import React from "react"
import { motion } from "framer-motion"
import { services } from "@/constants/service"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// SVG Icons for services
const serviceIcons: Record<string, React.ReactNode> = {
  general: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  cosmetic: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M12 36l6-18 6 12 6-18 6 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  orthodontics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="8" y="16" width="32" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M14 22h6M28 22h6M14 28h6M28 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "oral-surgery": (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 8v8M16 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20l10 20 10-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="28" r="3" fill="currentColor" />
    </svg>
  ),
  pediatric: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M10 40c0-8 8-12 8-12s8 4 8 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M28 38l8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 8v6M24 34v6M8 24h6M34 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="10" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="3" />
      <path d="M19 24h10M24 19v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
}

interface ServiceCardProps {
  service: (typeof services)[number]
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
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
        <Card className="h-full bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 lg:p-8">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              {serviceIcons[service.slug] || serviceIcons.general}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>

            {/* Learn More Link */}
            <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
              <span className="text-sm">Learn More</span>
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export function HomeServices() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
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
            Our Dental Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Dental Care for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500"> Every Smile</span>
          </h2>
          <p className="text-lg text-slate-600">
            From routine checkups to advanced procedures, our team delivers exceptional care using the latest techniques and technology.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}