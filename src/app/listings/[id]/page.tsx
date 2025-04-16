import { ImageDownload } from '@/app/components/ImageDownload';
import { ImageUpload } from '@/app/components/ImageUpload';
import { listingService } from '@/server/services/listing.service';
import { notFound } from 'next/navigation';

export default async function Listing({ params }: { params: { id: string } }) {
  const { id } = params;
  const listing = await listingService.getListingById(Number(id));
  if (!listing) {
    return notFound();
  }

  return (
    <div>
      <h1 className="py-4">{listing.title}</h1>
      <ImageUpload />
      <ImageDownload />
    </div>
  );
}
