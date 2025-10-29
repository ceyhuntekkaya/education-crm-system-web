"use client";

import React from "react";
import { Modal, CustomCard } from "@/components/ui";
import { GalleryProvider, useGalleryContext } from "./context";
import { GalleryProps } from "./types";
import {
  GalleryGrid,
  GalleryEmptyState,
  GalleryDetailContent,
} from "./components";

const GalleryContent: React.FC = () => {
  const { isOpen, close, selectedGalleryId, galleryData } = useGalleryContext();

  return (
    <>
      <CustomCard
        title="Galeri"
        className="mt-24"
        subtitle={
          <div className="d-flex align-items-center gap-8 text-neutral-600">
            <i className="ph ph-images text-main-600"></i>
            <span className="text-sm fw-medium">
              {galleryData.length} Galeri
            </span>
          </div>
        }
      >
        {galleryData.length > 0 ? <GalleryGrid /> : <GalleryEmptyState />}
      </CustomCard>

      {/* Gallery Detail Modal */}
      <Modal isOpen={isOpen} onClose={close} size="xl">
        {selectedGalleryId && (
          <GalleryDetailContent
            gallery={galleryData.find((g) => g.id === selectedGalleryId)}
          />
        )}
      </Modal>
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
