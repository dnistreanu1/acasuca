import { listingService } from '@/server/services/listing.service';
import React from 'react';
import { ListingCardSmall } from '@/app/components/Listing/ListingCardSmall';
import { logger } from '@/server/logger';
import { toBase64ImageSrc } from '@/server/db/utils/image';
import { ListingTabs } from '@/app/components/Listing/ListingTabs';
import { ListingCardLarge } from '@/app/components/Listing/ListingCardLarge';
import ListingMap from '@/app/components/Listing/ListingMap';

export default async function ListingsPage() {
  const listings = await listingService.getAllListings();
  const listingIds = listings.map((listing) => listing.id);
  const listingImages = await Promise.allSettled(listingIds.map((id) => listingService.getListingImages(id))).then((results) =>
    results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        logger.error(`Error fetching listing images: ${result.reason}`);
        return undefined;
      }
    })
  );
  const listingImagesBase64 = listingImages.map((images) =>
    images ? images.map((image) => toBase64ImageSrc(image.bufferBase64, image.contentType)) : []
  );

  if (!listings?.length) {
    return <div>No images found</div>;
  }

  return (
    <div>
      <ListingTabs
        smallCards={
          <div className="grid grid-cols-4 gap-4">
            {listings.map((listing, index) => (
              <ListingCardSmall
                key={listing.id}
                area={Number(listing.area)}
                price={listing.price}
                title={listing.title}
                imagesBase64={listingImagesBase64[index]} // Convert to base64
                id={listing.id}
                areaUnit={'m²'}
                currencyUnit={'€'}
                ownerType={listing.ownerType}
                location={listing.address}
              />
            ))}
          </div>
        }
        largeCards={
          <div className="grid grid-cols-1 gap-4">
            {listings.map((listing, index) => (
              <ListingCardLarge
                key={listing.id}
                area={Number(listing.area)}
                price={listing.price}
                title={listing.title}
                imagesBase64={listingImagesBase64[index]} // Convert to base64
                id={listing.id}
                areaUnit={'m²'}
                currencyUnit={'€'}
                ownerType={listing.ownerType}
                location={listing.address}
                rooms={listing.rooms}
                floor={listing.floor}
                maxFloor={listing.maxFloor}
                ownerName={'John Doe'} // TODO: Fetch owner name from the database
                description={listing.description}
              />
            ))}
          </div>
        }
        mapView={<ListingMap lat={45.657974} lng={25.601198} />} // Hardcoded location of Brasov city, for now
      />
    </div>
  );
}
