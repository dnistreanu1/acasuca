import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <div className="flex flex-1 h-40 border-t-1 justify-center">
      <div className="flex h-full items-center justify-center w-3/4 text-gray-500">
        <Image src="/content/images/logo.svg" alt="logo" width={204} height={52} className="mb-6" />
        <span>© 2025 Acasuca, BIT ROCKET</span>
      </div>
    </div>
  );
};
