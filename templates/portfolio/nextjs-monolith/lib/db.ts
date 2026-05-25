import { env } from '../env.mjs';

/**
 * Database connection using validated environment variables.
 * The `env` object is validated at build time via Zod (see env.mjs).
 * This ensures DATABASE_URL is always defined and correctly formatted.
 */

const globalForDb = globalThis as unknown as {
  dbUrl: string | undefined;
};

export const databaseUrl = globalForDb.dbUrl ?? env.DATABASE_URL;

if (process.env.NODE_ENV !== 'production') {
  globalForDb.dbUrl = databaseUrl;
}
