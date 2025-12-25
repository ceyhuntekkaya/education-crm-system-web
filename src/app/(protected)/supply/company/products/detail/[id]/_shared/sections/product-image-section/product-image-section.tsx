import React from "react";
import { useProductDetail } from "../../context";
import {
  MainImageSection,
  ThumbnailGallerySection,
  LightboxModalSection,
} from "./sections/index";

export const ProductImageSection: React.FC = () => {
  const { product, allImages } = useProductDetail();

  if (!product) return null;

  return (
    <>
      <div className="product-detail-page__image-section">
        <div className="product-detail-page__image-container">
          {allImages.length > 0 ? (
            <>
              {/* Ana Görsel Alanı */}
              <MainImageSection />

              {/* Küçük Görseller (Thumbnail Gallery) */}
              <ThumbnailGallerySection />
            </>
          ) : (
            <div className="product-detail-page__image-placeholder">
              <i className="ph-duotone ph-package"></i>
              <p className="mt-3">Görsel bulunamadı</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModalSection />
    </>
  );
};
