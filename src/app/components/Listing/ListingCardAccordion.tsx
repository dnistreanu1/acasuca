'use client';

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../library/Accordion';
import { Text } from '../library/Text';
import { useTranslations } from 'next-intl';

interface ListingCardAccordionProps {
  description: string;
  onClickCapture: () => void;
  className?: string;
}

export const ListingCardAccordion = ({ className, description, onClickCapture }: ListingCardAccordionProps) => {
  // We use a controlled Accordion state.
  const [accordionOpen, setAccordionOpen] = useState<'accordionOpenValue' | undefined>(undefined);
  const t = useTranslations('listing.largeCard');

  return (
    <Accordion
      type="single"
      collapsible
      className={className}
      value={accordionOpen}
      onValueChange={(value) => {
        console.log('Accordion value changed:', value);
        setAccordionOpen(value as 'accordionOpenValue');
      }}
    >
      <AccordionItem value="accordionOpenValue">
        <AccordionTrigger
          // Add our custom data attribute.
          data-prevent-link
          className="cursor-pointer"
          onClickCapture={() => {
            onClickCapture();
          }}
        >
          <Text variant="caption" className="text-gray-400">
            {t('accordionTitle')}
          </Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text as="p" className="p-2" variant="caption">
            {description}
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
