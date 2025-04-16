import { seed } from 'drizzle-seed';
import { listingsTable, userComment, userListing, userTable } from './schema';
import { db } from '.';

export async function seedDatabase() {
  await seed(db, { listingsTable }, { count: 5 });
  await seed(db, { userTable }, { count: 5 });
  await seed(db, { userListing }, { count: 5 });
  await seed(db, { userComment }, { count: 5 });
}

seedDatabase();
