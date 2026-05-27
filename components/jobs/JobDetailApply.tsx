"use client";

import { useCallback, useState } from "react";
import type { Job } from "@/lib/jobs-data";
import ApplyDrawer from "@/components/jobs/ApplyDrawer";

export default function JobDetailApply({
  job,
  className,
  children,
}: {
  job: Job;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children ?? "Apply Now"}
      </button>

      <ApplyDrawer job={job} open={open} onClose={onClose} />
    </>
  );
}

