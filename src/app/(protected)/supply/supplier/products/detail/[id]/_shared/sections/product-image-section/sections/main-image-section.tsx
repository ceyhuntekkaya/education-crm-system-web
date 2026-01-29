import React from "react";
import { CustomImage } from "@/components/ui";
import { useProductsContext } from "../../../../../../_shared/contexts";
import { useProductDetail } from "../../../context";
import { getRandomPlaceholderImage } from "../../../utils";

export const MainImageSection: React.FC = () => {
  const { currentProduct: product } = useProductsContext();
  const {
    statusInfo,
    isLowStock,
    isOutOfStock,
    selectedImageIndex,
    setIsLightboxOpen,
    zoomPosition,
    isZooming,
    setIsZooming,
    mainImageRef,
    allImages,
    selectedImage,
    handleNextImage,
    handlePreviousImage,
    handleImageMouseMove,
  } = useProductDetail();

  if (!product || allImages.length === 0) return null;

  return (
    <div
      className="product-detail-page__main-image"
      ref={mainImageRef}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onMouseMove={(e) => handleImageMouseMove(e, false)}
      onClick={() => setIsLightboxOpen(true)}
    >
      <div className="product-detail-page__main-image-wrapper">
        <CustomImage
          src={selectedImage?.imageUrl || ""}
          tempImage={getRandomPlaceholderImage(selectedImageIndex)}
          alt={product.name || "Ürün görseli"}
          fill
          className={`product-detail-page__main-image-content ${
            isZooming ? "zoom-active" : ""
          }`}
          style={{
            objectFit: "contain",
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
        />
      </div>

      {/* Zoom İkonu */}
      <div className="product-detail-page__zoom-indicator">
        <i className="ph ph-magnifying-glass-plus"></i>
        <span>Yakınlaştırmak için tıklayın</span>
      </div>

      {/* Görsel Sayısı Badge */}
      {allImages.length > 1 && (
        <div className="product-detail-page__image-count-badge">
          <i className="ph ph-images"></i>
          <span>
            {selectedImageIndex + 1} / {allImages.length}
          </span>
        </div>
      )}

      {/* Low Stock Badge */}
      {isLowStock && !isOutOfStock && (
        <div className="product-detail-page__badge product-detail-page__badge--low-stock">
          <i className="ph-fill ph-warning-circle"></i>
          <span>Düşük Stok</span>
        </div>
      )}

      {/* Status Badge */}
      <div className="product-detail-page__badge product-detail-page__badge--status">
        <span className="product-detail-page__badge-dot"></span>
        <span>{statusInfo.label}</span>
      </div>

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="product-detail-page__out-of-stock-overlay">
          <span>Stokta Yok</span>
        </div>
      )}

      {/* Navigasyon Butonları */}
      {allImages.length > 1 && (
        <>
          <button
            className="product-detail-page__nav-button product-detail-page__nav-button--prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePreviousImage();
            }}
            aria-label="Önceki görsel"
          >
            <i className="ph ph-caret-left"></i>
          </button>
          <button
            className="product-detail-page__nav-button product-detail-page__nav-button--next"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            aria-label="Sonraki görsel"
          >
            <i className="ph ph-caret-right"></i>
          </button>
        </>
      )}
    </div>
  );
};
