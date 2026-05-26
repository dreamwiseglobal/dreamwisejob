"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { siteInfo } from "@/lib/site-info";
import { jobs } from "@/lib/jobs-data";
import { useSearchParams } from "next/navigation";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-()]+$/, "Please enter a valid phone number"),
  jobTitle: z.string().min(1, "Please select a job or enter your interest"),
  country: z.string().min(2, "Please enter your country of origin"),
  experience: z
    .enum(["none", "some", "experienced"])
    .refine((v) => ["none", "some", "experienced"].includes(v), {
      error: "Please select your experience level",
    }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FieldErrorProps {
  message?: string;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle className="w-3.5 h-3.5 text-[#E24B4A] shrink-0" />
      <span className="text-xs text-[#E24B4A] font-body">{message}</span>
    </div>
  );
}

const inputClass =
  "w-full bg-white border border-[#D3D1C7] px-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#185FA5] transition-colors duration-200 font-body";

const errorInputClass =
  "w-full bg-white border border-[#E24B4A] px-4 py-3 text-sm text-[#2C2C2A] placeholder-[#5F5E5A] focus:outline-none focus:border-[#E24B4A] transition-colors duration-200 font-body";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledJob = searchParams.get("job") ?? "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      jobTitle: prefilledJob,
    },
  });

  useEffect(() => {
    if (prefilledJob) setValue("jobTitle", prefilledJob);
  }, [prefilledJob, setValue]);

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(
      `Job Application: ${data.jobTitle} — ${data.name}`,
    );
    const body = encodeURIComponent(
      `Hello ${siteInfo.name} Team,\n\nI am interested in applying for a position.\n\n` +
        `--- Applicant Details ---\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Country of Origin: ${data.country}\n` +
        `Job Interest: ${data.jobTitle}\n` +
        `Experience Level: ${data.experience}\n\n` +
        `--- Message ---\n${data.message}\n\n` +
        `Sent via PracaPolska contact form.`,
    );
    window.location.href = `mailto:${siteInfo.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#D3D1C7] p-8 lg:p-10"
      noValidate
    >
      <h2 className="font-heading font-700 text-2xl text-[#2C2C2A] mb-2">
        Apply or Get in Touch
      </h2>
      <p className="text-[#5F5E5A] text-sm mb-8 font-body">
        Fill in your details below and we&apos;ll be in touch within 24 hours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Your full name"
            className={errors.name ? errorInputClass : inputClass}
          />
          <FieldError message={errors.name?.message} />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={errors.email ? errorInputClass : inputClass}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+48 000 000 000"
            className={errors.phone ? errorInputClass : inputClass}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <Mail className="w-3.5 h-3.5" /> Country of Origin
          </label>
          <input
            {...register("country")}
            type="text"
            placeholder="e.g. Nepal, Ukraine, Pakistan"
            className={errors.country ? errorInputClass : inputClass}
          />
          <FieldError message={errors.country?.message} />
        </div>

        {/* Job Title */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <Briefcase className="w-3.5 h-3.5" /> Job Interest
          </label>
          <select
            {...register("jobTitle")}
            className={`${errors.jobTitle ? errorInputClass : inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Select a job position...</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title} — {job.currency}
                {job.salaryMin}–{job.currency}
                {job.salaryMax}/mo
              </option>
            ))}
            <option value="Other / General Inquiry">
              Other / General Inquiry
            </option>
          </select>
          <FieldError message={errors.jobTitle?.message} />
        </div>

        {/* Experience */}
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-3 block font-body">
            Experience Level
          </label>
          <div className="flex flex-wrap gap-3">
            {(
              [
                { value: "none", label: "No Experience" },
                { value: "some", label: "Some Experience" },
                { value: "experienced", label: "Experienced" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  {...register("experience")}
                  type="radio"
                  value={opt.value}
                  className="sr-only"
                />
                <span className="w-4 h-4 border-2 border-[#D3D1C7] flex items-center justify-center group-has-[:checked]:border-[#185FA5] transition-colors">
                  <span className="w-2 h-2 bg-[#185FA5] opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                </span>
                <span className="text-sm text-[#5F5E5A] group-has-[:checked]:text-[#2C2C2A] font-body">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
          <FieldError message={errors.experience?.message} />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2A] uppercase tracking-wide mb-2 font-body">
            <MessageSquare className="w-3.5 h-3.5" /> Your Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Tell us about yourself, your experience, and why you want to work in Poland..."
            className={`${errors.message ? errorInputClass : inputClass} resize-none`}
          />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full flex items-center justify-center gap-2 bg-[#185FA5] text-white py-4 font-semibold text-sm hover:bg-[#1A56DB] active:bg-[#0F6E56] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Opening your email..." : "Submit Application"}
      </button>

      <p className="text-center text-xs text-[#5F5E5A] mt-4 font-body">
        This will open your email client with your details pre-filled.
      </p>
    </motion.form>
  );
}
