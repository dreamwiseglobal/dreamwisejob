"use client";

import { motion } from "framer-motion";
import { Award, Users, Zap, Globe } from "lucide-react";

const trustPoints = [
  { icon: Award, label: "ISO Certified Recruitment", value: "Certified" },
  { icon: Users, label: "Dedicated Support Team", value: "24/7" },
  { icon: Zap, label: "Application Processing", value: "48 Hours" },
  { icon: Globe, label: "Countries Served", value: "32+" },
];

export default function TrustSection() {
  return (
    <section className="bg-[#E6F1FB] border-y border-[#D3D1C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#D3D1C7]">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="py-8 px-6 text-center group hover:bg-white transition-colors duration-200"
            >
              <point.icon className="w-5 h-5 text-[#185FA5] mx-auto mb-3" />
              <p className="font-heading font-700 text-xl text-[#2C2C2A]">
                {point.value}
              </p>
              <p className="font-body text-xs text-[#5F5E5A] mt-1">
                {point.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
