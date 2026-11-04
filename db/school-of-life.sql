-- School of Life progress tables. Run by `npm run db:setup` (safe to run more than once).
-- The account tables (user, session, account, verification) are created by Better Auth in the same script.

-- One row per learner per lesson they've opened.
create table if not exists sol_progress (
  user_id        text        not null references "user"(id) on delete cascade,
  lesson_id      text        not null,               -- matches `id` in content/schoolOfLife.ts
  position_sec   integer     not null default 0,     -- where they stopped watching, for "Resume"
  duration_sec   integer     not null default 0,
  completed_at   timestamptz,                        -- set once, when the lesson is first completed
  quiz_correct   boolean,                            -- null = not answered yet
  xp             integer     not null default 0,     -- XP earned on this lesson
  updated_at     timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists sol_progress_user_updated on sol_progress (user_id, updated_at desc);

-- One row per learner per day they completed at least one lesson. Drives the daily streak.
create table if not exists sol_activity (
  user_id  text not null references "user"(id) on delete cascade,
  day      date not null,
  primary key (user_id, day)
);
