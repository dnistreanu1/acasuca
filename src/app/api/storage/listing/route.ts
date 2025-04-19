import { env } from '@/env';
import { logger } from '@/server/logger';
import { listingService } from '@/server/services/listing.service';
import { storageService } from '@/server/services/storage.service';
import { CustomError } from '@/server/db/utils/custom-error';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const listingId = Number(formData.get('listingId'));
    const isMain = Boolean(formData.get('isMain'));
    const isActive = Boolean(formData.get('isActive'));

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { data } = await storageService.uploadImageToS3(env.AWS_BUCKET_NAME, {
      buffer,
      originalname: file.name,
      mimetype: file.type,
    });
    if (!data) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    await listingService.addImageToListing(listingId, data, isMain, isActive);

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    logger.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get('listingId');

    if (!listingId) {
      return NextResponse.json({ error: 'No file key provided' }, { status: 400 });
    }

    const fileMetadata = await listingService.getListingImagesIds(Number(listingId));
    const fileKeys = fileMetadata.map((file) => file.imageId);
    logger.warn('File keys:', fileKeys);
    const { data, error } = await storageService.downloadImagesFromS3(env.AWS_BUCKET_NAME, fileKeys);

    if (error) {
      throw new CustomError('StorageError', 500, 'Failed to download file from storage', { error });
    }
    if (!data) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': data[0].contentType || 'image/jpeg',
        'Cache-Control':
          env.APP_ENV === 'development' ? 'no-store, max-age=0' : 'public, max-age=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    logger.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
