import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Storage } from '../storage/s3.storage';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@/env';
import { GenericResponse } from '../types/api';

interface ImageFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

async function uploadImageToS3(imageFile: ImageFile): Promise<GenericResponse<string>> {
  // Validate file MIME type
  if (!imageFile.mimetype.startsWith('image/')) {
    return { error: 'File is not an image', status: 400 };
  }
  // Generate a unique id for this image
  const imageId = uuidv4();
  // Construct the key – you can add an extension if desired
  const key = `${imageFile.originalname}_${imageId}.png`; // adjust extension based on your content type

  // Create the PutObject command with required parameters
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
    Body: imageFile.buffer,
    ContentType: imageFile.mimetype,
  });

  // Execute the upload operation
  await s3Storage.send(command);

  // Return the key which acts as the image's unique id
  return { data: key };
}

export const getS3Storage = () => s3Storage;

// Only import this
export const storageService = {
  getS3Storage,
  uploadImageToS3,
};
