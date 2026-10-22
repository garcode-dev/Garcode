import SmartLink from "./SmartLink";
import { Arrow } from "./Icons";

type HeroLink = { readonly label: string; readonly href: string };

// Dark header used at the top of every inner page (a shorter version of the home hero).
export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  primary,
  secondary,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  primary?: HeroLink;
  secondary?: HeroLink;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero on-dark" aria-labelledby="page-title">
      <div className="glow g1" />
      <div className="glow g2" />
      <svg className="streak" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="psg" x1="0" x2="1">
            <stop offset="0" stopColor="#2B6BFF" stopOpacity="0" />
            <stop offset=".5" stopColor="#6A97FF" stopOpacity=".75" />
            <stop offset="1" stopColor="#2B6BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-40 520 C 380 360, 820 600, 1480 300" stroke="url(#psg)" strokeWidth="1.4" fill="none" />
      </svg>
      <div className="wrap">
        <div className="page-hero-copy">
          <span className="eyebrow reveal">{eyebrow}</span>
          <h1 id="page-title" className="reveal">
            {title}
            {accent && <> <span className="accent">{accent}</span></>}
          </h1>
          {lead && <p className="hero-lead reveal">{lead}</p>}
          {(primary || secondary) && (
            <div className="hero-actions reveal">
              {primary && <SmartLink className="btn btn-primary" href={primary.href}>{primary.label} <Arrow /></SmartLink>}
              {secondary && <SmartLink className="btn btn-ghost" href={secondary.href}>{secondary.label}</SmartLink>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
