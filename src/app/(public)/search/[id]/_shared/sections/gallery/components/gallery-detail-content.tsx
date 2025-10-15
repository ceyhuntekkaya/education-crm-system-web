import React, { useState } from "react";
import { CustomImage } from "@/components/ui";
import {
  formatDate,
  formatViewCount,
  formatGalleryType,
  getGalleryTypeIcon,
} from "../utils";

interface GalleryDetailContentProps {
  gallery: any; // Gallery data'sının type'ını buraya ekleyebilirsiniz
  variant?: "inPage" | "modal"; // Galeri görünümü türü
}

const GalleryDetailContent: React.FC<GalleryDetailContentProps> = ({
  gallery,
  variant = "modal", // Varsayılan olarak modal
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const hasItems = gallery.items && gallery.items.length > 0;
  const currentItem =
    hasItems && gallery.items ? gallery.items[currentImageIndex] : null;

  const nextImage = () => {
    if (
      hasItems &&
      gallery.items &&
      currentImageIndex < gallery.items.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={`gallery-detail-modal ${variant === "modal" ? "p-20" : ""}`}
    >
      {/* Main Content Grid */}
      <div className="gallery-modal-grid">
        {/* Left Column - Gallery Viewer */}
        <div className="gallery-viewer-column">
          {hasItems ? (
            <>
              {/* Main Image Display */}
              <div className="gallery-main-viewer">
                {currentItem && (
                  <div className="main-image-container">
                    <CustomImage
                      src={currentItem.fileUrl}
                      alt={
                        currentItem.title ||
                        `Galeri içeriği ${currentImageIndex + 1}`
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      style={{ objectFit: "contain" }}
                      className="main-image"
                    />

                    {/* Navigation Controls */}
                    {gallery.items && gallery.items.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          disabled={currentImageIndex === 0}
                          className="nav-button nav-prev"
                        >
                          <i className="ph ph-caret-left"></i>
                        </button>
                        <button
                          onClick={nextImage}
                          disabled={
                            currentImageIndex === gallery.items.length - 1
                          }
                          className="nav-button nav-next"
                        >
                          <i className="ph ph-caret-right"></i>
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {gallery.items && (
                      <div className="image-counter">
                        <span>
                          {currentImageIndex + 1} / {gallery.items.length}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {gallery.items && gallery.items.length > 1 && (
                <div className="thumbnail-strip">
                  <div className="thumbnail-container">
                    {gallery.items.map((item: any, index: number) => (
                      <div
                        key={`thumb-${item.id}`}
                        onClick={() => goToImage(index)}
                        className={`thumbnail-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      >
                        <CustomImage
                          src={item.fileUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="gallery-empty-state">
              <div className="empty-icon">
                <i className="ph ph-images"></i>
              </div>
              <h3>Galeri Boş</h3>
              <p>Bu galeride henüz içerik bulunmuyor.</p>
            </div>
          )}
        </div>

        {/* Right Column - Gallery Info */}
        <div className="gallery-info-column">
          {/* Gallery Header */}
          <div className="gallery-header">
            <div className="gallery-badge">
              <i
                className={`ph ${getGalleryTypeIcon(gallery.galleryType)}`}
              ></i>
              <span>{formatGalleryType(gallery.galleryType)}</span>
            </div>
            <h2 className="gallery-title">{gallery.title}</h2>

            {/* Current Image Title */}
            {currentItem?.title && (
              <div className="current-image-title">
                <i className="ph ph-image-square mr-8"></i>
                <span>{currentItem.title}</span>
              </div>
            )}
          </div>

          {/* Institution Card */}
          {gallery.school && (
            <div className="institution-card">
              <div className="institution-avatar">
                <CustomImage
                  src={gallery.school.logoUrl}
                  alt={gallery.school.name || "School logo"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="institution-info">
                <h4>{gallery.school.name}</h4>
                <p>{gallery.school.institutionTypeName}</p>
              </div>
              <div className="verified-badge">
                <i className="ph ph-check-circle"></i>
              </div>
            </div>
          )}

          {/* Gallery Stats */}
          <div className="gallery-stats-grid">
            <div className="stat-item">
              <i className="ph ph-eye"></i>
              <div>
                <span className="stat-value">
                  {formatViewCount(gallery.viewCount)}
                </span>
                <span className="stat-label">Görüntülenme</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="ph ph-calendar"></i>
              <div>
                <span className="stat-value">
                  {formatDate(gallery.createdAt)}
                </span>
                <span className="stat-label">Tarih</span>
              </div>
            </div>
            {hasItems && gallery.items && (
              <div className="stat-item">
                <i className="ph ph-images"></i>
                <div>
                  <span className="stat-value">{gallery.items.length}</span>
                  <span className="stat-label">Öğe</span>
                </div>
              </div>
            )}
            <div className="stat-item">
              <i className="ph ph-tag"></i>
              <div>
                <span className="stat-value">
                  {formatGalleryType(gallery.galleryType)}
                </span>
                <span className="stat-label">Kategori</span>
              </div>
            </div>
          </div>

          {/* Gallery Description */}
          {gallery.description && (
            <div className="gallery-description">
              <h4>
                <i className="ph ph-text-align-left mr-8"></i>
                Açıklama
              </h4>
              <p>{gallery.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailContent;
