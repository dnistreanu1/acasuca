import { ListingImageDownload } from '@/app/components/ListingImageDownload';
import { ListingImageUploader } from '@/app/components/ListingImageUploader';
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
      <ListingImageUploader />
      <ListingImageDownload />
    </div>
  );
}
