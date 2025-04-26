import React from 'react';
import { Text } from '../library/Text';
import { Icons } from '../library/Icons';
import { CreditButton } from './CredditButton';

interface ListingHeaderProps {
  title: string;
  price: number;
  location: string;
  area: number;
  currency: string;
  areaSymbol: string;
  creditText: string;
  internalAppListingId: string;
  internalSellerId: string;
}

export const ListingHeader = ({
  title,
  price,
  location,
  area,
  currency,
  areaSymbol,
  creditText,
  internalAppListingId,
  internalSellerId,
}: ListingHeaderProps) => {
  const pricePerArea = (price / area).toFixed(2);

  return (
    <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-6 shadow-lg">
      <Text children={title} className="flex-1" />
      <div className="flex justify-between">
        <div>
          <Text children={`${price} ${currency}`} as="span" variant="heading" />
          <Text children={`${pricePerArea} ${currency}/${areaSymbol}`} as="span" variant="caption" className="ml-8" />
        </div>
        <CreditButton creditText={creditText} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Icons.LocateFixed />
          <Text children={location} as="span" />
        </div>
        <div className="flex flex-col gap-2 mr-3">
          <Text children={`ID intern Acasuca: ${internalAppListingId}`} as="span" className="text-gray-400" />
          <Text children={`ID intern Vanzator: ${internalSellerId}`} as="span" className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};
