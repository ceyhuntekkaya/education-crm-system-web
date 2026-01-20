import React from "react";
import { useProductDetail } from "../../context";
import { useProductsContext } from "../../../../../_shared/contexts";
import {
  MainImageSection,
  ThumbnailGallerySection,
  LightboxModalSection,
} from "./sections/index";

export const ProductImageSection: React.FC = () => {
  // ProductsContext'ten data al
  const { currentProduct: product } = useProductsContext();

  // ProductDetail context'ten gallery state al
  const { allImages } = useProductDetail();

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
