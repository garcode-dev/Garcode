import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import SolIntro from "@/components/sol/SolIntro";
import { Arrow, Check, FeatureIcon, type FeatureIconName } from "@/components/Icons";
import { getUser } from "@/lib/auth";
import { sol, tracks, XP } from "@/content/schoolOfLife";

export const metadata: Metadata = {
  title: sol.meta.title,
  description: sol.meta.description,
  openGraph: { title: sol.meta.title, description: sol.meta.description },
};

export default async function SchoolOfLifePage() {
  const user = await getUser();
  const h = sol.hero;
  return (
    <>
      <section className="sol-hero on-dark" aria-labelledby="sol-title">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="wrap sol-hero-grid">
          <div className="sol-hero-copy">
            <span className="eyebrow reveal">{h.eyebrow}</span>
            <h1 id="sol-title" className="reveal">
              {h.title} <span className="accent">{h.accent}</span>
            </h1>
            <p className="hero-lead reveal">{h.lead}</p>
            <div className="hero-actions reveal">
              {user ? (
                <Link className="btn btn-primary" href="/school-of-life/dashboard">Go to My Dashboard <Arrow /></Link>
              ) : (
                <Link className="btn btn-primary" href={h.primary.href}>{h.primary.label} <Arrow /></Link>
              )}
              <Link className="btn btn-ghost" href={h.secondary.href}>{h.secondary.label}</Link>
            </div>
            <ul className="sol-trust reveal">
              {h.trust.map((t) => (
                <li key={t}><Check /> {t}</li>
              ))}
            </ul>
          </div>

          {/* Illustration of a lesson in the vertical player */}
          <div className="sol-phone reveal" aria-hidden="true">
            <div className="sol-phone-screen">
              <div className="sol-phone-top">
                <span className="sol-chip"><FeatureIcon name="flame" /> 4-Day Streak</span>
                <span className="sol-chip"><FeatureIcon name="star" /> +{XP.lesson} XP</span>
              </div>
              <div className="sol-phone-video">
                <span className="sol-phone-play"><FeatureIcon name="play" /></span>
              </div>
              <div className="sol-phone-meta">
                <span className="sol-phone-track">Career &amp; Professional Leadership</span>
                <strong>Structuring a Salary Counter-Offer</strong>
                <div className="sol-phone-bar"><span style={{ width: "62%" }} /></div>
                <span className="sol-phone-time">1:52 / 3:00</span>
              </div>
              <div className="sol-phone-quiz">
                <span>Quick check</span>
                <p>What should a strong counter-offer be anchored to?</p>
                <div className="sol-phone-opt">Your current salary only</div>
                <div className="sol-phone-opt right">Market data and the value you bring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SolIntro paper />

      <section id="tracks" className="sol-tracks-section" aria-labelledby="tracks-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{sol.tracksSection.eyebrow}</span>
            <h2 id="tracks-title" className="reveal">{sol.tracksSection.title}</h2>
          </div>
          <div className="sol-track-grid">
            {tracks.map((t) => (
              <article key={t.id} className="sol-track reveal">
                <div className="sol-track-head">
                  <div className="icon" aria-hidden="true"><FeatureIcon name={t.icon as FeatureIconName} /></div>
                  <span className="sol-track-count">{t.modules.length} modules</span>
                </div>
                <h3>{t.category}</h3>
                <p className="sol-track-focus">{t.focus}</p>
                <ul>
                  {t.modules.map((m) => <li key={m.title}>{m.title}</li>)}
                </ul>
              </article>
            ))}
            <div className="sol-track sol-track-more reveal">
              <span className="loading-dots" aria-hidden="true"><i /><i /><i /></span>
              <p>More micro-tracks on the way.</p>
              <Link href={user ? "/school-of-life/dashboard" : h.primary.href}>{user ? "Go to My Dashboard" : "Join free to get them first"} →</Link>
            </div>
          </div>
        </div>
      </section>

      <Cta {...sol.closing} primary={user ? { label: "Go to My Dashboard", href: "/school-of-life/dashboard" } : sol.closing.primary} />
    </>
  );
}
