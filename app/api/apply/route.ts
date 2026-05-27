import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

let cachedTransporter: unknown = null;
type MailTransporter = {
  sendMail: (options: Record<string, unknown>) => Promise<unknown> | unknown;
};

function getTransporter() {
  if (cachedTransporter) return cachedTransporter as MailTransporter;

  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  }) as MailTransporter;

  return cachedTransporter as MailTransporter;
}

async function fileToAttachment(field: string, value: FormDataEntryValue) {
  if (!(value instanceof File)) return null;
  if (value.size === 0) return null;
  const content = Buffer.from(await value.arrayBuffer());
  return {
    filename: value.name || `${field}.bin`,
    content,
    contentType: value.type || "application/octet-stream",
  };
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

    const to = process.env.MAIL_TO ?? requiredEnv("SMTP_USER");
    const from = process.env.MAIL_FROM ?? to;

    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [];

    const cv = await fileToAttachment("cv", form.get("cv") ?? "");
    if (cv) attachments.push(cv);

    const passport = await fileToAttachment("passport", form.get("passport") ?? "");
    if (passport) attachments.push(passport);

    const photo = await fileToAttachment("photo", form.get("photo") ?? "");
    if (photo) attachments.push(photo);

    for (const cert of form.getAll("certificates")) {
      const att = await fileToAttachment("certificates", cert);
      if (att) attachments.push(att);
    }

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

    await getTransporter().sendMail({
      to,
      from,
      replyTo: email || undefined,
      subject,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
