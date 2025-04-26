'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../library/Carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

interface ListingCarouselProps {
  imagesBase64: string[];
  setApi: (api: CarouselApi) => void;
  imageWidth: number;
  imageHeight: number;
  onImageClick?: () => void;
  delayInMs?: number;
}

export function ListingCarousel({
  imagesBase64,
  setApi,
  imageWidth,
  imageHeight,
  delayInMs,
  onImageClick,
}: ListingCarouselProps) {
  return (
    <Carousel
      setApi={(api) => setApi(api)}
      opts={{
        align: 'center',
        loop: delayInMs ? true : false,
      }}
      plugins={delayInMs ? [Autoplay({ delay: delayInMs })] : undefined}
    >
      <CarouselContent>
        {imagesBase64.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="relative" style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
              <Image
                src={imageUrl}
                width={imageWidth}
                height={imageHeight}
                alt="Downloaded Image"
                onClick={onImageClick}
                className="h-full object-cover"
              ></Image>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
