import React from 'react';
import { Text } from '../library/Text';
import { OwnerType } from '@/server/types/listing';
import { Icons } from '../library/Icons';
import { useTranslations } from 'next-intl';

interface ListingSellerDetailsProps {
  sellerName: string;
  phoneNumber: string;
  email: string;
  ownerType: OwnerType;
}

export const ListingSellerDetails = ({ sellerName, phoneNumber, email, ownerType }: ListingSellerDetailsProps) => {
  const t = useTranslations('listing.page.sellerDetails');
  const tCommon = useTranslations('common');
  return (
    <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-4 shadow-lg">
      <Text children={sellerName} variant="subheading" />
      <Text children={`${t('listingFrom')}: ${tCommon(ownerType)}`} variant="body" />
      <div className="flex gap-2">
        <Icons.PhoneCallIcon color="green" />
        <Text children={phoneNumber} variant="body" />
      </div>
      <div className="flex gap-2">
        <Icons.AtSignIcon color="lightblue" />
        <Text children={email} variant="body" />
      </div>
    </div>
  );
};
