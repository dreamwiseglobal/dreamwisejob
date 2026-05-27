"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#1A56DB] overflow-hidden flex items-center">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#185FA5] opacity-40"
        style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pb-24 lg:pt-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-[#5DCAA5]" />
              <span className="font-mono text-xs text-white/70 uppercase tracking-widest">
                Based in Poland
              </span>
              <div className="flex-1 h-px bg-white/20 ml-2" />
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-heading font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-6"
            >
              Work in
              <br />
              <span className="text-[#5DCAA5]">Poland.</span>
              <br />
              Build Your
              <br />
              Future.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-md font-body"
            >
              {siteInfo.description}
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/jobs"
                className="group flex items-center gap-2 bg-[#1D9E75] text-white px-7 py-3.5 font-semibold text-sm hover:bg-[#0F6E56] transition-all duration-200 border-2 border-[#1D9E75] hover:border-[#0F6E56]"
              >
                Browse Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 font-semibold text-sm hover:bg-white hover:text-[#1A56DB] transition-all duration-200"
              >
                Hire Workers
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-5">
              {[
                "Legal Work Permits",
                "Accommodation Support",
                "Medical Insurance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-white/70 text-xs font-body"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#5DCAA5]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image with clip-path */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div
              className="relative w-full aspect-[4/5] overflow-hidden"
              style={{ clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Workers in Poland"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#1A56DB]/20" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="absolute -bottom-6 -left-8 bg-white border border-[#D3D1C7] p-5 shadow-2xl z-20 w-52"
            >
              <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-1">
                Total Placed
              </p>
              <p className="font-heading text-3xl font-800 text-[#1A56DB]">
                {siteInfo.totalPlaced}
              </p>
              <p className="text-[#5F5E5A] text-xs mt-1 font-body">
                Workers across Europe
              </p>
            </motion.div>

            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#5DCAA5] opacity-20"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#185FA5] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {siteInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp(0.5 + i * 0.1)}
                className="py-5 px-6 text-center"
              >
                <p className="font-heading text-2xl font-700 text-white">
                  {stat.value}
                </p>
                <p className="text-white/60 text-xs mt-0.5 font-body">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
