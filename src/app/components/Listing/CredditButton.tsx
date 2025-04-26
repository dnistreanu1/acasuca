'use client';

import React from 'react';
import { Button } from '../library/Button';
import { Text } from '../library/Text';
import { logger } from '@/server/logger';

interface CredditButtonProps {
  creditText: string;
}

export const CreditButton = ({ creditText }: CredditButtonProps) => {
  const handleOnClickCreditButton = () => {
    // TODO: Handle credit button click
    logger.info('Credit button clicked');
  };
  return (
    <Button variant={'outline'}>
      <Text children={creditText} as="span" onClick={handleOnClickCreditButton} />
    </Button>
  );
};
