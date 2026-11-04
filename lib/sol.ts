import { pool } from "./db";
import { allLessons, STREAK_TIMEZONE, tracks, type LessonRef } from "@/content/schoolOfLife";

// School of Life progress: reads and writes for the dashboard and lesson pages.

export type ProgressRow = {
  lesson_id: string;
  position_sec: number;
  duration_sec: number;
  completed_at: Date | null;
  quiz_correct: boolean | null;
  xp: number;
  updated_at: Date;
};

export async function getProgress(userId: string): Promise<Map<string, ProgressRow>> {
  const { rows } = await pool.query<ProgressRow>(
    "select lesson_id, position_sec, duration_sec, completed_at, quiz_correct, xp, updated_at from sol_progress where user_id = $1",
    [userId]
  );
  return new Map(rows.map((r) => [r.lesson_id, r]));
}

/** Today's date (YYYY-MM-DD) in the streak time zone. */
export function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: STREAK_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

const dayNumber = (iso: string) => Math.round(Date.parse(iso + "T00:00:00Z") / 86_400_000);

export async function getStreaks(userId: string): Promise<{ current: number; best: number; activeToday: boolean }> {
  const { rows } = await pool.query<{ day: string }>(
    "select to_char(day, 'YYYY-MM-DD') as day from sol_activity where user_id = $1 order by day desc",
    [userId]
  );
  if (!rows.length) return { current: 0, best: 0, activeToday: false };
  const days = rows.map((r) => dayNumber(r.day));
  const t = dayNumber(today());

  // Current streak counts back from today, or from yesterday if they haven't learned yet today.
  let current = 0;
  if (days[0] === t || days[0] === t - 1) {
    current = 1;
    for (let i = 1; i < days.length && days[i] === days[i - 1] - 1; i++) current++;
  }
  let best = 1;
  for (let i = 1, run = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] - 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return { current, best: Math.max(best, current), activeToday: days[0] === t };
}

export async function savePosition(userId: string, lessonId: string, position: number, duration: number) {
  await pool.query(
    `insert into sol_progress (user_id, lesson_id, position_sec, duration_sec, updated_at)
     values ($1, $2, $3, $4, now())
     on conflict (user_id, lesson_id) do update
       set position_sec = excluded.position_sec,
           duration_sec = greatest(sol_progress.duration_sec, excluded.duration_sec),
           updated_at = now()`,
    [userId, lessonId, Math.max(0, Math.round(position)), Math.max(0, Math.round(duration))]
  );
}

/** Marks a lesson complete. Awards XP and counts today's streak only the first time. */
export async function completeLesson(userId: string, lessonId: string, xp: number): Promise<{ firstTime: boolean }> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    const { rowCount } = await client.query(
      `insert into sol_progress (user_id, lesson_id, completed_at, xp, updated_at)
       values ($1, $2, now(), $3, now())
       on conflict (user_id, lesson_id) do update
         set completed_at = now(), xp = sol_progress.xp + $3, updated_at = now()
         where sol_progress.completed_at is null`,
      [userId, lessonId, xp]
    );
    const firstTime = (rowCount ?? 0) > 0;
    if (firstTime) {
      await client.query("insert into sol_activity (user_id, day) values ($1, $2) on conflict do nothing", [userId, today()]);
    } else {
      await client.query("update sol_progress set updated_at = now() where user_id = $1 and lesson_id = $2", [userId, lessonId]);
    }
    await client.query("commit");
    return { firstTime };
  } catch (e) {
    await client.query("rollback");
    throw e;
  } finally {
    client.release();
  }
}

/** Records the first quiz answer for a lesson; later attempts don't change XP. */
export async function recordQuiz(userId: string, lessonId: string, correct: boolean, xp: number): Promise<{ firstTime: boolean }> {
  const { rowCount } = await pool.query(
    `insert into sol_progress (user_id, lesson_id, quiz_correct, xp, updated_at)
     values ($1, $2, $3, $4, now())
     on conflict (user_id, lesson_id) do update
       set quiz_correct = excluded.quiz_correct, xp = sol_progress.xp + $4, updated_at = now()
       where sol_progress.quiz_correct is null`,
    [userId, lessonId, correct, correct ? xp : 0]
  );
  return { firstTime: (rowCount ?? 0) > 0 };
}

// ---------- Dashboard summary ----------

export type Badge = { id: string; label: string; detail: string; earned: boolean };

export type Summary = {
  xp: number;
  completed: number;
  totalLessons: number;
  quizzesCorrect: number;
  streak: { current: number; best: number; activeToday: boolean };
  next: { ref: LessonRef; row?: ProgressRow; kind: "resume" | "next" | "start" } | null;
  tracks: { id: string; category: string; focus: string; icon: string; done: number; total: number; academyTrack?: string; lastActive: number }[];
  badges: Badge[];
};

export async function getSummary(userId: string): Promise<Summary> {
  const [progress, streak] = await Promise.all([getProgress(userId), getStreaks(userId)]);
  const rows = [...progress.values()];
  const xp = rows.reduce((s, r) => s + r.xp, 0);
  const completed = rows.filter((r) => r.completed_at).length;
  const quizzesCorrect = rows.filter((r) => r.quiz_correct).length;

  // What to show in the welcome bar: the most recently opened unfinished lesson, otherwise the
  // next unfinished lesson after the most recent one, otherwise the very first lesson.
  const playable = allLessons.filter((l) => l.lesson.youtubeId);
  const byRecent = rows.slice().sort((a, b) => +b.updated_at - +a.updated_at);
  let next: Summary["next"] = null;
  const inProgress = byRecent.find((r) => !r.completed_at && r.position_sec > 0 && playable.some((l) => l.lesson.id === r.lesson_id));
  if (inProgress) {
    next = { ref: allLessons.find((l) => l.lesson.id === inProgress.lesson_id)!, row: inProgress, kind: "resume" };
  } else {
    const last = byRecent[0] ? allLessons.findIndex((l) => l.lesson.id === byRecent[0].lesson_id) : -1;
    const ordered = [...allLessons.slice(last + 1), ...allLessons.slice(0, last + 1)];
    const candidate = ordered.find((l) => l.lesson.youtubeId && !progress.get(l.lesson.id)?.completed_at)
      ?? ordered.find((l) => !progress.get(l.lesson.id)?.completed_at);
    if (candidate) next = { ref: candidate, row: progress.get(candidate.lesson.id), kind: rows.length ? "next" : "start" };
  }

  const trackStats = tracks.map((t) => {
    const lessons = allLessons.filter((l) => l.track.id === t.id);
    const done = lessons.filter((l) => progress.get(l.lesson.id)?.completed_at).length;
    const lastActive = Math.max(0, ...lessons.map((l) => +(progress.get(l.lesson.id)?.updated_at ?? 0)));
    return { id: t.id, category: t.category, focus: t.focus, icon: t.icon, done, total: lessons.length, academyTrack: t.academyTrack, lastActive };
  });

  const badges: Badge[] = [
    { id: "first", label: "First Step", detail: "Complete your first micro-lesson", earned: completed >= 1 },
    { id: "streak3", label: "3-Day Streak", detail: "Learn 3 days in a row", earned: streak.best >= 3 },
    { id: "streak7", label: "7-Day Streak", detail: "Learn 7 days in a row", earned: streak.best >= 7 },
    { id: "quiz5", label: "Sharp Mind", detail: "Get 5 quick checks right", earned: quizzesCorrect >= 5 },
    ...trackStats.map((t) => ({ id: `track-${t.id}`, label: t.focus, detail: `Finish every lesson in ${t.category}`, earned: t.total > 0 && t.done === t.total })),
  ];

  return { xp, completed, totalLessons: allLessons.length, quizzesCorrect, streak, next, tracks: trackStats, badges };
}
