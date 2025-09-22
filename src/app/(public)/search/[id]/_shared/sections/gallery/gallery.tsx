"use client";

import React from "react";
import { Modal } from "@/components/ui";
import { GalleryProvider, useGalleryContext } from "./context";
import { GalleryFilterForm } from "./sections/filter-form";
import { GalleryProps } from "./types";
import {
  GalleryHeader,
  GalleryGrid,
  GalleryEmptyState,
  GalleryFooter,
  GalleryDetailModalContent,
} from "./components";

const GalleryContent: React.FC = () => {
  const { isOpen, close, selectedGalleryId, galleryData } = useGalleryContext();

  return (
    <>
      <div className="gallery-section">
        {/* Filter Form Section - Kompakt tasarım */}
        <GalleryFilterForm />

        {/* Main Gallery Container with consistent styling */}
        <div className="border border-neutral-30 rounded-12 bg-white p-8">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <GalleryHeader />

            {galleryData.length > 0 ? (
              <>
                <GalleryGrid />
                <GalleryFooter />
              </>
            ) : (
              <GalleryEmptyState />
            )}
          </div>
        </div>

        {/* Gallery Detail Modal */}
        <Modal isOpen={isOpen} onClose={close} size="xl">
          {selectedGalleryId && <GalleryDetailModalContent />}
        </Modal>
      </div>
    </>
  );
};

const Gallery: React.FC<GalleryProps> = () => {
  return (
    <GalleryProvider>
      <GalleryContent />
    </GalleryProvider>
  );
};

export default Gallery;
