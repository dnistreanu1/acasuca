import { ListingCarouselWrapper } from '@/app/components/Listing/ListingCarouselWrapper';
import { logger } from '@/server/logger';
import { listingService } from '@/server/services/listing.service';
import { notFound } from 'next/navigation';

export default async function Listing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const listing = await listingService.getListingById(id);
  if (!listing) {
    logger.error('Page not found');
    return notFound();
  }

  return (
    <div>
      <h1 className="py-4">{listing.title.toUpperCase()}</h1>
      <ListingCarouselWrapper />
    </div>
  );
}
