"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { services } from "@/constants/service"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"

// SVG node factory — used in useMemo to prevent recreation each render
function createServiceIcons(): Record<string, React.ReactNode> {
  return {
  general: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="General Dentistry">
      <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  cosmetic: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="Cosmetic Dentistry">
      <path d="M12 36l6-18 6 12 6-18 6 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  orthodontics: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="Orthodontics">
      <rect x="8" y="16" width="32" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M14 22h6M28 22h6M14 28h6M28 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "oral-surgery": (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="Oral Surgery">
      <path d="M24 8v8M16 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20l10 20 10-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="28" r="3" fill="currentColor" />
    </svg>
  ),
  pediatric: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="Pediatric Dentistry">
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M10 40c0-8 8-12 8-12s8 4 8 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M28 38l8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-label="Emergency Dentistry">
      <path d="M24 8v6M24 34v6M8 24h6M34 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="10" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="3" />
      <path d="M19 24h10M24 19v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  }
}

const includedFeatures = [
  "Comprehensive oral exam",
  "Digital X-rays",
  "Professional cleaning",
  "Personalized treatment plan",
  "Follow-up care",
]

export default function ServicesPage() {
  const serviceIcons = useMemo(() => createServiceIcons(), [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        backButtonLabel="Back to Home"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Comprehensive Dental Care
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              From routine checkups to advanced procedures, we provide exceptional dental care using the latest techniques and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                      {serviceIcons[service.slug] || serviceIcons.general}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                    {/* Features list — always reserve min-height to prevent CLS */}
                    <ul className="space-y-2 mb-6 min-h-[6rem]" aria-label={`${service.title} features`}>
                      {(service.features || []).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                      <Link href={`/booking?service=${service.slug}`}>
                        <Button variant="outline" className="w-full mt-auto">
                          Book Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-lg text-slate-600 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
            Book your appointment today and experience dental care that puts you first.
          </p>
          <Link href="/booking">
            <Button size="lg" variant="default">
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}