import { sql } from 'drizzle-orm';
import { db } from '..';
import { logger } from '../../logger';

export async function dropTables() {
  await db.transaction(async (trx) => {
    // Drop the schema
    await trx.execute(sql`DROP SCHEMA public CASCADE;`);
    // Recreate the schema
    await trx.execute(sql`CREATE SCHEMA public;`);
    logger.debug('Database schema reset within transaction.');
  });
}

await dropTables();
