import React, { useState } from "react";
import { CustomImage } from "@/components/ui";
import {
  formatDate,
  formatViewCount,
  formatGalleryType,
  getGalleryTypeIcon,
} from "../utils";
import { getFileServeUrl } from "@/lib/api/constants";

interface GalleryDetailContentProps {
  gallery: any; // Gallery verilerinin type'ı buraya eklenebilir
  variant?: "inPage" | "modal"; // Galeri görünüm türü
}

const GalleryDetailContent: React.FC<GalleryDetailContentProps> = ({
  gallery,
  variant = "modal", // Varsayılan olarak modal
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // URL helper - eğer tam URL değilse serve prefix ekle
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

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

  // Medya tipine göre içerik render etme
  const renderMediaItem = (item: any) => {
    if (!item) return null;

    switch (item.itemType) {
      case "IMAGE":
        return (
          <CustomImage
            src={getFullUrl(item.fileUrl)}
            alt={
              item.altText ||
              item.title ||
              `Gallery item ${currentImageIndex + 1}`
            }
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            style={{ objectFit: "contain" }}
            className="main-image"
          />
        );

      case "VIDEO":
        return (
          <div className="video-container">
            <video
              src={getFullUrl(item.fileUrl)}
              controls
              className="video-player"
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        );

      case "DOCUMENT":
        return (
          <div className="document-viewer">
            <div className="document-preview-card">
              <div className="document-header">
                <div className="file-type-badge">
                  {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}
                </div>
              </div>

              <div className="document-icon-wrapper">
                <div className="document-icon-circle">
                  <i className="ph-fill ph-file-text"></i>
                </div>
              </div>

              <div className="document-details">
                <h3 className="document-title">{item.fileName || "Belge"}</h3>

                <div className="document-meta">
                  {item.fileSizeBytes && (
                    <div className="meta-item">
                      <i className="ph ph-database"></i>
                      <span>
                        {(item.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  )}
                  <div className="meta-item">
                    <i className="ph ph-file"></i>
                    <span>
                      {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}{" "}
                      Dosyası
                    </span>
                  </div>
                </div>

                <div className="document-button-wrapper">
                  <a
                    href={getFullUrl(item.fileUrl)}
                    download={item.fileName}
                    className="btn btn-main rounded-pill flex-align gap-8 document-download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ph-bold ph-download"></i>
                    <span>Belgeyi İndir</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-40">
            <i
              className="ph ph-file text-neutral-400"
              style={{ fontSize: "48px" }}
            ></i>
            <p className="text-neutral-500 mt-16">Desteklenmeyen medya türü</p>
          </div>
        );
    }
  };

  // Farklı medya tipleri için thumbnail kaynağı al
  const getThumbnailSrc = (item: any) => {
    if (item.thumbnailUrl) return getFullUrl(item.thumbnailUrl);
    if (item.itemType === "IMAGE") return getFullUrl(item.fileUrl);
    // Video ve belgeler için placeholder görseller eklenebilir
    return getFullUrl(item.fileUrl);
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
                    {renderMediaItem(currentItem)}

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
                        {item.itemType === "IMAGE" ? (
                          <CustomImage
                            src={getThumbnailSrc(item)}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="80px"
                            style={{ objectFit: "cover" }}
                          />
                        ) : item.itemType === "VIDEO" ? (
                          <div className="thumbnail-video">
                            <div className="video-placeholder">
                              <i className="ph-fill ph-film-slate"></i>
                              <span className="video-text">VIDEO</span>
                            </div>
                            <div className="play-icon-overlay">
                              <i className="ph-fill ph-play-circle"></i>
                            </div>
                          </div>
                        ) : (
                          <div className="thumbnail-document">
                            <div className="document-bg">
                              <i className="ph ph-file-text"></i>
                            </div>
                            <div className="document-badge">
                              {item.fileName && (
                                <span className="file-extension">
                                  {item.fileName
                                    .split(".")
                                    .pop()
                                    ?.toUpperCase() || "DOC"}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
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
                  src={getFullUrl(gallery.school.logoUrl)}
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

          {/* Current Item Description */}
          {currentItem?.description && (
            <div className="gallery-description">
              <h4>
                <i className="ph ph-info mr-8"></i>
                İçerik Açıklaması
              </h4>
              <p>{currentItem.description}</p>
            </div>
          )}

          {/* Current Item Details */}
          {currentItem && (
            <div className="current-item-details">
              <h4>
                <i className="ph ph-info mr-8"></i>
                İçerik Detayları
              </h4>
              <div className="detail-row">
                <span className="detail-label">Tip:</span>
                <span className="detail-value">
                  {currentItem.itemType === "IMAGE" && "Resim"}
                  {currentItem.itemType === "VIDEO" && "Video"}
                  {currentItem.itemType === "DOCUMENT" && "Döküman"}
                </span>
              </div>
              {currentItem.fileName && (
                <div className="detail-row">
                  <span className="detail-label">Dosya Adı:</span>
                  <span className="detail-value">{currentItem.fileName}</span>
                </div>
              )}
              {currentItem.viewCount !== undefined && (
                <div className="detail-row">
                  <span className="detail-label">Görüntülenme:</span>
                  <span className="detail-value">{currentItem.viewCount}</span>
                </div>
              )}
              {currentItem.likeCount !== undefined &&
                currentItem.likeCount > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Beğeni:</span>
                    <span className="detail-value">
                      {currentItem.likeCount}
                    </span>
                  </div>
                )}
              {currentItem.downloadCount !== undefined &&
                currentItem.downloadCount > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">İndirilme:</span>
                    <span className="detail-value">
                      {currentItem.downloadCount}
                    </span>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailContent;
