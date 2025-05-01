import { db } from '../';
import { listingsTable, listingCommentsTable, userListingTable, userTable } from '../schema';
import { faker } from '@faker-js/faker';
import { logger } from '@/server/logger';
import { toPascalCase } from '@/server/db/utils/text';

// Generate fake data without specifying "id"
// (The database will generate the id using gen_random_uuid())
const generateListing = (): typeof listingsTable.$inferInsert => ({
  title: toPascalCase(faker.lorem.words(5)),
  description: faker.lorem.sentence(5),
  price: faker.commerce.price(),
  date: faker.date.past(),
  address: faker.location.streetAddress(), // using location to avoid deprecation
  isNegociable: faker.datatype.boolean(),
  area: String(faker.number.float({ min: 20, max: 200, fractionDigits: 2 })),
  rooms: faker.number.int({ min: 1, max: 10 }),
  ownerType: faker.helpers.arrayElement(['individual', 'agency', 'developer']),
  ownershipType: faker.helpers.arrayElement(['full', 'partial']),
  buildingType: faker.helpers.arrayElement(['apartment', 'house']),
  handoverYear: String(faker.date.past().getFullYear()),
  isClosedKitchen: faker.datatype.boolean(),
  availableAfter: faker.date.future(),
  state: faker.helpers.arrayElement(['new', 'almost_new', 'needs_repair']),
  estimatedRent: faker.commerce.price(),
  isActive: faker.datatype.boolean(),
  totalViews: String(faker.number.int({ min: 0, max: 1000 })),
  totalLikes: String(faker.number.int({ min: 0, max: 100 })),
  isAcceptingMortgageLoan: faker.datatype.boolean(),
  country: faker.location.country(),
  city: faker.location.city(),
  latitude: String(faker.location.latitude()),
  longitude: String(faker.location.longitude()),
  floor: faker.number.int({ min: 1, max: 10 }),
  maxFloor: faker.number.int({ min: 1, max: 10 }),
});

const generateUser = (): Omit<typeof userTable.$inferInsert, 'id'> => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  dateOfBirth: faker.date.past(),
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  rating: faker.number.int({ min: 1, max: 5 }),
});

// For comments, we use parameters later
const generateComment = (userId: string, listingId: string) => ({
  userId,
  listingId,
  commentText: faker.lorem.sentence(),
  createdAt: new Date(),
  updatedAt: new Date(),
  rating: faker.number.int({ min: 1, max: 5 }),
});

export async function seedDatabase() {
  try {
    await db.transaction(async (trx) => {
      // --- Manually Insert Parent Table Rows ---
      const listingsData = Array.from({ length: 5 }).map(() => generateListing());
      const usersData = Array.from({ length: 5 }).map(() => generateUser());

      // Insert and return the inserted rows.
      const insertedListings = await trx.insert(listingsTable).values(listingsData).returning();
      const insertedUsers = await trx.insert(userTable).values(usersData).returning();

      // Sanity check – if no rows, throw error.
      if (insertedListings.length === 0 || insertedUsers.length === 0) {
        throw new Error('No seeded users or listings found.');
      }

      // --- Insert Join Table Rows ---
      // Randomly pair users and listings.
      const joinRows = Array.from({ length: 5 }).map(() => ({
        userId: insertedUsers[Math.floor(Math.random() * insertedUsers.length)].id,
        listingId: insertedListings[Math.floor(Math.random() * insertedListings.length)].id,
      }));
      await trx.insert(userListingTable).values(joinRows);

      // --- Insert Comment Rows ---
      const commentsRows = Array.from({ length: 5 }).map(() => {
        // For each comment, pick a random user and listing.
        const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)].id;
        const randomListing = insertedListings[Math.floor(Math.random() * insertedListings.length)].id;
        return generateComment(randomUser, randomListing);
      });
      await trx.insert(listingCommentsTable).values(commentsRows);
    });
    logger.debug('Database seeding completed successfully.');
  } catch (error) {
    logger.error('Error during database seeding:', error);
    throw error;
  }
}

seedDatabase().catch((error) => {
  logger.error('Seeding failed:', error);
});
