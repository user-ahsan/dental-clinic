"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, Stethoscope, Microscope } from "lucide-react";

const motivations = [
  {
    icon: Sparkles,
    title: "Pain-Free Dentistry",
    description: "We understand dental anxiety. Our gentle techniques and sedation options ensure a comfortable, stress-free experience for all patients.",
  },
  {
    icon: Microscope,
    title: "Modern Techniques",
    description: "From laser treatments to digital imaging, we invest in cutting-edge technology to provide the most effective and efficient care.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Early morning, evening, and weekend appointments to fit your busy lifestyle. Emergency same-day visits available.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Care",
    description: "From routine cleanings to complex restorations, our team provides complete dental services under one roof.",
  },
];

export function HomeOurMotivation() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
              Our Promise to You
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Our Commitment to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Your Smile
              </span>
            </h2>
            
            <div className="prose prose-lg prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed">
                At SmileCare, we believe that everyone deserves a healthy, beautiful smile. 
                Our mission goes beyond treating dental issues — we&apos;re dedicated to preventing them 
                through education, preventive care, and empowering our patients with knowledge 
                about oral health.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                We combine artistry with science to deliver results that not only improve your 
                dental health but boost your confidence and overall well-being. Every smile we 
                create is a testament to our passion for excellence in dentistry.
              </p>
            </div>

            {/* Motivation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {motivations.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Decorative Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-3xl transform -rotate-3" />
              
              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-blue-500/10 border border-slate-100">
                {/* Quote */}
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <blockquote className="text-xl lg:text-2xl font-medium text-slate-900 italic">
                    &quot;We don&apos;t just fix teeth — we create smiles that transform lives.&quot;
                  </blockquote>
                </div>

                {/* Decorative dental illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-6xl">🦷</span>
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full"
                      style={{ filter: "blur(20px)" }}
                    />
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex justify-center gap-8 pt-6 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">25+</p>
                    <p className="text-xs text-slate-500">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">50+</p>
                    <p className="text-xs text-slate-500">Dental Awards</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">99%</p>
                    <p className="text-xs text-slate-500">Would Recommend</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100"
              >
                <span className="text-sm font-semibold text-slate-700">ADA Certified</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 rounded-full shadow-lg"
              >
                <span className="text-sm font-semibold text-white">Top Rated ⭐</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
