import Link from "next/link";
import { Home, Search, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

const quickLinks = [
  { label: "Browse All Jobs", href: "/#jobs", icon: Briefcase },
  { label: "How It Works", href: "/#how-it-works", icon: Search },
  { label: "Contact Us", href: "/contact", icon: MapPin },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F1EFE8] flex flex-col">
      {/* Minimal header */}
      <header className="bg-[#1A56DB] px-4 sm:px-8 py-4">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-white flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-[#1A56DB]" />
          </div>
          <span
            className="font-heading text-lg text-white tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {siteInfo.name}
          </span>
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white border border-[#D3D1C7]">
            {/* Top accent bar */}
            <div className="h-1 bg-[#1A56DB]" />

            <div className="p-8 sm:p-12">
              {/* 404 display */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[#D3D1C7]">
                <div className="shrink-0">
                  <p
                    className="font-heading leading-none text-[#E6F1FB]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(80px, 15vw, 120px)",
                      lineHeight: 1,
                    }}
                  >
                    404
                  </p>
                </div>
                <div className="pt-2">
                  <div className="w-8 h-0.5 bg-[#1D9E75] mb-3" />
                  <h1
                    className="font-heading text-2xl sm:text-3xl text-[#2C2C2A] leading-tight mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Page Not Found
                  </h1>
                  <p
                    className="text-[#5F5E5A] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    The page you are looking for does not exist, was moved, or
                    the link may be incorrect.
                  </p>
                </div>
              </div>

              {/* Quick links */}
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-widest text-[#5F5E5A] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  — Try these instead
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {quickLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group flex items-center gap-3 border border-[#D3D1C7] bg-[#F1EFE8] px-4 py-3 hover:border-[#185FA5] hover:bg-[#E6F1FB] transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 text-[#185FA5] shrink-0" />
                      <span
                        className="text-sm text-[#2C2C2A] font-medium leading-tight"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B5D4F4] ml-auto group-hover:text-[#185FA5] group-hover:translate-x-0.5 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Primary CTA */}
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-[#185FA5] text-white py-3.5 text-sm font-semibold hover:bg-[#1A56DB] transition-colors duration-200 w-full group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Home className="w-4 h-4" />
                Back to Homepage
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="text-center text-xs text-[#5F5E5A] mt-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            If you believe this is a mistake, please{" "}
            <Link
              href="/contact"
              className="text-[#185FA5] underline underline-offset-2 hover:text-[#1A56DB] transition-colors"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="border-t border-[#D3D1C7] px-4 sm:px-8 py-4 bg-white">
        <p
          className="text-xs text-[#5F5E5A] text-center"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
