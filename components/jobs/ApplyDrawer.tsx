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
  experienceYears: z
    .number()
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

  const onSubmit = (data: ApplyFormData) => {
    const cvName = data.cv?.[0]?.name ?? "—";
    const passportName = data.passport?.[0]?.name ?? "—";
    const photoName = data.photo?.[0]?.name ?? "none";
    const certNames =
      data.certificates && data.certificates.length > 0
        ? Array.from(data.certificates)
            .map((f) => f.name)
            .join(", ")
        : "none";

    // ✅ Plain strings — no encodeURIComponent here
    const subject = `Job Application – ${job?.title ?? "Open Position"} – ${data.fullName}`;

    const body = [
      `Position applied for: ${job?.title ?? "N/A"}`,
      `Location: ${job?.location ?? "N/A"}`,
      "",
      "── Applicant details ──────────────────────",
      `Full name:        ${data.fullName}`,
      `Email:            ${data.email}`,
      `Phone:            ${data.phone}`,
      `Country of origin:${data.country}`,
      `Current city:     ${data.currentCity}`,
      `Years of experience: ${data.experienceYears}`,
      "",
      "── Notes ──────────────────────────────────",
      data.notes,
      "",
      "── Attachments (please attach before sending) ──",
      `CV / Resume:  ${cvName}`,
      `Passport:     ${passportName}`,
      `Photo:        ${photoName}`,
      `Certificates: ${certNames}`,
      "",
      "──────────────────────────────────────────",
      "This email was pre-filled from the job application form.",
    ].join("\n");

    // ✅ Encode only once here, inside the URL
    const gmailLink =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(siteInfo.contactEmail)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailLink, "_blank");
    setSubmitted(true);
  };
  return (
    // FIX: replaced pointer-events-none root with visibility toggle + inert
    // so the close button and overlay are never silently blocked.
    <div
      className={`fixed inset-0 z-50 transition-all duration-200 ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      {/* Backdrop – click anywhere on the left half to close */}
      <button
        type="button"
        onClick={closeAndReset}
        className={`absolute inset-y-0 left-0 w-full bg-black/0 md:bg-black/35 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close application panel"
      />

      <aside
        tabIndex={-1}
        aria-labelledby="drawer-title"
        className={`absolute inset-y-0 right-0 w-full md:w-1/2 bg-[#F1EFE8] border-l border-[#D3D1C7] shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Job application"
      >
        <div className="h-full overflow-y-auto">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-[#F1EFE8] border-b border-[#D3D1C7]">
            <div className="p-6 flex items-start gap-4">
              <div className="flex-1">
                <p className="font-mono text-xs text-[#1D9E75] uppercase tracking-widest">
                  Apply Now
                </p>
                <h2 className="font-heading font-[800] text-2xl text-[#2C2C2A] mt-2">
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
              /* ── Success state ── */
              <div className="bg-white border border-[#D3D1C7] p-6">
                <h3 className="font-heading font-[800] text-xl text-[#2C2C2A]">
                  Almost done!
                </h3>
                <p className="text-[#5F5E5A] text-sm mt-2">
                  Your email client has opened with all details pre-filled.
                  Please{" "}
                  <strong>
                    attach your CV, passport and any other documents
                  </strong>{" "}
                  before hitting Send.
                </p>
                <p className="text-[#5F5E5A] text-sm mt-3">
                  Questions? Email us directly at{" "}
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
                    Back to form
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
              /* ── Application form ── */
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border border-[#D3D1C7] p-6"
                noValidate
              >
                <p className="text-[#5F5E5A] text-sm mb-6">
                  Fill in your details below. On submit your default email
                  client will open with everything pre-filled — just attach your
                  files and send.
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
                      {...(register("experienceYears"),
                      {
                        valueasnumber: "true",
                      })}
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
                    className={`${errors.notes ? errorInputClass : inputClass} resize-none`}
                  />
                  <FieldError message={errors.notes?.message} />
                </div>

                {/* <div className="mt-8 border-t border-[#E7E5DC] pt-6">
                  <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-4">
                    Documents
                  </p>
                  <p className="text-xs text-[#5F5E5A] mb-4 font-body">
                    Select your files below. Their names will appear in the
                    pre-filled email — you&apos;ll need to attach them manually
                    before sending.
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
                </div> */}

                <div className="mt-8 border-t border-[#E7E5DC] pt-6">
                  <p className="font-mono text-xs text-[#5F5E5A] uppercase tracking-widest mb-4">
                    Documents
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-red-800 mb-2 font-body">
                      📎 Please attach the following documents manually in Gmail
                      before sending:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-blue-700 font-body">
                        <span className="mt-0.5 text-blue-500">✱</span>
                        <span>
                          <strong>CV / Resume</strong> — PDF, DOC, DOCX, or
                          image
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-blue-700 font-body">
                        <span className="mt-0.5 text-blue-500">✱</span>
                        <span>
                          <strong>Passport copy</strong> — PDF or image
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-blue-700 font-body">
                        <span className="mt-0.5 text-[#B5A992]">○</span>
                        <span>
                          <strong>Recent photo</strong> — JPG or PNG (optional)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-blue-700 font-body">
                        <span className="mt-0.5 text-[#B5A992]">○</span>
                        <span>
                          <strong>Certificates</strong> — PDF or image
                          (optional)
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-xs text-[#5F5E5A] font-body">
                    After clicking <strong>Apply Now</strong>, Gmail will open
                    with your details pre-filled. Use the{" "}
                    <strong>📎 attach</strong> button in Gmail to add your
                    documents before hitting Send.
                  </p>
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
                  {isSubmitting ? "Opening email…" : "Submit Application"}
                </button>

                <p className="text-center text-xs text-[#5F5E5A] mt-4 font-body">
                  Clicking submit opens your email client with all details
                  pre-filled. Attach your documents before sending.
                </p>
              </form>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
