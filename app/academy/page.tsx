import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import SmartLink from "@/components/SmartLink";
import Text from "@/components/Text";
import { Arrow, Check, FeatureIcon, type FeatureIconName } from "@/components/Icons";
import { academy as a } from "@/content/site";

export const metadata: Metadata = {
  title: a.meta.title,
  description: a.meta.description,
  openGraph: { title: a.meta.title, description: a.meta.description },
};

export default function AcademyPage() {
  return (
    <>
      <PageHero {...a.hero} />

      <section className="paper" aria-labelledby="tracks-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{a.tracks.eyebrow}</span>
            <h2 id="tracks-title" className="reveal">{a.tracks.title}</h2>
          </div>
          <div className="card-grid tracks">
            {a.tracks.items.map((t, i) => (
              <article key={t.title} className="card reveal">
                <div className="card-top">
                  <div className="icon" aria-hidden="true"><FeatureIcon name={t.icon as FeatureIconName} /></div>
                  <span className="way-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </article>
            ))}
            <div className="card card-more reveal">
              <span className="loading-dots" aria-hidden="true"><i /><i /><i /></span>
              <p>{a.tracks.more}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tech-boomers" className="boomers-section" aria-labelledby="boomers-title">
        <div className="wrap">
          <div className="boomers reveal">
            <div className="boomers-copy">
              <span className="tag-inline">{a.boomers.tag}</span>
              <h2 id="boomers-title">{a.boomers.title}</h2>
              <p className="boomers-lead">{a.boomers.lead}</p>
              <p>{a.boomers.body}</p>
              <SmartLink className="btn btn-white" href={a.boomers.primary.href}>
                {a.boomers.primary.label} <Arrow />
              </SmartLink>
            </div>
            <dl className="boomers-details">
              {a.boomers.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd><Text value={d.value} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="exp-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{a.experience.eyebrow}</span>
            <h2 id="exp-title" className="reveal">{a.experience.title}</h2>
          </div>
          <div className="card-grid four">
            {a.experience.items.map((e) => (
              <article key={e.title} className="card card-flat reveal">
                <div className="icon" aria-hidden="true"><FeatureIcon name={e.icon as FeatureIconName} /></div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper" aria-labelledby="who-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{a.whoWeTrain.eyebrow}</span>
            <h2 id="who-title" className="reveal">{a.whoWeTrain.title}</h2>
          </div>
          <div className="card-grid two">
            {a.whoWeTrain.items.map((w) => (
              <article key={w.title} className="card who reveal">
                <div className="icon" aria-hidden="true"><FeatureIcon name={w.icon as FeatureIconName} /></div>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                  <SmartLink className="way-link" href={w.link.href}>
                    <span>{w.link.label}</span> <Arrow />
                  </SmartLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="grad-title">
        <div className="wrap split grad">
          <div>
            <h2 id="grad-title" className="eyebrow reveal" style={{ fontSize: 13 }}>{a.graduate.eyebrow}</h2>
            <p className="big-statement reveal">{a.graduate.closing}</p>
          </div>
          <ul className="checklist">
            {a.graduate.items.map((g) => (
              <li key={g} className="reveal"><span className="check" aria-hidden="true"><Check /></span>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta {...a.cta} />
    </>
  );
}
