import { logger } from '@/server/logger';
import { storageService } from '@/server/services/storage.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const response = await storageService.uploadImageToS3({
      buffer,
      originalname: file.name,
      mimetype: file.type,
    });

    if (typeof response === 'object' && 'error' in response) {
      return NextResponse.json({ error: response.error }, { status: response.status });
    }

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    logger.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
