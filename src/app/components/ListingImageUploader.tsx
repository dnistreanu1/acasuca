'use client';
import React, { useState } from 'react';
import { Input } from './library/Input';
import { Button } from './library/Button';
import { useUploadListingImage } from '../hooks/useUploadListingImage.query';
import { useQueryClient } from '@tanstack/react-query';

export const ListingImageUploader = () => {
  const [listingId, setListingId] = useState<string>('');
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutateAsync, isSuccess, isError, isPending } = useUploadListingImage();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSaveImage = async () => {
    if (imageFile) {
      await mutateAsync({ file: imageFile, listingId });
      queryClient.invalidateQueries({ queryKey: ['listingImages'] });
      setImageFile(null);
    }
  };

  return (
    <>
      <Input type="text" placeholder="Listing ID" className="mb-4" onBlur={(event) => setListingId(event.target.value)} />
      <Input type="file" placeholder="Click Me" onChange={(event) => handleFileChange(event)} className="max-w-1/3" />
      <Button onClick={handleSaveImage} className="mt-4" disabled={isPending}>
        Submit
      </Button>

      <div className="pt-4">
        {isPending && <p className="text-blue-400">Uploading...</p>}
        {!isPending && isSuccess && <p className="text-green-400">Image uploaded successfully!</p>}
        {!isPending && isError && <p className="text-red-400">Error uploading image.</p>}
      </div>
    </>
  );
};
