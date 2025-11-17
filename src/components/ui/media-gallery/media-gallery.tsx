"use client";

import React, { useState } from "react";
import { CustomImage } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";

export interface MediaGalleryItem {
  id?: number;
  itemType?: "IMAGE" | "VIDEO" | "DOCUMENT" | string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  originalFileName?: string;
  fileSizeBytes?: number;
  altText?: string;
  title?: string;
  description?: string;
  mimeType?: string;
}

interface MediaGalleryProps {
  items: MediaGalleryItem[];
  className?: string;
  height?: string;
  showThumbnails?: boolean;
  showNavigation?: boolean;
  showCounter?: boolean;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  className = "",
  height = "550px",
  showThumbnails = true,
  showNavigation = true,
  showCounter = true,
  initialIndex = 0,
  onIndexChange,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(initialIndex);

  const handleIndexChange = (index: number) => {
    setCurrentItemIndex(index);
    onIndexChange?.(index);
  };

  // URL helper - eğer tam URL değilse serve prefix ekle
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  const hasItems = items && items.length > 0;
  const currentItem = hasItems ? items[currentItemIndex] : null;

  const nextImage = () => {
    if (hasItems && currentItemIndex < items.length - 1) {
      handleIndexChange(currentItemIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentItemIndex > 0) {
      handleIndexChange(currentItemIndex - 1);
    }
  };

  const goToImage = (index: number) => {
    handleIndexChange(index);
  };

  // Medya tipine göre içerik render etme
  const renderMediaItem = (item: MediaGalleryItem) => {
    if (!item) return null;

    switch (item.itemType) {
      case "IMAGE":
        return (
          <div
            className="image-container"
            style={{
              height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomImage
              src={getFullUrl(item.fileUrl)}
              alt={
                item.altText ||
                item.title ||
                `Media item ${currentItemIndex + 1}`
              }
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "contain" }}
              className="main-image"
            />
          </div>
        );

      case "VIDEO":
        return (
          <div
            className="video-container"
            style={{
              height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
          <div
            className="document-viewer"
            style={{
              height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
          <div
            className="text-center py-40"
            style={{
              height,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
  const getThumbnailSrc = (item: MediaGalleryItem) => {
    if (item.thumbnailUrl) return getFullUrl(item.thumbnailUrl);
    if (item.itemType === "IMAGE") return getFullUrl(item.fileUrl);
    return getFullUrl(item.fileUrl);
  };

  if (!hasItems) {
    return (
      <div className={`gallery-viewer-column ${className}`}>
        <div className="gallery-empty-state">
          <div className="empty-icon">
            <i className="ph ph-images"></i>
          </div>
          <h3>Medya Yok</h3>
          <p>Bu içerikte henüz medya bulunmuyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`gallery-viewer-column ${className}`}>
      {/* Main Media Display */}
      <div className="gallery-main-viewer" style={{ minHeight: "500px" }}>
        {currentItem && (
          <div className="main-image-container">
            {renderMediaItem(currentItem)}

            {/* Navigation Controls */}
            {showNavigation && items.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentItemIndex === 0}
                  className="nav-button nav-prev"
                  aria-label="Önceki medya"
                >
                  <i className="ph ph-caret-left"></i>
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentItemIndex === items.length - 1}
                  className="nav-button nav-next"
                  aria-label="Sonraki medya"
                >
                  <i className="ph ph-caret-right"></i>
                </button>
              </>
            )}

            {/* Counter */}
            {showCounter && (
              <div className="image-counter">
                <span>
                  {currentItemIndex + 1} / {items.length}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && items.length > 1 && (
        <div className="thumbnail-strip">
          <div className="thumbnail-container">
            {items.map((item, index) => (
              <div
                key={`thumb-${item.id || index}`}
                onClick={() => goToImage(index)}
                className={`thumbnail-item ${
                  index === currentItemIndex ? "active" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goToImage(index);
                  }
                }}
                aria-label={`${index + 1}. medyayı göster`}
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
                          {item.fileName.split(".").pop()?.toUpperCase() ||
                            "DOC"}
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
    </div>
  );
};
