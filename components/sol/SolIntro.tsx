import { FeatureIcon, type FeatureIconName, Arrow } from "../Icons";
import SmartLink from "../SmartLink";
import { sol } from "@/content/schoolOfLife";

// "Learn On Your Schedule" — the challenge, the solution and the key features.
// Used on the Academy page (with a link through) and on the School of Life page.
export default function SolIntro({ showCta = false, paper = false }: { showCta?: boolean; paper?: boolean }) {
  const s = sol.academySection;
  return (
    <section className={`sol-intro ${paper ? "paper" : ""}`} id="school-of-life" aria-labelledby="sol-intro-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow reveal">{s.eyebrow}</span>
          <h2 id="sol-intro-title" className="reveal">{s.title}</h2>
        </div>
        <div className="sol-cs">
          <div className="sol-cs-card reveal">
            <span className="sol-cs-label">{s.challenge.title}</span>
            <p>{s.challenge.body}</p>
          </div>
          <div className="sol-cs-card solution reveal">
            <span className="sol-cs-label">{s.solution.title}</span>
            <p>{s.solution.body}</p>
          </div>
        </div>
        <h3 className="sol-features-title reveal">{s.featuresTitle}</h3>
        <div className="card-grid four">
          {s.features.map((f) => (
            <article key={f.title} className={`card ${paper ? "" : "card-flat"} reveal`}>
              <div className="icon" aria-hidden="true"><FeatureIcon name={f.icon as FeatureIconName} /></div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
        {showCta && (
          <div className="sol-intro-cta reveal">
            <SmartLink className="btn btn-dark" href={s.cta.href}>{s.cta.label} <Arrow /></SmartLink>
          </div>
        )}
      </div>
    </section>
  );
}
