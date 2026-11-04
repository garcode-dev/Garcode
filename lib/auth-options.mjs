// Better Auth settings shared by the site (lib/auth.ts) and the database setup script
// (scripts/db-setup.mjs), so the tables the script creates always match what the site expects.

/** @type {import("better-auth").BetterAuthOptions} */
export const authOptions = {
  appName: "School of Life by Garcode",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // stay signed in for 30 days
    updateAge: 60 * 60 * 24,
  },
};
