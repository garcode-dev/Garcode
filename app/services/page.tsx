import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import { FeatureIcon, type FeatureIconName } from "@/components/Icons";
import { services as s } from "@/content/site";

export const metadata: Metadata = {
  title: s.meta.title,
  description: s.meta.description,
  openGraph: { title: s.meta.title, description: s.meta.description },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero {...s.hero} />

      <section className="paper" aria-labelledby="what-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{s.whatWeDo.eyebrow}</span>
            <h2 id="what-title" className="reveal">{s.whatWeDo.title}</h2>
          </div>
          {s.whatWeDo.groups.map((g, gi) => (
            <div key={g.label} className="svc-group">
              <div className="group-label reveal">
                <span>{String(gi + 1).padStart(2, "0")}</span> {g.label}
              </div>
              <div className="card-grid">
                {g.items.map((item) => (
                  <article key={item.title} className="card reveal">
                    <div className="icon" aria-hidden="true"><FeatureIcon name={item.icon as FeatureIconName} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-title">
        <div className="wrap split">
          <div>
            <span className="eyebrow reveal">{s.why.eyebrow}</span>
            <h2 id="why-title" className="section-title reveal">{s.why.title}</h2>
            <ul className="expect-list">
              {s.why.items.map((item) => (
                <li key={item.title} className="expect-item reveal">
                  <div className="icon" aria-hidden="true"><FeatureIcon name={item.icon as FeatureIconName} /></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="ink-card reveal" aria-labelledby="ind-title">
            <h2 id="ind-title" className="eyebrow" style={{ fontSize: 13 }}>{s.industries.eyebrow}</h2>
            <ul className="industry-list">
              {s.industries.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <Cta {...s.cta} social={false} />
    </>
  );
}
