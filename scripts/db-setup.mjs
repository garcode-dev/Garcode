// Creates every table School of Life needs in your Neon database.
// Usage: put DATABASE_URL in .env.local, then run `npm run db:setup`. Safe to run again after updates.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { getMigrations } from "better-auth/db/migration";
import { authOptions } from "../lib/auth-options.mjs";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add your Neon connection string to .env.local first.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  // 1. Account tables (user, session, account, verification), from Better Auth.
  const { runMigrations, toBeCreated, toBeAdded } = await getMigrations({ ...authOptions, database: pool });
  const changes = toBeCreated.length + toBeAdded.length;
  await runMigrations();
  console.log(changes ? `✓ Account tables created/updated (${changes} change${changes > 1 ? "s" : ""})` : "✓ Account tables already up to date");

  // 2. School of Life progress tables.
  const sql = readFileSync(fileURLToPath(new URL("../db/school-of-life.sql", import.meta.url)), "utf8");
  await pool.query(sql);
  console.log("✓ School of Life tables ready");
} catch (err) {
  console.error("Database setup failed:", err.message ?? err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
