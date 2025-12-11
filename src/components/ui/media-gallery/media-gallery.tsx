"use client";

import React, { useState, useRef, useCallback } from "react";
import { CustomImage } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";
import "./media-gallery.scss";

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
  showThumbnails?: boolean;
  showNavigation?: boolean;
  showCounter?: boolean;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  className = "",
  showThumbnails = true,
  showNavigation = true,
  showCounter = true,
  initialIndex = 0,
  onIndexChange,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(initialIndex);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Thumbnail'ı görünür alana scroll et
  const scrollThumbnailIntoView = useCallback((index: number) => {
    const thumbnailElement = thumbnailRefs.current[index];
    const container = thumbnailContainerRef.current;

    if (thumbnailElement && container) {
      const containerRect = container.getBoundingClientRect();
      const thumbnailRect = thumbnailElement.getBoundingClientRect();

      // Thumbnail container'ın sol ve sağ kenarlarına göre kontrol
      const isOutOfViewLeft = thumbnailRect.left < containerRect.left;
      const isOutOfViewRight = thumbnailRect.right > containerRect.right;

      if (isOutOfViewLeft || isOutOfViewRight) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, []);

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentItemIndex(index);
      onIndexChange?.(index);

      // Thumbnail scroll işlemi
      setTimeout(() => {
        scrollThumbnailIntoView(index);
      }, 50);
    },
    [onIndexChange, scrollThumbnailIntoView]
  );

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
          <div className="media-item-wrapper image-wrapper">
            <CustomImage
              src={getFullUrl(item.fileUrl)}
              alt={
                item.altText ||
                item.title ||
                `Media item ${currentItemIndex + 1}`
              }
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
              style={{ objectFit: "contain" }}
              className="main-image"
              priority
            />
          </div>
        );

      case "VIDEO":
        return (
          <div className="media-item-wrapper video-wrapper">
            <div className="video-inner-container">
              <video
                src={getFullUrl(item.fileUrl)}
                controls
                className="video-player"
              >
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          </div>
        );

      case "DOCUMENT":
        return (
          <div className="media-item-wrapper document-wrapper">
            <div className="document-inner-container">
              <div className="document-file-icon">
                <i className="ph-fill ph-file-text"></i>
                <span className="file-ext">
                  {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}
                </span>
              </div>
              <div className="document-content">
                <h3 className="document-filename">
                  {item.fileName || "Belge"}
                </h3>
                {item.fileSizeBytes && (
                  <span className="document-filesize">
                    {(item.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </div>
              <a
                href={getFullUrl(item.fileUrl)}
                download={item.fileName}
                className="document-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ph-bold ph-download-simple"></i>
                İndir
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="media-item-wrapper unsupported-wrapper">
            <div className="unsupported-content">
              <i className="ph ph-file text-neutral-400"></i>
              <p className="text-neutral-500">Desteklenmeyen medya türü</p>
            </div>
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
      <div className={`media-gallery-container empty ${className}`}>
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
    <div className={`media-gallery-container ${className}`}>
      {/* Main Media Display */}
      <div className="gallery-main-viewer">
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
          <div className="thumbnail-container" ref={thumbnailContainerRef}>
            {items.map((item, index) => (
              <div
                key={`thumb-${item.id || index}`}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
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
                    <i className="ph ph-file-text"></i>
                    <span className="doc-ext">
                      {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}
                    </span>
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
