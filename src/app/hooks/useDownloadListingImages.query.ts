import { toBase64ImageSrc } from '@/server/db/utils/image';
import { DownloadedImage } from '@/server/types/storage';
import { useQuery } from '@tanstack/react-query';

export const useDownloadListingImages = (listingId: string) => {
  const query = useQuery<string[]>({
    queryKey: ['listing', listingId], // Unique key for caching
    queryFn: async () => {
      const response = await fetch(`/api/storage/listing?listingId=${listingId}`, {
        method: 'GET',
      });
      const data = (await response.json()) as DownloadedImage[];
      const dataBase64 = data.map((image) => toBase64ImageSrc(image.bufferBase64, image.contentType));
      return dataBase64;
    },
    enabled: !!listingId,
  });

  return query;
};
