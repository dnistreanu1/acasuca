'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/app/components/library/Card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './library/Carousel';
import Image from 'next/image';
import { Modal, ModalContent, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from './library/Button';

interface ListingCarouselProps {
  imagesBase64: string[];
}

export function ListingCarousel({ imagesBase64 }: ListingCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryApi, setPrimaryApi] = useState<CarouselApi | null>(null);
  const [secondaryApi, setSecondaryApi] = useState<CarouselApi | null>(null);

  // Sync primary carousel's selected slide to secondary
  useEffect(() => {
    if (!primaryApi || !secondaryApi) return;

    const syncScroll = () => {
      const selectedIndex = primaryApi.selectedScrollSnap();
      console.log('Primary selected index:', selectedIndex);
      secondaryApi.scrollTo(selectedIndex, true);
    };

    primaryApi.on('select', syncScroll);
    return () => {
      primaryApi.off('select', syncScroll);
    };
  }, [primaryApi, secondaryApi]);

  // Immediately sync when the modal opens
  useEffect(() => {
    if (isOpen && primaryApi && secondaryApi) {
      const selectedIndex = primaryApi.selectedScrollSnap();
      secondaryApi.scrollTo(selectedIndex, true);
    }
  }, [isOpen, primaryApi, secondaryApi]);

  const handleModalClose = () => {
    if (primaryApi && secondaryApi) {
      const selectedIndex = secondaryApi.selectedScrollSnap();
      primaryApi.scrollTo(selectedIndex, true);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Primary Carousel */}
      <Carousel className="w-full" setApi={(api) => setPrimaryApi(api)}>
        <CarouselContent>
          {imagesBase64.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center">
                    <Image src={imageUrl} width={1000} height={700} alt="Downloaded Image" onClick={() => setIsOpen(true)} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext tabIndex={2} />
      </Carousel>

      {/* Modal with Secondary Carousel */}
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        isDismissable
      >
        <ModalContent className="w-[85%] mx-auto p-4 bg-white rounded-lg shadow-lg">
          <ModalBody className="relative h-[80vh] justify-center items-center">
            <Carousel className="w-full" setApi={(api) => setSecondaryApi(api)}>
              <CarouselContent>
                {imagesBase64.map((imageUrl, index) => (
                  <CarouselItem key={`modal-${index}`} className="flex items-center justify-center">
                    <Image src={imageUrl} width={1600} height={800} alt="Downloaded Image" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-6" />
              <CarouselNext className="mr-8" />
            </Carousel>
          </ModalBody>
          <ModalFooter className="flex justify-end pt-2">
            <Button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
