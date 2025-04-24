import { sql } from 'drizzle-orm';
import {
  boolean,
  decimal,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const ownerType = pgEnum('owner_type_enum', ['individual', 'agency', 'developer'] as const);
export const buildingType = pgEnum('building_type_enum', ['apartment', 'house', 'industrial'] as const);
export const stateType = pgEnum('state_enum', ['new', 'almost_new', 'needs_repair'] as const);

export const listingsTable = pgTable(
  'listing',
  {
    id: uuid()
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    title: varchar({ length: 128 }).notNull(),
    /// Location
    country: varchar({ length: 128 }).notNull(),
    city: varchar({ length: 128 }).notNull(),
    address: varchar({ length: 128 }).notNull(),
    latitude: numeric('latitude', { precision: 9, scale: 6 }).notNull(),
    longitude: numeric('longitude', { precision: 9, scale: 6 }).notNull(),
    floor: integer().notNull(),
    maxFloor: integer('max_floor').notNull(),
    ///
    price: numeric({ precision: 10, scale: 2 }).notNull(),
    date: timestamp({ mode: 'date' }).defaultNow().notNull(),
    description: text().notNull(),
    isNegociable: boolean('is_negociable').default(false),
    area: decimal({ precision: 6, scale: 2 }).notNull(),
    rooms: integer().notNull(),
    ownerType: ownerType('owner_type').notNull(),
    ownershipType: varchar('ownership_type', { length: 128 }).notNull(), // tip drept de proprietate?
    buildingType: buildingType('building_type').notNull(), // tip constructie
    handoverYear: numeric('handover_year').notNull(), // anul de dare in exploatare
    isClosedKitchen: boolean('is_closed_kitchen').notNull(), // bucatarie decomandata
    availableAfter: timestamp({ mode: 'date' }).notNull(), // liber de la
    state: stateType('state').notNull(),
    estimatedRent: numeric('estimated_rent').notNull(), // chirie estimata
    isActive: boolean('is_active').default(true),
    totalViews: numeric('total_views'), // numar de vizualizari
    totalLikes: numeric('total_likes'), // numar de like-uri
    isAcceptingMortgageLoan: boolean('is_accepting_mortgage_loan').notNull(), // accepta credit ipotecar
  },
  (table) => [sql`CHECK (char_length(${table.title}) >= 10)`, sql`CHECK (char_length(${table.address}) >= 10)`]
);

export const userTable = pgTable('user', {
  id: uuid()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  username: varchar({ length: 128 }).notNull(),
  email: varchar({ length: 128 }).notNull(),
  password: varchar({ length: 128 }).notNull(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  phone: varchar({ length: 128 }).notNull(),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  isActive: boolean('is_active').default(true),
  rating: integer(),
});

export const userListingTable = pgTable(
  'user_listing',
  {
    userId: uuid('user_id').references(() => userTable.id),
    listingId: uuid('listing_id').references(() => listingsTable.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.listingId] })]
);

export const listingCommentsTable = pgTable('user_comment', {
  id: uuid()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: uuid('user_id').references(() => userTable.id),
  listingId: uuid('listing_id').references(() => listingsTable.id),
  commentText: text('comment_text').notNull(), // text of the comment
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // when the comment was created
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(), // when the comment was last updated
  rating: integer(), // optional rating associated with the comment
});

export const listingImagesTable = pgTable(
  'listing_images',
  {
    listingId: uuid('listing_id')
      .references(() => listingsTable.id)
      .notNull(),
    imageId: varchar('image_id', { length: 128 }).notNull(),
    isMain: boolean('is_main').default(false),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    isActive: boolean('is_active').default(true),
  },
  (table) => [primaryKey({ columns: [table.listingId, table.imageId] })]
);
