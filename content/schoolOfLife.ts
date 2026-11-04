// School of Life by Garcode — all copy, tracks and lessons.
// Source: "Garcode - School of Life Website Extension Copy.pdf".
//
// ADDING VIDEOS: each lesson has a `youtubeId`. Paste the ID from the YouTube link:
//   https://www.youtube.com/shorts/AbC123xyz  →  youtubeId: "AbC123xyz"
//   https://youtu.be/AbC123xyz                →  youtubeId: "AbC123xyz"
//   https://www.youtube.com/watch?v=AbC123xyz →  youtubeId: "AbC123xyz"
// Lessons with an empty youtubeId show "Video coming soon" and can't be completed yet.
// Videos can be unlisted on YouTube; they still play here.
//
// ADDING LESSONS: add another object to a module's `lessons` list. Give every lesson a unique,
// permanent `id` — learners' progress is saved against it, so don't rename ids after launch.
//
// QUIZZES: each lesson's `quiz` is the quick check shown after the video. The questions below
// are DRAFTS written from the module titles — Garcode should review or replace them.
// Set `quiz: null` to skip the check for a lesson.

export type Quiz = { question: string; options: string[]; answer: number; explain: string };
export type Lesson = { id: string; title: string; youtubeId: string; minutes: number; quiz: Quiz | null };
export type Module = { title: string; lessons: Lesson[] };
export type Track = {
  id: string;
  category: string;
  focus: string;
  icon: "mentor" | "spark" | "pen" | "user" | "bulb";
  modules: Module[];
  // Academy cohort to suggest on the dashboard once a learner is into this track.
  academyTrack?: string;
};

export const XP = { lesson: 10, quiz: 5 } as const;
// Streak days are counted in this time zone.
export const STREAK_TIMEZONE = "Africa/Lagos";
// The "Ready to turn micro-lessons into complete products?" card mentions a track once a
// learner has completed this many lessons in it.
export const ECOSYSTEM_CARD_THRESHOLD = 1;

export const sol = {
  name: "School of Life by Garcode",
  announcement: {
    text: "Introducing School of Life by Garcode: Master in-demand digital micro-skills in just 3 to 5 minutes a day.",
    cta: { label: "Try It Free", href: "/school-of-life" },
  },
  meta: {
    title: "School of Life by Garcode | Micro-Learning in 3 to 5 Minutes a Day",
    description:
      "School of Life is Garcode's interactive micro-learning platform: bite-sized vertical video lessons with instant challenges, streaks and XP. Free to start.",
  },
  hero: {
    eyebrow: "School of Life by Garcode",
    title: "Learn What School Forgot to Teach You",
    accent: "in 3 to 5 Minutes a Day.",
    lead:
      "School of Life is Garcode’s interactive micro-learning platform built for busy minds. Powered by Garcode’s commitment to raising digitally empowered leaders, School of Life delivers bite-sized, Instagram-style video lessons with instant interactive challenges so you can build real-world skills on your commute, coffee break, or lunch hour.",
    primary: { label: "Start Micro-Learning Free", href: "/school-of-life/register" },
    secondary: { label: "Explore Learning Tracks", href: "/school-of-life#tracks" },
    trust: ["Mobile-first vertical videos", "Integrated into Garcode Academy", "3-minute average lesson length", "No credit card required"],
  },
  academySection: {
    eyebrow: "School of Life",
    title: "Learn On Your Schedule: Introducing Garcode’s School of Life 📱",
    challenge: {
      title: "The Challenge",
      body: "Traditional courses demand hours of uninterrupted time. Busy professionals, students, and leaders struggle to fit 45-minute lectures into chaotic daily schedules.",
    },
    solution: {
      title: "The Solution",
      body: "School of Life bridges the gap between learning and doing through micro-learning. By combining vertical video delivery with LMS-grade interactive checkpoints, you can master technical, career, and leadership competencies 3 to 5 minutes at a time.",
    },
    featuresTitle: "Key Features of the Extension",
    features: [
      { icon: "devices", title: "Video Feed Style", body: "High-production, mobile-optimized 3-to-5 minute video modules formatted vertically for modern attention spans." },
      { icon: "bulb", title: "In-Video Interactive Prompts", body: "Active learning built-in: pause mid-video to answer micro-quizzes, choose scenario outcomes, and reinforce knowledge instantly." },
      { icon: "growth", title: "Gamified Learning Streaks & XP", body: "Build daily streaks, earn XP, unlock skill badges, and track your growth on your personalized Garcode LMS dashboard." },
      { icon: "link", title: "Seamless Integration with Garcode Tracks", body: "Use School of Life micro-lessons as standalone skill refreshers or as daily prep modules for Garcode Academy’s full-stack development, UI/UX, AI fundamentals, and data analytics tracks." },
    ],
    cta: { label: "Explore School of Life", href: "/school-of-life" },
  },
  tracksSection: {
    eyebrow: "Featured Micro-Tracks",
    title: "Pick a track. Grow 3 minutes at a time.",
  },
  dashboard: {
    // {name}, {minutes}, {module} and {lesson} are filled in for each learner.
    greeting: "Welcome back to Garcode, {name}!",
    greetingNew: "Welcome to Garcode, {name}!",
    status: "You are {minutes} away from completing Module {module}: “{lesson}.”",
    statusStart: "Start your first micro-lesson: Module {module}: “{lesson}.”",
    statusNext: "Up next: Module {module}: “{lesson}.”",
    statusDone: "You’ve completed every lesson available. New lessons are on the way.",
    resume: "Resume 3-Min Lesson",
    start: "Start 3-Min Lesson",
    ecosystem: {
      title: "Ready to turn micro-lessons into complete products?",
      // {count} and {track} are filled in from the learner's progress.
      progress: "You’ve completed {count} {modules} in {track}!",
      body: "Upgrade to a full Garcode Academy Cohort for hands-on mentorship, real project builds, and career launch guidance.",
      cta: { label: "Explore Full Cohorts", href: "/academy" },
    },
  },
  closing: {
    eyebrow: "Garcode + School of Life",
    title: "3 Minutes Today. Real Growth Tomorrow.",
    body: "Join African learners and professionals building future-ready digital skills with Garcode.",
    primary: { label: "Join School of Life Free", href: "/school-of-life/register" },
    secondary: { label: "Talk to Us for Corporate Training", href: "/contact?interest=business-training" },
  },
  auth: {
    register: { title: "Join School of Life", lead: "Free forever for micro-lessons. No credit card required.", button: "Create My Free Account" },
    login: { title: "Welcome back", lead: "Log in to pick up where you left off.", button: "Log In" },
    forgot: { title: "Reset your password", lead: "Enter the email you signed up with and we’ll send you a link to choose a new password.", button: "Send Reset Link", sent: "If that email has an account, a reset link is on its way. Check your inbox (and spam folder)." },
    reset: { title: "Choose a new password", button: "Save New Password", done: "Password updated. You can log in now." },
  },
} as const;

// Shorthand for a lesson. Each title becomes a lesson inside its module.
const L = (id: string, title: string, quiz: Quiz | null, youtubeId = "", minutes = 3): Lesson => ({ id, title, youtubeId, minutes, quiz });

export const tracks: Track[] = [
  {
    id: "career-leadership",
    category: "Career & Professional Leadership",
    focus: "Modern Management & Growth",
    icon: "mentor",
    modules: [
      { title: "Executive Presence in Meetings", lessons: [
        L("career-executive-presence-1", "Executive Presence in Meetings", { question: "Which habit does the most to build presence in a meeting?", options: ["Speaking first on every topic", "Making one clear, well-prepared point", "Reading your notes word for word", "Staying silent to avoid mistakes"], answer: 1, explain: "Presence comes from clarity, not volume. One well-prepared point lands better than many unfocused ones." }),
      ] },
      { title: "Negotiating Your Worth", lessons: [
        L("career-negotiating-counter-offer", "Structuring a Salary Counter-Offer", { question: "What should a strong counter-offer be anchored to?", options: ["What your friends earn", "Your current salary only", "Market data for the role and the value you bring", "The first number the employer gives"], answer: 2, explain: "Anchor your number to evidence: market rates for the role plus the specific value you bring." }),
      ] },
      { title: "Feedback Systems for Teams", lessons: [
        L("career-feedback-systems-1", "Feedback Systems for Teams", { question: "What makes feedback most useful?", options: ["It is specific and given soon after the event", "It is saved for the yearly review", "It focuses on personality", "It is only given when something goes wrong"], answer: 0, explain: "Timely, specific feedback about actions (not personality) is the easiest to act on." }),
      ] },
    ],
  },
  {
    id: "ai-digital",
    category: "AI & Digital Transformation",
    focus: "Applied Technology & AI",
    icon: "spark",
    academyTrack: "AI Fundamentals & Automation",
    modules: [
      { title: "Prompt Engineering Basics (CRIT Framework)", lessons: [
        L("ai-prompt-crit-1", "Prompt Engineering Basics (CRIT Framework)", { question: "Why give an AI assistant context in your prompt?", options: ["It makes the answer longer", "It helps the AI tailor the answer to your situation", "AI tools ignore context anyway", "It is required to log in"], answer: 1, explain: "Context tells the model who you are and what you need, so its answer fits your real situation." }),
      ] },
      { title: "Data Literacy for Non-Techies", lessons: [
        L("ai-data-literacy-1", "Data Literacy for Non-Techies", { question: "A chart shows sales rising every month. What should you check first?", options: ["The colours used", "Where the data came from and what the axis starts at", "How many people liked the post", "Nothing — charts are always accurate"], answer: 1, explain: "Always check the source and the scale. A y-axis that doesn't start at zero can make small changes look huge." }),
      ] },
      { title: "Responsible AI Practices", lessons: [
        L("ai-responsible-1", "Responsible AI Practices", { question: "Which is a responsible way to use AI at work?", options: ["Paste customer personal data into any free tool", "Publish AI output without reading it", "Review AI output for accuracy and protect private data", "Let AI make hiring decisions alone"], answer: 2, explain: "Check AI output before you use it, and keep personal or confidential data out of tools that aren't approved for it." }),
      ] },
    ],
  },
  {
    id: "design-product",
    category: "Design & Product",
    focus: "Product Creation & UI/UX",
    icon: "pen",
    academyTrack: "UI/UX Design",
    modules: [
      { title: "UI/UX Design Systems Essentials", lessons: [
        L("design-systems-1", "UI/UX Design Systems Essentials", { question: "What is the main benefit of a design system?", options: ["Every screen looks different", "Consistent, reusable components that speed up design and build", "It replaces user research", "It only matters for large companies"], answer: 1, explain: "Shared components and rules keep products consistent and let teams design and build faster." }),
      ] },
      { title: "Figma Micro-Shortcuts", lessons: [
        L("design-figma-shortcuts-1", "Figma Micro-Shortcuts", { question: "In Figma, what does Auto Layout help you do?", options: ["Export to PDF", "Make frames resize and space content automatically", "Change the file name", "Add comments"], answer: 1, explain: "Auto Layout lets frames grow, shrink and space their contents automatically, like a real interface." }),
      ] },
      { title: "Product Management 101", lessons: [
        L("design-pm-101-1", "Product Management 101", { question: "What should a product manager understand before deciding what to build?", options: ["The user's problem", "The newest tech trend", "The competitor's logo", "The office layout"], answer: 0, explain: "Good products start with a clear understanding of the user's problem." }),
      ] },
    ],
  },
  {
    id: "tech-boomers",
    category: "Tech Boomers & Literacy",
    focus: "Digital Essentials",
    icon: "user",
    academyTrack: "Tech Boomers",
    modules: [
      { title: "Essential Digital Skills", lessons: [
        L("boomers-essential-skills-1", "Essential Digital Skills", { question: "What is the safest way to keep your phone apps working well?", options: ["Never update them", "Install updates from the official app store", "Download apps from links in messages", "Delete the app store"], answer: 1, explain: "Official updates fix problems and security holes. Only install apps from the official store." }),
      ] },
      { title: "Cybersecurity Hygiene", lessons: [
        L("boomers-cyber-hygiene-1", "Cybersecurity Hygiene", { question: "You get a text saying your bank account is locked, with a link. What should you do?", options: ["Click the link quickly", "Reply with your PIN", "Contact the bank using the number on your card or official app", "Forward it to friends"], answer: 2, explain: "Never use links in unexpected messages. Contact the bank through a number or app you already trust." }),
      ] },
      { title: "Navigating Modern Tech Tools", lessons: [
        L("boomers-modern-tools-1", "Navigating Modern Tech Tools", { question: "What is a video-call app like Google Meet or Zoom mainly used for?", options: ["Editing photos", "Meeting and talking with people over the internet", "Paying bills", "Typing documents"], answer: 1, explain: "Video-call apps let you see and talk to people anywhere with an internet connection." }),
      ] },
    ],
  },
  {
    id: "faith-spirituality",
    category: "Faith & Spirituality",
    focus: "Faith, Hope & Love",
    icon: "bulb",
    modules: [
      { title: "Faith, Hope & Love Essentials", lessons: [
        L("faith-essentials-1", "Faith, Hope & Love Essentials", { question: "In 1 Corinthians 13, which of faith, hope and love is called the greatest?", options: ["Faith", "Hope", "Love", "All are equal"], answer: 2, explain: "“And now these three remain: faith, hope and love. But the greatest of these is love.” (1 Corinthians 13:13)" }),
      ] },
      { title: "Practical Ethics & Character Leadership", lessons: [
        L("faith-ethics-character-1", "Practical Ethics & Character Leadership", { question: "Which best shows character-based leadership?", options: ["Doing the right thing even when no one is watching", "Taking credit for the team's work", "Changing values to please everyone", "Avoiding hard decisions"], answer: 0, explain: "Character shows in what you do when no one is checking." }),
      ] },
      { title: "Daily Mindfulness & Mindset Renewal", lessons: [
        L("faith-mindfulness-1", "Daily Mindfulness & Mindset Renewal", { question: "Which small daily habit supports mindset renewal?", options: ["Starting the day scrolling news", "A few quiet minutes of reflection or gratitude", "Skipping sleep", "Multitasking all day"], answer: 1, explain: "Even a few minutes of quiet reflection or gratitude each day helps reset your focus." }),
      ] },
      { title: "Purpose-Driven Career & Vocation", lessons: [
        L("faith-purpose-career-1", "Purpose-Driven Career & Vocation", { question: "A purpose-driven career starts with…", options: ["Choosing the highest salary only", "Understanding your gifts and the needs you can serve", "Copying a friend's path", "Waiting for the perfect job"], answer: 1, explain: "Purpose grows where your gifts meet real needs around you." }),
      ] },
    ],
  },
];

// ---------- Helpers ----------

export type LessonRef = { lesson: Lesson; module: Module; moduleIndex: number; track: Track };

export const allLessons: LessonRef[] = tracks.flatMap((track) =>
  track.modules.flatMap((module, mi) => module.lessons.map((lesson) => ({ lesson, module, moduleIndex: mi + 1, track })))
);

export const findLesson = (id: string): LessonRef | undefined => allLessons.find((l) => l.lesson.id === id);

export const trackLessons = (trackId: string) => allLessons.filter((l) => l.track.id === trackId);
