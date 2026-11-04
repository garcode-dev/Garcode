import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contact } from "@/content/site";
import { senderAddress } from "@/lib/email";

// Receives the contact form and emails it to Garcode with Resend (https://resend.com).
//
// Environment variables (put them in .env.local for local dev, and in your host's settings
// — Vercel/Netlify → Settings → Environment variables — for the live site):
//   RESEND_API_KEY   required — create one at resend.com/api-keys
//   CONTACT_FROM     sender address on a domain you've verified in Resend,
//                    e.g. "Garcode Website <website@garcodedigital.com>".
//                    Until a domain is verified you can use "Garcode Website <onboarding@resend.dev>",
//                    but Resend then only delivers to the email address you signed up to Resend with.
//   CONTACT_TO       optional — inbox that receives enquiries (default: info@garcodedigital.com).
//                    Separate several addresses with commas.

export const runtime = "nodejs";

const clean = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

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
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — the message was not sent.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { from, problem } = senderAddress("Garcode Website <onboarding@resend.dev>");
  if (problem) {
    console.error("[contact]", problem);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  const to = (process.env.CONTACT_TO || contact.form.to)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Interested in", interest],
    ["Organisation/school", organisation],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", message].join("\n");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#12151D">
      <h2 style="margin:0 0 16px;font-size:20px">New enquiry from the Garcode website</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#5A6070;white-space:nowrap">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <div style="padding:16px 18px;background:#F5F2EC;border-radius:10px;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin-top:20px;color:#5A6070;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Website enquiry${interest ? ` · ${interest}` : ""} — ${name}`,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
