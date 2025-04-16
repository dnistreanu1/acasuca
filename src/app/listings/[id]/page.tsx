import { ImageUpload } from '@/app/components/ImageUpload';
import { Button } from '@/app/components/generic/Button';
import { Input } from '@/app/components/generic/Input';
import { listingService } from '@/server/services/listing.service';
import { notFound } from 'next/navigation';

export default async function Listing({ params }: { params: { id: string } }) {
  const listing = await listingService.getListingById(Number(params.id));
  if (!listing) {
    return notFound();
  }

  return (
    <div>
      <h1 className="py-4">{listing.title}</h1>
      <ImageUpload />
    </div>
  );
}
