import { Separator } from '@/app/components/library/Separator';
import { ListingCarouselWrapper } from '@/app/components/Listing/ListingCarouselWrapper';
import { ListingDetails } from '@/app/components/Listing/ListingDetails';
import { ListingHeader } from '@/app/components/Listing/ListingHeader';
import { ListingOtherDetails } from '@/app/components/Listing/ListingOtherDetails';
import { ListingSellerDetails } from '@/app/components/Listing/ListingSellerDetails';
import { logger } from '@/server/logger';
import { listingService } from '@/server/services/listing.service';
import { notFound } from 'next/navigation';

export default async function Listing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const listing = await listingService.getListingById(id);
  const ownerInfo = await listingService.getListingOwnerInfo(id);
  if (!listing || !ownerInfo) {
    logger.error('Page not found');
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-1">
        <ListingCarouselWrapper />
        <Separator orientation="vertical" variant="primary" />
        {/* TODO: move ownerType to user table */}
        <ListingSellerDetails
          email={ownerInfo.email}
          ownerType={listing.ownerType}
          phoneNumber={ownerInfo.phone}
          sellerName={`${ownerInfo.firstName} ${ownerInfo.lastName}`}
        />
      </div>
      <Separator orientation="horizontal" variant="primary" />
      <div className="flex flex-1">
        <div className="w-4/6">
          <ListingHeader
            title={listing.title}
            price={Number(listing.price)}
            location={listing.address}
            area={Number(listing.area)}
            currency={'€'}
            areaSymbol={'m²'}
            creditText="Rata Lunara de la 1000 roni"
            internalAppListingId="123456789"
            internalSellerId="987654321"
          />
          <Separator orientation="horizontal" variant="primary" />
          <ListingDetails
            title={'Apartament de vanzare'}
            area={Number(listing.area)}
            floor={listing.floor}
            buildingType={listing.buildingType}
            availableAfter={listing.availableAfter}
            estimatedRent={Number(listing.estimatedRent)}
            handoverYear={Number(listing.handoverYear)}
            isClosedKitchen={listing.isClosedKitchen}
            isAcceptingMortgageLoan={listing.isAcceptingMortgageLoan}
            maxFloor={listing.maxFloor}
            ownershipType={listing.ownershipType}
            rooms={listing.rooms}
            areaSymbol={'m²'}
            description={listing.description}
            heatingType="autonom"
            stateOfTheProperty="new"
          />
        </div>
        <Separator orientation="vertical" variant="primary" />
        {/* TODO: convert to Numbers in DB */}
        <ListingOtherDetails totalLikes={Number(listing.totalLikes)} totalViews={Number(listing.totalViews)} />{' '}
      </div>
    </div>
  );
}
