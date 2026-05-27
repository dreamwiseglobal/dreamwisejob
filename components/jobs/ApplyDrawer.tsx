"use client";

import { useCallback, useEffect, useState } from "react";
import type { Job } from "@/lib/jobs-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { siteInfo } from "@/lib/site-info";

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

export default function ApplyDrawer({
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
      const payload = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      setSubmitError(payload?.error ?? "Failed to submit. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={closeAndReset}
        className={`absolute inset-y-0 left-0 w-full bg-black/0 md:bg-black/35 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close application panel"
        tabIndex={open ? 0 : -1}
      />

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
                      placeholder="you@example.com"
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
                      placeholder="+48 123 456 789"
                      className={errors.phone ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Experience (years) *
                    </label>
                    <input
                      {...register("experienceYears")}
                      type="number"
                      min={0}
                      max={60}
                      className={
                        errors.experienceYears ? errorInputClass : inputClass
                      }
                    />
                    <FieldError message={errors.experienceYears?.message} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Country *
                    </label>
                    <input
                      {...register("country")}
                      type="text"
                      placeholder="Your country"
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
                      placeholder="Your current city"
                      className={
                        errors.currentCity ? errorInputClass : inputClass
                      }
                    />
                    <FieldError message={errors.currentCity?.message} />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                    Notes *
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={5}
                    placeholder="Tell us briefly about your experience and motivation..."
                    className={errors.notes ? errorInputClass : inputClass}
                  />
                  <FieldError message={errors.notes?.message} />
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 block font-body">
                      Passport copy *
                    </label>
                    <input
                      {...register("passport")}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={errors.passport ? errorInputClass : inputClass}
                    />
                    <FieldError message={errors.passport?.message as string} />
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full bg-[#185FA5] text-white py-4 font-semibold text-sm hover:bg-[#1A56DB] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
