import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import Placeholder from "@/components/Placeholder";
import Text from "@/components/Text";
import { work as w } from "@/content/site";

export const metadata: Metadata = {
  title: w.meta.title,
  description: w.meta.description,
  openGraph: { title: w.meta.title, description: w.meta.description },
};

export default function WorkPage() {
  return (
    <>
      <PageHero {...w.hero} />

      <section className="paper" aria-label="Case studies">
        <div className="wrap case-list">
          {w.caseStudies.map((c, i) => (
            <article key={i} className="case reveal">
              <div className="case-meta">
                <span className="way-num">Case Study {String(i + 1).padStart(2, "0")}</span>
                <h2><Text value={c.title} /></h2>
                <dl className="facts">
                  <div><dt>Client</dt><dd><Text value={c.client} /></dd></div>
                  <div><dt>Industry</dt><dd><Text value={c.industry} /></dd></div>
                  <div><dt>Service</dt><dd><Text value={c.service} /></dd></div>
                </dl>
              </div>
              <div className="case-body">
                <div><h3>The challenge</h3><p><Text value={c.challenge} /></p></div>
                <div><h3>What we delivered</h3><p><Text value={c.delivered} /></p></div>
                <div className="case-result"><h3>The result</h3><p><Text value={c.result} /></p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {w.students.show && (
        <section aria-labelledby="students-title">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow reveal">{w.students.eyebrow}</span>
              <h2 id="students-title" className="reveal">{w.students.title}</h2>
            </div>
            <div className="card-grid">
              {w.students.items.map((s, i) => (
                <article key={i} className="student reveal">
                  <Placeholder label="Student project" light />
                  <h3><Text value={s.project} /></h3>
                  <p><Text value={s.student} /> · <Text value={s.track} /></p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Cta {...w.cta} body="" social={false} />
    </>
  );
}
