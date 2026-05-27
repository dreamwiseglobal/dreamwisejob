import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { siteInfo } from "@/lib/site-info";

export const metadata: Metadata = {
  title: `About â€” ${siteInfo.name}`,
  description: `Learn about ${siteInfo.name}: our mission, values, and how we help people work legally in Poland.`,
};

export default function Page() {
  return <AboutPage />;
}

