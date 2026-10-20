import Link from "next/link";
import { Arrow } from "./Icons";
import { home } from "@/content/site";

export default function Ways() {
  const w = home.ways;
  return (
    <section className="ways" aria-labelledby="ways-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow reveal">{w.eyebrow}</span>
          <h2 id="ways-title" className="reveal">{w.title}</h2>
        </div>
        <div className="ways-grid">
          {w.items.map((item, i) => {
            const featured = "featured" in item && item.featured;
            return (
              <article key={item.title} className={`way ${featured ? "feature" : ""} reveal`}>
                <span className="way-num">{String(i + 1).padStart(2, "0")}</span>
                {"tag" in item && <span className="tag">{item.tag}</span>}
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link className="way-link" href={item.link.href}>
                  <span>{item.link.label}</span> <Arrow />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
