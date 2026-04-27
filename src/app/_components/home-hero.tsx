"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/10 rounded-full blur-3xl" />
      
      {/* Additional decorative circles */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-32 right-1/4 w-4 h-4 bg-blue-500/40 rounded-full"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-40 left-1/4 w-3 h-3 bg-emerald-500/40 rounded-full"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-500/50 rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
              >
                Welcome to SmileCare Clinic
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
              >
                Your Smile,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                  Our Passion
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0"
              >
                Experience exceptional dental care with our team of dedicated professionals. 
                We combine cutting-edge technology with compassionate service to give you the smile you deserve.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 py-6"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">10K+</p>
                <p className="text-sm text-slate-500">Happy Patients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">15+</p>
                <p className="text-sm text-slate-500">Expert Dentists</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500">Satisfaction</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 gap-2"
              >
                View Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right decorative image/illustration area */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-pulse" />
              <div className="absolute inset-4 border-2 border-emerald-200 rounded-full" />
              <div className="absolute inset-8 border-2 border-cyan-200 rounded-full" />
              
              {/* Center gradient circle */}
              <div className="absolute inset-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white p-6">
                  <p className="text-5xl font-bold">🦷</p>
                  <p className="mt-2 font-semibold">SmileCare</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg"
              >
                <p className="text-green-500 font-bold text-lg">✓</p>
                <p className="text-xs text-slate-600">Certified</p>
              </motion.div>
              
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <p className="text-blue-500 font-bold text-lg">⭐</p>
                <p className="text-xs text-slate-600">5.0 Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
}
