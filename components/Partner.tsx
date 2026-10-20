import Placeholder from "./Placeholder";
import { home } from "@/content/site";

export default function Partner() {
  const p = home.partner;
  return (
    <section aria-labelledby="partner-title">
      <div className="wrap partner-grid">
        <Placeholder label={p.photo} light className="reveal" />
        <div className="partner-copy">
          <span className="eyebrow reveal">{p.eyebrow}</span>
          <h2 id="partner-title" className="reveal">{p.title}</h2>
          {p.paragraphs.map((t) => <p key={t.slice(0, 20)} className="reveal">{t}</p>)}
        </div>
      </div>
    </section>
  );
}
