"use client"

import { motion } from "framer-motion"
import { Sparkles, Clock, Stethoscope, Microscope } from "lucide-react"
import { MotivationDecorativePanel } from "./motivation-decorative-panel"

const motivations = [
  { icon: Sparkles, title: "Pain-Free Dentistry", description: "We understand dental anxiety. Our gentle techniques and sedation options ensure a comfortable, stress-free experience for all patients." },
  { icon: Microscope, title: "Modern Techniques", description: "From laser treatments to digital imaging, we invest in cutting-edge technology to provide the most effective and efficient care." },
  { icon: Clock, title: "Flexible Scheduling", description: "Early morning, evening, and weekend appointments to fit your busy lifestyle. Emergency same-day visits available." },
  { icon: Stethoscope, title: "Comprehensive Care", description: "From routine cleanings to complex restorations, our team provides complete dental services under one roof." },
]

export function HomeOurMotivation() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">Our Promise to You</p>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Our Commitment to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Your Smile</span>
            </h2>

            <div className="prose prose-lg prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed">
                At SmileCare, we believe that everyone deserves a healthy, beautiful smile.
                Our mission goes beyond treating dental issues — we&apos;re dedicated to preventing them
                through education, preventive care, and empowering our patients with knowledge about oral health.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                We combine artistry with science to deliver results that not only improve your
                dental health but boost your confidence and overall well-being. Every smile we
                create is a testament to our passion for excellence in dentistry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {motivations.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <MotivationDecorativePanel />
        </div>
      </div>
    </section>
  )
}
