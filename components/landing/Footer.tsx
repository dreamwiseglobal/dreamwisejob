import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import BrandLogo from "@/components/landing/BrandLogo";
import { siteInfo } from "@/lib/site-info";

const socialLinks = [
  { label: "Facebook", href: siteInfo.socials.facebook },
  { label: "LinkedIn", href: siteInfo.socials.linkedin },
  { label: "Twitter", href: siteInfo.socials.twitter },
  { label: "Instagram", href: siteInfo.socials.instagram },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A56DB] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-5">
              <BrandLogo className="h-14 w-auto sm:h-16" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6 font-body">
              {siteInfo.shortDescription} Trusted by thousands of workers and
              employers across Europe.
            </p>
            {/* <div className="flex gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 border border-white/20 flex items-center gap-1.5 text-white/70 hover:bg-white hover:text-[#1A56DB] transition-all duration-200 text-xs font-mono"
                  aria-label={label}
                >
                  <ExternalLink className="w-3 h-3" />
                  {label}
                </a>
              ))}
            </div> */}
          </div>

          <div>
            <h4 className="font-heading font-700 text-sm uppercase tracking-widest mb-5 text-[#5DCAA5]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {siteInfo.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200 font-body"
                >
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-700 text-sm uppercase tracking-widest mb-5 text-[#5DCAA5]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#5DCAA5] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${siteInfo.contactEmail}`}
                  className="text-white/70 hover:text-white text-sm transition-colors font-body"
                >
                  {siteInfo.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#5DCAA5] mt-0.5 shrink-0" />
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="text-white/70 hover:text-white text-sm transition-colors font-body"
                >
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5DCAA5] mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm font-body">
                  {siteInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-xs font-mono">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-white/50 hover:text-white text-xs transition-colors font-body"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white text-xs transition-colors font-body"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white text-xs transition-colors font-body"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
