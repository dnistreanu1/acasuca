import { env } from '@/env';
import { S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';

const getClientProps = (): S3ClientConfig => {
  // for testing I have added development since it is the default node env
  if (env.APP_ENV !== 'development') {
    const config = {
      region: env.AWS_REGION,
    };
    return config;
  } else {
    return {
      endpoint: env.AWS_S3_ENDPOINT,
      region: env.AWS_REGION,
      forcePathStyle: true,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY!,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
      },
    };
  }
};

export const s3Storage: S3Client = new S3Client(getClientProps());
