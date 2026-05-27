"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { jobs, jobCategories, type Job } from "@/lib/jobs-data";
import JobCard from "@/components/landing/JobCard";
import { Search } from "lucide-react";
import ApplyDrawer from "@/components/jobs/ApplyDrawer";

export default function JobsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const filtered: Job[] = jobs.filter((job) => {
    const matchesCategory =
      activeCategory === "All" || job.category === activeCategory;
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="jobs" className="py-24 bg-[#F1EFE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
              — Open Positions
            </p>
            <h2 className="font-heading font-800 text-4xl sm:text-5xl text-[#2C2C2A] leading-tight">
              Jobs Available
              <br />
              <span className="text-[#185FA5]">Right Now</span>
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#5F5E5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search job title or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-[#D3D1C7] pl-10 pr-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#185FA5] transition-colors duration-200 font-body"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-[#D3D1C7] pb-6">
          {jobCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wide border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#185FA5] text-white border-[#185FA5]"
                  : "bg-white text-[#5F5E5A] border-[#D3D1C7] hover:border-[#378ADD] hover:text-[#185FA5]"
              }`}
            >
              {cat}
            </button>
          ))}
          {filtered.length !== jobs.length && (
            <span className="ml-auto font-mono text-xs text-[#5F5E5A] self-center">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                onApply={(picked) => {
                  setActiveJob(picked);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center border border-[#D3D1C7] bg-white"
          >
            <p className="font-heading text-lg text-[#5F5E5A]">
              No jobs found.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setQuery("");
              }}
              className="mt-4 text-[#185FA5] text-sm underline font-body"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#5F5E5A] text-sm mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#185FA5] text-[#185FA5] px-8 py-3 text-sm font-semibold hover:bg-[#185FA5] hover:text-white transition-all duration-200"
          >
            Send Your CV Directly
          </a>
        </div>
      </div>
      <ApplyDrawer
        job={activeJob}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
