import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import Mission from "@/components/Mission";
import Placeholder from "@/components/Placeholder";
import Text from "@/components/Text";
import { about as a, home } from "@/content/site";

export const metadata: Metadata = {
  title: a.meta.title,
  description: a.meta.description,
  openGraph: { title: a.meta.title, description: a.meta.description },
};

const barcode = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1];

export default function AboutPage() {
  return (
    <>
      <PageHero {...a.hero} />

      <section className="paper" aria-labelledby="founder-name">
        <div className="wrap founder">
          <Placeholder label={a.founder.photo} light className="reveal" />
          <div className="founder-copy">
            <span className="eyebrow reveal">{a.founder.role}</span>
            <h2 id="founder-name" className="reveal">{a.founder.name}</h2>
            <p className="reveal"><Text value={a.founder.bio} /></p>
          </div>
        </div>
      </section>

      <section aria-labelledby="name-title">
        <div className="wrap split name-story">
          <div className="barcode-card reveal" aria-hidden="true">
            <div className="barcode">
              {barcode.map((w, i) => <span key={i} style={{ width: w * 3 }} />)}
            </div>
            <div className="barcode-word">
              <span className="strike">Bar</span><span className="swap">Gar</span>code
            </div>
          </div>
          <div>
            <h2 id="name-title" className="eyebrow reveal" style={{ fontSize: 13 }}>{a.name.eyebrow}</h2>
            {a.name.paragraphs.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "story-lead" : "story-body"}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="paper" aria-labelledby="phil-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal">{a.philosophy.eyebrow}</span>
            <h2 id="phil-title" className="reveal">{a.philosophy.title}</h2>
          </div>
          <ol className="principles">
            {a.philosophy.items.map((p, i) => (
              <li key={p.title} className="reveal">
                <span className="way-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mission-gap" />
      <Mission title={home.mission.title} text={home.mission.text} />

      <Cta {...a.cta} />
    </>
  );
}
