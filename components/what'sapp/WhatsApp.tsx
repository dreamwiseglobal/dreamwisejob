"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteInfo } from "@/lib/site-info";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = siteInfo.phone,
  message = "Hello! I'd like to get in touch.",
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col items-end gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="WhatsApp contact"
            className="flex flex-col gap-3 min-w-[220px] bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] origin-bottom-right"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            {/* Header */}
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                WhatsApp Us
              </p>
              <p className="text-lg font-bold text-gray-900 tracking-wide">
                {phoneNumber}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp chat"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm rounded-xl px-4 py-2.5 no-underline cursor-pointer"
              whileHover={{ backgroundColor: "#1ebe5d", y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB + pulse ring */}
      <div className="relative w-[60px] h-[60px] flex-shrink-0">
        {/* Pulse ring */}
        <AnimatePresence>
          {!open && (
            <motion.span
              className="absolute inset-[-4px] rounded-full border-[2.5px] border-[#25D366]/50"
              animate={{ scale: [1, 1.4, 1.4], opacity: [0.8, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Main FAB button */}
        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className="absolute inset-0 w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45),0_2px_8px_rgba(0,0,0,0.15)] border-0 outline-none cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#1ebe5d" }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          {/* Icon swap: WA logo ↔ X */}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                className="flex items-center justify-center"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.18 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="whatsapp"
                className="flex items-center justify-center"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.18 }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.697-1.809A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.667a10.62 10.62 0 01-5.404-1.48l-.388-.23-4.57 1.074 1.099-4.455-.253-.4A10.62 10.62 0 015.333 15C5.333 9.109 10.11 4.333 16 4.333S26.667 9.11 26.667 15 21.89 25.667 16 25.667zm5.825-7.946c-.319-.16-1.888-.93-2.182-1.037-.293-.107-.507-.16-.72.16-.213.32-.826 1.037-.986 1.037-.16 0-.373-.053-.693-.213-.32-.16-1.35-.497-2.571-1.584-.95-.847-1.591-1.893-1.778-2.213-.186-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.627-.52-.534-.72-.547-.186-.013-.4-.013-.613-.013s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.666s1.147 3.094 1.307 3.307c.16.213 2.253 3.44 5.46 4.827.764.33 1.36.527 1.825.674.767.244 1.466.21 2.018.127.616-.093 1.888-.772 2.155-1.518.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
