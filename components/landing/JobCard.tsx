"use client";

import { motion } from "framer-motion";
import { MapPin, Euro, CheckCircle, ArrowUpRight } from "lucide-react";
import type { Job } from "@/lib/jobs-data";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="bg-white border border-[#D3D1C7] group hover:border-[#185FA5] hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Card header */}
      <div className="p-6 pb-4 border-b border-[#D3D1C7] relative">
        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {job.urgent && (
            <span className="bg-[#EF9F27] text-white text-xs font-mono uppercase tracking-wide px-2 py-0.5">
              Urgent
            </span>
          )}
          {job.featured && (
            <span className="bg-[#B5D4F4] text-[#185FA5] text-xs font-mono uppercase tracking-wide px-2 py-0.5">
              Featured
            </span>
          )}
          <span className="border border-[#D3D1C7] text-[#5F5E5A] text-xs font-mono uppercase tracking-wide px-2 py-0.5 ml-auto">
            {job.category}
          </span>
        </div>

        <h3 className="font-heading font-700 text-lg text-[#2C2C2A] group-hover:text-[#185FA5] transition-colors duration-200 leading-tight mb-3">
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-[#5F5E5A] text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#378ADD]" />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5 text-[#1D9E75] text-xs font-semibold">
            <Euro className="w-3.5 h-3.5" />
            {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}
            /month
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="p-6 pt-4 pb-4 flex-1">
        <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-3">
          Responsibilities
        </p>
        <ul className="space-y-1.5">
          {job.description.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-[#5F5E5A]"
            >
              <div className="w-1 h-1 bg-[#378ADD] mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Benefits preview */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.benefits.slice(0, 3).map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-1 bg-[#E1F5EE] text-[#0F6E56] text-xs px-2 py-0.5"
            >
              <CheckCircle className="w-3 h-3" />
              {benefit}
            </div>
          ))}
          {job.benefits.length > 3 && (
            <div className="bg-[#E6F1FB] text-[#185FA5] text-xs px-2 py-0.5">
              +{job.benefits.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <Link
          href={`/contact?job=${encodeURIComponent(job.title)}`}
          className="w-full flex items-center justify-center gap-2 bg-[#185FA5] text-white py-3 text-sm font-semibold hover:bg-[#1A56DB] transition-colors duration-200 group/btn"
        >
          Apply Now
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </motion.article>
  );
}
