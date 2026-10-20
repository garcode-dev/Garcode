import { FeatureIcon, type FeatureIconName } from "./Icons";
import Placeholder from "./Placeholder";
import { home } from "@/content/site";

export default function Expect() {
  const e = home.expect;
  return (
    <section aria-labelledby="expect-title">
      <div className="wrap expect-grid">
        <div>
          <span className="eyebrow reveal">{e.eyebrow}</span>
          <h2 id="expect-title" className="reveal section-title">{e.title}</h2>
          <ul className="expect-list">
            {e.items.map((item) => (
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
        <div className="expect-visual reveal">
          {e.photos.map((p) => <Placeholder key={p} label={p} light />)}
        </div>
      </div>
    </section>
  );
}
