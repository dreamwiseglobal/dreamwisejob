import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getApplyEmailTo() {
  return process.env.APPLY_EMAIL_TO ?? process.env.MAIL_TO ?? "";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const jobTitle = String(form.get("jobTitle") ?? "");
    const fullName = String(form.get("fullName") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const country = String(form.get("country") ?? "");
    const currentCity = String(form.get("currentCity") ?? "");
    const experienceYears = String(form.get("experienceYears") ?? "");
    const notes = String(form.get("notes") ?? "");

    const to = getApplyEmailTo();
    const subject = `New Application: ${jobTitle || "Unknown role"} — ${fullName || "Unknown applicant"}`;
    const text =
      `Job: ${jobTitle}\n` +
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Country: ${country}\n` +
      `Current city: ${currentCity}\n` +
      `Experience (years): ${experienceYears}\n\n` +
      `Notes:\n${notes}\n`;

    const mailto = to
      ? `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
      : null;

    return NextResponse.json({
      ok: true,
      delivery: "disabled",
      mailto,
      to: to || null,
      note: "Server-side email delivery is disabled.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

