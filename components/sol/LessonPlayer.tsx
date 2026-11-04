"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { answerQuiz, markLessonComplete, saveLessonPosition } from "@/app/school-of-life/actions";
import { Arrow, Check, FeatureIcon } from "../Icons";

// Minimal types for the YouTube IFrame Player API (https://developers.google.com/youtube/iframe_api_reference)
type YTPlayer = {
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
};
type YTNamespace = {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
  PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2 };
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTube(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(window.YT!);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

type Props = {
  lessonId: string;
  youtubeId: string;
  title: string;
  startAt: number;
  completed: boolean;
  quiz: { question: string; options: readonly string[] } | null;
  quizAnswered: boolean | null;
  next: { href: string; title: string } | null;
};

export default function LessonPlayer({ lessonId, youtubeId, title, startAt, completed: initiallyCompleted, quiz, quizAnswered, next }: Props) {
  const router = useRouter();
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [completing, setCompleting] = useState(false);
  const [toast, setToast] = useState("");
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState<{ correct: boolean; answer: number; explain: string } | null>(null);
  const [videoError, setVideoError] = useState(false);
  const completedRef = useRef(initiallyCompleted);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2600);
  };

  async function complete() {
    if (completedRef.current) return;
    completedRef.current = true;
    setCompleting(true);
    const res = await markLessonComplete(lessonId);
    setCompleting(false);
    if (res.ok) {
      setCompleted(true);
      if (res.xp) showToast(`Lesson complete · +${res.xp} XP`);
      router.refresh();
    } else {
      completedRef.current = false;
    }
  }

  // Create the YouTube player and save the viewer's place every 10 seconds while it plays.
  useEffect(() => {
    if (!youtubeId || !mount.current) return;
    let timer: number | undefined;
    let cancelled = false;
    const save = () => {
      const p = player.current;
      if (!p || completedRef.current) return;
      const t = p.getCurrentTime?.() ?? 0;
      const d = p.getDuration?.() ?? 0;
      if (t > 0) saveLessonPosition(lessonId, t, d);
    };

    loadYouTube().then((YT) => {
      if (cancelled || !mount.current) return;
      player.current = new YT.Player(mount.current, {
        videoId: youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { start: Math.floor(startAt), playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (e: { data: number }) => {
            window.clearInterval(timer);
            if (e.data === YT.PlayerState.PLAYING) timer = window.setInterval(save, 10_000);
            if (e.data === YT.PlayerState.PAUSED) save();
            if (e.data === YT.PlayerState.ENDED) complete();
          },
          onError: () => setVideoError(true),
        },
      });
    });

    const onHide = () => document.visibilityState === "hidden" && save();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelled = true;
      save();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onHide);
      player.current?.destroy();
      player.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, youtubeId]);

  async function pick(i: number) {
    if (choice !== null) return;
    setChoice(i);
    const res = await answerQuiz(lessonId, i);
    if (res.ok) {
      setResult({ correct: res.correct, answer: res.answer, explain: res.explain });
      if (res.xp) showToast(`Correct · +${res.xp} XP`);
      router.refresh();
    } else {
      setChoice(null);
    }
  }

  const showQuiz = completed && quiz && (quizAnswered === null || result !== null);
  const quizDone = quizAnswered !== null || result !== null;

  return (
    <div className="player-wrap">
      <div className="player-frame">
        {youtubeId && !videoError ? (
          <div ref={mount} className="player-mount" title={title} />
        ) : (
          <div className="player-empty">
            <FeatureIcon name="play" />
            <p>{videoError ? "This video couldn't load. Check your connection, or try again later." : "Video coming soon"}</p>
          </div>
        )}
        {toast && <div className="player-toast" role="status">{toast}</div>}
      </div>

      <div className="player-panel">
        {!completed && youtubeId && (
          <div className="player-actions">
            <p>Watch to the end to complete the lesson, or mark it done yourself.</p>
            <button className="btn btn-dark" onClick={complete} disabled={completing}>
              {completing ? "Saving…" : "Mark as Complete"} <Check />
            </button>
          </div>
        )}

        {showQuiz && (
          <div className="quiz">
            <span className="quiz-label">Quick check</span>
            <p className="quiz-q">{quiz.question}</p>
            <div className="quiz-options">
              {quiz.options.map((o, i) => {
                const state = result ? (i === result.answer ? "right" : i === choice ? "wrong" : "") : i === choice ? "picked" : "";
                return (
                  <button key={o} className={`quiz-opt ${state}`} onClick={() => pick(i)} disabled={choice !== null}>
                    {o}
                  </button>
                );
              })}
            </div>
            {result && (
              <p className={`quiz-explain ${result.correct ? "right" : "wrong"}`} role="status">
                <strong>{result.correct ? "Correct." : "Not quite."}</strong> {result.explain}
              </p>
            )}
          </div>
        )}

        {completed && (!quiz || quizDone) && (
          <div className="player-next">
            <p><Check /> {quizAnswered !== null && !result ? "You've completed this lesson." : "Lesson complete. Nice work."}</p>
            {next ? (
              <Link className="btn btn-primary" href={next.href}>Next: {next.title} <Arrow /></Link>
            ) : (
              <Link className="btn btn-primary" href="/school-of-life/dashboard">Back to My Dashboard <Arrow /></Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
