import { seed } from 'drizzle-seed';
import { listingsTable, userCommentTable, userListingTable, userTable } from './schema';
import { db } from '.';

export async function seedDatabase() {
  await seed(db, { listingsTable }, { count: 5 });
  await seed(db, { userTable }, { count: 5 });
  await seed(db, { userListingTable }, { count: 5 });
  await seed(db, { userCommentTable }, { count: 5 });
}

seedDatabase();
