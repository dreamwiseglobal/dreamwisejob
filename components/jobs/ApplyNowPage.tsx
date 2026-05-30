"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { jobs, jobCategories, type Job } from "@/lib/jobs-data";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteInfo } from "@/lib/site-info";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const inputClass =
  "w-full bg-white border border-[#D3D1C7] px-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#185FA5] transition-colors duration-200 font-body";

const errorInputClass =
  "w-full bg-white border border-[#E24B4A] px-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#E24B4A] transition-colors duration-200 font-body";

function FileRequired(name: string) {
  return z
    .custom<FileList | null>()
    .refine((files) => !!files && files.length > 0, {
      message: `${name} is required`,
    });
}

const applySchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-()]+$/, "Please enter a valid phone number"),
  country: z.string().min(2, "Please enter your country of origin"),
  currentCity: z.string().min(2, "Please enter your current city"),
  experienceYears: z.coerce
    .number<number>()
    .min(0, "Experience cannot be negative")
    .max(60, "Please enter a valid number"),
  notes: z
    .string()
    .min(20, "Please add a short description (min 20 characters)")
    .max(1500, "Description is too long"),
  cv: FileRequired("CV / Resume"),
  passport: FileRequired("Passport copy"),
  photo: z.custom<FileList | null>().optional(),
  certificates: z.custom<FileList | null>().optional(),
  // FIX: was z.literal(true, "...") — second arg is not valid Zod API;
  // use .refine() instead, and default to false so users must actually check it
  confirmTruth: z.boolean().refine((val) => val === true, {
    message: "Please confirm your details are correct",
  }),
});

type ApplyFormData = z.infer<typeof applySchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <span className="w-1.5 h-1.5 bg-[#E24B4A] shrink-0" />
      <span className="text-xs text-[#E24B4A] font-body">{message}</span>
    </div>
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/jobs/${job.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") router.push(`/jobs/${job.id}`);
      }}
      role="link"
      tabIndex={0}
      className="bg-white border border-[#D3D1C7] hover:border-[#185FA5] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#378ADD]"
    >
      <div className="p-6 pb-4 border-b border-[#D3D1C7]">
        <div className="flex gap-2 mb-4">
          {job.urgent && (
            <span className="bg-[#EF9F27] text-white text-xs font-mono uppercase tracking-wide px-2 py-0.5">
              Urgent
            </span>
          )}
          {job.featured && (
            <span className="bg-[#B5D4F4] text-[#185FA5] text-xs font-mono uppercase tracking-wide px-2 py-0.5">
              Featured
            </span>
          )}
          <span className="border border-[#D3D1C7] text-[#5F5E5A] text-xs font-mono uppercase tracking-wide px-2 py-0.5 ml-auto">
            {job.category}
          </span>
        </div>

        <h3 className="font-heading font-700 text-lg text-[#2C2C2A] leading-tight mb-3">
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-3">
          <div className="text-[#5F5E5A] text-xs">{job.location}</div>
          {/* FIX: replaced broken â€" encoding with proper em-dash */}
          <div className="text-[#1D9E75] text-xs font-semibold">
            {job.currency}
            {job.salaryMin.toLocaleString()}–{job.currency}
            {job.salaryMax.toLocaleString()}/month
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 flex-1">
        <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-3">
          Responsibilities
        </p>
        <ul className="space-y-1.5">
          {job.description.slice(0, 4).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-[#5F5E5A]"
            >
              <div className="w-1 h-1 bg-[#378ADD] mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/jobs/${job.id}`);
            }}
            className="w-full inline-flex items-center justify-center border border-[#185FA5] text-[#185FA5] py-3 text-sm font-semibold hover:bg-[#E6F1FB] transition-colors duration-200"
          >
            Details
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#185FA5] text-white py-3 text-sm font-semibold hover:bg-[#1A56DB] transition-colors duration-200"
          >
            Apply Now
          </button>
        </div>
      </div>
    </article>
  );
}

function Drawer({
  job,
  open,
  onClose,
}: {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      experienceYears: 0,
      // FIX: was `true` — must be false so user is required to check it
      confirmTruth: false,
    },
  });

  const closeAndReset = useCallback(() => {
    setSubmitted(false);
    setSubmitError(null);
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeAndReset, open]);

  // FIX: overflow lock — was missing cleanup on the correct condition.
  // Now we lock on open=true and always restore on cleanup.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onSubmit = async (data: ApplyFormData) => {
    setSubmitError(null);

    const formData = new FormData();
    formData.set("jobTitle", job?.title ?? "");
    formData.set("fullName", data.fullName);
    formData.set("email", data.email);
    formData.set("phone", data.phone);
    formData.set("country", data.country);
    formData.set("currentCity", data.currentCity);
    formData.set("experienceYears", String(data.experienceYears));
    formData.set("notes", data.notes);

    if (data.cv?.[0]) formData.set("cv", data.cv[0]);
    if (data.passport?.[0]) formData.set("passport", data.passport[0]);
    if (data.photo?.[0]) formData.set("photo", data.photo[0]);

    if (data.certificates && data.certificates.length > 0) {
      Array.from(data.certificates).forEach((file) => {
        formData.append("certificates", file);
      });
    }

    const res = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setSubmitError(payload?.error ?? "Failed to submit. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    // FIX: removed pointer-events-none from the root div — it was blocking ALL
    // click events inside (including the close button) when open was false.
    // Instead, use visibility + inert to prevent tab focus when closed.
    <div
      className={`fixed inset-0 z-50 transition-all duration-200 ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      {/* Left overlay (click to close) */}
      <button
        type="button"
        onClick={closeAndReset}
        className={`absolute inset-y-0 left-0 w-full bg-black/0 md:bg-black/35 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close application panel"
      />

      {/* Right panel */}
      <aside
        className={`absolute inset-y-0 right-0 w-full md:w-1/2 bg-[#F1EFE8] border-l border-[#D3D1C7] shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Job application"
      >
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 z-10 bg-[#F1EFE8] border-b border-[#D3D1C7]">
            <div className="p-6 flex items-start gap-4">
              <div className="flex-1">
                <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest">
                  Apply Now
                </p>
                <h2 className="font-heading font-800 text-2xl text-[#2C2C2A] mt-2">
                  {job ? job.title : "Job Application"}
                </h2>
                {job && (
                  // FIX: replaced broken â€¢ and â€" with proper • and –
                  <p className="text-[#5F5E5A] text-sm mt-1">
                    {job.location} • {job.currency}
                    {job.salaryMin.toLocaleString()}–{job.currency}
                    {job.salaryMax.toLocaleString()}/month
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeAndReset}
                className="w-10 h-10 border border-[#D3D1C7] bg-white hover:border-[#185FA5] hover:text-[#185FA5] transition-colors duration-200 flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {submitted ? (
              <div className="bg-white border border-[#D3D1C7] p-6">
                <h3 className="font-heading font-800 text-xl text-[#2C2C2A]">
                  Application received
                </h3>
                <p className="text-[#5F5E5A] text-sm mt-2">
                  Thanks! Our team will review your documents and contact you
                  soon via email or phone.
                </p>
                <p className="text-[#5F5E5A] text-sm mt-3">
                  If you have questions, email{" "}
                  <a
                    className="text-[#1A56DB] underline"
                    href={`mailto:${siteInfo.contactEmail}`}
                  >
                    {siteInfo.contactEmail}
                  </a>
                  .
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="border-2 border-[#185FA5] text-[#185FA5] px-5 py-2.5 text-sm font-semibold hover:bg-[#185FA5] hover:text-white transition-colors duration-200"
                  >
                    Submit another
                  </button>
                  <button
                    type="button"
                    onClick={closeAndReset}
                    className="bg-[#185FA5] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#1A56DB] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border border-[#D3D1C7] p-6"
                noValidate
              >
                {submitError && (
                  <div className="mb-5 border border-[#E24B4A] bg-[#FFF5F5] px-4 py-3 text-sm text-[#B42318] font-body">
                    {submitError}
                  </div>
                )}
                <p className="text-[#5F5E5A] text-sm mb-6">
                  Fill the required details and upload your documents. Fields
                  marked with * are required.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Your full name"
                      className={errors.fullName ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.fullName?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className={errors.email ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Phone *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+48 000 000 000"
                      className={errors.phone ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Country of Origin *
                    </label>
                    <input
                      {...register("country")}
                      type="text"
                      placeholder="e.g. Nepal, Ukraine"
                      className={errors.country ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.country?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Current City *
                    </label>
                    <input
                      {...register("currentCity")}
                      type="text"
                      placeholder="e.g. Kathmandu"
                      className={
                        errors.currentCity ? errorInputClass : inputClass
                      }
                    />
                    <FieldError message={errors.currentCity?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Years of Experience *
                    </label>
                    <input
                      {...register("experienceYears")}
                      type="number"
                      min={0}
                      step={1}
                      className={
                        errors.experienceYears ? errorInputClass : inputClass
                      }
                    />
                    <FieldError message={errors.experienceYears?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Description / Notes *
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={5}
                      placeholder="Tell us briefly about your experience, availability, and any important details..."
                      className={`${errors.notes ? errorInputClass : inputClass} resize-none`}
                    />
                    <FieldError message={errors.notes?.message} />
                  </div>
                </div>

                <div className="mt-8 border-t border-[#E7E5DC] pt-6">
                  <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-4">
                    Required documents
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                        CV / Resume *
                      </label>
                      <input
                        {...register("cv")}
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className={errors.cv ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.cv?.message as string} />
                      <p className="text-[11px] text-[#5F5E5A] mt-2">
                        PDF/DOC or image is acceptable.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                        Passport copy *
                      </label>
                      <input
                        {...register("passport")}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className={
                          errors.passport ? errorInputClass : inputClass
                        }
                      />
                      <FieldError
                        message={errors.passport?.message as string}
                      />
                      <p className="text-[11px] text-[#5F5E5A] mt-2">
                        Upload photo/scan of passport page.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                        Recent photo (optional)
                      </label>
                      <input
                        {...register("photo")}
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                        Certificates (optional)
                      </label>
                      <input
                        {...register("certificates")}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        {...register("confirmTruth")}
                        type="checkbox"
                        className="mt-1.5"
                      />
                      <span className="text-sm text-[#5F5E5A] font-body">
                        I confirm the details and documents provided are correct
                        and belong to me.
                      </span>
                    </label>
                    <FieldError message={errors.confirmTruth?.message} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full bg-[#185FA5] text-white py-4 font-semibold text-sm hover:bg-[#1A56DB] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                <p className="text-center text-xs text-[#5F5E5A] mt-4 font-body">
                  This demo stores nothing yet. Hook it to your API/email
                  pipeline when ready.
                </p>
              </form>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function ApplyNowPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobParamTitle = searchParams.get("job") ?? "";

  const initialJob = useMemo(() => {
    if (!jobParamTitle) return null;
    return (
      jobs.find(
        (job) => job.title.toLowerCase() === jobParamTitle.toLowerCase(),
      ) ?? null
    );
  }, [jobParamTitle]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState(() => initialJob?.title ?? "");
  const [open, setOpen] = useState(() => Boolean(initialJob));
  const [activeJob, setActiveJob] = useState<Job | null>(() => initialJob);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        activeCategory === "All" || job.category === activeCategory;
      const matchesQuery =
        query === "" ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const onApply = (job: Job) => {
    setActiveJob(job);
    setOpen(true);
  };

  const clearJobParam = useCallback(() => {
    if (!jobParamTitle) return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("job");
    const nextQuery = nextParams.toString();

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [jobParamTitle, pathname, router, searchParams]);

  const onClose = () => {
    setOpen(false);
    clearJobParam();
  };

  return (
    <main className="bg-[#F1EFE8] min-h-screen flex flex-col items-center justify-center mt-20">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest mb-3">
                {/* FIX: replaced broken â€" encoding with proper — */}— Apply
                Now
              </p>
              <h1 className="font-heading font-800 text-4xl sm:text-5xl text-[#2C2C2A] leading-tight">
                Choose a job and
                <br />
                <span className="text-[#185FA5]">upload your documents</span>
              </h1>
              <p className="text-[#5F5E5A] text-sm mt-4 max-w-2xl">
                Select a job below. Your application opens in a right-side
                panel, so you can submit without leaving the list.
              </p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#5F5E5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job title or category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-[#D3D1C7] pl-10 pr-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#185FA5] transition-colors duration-200 font-body"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-b border-[#D3D1C7] pb-6">
            {jobCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wide border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#185FA5] text-white border-[#185FA5]"
                    : "bg-white text-[#5F5E5A] border-[#D3D1C7] hover:border-[#378ADD] hover:text-[#185FA5]"
                }`}
              >
                {cat}
              </button>
            ))}

            {filtered.length !== jobs.length && (
              <span className="ml-auto font-mono text-xs text-[#5F5E5A] self-center">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} onApply={onApply} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-[#D3D1C7] bg-white">
              <p className="font-heading text-lg text-[#5F5E5A]">
                No jobs found.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setQuery("");
                }}
                className="mt-4 text-[#185FA5] text-sm underline font-body"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Drawer job={activeJob} open={open} onClose={onClose} />
    </main>
  );
}
