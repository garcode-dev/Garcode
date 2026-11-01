"use client";

import { useEffect, useState } from "react";
import { Arrow, Check } from "./Icons";
import { contact } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const f = contact.form;

// Contact form. Posts to /api/contact, which emails the message to Garcode with Resend
// (set RESEND_API_KEY — see README).
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
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest: interestLabel }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setInterest("");
    } catch {
      // Keep what the visitor typed so they can try again.
      setStatus("error");
    }
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
    <form className="form-card reveal" onSubmit={onSubmit}>
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
        {status === "sending" ? "Sending…" : status === "error" ? "Try Again" : f.button} <Arrow />
      </button>
      {status === "error" && (
        <p className="form-note form-error" role="alert">
          {f.error} <a href={`mailto:${f.to}`}>{f.to}</a>
        </p>
      )}
    </form>
  );
}
