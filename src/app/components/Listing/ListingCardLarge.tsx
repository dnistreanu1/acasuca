import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../library/Card';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '../library/Text';
import { Icons } from '../library/Icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../library/Carousel';
import { Separator } from '../library/Separator';
import { ListingCardFooter } from './ListingCardFooter';
import { ListingCardAccordion } from './ListingCardAccordion';

interface ListingCardProps {
  id: string;
  title: string;
  price: string;
  imagesBase64: string[];
  area: number;
  areaUnit: string;
  currencyUnit: string;
  ownerType: 'individual' | 'agency' | 'developer';
  location: string;
  rooms: number;
  floor: number;
  maxFloor: number;
  ownerName: string;
  description: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const PLACEHOLDER_IMAGE_PATH = '/content/images/placeholder.jpg';

export const ListingCardLarge = ({
  title,
  price,
  imagesBase64,
  area,
  areaUnit,
  currencyUnit,
  id,
  ownerType,
  location,
  rooms,
  floor,
  maxFloor,
  ownerName,
  description,
  className,
  imageWidth = 550,
  imageHeight = 350,
}: ListingCardProps) => {
  const pricePerArea = (Number(price) / area).toFixed(2);

  return (
    <Link href={`/listings/${id}`}>
      <div className="flex flex-row ">
        <Carousel
          style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
          className="rounded-l-xl overflow-hidden shadow-md"
        >
          <CarouselContent>
            {(imagesBase64?.length ? imagesBase64 : [PLACEHOLDER_IMAGE_PATH]).map((imageUrl, index) => (
              <CarouselItem key={index} className="relative " style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                <Image src={imageUrl} fill alt="Downloaded Image" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
        <Card
          className={`w-120 h-90 rounded-none rounded-r-xl shadow-md border-none ${className}`}
          style={{ height: `${imageHeight}px` }}
        >
          <CardHeader className="relative tracking-widest font-bold">
            <Text className="text-2xl">{`${price} ${currencyUnit}`}</Text>
          </CardHeader>
          <CardContent className="my-0 tracking-widest flex flex-col">
            <div className="flex flex-col gap-1">
              <Text>{title}</Text>
              <div className="flex gap-1 items-center">
                <Icons.LocateFixed size={16} className="text-gray-500" />
                <Text className="text-gray-500" variant="caption">
                  {location}
                </Text>
              </div>
            </div>
            <Separator variant="secondary" size="lg" />
            <div className="grid grid-cols-3 tracking-widest gap-y-4">
              <div className="flex gap-2 items-center">
                <Icons.BathIcon />
                <Text className="text-sm">{`${rooms} camere`}</Text>
              </div>
              <div className="flex gap-2 items-center">
                <Icons.MoveDiagonal2 />
                <Text className="text-sm">{`${area} ${areaUnit}`}</Text>
              </div>
              <div className="flex gap-2 items-center">
                <Icons.BanknoteIcon />
                <Text className="text-sm">{`${pricePerArea} ${currencyUnit}/${areaUnit}`}</Text>
              </div>
              <div className="flex gap-2 items-center">
                <Icons.BuildingIcon />
                <Text className="text-sm">{`${floor}/${maxFloor}`}</Text>
              </div>
            </div>
            <Link href={''}>
              <ListingCardAccordion description={description} />
            </Link>
          </CardContent>
          <CardFooter>
            <ListingCardFooter ownerName={ownerName} ownerType={ownerType} />
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};
