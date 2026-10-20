import Link from "next/link";
import { Arrow, SocialIcon } from "./Icons";
import { home, site } from "@/content/site";

export default function Cta() {
  const c = home.cta;
  return (
    <section className="cta on-dark" aria-labelledby="cta-title">
      <div className="glow g1" />
      <div className="wrap">
        <span className="eyebrow reveal">{c.eyebrow}</span>
        <h2 id="cta-title" className="reveal">{c.title}</h2>
        <p className="reveal">{c.body}</p>
        <div className="hero-actions reveal">
          <Link className="btn btn-primary" href={c.primary.href}>{c.primary.label} <Arrow /></Link>
          <Link className="btn btn-ghost" href={c.secondary.href}>{c.secondary.label}</Link>
        </div>
        <div className="social reveal">
          <span className="social-label">Follow Garcode</span>
          {site.social.map((s) => (
            <a key={s.name} href={s.href} aria-label={`Garcode on ${s.name}`} target="_blank" rel="noopener noreferrer">
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
