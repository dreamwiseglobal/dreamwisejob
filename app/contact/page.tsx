import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteInfo } from "@/lib/site-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact — ${siteInfo.name}`,
  description:
    "Get in touch with PracaPolska to apply for jobs or hire workers in Poland.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-[#1A56DB] pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-[#5DCAA5] uppercase tracking-widest mb-3">
            — Get in Touch
          </p>
          <h1 className="font-heading font-800 text-4xl sm:text-5xl text-white leading-tight">
            Contact Us
          </h1>
          <p className="text-white/70 text-base mt-4 max-w-lg font-body">
            Apply for a job, ask a question, or reach out to hire workers for
            your business in Poland.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#F1EFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-[#D3D1C7] p-8">
                <h2 className="font-heading font-700 text-xl text-[#2C2C2A] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#E6F1FB] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#185FA5]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-wide mb-0.5">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteInfo.email}`}
                        className="text-sm text-[#2C2C2A] hover:text-[#185FA5] transition-colors font-body"
                      >
                        {siteInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#E6F1FB] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#185FA5]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-wide mb-0.5">
                        Phone
                      </p>
                      <a
                        href={`tel:${siteInfo.phone}`}
                        className="text-sm text-[#2C2C2A] hover:text-[#185FA5] transition-colors font-body"
                      >
                        {siteInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#E6F1FB] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#185FA5]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-wide mb-0.5">
                        Address
                      </p>
                      <p className="text-sm text-[#2C2C2A] font-body leading-relaxed">
                        {siteInfo.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#E6F1FB] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#185FA5]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-wide mb-0.5">
                        Hours
                      </p>
                      <p className="text-sm text-[#2C2C2A] font-body">
                        Mon – Fri: 9:00 – 18:00
                      </p>
                      <p className="text-sm text-[#5F5E5A] font-body">
                        Sat: 10:00 – 14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A56DB] border border-[#185FA5] p-8">
                <h3 className="font-heading font-700 text-lg text-white mb-3">
                  For Employers
                </h3>
                <p className="text-white/70 text-sm font-body leading-relaxed mb-4">
                  Looking to hire international workers for your business in
                  Poland? We can source, vet, and onboard candidates for you.
                </p>
                <a
                  href={`mailto:${siteInfo.email}?subject=Employer%20Inquiry`}
                  className="inline-flex items-center gap-2 border border-white/40 text-white text-sm px-4 py-2.5 hover:bg-white hover:text-[#1A56DB] transition-all duration-200 font-body"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Employer Inquiry
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="bg-white border border-[#D3D1C7] p-8 animate-pulse h-96" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
