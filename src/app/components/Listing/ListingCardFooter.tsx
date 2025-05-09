'use client';

import React from 'react';
import { Button } from '../library/Button';
import { Icons } from '../library/Icons';
import { Text } from '../library/Text';
import { useTranslations } from 'next-intl';

interface ListingCardFooterProps {
  ownerName: string;
  ownerType: 'individual' | 'agency' | 'developer';
  className?: string;
}

export const ListingCardFooter = ({ ownerName, ownerType, className }: ListingCardFooterProps) => {
  const t = useTranslations('listing.largeCard');
  const handleContactClick = (event: React.MouseEvent) => {
    event.preventDefault();
    alert('TODO:  Implement contact form logic');
    // TODO: Implement contact form logic
  };
  return (
    <div className={`flex flex-1 justify-between ${className}`}>
      <div className="flex gap-2 items-center">
        {ownerType === 'individual' ? <Icons.UserIcon /> : <Icons.Building2Icon />}
        <Text className="tracking-widest">{ownerName}</Text>
      </div>
      <Button onClick={handleContactClick}>
        <Text>{t('contact')}</Text>
      </Button>
    </div>
  );
};
