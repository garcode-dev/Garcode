import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Check, FeatureIcon, type FeatureIconName } from "@/components/Icons";
import SmartLink from "@/components/SmartLink";
import { requireUser } from "@/lib/auth";
import { getProgress, getSummary } from "@/lib/sol";
import { ECOSYSTEM_CARD_THRESHOLD, sol, tracks } from "@/content/schoolOfLife";

export const metadata: Metadata = { title: "My Dashboard | School of Life by Garcode", robots: { index: false } };

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

function minutesLeft(position: number, duration: number, fallbackMin: number) {
  const secs = duration > 0 ? Math.max(0, duration - position) : fallbackMin * 60;
  if (secs < 60) return "less than a minute";
  const m = Math.ceil(secs / 60);
  return `${m} minute${m === 1 ? "" : "s"}`;
}

export default async function DashboardPage() {
  const user = await requireUser("/school-of-life/dashboard");
  const [summary, progress] = await Promise.all([getSummary(user.id), getProgress(user.id)]);
  const d = sol.dashboard;
  const firstName = user.name.split(" ")[0];
  const isNew = progress.size === 0;

  // Welcome bar status line + button
  let status: string = d.statusDone;
  let cta: { label: string; href: string } | null = null;
  const n = summary.next;
  if (n) {
    const vars = { module: n.ref.moduleIndex, lesson: n.ref.lesson.title };
    const href = `/school-of-life/learn/${n.ref.lesson.id}`;
    if (n.kind === "resume" && n.row) {
      status = fill(d.status, { ...vars, minutes: minutesLeft(n.row.position_sec, n.row.duration_sec, n.ref.lesson.minutes) });
      cta = { label: d.resume, href };
    } else {
      status = fill(n.kind === "start" ? d.statusStart : d.statusNext, vars);
      cta = { label: d.start, href };
    }
  }

  // Ecosystem card: mention the track they've done the most in
  const topTrack = summary.tracks
    .filter((t) => t.academyTrack && t.done >= ECOSYSTEM_CARD_THRESHOLD)
    .sort((a, b) => b.done - a.done || b.lastActive - a.lastActive)[0];

  // Open the track they're working on (or the first) in the list
  const openTrack = n?.ref.track.id ?? tracks[0].id;
  const earned = summary.badges.filter((b) => b.earned).length;

  return (
    <section className="dash">
      <div className="wrap">
        <div className="dash-welcome on-dark">
          <div className="glow g1" />
          <div className="dash-welcome-copy">
            <div className="dash-greet-row">
              <h1>{fill(isNew ? d.greetingNew : d.greeting, { name: firstName })}</h1>
              <span className={`dash-streak ${summary.streak.current ? "" : "off"}`}>
                <FeatureIcon name="flame" />
                {summary.streak.current ? `${summary.streak.current}-Day Streak` : "Start your streak today"}
              </span>
            </div>
            <p>{status}</p>
          </div>
          {cta && (
            <Link className="btn btn-white" href={cta.href}>{cta.label} <Arrow /></Link>
          )}
        </div>

        <dl className="dash-stats">
          <div><dt><FeatureIcon name="star" /> Total XP</dt><dd>{summary.xp}</dd></div>
          <div><dt><FeatureIcon name="play" /> Lessons completed</dt><dd>{summary.completed}<small> / {summary.totalLessons}</small></dd></div>
          <div><dt><FeatureIcon name="flame" /> Best streak</dt><dd>{summary.streak.best}<small> day{summary.streak.best === 1 ? "" : "s"}</small></dd></div>
          <div><dt><FeatureIcon name="award" /> Badges</dt><dd>{earned}<small> / {summary.badges.length}</small></dd></div>
        </dl>

        <div className="dash-grid">
          <div className="dash-main">
            <h2 className="dash-h2">Your micro-tracks</h2>
            <div className="dash-tracks">
              {tracks.map((t) => {
                const stat = summary.tracks.find((s) => s.id === t.id)!;
                const pct = stat.total ? Math.round((stat.done / stat.total) * 100) : 0;
                return (
                  <details key={t.id} className="dash-track" open={t.id === openTrack}>
                    <summary>
                      <span className="icon icon-sm" aria-hidden="true"><FeatureIcon name={t.icon as FeatureIconName} /></span>
                      <span className="dash-track-name">
                        <strong>{t.category}</strong>
                        <span>{stat.done} of {stat.total} lessons · {t.focus}</span>
                      </span>
                      <span className="dash-progress" role="img" aria-label={`${pct}% complete`}><span style={{ width: `${pct}%` }} /></span>
                      <span className="dash-pct">{pct}%</span>
                    </summary>
                    <ol className="dash-modules">
                      {t.modules.map((m, mi) => (
                        <li key={m.title}>
                          <span className="dash-module-title">Module {mi + 1} · {m.title}</span>
                          <ul>
                            {m.lessons.map((l) => {
                              const row = progress.get(l.id);
                              const state = row?.completed_at ? "done" : !l.youtubeId ? "soon" : row && row.position_sec > 0 ? "started" : "new";
                              const label = { done: "Completed", soon: "Coming soon", started: "In progress", new: `${l.minutes} min` }[state];
                              return (
                                <li key={l.id} className={`dash-lesson ${state}`}>
                                  {state === "soon" ? (
                                    <span className="dash-lesson-row">
                                      <span className="dash-lesson-icon"><FeatureIcon name="lock" /></span>
                                      <span className="dash-lesson-title">{l.title}</span>
                                      <span className="dash-lesson-state">{label}</span>
                                    </span>
                                  ) : (
                                    <Link className="dash-lesson-row" href={`/school-of-life/learn/${l.id}`}>
                                      <span className="dash-lesson-icon">{state === "done" ? <Check /> : <FeatureIcon name="play" />}</span>
                                      <span className="dash-lesson-title">{l.title}</span>
                                      <span className="dash-lesson-state">{label}</span>
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </details>
                );
              })}
            </div>
          </div>

          <aside className="dash-side">
            <div className="dash-eco">
              <h2>{d.ecosystem.title}</h2>
              <p>
                {topTrack && <strong>{fill(d.ecosystem.progress, { count: topTrack.done, modules: topTrack.done === 1 ? "micro-module" : "micro-modules", track: topTrack.academyTrack! })} </strong>}
                {d.ecosystem.body}
              </p>
              <SmartLink className="btn btn-primary" href={d.ecosystem.cta.href}>{d.ecosystem.cta.label} <Arrow /></SmartLink>
            </div>

            <div className="dash-badges">
              <h2 className="dash-h2">Skill badges</h2>
              <ul>
                {summary.badges.map((b) => (
                  <li key={b.id} className={b.earned ? "earned" : ""}>
                    <span className="dash-badge-icon" aria-hidden="true"><FeatureIcon name={b.earned ? "award" : "lock"} /></span>
                    <span>
                      <strong>{b.label}</strong>
                      <span>{b.earned ? "Unlocked" : b.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
