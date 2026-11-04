import { Pool } from "pg";

// One shared connection pool to the Neon Postgres database (DATABASE_URL in .env.local).
// Kept on globalThis so hot-reload in development doesn't open a new pool on every edit.
const globalForDb = globalThis as unknown as { garcodePool?: Pool };

export const pool =
  globalForDb.garcodePool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") globalForDb.garcodePool = pool;
