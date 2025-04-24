'use client';

import { useEffect, useState } from 'react';
import { CarouselApi } from '../library/Carousel';
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@heroui/modal';
import { Button } from '../library/Button';
import { useDownloadListingImages } from '../../hooks/useDownloadListingImages.query';
import { useParams } from 'next/navigation';
import { logger } from '@/server/logger';
import { ListingCarousel } from './ListingCarousel';
import { ListingCarouselThumbnails } from './ListingCarouselThumbnails';
import { Icons } from '../library/Icons';
import { ListingCarouselModal } from './ListingCarouselModal';

export function ListingCarouselWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryApi, setPrimaryApi] = useState<CarouselApi | null>(null);
  const [secondaryApi, setSecondaryApi] = useState<CarouselApi | null>(null);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const listingId = useParams<{ id: string }>().id;
  const { data: imagesBase64, isLoading } = useDownloadListingImages(listingId);

  // Update state for primary carousel and sync primary -> secondary (when available)
  useEffect(() => {
    if (!primaryApi) return;

    const onSelectPrimary = () => {
      const index = primaryApi.selectedScrollSnap();
      setModalCurrentIndex(index);
      if (secondaryApi) {
        secondaryApi.scrollTo(index, true);
      }
    };

    primaryApi.on('select', onSelectPrimary);
    // initialize sync
    onSelectPrimary();

    return () => {
      primaryApi.off('select', onSelectPrimary);
    };
  }, [primaryApi, secondaryApi]);

  // Update modal carousel's current index
  useEffect(() => {
    if (!secondaryApi) return;

    const onSelectModal = () => {
      const index = secondaryApi.selectedScrollSnap();
      setModalCurrentIndex(index);
    };

    secondaryApi.on('select', onSelectModal);
    // initialize modal index
    onSelectModal();

    return () => {
      secondaryApi.off('select', onSelectModal);
    };
  }, [secondaryApi]);

  // Sync the modal carousel when opening the modal.
  useEffect(() => {
    if (isOpen && primaryApi && secondaryApi) {
      const selectedIndex = primaryApi.selectedScrollSnap();
      secondaryApi.scrollTo(selectedIndex, true);
    }
  }, [isOpen, primaryApi, secondaryApi]);

  // When closing the modal, update primary with modal carousel's selected slide
  const handleModalClose = () => {
    logger.debug('handleModalClose');
    if (primaryApi && secondaryApi) {
      const selectedIndex = secondaryApi.selectedScrollSnap();
      primaryApi.scrollTo(selectedIndex, true);
      // If your plugin instance exposes a play method, call it here:
      const plugins = primaryApi.plugins() as { autoplay?: { play?: () => void } };
      plugins.autoplay?.play?.();
    }
    setIsOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!imagesBase64) {
    logger.error('Images not found');
    return <div>Images not found</div>;
  }

  return (
    <div className="w-3/4">
      {/* Primary Carousel */}
      <ListingCarousel
        imagesBase64={imagesBase64}
        imageWidth={650}
        imageHeight={450}
        setApi={setPrimaryApi}
        onImageClick={() => setIsOpen(true)}
        delayInMs={5000}
      />
      <div className="my-1"></div>
      <ListingCarouselThumbnails
        imagesBase64={imagesBase64}
        currentIndex={modalCurrentIndex}
        api={primaryApi!}
        width={140}
        height={90}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        isDismissable
      >
        <ModalContent className="h-full bg-white rounded-lg shadow-lg">
          <ModalHeader className="p-0">
            <Button
              onClick={handleModalClose}
              variant="outline"
              size={'icon'}
              className="absolute rounded top-5 right-20 text-black z-10"
            >
              <Icons.X className="w-20 h-20" />
            </Button>
          </ModalHeader>
          <ModalBody className="relative justify-center items-center">
            <ListingCarouselModal
              imagesBase64={imagesBase64}
              imageWidth={1300}
              imageHeight={850}
              setApi={setSecondaryApi}
              delayInMs={10000}
            />
            <div className="my-1"></div>
            <ListingCarouselThumbnails
              imagesBase64={imagesBase64}
              currentIndex={modalCurrentIndex}
              api={secondaryApi!}
              width={180}
              height={120}
            />
          </ModalBody>
          <ModalFooter className="flex justify-end pt-1"></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
