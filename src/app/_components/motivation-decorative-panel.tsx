"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function MotivationDecorativePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="flex-1 relative"
    >
      <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-3xl transform rotate-6" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-3xl transform -rotate-3" />

        <div className="relative bg-white rounded-xl p-5 sm:p-8 shadow-[var(--shadow-2xl)] border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4" aria-hidden="true">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <blockquote className="text-lg md:text-xl lg:text-2xl font-medium text-slate-900 italic">
              &quot;We don&apos;t just fix teeth — we create smiles that transform lives.&quot;
            </blockquote>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center" aria-hidden="true">
                <span className="text-5xl">🦷</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full blur-xl"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 sm:gap-8 pt-6 border-t border-slate-100">
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-900">25+</p>
              <p className="text-xs text-slate-500">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-900">50+</p>
              <p className="text-xs text-slate-500">Dental Awards</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-slate-900">99%</p>
              <p className="text-xs text-slate-500">Would Recommend</p>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-[var(--shadow-md)] border border-slate-100"
        >
          <span className="text-sm font-semibold text-slate-700">ADA Certified</span>
        </motion.div>

        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 rounded-full shadow-[var(--shadow-blue-md)]"
        >
          <span className="text-sm font-semibold text-white">Top Rated ⭐</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
