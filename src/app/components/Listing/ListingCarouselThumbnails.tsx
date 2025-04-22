import Image from 'next/image';
import React from 'react';
import { CarouselApi } from '../library/Carousel';

interface ListingCarouselThumbnailsProps {
  imagesBase64: string[];
  currentIndex: number;
  width: number;
  height: number;
  api: CarouselApi;
  className?: string;
}

export const ListingCarouselThumbnails = ({
  imagesBase64,
  currentIndex,
  api,
  width,
  height,
  className,
}: ListingCarouselThumbnailsProps) => {
  return (
    <div className={`verflow-x-auto ${className && className}`}>
      <div className="mx-auto flex space-x-2 justify-center">
        {imagesBase64.map((imageUrl, index) => (
          <div
            key={`thumb-modal-${index}`}
            className={`relative cursor-pointer rounded overflow-hidden transition-opacity duration-200 ${
              currentIndex === index ? 'border-2 border-blue-500 opacity-100' : 'opacity-60'
            }`}
            onClick={() => api && api.scrollTo(index, true)}
            style={{ width, height }}
          >
            <Image src={imageUrl} alt={`Thumbnail modal ${index}`} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
