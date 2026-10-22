import { home } from "@/content/site";

const bars = [14, 34, 8, 22, 10, 40, 6, 18];

// Blue mission card. Used on the home page and the About page.
export default function Mission({
  title = home.mission.title,
  text = home.mission.text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="wrap">
        <div className="mission-card reveal">
          <div className="bars" aria-hidden="true">
            {bars.map((w, i) => <span key={i} style={{ width: w }} />)}
          </div>
          <h2 id="mission-title" className="eyebrow" style={{ fontSize: 13 }}>{title}</h2>
          <blockquote>{text}</blockquote>
        </div>
      </div>
    </section>
  );
}
