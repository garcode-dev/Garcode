import Link from "next/link";
import { Arrow } from "./Icons";
import Placeholder from "./Placeholder";
import { home } from "@/content/site";

export default function Hero() {
  const h = home.hero;
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="glow g1" />
      <div className="glow g2" />
      <div className="glow g3" />
      <svg className="streak" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sg" x1="0" x2="1">
            <stop offset="0" stopColor="#2B6BFF" stopOpacity="0" />
            <stop offset=".5" stopColor="#6A97FF" stopOpacity=".9" />
            <stop offset="1" stopColor="#2B6BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-40 640 C 360 420, 760 760, 1480 380" stroke="url(#sg)" strokeWidth="1.6" fill="none" />
        <path d="M-40 700 C 420 480, 820 820, 1480 440" stroke="url(#sg)" strokeWidth="1" fill="none" opacity=".5" />
      </svg>

      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal">{h.eyebrow}</span>
          <h1 id="hero-title" className="reveal">
            {h.titleStart} <span className="accent">{h.titleAccent}</span>
          </h1>
          <p className="hero-lead reveal">{h.lead}</p>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" href={h.primary.href}>{h.primary.label} <Arrow /></Link>
            <Link className="btn btn-ghost" href={h.secondary.href}>{h.secondary.label}</Link>
          </div>
        </div>
        <div className="hero-gallery reveal">
          {h.photos.map((p) => <Placeholder key={p} label={p} />)}
        </div>
      </div>
    </section>
  );
}
