import React from 'react';
import { Text } from '../library/Text';
import { Badge } from '../library/Badge';
import { Icons } from '../library/Icons';
import { Separator } from '../library/Separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../library/Accordion';

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
  return (
    <>
      <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-6 shadow-lg">
        <Text children={title} className="flex-1" variant="subheading" />
        <div className="flex gap-4">
          <Badge variant="secondary" className="p-2">
            <Icons.MoveDiagonal2 /> {`${area}${areaSymbol}`}
          </Badge>
          <Badge variant="secondary" className="p-2">
            <Icons.LayoutGrid /> {`${rooms} camere`}
          </Badge>
        </div>
        <Separator orientation="horizontal" variant="secondary" />
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Decomandat:" />
          <Text children={isClosedKitchen ? 'Da' : 'Nu'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Etaj:" />
          <Text children={`${floor}/${maxFloor}`} className={floor ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Accepta credit ipotecar:" />
          <Text children={isAcceptingMortgageLoan ? 'Da' : 'Nu'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Incalzire:" />
          <Text children={heatingType ?? 'fara informatii'} className={heatingType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Stare proprietate:" />
          <Text children={stateOfTheProperty ?? 'fara informatii'} className={stateOfTheProperty ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Chirie:" />
          <Text children={estimatedRent ?? 'fara informatii'} className={estimatedRent ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Tip proprietate:" />
          <Text children={buildingType ?? 'fara informatii'} className={buildingType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Liber de la:" />
          <Text
            children={availableAfter.toLocaleDateString() ?? 'fara informatii'}
            className={availableAfter ? '' : 'text-gray-400'}
          />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Tip vanzator:" />
          <Text children={ownershipType ?? 'fara informatii'} className={ownershipType ? '' : 'text-gray-400'} />
        </div>
        <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
          <Text children="Informatii suplimentare:" />

          <ol className="">
            <li className="flex items-center">
              {isClosedKitchen ? <Icons.CircleCheckBig color="green" /> : <Icons.X color="red" />}
              <Text children="Decomandat" className="ml-2" />
            </li>
            <li className="flex py-2">
              {isAcceptingMortgageLoan ? <Icons.CircleCheckBig color="green" /> : <Icons.X color="red" />}
              <Text children="Accepta credit ipotecar" className="ml-2" />
            </li>
          </ol>
        </div>
        <Separator orientation="horizontal" variant="secondary" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text children="Cladire si materiale" variant="subheading" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 border-b-2 border-[#F2F3F6]">
                <Text children="Anul de exploatare:" />
                <Text children={handoverYear} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              {' '}
              <Text children="Facilitati" variant="subheading" />
            </AccordionTrigger>
            <AccordionContent>TODO:</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator orientation="horizontal" variant="primary" />
      <div className="flex flex-1 flex-col bg-white px-6 py-5 gap-6 shadow-lg">
        <Text children="Descriere" className="flex-1" variant="subheading" />
        <Text children={description} as="p" />
      </div>
    </>
  );
};

// Încălzire:

// centrală pe gaz

// Etaj:

// 10/10

// Chirie:

// fără informații

// Stare:

// gata de utilizare

// Tip proprietate:

// locuință nouă

// Forma de proprietate:

// drept de proprietate

// Liber de la:

// fără informații

// Tip vânzător:

// privat

// Informații suplimentare:

// terasă
// garaj
