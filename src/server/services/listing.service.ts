import { env } from '@/env';
import { db } from '../db';
import { listingImagesTable } from '../db/schema';
import { storageService } from './storage.service';
import { userService } from './user.service';

const getListingById = async (id: string) => {
  const listing = await db.query.listingsTable.findFirst({
    where: (listingTable, { eq }) => eq(listingTable.id, id),
  });
  return listing;
};

const getAllListings = async () => {
  const listing = await db.query.listingsTable.findMany();
  return listing;
};

const getListingOwnerInfo = async (listingId: string) => {
  const listingOwnerInfo = await db.query.userListingTable.findFirst({
    where: (userListingTable, { eq }) => eq(userListingTable.listingId, listingId),
  });

  if (!listingOwnerInfo?.userId) {
    // TODO: Make user id and listing id non nullable
    throw new Error('Listing owner not found');
  }

  const ownerInfo = await userService.getUserById(listingOwnerInfo.userId);
  return ownerInfo;
};

const getListingImagesIds = async (id: string) => {
  const listingImages = await db.query.listingImagesTable.findMany({
    where: (listingImagesTable, { eq }) => eq(listingImagesTable.listingId, id),
  });
  return listingImages;
};

const addImageToListing = async (listingId: string, imageId: string, isMain: boolean, isActive: boolean) => {
  const listingImage = await db.insert(listingImagesTable).values({
    listingId,
    imageId,
    isMain,
    isActive,
  });
  return listingImage;
};

const getListingImages = async (listingId: string) => {
  const fileMetadata = await listingService.getListingImagesIds(listingId);
  const fileKeys = fileMetadata.map((file) => file.imageId);
  const { data, error } = await storageService.downloadImagesFromS3(env.AWS_BUCKET_NAME, fileKeys);
  if (error) {
    throw new Error('Error downloading images from S3');
  }
  return data;
};

// Only import this
export const listingService = {
  getListingById,
  getListingImagesIds,
  addImageToListing,
  getListingOwnerInfo,
  getAllListings,
  getListingImages,
};
