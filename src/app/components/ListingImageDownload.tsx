'use client';

import React from 'react';
import Image from 'next/image';
import { useDownloadListingImages } from '../hooks/useDownloadListingImages.query';
import { useParams } from 'next/navigation';

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
    <>
      <div className="pt-6 pb-4 text-2xl">Downloaded Images: </div>
      {images.map((imageUrl, index) => {
        return <Image key={index} src={imageUrl} alt="Downloaded Image" width={500} height={500} />;
      })}

      <div className="pt-4">
        {!isLoading && isSuccess && <p className="text-green-400">Image downloaded successfully!</p>}
        {!isLoading && isError && <p className="text-red-400">Error downloading image.</p>}
      </div>
    </>
  );
};
