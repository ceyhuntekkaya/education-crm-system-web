import React from "react";
import { CustomImage, Modal, ModalBody } from "@/components/ui";
import { useProductDetail } from "../context";
import { getRandomPlaceholderImage } from "../utils";

export const ProductImageSection: React.FC = () => {
  const {
    product,
    statusInfo,
    isLowStock,
    isOutOfStock,
    selectedImageIndex,
    setSelectedImageIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    zoomPosition,
    isZooming,
    setIsZooming,
    mainImageRef,
    lightboxImageRef,
    allImages,
    selectedImage,
    handleNextImage,
    handlePreviousImage,
    handleImageMouseMove,
  } = useProductDetail();

  if (!product) return null;

  return (
    <>
      <div className="product-detail-page__image-section">
        <div className="product-detail-page__image-container">
          {allImages.length > 0 ? (
            <>
              {/* Ana Görsel Alanı */}
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

              {/* Küçük Görseller (Thumbnail Gallery) */}
              {allImages.length > 1 && (
                <div className="product-detail-page__thumbnail-gallery">
                  <div className="product-detail-page__thumbnail-scroll">
                    {allImages.map((img, index) => (
                      <button
                        key={img.id || index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`product-detail-page__thumbnail ${
                          selectedImageIndex === index ? "active" : ""
                        }`}
                        aria-label={`Görsel ${index + 1} seç`}
                      >
                        <div className="product-detail-page__thumbnail-image">
                          <CustomImage
                            src={img.imageUrl || ""}
                            tempImage={getRandomPlaceholderImage(index)}
                            alt={`Ürün görseli ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        {(img as any).isMain && (
                          <div className="product-detail-page__thumbnail-main-badge">
                            ANA
                          </div>
                        )}
                        {selectedImageIndex === index && (
                          <div className="product-detail-page__thumbnail-active-indicator"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
      <Modal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        size="xl"
        closeOnBackdropClick={true}
        className="product-detail-page__lightbox-modal"
        ariaLabel="Ürün Görseli Galerisi"
      >
        <ModalBody noPadding className="product-detail-page__lightbox-body">
          <div className="product-detail-page__lightbox">
            {/* Close Button */}
            <button
              className="product-detail-page__lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Kapat"
            >
              <i className="ph ph-x"></i>
            </button>

            {/* Main Image Container */}
            <div className="product-detail-page__lightbox-content">
              <div
                className="product-detail-page__lightbox-image-wrapper"
                ref={lightboxImageRef}
                onMouseMove={(e) => handleImageMouseMove(e, true)}
              >
                <CustomImage
                  src={selectedImage?.imageUrl || ""}
                  tempImage={getRandomPlaceholderImage(selectedImageIndex)}
                  alt={product.name || "Ürün görseli"}
                  fill
                  className="product-detail-page__lightbox-image"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Navigation Controls */}
              {allImages.length > 1 && (
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

                  {/* Thumbnail Gallery */}
                  <div className="product-detail-page__lightbox-thumbnails-container">
                    <div className="product-detail-page__lightbox-thumbnails">
                      {allImages.map((img, index) => (
                        <button
                          key={img.id || index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`product-detail-page__lightbox-thumbnail ${
                            selectedImageIndex === index ? "active" : ""
                          }`}
                          aria-label={`Görsel ${index + 1} seç`}
                        >
                          <div className="product-detail-page__lightbox-thumbnail-image">
                            <CustomImage
                              src={img.imageUrl || ""}
                              tempImage={getRandomPlaceholderImage(index)}
                              alt={`Görsel ${index + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          {selectedImageIndex === index && (
                            <div className="product-detail-page__lightbox-thumbnail-active"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Product Info Overlay */}
              <div className="product-detail-page__lightbox-info">
                <h3 className="product-detail-page__lightbox-title">
                  {product.name}
                </h3>
                {product.sku && (
                  <p className="product-detail-page__lightbox-sku">
                    SKU: {product.sku}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
