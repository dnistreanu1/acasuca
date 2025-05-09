import React from 'react';
import { Text } from '../library/Text';
import { Badge } from '../library/Badge';
import { Icons } from '../library/Icons';
import { Separator } from '../library/Separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../library/Accordion';
import { useTranslations } from 'next-intl';

interface ListingDetailsProps {
  title: string;
  floor: number;
  maxFloor: number;
  area: number;
  rooms: number;
  ownershipType: string;
  buildingType: string;
  handoverYear: number;
  isClosedKitchen: boolean;
  availableAfter: Date;
  estimatedRent: number;
  isAcceptingMortgageLoan: boolean;
  areaSymbol: string;
  heatingType: string;
  stateOfTheProperty: string;
  description: string;
}

export const ListingDetails = ({
  title,
  floor,
  maxFloor,
  area,
  rooms,
  ownershipType,
  buildingType,
  handoverYear,
  isClosedKitchen,
  availableAfter,
  estimatedRent,
  isAcceptingMortgageLoan,
  areaSymbol,
  heatingType,
  stateOfTheProperty,
  description,
}: ListingDetailsProps) => {
  const t = useTranslations('listing.page.details');
  const tCommon = useTranslations('common');

  return (
    <>
      <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-6 shadow-lg">
        <Text children={title} className="flex-1" variant="subheading" />
        <div className="flex gap-4">
          <Badge variant="secondary" className="p-2">
            <Icons.MoveDiagonal2 /> {`${area}${areaSymbol}`}
          </Badge>
          <Badge variant="secondary" className="p-2">
            <Icons.LayoutGrid /> {`${rooms} ${t('rooms')}`}
          </Badge>
        </div>
        <Separator orientation="horizontal" variant="secondary" />
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('detached')}:`} />
          <Text children={isClosedKitchen ? tCommon('yes') : tCommon('no')} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('floor')}:`} />
          <Text children={`${floor}/${maxFloor}`} className={floor ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('acceptsCredit')}:`} />
          <Text children={isAcceptingMortgageLoan ? tCommon('yes') : tCommon('no')} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('heating')}`} />
          <Text children={heatingType ?? 'fara informatii'} className={heatingType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('stateOfTheProperty')}:`} />
          <Text children={stateOfTheProperty ?? tCommon('noInfo')} className={stateOfTheProperty ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={t('rent')} />
          <Text children={estimatedRent ?? tCommon('noInfo')} className={estimatedRent ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={t('propertyType')} />
          <Text children={tCommon(buildingType as any) ?? tCommon('noInfo')} className={buildingType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('availableFrom')}:`} />
          <Text
            children={availableAfter.toLocaleDateString() ?? tCommon('noInfo')}
            className={availableAfter ? '' : 'text-gray-400'}
          />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('ownerType')}:`} />
          <Text children={ownershipType ?? tCommon('noInfo')} className={ownershipType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children={`${t('additionalInfo')}:`} />

          <ol className="">
            <li className="flex items-center">
              {isClosedKitchen ? <Icons.CircleCheckBig color="green" /> : <Icons.X color="red" />}
              <Text children={`${t('detached')}:`} className="ml-2" />
            </li>
            <li className="flex py-2">
              {isAcceptingMortgageLoan ? <Icons.CircleCheckBig color="green" /> : <Icons.X color="red" />}
              <Text children={`${t('acceptsCredit')}:`} className="ml-2" />
            </li>
          </ol>
        </div>
        <Separator orientation="horizontal" variant="secondary" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text children={`${t('buildingAndMaterials.accordiontitle')}:`} variant="subheading" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
                <Text children={`${t('buildingAndMaterials.yearOfOperation')}:`} />
                <Text children={handoverYear} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text children={`${t('facilities.accordionTitle')}:`} variant="subheading" />
            </AccordionTrigger>
            <AccordionContent>TODO:</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator orientation="horizontal" variant="primary" />
      <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-6 shadow-lg">
        <Text children={tCommon('description')} className="flex-1" variant="subheading" />
        <Text children={description} as="p" />
      </div>
    </>
  );
};
