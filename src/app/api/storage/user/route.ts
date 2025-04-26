import { logger } from '@/server/logger';
import { userService } from '@/server/services/user.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get('userId');

    if (!userID) {
      return NextResponse.json({ error: 'No user id provided' }, { status: 400 });
    }

    const user = await userService.getUserById(userID);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    logger.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
