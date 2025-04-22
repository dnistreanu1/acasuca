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

export function ListingCarouselModal({
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
          <CarouselItem key={index} className="flex justify-center">
            <div className="relative" style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
              <Image
                src={imageUrl}
                width={imageWidth}
                height={imageHeight}
                alt="Downloaded Image"
                onClick={onImageClick}
              ></Image>
              <CarouselPrevious className="absolute top-1/2 -left-12 z-20" />
              <CarouselNext className="absolute top-1/2 -right-12 z-20" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
