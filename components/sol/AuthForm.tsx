"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Arrow, Check } from "../Icons";
import { sol } from "@/content/schoolOfLife";

type Mode = "register" | "login" | "forgot" | "reset";

// Only allow redirects back into School of Life after login.
const safeNext = (v: string | null) => (v && v.startsWith("/school-of-life/") && !v.startsWith("//") ? v : "/school-of-life/dashboard");

// Turns Better Auth error codes into plain instructions.
function explain(code?: string, message?: string) {
  switch (code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with this email already exists. Log in instead, or reset your password.";
    case "INVALID_EMAIL_OR_PASSWORD":
      return "That email and password don't match. Check them and try again, or reset your password.";
    case "PASSWORD_TOO_SHORT":
      return "Use a password with at least 8 characters.";
    case "INVALID_EMAIL":
      return "Enter a valid email address.";
    case "INVALID_TOKEN":
      return "This reset link has expired or was already used. Request a new one.";
    default:
      return message || "Something went wrong. Check your connection and try again.";
  }
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const copy = sol.auth[mode];
  const next = safeNext(params.get("next"));
  const token = params.get("token");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setError("");
    if ((mode === "register" || mode === "reset") && f.password !== f.confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "register") {
        const { error } = await authClient.signUp.email({ name: f.name.trim(), email: f.email.trim(), password: f.password });
        if (error) throw error;
        router.push(next);
        router.refresh();
        return;
      }
      if (mode === "login") {
        const { error } = await authClient.signIn.email({ email: f.email.trim(), password: f.password });
        if (error) throw error;
        router.push(next);
        router.refresh();
        return;
      }
      if (mode === "forgot") {
        const { error } = await authClient.requestPasswordReset({ email: f.email.trim(), redirectTo: "/school-of-life/reset-password" });
        if (error) throw error;
        setDone(true);
      }
      if (mode === "reset") {
        const { error } = await authClient.resetPassword({ newPassword: f.password, token: token ?? "" });
        if (error) throw error;
        setDone(true);
      }
    } catch (err) {
      const e = err as { code?: string; message?: string };
      setError(explain(e.code, e.message));
    } finally {
      setBusy(false);
    }
  }

  if (mode === "reset" && !token) {
    return (
      <div className="auth-card">
        <h1>{copy.title}</h1>
        <p className="form-note form-error" role="alert">{explain("INVALID_TOKEN")}</p>
        <Link className="btn btn-primary" href="/school-of-life/forgot-password">Request a New Link <Arrow /></Link>
      </div>
    );
  }

  if (done) {
    const msg = mode === "forgot" ? sol.auth.forgot.sent : sol.auth.reset.done;
    return (
      <div className="auth-card auth-done" role="status">
        <span className="check big" aria-hidden="true"><Check /></span>
        <p>{msg}</p>
        <Link className="btn btn-primary" href="/school-of-life/login">Go to Log In <Arrow /></Link>
      </div>
    );
  }

  return (
    <form className="auth-card" onSubmit={onSubmit}>
      <h1>{copy.title}</h1>
      {"lead" in copy && <p className="auth-lead">{copy.lead}</p>}

      {mode === "register" && (
        <label className="field">
          <span>Full name</span>
          <input name="name" type="text" autoComplete="name" required minLength={2} />
        </label>
      )}
      {mode !== "reset" && (
        <label className="field">
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      )}
      {mode !== "forgot" && (
        <label className="field">
          <span className="field-head">
            {mode === "reset" ? "New password" : "Password"}
            {mode === "login" && <Link href="/school-of-life/forgot-password">Forgot password?</Link>}
          </span>
          <input
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={8}
          />
          {mode !== "login" && <small className="field-hint">At least 8 characters.</small>}
        </label>
      )}
      {(mode === "register" || mode === "reset") && (
        <label className="field">
          <span>Confirm password</span>
          <input name="confirm" type="password" autoComplete="new-password" required minLength={8} />
        </label>
      )}

      {error && <p className="form-note form-error" role="alert">{error}</p>}

      <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
        {busy ? "Please wait…" : copy.button} <Arrow />
      </button>

      <p className="auth-switch">
        {mode === "register" && <>Already have an account? <Link href={`/school-of-life/login${params.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`}>Log in</Link></>}
        {mode === "login" && <>New to School of Life? <Link href={`/school-of-life/register${params.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`}>Create a free account</Link></>}
        {(mode === "forgot" || mode === "reset") && <>Remembered it? <Link href="/school-of-life/login">Back to log in</Link></>}
      </p>
    </form>
  );
}
