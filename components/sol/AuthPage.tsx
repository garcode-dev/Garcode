import { Suspense } from "react";
import { redirect } from "next/navigation";
import AuthForm from "./AuthForm";
import { Check } from "../Icons";
import { getUser } from "@/lib/auth";
import { sol } from "@/content/schoolOfLife";

// Layout for log in, register and password pages: the form, plus a short reminder of what you get.
export default async function AuthPage({ mode }: { mode: "register" | "login" | "forgot" | "reset" }) {
  if (mode === "register" || mode === "login") {
    const user = await getUser();
    if (user) redirect("/school-of-life/dashboard");
  }
  return (
    <section className="auth-section">
      <div className="wrap auth-grid">
        <Suspense fallback={<div className="auth-card" />}>
          <AuthForm mode={mode} />
        </Suspense>
        <aside className="auth-aside on-dark" aria-label="What you get">
          <div className="glow g1" />
          <span className="eyebrow">{sol.name}</span>
          <p className="auth-aside-title">{sol.closing.title}</p>
          <ul>
            {sol.hero.trust.map((t) => (
              <li key={t}><Check /> {t}</li>
            ))}
            <li><Check /> Daily streaks, XP and skill badges</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
