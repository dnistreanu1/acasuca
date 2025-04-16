import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () => {
  const mutation = useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: async ({ file, listingId }: { file: File; listingId: string }) => {
      if (!file.type.startsWith('image/')) {
        throw new Error('File is not an image');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('listingId', listingId);
      formData.append('isMain', 'false');
      formData.append('isActive', 'true');

      return await fetch('/api/storage', {
        method: 'POST',
        body: formData,
      });
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
    },
  });

  return mutation;
};
