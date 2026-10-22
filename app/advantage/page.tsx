import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import { FeatureIcon, type FeatureIconName } from "@/components/Icons";
import { advantage as a } from "@/content/site";

export const metadata: Metadata = {
  title: a.meta.title,
  description: a.meta.description,
  openGraph: { title: a.meta.title, description: a.meta.description },
};

export default function AdvantagePage() {
  return (
    <>
      <PageHero {...a.hero} />

      <section className="paper" aria-label="The Garcode advantage">
        <div className="wrap">
          <div className="pillar-grid">
            {a.pillars.map((p, i) => (
              <article key={p.title} className="pillar reveal">
                <div className="pillar-top">
                  <div className="icon" aria-hidden="true"><FeatureIcon name={p.icon as FeatureIconName} /></div>
                  <span className="way-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
                {"tools" in p && (
                  <ul className="tool-list" aria-label="Tools we use">
                    {p.tools.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="foryou-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{a.forYou.eyebrow}</span>
            <h2 id="foryou-title" className="reveal">{a.forYou.title}</h2>
          </div>
          <ul className="rows">
            {a.forYou.items.map((item) => (
              <li key={item.who} className="row reveal">
                <div className="icon" aria-hidden="true"><FeatureIcon name={item.icon as FeatureIconName} /></div>
                <h3>{item.who}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta {...a.cta} body="" social={false} />
    </>
  );
}
