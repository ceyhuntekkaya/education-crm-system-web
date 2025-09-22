"use client";

import React from "react";
import { gallerySummaryMockData } from "./mock";
import { GalleryProps } from "./types";
import {
  GalleryHeader,
  GalleryGrid,
  GalleryEmptyState,
  GalleryFooter,
} from "./components";

const Gallery: React.FC<GalleryProps> = () => {
  // Institution ID'ye göre filtreleme yapabiliriz (şimdilik tüm data'yı gösteriyoruz)
  const galleryData = gallerySummaryMockData; // Tüm galerileri göster

  const handleCardClick = (galleryId: number) => {
    console.log("Gallery card clicked:", galleryId);
    // Burada galeri detay sayfasına yönlendirme yapılabilir
  };

  const handleViewAllClick = () => {
    console.log("View all galleries clicked");
    // Burada tüm galerileri göster sayfasına yönlendirme yapılabilir
  };

  return (
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
    </div>
  );
};

export default Gallery;
