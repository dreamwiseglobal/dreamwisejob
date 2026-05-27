import type { Metadata } from "next";
import ApplyNowPage from "@/components/jobs/ApplyNowPage";
import { siteInfo } from "@/lib/site-info";

export const metadata: Metadata = {
  title: `Apply Now â€” ${siteInfo.name}`,
  description:
    "Browse available jobs and submit your documents in a right-side application panel.",
};

export default function Page() {
  return <ApplyNowPage />;
}

