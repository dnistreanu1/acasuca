import Image from 'next/image';
import React from 'react';

interface FooterProps {
  text: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export const Footer = ({ text, imageSrc, imageAlt, className }: FooterProps) => {
  return (
    <div className={`flex flex-1 h-40 border-t-1 justify-center ${className}`}>
      <div className="flex h-full items-center justify-center w-3/4 text-gray-500">
        <Image src={imageSrc} alt={imageAlt} width={204} height={52} className="mb-6" />
        <span>{text}</span>
      </div>
    </div>
  );
};
