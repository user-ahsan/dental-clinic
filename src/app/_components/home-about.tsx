"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Cpu, Award, Users, User, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Advanced Safety",
    description: "State-of-the-art sterilization and safety protocols to ensure your well-being during every visit.",
  },
  {
    icon: Heart,
    title: "Gentle Care",
    description: "Compassionate approach with pain-free treatments designed to ease dental anxiety.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description: "Latest dental equipment and techniques for precise diagnostics and effective treatments.",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Board-certified specialists with years of experience in comprehensive dental care.",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Patients" },
  { icon: User, value: "15+", label: "Expert Dentists" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction Rate" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export function HomeAbout() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              SmileCare?
            </span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We combine expertise, technology, and compassion to deliver exceptional dental experiences 
            that keep our patients smiling confidently.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group bg-slate-50 rounded-xl p-6 md:p-5 lg:p-8 active:bg-gradient-to-br active:from-blue-50 active:to-emerald-50 transition-all duration-300 active:shadow-[var(--shadow-blue-xl)] border border-slate-100 active:border-blue-200 tap-highlight-transparent"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-5 group-active:scale-110 transition-transform duration-300" aria-hidden="true">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 rounded-xl p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4" aria-hidden="true">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-blue-100 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
