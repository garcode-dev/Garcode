import { home } from "@/content/site";

export default function Different() {
  const d = home.different;
  return (
    <section className="different on-dark" aria-labelledby="diff-title">
      <div className="glow g1" />
      <div className="wrap">
        <h2 id="diff-title" className="eyebrow reveal" style={{ fontSize: 13 }}>{d.title}</h2>
        <p className="statement reveal">
          {d.start} <span className="dim">{d.dim}</span> {d.end}
        </p>
        <div className="pillars reveal" aria-hidden="true">
          {d.pillars.map((p) => <span key={p}>{p}</span>)}
        </div>
      </div>
    </section>
  );
}
