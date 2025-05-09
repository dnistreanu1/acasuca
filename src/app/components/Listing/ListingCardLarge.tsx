'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../library/Card';
import { Text } from '../library/Text';
import { Icons } from '../library/Icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../library/Carousel';
import { Separator } from '../library/Separator';
import { ListingCardFooter } from './ListingCardFooter';
import { ListingCardAccordion } from './ListingCardAccordion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

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
// Define the heights for collapsed and expanded states.
const COLLAPSED_HEIGHT = 350; // collapsed image height (px)
const EXPANDED_HEIGHT = 450; // expanded image height (px)

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
  imageWidth = 450,
}: ListingCardProps) => {
  const t = useTranslations('listing.largeCard');
  // State to determine if the accordion is expanded.
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Calculate price per area for display.
  const pricePerArea = (Number(price) / area).toFixed(2);

  return (
    <Link
      href={`/listings/${id}`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('[data-prevent-link]')) {
          event.preventDefault();
        }
      }}
    >
      {/* 
          Apply Tailwind's transition classes. 
          When accordion is open, the outer container height is EXPANDED_HEIGHT;
          otherwise, it is COLLAPSED_HEIGHT.
      */}
      <div
        className={`
          flex flex-row items-stretch overflow-hidden rounded-xl
          transition-all duration-500
          ${isAccordionOpen ? `h-[${EXPANDED_HEIGHT}px]` : `h-[${COLLAPSED_HEIGHT}px]`}
        `}
      >
        {/* Carousel with the image */}
        <Carousel style={{ width: `${imageWidth}px` }} className="h-full">
          <CarouselContent>
            {(imagesBase64?.length ? imagesBase64 : [PLACEHOLDER_IMAGE_PATH]).map((imageUrl, index) => (
              <CarouselItem key={index} className="transition-all duration-500 ease-in-out">
                {/* This container also transitions its height */}
                <div
                  className={`relative transition-all duration-500 ${
                    isAccordionOpen ? `h-[${EXPANDED_HEIGHT}px]` : `h-[${COLLAPSED_HEIGHT}px]`
                  }`}
                >
                  <img src={imageUrl} alt="Listing Image" className="object-center w-full h-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        {/* Card section */}
        <Card className={`flex flex-col w-[550px] rounded-l-none ${className}`}>
          <CardHeader className="tracking-widest font-bold">
            <Text className="text-2xl">{`${price} ${currencyUnit}`}</Text>
          </CardHeader>
          <CardContent className="tracking-widest flex flex-col flex-1">
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
            <div className="grid grid-cols-4 gap-y-4">
              <div className="flex gap-2 items-center">
                <Icons.BathIcon />
                <Text className="text-sm">{`${rooms} ${t('rooms')}`}</Text>
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
              <div className="flex gap-2 items-center">
                <Icons.AlertCircle />
                <Text className="text-sm">{currencyUnit}</Text>
              </div>
            </div>

            <ListingCardAccordion
              description={description}
              onClickCapture={() => {
                setIsAccordionOpen((prev) => !prev);
              }}
            />
          </CardContent>
          <CardFooter className="flex items-end h-full">
            <ListingCardFooter ownerName={ownerName} ownerType={ownerType} />
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};
