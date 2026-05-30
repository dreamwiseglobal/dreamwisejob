export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "@/lib/jobs-data";
import JobDetailApply from "@/components/jobs/JobDetailApply";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} — ${job.location}`,
    description: job.overview,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <main className="bg-[#F1EFE8] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href="/jobs" className="text-sm text-[#185FA5] hover:underline">
            ← Back to jobs
          </Link>
          <JobDetailApply
            job={job}
            className="inline-flex items-center justify-center bg-[#185FA5] text-white px-4 py-2 text-sm font-semibold hover:bg-[#1A56DB] transition-colors"
          >
            Apply Now
          </JobDetailApply>
        </div>

        <section className="bg-white border border-[#D3D1C7]">
          <header className="p-6 border-b border-[#D3D1C7]">
            <div className="flex flex-wrap gap-2 mb-3">
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
              <span className="border border-[#D3D1C7] text-[#5F5E5A] text-xs font-mono uppercase tracking-wide px-2 py-0.5">
                {job.category}
              </span>
            </div>

            <h1 className="font-heading font-700 text-2xl text-[#2C2C2A] leading-tight">
              {job.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#5F5E5A]">
              <div>
                <span className="font-semibold text-[#2C2C2A]">Location:</span>{" "}
                {job.location}
              </div>
              <div>
                <span className="font-semibold text-[#2C2C2A]">Salary:</span>{" "}
                {job.currency}
                {job.salaryMin.toLocaleString()}–{job.currency}
                {job.salaryMax.toLocaleString()}/month
              </div>
              <div>
                <span className="font-semibold text-[#2C2C2A]">Contract:</span>{" "}
                {job.contractType}
              </div>
              <div>
                <span className="font-semibold text-[#2C2C2A]">Schedule:</span>{" "}
                {job.workSchedule}
              </div>
            </div>
          </header>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-2">
                  Overview
                </p>
                <p className="text-sm text-[#5F5E5A] leading-relaxed">
                  {job.overview}
                </p>
              </div>

              <div>
                <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-2">
                  Responsibilities
                </p>
                <ul className="space-y-2">
                  {job.description.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[#5F5E5A]"
                    >
                      <div className="w-1.5 h-1.5 bg-[#378ADD] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-2">
                  Requirements
                </p>
                <ul className="space-y-2">
                  {job.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[#5F5E5A]"
                    >
                      <div className="w-1.5 h-1.5 bg-[#1D9E75] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="border border-[#D3D1C7] p-4">
                <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-3">
                  Highlights
                </p>
                <div className="space-y-2 text-sm text-[#5F5E5A]">
                  <div>
                    <span className="font-semibold text-[#2C2C2A]">
                      Experience:
                    </span>{" "}
                    {job.experienceLevel}
                  </div>
                  <div>
                    <span className="font-semibold text-[#2C2C2A]">
                      Language:
                    </span>{" "}
                    {job.language}
                  </div>
                  <div>
                    <span className="font-semibold text-[#2C2C2A]">
                      Accommodation:
                    </span>{" "}
                    {job.accommodation}
                  </div>
                </div>
              </div>

              <div className="border border-[#D3D1C7] p-4">
                <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-3">
                  Benefits
                </p>
                <ul className="space-y-2">
                  {job.benefits.map((benefit) => (
                    <li key={benefit} className="text-sm text-[#5F5E5A]">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <JobDetailApply
                job={job}
                className="w-full inline-flex items-center justify-center bg-[#185FA5] text-white px-4 py-3 text-sm font-semibold hover:bg-[#1A56DB] transition-colors"
              >
                Apply Now
              </JobDetailApply>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
