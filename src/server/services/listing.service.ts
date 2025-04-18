import { db } from '../db';
import { listingImagesTable } from '../db/schema';

const getListingById = async (id: number) => {
  const listing = await db.query.listingsTable.findFirst({
    where: (listingTable, { eq }) => eq(listingTable.id, id),
  });
  return listing;
};

const getListingImagesIds = async (id: number) => {
  const listingImages = await db.query.listingImagesTable.findMany({
    where: (listingImagesTable, { eq }) => eq(listingImagesTable.listingId, id),
  });
  return listingImages;
};

const addImageToListing = async (listingId: number, imageId: string, isMain: boolean, isActive: boolean) => {
  const listingImage = await db.insert(listingImagesTable).values({
    listingId,
    imageId,
    isMain,
    isActive,
  });
  return listingImage;
};

// Only import this
export const listingService = {
  getListingById,
  getListingImagesIds,
  addImageToListing,
};
