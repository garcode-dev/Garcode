"use client";

import { useEffect, useState } from "react";
import { Arrow, Check } from "./Icons";
import { contact } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const f = contact.form;

// Contact form. Posts to /api/contact, which emails the message once RESEND_API_KEY is set
// (see README). Until then it opens the visitor's email app with the message filled in,
// so no enquiry is lost.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState("");

  // Pre-select the dropdown from links like /contact?interest=boomers
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("interest");
    if (v && f.interests.some((i) => i.value === v)) setInterest(v);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const interestLabel = f.interests.find((i) => i.value === data.interest)?.label ?? "";
    const payload: Record<string, string> = { ...data, interest: interestLabel };
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setInterest("");
        return;
      }
      if (res.status !== 503) throw new Error(String(res.status));
    } catch {
      // fall through to the email-app fallback below
    }

    // Email sending isn't set up (or the request failed): hand over to the visitor's mail app.
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone && `Phone: ${payload.phone}`,
      interestLabel && `Interested in: ${interestLabel}`,
      payload.organisation && `Organisation/school: ${payload.organisation}`,
      "",
      payload.message,
    ]
      .filter((l) => l !== undefined && l !== "")
      .join("\n");
    const subject = `Website enquiry${interestLabel ? ` · ${interestLabel}` : ""} — ${payload.name}`;
    window.location.href = `mailto:${f.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  if (status === "sent") {
    return (
      <div className="form-card form-done" role="status">
        <span className="check big" aria-hidden="true"><Check /></span>
        <p>{f.confirmation}</p>
      </div>
    );
  }

  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate={false}>
      <h2>{f.title}</h2>
      <div className="field-row">
        <label className="field">
          <span>Full name <em aria-hidden="true">*</em></span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Email address <em aria-hidden="true">*</em></span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field">
          <span>Organisation or school <small>(optional)</small></span>
          <input name="organisation" type="text" autoComplete="organization" />
        </label>
      </div>
      <label className="field">
        <span>I&apos;m interested in</span>
        <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">Choose one…</option>
          {f.interests.map((i) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Tell us about your project or goals <em aria-hidden="true">*</em></span>
        <textarea name="message" rows={5} required />
      </label>
      {/* Spam trap: hidden from people, bots fill it in */}
      <input className="hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : f.button} <Arrow />
      </button>
      {status === "mailto" && (
        <p className="form-note" role="status">
          Your email app should open with your message ready to send. If it doesn&apos;t, email us at{" "}
          <a href={`mailto:${f.to}`}>{f.to}</a>.
        </p>
      )}
    </form>
  );
}
