import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../library/Card';
import Image from 'next/image';
import { Text } from '../library/Text';
import { Icons } from '../library/Icons';
import { Link } from '@/i18n/navigation';

interface ListingCardProps {
  id: string;
  title: string;
  price: string;
  imagesBase64: string[];
  area: number;
  areaUnit: string;
  currencyUnit: string;
  ownerType: string;
  location: string;
  className?: string;
}

const PLACEHOLDER_IMAGE_PATH = '/content/images/placeholder.jpg';

export const ListingCardSmall = ({
  title,
  price,
  imagesBase64,
  area,
  areaUnit,
  currencyUnit,
  id,
  ownerType,
  location,
  className,
}: ListingCardProps) => {
  const pricePerArea = (Number(price) / area).toFixed(2);
  return (
    <Link href={`/listings/${id}`}>
      <Card className={`w-75 h-95 py-0 overflow-hidden ${className}`}>
        <CardHeader className="relative h-48">
          <Image src={imagesBase64[0] ?? PLACEHOLDER_IMAGE_PATH} fill alt="Downloaded Image" className="object-cover" />
        </CardHeader>
        <CardContent className="flex flex-col my-0">
          <Text>{title}</Text>
          <div className="flex gap-1 items-center">
            <Icons.LocateFixed size={16} className="text-gray-500" />
            <Text className="text-gray-500" variant="caption">
              {location}
            </Text>
          </div>
        </CardContent>
        <CardFooter className="justify-between flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <Icons.BanknoteIcon />
              <Text className="tracking-widest font-bold">{`${price} ${currencyUnit}`}</Text>
            </div>
            <div className="flex gap-1">
              <Icons.MoveDiagonal2 />
              <Text className="tracking-widest">{`${area} ${areaUnit}`}</Text>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <Icons.ChartCandlestickIcon />
              <Text className="tracking-widest">{`${pricePerArea}/${currencyUnit}`}</Text>
            </div>
            <div className="flex gap-1">
              <Icons.UserIcon />
              <Text className="tracking-widest">{ownerType}</Text>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
