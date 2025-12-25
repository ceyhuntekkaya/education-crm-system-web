import React from "react";
import { useProductDetail } from "../../../../../context";

export const LightboxNavigationSection: React.FC = () => {
  const {
    selectedImageIndex,
    allImages,
    handleNextImage,
    handlePreviousImage,
  } = useProductDetail();

  if (allImages.length <= 1) return null;

  return (
    <>
      {/* Previous Button */}
      <button
        className="product-detail-page__lightbox-nav product-detail-page__lightbox-nav--prev"
        onClick={handlePreviousImage}
        aria-label="Önceki görsel"
      >
        <i className="ph ph-caret-left"></i>
      </button>

      {/* Next Button */}
      <button
        className="product-detail-page__lightbox-nav product-detail-page__lightbox-nav--next"
        onClick={handleNextImage}
        aria-label="Sonraki görsel"
      >
        <i className="ph ph-caret-right"></i>
      </button>

      {/* Image Counter */}
      <div className="product-detail-page__lightbox-counter">
        <span className="product-detail-page__lightbox-counter-current">
          {selectedImageIndex + 1}
        </span>
        <span className="product-detail-page__lightbox-counter-separator">
          /
        </span>
        <span className="product-detail-page__lightbox-counter-total">
          {allImages.length}
        </span>
      </div>
    </>
  );
};
