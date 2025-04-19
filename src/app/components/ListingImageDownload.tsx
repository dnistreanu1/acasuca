'use client';

import React from 'react';
import Image from 'next/image';
import { useDownloadListingImages } from '../hooks/useDownloadListingImages.query';
import { useParams } from 'next/navigation';
import { ListingCarousel } from './ListingCarousel';

export const ListingImageDownload = () => {
  const listingId = useParams<{ id: string }>().id;
  const { data: images, isLoading, isSuccess, isError } = useDownloadListingImages(listingId);

  if (isLoading) {
    return <p className="text-blue-400">Downloading...</p>;
  }

  if (!images) {
    return <p className="text-red-400">No images available.</p>;
  }

  return (
    <div>
      <ListingCarousel imagesBase64={images} />
    </div>
  );
};
