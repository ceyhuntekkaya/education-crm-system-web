import React from "react";
import type { GalleryItemsItemConfig } from "../types";
import CustomImage from "@/components/ui/custom-image";
import {
  formatFileSize,
  translateProcessingStatus,
  translateItemType,
} from "../utils";
import { formatNumber } from "@/utils/format-number";

// Media Gallery Slider Component
const MediaGallerySlider: React.FC<{ items: any[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentItem = items[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="media-gallery-slider">
      {/* Ana Medya Gösterimi */}
      <div className="position-relative mb-3">
        <div
          className="gallery-card bg-white rounded-16 box-shadow-md overflow-hidden"
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          {/* Main Image */}
          <div className="gallery-card__image position-relative">
            {currentItem.thumbnailUrl || currentItem.fileUrl ? (
              <CustomImage
                src={currentItem.thumbnailUrl || currentItem.fileUrl}
                alt={currentItem.title || `Medya ${currentIndex + 1}`}
                width={500}
                height={300}
                className="w-100"
                style={{ objectFit: "cover", height: "300px" }}
              />
            ) : (
              <div
                className="w-100 bg-main-600 d-flex align-items-center justify-content-center"
                style={{ height: "300px" }}
              >
                <div className="text-center text-white">
                  <i
                    className={`ph ${
                      currentItem.itemType === "VIDEO" ? "ph-video" : "ph-image"
                    } mb-2`}
                    style={{ fontSize: "48px" }}
                  ></i>
                  <p className="fw-medium mb-0">Görsel Yok</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="btn btn-dark btn-sm position-absolute top-50 start-0 translate-middle-y ms-2"
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    opacity: 0.8,
                  }}
                >
                  <i className="ph ph-caret-left"></i>
                </button>
                <button
                  onClick={nextSlide}
                  className="btn btn-dark btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    opacity: 0.8,
                  }}
                >
                  <i className="ph ph-caret-right"></i>
                </button>
              </>
            )}

            {/* Counter */}
            <div
              className="position-absolute bottom-0 end-0 m-2"
              style={{ zIndex: 5 }}
            >
              <span className="badge bg-dark bg-opacity-75 text-white">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            {/* Type Badge */}
            <div className="gallery-card__type-badge" style={{ zIndex: 2 }}>
              <i
                className={`ph ${
                  currentItem.itemType === "IMAGE"
                    ? "ph-image"
                    : currentItem.itemType === "VIDEO"
                    ? "ph-video"
                    : "ph-file"
                }`}
              ></i>
              <span>{translateItemType(currentItem.itemType)}</span>
            </div>

            {/* Featured Badge */}
            {currentItem.isFeatured && (
              <div
                className="gallery-card__featured-badge"
                style={{ zIndex: 3 }}
              >
                <i className="ph ph-star-fill"></i>
                <span>Öne Çıkan</span>
              </div>
            )}

            {/* Stats Overlay */}
            <div className="gallery-card__image-overlay">
              <div className="gallery-card__stats">
                <div className="gallery-card__stats-item">
                  <i className="ph ph-eye"></i>
                  <span>{formatNumber(currentItem.viewCount || 0)}</span>
                </div>
                <div className="gallery-card__stats-item">
                  <i className="ph ph-download"></i>
                  <span>{formatNumber(currentItem.downloadCount || 0)}</span>
                </div>
                {currentItem.likeCount > 0 && (
                  <div className="gallery-card__stats-item">
                    <i className="ph ph-heart"></i>
                    <span>{formatNumber(currentItem.likeCount)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Current Item Info */}
          <div className="gallery-card__content">
            <h5 className="gallery-card__title">
              {currentItem.title || `Medya ${currentIndex + 1}`}
            </h5>

            {currentItem.processingStatus && (
              <p className="gallery-card__institution">
                <span
                  className={`badge badge-sm ${
                    currentItem.processingStatus === "COMPLETED"
                      ? "bg-success-subtle text-success"
                      : currentItem.processingStatus === "PROCESSING"
                      ? "bg-warning-subtle text-warning"
                      : "bg-danger-subtle text-danger"
                  }`}
                >
                  <i className="ph ph-gear me-1"></i>
                  {translateProcessingStatus(currentItem.processingStatus)}
                </span>
              </p>
            )}

            <div className="gallery-card__footer">
              <div className="d-flex gap-2 align-items-center flex-wrap">
                {currentItem.fileSizeBytes && (
                  <span className="gallery-card__footer-date">
                    <i className="ph ph-hard-drive me-1"></i>
                    {formatFileSize(currentItem.fileSizeBytes)}
                  </span>
                )}
                {currentItem.width && currentItem.height && (
                  <span className="gallery-card__footer-date">
                    <i className="ph ph-resize me-1"></i>
                    {currentItem.width}×{currentItem.height}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {items.length > 1 && (
        <div className="thumbnail-navigation">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <small className="text-muted me-3">
              <i className="ph ph-images me-1"></i>
              Önizlemeler:
            </small>
          </div>
          <div
            className="d-flex gap-2 overflow-x-auto pb-2 justify-content-center"
            style={{ scrollbarWidth: "thin" }}
          >
            {items.map((item: any, index: number) => (
              <button
                key={item.id || index}
                onClick={() => goToSlide(index)}
                className={`btn p-0 border-0 flex-shrink-0 position-relative ${
                  index === currentIndex ? "ring ring-primary" : ""
                }`}
                style={{
                  width: "60px",
                  height: "45px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  opacity: index === currentIndex ? 1 : 0.7,
                }}
              >
                {item.thumbnailUrl || item.fileUrl ? (
                  <CustomImage
                    src={item.thumbnailUrl || item.fileUrl}
                    alt={item.title || `Medya ${index + 1}`}
                    width={60}
                    height={45}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                    <i
                      className={`ph ${
                        item.itemType === "VIDEO" ? "ph-video" : "ph-image"
                      } text-muted`}
                      style={{ fontSize: "16px" }}
                    ></i>
                  </div>
                )}
                {/* Active indicator */}
                {index === currentIndex && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 border border-primary border-3 rounded"
                    style={{ pointerEvents: "none" }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Galeri öğeleri konfigürasyonu
 */
export const galleryItemsConfig: GalleryItemsItemConfig[] = [
  {
    label: "Toplam Öğe Sayısı",
    value: (gallery) => (
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-images me-1"></i>
        {gallery?.items?.length || 0} öğe
      </span>
    ),
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Görsel Sayısı",
    value: (gallery) => (
      <span className="badge bg-success-subtle text-success fw-semibold">
        <i className="ph ph-image me-1"></i>
        {gallery?.items?.filter((item: any) => item.itemType === "IMAGE")
          .length || 0}{" "}
        görsel
      </span>
    ),
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Video Sayısı",
    value: (gallery) => (
      <span className="badge bg-warning-subtle text-warning fw-semibold">
        <i className="ph ph-video me-1"></i>
        {gallery?.items?.filter((item: any) => item.itemType === "VIDEO")
          .length || 0}{" "}
        video
      </span>
    ),
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Öne Çıkan Öğe",
    value: (gallery) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold">
        <i className="ph ph-star-fill me-1"></i>
        {gallery?.items?.filter((item: any) => item.isFeatured).length || 0} öne
        çıkan
      </span>
    ),
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Toplam Görüntüleme",
    value: (gallery) => {
      const totalViews =
        gallery?.items?.reduce(
          (sum: number, item: any) => sum + (item.viewCount || 0),
          0
        ) || 0;
      return (
        <span className="fw-semibold text-info-600">
          <i className="ph ph-eye me-2"></i>
          {formatNumber(totalViews)}
        </span>
      );
    },
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Toplam İndirme",
    value: (gallery) => {
      const totalDownloads =
        gallery?.items?.reduce(
          (sum: number, item: any) => sum + (item.downloadCount || 0),
          0
        ) || 0;
      return (
        <span className="fw-semibold text-success-600">
          <i className="ph ph-download me-2"></i>
          {formatNumber(totalDownloads)}
        </span>
      );
    },
    isShowing: (gallery) => !!gallery?.items,
  },
  {
    label: "Toplam Beğeni",
    value: (gallery) => {
      const totalLikes =
        gallery?.items?.reduce(
          (sum: number, item: any) => sum + (item.likeCount || 0),
          0
        ) || 0;
      return (
        <span className="fw-semibold text-danger-600">
          <i className="ph ph-heart me-2"></i>
          {formatNumber(totalLikes)}
        </span>
      );
    },
    isShowing: (gallery) => {
      const totalLikes =
        gallery?.items?.reduce(
          (sum: number, item: any) => sum + (item.likeCount || 0),
          0
        ) || 0;
      return !!gallery?.items && totalLikes > 0;
    },
  },
  {
    label: "Medya Öğeleri",
    value: (gallery) => {
      if (!gallery?.items || gallery.items.length === 0) {
        return (
          <div className="text-center py-4">
            <div className="mb-3">
              <i
                className="ph ph-images text-neutral-400"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h6 className="text-neutral-600 mb-2">Medya Bulunamadı</h6>
            <p className="text-neutral-500 mb-0 small">
              Bu galeride henüz hiç medya dosyası bulunmuyor.
            </p>
          </div>
        );
      }

      return <MediaGallerySlider items={gallery.items} />;
    },
    isShowing: () => true,
  },
];
