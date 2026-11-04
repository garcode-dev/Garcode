"use server";

import { getUser } from "@/lib/auth";
import { completeLesson, recordQuiz, savePosition } from "@/lib/sol";
import { findLesson, XP } from "@/content/schoolOfLife";

// Server actions called from the lesson player. Each checks the session itself.

export async function saveLessonPosition(lessonId: string, position: number, duration: number) {
  const user = await getUser();
  if (!user || !findLesson(lessonId)) return { ok: false };
  if (!Number.isFinite(position) || !Number.isFinite(duration)) return { ok: false };
  await savePosition(user.id, lessonId, position, duration);
  return { ok: true };
}

export async function markLessonComplete(lessonId: string) {
  const user = await getUser();
  const ref = findLesson(lessonId);
  if (!user || !ref || !ref.lesson.youtubeId) return { ok: false, firstTime: false, xp: 0 };
  const { firstTime } = await completeLesson(user.id, lessonId, XP.lesson);
  return { ok: true, firstTime, xp: firstTime ? XP.lesson : 0 };
}

export async function answerQuiz(lessonId: string, choice: number) {
  const user = await getUser();
  const quiz = findLesson(lessonId)?.lesson.quiz;
  if (!user || !quiz) return { ok: false, correct: false, answer: -1, explain: "", xp: 0 };
  const correct = choice === quiz.answer;
  const { firstTime } = await recordQuiz(user.id, lessonId, correct, XP.quiz);
  return { ok: true, correct, answer: quiz.answer, explain: quiz.explain, xp: correct && firstTime ? XP.quiz : 0 };
}
