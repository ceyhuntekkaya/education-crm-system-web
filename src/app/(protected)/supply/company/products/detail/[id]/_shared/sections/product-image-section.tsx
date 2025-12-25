import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { CustomImage, Modal, ModalBody } from "@/components/ui";
import { useProductDetail } from "../context";
import { getRandomPlaceholderImage } from "../utils";

export const ProductImageSection: React.FC = () => {
  const { product, statusInfo, isLowStock, isOutOfStock, images } =
    useProductDetail();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLDivElement>(null);

  // Ana görsel + ek görselleri birleştir
  const allImages = useMemo(() => {
    const imagesList = [];

    // Ana görseli ilk sıraya ekle
    if (product?.mainImageUrl) {
      imagesList.push({
        id: 0,
        imageUrl: product.mainImageUrl,
        displayOrder: 0,
        isMain: true,
      });
    }

    // Ek görselleri ekle (displayOrder'a göre sıralı)
    if (images && images.length > 0) {
      const sortedImages = [...images].sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      imagesList.push(
        ...sortedImages.map((img) => ({
          ...img,
          isMain: false,
        }))
      );
    }

    return imagesList;
  }, [product?.mainImageUrl, images]);

  const selectedImage = allImages[selectedImageIndex];

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev < allImages.length - 1 ? prev + 1 : 0
    );
  }, [allImages.length]);

  const handlePreviousImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : allImages.length - 1
    );
  }, [allImages.length]);

  // Klavye navigasyonu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePreviousImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNextImage, handlePreviousImage]);

  const handleImageMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    isLightbox = false
  ) => {
    const container = isLightbox
      ? lightboxImageRef.current
      : mainImageRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

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
