'use client';

import React from 'react';
import { Button } from '../library/Button';
import { Text } from '../library/Text';

interface CredditButtonProps {
  creditText: string;
}

export const CreditButton = ({ creditText }: CredditButtonProps) => {
  const handleOnClickCreditButton = () => {
    // TODO: Handle credit button click
    alert('Credit button clicked');
  };
  return (
    <Button variant={'outline'}>
      <Text children={creditText} as="span" onClick={handleOnClickCreditButton} />
    </Button>
  );
};
