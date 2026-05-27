import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { siteInfo } from "@/lib/site-info";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteInfo.name} — ${siteInfo.tagline}`,
  description: siteInfo.description,
  keywords: [
    "jobs in poland",
    "work in poland",
    "poland employment",
    "international workers",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang-current")?.value;
  const initialLang = cookieLang === "en" || cookieLang === "pl" ? cookieLang : "pl";

  return (
    <html
      lang={initialLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,pl,uk,ru,de,fr,es,hi,ne,ar',
          layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false
        },
        'google_translate_element'
      );
    }
  `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar initialLang={initialLang} />

        {children}

        <Footer />
      </body>
    </html>
  );
}
