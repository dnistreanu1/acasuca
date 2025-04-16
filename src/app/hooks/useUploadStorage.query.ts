import { useMutation } from '@tanstack/react-query';

export const useUploadStorage = () => {
  const mutation = useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      if (!file.type.startsWith('image/')) {
        throw new Error('File is not an image');
      }
      await fetch('/api/storage', {
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
