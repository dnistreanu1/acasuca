import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Storage } from '../storage/s3.storage';
import { v4 as uuidv4 } from 'uuid';
import { GenericResponse } from '../types/api';
import { Readable } from 'stream';
import { logger } from '../logger';
import { DownloadedImage } from '../types/storage';

interface ImageFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

async function uploadImageToS3(bucketName: string, imageFile: ImageFile): Promise<GenericResponse<string>> {
  // Validate file MIME type
  if (!imageFile.mimetype.startsWith('image/')) {
    return { error: 'File is not an image', status: 400 };
  }
  // Generate a unique id for this image
  const imageId = uuidv4();
  const key = `${imageId}.${imageFile.mimetype.split('/')[1]}`;

  // Create the PutObject command with required parameters
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: imageFile.buffer,
    ContentType: imageFile.mimetype,
  });

  // Execute the upload operation
  const uploadResult = await s3Storage.send(command);

  if (!uploadResult || uploadResult.$metadata.httpStatusCode !== 200) {
    logger.error('Upload failed:', uploadResult);
    return { error: 'Upload failed', status: 500 };
  }

  // Return the key which acts as the image's unique id
  return { data: key };
}

async function downloadImageFromS3(bucketName: string, fileKey: string): Promise<GenericResponse<DownloadedImage>> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    const { Body, ContentType } = await s3Storage.send(command);

    if (Body instanceof Readable) {
      const chunks: Uint8Array[] = [];
      for await (const chunk of Body) {
        chunks.push(chunk);
      }
      return {
        data: {
          bufferBase64: Buffer.concat(chunks).toString('base64'),
          contentType: ContentType || 'application/octet-stream', // Default to binary if not specified
        },
        status: 200,
      };
    } else {
      throw new Error('Unexpected response body type');
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}

async function downloadImagesFromS3(bucketName: string, fileKeys: string[]): Promise<GenericResponse<DownloadedImage[]>> {
  try {
    const promises = fileKeys.map(async (fileKey) => {
      const { data } = await storageService.downloadImageFromS3(bucketName, fileKey);
      return data;
    });

    const responses = (await Promise.all(promises)).filter((el) => el !== undefined); // TODO: handle undefined images
    const imagesBase64 = responses.map((image) => ({
      bufferBase64: image.bufferBase64,
      contentType: image.contentType,
    }));

    return {
      data: imagesBase64,
    };
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}

export const getS3StorageClient = () => s3Storage;

// Only import this
export const storageService = {
  getS3StorageClient,
  uploadImageToS3,
  downloadImageFromS3,
  downloadImagesFromS3,
};
