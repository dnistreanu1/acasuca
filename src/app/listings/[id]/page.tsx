import { ListingCarouselWrapper } from '@/app/components/Listing/ListingCarouselWrapper';
import { logger } from '@/server/logger';
import { listingService } from '@/server/services/listing.service';
import { notFound } from 'next/navigation';

export default async function Listing({ params }: { params: { id: string } }) {
  const { id } = params;

  const listing = await listingService.getListingById(Number(id));
  if (!listing) {
    logger.error('Page not found');
    return notFound();
  }

  return (
    <div>
      <h1 className="py-4">{listing.title}</h1>
      <ListingCarouselWrapper />
    </div>
  );
}
