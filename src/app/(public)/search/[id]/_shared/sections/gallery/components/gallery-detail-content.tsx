"use client";

import React from "react";
import { MediaGallery } from "@/components/ui";
import GalleryInfoColumn from "./gallery-info-column";
import GalleryDetailHeader from "./gallery-detail-header";

interface GalleryDetailContentProps {
  gallery: any; // Gallery verilerinin type'ı buraya eklenebilir
  variant?: "inPage" | "modal"; // Galeri görünüm türü
  onClose?: () => void;
}

const GalleryDetailContent: React.FC<GalleryDetailContentProps> = ({
  gallery,
  variant = "modal", // Varsayılan olarak modal
  onClose,
}) => {
  if (!gallery) {
    return (
      <div className="text-center py-80">
        <i
          className="ph ph-warning-circle text-warning-500 mb-16"
          style={{ fontSize: "48px" }}
        ></i>
        <h3 className="text-neutral-700 mb-8">Galeri Bulunamadı</h3>
        <p className="text-neutral-500 mb-24">
          İstediğiniz galeri mevcut değil.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`gallery-detail-modal ${variant === "modal" ? "p-16" : ""}`}
    >
      <GalleryDetailHeader gallery={gallery} onClose={onClose} />
      {/* Main Content Grid */}
      <div className="gallery-modal-grid">
        {/* Left Column - Gallery Viewer */}
        <MediaGallery items={gallery.items || []} />

        {/* Right Column - Gallery Info */}
        <GalleryInfoColumn gallery={gallery} />
      </div>
    </div>
  );
};

export default GalleryDetailContent;
