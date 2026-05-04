"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[37.5rem] bg-cyan-300/10 rounded-full blur-3xl" />
      
      <div className="absolute top-32 right-1/4 w-4 h-4 bg-blue-500/40 rounded-full" />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-emerald-500/40 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-500/50 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16">
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
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight drop-shadow-sm"
              >
                Your Smile,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 drop-shadow-sm">
                  Our Passion
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Experience exceptional dental care with our team of dedicated professionals. 
                We combine cutting-edge technology with compassionate service to give you the smile you deserve.
              </motion.p>
            </div>

<motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 py-6"
            >
              <div className="text-center">
                <p className="text-2xl font-extrabold text-slate-900 drop-shadow-sm">10K+</p>
                <p className="text-sm text-slate-600">Happy Patients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-slate-900 drop-shadow-sm">15+</p>
                <p className="text-sm text-slate-600">Expert Dentists</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-slate-900 drop-shadow-sm">98%</p>
                <p className="text-sm text-slate-600">Satisfaction</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/booking">
                <Button 
                  size="lg" 
                  variant="default"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  View Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/20 bg-slate-100">
                <Image
                  src="/images/hero/hero.jpg"
                  alt="SmileCare Clinic Hero - Professional dental care team"
                  width={600}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAgJCgcB/8QAKBAAAQQCAgEDBQEBAAAAAAAAAwQFBgIHCAkACREWITEyMzZB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwEC/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAECAxEhBP/aAAwDAQACEQMRAD8A3/H0NYEIgJNCo40OHj5/Bn7sbM8kYpnM34Ebr1VKPDNZE8zMv8mEIC3j7DKYsMe1MZt2rF1bJmZBUq0lgO6y6vXKrqNYm9ZaW6BXjRS1FuLeet6PbPmuaKnaNbANOKtkDdv4v4hW/mhXm/jX0t+n6D/w+n6Dq5zQ6ZXDZTRuNk0f8C3XQ6XW+g3Bz/RmMM5mEoIxiPb6pPC7s++RbCXbEPRauThEx3azLml9G11tBdSWhtWubf/ZXfV0si0yX1I2WlDTLRSUdI71YpN5fXUu23TJC3TFPuwk0pS0jC2s0a3L/qioUGd2Hf5Zcf/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 120C120 80 240 100 360 90C480 80 600 40 720 50C840 60 960 90 1080 85C1200 80 1320 60 1380 55L1440 50V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white"
          />
          <path
            d="M0 90C120 50 240 70 360 60C480 50 600 20 720 30C840 40 960 70 1080 65C1200 60 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-slate-100/50"
          />
        </svg>
      </div>
    </section>
  );
}