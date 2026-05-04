"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart, Users, Award, Shield, Smile, Star } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"

interface TeamMember { name: string; role: string; initials: string }

function buildTeam(): TeamMember[] {
  return [
    { name: "Dr. Sarah Mitchell", role: "Lead Dentist", initials: "SM" },
    { name: "Dr. James Chen", role: "Orthodontist", initials: "JC" },
    { name: "Dr. Emily Park", role: "Pediatric Dentist", initials: "EP" },
    { name: "Dr. Michael Torres", role: "Oral Surgeon", initials: "MT" },
  ]
}

const reasons = [
  { icon: Award, title: "Experienced Team", desc: "Over 15 years of combined dental expertise." },
  { icon: Shield, title: "Safe & Sterile", desc: "Hospital-grade sterilization protocols." },
  { icon: Smile, title: "Patient-First Care", desc: "Comfortable, anxiety-free experience." },
  { icon: Star, title: "Modern Technology", desc: "Digital X-rays, 3D imaging, laser dentistry." },
]

export default function AboutPage() {
  const team = useMemo(() => buildTeam(), [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        backButtonLabel="Back to Home"
      />

      {/* Hero */}
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
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About SmileCare Dental
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Dedicated to providing exceptional dental care in a warm, welcoming environment since 2016.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story + Our Mission */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                SmileCare Dental was founded in 2016 with a simple mission: make quality dental care
                accessible and comfortable for everyone in our community. What started as a small
                two-chair practice has grown into a full-service dental clinic serving thousands of
                happy patients.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our philosophy is rooted in prevention, education, and personalized treatment. We
                believe every patient deserves a healthy, beautiful smile they can be proud of.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To deliver comprehensive, compassionate dental care using the latest technology and
                techniques. We treat every patient like family — with respect, honesty, and a gentle touch.
              </p>
              <ul className="space-y-3 text-slate-600">
                {[
                  "Comprehensive exams and cleanings",
                  "Advanced cosmetic and restorative procedures",
                  "Same-day emergency care when you need it most",
                  "Flexible scheduling and payment options",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine expertise with genuine care to give you the best dental experience possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our skilled professionals are dedicated to keeping your smile healthy and bright.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Meet Our Team?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              Schedule your appointment today and experience the SmileCare difference.
            </p>
            <Link href="/booking">
              <Button
                size="lg"
                variant="outline-inverse"
                className="text-base font-semibold px-8 py-6 rounded-xl"
              >
                Book Your Appointment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
