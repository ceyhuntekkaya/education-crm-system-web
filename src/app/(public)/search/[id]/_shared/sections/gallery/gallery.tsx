"use client";

import React from "react";
import { useModal } from "@/hooks";
import { Modal } from "@/components/ui";
import { gallerySummaryMockData } from "./mock";
import { GalleryProps } from "./types";
import {
  GalleryHeader,
  GalleryGrid,
  GalleryEmptyState,
  GalleryFooter,
  GalleryDetailModalContent,
} from "./components";

const Gallery: React.FC<GalleryProps> = () => {
  const { isOpen, open, close } = useModal();
  const [selectedGalleryId, setSelectedGalleryId] = React.useState<
    number | null
  >(null);

  // Institution ID'ye göre filtreleme yapabiliriz (şimdilik tüm data'yı gösteriyoruz)
  const galleryData = gallerySummaryMockData; // Tüm galerileri göster

  const handleCardClick = (galleryId: number) => {
    setSelectedGalleryId(galleryId);
    open();
  };

  const handleViewAllClick = () => {
    console.log("View all galleries clicked");
    // Burada tüm galerileri göster sayfasına yönlendirme yapılabilir
  };

  return (
    <>
      <div className="gallery-section">
        {/* Main Gallery Container with consistent styling */}
        <div className="border border-neutral-30 rounded-12 bg-white p-8">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <GalleryHeader title="Galeri" count={galleryData.length} />

            {galleryData.length > 0 ? (
              <>
                <GalleryGrid
                  galleries={galleryData}
                  onCardClick={handleCardClick}
                />

                <GalleryFooter
                  galleryCount={galleryData.length}
                  onViewAllClick={handleViewAllClick}
                />
              </>
            ) : (
              <GalleryEmptyState />
            )}
          </div>
        </div>

        {/* Gallery Detail Modal */}
        <Modal isOpen={isOpen} onClose={close} size="xl">
          {selectedGalleryId && (
            <GalleryDetailModalContent
              galleryId={selectedGalleryId}
              onClose={close}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Gallery;
