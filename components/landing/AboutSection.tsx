"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, FileText, Home, TrendingUp } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

const features = [
  {
    icon: Shield,
    title: "100% Legal Employment",
    description:
      "Every placement comes with a proper work permit and legal contract. No grey areas.",
  },
  {
    icon: FileText,
    title: "Document Assistance",
    description:
      "Our team guides you through every document, from visa application to tax registration.",
  },
  {
    icon: Home,
    title: "Accommodation Support",
    description:
      "We help you find and arrange accommodation before you even arrive in Poland.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Many of our placements become long-term roles with clear paths for advancement.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#F1EFE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left image collage */}
          <div className="relative h-[560px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 left-0 w-[65%] h-[55%] overflow-hidden border-4 border-white shadow-xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="Construction workers Poland"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute bottom-0 right-0 w-[60%] h-[50%] overflow-hidden border-4 border-white shadow-xl"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
                alt="Office workers"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Center accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A56DB] border-4 border-white p-6 z-20 shadow-xl"
            >
              <p className="font-heading text-3xl font-800 text-white text-center">
                {siteInfo.founded}
              </p>
              <p className="font-mono text-xs text-white/70 text-center uppercase tracking-widest mt-1">
                Founded
              </p>
            </motion.div>
          </div>

          {/* Right content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
                — About Us
              </p>
              <h2 className="font-heading font-800 text-4xl sm:text-5xl text-[#2C2C2A] leading-tight mb-6">
                Poland&apos;s Most Trusted
                <br />
                <span className="text-[#185FA5]">Recruitment Partner</span>
              </h2>
              <p className="text-[#5F5E5A] leading-relaxed mb-6 text-base">
                Since {siteInfo.founded}, {siteInfo.name} has connected workers
                from across the world with reputable Polish employers. We handle
                the complexity so you can focus on building your future.
              </p>
              <p className="text-[#5F5E5A] leading-relaxed mb-8 text-base">
                From the moment you apply to the day you receive your first
                paycheck, our team is with you every step of the way.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {siteInfo.stats.slice(0, 4).map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-[#D3D1C7] bg-white p-4"
                  >
                    <p className="font-heading text-2xl font-700 text-[#185FA5]">
                      {stat.value}
                    </p>
                    <p className="text-[#5F5E5A] text-xs mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features grid */}
        <div className="border border-[#D3D1C7]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D3D1C7]">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8 bg-white hover:bg-[#E6F1FB] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-[#185FA5] flex items-center justify-center mb-5 group-hover:bg-[#1A56DB] transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-700 text-base text-[#2C2C2A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#5F5E5A] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
