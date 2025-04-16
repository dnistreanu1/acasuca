import { env } from '@/env';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'; // Ensure this is correctly imported

export const db = drizzle(env.DATABASE_URL, { schema: schema });
