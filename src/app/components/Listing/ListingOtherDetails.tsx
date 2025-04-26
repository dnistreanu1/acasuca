import React from 'react';
import { Text } from '../library/Text';
import { Icons } from '../library/Icons';
import { Separator } from '../library/Separator';

interface ListingOtherDetailsProps {
  totalViews: number;
  totalLikes: number;
}

export const ListingOtherDetails = ({ totalLikes, totalViews }: ListingOtherDetailsProps) => {
  return (
    <div className="flex flex-1 flex-col bg-white px-6 py-5 shadow-lg">
      <Text children={'Alte Detalii:'} variant="subheading" />
      <Separator variant="secondary" orientation="horizontal" />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Icons.EyeIcon />
          <Text children={`Total Vizualizari: ${totalViews}`} variant="body" />
        </div>
        <div className="flex gap-2">
          <Icons.HeartIcon />
          <Text children={`Total Like-uri: ${totalLikes}`} variant="body" />
        </div>
      </div>
    </div>
  );
};
