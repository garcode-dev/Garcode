import { Arrow, SocialIcon } from "./Icons";
import SmartLink from "./SmartLink";
import { site } from "@/content/site";

type CtaLink = { readonly label: string; readonly href: string };

// Dark closing call-to-action. Each page passes its own copy from content/site.ts.
export default function Cta({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  social = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  social?: boolean;
}) {
  return (
    <section className="cta on-dark" aria-labelledby="cta-title">
      <div className="glow g1" />
      <div className="wrap">
        <span className="eyebrow reveal">{eyebrow}</span>
        <h2 id="cta-title" className="reveal">{title}</h2>
        {body && <p className="reveal">{body}</p>}
        <div className="hero-actions reveal">
          <SmartLink className="btn btn-primary" href={primary.href}>{primary.label} <Arrow /></SmartLink>
          {secondary && <SmartLink className="btn btn-ghost" href={secondary.href}>{secondary.label}</SmartLink>}
        </div>
        {social && <SocialRow />}
      </div>
    </section>
  );
}

export function SocialRow({ light = false }: { light?: boolean }) {
  return (
    <div className={`social reveal ${light ? "social-light" : ""}`}>
      <span className="social-label">Follow Garcode</span>
      {site.social.map((s) => (
        <a key={s.name} href={s.href} aria-label={`Garcode on ${s.name}`} target="_blank" rel="noopener noreferrer">
          <SocialIcon name={s.name} />
        </a>
      ))}
    </div>
  );
}
