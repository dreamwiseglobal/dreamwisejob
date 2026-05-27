import Image from "next/image";
import Link from "next/link";
import { Briefcase, FileCheck2, Handshake, Shield, Users } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

const highlights = [
  {
    icon: Shield,
    title: "Compliance First",
    description:
      "Verified employers, legal contracts, and clear documentation at every step.",
  },
  {
    icon: Handshake,
    title: "Human Support",
    description:
      "A real team helps you prepare documents, interviews, and onboarding in Poland.",
  },
  {
    icon: FileCheck2,
    title: "Document Guidance",
    description:
      "From work permits to tax registration, we help you avoid delays and mistakes.",
  },
  {
    icon: Briefcase,
    title: "Better Matches",
    description:
      "We focus on roles that fit your skills, goals, and timeline — not one-size-fits-all.",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "Clear job details, salary ranges, and expectations so you can decide confidently.",
  },
  {
    title: "Speed",
    description:
      "A streamlined process that reduces back-and-forth and keeps applications moving.",
  },
  {
    title: "Trust",
    description:
      "Long-term relationships with employers and a support-first mindset for workers.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F1EFE8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1A56DB]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-3">
                About {siteInfo.name}
              </p>
              <h1 className="font-heading font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                A job portal built for
                <br />
                <span className="text-[#5DCAA5]">safe work in Poland</span>
              </h1>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
                {siteInfo.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="border border-white/20 bg-white/10 px-4 py-3">
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-widest">
                    Founded
                  </p>
                  <p className="font-heading text-2xl font-800 text-white">
                    {siteInfo.founded}
                  </p>
                </div>
                <div className="border border-white/20 bg-white/10 px-4 py-3">
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-widest">
                    Active Jobs
                  </p>
                  <p className="font-heading text-2xl font-800 text-white">
                    {siteInfo.totalJobs}
                  </p>
                </div>
                <div className="border border-white/20 bg-white/10 px-4 py-3">
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-widest">
                    Workers Placed
                  </p>
                  <p className="font-heading text-2xl font-800 text-white">
                    {siteInfo.totalPlaced}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 bg-[#1D9E75] text-white px-7 py-3.5 font-semibold text-sm hover:bg-[#0F6E56] transition-colors duration-200 border-2 border-[#1D9E75] hover:border-[#0F6E56]"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 font-semibold text-sm hover:bg-white hover:text-[#1A56DB] transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className="relative w-full aspect-[4/3] overflow-hidden border-4 border-white shadow-2xl"
                style={{
                  clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
                  alt="Recruitment support"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[#1A56DB]/20" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white border border-[#D3D1C7] p-5 shadow-xl w-[260px]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#185FA5] flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest">
                      Trusted by
                    </p>
                    <p className="font-heading text-2xl font-800 text-[#1A56DB] leading-none mt-1">
                      {siteInfo.totalEmployers}
                    </p>
                    <p className="text-[#5F5E5A] text-xs mt-1">
                      Employers across Poland
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-4 -right-4 w-24 h-24 bg-[#5DCAA5] opacity-20"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
              What makes us different
            </p>
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-[#2C2C2A] leading-tight">
              Simple, legal, and supported
            </h2>
            <p className="text-[#5F5E5A] leading-relaxed mt-4">
              We combine verified listings with hands-on support so you can move
              from application to arrival with confidence.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="border border-[#D3D1C7] bg-white p-7 hover:bg-[#E6F1FB] transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-[#185FA5] flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-700 text-base text-[#2C2C2A] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5F5E5A] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values + Process */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 border border-[#D3D1C7] bg-white p-8">
              <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
                Our values
              </p>
              <h2 className="font-heading font-800 text-3xl text-[#2C2C2A] leading-tight">
                Built on clarity and care
              </h2>
              <div className="mt-6 space-y-5">
                {values.map((v) => (
                  <div key={v.title} className="border-t border-[#E7E5DC] pt-5">
                    <p className="font-heading font-700 text-[#185FA5]">
                      {v.title}
                    </p>
                    <p className="text-[#5F5E5A] text-sm leading-relaxed mt-1">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#D3D1C7] bg-[#FBFAF7] p-8">
              <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
                How we work
              </p>
              <h2 className="font-heading font-800 text-3xl text-[#2C2C2A] leading-tight">
                A guided path from apply to start
              </h2>

              <ol className="mt-8 space-y-4">
                {siteInfo.howItWorks.map((step) => (
                  <li
                    key={step.step}
                    className="bg-white border border-[#D3D1C7] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 bg-[#1A56DB] text-white flex items-center justify-center font-heading font-800">
                        {step.step}
                      </div>
                      <div>
                        <p className="font-heading font-700 text-[#2C2C2A]">
                          {step.title}
                        </p>
                        <p className="text-[#5F5E5A] text-sm leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 bg-[#185FA5] text-white px-6 py-3 font-semibold text-sm hover:bg-[#1A56DB] transition-colors duration-200"
                >
                  Start browsing jobs
                </Link>
                <span className="text-[#5F5E5A] text-sm">
                  Questions?{" "}
                  <Link href="/contact" className="text-[#1A56DB] underline">
                    Talk to our team
                  </Link>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
