import { NextResponse } from "next/server";
import { contact } from "@/content/site";

// Receives the contact form and emails it to Garcode via Resend (https://resend.com).
//
// Set these environment variables on the host (Vercel/Netlify → Settings → Environment variables):
//   RESEND_API_KEY   required — from resend.com
//   CONTACT_TO       optional — inbox to receive messages (default: info@garcodedigital.com)
//   CONTACT_FROM     optional — a sender on a domain verified in Resend,
//                    e.g. "Garcode Website <website@garcodedigital.com>"
//
// Without RESEND_API_KEY this returns 503 and the form opens the visitor's email app instead.

const clean = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Spam trap filled in → pretend success, send nothing.
  if (clean(body.company_website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 50);
  const interest = clean(body.interest, 100);
  const organisation = clean(body.organisation, 200);
  const message = clean(body.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    interest && `Interested in: ${interest}`,
    organisation && `Organisation/school: ${organisation}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Garcode Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || contact.form.to],
      reply_to: email,
      subject: `Website enquiry${interest ? ` · ${interest}` : ""} — ${name}`,
      text,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
