import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cta from "@/components/Cta";
import Text from "@/components/Text";
import { QuoteMark } from "@/components/Icons";
import { testimonials as t } from "@/content/site";

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  openGraph: { title: t.meta.title, description: t.meta.description },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero {...t.hero} />

      {t.groups.map((g, gi) => (
        <section key={g.title} className={gi % 2 === 0 ? "paper" : undefined} aria-labelledby={`tg-${gi}`}>
          <div className="wrap">
            <div className="group-head">
              <span className="way-num reveal">{String(gi + 1).padStart(2, "0")}</span>
              <h2 id={`tg-${gi}`} className="reveal">{g.title}</h2>
            </div>
            <div className={`quote-grid ${g.items.length === 1 ? "single" : ""}`}>
              {g.items.map((q, qi) => (
                <figure key={qi} className="quote reveal">
                  <span className="quote-mark"><QuoteMark /></span>
                  <blockquote><Text value={q.quote} /></blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true" />
                    <span>
                      <strong><Text value={q.name} /></strong>
                      <span className="quote-detail"><Text value={q.detail} /></span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Cta {...t.cta} body="" />
    </>
  );
}
