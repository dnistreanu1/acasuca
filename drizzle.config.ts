import { env } from '@/env';
import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  dbCredentials: { url: env.DATABASE_URL },
  introspect: {
    casing: 'camel',
  },
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
    schema: 'public',
  },

  //extensionsFilters: ['postgis'],
  verbose: true,
  strict: true,
});
