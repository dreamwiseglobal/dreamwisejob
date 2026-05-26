"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteInfo } from "@/lib/site-info";
import { ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
              — Process
            </p>
            <h2 className="font-heading font-800 text-4xl sm:text-5xl text-[#2C2C2A] leading-tight">
              Three Steps to
              <br />
              <span className="text-[#185FA5]">Work in Poland</span>
            </h2>
          </div>
          <p className="text-[#5F5E5A] text-base leading-relaxed lg:max-w-sm">
            Our streamlined process ensures you get from application to first
            day without the usual hassle of international employment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#D3D1C7]">
          {siteInfo.howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 border-b lg:border-b-0 border-[#D3D1C7] ${i < 2 ? "lg:border-r" : ""} group hover:bg-[#E6F1FB] transition-colors duration-300 relative`}
            >
              <span className="font-mono text-7xl font-500 text-[#E6F1FB] group-hover:text-[#B5D4F4] absolute top-6 right-6 transition-colors duration-300 leading-none">
                {step.step}
              </span>
              <div className="w-10 h-1 bg-[#1D9E75] mb-6" />
              <h3 className="font-heading font-700 text-xl text-[#2C2C2A] mb-3">
                {step.title}
              </h3>
              <p className="text-[#5F5E5A] text-sm leading-relaxed">
                {step.description}
              </p>
              {i < 2 && (
                <ArrowRight className="w-5 h-5 text-[#B5D4F4] absolute bottom-6 right-6 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Image row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-72 overflow-hidden"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Team reviewing applications"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#185FA5]/30" />
            <div className="absolute bottom-6 left-6 bg-white border border-[#D3D1C7] px-4 py-2">
              <p className="font-heading text-sm font-700 text-[#2C2C2A]">
                Fast Processing
              </p>
              <p className="font-mono text-xs text-[#5F5E5A]">
                48h average response
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-72 overflow-hidden"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              alt="Workers arriving in Poland"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0F6E56]/30" />
            <div className="absolute bottom-6 right-6 bg-white border border-[#D3D1C7] px-4 py-2">
              <p className="font-heading text-sm font-700 text-[#2C2C2A]">
                Fully Legal
              </p>
              <p className="font-mono text-xs text-[#5F5E5A]">
                Work permits handled
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
