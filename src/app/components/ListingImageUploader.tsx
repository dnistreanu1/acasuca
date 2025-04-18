'use client';
import React, { useState } from 'react';
import { Input } from './generic/Input';
import { Button } from './generic/Button';
import { useUploadListingImage } from '../hooks/useUploadListingImage.query';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export const ListingImageUploader = () => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutateAsync, isSuccess, isError, isLoading } = useUploadListingImage();
  const listingId = useParams<{ id: string }>().id;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSaveImage = async () => {
    if (imageFile) {
      await mutateAsync({ file: imageFile, listingId });
      queryClient.invalidateQueries(['listing', listingId]);
      setImageFile(null);
    }
  };

  return (
    <>
      <Input type="file" placeholder="Click Me" onChange={(event) => handleFileChange(event)} className="max-w-1/3" />
      <Button onClick={handleSaveImage} className="mt-4" disabled={isLoading}>
        Submit
      </Button>

      <div className="pt-4">
        {isLoading && <p className="text-blue-400">Uploading...</p>}
        {!isLoading && isSuccess && <p className="text-green-400">Image uploaded successfully!</p>}
        {!isLoading && isError && <p className="text-red-400">Error uploading image.</p>}
      </div>
    </>
  );
};
