import { db } from '../db';

const getListingById = async (id: number) => {
  const listing = await db.query.listingsTable.findFirst({
    where: (listingTable, { eq }) => eq(listingTable.id, id),
  });
  return listing;
};

// Only import this
export const listingService = {
  getListingById,
};
