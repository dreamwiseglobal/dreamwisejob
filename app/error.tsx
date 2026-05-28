"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Home,
  AlertTriangle,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { siteInfo } from "@/lib/site-info";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F1EFE8] flex flex-col">
      {/* Minimal header */}
      <header className="bg-[#1A56DB] px-4 sm:px-8 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
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
            {/* Top accent — amber for warning */}
            <div className="h-1 bg-[#EF9F27]" />

            <div className="p-8 sm:p-12">
              {/* Error header */}
              <div className="flex items-start gap-5 mb-8 pb-8 border-b border-[#D3D1C7]">
                <div className="w-12 h-12 bg-[#EF9F27]/10 border border-[#EF9F27]/30 flex items-center justify-center shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-[#EF9F27]" />
                </div>
                <div>
                  <div className="w-8 h-0.5 bg-[#EF9F27] mb-3" />
                  <h1
                    className="font-heading text-2xl sm:text-3xl text-[#2C2C2A] leading-tight mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Something Went Wrong
                  </h1>
                  <p
                    className="text-[#5F5E5A] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    An unexpected error occurred. This has been noted and our
                    team will look into it. You can try again or return to the
                    homepage.
                  </p>
                </div>
              </div>

              {/* Error detail (only show digest, never raw message in prod) */}
              {error.digest && (
                <div className="bg-[#F1EFE8] border border-[#D3D1C7] px-4 py-3 mb-8 flex items-center gap-3">
                  <span
                    className="text-xs text-[#5F5E5A] uppercase tracking-widest shrink-0"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Error ID
                  </span>
                  <span
                    className="text-xs text-[#2C2C2A] font-medium truncate"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {error.digest}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 bg-[#185FA5] text-white py-3.5 text-sm font-semibold hover:bg-[#1A56DB] active:bg-[#0F6E56] transition-colors duration-200 group"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Try Again
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 border border-[#D3D1C7] bg-[#F1EFE8] text-[#2C2C2A] py-3.5 text-sm font-semibold hover:border-[#185FA5] hover:bg-[#E6F1FB] hover:text-[#185FA5] transition-all duration-200 group"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Home className="w-4 h-4" />
                  Go to Homepage
                  <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>

              {/* Support note */}
              <div className="mt-8 pt-6 border-t border-[#D3D1C7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p
                  className="text-xs text-[#5F5E5A]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Problem persisting? Reach our support team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-[#185FA5] font-semibold hover:text-[#1A56DB] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Contact Support
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="text-center text-xs text-[#5F5E5A] mt-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
