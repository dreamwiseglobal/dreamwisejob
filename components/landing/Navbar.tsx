"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Briefcase } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"pl" | "en">(() => {
    if (typeof window === "undefined") return "pl";
    return (sessionStorage.getItem("lang-current") as "pl" | "en") ?? "pl";
  });
  useEffect(() => {
    // 1. Kill banner by removing the body top offset Google injects
    const styleObserver = new MutationObserver(() => {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
    });
    styleObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const savedLang = sessionStorage.getItem("lang-current") as
      | "pl"
      | "en"
      | null;
    const targetLang = savedLang ?? "pl";

    if (targetLang === "pl") {
      const tryAutoSwitch = (attempts = 0) => {
        const select =
          document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select && select.options.length > 1) {
          select.value = "pl";
          select.dispatchEvent(new Event("change"));
          sessionStorage.setItem("lang-current", "pl");
        } else if (attempts < 30) {
          setTimeout(() => tryAutoSwitch(attempts + 1), 300);
        }
      };
      tryAutoSwitch();
    }
    // Keep scroll handler
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);

    return () => {
      styleObserver.disconnect();
      window.removeEventListener("scroll", handler);
    };
  }, []);
  const switchLang = (target: "pl" | "en") => {
    setLang(target);
    sessionStorage.setItem("lang-current", target);

    if (target === "en") {
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname;
      window.location.reload();
    } else {
      const trySwitch = (attempts = 0) => {
        const select =
          document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select && select.options.length > 1) {
          select.value = "pl";
          select.dispatchEvent(new Event("change"));
        } else if (attempts < 15) {
          setTimeout(() => trySwitch(attempts + 1), 200);
        }
      };
      trySwitch();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1A56DB] ${scrolled ? "shadow-lg" : ""}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#1A56DB]" />
            </div>
            <span className="font-heading font-800 text-xl text-white tracking-tight">
              {siteInfo.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {siteInfo.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-blue-pale hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#5DCAA5] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <LangToggle lang={lang} onSwitch={switchLang} />

            <Link
              href="/contact"
              className="bg-[#1D9E75] text-white px-5 py-2 text-sm font-semibold hover:bg-[#0F6E56] transition-colors duration-200 border border-[#1D9E75] hover:border-[#0F6E56]"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#185FA5] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {siteInfo.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white text-sm font-medium py-2 border-b border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="py-2">
                <LangToggle lang={lang} onSwitch={switchLang} />
              </div>
              <Link
                href="/contact"
                className="bg-[#1D9E75] text-white px-4 py-2.5 text-sm font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Post a Job
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Google Translate element — kept for the programmatic API */}
      <div
        className="absolute -top-[9999px] -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <div id="google_translate_element" />
      </div>
    </header>
  );
}
function LangToggle({
  lang,
  onSwitch,
}: {
  lang: "pl" | "en";
  onSwitch: (l: "pl" | "en") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = [
    { code: "pl" as const, flag: "🇵🇱", label: "Polish" },
    { code: "en" as const, flag: "🇬🇧", label: "English" },
  ];

  const current = options.find((o) => o.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/35 rounded text-white text-sm font-medium min-w-[110px] justify-between transition-colors"
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <span className="flex-1 text-left text-xs">{current.label}</span>
        <span
          className={`text-[10px] opacity-70 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-[calc(100%+6px)] left-0 bg-[#1a3a6b] border border-white/20 rounded overflow-hidden min-w-[130px] z-50 shadow-xl"
          >
            {options.map((o) => (
              <button
                key={o.code}
                onClick={() => {
                  onSwitch(o.code);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-xs transition-colors ${
                  lang === o.code
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="text-lg leading-none">{o.flag}</span>
                <span className="flex-1 text-left">{o.label}</span>
                {lang === o.code && (
                  <span className="text-[#5DCAA5] text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
