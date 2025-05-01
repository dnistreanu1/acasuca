'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../library/Accordion';
import { Text } from '../library/Text';

interface ListingCardAccordionProps {
  description: string;
  className?: string;
}

export const ListingCardAccordion = ({ className, description }: ListingCardAccordionProps) => {
  return (
    <Accordion type="single" collapsible className={`${className}`}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer ">
          <Text children="Vezi descrierea anuntului" variant="caption" className="text-gray-400" />
        </AccordionTrigger>
        <AccordionContent className="h-24 truncate">
          <Text as="p" className="p-2" variant="caption">
            {description}
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
