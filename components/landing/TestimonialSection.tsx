"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Oleksiy M.",
    origin: "Ukraine",
    role: "Warehouse Worker",
    quote:
      "PracaPolska handled everything from my visa to finding me accommodation. I started work within three weeks of applying.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Ramesh K.",
    origin: "Nepal",
    role: "Factory Worker",
    quote:
      "I was nervous about working abroad but the team guided me through every document. Now I have a stable income and good living conditions.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Ahmed S.",
    origin: "Pakistan",
    role: "Construction Helper",
    quote:
      "Honest, professional, and fast. I recommend PracaPolska to anyone looking for legitimate work in Poland.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-24 bg-[#2C2C2A] relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #ffffff 0px,
              #ffffff 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-[#5DCAA5] uppercase tracking-widest mb-3">
              — Testimonials
            </p>
            <h2 className="font-heading font-800 text-4xl sm:text-5xl text-white">
              Workers Who Made It
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <Quote className="w-8 h-8 text-[#5DCAA5] mb-4 opacity-60" />
                <p className="text-white/80 text-sm leading-relaxed mb-6 font-body">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="relative w-10 h-10 overflow-hidden shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-700 text-white text-sm">
                      {t.name}
                    </p>
                    <p className="font-mono text-xs text-[#5DCAA5]">
                      {t.role} · {t.origin}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#1D9E75] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.3) 75%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-800 text-3xl sm:text-4xl text-white leading-tight">
                Ready to Work in Poland?
                <br />
                Apply Today.
              </h2>
              <p className="text-white/80 text-sm mt-3 font-body">
                Free to apply. No hidden fees. Legal employment guaranteed.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/jobs"
                className="group flex items-center gap-2 bg-white text-[#0F6E56] px-8 py-4 font-semibold text-sm hover:bg-[#E1F5EE] transition-colors duration-200"
              >
                View All Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 border-2 border-white text-white px-8 py-4 font-semibold text-sm hover:bg-white hover:text-[#0F6E56] transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
