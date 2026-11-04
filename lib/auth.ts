import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { pool } from "./db";
import { senderAddress } from "./email";
import { authOptions } from "./auth-options.mjs";

// School of Life accounts, run by Better Auth (https://better-auth.com) and stored in Neon.
// Env: DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL (see .env.example).

async function sendResetEmail({ user, url }: { user: { email: string; name: string }; url: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[auth] RESEND_API_KEY is not set — password reset email not sent. Link:", url);
    return;
  }
  const { from, problem } = senderAddress("Garcode <onboarding@resend.dev>");
  if (problem) {
    console.error("[auth]", problem);
    return;
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [user.email],
    subject: "Reset your School of Life password",
    text: `Hi ${user.name},\n\nUse this link to choose a new password for School of Life by Garcode. It expires in 1 hour.\n\n${url}\n\nIf you didn't ask for this, you can ignore this email.`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#12151D">
      <p>Hi ${user.name.replace(/[<>&]/g, "")},</p>
      <p>Use the button below to choose a new password for School of Life by Garcode. The link expires in 1 hour.</p>
      <p><a href="${url}" style="display:inline-block;background:#2B6BFF;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:600">Choose a new password</a></p>
      <p style="color:#5A6070;font-size:13px">If you didn't ask for this, you can ignore this email.</p></div>`,
  });
  if (error) console.error("[auth] Resend error:", error);
}

export const auth = betterAuth({
  ...authOptions,
  database: pool,
  emailAndPassword: {
    ...authOptions.emailAndPassword,
    sendResetPassword: async ({ user, url }) => {
      await sendResetEmail({ user, url });
    },
  },
  plugins: [nextCookies()],
});

export type SessionUser = { id: string; name: string; email: string };

/** The signed-in learner, or null. Use in server components and server actions. */
export async function getUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email };
}

/** The signed-in learner; sends anyone else to the login page. */
export async function requireUser(next = "/school-of-life/dashboard"): Promise<SessionUser> {
  const user = await getUser();
  if (!user) redirect(`/school-of-life/login?next=${encodeURIComponent(next)}`);
  return user;
}
