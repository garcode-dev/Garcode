import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonPlayer from "@/components/sol/LessonPlayer";
import { Check, FeatureIcon } from "@/components/Icons";
import { requireUser } from "@/lib/auth";
import { getProgress } from "@/lib/sol";
import { allLessons, findLesson, trackLessons } from "@/content/schoolOfLife";

type Props = { params: Promise<{ lessonId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ref = findLesson((await params).lessonId);
  return { title: `${ref?.lesson.title ?? "Lesson"} | School of Life by Garcode`, robots: { index: false } };
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params;
  const ref = findLesson(lessonId);
  if (!ref) notFound();
  const user = await requireUser(`/school-of-life/learn/${lessonId}`);
  const progress = await getProgress(user.id);
  const row = progress.get(lessonId);

  const inTrack = trackLessons(ref.track.id);
  const index = inTrack.findIndex((l) => l.lesson.id === lessonId);
  // Next playable lesson: rest of this track first, then the following tracks.
  const globalIndex = allLessons.findIndex((l) => l.lesson.id === lessonId);
  const next = allLessons.slice(globalIndex + 1).find((l) => l.lesson.youtubeId);

  // Resume where they stopped, unless they'd reached the end or already finished.
  const startAt = row && !row.completed_at && row.position_sec < Math.max(0, row.duration_sec - 5) ? row.position_sec : 0;
  const { quiz } = ref.lesson;

  return (
    <section className="lesson">
      <div className="wrap lesson-grid">
        <div className="lesson-stage">
          <LessonPlayer
            key={lessonId}
            lessonId={lessonId}
            youtubeId={ref.lesson.youtubeId}
            title={ref.lesson.title}
            startAt={startAt}
            completed={!!row?.completed_at}
            quiz={quiz ? { question: quiz.question, options: quiz.options } : null}
            quizAnswered={row?.quiz_correct ?? null}
            next={next ? { href: `/school-of-life/learn/${next.lesson.id}`, title: next.lesson.title } : null}
          />
        </div>

        <aside className="lesson-side">
          <Link href="/school-of-life/dashboard" className="lesson-back">← My Dashboard</Link>
          <span className="eyebrow">{ref.track.category}</span>
          <h1>{ref.lesson.title}</h1>
          <p className="lesson-meta">Module {ref.moduleIndex}: {ref.module.title} · Lesson {index + 1} of {inTrack.length} in this track</p>

          <h2 className="lesson-list-title">In this track</h2>
          <ol className="lesson-list">
            {inTrack.map((l) => {
              const r = progress.get(l.lesson.id);
              const current = l.lesson.id === lessonId;
              const state = r?.completed_at ? "done" : !l.lesson.youtubeId ? "soon" : "open";
              const inner = (
                <>
                  <span className="dash-lesson-icon">{state === "done" ? <Check /> : state === "soon" ? <FeatureIcon name="lock" /> : <FeatureIcon name="play" />}</span>
                  <span className="lesson-list-text">
                    <strong>{l.lesson.title}</strong>
                    <span>Module {l.moduleIndex} · {state === "soon" ? "Coming soon" : `${l.lesson.minutes} min`}</span>
                  </span>
                </>
              );
              return (
                <li key={l.lesson.id} className={`${state} ${current ? "current" : ""}`}>
                  {state === "soon" || current ? (
                    <span className="lesson-list-row" aria-current={current ? "page" : undefined}>{inner}</span>
                  ) : (
                    <Link className="lesson-list-row" href={`/school-of-life/learn/${l.lesson.id}`}>{inner}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </section>
  );
}
